// @flow

import type { User } from '../types/User';

export function userIsLogged(user: User): boolean {
  if (!user?.token) {
    return false;
  } else {
    return true;
  }
  // TODO: make request to the server to verify
}
