import React, { useState, useEffect } from "react";
import Weathercard from "./weatherCard";
import Map from "./map";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tempInfo, setTempInfo] = useState({});
  const [showElement, setShowElement] = useState(false);
  const [connectionMsg, setConnectionMsg] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
	getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    if (!latitude) {
		setSearchValue('ahmedabad');
      getWeatherInfo();
    }
  };

  useEffect(() => {
    if (latitude) {
      getLocationInfo();
    }
  }, [latitude, longitude]);

  const getLocationInfo = async () => {
    console.log(latitude, "latitude");
    console.log(longitude, "longitude");
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=3c822247860c9a4635b735db23f367a7`;
    let res = await fetch(url);
    let data = await res.json();
    const { name } = data;
    console.log(data.name, "dataaaa");
    setSearchValue(data.name);
  };

  useEffect(() => {
    getWeatherInfo();
  }, [searchValue]);

  window.ononline = (event) => {
    console.log("Back Online");
    setConnectionMsg("Back Online");
    setShowElement(true);
    setTimeout(function () {
      setShowElement(false);
    }, 3000);
  };

  window.onoffline = (event) => {
    console.log("Connection Lost");
    setConnectionMsg("Connection Lost");
    setShowElement(true);
  };

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3c822247860c9a4635b735db23f367a7`;

      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search by city..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      {showElement ? <p className="connection-msg"> {connectionMsg} </p> : ""}
      {/* our temp card  */}
      <div style={{ display: "flex" }}>
        <Weathercard {...tempInfo} />
        <div style={{ overflow: "hidden", marginLeft: "20px" }}></div>
        <Map searchValue={searchValue}></Map>
      </div>
    </>
  );
};

export default Temp;
