import { useEffect } from "react"
import { Background, WeatherCard } from "./components"
import { fetchCurrentLocation } from "./services/axios";
import { useDispatch } from "react-redux";
import { fetchWeather } from "./features/weatherSlice";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const handleSuccess = async (position) => {
      const { latitude, longitude } = position.coords;
      const location = await fetchCurrentLocation(latitude, longitude);
      dispatch(fetchWeather({ city: location, unit: "metric" }))
    };

    const handleError = (error) => {
      console.error('Error getting location:', error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.error('Geolocation is not supported.');
    }
  }, [dispatch])
  
  return (
    <main className="w-full h-screen text-white py-2 px-4 flex items-center justify-center">
      <Background />
      <WeatherCard />
    </main>
  )
}

export default App
