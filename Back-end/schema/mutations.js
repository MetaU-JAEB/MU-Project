const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserModel } = require('./models/User');
const {
  UserDTC,
  DriverTC,
  OwnerTC,
  ParkingTC,
  RentTC,
  ConversationTC,
  MessageTC,
} = require('./relations');
/**
 *  Getting objects after relations are applied
 */

/**
 * Making custom resolvers for login/register
 * mutations
 */
UserDTC.addResolver({
  kind: 'mutation',
  name: 'userRegister',
  args: {
    email: 'String!',
    password: 'String!',
    type: 'String!',
    firstName: 'String!',
    lastName: 'String!',
  },
  type: UserDTC.getResolver('updateById').getType(),
  resolve: async ({ args /* context */ }) => {
    let existUser = null;
    if (isNaN(Number(args.email))) {
      existUser = await UserModel.findOne({ email: args.email });
    } else {
      existUser = await UserModel.findOne({ phone: Number(args.email) });
    }
    if (existUser) {
      throw new Error('User exists already.');
    }
    const hashedPassword = await bcrypt.hash(args.password, 12);
    const newUser = new UserModel({
      email: args.email,
      password: hashedPassword,
      type: args.type,
      firstName: args.firstName,
      lastName: args.lastName,
    });
    const result = await newUser.save();
    return {
      recordId: result._id,
      record: result,
    };
  },
});

/**
 * Field added in order to have a token
 * for the login
 */
UserDTC.addFields({
  token: {
    type: 'String',
    description: 'Token of authenticated user.',
  },
});

UserDTC.addResolver({
  kind: 'mutation',
  name: 'userLogin',
  args: {
    email: 'String!',
    password: 'String!',
  },
  type: UserDTC.getResolver('updateById').getType(),
  resolve: async ({ args /* context */ }) => {
    let user = null;
    if (isNaN(Number(args.email))) {
      user = await UserModel.findOne({ email: args.email });
    } else {
      user = await UserModel.findOne({ phone: Number(args.email) });
    }
    if (!user) {
      throw new Error('User does not exist.');
    }

    const isEqual = await bcrypt.compare(args.password, user.password);
    if (!isEqual) {
      throw new Error('Password is not correct.');
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
        userPassword: user.password,
      },
      'secretkey',
      {
        expiresIn: '1h',
      },
    );

    return {
      recordId: user._id,
      record: {
        token: token,
        _id: user._id,
        type: user.type,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        phone: user.phone,
        address: user.address,
        cards: [user.cards.map(card => card.number)],
      },
    };
  },
});

const userMutations = {
  userCreate: UserDTC.getResolver('createOne'),
  userUpdate: UserDTC.getResolver('updateOne'),
  userRegister: UserDTC.getResolver('userRegister'),
  userLogin: UserDTC.getResolver('userLogin'),

  driverCreate: DriverTC.getResolver('createOne'),
  driverUpdate: DriverTC.getResolver('updateOne'),

  ownerCreate: OwnerTC.getResolver('createOne'),
  ownerUpdate: OwnerTC.getResolver('updateOne'),
};
const parkingMutations = {
  parkingCreate: ParkingTC.getResolver('createOne'),
  parkingCreateMany: ParkingTC.getResolver('createMany'),
  parkingUpdate: ParkingTC.getResolver('updateOne'),
};
const rentMutations = {
  rentCreate: RentTC.getResolver('createOne'),
  rentUpdate: RentTC.getResolver('updateOne'),
};
const conversationMutations = {
  conversationCreate: ConversationTC.getResolver('createOne'),
  conversationUpdate: ConversationTC.getResolver('updateOne'),
};
const messageMutations = {
  messageCreate: MessageTC.getResolver('createOne'),
  messageUpdate: MessageTC.getResolver('updateOne'),
};

const mutations = {
  ...userMutations,
  ...parkingMutations,
  ...rentMutations,
  ...conversationMutations,
  ...messageMutations,
};

module.exports = mutations;
