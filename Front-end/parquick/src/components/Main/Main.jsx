// @flow
import * as React from 'react'
import MainDriver from '../MainDriver/MainDriver';
import MainOwner from '../MainOwner/MainOwner';
import './Main.css';
import type { User } from "../../types/User";

type Props = {
    user : User
}

function Main({user} : Props): React.MixedElement {
    return <>
        {
            user.type === "owner" ?
            <>
                <MainOwner></MainOwner>
            </>
            : user.type === "driver" ?
            <>
                <MainDriver></MainDriver>
            </>
            :
            <></>
        }
    </>
}

export default Main;
