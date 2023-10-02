import axios from "axios";
import { toast } from "react-toastify";

const getNearestMeteoPoint = async (position) => {
  // input : position : array of coords [lat, lng]
  //
  // return an array of coords [lat, lng] of the the nearest meteo point :
  //
  //     [49, 2.3]
  //
  //
  try {
    if (!position || position.length !== 2) {
      return null;
    }
    const urlSource =
      "https://public.opendatasoft.com/api/records/1.0/search/?dataset=arome-0025-sp1_sp2";
    let url = urlSource + "&rows=1"; // only 1 result to find the nearest
    url += "&sort=-dist"; // filter by distance
    url +=
      "&geofilter.distance=" +
      position[0].toString() +
      "," +
      position[1].toString() +
      ",5000"; // 5000 meters around
    const response = await axios.get(url);
    if (response.data.nhits > 0) {
      return response.data.records[0].fields.position;
    } else {
      return null;
    }
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

export default getNearestMeteoPoint;
