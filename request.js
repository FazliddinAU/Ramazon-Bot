const axios = require('axios');
async function getRamazonTimes(region) {
  try {
    const response = await axios.get(`https://islomapi.uz/api/present/day?region=${region}`);
    const api = response.data;
    const result = {
       region: api.region,
       vaqti: api.date,
       hozir: api.weekday,
       tong: api.times.tong_saharlik,
       quyosh: api.times.quyosh,
       peshin: api.times.peshin,
       asr: api.times.asr,
       shom: api.times.shom_iftor,
       hufton: api.times.hufton,
       hijriy : api.hijri_date.month,
       hijriy_day : api.hijri_date.day
    };
 
    return result;
  } catch (error) {
    console.error('API xato:', error.message);
  }
}

module.exports = {
  getRamazonTimes
}
