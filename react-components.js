"use client"

import React from "react"

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create container for React components if it doesn't exist
  if (!document.getElementById("react-components-container")) {
    const reactContainer = document.createElement("div")
    reactContainer.id = "react-components-container"
    reactContainer.className = "section_container"
    reactContainer.style.display = "flex"
    reactContainer.style.flexDirection = "column"
    reactContainer.style.gap = "2rem"

    // Insert before footer
    const footer = document.querySelector("footer")
    if (footer) {
      document.body.insertBefore(reactContainer, footer)
    } else {
      document.body.appendChild(reactContainer)
    }

    // Create weather widget container
    const weatherContainer = document.createElement("div")
    weatherContainer.id = "weather-widget-container"
    weatherContainer.className = "room__card"

    // Create calorie calculator container
    const calorieContainer = document.createElement("div")
    calorieContainer.id = "calorie-calculator-container"
    calorieContainer.className = "room__card"

    // Add containers to main container
    reactContainer.appendChild(weatherContainer)
    reactContainer.appendChild(calorieContainer)

    // Add section title
    const sectionTitle = document.createElement("div")
    sectionTitle.innerHTML = `
      <p class="section__subheader">HEALTH & WELLNESS</p>
      <h2 class="section__header">Stay Healthy During Your Stay</h2>
    `
    reactContainer.insertBefore(sectionTitle, weatherContainer)
  }

  // Add theme toggle button
  const themeToggle = document.createElement("button")
  themeToggle.id = "theme-toggle"
  themeToggle.innerHTML = "🌙"
  themeToggle.style.position = "fixed"
  themeToggle.style.bottom = "20px"
  themeToggle.style.right = "20px"
  themeToggle.style.zIndex = "1000"
  themeToggle.style.width = "50px"
  themeToggle.style.height = "50px"
  themeToggle.style.borderRadius = "50%"
  themeToggle.style.backgroundColor = "var(--primary-color)"
  themeToggle.style.color = "white"
  themeToggle.style.border = "none"
  themeToggle.style.cursor = "pointer"
  themeToggle.style.fontSize = "1.5rem"
  themeToggle.style.display = "flex"
  themeToggle.style.alignItems = "center"
  themeToggle.style.justifyContent = "center"
  document.body.appendChild(themeToggle)

  // Check for saved theme preference or default to light
  const currentTheme = localStorage.getItem("theme") || "light"
  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme")
    themeToggle.innerHTML = "☀️"
  }

  // Theme toggle functionality
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme")

    // Update button icon
    if (document.body.classList.contains("dark-theme")) {
      themeToggle.innerHTML = "☀️"
      localStorage.setItem("theme", "dark")
    } else {
      themeToggle.innerHTML = "🌙"
      localStorage.setItem("theme", "light")
    }
  })

  // Add dark theme styles
  const darkThemeStyles = document.createElement("style")
  darkThemeStyles.textContent = `
    .dark-theme {
      --text-dark: #f8f9fa;
      --text-light: #ced4da;
      --white: #212529;
      background-color: #121212;
    }
    
    .dark-theme .header {
      background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("assets/hotel\\ 1.jpg");
    }
    
    .dark-theme .room__card,
    .dark-theme .banner__content,
    .dark-theme .booking__form,
    .dark-theme .service__content,
    .dark-theme .explore__content {
      background-color: #2d2d2d;
      box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3);
    }
    
    .dark-theme .room_card_icons span {
      background-color: #3d3d3d;
    }
    
    .dark-theme .weather-widget,
    .dark-theme .calorie-calculator {
      color: var(--text-dark);
    }
    
    .dark-theme .nutrition-results {
      background-color: #3d3d3d;
    }
    
    .dark-theme .nutrition-item {
      background-color: #4d4d4d;
    }
  `
  document.head.appendChild(darkThemeStyles)

  // Add React components styles
  const reactStyles = document.createElement("style")
  reactStyles.textContent = `
    #react-components-container {
      margin-top: 2rem;
    }
    
    .weather-widget, .calorie-calculator {
      padding: 1.5rem;
    }
    
    .weather-widget h3, .calorie-calculator h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }
    
    .weather-content {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    
    .weather-icon {
      font-size: 3rem;
    }
    
    .weather-details {
      flex: 1;
    }
    
    .weather-temp {
      font-size: 2rem;
      font-weight: bold;
    }
    
    .weather-condition {
      text-transform: capitalize;
      margin-bottom: 0.5rem;
    }
    
    .weather-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.9rem;
      color: var(--text-light);
    }
    
    .calculator-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .form-row {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .form-group {
      flex: 1;
      min-width: 200px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .form-group input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .error-message {
      color: #e74c3c;
      margin-top: 0.5rem;
    }
    
    .nutrition-results {
      margin-top: 1.5rem;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 8px;
    }
    
    .nutrition-results h4 {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .nutrition-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 1rem;
    }
    
    .nutrition-item {
      background-color: white;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .nutrition-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-color);
    }
    
    .nutrition-label {
      font-size: 0.9rem;
      color: var(--text-light);
    }
    
    .spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: var(--primary-color);
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: spin 1s linear infinite;
      margin: 2rem auto;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
      .weather-content {
        flex-direction: column;
        text-align: center;
      }
      
      .form-group {
        min-width: 100%;
      }
    }
  `
  document.head.appendChild(reactStyles)
})

