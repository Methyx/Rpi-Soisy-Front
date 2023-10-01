import axios from "axios";
import { toast } from "react-toastify";

const getAddressByCoordinates = async (lat, lng) => {
  try {
    let url = "https://api-adresse.data.gouv.fr/reverse/";
    url += "?lon=" + lng;
    url += "&lat=" + lat;
    const response = await axios.get(url);
    return response.data?.features[0];
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

export default getAddressByCoordinates;
