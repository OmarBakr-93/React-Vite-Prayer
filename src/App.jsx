import { useEffect, useState } from "react";
import Prayer from "./components/prayer";

function App() {
  const [prayersTime, setPrayersTime] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [city, setCity] = useState("cairo");

  const cities = [
    { name: "القاهرة", value: "cairo" },
    { name: "قنا", value: "qena" },
    { name: "الدقهلية", value: "dakahlia" },
    { name: "السويس", value: "suez" },
    { name: "المنوفية", value: "minya" },
    { name: "الاسماعيلية", value: "ismailia" },
    { name: "القليوبية", value: "qalyubia" },
    { name: "اسوان", value: "aswan" },
    { name: "الأقصر", value: "luxor" },
    { name: "الاسكندرية", value: "alexandria" },
  ];

  useEffect(() => {
    const fetchapi = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/15-03-2025?country=SA&city=${city}`
        );
        const data = await response.json();
        setPrayersTime(data.data.timings);
        setDateTime(data.data.date.gregorian.date);
      } catch (error) {
        console.log(error);
      }
    };
    fetchapi();
  }, [city]);

  const formatTime = (time) => {
    if (!time) {
      return "00:00";
    }
    let [hour, minute] = time.split(":").map(Number);
    const format = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute < 10 ? "0" + minute : minute} ${format}`;
  };

  return (
    <section>
      <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>المدينة</h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>
        <Prayer name="الفجر" time={formatTime(prayersTime.Fajr)} />
        <Prayer name="الظهر" time={formatTime(prayersTime.Dhuhr)} />
        <Prayer name="العصر" time={formatTime(prayersTime.Asr)} />
        <Prayer name="المغرب" time={formatTime(prayersTime.Maghrib)} />
        <Prayer name="العشاء" time={formatTime(prayersTime.Isha)} />
      </div>
    </section>
  );
}

export default App;
