// @flow
export type User = {
    name? : string,
    type? : string,
    logged: boolean
}

export const testUser = {
    name:"Juan",
    type:'owner',
    logged: true
  }