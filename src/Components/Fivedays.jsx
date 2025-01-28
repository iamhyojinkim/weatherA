import React, { useEffect, useState } from "react";

export function Fivedays({ weatherInfo, api }) {
  const [fiveDaysData, setFiveDaysData] = useState([]);
  const urlIcon = weatherInfo?.weather?.[0]?.icon
    ? `http://openweathermap.org/img/wn/${weatherInfo?.weather[0]?.icon}.png`
    : null;

  useEffect(() => {
    const fetchFiveDays = async () => {
      if (!weatherInfo || !weatherInfo.coord) {
        console.error("Invalid Data :(");
        return;
      }
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherInfo.coord.lat}&lon=${weatherInfo.coord.lon}&appid=${api}`
      );
      const data = await response.json();
      setFiveDaysData(data.list.filter((_, index) => index % 8 === 0));
    };
    fetchFiveDays();
  }, [weatherInfo]);

  return (
    <>
      <div className="space-x-5 flex justify-center mt-20">
        {fiveDaysData.map((fd, idx) => {
          const date = new Date(fd.dt * 1000);
          const day = date.getDate();
          return (
            <>
              <div key={idx} className="flex justify-center">
                {day}
                {fd.weather[0].main}
                <img src={urlIcon} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
