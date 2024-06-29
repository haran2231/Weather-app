import axios from "axios";
import { useState, useEffect } from "react";

const Weather = () => {
    const [location, setLocation] = useState("Palani");
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState("");
    const [description, setDescription] = useState("");
    const [humidity, setHumidity] = useState("");
    const [pressure, setPressure] = useState("");
    const [wind, setWind] = useState("");
    const [city, setCity] = useState("Palani");
    const [showTime, setShowTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            setShowTime(
                date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds()
            );
        };

        updateTime(); // Initial call to set the time immediately
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        getWeather(); // Fetch weather when the component mounts
    }, []); 

    function loc(event) {
        setLocation(event.target.value);
        console.log(location);
    }

    function getWeather() {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=149ee5a9472e368c76c37012958c82ef`)
            .then(function (success) {
                console.log(success.data);
                setWeather(success.data.weather[0].main);
                setTemperature(success.data.main.temp);
                setDescription(success.data.weather[0].description);
                setHumidity(success.data.main.humidity);
                setPressure(success.data.main.pressure);
                setWind(success.data.wind.speed);
                setCity(location);
            })
            .catch(function () {
                setWeather("No details found, please enter correct city");
                setTemperature("No details found, please enter correct city");
                setDescription("No details found, please enter correct city");
            });
    }

    return (
        <section className="image">
            <div className="p-10 text-center">
                <input
                    type="text"
                    id="search-input"
                    className="px-4 py-2 mr-2 text-white bg-transparent border"
                    onChange={loc}
                    aria-describedby="searchCity"
                    placeholder="Search city..."
                    autoComplete="off"
                />
                <input
                    type="button"
                    className="px-4 py-2 text-white bg-transparent border"
                    onClick={getWeather}
                    value="Get Report"
                />
            </div>
            <span className="p-20 mt-3 text-4xl font-semibold text-white">
                <a href="#" id="celcius-link">C°</a> |
                <a href="#" id="fahrenheit-link">F°</a>
            </span>

            <div>
                <div className="flex flex-wrap items-center p-4 md:justify-around h-svh ">
                    <h1 id="current-temperature" className="font-bold text-8xl"> {temperature}°</h1>
                    <div className="text-3xl font-semibold leading-loose">
                        <p id="current-time" className="p-4 text-5xl text-center text-white bg-black border rounded-md">
                            {showTime}, {city}
                        </p>
                        <h2 id="current-day" className="my-4 font-bold text-orange-500">Today</h2>
                        <p id="weather-type" className="text-2xl text-white">
                            <span className="text-2xl text-yellow-400">Weather:</span> {weather}
                        </p>
                        <p id="description" className="text-2xl text-white">
                            <span className="text-2xl text-green-500">Description:</span> {description}
                        </p>
                    </div>
                    
                    <div className="text-3xl font-semibold ">
                        <ul >
                            <li className="text-2xl text-white">
                                <span className="text-2xl text-orange-500">Humidity:</span> <span id="humidity">{humidity}</span>
                            </li>
                            <li className="my-2 text-2xl text-white">
                                <span className="text-2xl text-green-500">Wind:</span> <span id="wind">{wind}</span>
                            </li>
                            <li className="text-2xl text-white">
                                <span className="text-2xl text-yellow-400">Pressure:</span> <span id="pressure">{pressure}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center py-24 bg-black ">
                <p className="text-2xl text-center text-white ">Wherever you go, no matter what the weather, always bring your own sunshine</p>
            </div>
        </section>
    );
}

export default Weather;
