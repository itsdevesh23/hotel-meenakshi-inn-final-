"use client"

import React, { useState, useEffect } from "react"

function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)

        // Fetch real-time weather data for Tirupati
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Tirupati&units=metric&appid=bd5e378503939ddaee76f12ad7a97608`
        )
        if (!response.ok) throw new Error("Failed to fetch weather data")

        const data = await response.json()
        setWeather(data)
      } catch (err) {
        console.error("Error fetching weather:", err)
        setError("Failed to load weather data")
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (condition) => {
    const icons = {
      clear: "☀",
      sunny: "☀",
      clouds: "☁",
      cloudy: "☁",
      rain: "🌧",
      rainy: "🌧",
      thunderstorm: "⛈",
      snow: "❄",
      mist: "🌫",
      fog: "🌫",
    }
    return icons[condition.toLowerCase()] || "🌤"
  }

  if (loading) {
    return (
      <div className="weather-widget">
        <p>Loading weather data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="weather-widget">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="weather-widget">
      <h3>Current Weather in {weather.name}</h3>
      <div className="weather-content">
        <div className="weather-icon">{getWeatherIcon(weather.weather[0].main)}</div>
        <div className="weather-details">
          <p className="weather-temp">{Math.round(weather.main.temp)}°C</p>
          <p className="weather-condition">{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget

// Calorie Calculator Component
function CalorieCalculator() {
  const [food, setFood] = React.useState("")
  const [quantity, setQuantity] = React.useState(100)
  const [nutritionData, setNutritionData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const handleCalculate = async () => {
    if (!food) {
      setError("Please enter a food item")
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Second API integration: Nutrition API
      // Replace with actual API call in production
      // const response = await fetch(`https://api.nutritionix.com/v1_1/search/${food}?results=0:1&fields=item_name,nf_calories,nf_protein,nf_total_carbohydrate,nf_total_fat&appId=YOUR_APP_ID&appKey=YOUR_APP_KEY`);
      // const data = await response.json();

      // Simulated API response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Calculate mock nutrition data based on food and quantity
      const caloriesPerGram = Math.random() * 3 + 1 // 1-4 calories per gram
      const proteinPercentage = Math.random() * 0.2 + 0.1 // 10-30% protein
      const carbPercentage = Math.random() * 0.4 + 0.3 // 30-70% carbs
      const fatPercentage = 1 - proteinPercentage - carbPercentage // remaining % fat

      const calories = Math.round(quantity * caloriesPerGram)
      const protein = Math.round(quantity * proteinPercentage)
      const carbs = Math.round(quantity * carbPercentage)
      const fat = Math.round(quantity * fatPercentage)

      const mockData = {
        food: food,
        quantity: quantity,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
      }

      setNutritionData(mockData)
      setLoading(false)
    } catch (err) {
      console.error("Error calculating nutrition:", err)
      setError("Failed to calculate nutrition information")
      setLoading(false)
    }
  }

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
              onChange={(e) => setFood(e.target.value)}
              placeholder="Enter a food item (e.g., Butter Chicken)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity-input">Quantity (g)</label>
            <input
              type="number"
              id="quantity-input"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
        </div>

        <button className="btn primary-btn" onClick={handleCalculate} disabled={loading}>
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
ReactDOM.render(<WeatherWidget />, document.getElementById("weather-widget-container"))
ReactDOM.render(<CalorieCalculator />, document.getElementById("calorie-calculator-container"))
ReactDOM.render(<RoomAvailability />, document.getElementById("room-availability-container"))

