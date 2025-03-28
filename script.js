// Navigation and Page Routing
document.addEventListener("DOMContentLoaded", () => {
    // Navigation
    const navLinks = document.querySelectorAll(".nav-links a")
    const hamburger = document.querySelector(".hamburger")
    const mobileMenu = document.querySelector(".nav-links")
  
    // Handle navigation clicks
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href").substring(1)
  
        // Remove active class from all links and add to clicked link
        navLinks.forEach((link) => link.classList.remove("active"))
        this.classList.add("active")
  
        // Hide all pages and show target page
        const pages = document.querySelectorAll(".page")
        pages.forEach((page) => page.classList.remove("active"))
        document.getElementById(targetId).classList.add("active")
  
        // Scroll to top
        window.scrollTo(0, 0)
      })
    })
  
    // Handle URL hash changes
    function handleHashChange() {
      const hash = window.location.hash || "#home"
      const targetId = hash.substring(1)
  
      // Activate correct nav link
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === hash) {
          link.classList.add("active")
        } else {
          link.classList.remove("active")
        }
      })
  
      // Show correct page
      const pages = document.querySelectorAll(".page")
      pages.forEach((page) => {
        if (page.id === targetId) {
          page.classList.add("active")
        } else {
          page.classList.remove("active")
        }
      })
    }
  
    // Check hash on page load
    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
  
    // Mobile menu toggle
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const testimonialDots = document.querySelectorAll(".testimonial-dots .dot")
    let currentTestimonial = 0
  
    function showTestimonial(index) {
      testimonialSlides.forEach((slide) => slide.classList.remove("active"))
      testimonialDots.forEach((dot) => dot.classList.remove("active"))
  
      testimonialSlides[index].classList.add("active")
      testimonialDots[index].classList.add("active")
      currentTestimonial = index
    }
  
    // Auto-rotate testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length
      showTestimonial(currentTestimonial)
    }, 5000)
  
    // Dot navigation for testimonials
    testimonialDots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const index = Number.parseInt(this.getAttribute("data-index"))
        showTestimonial(index)
      })
    })
  
    // Room Filtering
    const filterBtns = document.querySelectorAll(".filter-btn")
    const roomCards = document.querySelectorAll(".room-card")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Update active button
        filterBtns.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")
  
        const filter = this.getAttribute("data-filter")
  
        // Show/hide rooms based on filter
        roomCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  
    // Menu Tabs
    const menuTabs = document.querySelectorAll(".menu-tab")
    const menuContents = document.querySelectorAll(".menu-tab-content")
  
    menuTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Update active tab
        menuTabs.forEach((tab) => tab.classList.remove("active"))
        this.classList.add("active")
  
        const tabId = this.getAttribute("data-tab")
  
        // Show selected tab content
        menuContents.forEach((content) => {
          if (content.id === tabId) {
            content.classList.add("active")
          } else {
            content.classList.remove("active")
          }
        })
      })
    })
  
    // Shopping Cart Functionality
    const addToCartBtns = document.querySelectorAll(".add-to-cart")
    const cartItemsContainer = document.getElementById("cart-items")
    const cartTotalPrice = document.getElementById("cart-total-price")
    const cartTotalCalories = document.getElementById("cart-total-calories")
    const reserveTableBtn = document.getElementById("reserve-table-btn")
  
    const cart = []
  
    // Add item to cart
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const item = this.getAttribute("data-item")
        const price = Number.parseInt(this.getAttribute("data-price"))
        const calories = Number.parseInt(this.getAttribute("data-calories"))
  
        // Check if item already in cart
        const existingItem = cart.find((cartItem) => cartItem.item === item)
  
        if (existingItem) {
          existingItem.quantity++
        } else {
          cart.push({
            item,
            price,
            calories,
            quantity: 1,
          })
        }
  
        updateCart()
      })
    })
  
    // Update cart display
    function updateCart() {
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>'
        cartTotalPrice.textContent = "₹0"
        cartTotalCalories.textContent = "0 cal"
        return
      }
  
      let cartHTML = ""
      let totalPrice = 0
      let totalCalories = 0
  
      cart.forEach((cartItem, index) => {
        const itemTotal = cartItem.price * cartItem.quantity
        const caloriesTotal = cartItem.calories * cartItem.quantity
  
        totalPrice += itemTotal
        totalCalories += caloriesTotal
  
        cartHTML += `
                  <div class="cart-item">
                      <span class="cart-item-name">${cartItem.item} x${cartItem.quantity}</span>
                      <span class="cart-item-price">₹${itemTotal}</span>
                      <span class="cart-item-calories">${caloriesTotal} cal</span>
                      <button class="remove-item" data-index="${index}">×</button>
                  </div>
              `
      })
  
      cartItemsContainer.innerHTML = cartHTML
      cartTotalPrice.textContent = `₹${totalPrice}`
      cartTotalCalories.textContent = `${totalCalories} cal`
  
      // Add event listeners to remove buttons
      document.querySelectorAll(".remove-item").forEach((btn) => {
        btn.addEventListener("click", function () {
          const index = Number.parseInt(this.getAttribute("data-index"))
  
          if (cart[index].quantity > 1) {
            cart[index].quantity--
          } else {
            cart.splice(index, 1)
          }
  
          updateCart()
        })
      })
    }
  
    // Reserve Table Button
    if (reserveTableBtn) {
      reserveTableBtn.addEventListener("click", () => {
        if (cart.length === 0) {
          alert("Please add at least one item to your order.")
          return
        }
  
        // Navigate to table reservation page with cart data
        window.location.hash = "#table-reservation"
  
        // Store cart in sessionStorage
        sessionStorage.setItem("preOrderItems", JSON.stringify(cart))
  
        // Load pre-order items if available
        loadPreOrderItems()
      })
    }
  
    // Auth Tabs
    const authTabs = document.querySelectorAll(".auth-tab")
    const authForms = document.querySelectorAll(".auth-form")
  
    authTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Update active tab
        authTabs.forEach((tab) => tab.classList.remove("active"))
        this.classList.add("active")
  
        const formId = this.getAttribute("data-tab")
  
        // Show selected form
        authForms.forEach((form) => {
          if (form.id === formId) {
            form.classList.add("active")
          } else {
            form.classList.remove("active")
          }
        })
      })
    })
  
    // Room Booking Form
    const bookingForm = document.getElementById("booking-form")
    const roomTypeSelect = document.getElementById("room-type")
    const selectedRoomDetails = document.getElementById("selected-room-details")
    const selectedRoomImage = document.getElementById("selected-room-image")
    const selectedRoomName = document.getElementById("selected-room-name")
    const selectedRoomDescription = document.getElementById("selected-room-description")
    const selectedRoomPrice = document.getElementById("selected-room-price")
  
    // Room data
    const roomData = {
      standard: {
        name: "Standard Room",
        description: "Comfortable room with all essential amenities for a pleasant stay.",
        price: 3500,
        image: "https://via.placeholder.com/300x200",
      },
      deluxe: {
        name: "Deluxe Room",
        description: "Spacious room with premium amenities and city view.",
        price: 5000,
        image: "https://via.placeholder.com/300x200",
      },
      executive: {
        name: "Executive Suite",
        description: "Luxurious suite with separate living area and premium amenities.",
        price: 8000,
        image: "https://via.placeholder.com/300x200",
      },
      presidential: {
        name: "Presidential Suite",
        description: "Our most luxurious accommodation with panoramic views and butler service.",
        price: 15000,
        image: "https://via.placeholder.com/300x200",
      },
    }
  
    // Update room details when room type changes
    if (roomTypeSelect) {
      roomTypeSelect.addEventListener("change", function () {
        const roomType = this.value
  
        if (roomType && roomData[roomType]) {
          selectedRoomImage.src = roomData[roomType].image
          selectedRoomName.textContent = roomData[roomType].name
          selectedRoomDescription.textContent = roomData[roomType].description
          selectedRoomPrice.textContent = `₹${roomData[roomType].price}`
          selectedRoomDetails.classList.remove("hidden")
  
          // Update booking summary
          updateBookingSummary()
        } else {
          selectedRoomDetails.classList.add("hidden")
        }
      })
    }
  
    // Date inputs for booking
    const checkInInput = document.getElementById("check-in")
    const checkOutInput = document.getElementById("check-out")
  
    // Set min date to today
    if (checkInInput && checkOutInput) {
      const today = new Date().toISOString().split("T")[0]
      checkInInput.min = today
  
      // Update checkout min date when checkin changes
      checkInInput.addEventListener("change", function () {
        checkOutInput.min = this.value
  
        // If checkout date is before new checkin date, reset it
        if (checkOutInput.value && checkOutInput.value < this.value) {
          checkOutInput.value = ""
        }
  
        updateBookingSummary()
      })
  
      checkOutInput.addEventListener("change", updateBookingSummary)
    }
  
    // Update booking summary
    function updateBookingSummary() {
      const summaryCheckIn = document.getElementById("summary-check-in")
      const summaryCheckOut = document.getElementById("summary-check-out")
      const summaryNights = document.getElementById("summary-nights")
      const summaryRoomType = document.getElementById("summary-room-type")
      const summaryRoomPrice = document.getElementById("summary-room-price")
      const summaryTaxes = document.getElementById("summary-taxes")
      const summaryTotal = document.getElementById("summary-total")
  
      if (!summaryCheckIn || !checkInInput.value || !checkOutInput.value || !roomTypeSelect.value) {
        return
      }
  
      const checkIn = new Date(checkInInput.value)
      const checkOut = new Date(checkOutInput.value)
      const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
  
      if (nights <= 0) {
        return
      }
  
      const roomType = roomTypeSelect.value
      const roomPrice = roomData[roomType].price
      const subtotal = roomPrice * nights
      const taxes = Math.round(subtotal * 0.18) // 18% tax
      const total = subtotal + taxes
  
      summaryCheckIn.textContent = checkIn.toLocaleDateString()
      summaryCheckOut.textContent = checkOut.toLocaleDateString()
      summaryNights.textContent = nights
      summaryRoomType.textContent = roomData[roomType].name
      summaryRoomPrice.textContent = `₹${subtotal}`
      summaryTaxes.textContent = `₹${taxes}`
      summaryTotal.textContent = `₹${total}`
    }
  
    // Booking form submission
    if (bookingForm) {
      bookingForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Validate form
        if (!checkInInput.value || !checkOutInput.value || !roomTypeSelect.value) {
          alert("Please fill in all required fields.")
          return
        }
  
        // Show confirmation modal
        const modal = document.getElementById("booking-confirmation-modal")
        const bookingReference = document.getElementById("booking-reference")
        const confirmationCheckIn = document.getElementById("confirmation-check-in")
        const confirmationCheckOut = document.getElementById("confirmation-check-out")
        const confirmationRoomType = document.getElementById("confirmation-room-type")
        const confirmationTotal = document.getElementById("confirmation-total")
  
        // Generate random booking reference
        const reference = "BK" + Math.floor(100000 + Math.random() * 900000)
  
        bookingReference.textContent = reference
        confirmationCheckIn.textContent = document.getElementById("summary-check-in").textContent
        confirmationCheckOut.textContent = document.getElementById("summary-check-out").textContent
        confirmationRoomType.textContent = document.getElementById("summary-room-type").textContent
        confirmationTotal.textContent = document.getElementById("summary-total").textContent
  
        modal.classList.add("active")
  
        // Reset form
        bookingForm.reset()
        selectedRoomDetails.classList.add("hidden")
        document.getElementById("summary-check-in").textContent = "-"
        document.getElementById("summary-check-out").textContent = "-"
        document.getElementById("summary-nights").textContent = "0"
        document.getElementById("summary-room-type").textContent = "-"
        document.getElementById("summary-room-price").textContent = "₹0"
        document.getElementById("summary-taxes").textContent = "₹0"
        document.getElementById("summary-total").textContent = "₹0"
      })
    }
  
    // Table Reservation Form
    const tableReservationForm = document.getElementById("table-reservation-form")
    const addPreOrderBtn = document.getElementById("add-pre-order-btn")
    const preOrderItems = document.getElementById("pre-order-items")
  
    // Load pre-order items if available
    function loadPreOrderItems() {
      const storedItems = sessionStorage.getItem("preOrderItems")
  
      if (storedItems && preOrderItems) {
        const items = JSON.parse(storedItems)
  
        if (items.length === 0) {
          preOrderItems.innerHTML = '<p class="empty-pre-order-message">No items pre-ordered yet</p>'
          return
        }
  
        let preOrderHTML = ""
        let totalPrice = 0
  
        items.forEach((item, index) => {
          const itemTotal = item.price * item.quantity
          totalPrice += itemTotal
  
          preOrderHTML += `
                      <div class="cart-item">
                          <span class="cart-item-name">${item.item} x${item.quantity}</span>
                          <span class="cart-item-price">₹${itemTotal}</span>
                      </div>
                  `
        })
  
        preOrderHTML += `
                  <div class="cart-total">
                      <span>Total:</span>
                      <span>₹${totalPrice}</span>
                  </div>
              `
  
        preOrderItems.innerHTML = preOrderHTML
      }
    }
  
    // Check for pre-order items on page load
    loadPreOrderItems()
  
    // Add Pre-Order Button
    if (addPreOrderBtn) {
      addPreOrderBtn.addEventListener("click", () => {
        // Show menu modal
        const menuModal = document.getElementById("menu-modal")
        menuModal.classList.add("active")
  
        // Load menu items into modal
        loadMenuItemsIntoModal()
      })
    }
  
    // Load menu items into modal
    function loadMenuItemsIntoModal() {
      const menuModalContent = document.querySelector(".menu-modal-content")
      const menuModalTabs = document.querySelectorAll(".menu-modal-tab")
      let modalCart = []
  
      // Load stored pre-order items if available
      const storedItems = sessionStorage.getItem("preOrderItems")
      if (storedItems) {
        modalCart = JSON.parse(storedItems)
      }
  
      // Update modal cart display
      function updateModalCart() {
        const modalCartItems = document.getElementById("modal-cart-items")
        const modalCartTotal = document.getElementById("modal-cart-total")
  
        if (modalCart.length === 0) {
          modalCartItems.innerHTML = '<p class="empty-cart-message">No items selected</p>'
          modalCartTotal.textContent = "₹0"
          return
        }
  
        let cartHTML = ""
        let totalPrice = 0
  
        modalCart.forEach((item, index) => {
          const itemTotal = item.price * item.quantity
          totalPrice += itemTotal
  
          cartHTML += `
                      <div class="cart-item">
                          <span class="cart-item-name">${item.item} x${item.quantity}</span>
                          <span class="cart-item-price">₹${itemTotal}</span>
                          <button class="remove-item" data-index="${index}">×</button>
                      </div>
                  `
        })
  
        modalCartItems.innerHTML = cartHTML
        modalCartTotal.textContent = `₹${totalPrice}`
  
        // Add event listeners to remove buttons
        document.querySelectorAll("#modal-cart-items .remove-item").forEach((btn) => {
          btn.addEventListener("click", function () {
            const index = Number.parseInt(this.getAttribute("data-index"))
  
            if (modalCart[index].quantity > 1) {
              modalCart[index].quantity--
            } else {
              modalCart.splice(index, 1)
            }
  
            updateModalCart()
          })
        })
      }
  
      // Show menu items for selected tab
      function showModalTabContent(tabId) {
        // Get menu items for this category
        let menuItems
  
        switch (tabId) {
          case "modal-main-course":
            menuItems = [
              { item: "Butter Chicken", price: 350, calories: 450 },
              { item: "Paneer Tikka Masala", price: 300, calories: 380 },
              { item: "Chicken Biryani", price: 320, calories: 520 },
              { item: "Vegetable Curry", price: 250, calories: 320 },
            ]
            break
          case "modal-starters":
            menuItems = [
              { item: "Paneer Tikka", price: 280, calories: 320 },
              { item: "Chicken Tikka", price: 320, calories: 350 },
              { item: "Vegetable Samosa", price: 150, calories: 280 },
              { item: "Onion Bhaji", price: 180, calories: 250 },
            ]
            break
          case "modal-desserts":
            menuItems = [
              { item: "Gulab Jamun", price: 150, calories: 320 },
              { item: "Rasmalai", price: 180, calories: 350 },
              { item: "Kheer", price: 160, calories: 280 },
              { item: "Kulfi", price: 170, calories: 300 },
            ]
            break
          case "modal-beverages":
            menuItems = [
              { item: "Masala Chai", price: 80, calories: 120 },
              { item: "Mango Lassi", price: 120, calories: 180 },
              { item: "Fresh Lime Soda", price: 90, calories: 80 },
              { item: "Cold Coffee", price: 150, calories: 220 },
            ]
            break
          default:
            menuItems = []
        }
  
        // Generate HTML for menu items
        let menuHTML = '<div class="menu-items">'
  
        menuItems.forEach((menuItem) => {
          // Check if item is already in cart
          const cartItem = modalCart.find((item) => item.item === menuItem.item)
          const inCart = cartItem ? true : false
          const quantity = inCart ? cartItem.quantity : 0
  
          menuHTML += `
                      <div class="menu-item">
                          <div class="menu-item-details">
                              <h3>${menuItem.item}</h3>
                              <div class="menu-item-info">
                                  <span class="price">₹${menuItem.price}</span>
                                  <span class="calories">${menuItem.calories} cal</span>
                              </div>
                              <div class="item-quantity">
                                  <button class="quantity-btn minus" data-item="${menuItem.item}" data-price="${menuItem.price}" data-calories="${menuItem.calories}" ${quantity === 0 ? "disabled" : ""}>-</button>
                                  <span class="quantity">${quantity}</span>
                                  <button class="quantity-btn plus" data-item="${menuItem.item}" data-price="${menuItem.price}" data-calories="${menuItem.calories}">+</button>
                              </div>
                          </div>
                      </div>
                  `
        })
  
        menuHTML += "</div>"
        menuModalContent.innerHTML = menuHTML
  
        // Add event listeners to quantity buttons
        document.querySelectorAll(".quantity-btn").forEach((btn) => {
          btn.addEventListener("click", function () {
            const item = this.getAttribute("data-item")
            const price = Number.parseInt(this.getAttribute("data-price"))
            const calories = Number.parseInt(this.getAttribute("data-calories"))
            const isPlus = this.classList.contains("plus")
  
            // Find item in cart
            const cartItemIndex = modalCart.findIndex((cartItem) => cartItem.item === item)
  
            if (isPlus) {
              // Add or increment item
              if (cartItemIndex === -1) {
                modalCart.push({
                  item,
                  price,
                  calories,
                  quantity: 1,
                })
              } else {
                modalCart[cartItemIndex].quantity++
              }
            } else {
              // Decrement or remove item
              if (cartItemIndex !== -1) {
                if (modalCart[cartItemIndex].quantity > 1) {
                  modalCart[cartItemIndex].quantity--
                } else {
                  modalCart.splice(cartItemIndex, 1)
                }
              }
            }
  
            // Update quantity display
            const quantitySpan = this.parentElement.querySelector(".quantity")
            const minusBtn = this.parentElement.querySelector(".minus")
  
            if (isPlus) {
              const newQuantity = Number.parseInt(quantitySpan.textContent) + 1
              quantitySpan.textContent = newQuantity
              minusBtn.disabled = false
            } else {
              const newQuantity = Number.parseInt(quantitySpan.textContent) - 1
              quantitySpan.textContent = newQuantity
              if (newQuantity === 0) {
                minusBtn.disabled = true
              }
            }
  
            // Update cart display
            updateModalCart()
          })
        })
      }
  
      // Show first tab content by default
      showModalTabContent("modal-main-course")
  
      // Tab switching
      menuModalTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          // Update active tab
          menuModalTabs.forEach((tab) => tab.classList.remove("active"))
          this.classList.add("active")
  
          const tabId = this.getAttribute("data-tab")
          showModalTabContent(tabId)
        })
      })
  
      // Update cart display
      updateModalCart()
  
      // Confirm pre-order button
      document.getElementById("confirm-pre-order").addEventListener("click", () => {
        // Save cart to sessionStorage
        sessionStorage.setItem("preOrderItems", JSON.stringify(modalCart))
  
        // Close modal
        document.getElementById("menu-modal").classList.remove("active")
  
        // Update pre-order items display
        loadPreOrderItems()
      })
  
      // Cancel pre-order button
      document.getElementById("cancel-pre-order").addEventListener("click", () => {
        // Close modal without saving
        document.getElementById("menu-modal").classList.remove("active")
      })
    }
  
    // Table reservation form submission
    if (tableReservationForm) {
      tableReservationForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Validate form
        const reservationDate = document.getElementById("reservation-date")
        const reservationTime = document.getElementById("reservation-time")
        const partySize = document.getElementById("party-size")
        const diningArea = document.getElementById("dining-area")
  
        if (!reservationDate.value || !reservationTime.value || !partySize.value || !diningArea.value) {
          alert("Please fill in all required fields.")
          return
        }
  
        // Show confirmation modal
        const modal = document.getElementById("reservation-confirmation-modal")
        const reservationReference = document.getElementById("reservation-reference")
        const confirmationDate = document.getElementById("confirmation-date")
        const confirmationTime = document.getElementById("confirmation-time")
        const confirmationPartySize = document.getElementById("confirmation-party-size")
        const confirmationDiningArea = document.getElementById("confirmation-dining-area")
  
        // Generate random reservation reference
        const reference = "TR" + Math.floor(100000 + Math.random() * 900000)
  
        reservationReference.textContent = reference
        confirmationDate.textContent = new Date(reservationDate.value).toLocaleDateString()
        confirmationTime.textContent = reservationTime.value
        confirmationPartySize.textContent = partySize.value
        confirmationDiningArea.textContent = diningArea.value
  
        modal.classList.add("active")
  
        // Reset form
        tableReservationForm.reset()
  
        // Clear pre-order items
        sessionStorage.removeItem("preOrderItems")
        if (preOrderItems) {
          preOrderItems.innerHTML = '<p class="empty-pre-order-message">No items pre-ordered yet</p>'
        }
      })
    }
  
    // Close modals
    document.querySelectorAll(".close-modal, #close-confirmation, #close-reservation-confirmation").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".modal").forEach((modal) => {
          modal.classList.remove("active")
        })
      })
    })
  
    // Contact form submission
    const contactForm = document.getElementById("contact-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simulate form submission
        alert("Thank you for your message! We will get back to you soon.")
        contactForm.reset()
      })
    }
  
    // Login and Register forms
    const loginForm = document.getElementById("login-form")
    const registerForm = document.getElementById("register-form")
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simulate login
        alert("Login successful!")
        loginForm.reset()
        window.location.hash = "#home"
      })
    }
  
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Validate password match
        const password = document.getElementById("register-password").value
        const confirmPassword = document.getElementById("register-confirm-password").value
  
        if (password !== confirmPassword) {
          alert("Passwords do not match!")
          return
        }
  
        // Simulate registration
        alert("Registration successful! You can now login.")
        registerForm.reset()
  
        // Switch to login tab
        document.querySelector('.auth-tab[data-tab="login-form"]').click()
      })
    }
  
    // Initialize Google Map
    let google
    window.initMap = () => {
      const mapElement = document.getElementById("map")
  
      if (mapElement) {
        // Replace with actual coordinates
        const location = { lat: 9.9252, lng: 78.1198 } // Madurai coordinates
  
        google = window.google || {}
  
        const map = new google.maps.Map(mapElement, {
          center: location,
          zoom: 15,
        })
  
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          title: "Meenakshi Inn",
        })
      }
    }
  })
  
  