// Weather Widget Component
class WeatherWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: null,
      loading: true,
      error: null,
    }
  }

  componentDidMount() {
    this.fetchWeather()
  }

  fetchWeather = async () => {
    try {
      this.setState({ loading: true })

      // Replace with your API key or use the provided one
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Tirupati&units=metric&appid=bd5e378503939ddaee76f12ad7a97608",
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status}`)
      }

      const data = await response.json()
      this.setState({ weather: data, error: null })
    } catch (err) {
      console.error("Error fetching weather:", err)
      this.setState({ error: "Failed to load weather data. Please try again later." })
    } finally {
      this.setState({ loading: false })
    }
  }

  getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return "☀️"
      case "clouds":
        return "☁️"
      case "rain":
        return "🌧️"
      case "thunderstorm":
        return "⛈️"
      case "snow":
        return "❄️"
      case "mist":
        return "🌫️"
      default:
        return "🌤️"
    }
  }

  render() {
    const { weather, loading, error } = this.state

    if (loading) {
      return (
        <div className="weather-widget">
          <h3>Weather in Tirupati</h3>
          <div className="spinner"></div>
          <p style={{ textAlign: "center" }}>Loading weather data...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="weather-widget">
          <h3>Weather in Tirupati</h3>
          <p style={{ color: "#e74c3c" }}>{error}</p>
        </div>
      )
    }

    return (
      <div className="weather-widget">
        <h3>Current Weather in Tirupati</h3>
        <div className="weather-content">
          <div className="weather-icon">
            {weather && weather.weather && weather.weather[0] && this.getWeatherIcon(weather.weather[0].main)}
          </div>
          <div className="weather-details">
            {weather && (
              <>
                <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
                <div className="weather-condition">{weather.weather[0].description}</div>
                <div className="weather-meta">
                  <span>Humidity: {weather.main.humidity}%</span>
                  <span>Wind: {weather.wind.speed} m/s</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
}

// Calorie Calculator Component
class CalorieCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      food: "",
      quantity: 100,
      nutritionData: null,
      loading: false,
      error: null,
    }
  }

  handleFoodChange = (e) => {
    this.setState({ food: e.target.value })
  }

  handleQuantityChange = (e) => {
    this.setState({ quantity: Number.parseInt(e.target.value) || 0 })
  }

  handleCalculate = async () => {
    const { food, quantity } = this.state

    if (!food) {
      this.setState({ error: "Please enter a food item" })
      return
    }

    try {
      this.setState({ loading: true, error: null })

      // Simulated API response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Calculate mock nutrition data based on food and quantity
      const caloriesPerGram = Math.random() * 3 + 1
      const proteinPercentage = Math.random() * 0.2 + 0.1
      const carbPercentage = Math.random() * 0.4 + 0.3
      const fatPercentage = 1 - proteinPercentage - carbPercentage

      const calories = Math.round(quantity * caloriesPerGram)
      const protein = Math.round(quantity * proteinPercentage)
      const carbs = Math.round(quantity * carbPercentage)
      const fat = Math.round(quantity * fatPercentage)

      this.setState({
        nutritionData: { food, quantity, calories, protein, carbs, fat },
      })
    } catch (err) {
      console.error("Error calculating nutrition:", err)
      this.setState({ error: "Failed to calculate nutrition information" })
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { food, quantity, nutritionData, loading, error } = this.state

    return (
      <div className="calorie-calculator">
        <h3>Nutrition Calculator</h3>
        <div className="calculator-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="food-input">Food Item</label>
              <input
                type="text"
                id="food-input"
                value={food}
                onChange={this.handleFoodChange}
                placeholder="Enter a food item (e.g., Butter Chicken)"
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity-input">Quantity (g)</label>
              <input type="number" id="quantity-input" value={quantity} onChange={this.handleQuantityChange} min="1" />
            </div>
          </div>

          <button className="btn" onClick={this.handleCalculate} disabled={loading}>
            {loading ? "Calculating..." : "Calculate Nutrition"}
          </button>

          {error && <div className="error-message">{error}</div>}

          {nutritionData && (
            <div className="nutrition-results">
              <h4>
                Nutrition Information for {nutritionData.food} ({nutritionData.quantity}g)
              </h4>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <div className="nutrition-value">{nutritionData.calories}</div>
                  <div className="nutrition-label">Calories</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{nutritionData.protein}g</div>
                  <div className="nutrition-label">Protein</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{nutritionData.carbs}g</div>
                  <div className="nutrition-label">Carbs</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{nutritionData.fat}g</div>
                  <div className="nutrition-label">Fat</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

// Room Availability Component
function RoomAvailability() {
  const [checkIn, setCheckIn] = React.useState("")
  const [checkOut, setCheckOut] = React.useState("")
  const [rooms, setRooms] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates")
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Server-side processing: Room availability check
      const mockRooms = [
        {
          id: 1,
          type: "Standard Room",
          price: 3500,
          available: Math.random() > 0.3, // 70% chance of availability
          maxOccupancy: 2,
        },
        {
          id: 2,
          type: "Deluxe Room",
          price: 5000,
          available: Math.random() > 0.4, // 60% chance of availability
          maxOccupancy: 2,
        },
        {
          id: 3,
          type: "Executive Suite",
          price: 8000,
          available: Math.random() > 0.6, // 40% chance of availability
          maxOccupancy: 3,
        },
        {
          id: 4,
          type: "Presidential Suite",
          price: 15000,
          available: Math.random() > 0.8, // 20% chance of availability
          maxOccupancy: 4,
        },
      ]

      setRooms(mockRooms)
      setLoading(false)
    } catch (err) {
      console.error("Error checking availability:", err)
      setError("Failed to check room availability")
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="room-availability">
      <h3>Check Room Availability</h3>
      <div className="availability-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="check-in-date">Check-in Date</label>
            <input
              type="date"
              id="check-in-date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={today}
            />
          </div>
          <div className="form-group">
            <label htmlFor="check-out-date">Check-out Date</label>
            <input
              type="date"
              id="check-out-date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || today}
            />
          </div>
        </div>

        <button className="btn primary-btn" onClick={handleSearch} disabled={loading}>
          {loading ? "Checking..." : "Check Availability"}
        </button>

        {error && <div className="error-message">{error}</div>}

        {rooms.length > 0 && (
          <div className="availability-results">
            <h4>Available Rooms</h4>
            <div className="room-list">
              {rooms.map((room) => (
                <div key={room.id} className={`room-item ${!room.available ? "unavailable" : ""}`}>
                  <div className="room-info">
                    <h5>{room.type}</h5>
                    <p>Max Occupancy: {room.maxOccupancy} persons</p>
                    <p className="room-price">₹{room.price} per night</p>
                  </div>
                  <div className="room-status">
                    {room.available ? (
                      <a href="#room-booking" className="btn secondary-btn">
                        Book Now
                      </a>
                    ) : (
                      <span className="unavailable-text">Not Available</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Render React Components
document.addEventListener("DOMContentLoaded", () => {
  let ReactDOM // Declare ReactDOM
  if (typeof ReactDOM !== "undefined" && document.getElementById("weather-widget-container")) {
    ReactDOM.render(React.createElement(WeatherWidget, null), document.getElementById("weather-widget-container"))

    ReactDOM.render(
      React.createElement(CalorieCalculator, null),
      document.getElementById("calorie-calculator-container"),
    )
  } else {
    // If React is not loaded, add it dynamically
    const loadReact = () => {
      const reactScript = document.createElement("script")
      reactScript.src = "https://unpkg.com/react@17/umd/react.production.min.js"
      reactScript.crossOrigin = ""

      const reactDOMScript = document.createElement("script")
      reactDOMScript.src = "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"
      reactDOMScript.crossOrigin = ""

      reactScript.onload = () => {
        document.body.appendChild(reactDOMScript)
      }

      reactDOMScript.onload = () => {
        // Once React is loaded, render components
        ReactDOM = window.ReactDOM // Assign ReactDOM after loading
        ReactDOM.render(React.createElement(WeatherWidget, null), document.getElementById("weather-widget-container"))

        ReactDOM.render(
          React.createElement(CalorieCalculator, null),
          document.getElementById("calorie-calculator-container"),
        )
      }

      document.body.appendChild(reactScript)
    }

    loadReact()
  }
})

