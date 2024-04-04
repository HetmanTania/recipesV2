import axios from "axios";
import router from "@/router";
import { MAIN_URL, DAY_LIMITS_OVER } from '@/utils/constants';


const api = axios.create({
    'baseURL' : MAIN_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});
api.interceptors.response.use(null, error => {
    if(error.response.status && error.response.status === DAY_LIMITS_OVER) {
        router.push('/505');
    }
    console.log(error)
    throw error;
})
export default api;