export default function WeatherInfo({ weatherInfo }) {
  const dt = weatherInfo ? weatherInfo.dt : null;
  const date = new Date(dt * 1000);
  const localDate = date.toLocaleString();

  const urlIcon = weatherInfo?.weather?.[0]?.icon
    ? `http://openweathermap.org/img/wn/${weatherInfo?.weather[0]?.icon}.png`
    : null;

  return (
    <>
      {weatherInfo && (
        <div className="p-4 w-full h-64 max-w-sm mx-auto bg-white shadow-md rounded-md flex items-center flex-col">
          <div className="text-xl text-gray-800 mb-4">
            <div>{localDate}</div>
            <span className="text-blue-500 font-bold">{weatherInfo?.name}</span>
          </div>

          <div className="text-md text-gray-600">
            Weather:{" "}
            <span className="text-gray-450">
              <span className="font-bold text-blue-500">
                {weatherInfo?.weather?.[0]?.main}
              </span>
              {weatherInfo?.weather?.[0]?.description && (
                <span className="text-gray-350">
                  {" "}
                  - {weatherInfo?.weather?.[0]?.description}
                </span>
              )}
            </span>
          </div>
          <div className="text-md text-gray-500 mb-2">
            Wind Speed:{" "}
            <span className="font-bold text-blue-800">
              {weatherInfo?.wind?.speed} m/s
            </span>
          </div>
          <img src={urlIcon} className="w-20 h-20" />
        </div>
      )}
    </>
  );
}
