import React from "react";
import styled from "styled-components";
import clearIcon from "../assets/clear.webp";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import clearBgImg from "../assets/cleanBackgroundImg.jpg";
import humidity from "../assets/humidity.png";
import { BsSearch } from "react-icons/bs";

const WeatherDisplay = () => {
  return (
    <Container>
      <div className="searchBar">
        <input type="search" placeholder="Enter City Name..." />
        <button>
          <BsSearch className="searchIcon" />
        </button>
      </div>
      <div className="weatherOutput">
        <div className="left">
          <img src={clearIcon} alt="" />
        </div>
        <div className="right">
          <h1 className="temperature">24°C</h1>
          <h3>Clear</h3>
          <h2>
            Podujeva, <span>KOSOVO</span>
          </h2>
          <div className="data">
            <div>
              <img src={humidity} alt="" />
              <span>
                <h2>70%</h2>
                <p>Humidity</p>
              </span>
            </div>
            <div>
              <img src={windIcon} alt="" />
              <span>
                <h2>17 Km/h</h2>
                <p>Wind Speed</p>
              </span>
            </div>
          </div>
        </div>
      </div>
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
  .searchBar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    padding-top: 3em;
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3em;
    color: var(--fontPrimaryColor);
    .left {
      img {
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
