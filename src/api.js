import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export default {
  async driversList(page) {
    const limit = 10;
    const offset = (page - 1) * 10;
    const { data } = await axios.get(API_URL + `f1/drivers.json?limit=${limit}&offset=${offset}`);
    const totalPages = Math.ceil(parseInt(data.MRData.total, 10) / limit);
    return {
      drivers: data.MRData.DriverTable.Drivers,
      totalPages,
    };
  },
  async loadDriverDetail(driverId) {
    const { data } = await axios.get(API_URL + `f1/drivers/${driverId}.json`);
    const { data: resultsData } = await axios.get(API_URL + `f1/drivers/${driverId}/results.json`);
    return {
      driver: data.MRData.DriverTable.Drivers[0],
      races: resultsData.MRData.RaceTable.Races,
    };
  },
};
