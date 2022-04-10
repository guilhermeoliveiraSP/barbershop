import { BASE_API } from "../../server/base"
import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage"

import { UserContext } from '../../contexts/UserContext' 
import { useContext } from "react"
import { useNavigation } from "@react-navigation/native"


const useBarbers = () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation()

    const barbers = async (token) => { 
        try {
            const tokenStorage = await AsyncStorage.getItem('token')
            const response = await axios.get(`${BASE_API}/barbers?token=${tokenStorage}`)

            console.tron.log('token', response.data)

            // navigation.reset({
            //     routes:[{name:'MainTab'}]
            // })

            if(response?.data?.error){
                throw new Error(response?.data?.error)
            }
        } catch (error) {
            console.tron.log('error', error)
        }
    }



    return {
        barbers
    }
}
export { useBarbers }