import { AxiosStatic } from 'axios';
const axios = require('axios').default as AxiosStatic;

const UserAgent = process.env.USER_AGENT;
export const fetchSplatnet = <T>(path: string) => {
  const url = `${process.env.SPLATNET_API_URL}/${path}`;
  const Cookie = `iksm_session=${process.env.IKSM_SESSION}`;

  return axios.get<T>(url, {
    headers: {
      Cookie,
      'User-Agent': UserAgent,
    },
  });
};
