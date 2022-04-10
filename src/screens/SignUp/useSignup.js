import { BASE_API } from "../../server/base"
import axios from "axios"

const useSignup = () => {
    const signUp = async (name, email, password) => {
        try {
            const response = await axios.post(`${BASE_API}/user`, {
                name, email, password
            })
            console.tron.log('response', response?.data)
            if (response.data.token) {
            console.tron.log('entreiiiiii aqui', response?.data)
                navigation.reset({
                    routes:[{name:'SignIn'}]
                })
            }
            if(response?.data?.error){
                throw new Error(response?.data?.error)
            }

        } catch (error) {
            console.tron.log('error', error)
        }
        
    }

    return {
        signUp
    }
}
export { useSignup }