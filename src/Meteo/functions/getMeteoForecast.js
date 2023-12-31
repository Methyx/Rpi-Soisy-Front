import axios from "axios";

const getMeteoForecast = async (
  meteoPointPosition, //  [lat, lng]  ex.: [49, 2.3]
  nbPoints = 48
) => {
  // return the forecast from the meteo point as an array of nbPoints objects :
  //   [
  //     {
  //       position: [49, 2.3],
  //       forecast: "2023-04-03T07:00:00+00:00",
  //       "2_metre_temperature": 4.547540000000026,
  //       "2_metre_relative_humidity": 74.1651,
  //       "10m_wind_speed": 3.38676,
  //       total_precipitation: 0,
  //       surface_solar_radiation_downwards: 487619.59375,
  //     },
  //      {...},
  //   ];
  //
  try {
    if (!meteoPointPosition || meteoPointPosition.length !== 2) {
      return null;
    }
    // ask for the forecasts
    const urlSource =
      "https://public.opendatasoft.com/api/records/1.0/search/?dataset=arome-0025-sp1_sp2";
    let url2 = urlSource + "&rows=" + nbPoints.toString();
    url2 += "&sort=-forecast"; // sort by forcast ascending
    url2 +=
      "&geofilter.distance=" +
      meteoPointPosition[0].toString() +
      "," +
      meteoPointPosition[1].toString();
    const response2 = await axios.get(url2);
    const results = [];
    if (response2.data.records) {
      for (let i = 0; i < response2.data.records.length; i++) {
        const dataItem = response2.data.records[i].fields;
        results.push({
          position: dataItem.position || null,
          forecast: dataItem.forecast || null,
          "2_metre_temperature": dataItem["2_metre_temperature"] || null,
          "2_metre_relative_humidity":
            dataItem["2_metre_relative_humidity"] || null,
          "10m_wind_speed": dataItem["10m_wind_speed"] || null,
          total_precipitation: dataItem.total_precipitation || 0,
          surface_solar_radiation_downwards:
            dataItem.surface_solar_radiation_downwards || null,
        });
        if (i > 0) {
          results[i].precipitation = Math.max(
            results[i].total_precipitation - results[i - 1].total_precipitation,
            0
          );
        } else {
          results[i].precipitation = results[i].total_precipitation;
        }
        Object.keys(results[i]).forEach((item) => {
          if (item !== "forecast" && item !== "position") {
            results[i][item] = Math.round(results[i][item] * 10) / 10;
          }
        });
      }
      return results;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default getMeteoForecast;
