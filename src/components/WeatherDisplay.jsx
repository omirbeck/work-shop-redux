import React, { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { API_KEY, BASE_URL } from "../const";
import useForceUpdate from "../hooks/useForceUpdate";
import { Context } from "../index";

const WeatherDisplay = ({ name }) => {
  const store = useContext(Context);
  const state = store.getState();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const unsubscribeForForceUpdate = store.subscribe(forceUpdate);
    const unsubscribeForConsoleLog = store.subscribe((state) => console.log(state));

    return () => {
      unsubscribeForForceUpdate();
      unsubscribeForConsoleLog();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      store.dispatch({ 
        type: "SET_LOADED",
        payload: false,
      });
      const response = await fetch(
        `${BASE_URL}${name}&appid=${API_KEY}&units=imperial`
      );
      const data = await response.json();
      store.dispatch({ 
        type: "FETCH_WEATHER",
        payload: {
          main: data.main,
          name: data.name,
          weather: data.weather,
          wind: data.wind,
        }
      })
    };

    fetchWeather();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  if (!state.isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  const [weather] = state.weather;
  const { main, description, wind } = state;
  const iconUrl = `http://openweathermap.org/img/w/${weather.icon}.png`;
  return (
    <div>
      <h1>
        {weather.main} in {name}
        <img src={iconUrl} alt={description} />
      </h1>
      <p>Current: {main.temp}°</p>
      <p>High: {main.temp_max}°</p>
      <p>Low: {main.temp_min}°</p>
      <p>Wind Speed: {wind.speed} mi/hr</p>
    </div>
  );
};

export default WeatherDisplay;
