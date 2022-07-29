// @flow
import type { BankCard } from "./BankCard";

import { testCard } from "./BankCard";

export type User = {
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
    logged?: boolean
}

export const emptyUser = {
    type: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordRepeat: "",
    phone: "",
    address: "",
    cards : [testCard]
}

export const testUser = {
    firstName:"Juan",
    type:'Owner',
    logged: true
  }
