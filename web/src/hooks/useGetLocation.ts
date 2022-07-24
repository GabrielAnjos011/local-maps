import { useEffect, useState } from "react";

const defaultCoords = [-23.55052, -46.633308];
export default function useGetLocation() {
  const [coords, setCoors] = useState<number[] | null>(null);

  useEffect(() => {
    function onSuccess(position: GeolocationPosition) {
      setCoors([position.coords.latitude, position.coords.longitude]);
    }
    function onError() {
      console.log("error on get location");
      setCoors(defaultCoords);
    }
    try {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } catch (error) {
      setCoors(defaultCoords);
    }
  }, []);
  return { coords };
}
