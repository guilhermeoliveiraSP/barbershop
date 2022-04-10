import React, { useState } from "react";
import { Plataform } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { request, PERMISSIONS} from 'react-native-permissions'
import Geolocation from "@react-native-community/geolocation";
import { useBarbers } from "./useBarbers";

import { 
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    loadingIcon,
    LoadingIcon,
 } from './styles';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';
import { asyncStorage } from "reactotron-react-native";

export default () => {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const barbers = useBarbers();


    const handleLocationFinder = async () => {
        setCoords(null);
        let result = await request(
            Platform.OS === 'ios'?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if(result === 'granted') {

            setLoading(true);
            setLocationText('');
            setList([]);
            
            Geolocation.getCurrentPosition((info)=>{
                setCoords(info.coords);
                getBarbers();
            })

        }
    }

    const getBarbers = async () => {
        setLoading(true);
        setList([]);

        console.log ('BARBERRRRSS 0000000000000000', barbers?.data)
    }

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle numberOfflines={2}>Econtre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF"></SearchIcon>
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF"/>
                    </LocationFinder>
                </LocationArea>

            {loading &&
                <LoadingIcon size="large" color="#FFFFFF"/>
            }

            </Scroller>
        </Container>
    );
}