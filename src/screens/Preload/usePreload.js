import { BASE_API } from "../../server/base"
import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage"

import { UserContext } from '../../contexts/UserContext' 
import { useContext, useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { useNavigation } from "@react-navigation/native"




const usePreload = () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation()
    const [token, setToken] = useState('');

const getStorageToken = async() => {
    try {
        const tokenStorage = await AsyncStorage.getItem('token')
        setToken(tokenStorage)
        if(tokenStorage){
         preload(tokenStorage)
            return
        }
        navigation.reset({
            routes:[{name:'SignIn'}]
        })
    } catch (error) {
        
    }
} 

    const preload = async (token) => { 
        // console.tron.log('ENREI')

        try {
            const response = await axios.post(`${BASE_API}/auth/refresh`, {
                token
            })
            // console.tron.log('VALID TOKEN', response || 'nadsa aqui')

            userDispatch({
                type: 'setAvatar',
                payload:{
                    avatar: response?.data?.avatar
                }
            });

            navigation.reset({
                routes:[{name:'MainTab'}]
            })

            if(response?.data?.error){
                throw new Error(response?.data?.error)
            }
        } catch (error) {
            // console.tron.log('ERRR VALID', error)
            navigation.reset({
                routes:[{name:'SignIn'}]
            })
        }
    }

    useEffect(() => {
        getStorageToken()
    }, [])


    return {
        preload
    }
}
export { usePreload }