import { BASE_API } from "../../server/base"
import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage"

import { UserContext } from '../../contexts/UserContext' 
import { useContext } from "react"
import { useNavigation } from "@react-navigation/native"


const useSigin = () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation()

    const signIn = async (email, password) => { 
        try {
            const response = await axios.post(`${BASE_API}/auth/login`, {
                email, password
            })

            await AsyncStorage.setItem('token', response.data.token)

            console.tron.log('token', response.data.token)
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
            console.tron.log('error', error)
        }
    }



    return {
        signIn
    }
}
export { useSigin }