import { api } from "../api/api";

export const getAllAppsId = async () =>
  (await api.getApps()).map((x) => x.id);
