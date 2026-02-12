// ===============================
// CONFIG
// ===============================
const apiKey = "3c3e55a9de9e4979b93131427261102";


// ===============================
// CORE WEATHER FUNCTION
// ===============================
async function fetchWeather(query, prefix) {
    try {
        console.log("Fetching weather for:", query);

        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(data);

        updateUI(data, prefix);

    } catch (error) {
        console.error("Error:", error.message);
        alert("Could not fetch weather data.");
    }
}


// ===============================
// UI UPDATE FUNCTION
// ===============================
function updateUI(data, prefix) {

    // If it's search card, update city name
    if (prefix === "search") {
        document.getElementById("search_city").innerText =
            data.location.name;
    }

    document.getElementById(`${prefix}_temp`).innerText =
        data.current.temp_c + " °C";

    document.getElementById(`${prefix}_feels`).innerText =
        data.current.feelslike_c + " °C";

    document.getElementById(`${prefix}_humidity`).innerText =
        data.current.humidity + " %";

    document.getElementById(`${prefix}_min`).innerText =
        data.current.temp_c + " °C";

    document.getElementById(`${prefix}_max`).innerText =
        data.current.temp_c + " °C";
}


// ===============================
// DEFAULT CITIES (AUTO LOAD)
// ===============================
function loadDefaultCities() {
    fetchWeather("Delhi", "delhi");
    fetchWeather("Kanpur", "kanpur");
    fetchWeather("Pune", "pune");
}


// ===============================
// SEARCH FORM HANDLER
// ===============================
function setupSearch() {
    const form = document.getElementById("searchForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const city = document
            .getElementById("searchInput")
            .value
            .trim();

        if (city !== "") {
            fetchWeather(city, "search");
        }
    });
}


// ===============================
// CURRENT LOCATION HANDLER
// ===============================
function setupCurrentLocation() {

    const btn = document.getElementById("currentLocation");
      if (!btn) return; 

    btn.addEventListener("click", function () {

        if (!navigator.geolocation) {
            alert("Geolocation not supported.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const query = `${lat},${lon}`;
                fetchWeather(query, "search");

            },
            () => {
                alert("Location permission denied.");
            }
        );
    });
}


// ===============================
// INITIALIZE APP
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    loadDefaultCities();
    setupSearch();
    setupCurrentLocation();

});
