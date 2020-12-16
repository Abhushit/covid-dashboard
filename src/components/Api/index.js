import axios from "axios";

let url = "https://disease.sh/v3/covid-19";
let coronaApi = "https://data.nepalcorona.info";

const getCountries = () => {
  let newUrl = url;

  return axios.get(`${newUrl}/countries`);
};

const getAll = () => {
  let newUrl = url;

  return axios.get(`${newUrl}/all`);
};

const getAllContinent = () => {
  let newUrl = url;
  return axios.get(`${newUrl}/continents`);
};

const getDistrict = (name) => {
  let coronaUrl = coronaApi;
  return axios.get(`${coronaUrl}/api/v1/districts?search=${name}`);
};

const getDistrictDetail = (id) => {
  let coronaUrl = coronaApi;
  return axios.get(`${coronaUrl}/api/v1/districts/${id}`);
};

const getNews = () => {
  return axios.get(`https://nepalcorona.info/api/v1/news`);
};

const getMyths = () => {
  return axios.get('https://nepalcorona.info/api/v1/myths');
}

const getHospitals = () => {
  return axios.get('https://nepalcorona.info/api/v1/hospitals');
}

export default {
  getCountries,
  getAll,
  getAllContinent,
  getDistrict,
  getDistrictDetail,
  getNews,
  getMyths,
  getHospitals
};
