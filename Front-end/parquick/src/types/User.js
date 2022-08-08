// @flow
import type { BankCard } from './BankCard';

import { testCard } from './BankCard';

export type User = {
  _id?: string,
  type: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordRepeat?: string,
  phone?: string,
  address?: string,
  cards?: Array<BankCard>,
  token?: any,
  logged?: boolean,
};

export const emptyUser = {
  _id: '',
  type: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordRepeat: '',
  phone: '',
  address: '',
  cards: [testCard],
};

export const testUser = {
  _id: '62e41ad0dc5914ccb6b1124d',
  type: 'Driver',
  firstName: 'Jose',
  lastName: 'Espinosa',
  email: 'jose@jose.com',
  password: 'jose',
  passwordRepeat: 'jose',
  phone: '1234',
  address: 'California',
  cards: [testCard],
  token: '12345',
};
