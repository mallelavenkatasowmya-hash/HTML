let buses = [
  { name: "Orange Travels", fare: 900 },
  { name: "VRL Travels", fare: 1000 },
  {name:"SRM Travels",fare:900},
  {name:"KPN Travels",fare:800},
  {name:"SRS Travels",fare:600},
  {name:"Praveen Travels",fare:1100},
  {name:"Kaveri Travels",fare:900},
  {name:"Royal Travels",fare:1000},
  {name:"RedBus",fare:1300},
  {name:"Lemon Travels",fare:500},
  {name:"Sindhu Travels",fare:700},
  {name:"Deccan way Travels",fare:600},
  {name:"Morning Star",fare:900},
];

let selectedBus = null;
let selectedSeats = [];
let passenger = {};

/* SEARCH BUS */
function searchBus() {
  busList.innerHTML = "<h2>Available Buses</h2>";
  buses.forEach((bus, i) => {
    busList.innerHTML += `
      <div class="bus">
        <b>${bus.name}</b><br>
        Fare: ₹${bus.fare}<br>
        <button onclick="selectBus(${i})">Select</button>
      </div>
    `;
  });
}

/* SELECT BUS */
function selectBus(index) {
  selectedBus = buses[index];
  seatBox.style.display = "block";
  showSeats();
}

/* SEATS */
function showSeats() {
  seatLayout.innerHTML = "";
  selectedSeats = [];
  for (let i = 1; i <= 16; i++) {
    seatLayout.innerHTML += `
      <div class="seat" onclick="toggleSeat(this,'S${i}')">S${i}</div>
    `;
  }
}

function toggleSeat(el, seat) {
  if (el.classList.contains("selected")) {
    el.classList.remove("selected");
    selectedSeats = selectedSeats.filter(s => s !== seat);
  } else {
    el.classList.add("selected");
    selectedSeats.push(seat);
  }
}

/* PASSENGER */
function goPassenger() {
  if (selectedSeats.length === 0) {
    alert("Select seats");
    return;
  }
  passengerBox.style.display = "block";
}

function goPayment() {
  passenger = {
    name: pName.value,
    age: pAge.value,
    gender: pGender.value,
    mobile: pMobile.value
  };

  if (!passenger.name || !passenger.mobile) {
    alert("Fill passenger details");
    return;
  }
  paymentBox.style.display = "block";
}

/* CONFIRM BOOKING */
function confirmBooking() {
  if (!paymentMethod.value) {
    alert("Select payment method");
    return;
  }
  let total = selectedSeats.length * selectedBus.fare;
  confirmBox.style.display = "block";
  confirmBox.innerHTML = `
    <h2>Booking Confirmed</h2>
    Bus: ${selectedBus.name}<br>
    Seats: ${selectedSeats.join(", ")}<br>
    Passenger: ${passenger.name}<br>
    Mobile: ${passenger.mobile}<br>
    Amount Paid: ₹${total}
  `;
}

/* ================= ADMIN ================= */

/* ADMIN LOGIN */
function adminLogin() {
  if (adminUser.value === "admin" && adminPass.value === "admin123") {
    adminLoginBox.style.display = "none";
    adminPanel.style.display = "block";
  } else {
    alert("Invalid Admin Credentials");
  }
}

/* ADD / UPDATE BUS */
function addOrUpdateBus() {
  let bus = buses.find(b => b.name === busName.value);

  if (bus) {
    bus.fare = busFare.value;
    alert("Bus Updated");
  } else {
    buses.push({
      name: busName.value,
      fare: busFare.value
    });
    alert("Bus Added");
  }
}

/* LOGOUT */
function logoutAdmin() {
  adminPanel.style.display = "none";
  adminLoginBox.style.display = "block";
}