import React, { useEffect, useState } from "react";
import clearIcon from "../assets/clear.webp";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import mistIcon from "../assets/mistIcon.webp";
import humidity from "../assets/humidity.png";
import minTemp from "../assets/minimumTemp.webp";
import maxTemp from "../assets/maxTemp.png";
import logo from "../assets/logo.png";
import axios from "axios";
import { motion } from "framer-motion";
import "./weatherDisplay.css";

const WeatherDisplay = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [moreDetails, setMoreDetails] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(clearIcon);

  var apiKey = "db9d7bc205045ccda12ff4e66ee319d6";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const updateBackgroundColor = (weatherCondition) => {
    const colorMapping = {
      Clear: "var(--sunnyGradient)",
      Clouds: "var(--cloudyGradient)",
      Drizzle: "var(--rainyGradient)",
      Rain: "var(--rainyGradient)",
      Snow: "var(--snowyGradient)",
      Mist: "var(--mistyGradient)",
    };

    setBackgroundColor(
      colorMapping[weatherCondition] || "var(--sunnyGradient)"
    );
  };
  useEffect(() => {
    updateBackgroundColor(data.weather ? data.weather[0].main : null);
  }, [data]);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          setError(null);
          updateBackgroundColor(response.data.weather[0].main);
        })
        .catch((error) => {
          setError("Please enter a valid city or location"); // Set the error message
        });
    }
  };

  // ket funksion e kom bo per mi bo iconat qe mu var prej motit, pra. dynamically
  const weatherIcons = {
    Clear: clearIcon,
    Clouds: cloudIcon,
    Drizzle: drizzleIcon,
    Rain: rainIcon,
    Snow: snowIcon,
    Mist: mistIcon,
  };
  const weatherCondition = data.weather ? data.weather[0].main : null;
  const iconSrc = weatherIcons[weatherCondition] || clearIcon;

  return (
    <div
      className="container"
      style={{ background: backgroundColor, transition: 0.7 }}
    >
      <motion.img
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        src={logo}
        className="logo"
        alt=""
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="searchBar"
      >
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type="search"
          placeholder="Enter City or Location..."
        />
      </motion.div>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        data.name !== undefined && (
          <div className="weatherOutput">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="left"
              layout
            >
              <img src={iconSrc} alt="" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="right"
            >
              {data.main ? (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="temperature"
                >
                  {data.main.temp.toFixed()}°C
                </motion.h1>
              ) : null}
              {data.weather ? (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  {data.weather[0].main}
                </motion.h3>
              ) : null}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                {data.name}, {data.sys ? <span>{data.sys.country}</span> : null}
              </motion.h2>
              <div className="data">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.6 }}
                >
                  <img src={humidity} alt="" />
                  <span>
                    {data.main ? <h2>{data.main.humidity}%</h2> : null}
                    <p>Humidity</p>
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.8 }}
                >
                  <img src={windIcon} alt="" />
                  <span>
                    {data.wind ? (
                      <h2>{data.wind.speed.toFixed()} Km/h</h2>
                    ) : null}
                    <p>Wind Speed</p>
                  </span>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7, type: "spring" }}
                className="moreData"
              >
                {moreDetails === false ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                    className="toggleDetails"
                    onClick={() => setMoreDetails(!moreDetails)}
                  >
                    Show More ↓
                  </motion.p>
                ) : (
                  <motion.p
                    className="toggleDetails"
                    onClick={() => setMoreDetails(!moreDetails)}
                  >
                    Show Less ↑
                  </motion.p>
                )}
                {moreDetails === true ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2,
                    }}
                    className="wrapper"
                  >
                    <div>
                      <img src={maxTemp} alt="" />
                      <span>
                        {data.main ? (
                          <h2>{data.main.temp_max.toFixed()}°C</h2>
                        ) : null}
                        <p>Max Temp.</p>
                      </span>
                    </div>
                    <div>
                      <img src={minTemp} alt="" />
                      <span>
                        {data.main ? (
                          <h2>{data.main.temp_min.toFixed()}°C</h2>
                        ) : null}
                        <p>Min Temp</p>
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  ""
                )}
              </motion.div>
            </motion.div>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherDisplay;
