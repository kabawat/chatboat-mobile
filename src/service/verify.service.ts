
import endpoint from "config/api_endpoint";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function ServiceVerifyApi() {
    try {
        const token = await AsyncStorage.getItem('_x_v_t');
        const headers = {
            "x-verification-tokens": token
        }
        const Service = axios.create({
            baseURL: endpoint.BASE_URL,
            timeout: 10000,
            headers
        });
        return Service;
    } catch (error) {
        throw error
    }
}

function UnAuthService() {
    try {
        const Service = axios.create({
            baseURL: endpoint.BASE_URL,
            timeout: 10000,
        });
        return Service;
    } catch (error) {
        throw error
    }
}
export { ServiceVerifyApi, UnAuthService }
