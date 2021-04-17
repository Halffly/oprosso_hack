import axios from 'axios';
import { FullPrototypeData } from './../Components/AnalyticsDetails/Models';
import { apiUrl } from './consts';
export const api = {
    createProtorype: (data: FullPrototypeData):Promise<string> => {
        return axios.post(`${apiUrl}/prototype/`, data).then(({data}) => {
            console.log(data)
            return data;
        })
    }
}