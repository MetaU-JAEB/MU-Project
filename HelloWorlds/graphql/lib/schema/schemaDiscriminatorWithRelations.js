const mongoose = require('mongoose');

const {
  composeWithMongooseDiscriminators
} = require('graphql-compose-mongoose');

const {
  schemaComposer
} = require('graphql-compose'); // console.log('El dsicriminiatro', composeWithMongooseDiscriminators)
// pick a discriminatorKey


const DKey = 'type';
const enumCharacterType = {
  PERSON: 'Person',
  DROID: 'Droid'
}; // DEFINE BASE SCHEMA

const CharacterSchema = new mongoose.Schema({
  // _id: field...
  type: {
    type: String,
    required: true,
    enum: [enumCharacterType.PERSON, enumCharacterType.DROID],
    description: 'Character type Droid or Person'
  },
  name: String,
  height: Number,
  mass: Number,
  films: [String]
}); // DEFINE DISCRIMINATOR SCHEMAS

const DroidSchema = new mongoose.Schema({
  makeDate: String,
  primaryFunction: [String]
});
const PersonSchema = new mongoose.Schema({
  gender: String,
  hairColor: String,
  starships: [String],
  friendsIds: [mongoose.Schema.Types.ObjectId]
}); // set discriminator Key

CharacterSchema.set('discriminatorKey', DKey); // create base Model

const CharacterModel = mongoose.model('Character', CharacterSchema); // create mongoose discriminator models

const DroidModel = CharacterModel.discriminator(enumCharacterType.DROID, DroidSchema);
const PersonModel = CharacterModel.discriminator(enumCharacterType.PERSON, PersonSchema); // create DiscriminatorTypeComposer

const baseOptions = {
  // regular TypeConverterOptions, passed to composeMongoose
  fields: {
    remove: ['friends']
  }
};
const CharacterDTC = composeWithMongooseDiscriminators(CharacterModel, baseOptions); // create Discriminator Types

const droidTypeConverterOptions = {
  // this options will be merged with baseOptions -> customizationsOptions
  fields: {
    remove: ['makeDate']
  }
};
const DroidTC = CharacterDTC.discriminator(DroidModel, droidTypeConverterOptions);
const PersonTC = CharacterDTC.discriminator(PersonModel); // baseOptions -> customizationsOptions applied
// console.log('Resolvers',DroidTC.getResolvers())

PersonTC.addRelation('friends', {
  resolver: () => PersonTC.getResolver('findByIds'),
  prepareArgs: {
    // resolver `findByIds` has `_ids` arg, let provide value to it
    _ids: source => source.friendsIds
  },
  projection: {
    friendsIds: 1
  } // point fields in source object, which should be fetched from DB

});
PersonTC.addRelation('adultFriendsWithSameGender', {
  resolver: () => PersonTC.getResolver('findMany'),
  prepareArgs: {
    // resolver `findMany` has `filter` arg, we may provide mongoose query to it
    filter: source => ({
      _operators: {
        // Applying criteria on fields which have
        // operators enabled for them (by default, indexed fields only)
        _id: {
          in: source.friendsIds
        },
        mass: {
          gt: 24
        }
      },
      gender: source.gender
    }),
    limit: 10
  },
  projection: {
    friendsIds: 1,
    gender: 1
  } // required fields from source object

}); // You may now use CharacterDTC to add fields to all Discriminators

schemaComposer.Query.addFields({
  droidMany: DroidTC.getResolver('findMany'),
  personMany: PersonTC.getResolver('findMany'),
  characterMany: CharacterDTC.getResolver('findMany')
}); // Use DroidTC, `PersonTC as any other ObjectTypeComposer.

schemaComposer.Mutation.addFields({
  droidCreate: DroidTC.getResolver('createOne'),
  personCreate: PersonTC.getResolver('createOne'),
  characterCreate: CharacterDTC.getResolver('createOne')
});
const schema = schemaComposer.buildSchema();
/* describe('createOne', () => {
    it('should create child document without specifying DKey', async () => {
        const res = await graphql.graphql({
            schema,
            source: `mutation CreateCharacters {
                        droidCreate(record: {name: "Queue XL", modelNumber: 360 }) {
                            record {
                            __typename
                            type
                            name
                            modelNumber
                            }
                        }

                        personCreate(record: {name: "mernxl", dob: 57275272}) {
                            record {
                            __typename
                            type
                            name
                            dob
                            }
                        }
                    }`
        });

        expect(res).toEqual({
            data: {
                droidCreate: {
                    record: { __typename: 'Droid', type: 'Droid',
                     name: 'Queue XL', modelNumber: 360 },
                },
                personCreate: {
                    record: { __typename: 'Person', type: 'Person', name: 'mernxl', dob: 57275272 },
                },
            },
        });
    });
}); */

module.exports = schema;