import { toast } from "react-toastify";

const geoParis = {
  lng: 2.347,
  lat: 48.859,
};

const getGeoLocation = async (setIsLocated, setGeoPosition) => {
  if ("geolocation" in navigator) {
    const permission = await navigator.permissions.query({
      name: "geolocation",
    });
    if (permission.state !== "denied") {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          setGeoPosition({
            lng: success.coords.longitude,
            lat: success.coords.latitude,
          });
          setIsLocated(true);
        },
        (error) => {
          toast.error(error.message);
          setIsLocated(false);
          setGeoPosition(geoParis);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      toast.warning("Vous n'avez pas autorisé la géolocalisation");
      setIsLocated(false);
      setGeoPosition(geoParis);
    }
  } else {
    toast.warning("Localisation impossible");
    setIsLocated(false);
    setGeoPosition(geoParis);
  }
};

export default getGeoLocation;
