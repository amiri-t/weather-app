import React, { useState } from "react";
import styled from "styled-components";
import clearIcon from "../assets/clear.webp";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import mistIcon from "../assets/mistIcon.webp";
import humidity from "../assets/humidity.png";
import logo from "../assets/logo.png";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { motion } from "framer-motion";

const WeatherDisplay = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  var apiKey = "db9d7bc205045ccda12ff4e66ee319d6";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          setError(null);
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
    <Container>
      <img src={logo} className="logo" alt="" />
      <div className="searchBar">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type="search"
          placeholder="Enter City or Location..."
        />
        <button>
          <BsSearch
            disabled={!location.trim()}
            className="searchIcon"
            onClick={() => searchLocation()}
          />
        </button>
      </div>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        data.name != undefined && (
          <div className="weatherOutput">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="left"
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
                <h1 className="temperature">{data.main.temp.toFixed()}°C</h1>
              ) : null}
              {data.weather ? <h3>{data.weather[0].main}</h3> : null}
              <h2>
                {data.name}, {data.sys ? <span>{data.sys.country}</span> : null}
              </h2>
              <div className="data">
                <div>
                  <img src={humidity} alt="" />
                  <span>
                    {data.main ? <h2>{data.main.humidity}%</h2> : null}
                    <p>Humidity</p>
                  </span>
                </div>
                <div>
                  <img src={windIcon} alt="" />
                  <span>
                    {data.wind ? <h2>{data.wind.speed} Km/h</h2> : null}
                    <p>Wind Speed</p>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )
      )}
    </Container>
  );
};
const Container = styled.div`
  width: 94%;
  border-radius: 30px;
  height: 90vh;
  margin: auto;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--sunnyGradient);
  position: relative;
  .logo {
    width: 100px;
    position: absolute;
    top: 1%;
    left: 1%;
  }
  .error {
    color: white;
    text-align: center;
    margin-top: 1em;
  }
  .searchBar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    padding-top: 3em;
    transition: 1.4s;
    input {
      background: white;
      padding: 14px 20px;
      border: none;
      outline: none;
      font-family: "Montserrat", cursive;
      border-radius: 20px;
      font-size: 18px;
      width: 30%;
    }
    button {
      border: none;
      background: white;
      padding: 14px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.3s;
      .searchIcon {
        font-size: 20px;
      }
      :hover {
        background: #e4e4e4;
      }
    }
  }
  .weatherOutput {
    transition: 1.4s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3em;
    color: var(--fontPrimaryColor);
    .left {
      img {
        width: 400px;
        max-width: 700px;
      }
    }
    .right {
      margin-right: 8%;
      display: flex;
      flex-direction: column;
      align-items: center;
      h1 {
        font-size: 7em;
        font-weight: 200;
      }
      h3 {
        font-weight: 300;
        text-align: center;
      }
      h2 {
        margin-top: 1em;
        font-weight: 300;
        span {
          font-weight: 500;
        }
      }
      .data {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2em;
        div {
          display: flex;
          gap: 7px;
          align-items: center;
          span {
            margin-bottom: 1.7em;
            h2 {
              font-weight: 400;
            }
            p {
              color: var(--fontSecondaryColor);
            }
          }
          img {
            width: 60px;
          }
        }
      }
    }
  }
  @media (max-width: 970px) {
    .searchBar {
      input {
        width: 300px;
      }
    }
    .left {
      img {
        width: 400px;
      }
    }
  }
  @media (max-width: 840px) {
    height: auto;
    width: 99%;
    margin-top: 7px;
    .searchBar {
      margin-top: 2em;
      input {
        width: 70%;
      }
    }
    .weatherOutput {
      gap: 0px;
      flex-direction: column;
      .left {
        img {
          width: 200px;
        }
      }
      .right {
        margin-right: 0;
      }
    }
  }
  @media (max-width: 700px) {
    width: 100%;
    height: 100vh;
    margin-top: 0;
    border-radius: 0;
    justify-content: flex-start;
    padding-top: 15%;
    .searchBar {
      padding-top: 0;
    }
    .weatherOutput {
      .right {
        .data {
          gap: 7px;
        }
      }
    }
  }
`;

export default WeatherDisplay;
