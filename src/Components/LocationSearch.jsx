import React, { useEffect, useState } from "react";
import WeatherInfo from "./WeatherInfo";
import { useQuery } from "@tanstack/react-query";
import { Fivedays } from "./Fivedays";

const api = process.env.REACT_APP_WEATHER_API_KEY;

export function LocationSearch() {
  const [city, setCity] = useState("");
  const [wantedCity, setWantedCity] = useState("");
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    const fetchMyLocation = async () => {
      const res = await fetch(
        "https://ipgeolocation.abstractapi.com/v1/?api_key=ca95bd9594dd43e99e023793a440ef08&ip_address=134.87.150.166"
      );
      try {
        const data = await res.json();
        setMyLocation(data);
        if (data && data.region) setWantedCity(data.region);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyLocation();
  }, []);
  console.log(myLocation);

  const {
    isLoading,
    error,
    data: weatherInfo,
  } = useQuery({
    queryKey: ["city", wantedCity],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${wantedCity}&appid=${api}`
      );
      return response.json();
    },
    enabled: !!wantedCity,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setWantedCity(city);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!😓</p>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center pb-10 mt-10">
          <input
            className="text-black p-2 border rounded"
            type="text"
            placeholder="Search..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <button className="ml-5" type="submit">
            Search
          </button>
        </div>
      </form>
      <WeatherInfo weatherInfo={weatherInfo} />
      <Fivedays wantedCity={wantedCity} api={api} weatherInfo={weatherInfo} />
    </>
  );
}
