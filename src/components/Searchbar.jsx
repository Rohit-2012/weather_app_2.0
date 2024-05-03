import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { fetchWeather } from "../features/weatherSlice";

const Searchbar = () => {
  const [city, setCity] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (city.trim()) {
      dispatch(fetchWeather({ city, unit: "metric" }));
      setCity("");
    }
    setCity('')
  };

  return (
    <div className="flex items-center justify-center sm:justify-end gap-3">
      <input
        type="text"
        className="rounded-xl py-1 px-2 text-slate-600 capitalize focus:outline-none placeholder:lowercase"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="enter city name..."
      />
      <button onClick={handleSubmit}>
        <IoSearchOutline className="text-2xl cursor-pointer transition ease-out hover:scale-125" />
      </button>
    </div>
  );
};

export default Searchbar;
