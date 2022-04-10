import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { useSignup } from "./useSignup";
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './styles';

import SignInput from "../../components/SignInput";

import BarberLogo from '../../assets/barber.svg';
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import { useEffect } from "react/cjs/react.development";

export default () => {

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [validInfo, setValidInfo] = useState(false);

    useEffect(()=>{
        setValidInfo(!!nameField && !!emailField && !!passwordField)
    },[nameField, emailField, passwordField])

    console.tron.log('validInfo', validInfo)
    
    const {signUp} = useSignup();

    const handleSignClick = () => {
        signUp(nameField, emailField, passwordField)
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        })
    }

    const handleVotedButton = () => {
        if (signUp){
            navigation.reset({
                routes: [{name: 'SignIn'}]
            })
        }
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160"/>
            
            <InputArea>
                <SignInput 
                IconSvg={PersonIcon}
                placeholder="Digite seu nome"
                value={nameField}
                onChangeText={t=>setNameField(t)}
                />
                <SignInput 
                IconSvg={EmailIcon}
                placeholder="Digite seu e-mail"
                value={emailField}
                onChangeText={t=>setEmailField(t)}
                />
                <SignInput 
                IconSvg={LockIcon}
                placeholder="Digite sua senha"
                value={passwordField}
                onChangeText={t=>setPasswordField(t)}
                password={true}
                />
                <CustomButton  disabled={!validInfo} onPress={handleSignClick}>
                    <CustomButtonText onPress={handleVotedButton}>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possue uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    )
}