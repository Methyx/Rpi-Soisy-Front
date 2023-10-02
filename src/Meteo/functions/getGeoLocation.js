import { toast } from "react-toastify";

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
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      toast.warning("Vous n'avez pas autorisé la géolocalisation");
      setIsLocated(false);
    }
  } else {
    toast.warning("Localisation impossible");
    setIsLocated(false);
  }
};

export default getGeoLocation;
