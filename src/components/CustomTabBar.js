import React, { useContext } from "react";
import styled from 'styled-components/native'

import { UserContext } from "../contexts/UserContext";

import HomeIcon from '../assets/home.svg';
import SeachIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';

const TabArea = styled.View`
    height: auto;
    background-color: #4EADBE;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #4EADBE;
    margim-top: -20px;
`

const AvatarIcon = styled.Image`
    width: 24px;
    height 24px;
    border-radius: 12px;
    position: absolute;
`

export default ({ state, navigation }) => {

    const { state:user } = useContext(UserContext);

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
                <HomeIcon style={{opacity: state.index===0? 1 : 0.5}} style={{opacity: state.index===0? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>
            <TabItem onPress={()=>goTo('Search')}>
                <SeachIcon style={{opacity: state.index===1? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>
            <TabItemCenter onPress={()=>goTo('Appointments')}>
                <TodayIcon width="24" height="24" fill="#4EADBE"/>
            </TabItemCenter>
            <TabItem onPress={()=>goTo('Favorites')}>
                <FavoriteIcon style={{opacity: state.index===3? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>
            <TabItem onPress={()=>goTo('Profile')}>
                <AccountIcon style={{opacity: state.index===4? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>
        </TabArea>
    );
}