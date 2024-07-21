import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import endpoint from "config/api_endpoint";

async function AuthService() {
    const token = await AsyncStorage.getItem('_x_a_t');
    let headers = {
        'x-auth-tokens': token
    }
    const Service = axios.create({
        baseURL: endpoint.BASE_URL,
        timeout: 10000,
        headers
    });
    return Service;
}
export default AuthService
