import React, { useState } from "react";
import { Container, LoadingIcon } from './styles';
import {usePreload} from "./usePreload"

import BarberLogo from '../../assets/barber.svg'
import { useNavigation } from "@react-navigation/native";

export default () => {

    const navigation = useNavigation();
    const [token, setToken] = useState('');
    const {preload} = usePreload()

    return (
        <Container>
            <BarberLogo width="100%" height="160"/>
            <LoadingIcon size="large" color="#FFFFFF"/>
        </Container>
    );
}