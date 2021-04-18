import axios from "axios";
import { IApplication } from "../Components/CreateScreen/Models";
import { FullPrototypeData } from "./../Components/AnalyticsDetails/Models";
import { apiUrl } from "./consts";
export const api = {
  createProtorype: (data: FullPrototypeData): Promise<string> => {
    return axios.post(`${apiUrl}/prototype/`, data).then(({ data }) => {
      return data;
    });
  },
  getApps: (): Promise<IApplication[]> => {
    return axios
      .get(`https://halffly03.pythonanywhere.com/api/application`)
      .then(({ data }) => {
        return data.data;
      });
  },
  getAppsById: (id: string): Promise<IApplication> => {
    return axios
      .get(`https://halffly03.pythonanywhere.com/api/application/${id}`)
      .then(({ data }) => {
        return data.data;
      });
  },
  getAnalytics: (id: string): Promise<{ title: string; value: string }[]> =>
    axios.get(`https://halffly03.pythonanywhere.com/api/results/${id}`).then(({ data }) => data.data),
};
