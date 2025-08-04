import axios from "axios";

const getMeteoForecast = async (position = [48.8630178, 2.323974]) => {
  // return the forecast from the nearest meteo point as an array of nbPoints objects :
  //   [
  //     {
  //       position: [49, 2.3],
  //       forecast: "2023-04-03T07:00:00+00:00",
  //       cloud_cover: 50,
  //       "2_metre_relative_humidity": 74.1651,
  //       "10m_wind_speed": 3.38676,
  //       total_precipitation: 0,
  //       weather_code: 1,
  //     },
  //      {...},
  //   ];
  //

  try {
    let url =
      "https://api.open-meteo.com/v1/meteofrance?hourly=temperature_2m,precipitation,weather_code,cloud_cover,wind_speed_10m&timezone=Europe/Paris";
    url += "&latitude=" + position[0];
    url += "&longitude=" + position[1];
    const response = await axios.get(url);
    position = [response.data.latitude, response.data.longitude];
    const results = [];
    for (let i = 0; i < response.data.hourly.time.length; i++) {
      if (i < 72) {
        results.push({
          position: position,
          forecast: response.data.hourly.time[i],
          "2_metre_temperature": response.data.hourly.temperature_2m[i],
          cloud_cover: response.data.hourly.cloud_cover[i],
          "10m_wind_speed": response.data.hourly.wind_speed_10m[i],
          precipitation: response.data.hourly.precipitation[i],
          weather_code: response.data.hourly.weather_code[i],
        });
      }
    }
    return results;
  } catch (error) {
    console.log(error.reason);
    return null;
  }
};

export default getMeteoForecast;
