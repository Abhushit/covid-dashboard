import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL_WORLD;
const nplURL = process.env.REACT_APP_BASE_URL_NEPAL;
const infoURL = process.env.REACT_APP_BASE_URL_INFO;


const getCountries = () => {
  const url = baseURL;
  return axios.get(`${url}/countries`);
};

const getAll = () => {
  const url = baseURL;
  return axios.get(`${url}/all`);
};

const getAllContinent = () => {
  const url = baseURL;
  return axios.get(`${baseURL}/continents`);
};

const getDistrict = (name) => {
  const url = nplURL;
  return axios.get(`${url}/api/v1/districts?search=${name}`);
};

const getDistrictDetail = (id) => {
  const url = nplURL;
  return axios.get(`${url}/api/v1/districts/${id}`);
};

const getNews = () => {
  const url = infoURL
  return axios.get(`${url}/api/v1/news`);
};

const getMyths = () => {
  const url = infoURL
  return axios.get(`${url}/api/v1/myths`);
}

const getHospitals = () => {
  const url = infoURL
  return axios.get(`${url}/api/v1/hospitals`);
}

const getFaqs = () => {
  const url = infoURL;
  return axios.get(`${url}/api/v1/faqs`)
}

const getNepal = () => {
  const url = infoURL;
  return axios.get(`${url}/api/v1/data/nepal`)
}

export default {
  getCountries,
  getAll,
  getAllContinent,
  getDistrict,
  getDistrictDetail,
  getNews,
  getMyths,
  getHospitals,
  getFaqs,
  getNepal
};
