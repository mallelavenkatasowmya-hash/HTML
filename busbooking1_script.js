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

let selectedSeats=[];
let seatPrice=0;
let lastPaidAmount=0;
let passengers=[];

/* SEARCH BUS */
function searchBus(){
  let busList = document.getElementById("busList");
  busList.innerHTML="<h2>Available Buses</h2>";
  buses.forEach((b,i)=>{
    busList.innerHTML+=`
      <div class="admin-bus">
        <b>${b.name}</b><br>
        Time: ${b.time}<br>
        Fare: ₹${b.fare}<br>
        <button onclick="selectBus(${i})">Select</button>
      </div>`;
  });
}

/* SELECT BUS */
function selectBus(i){
  seatPrice=buses[i].fare;
  document.getElementById("seatBox").style.display="block";
  generateSeats();
}

/* SEAT LAYOUT */
function generateSeats(){
  let seatLayout = document.getElementById("seatLayout");
  seatLayout.innerHTML="";
  selectedSeats=[];
  for(let i=1;i<=12;i++){
    let s=document.createElement("div");
    s.className="seat";
    s.innerText=i;
    s.onclick=()=>{
      s.classList.toggle("selected");
      selectedSeats.includes(i)?
        selectedSeats=selectedSeats.filter(x=>x!==i):
        selectedSeats.push(i);
    };
    seatLayout.appendChild(s);
  }
}

/* PASSENGER DETAILS PER SEAT */
function goPassenger(){
  if(selectedSeats.length === 0){
    alert("Select seats");
    return;
  }

  document.getElementById("seatBox").style.display = "none";
  let passengerBox = document.getElementById("passengerBox");
  passengerBox.innerHTML = "<h2>Passenger Details</h2>";

  // Generate input fields for each selected seat
  selectedSeats.forEach(seat => {
    passengerBox.innerHTML += `
      <h3>Seat ${seat}</h3>
      <input class="pName" placeholder="Name">
      <input class="pAge" type="number" placeholder="Age">
      <select class="pGender">
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input class="pMobile" type="tel" placeholder="Mobile Number">
      <hr>`;
  });

  passengerBox.innerHTML += `<button onclick="goPayment()">Proceed to Payment</button>`;
  passengerBox.style.display = "block";
}

/* STORE PASSENGER DETAILS */
function goPayment(){
  passengers = [];
  let names = document.querySelectorAll(".pName");
  let ages = document.querySelectorAll(".pAge");
  let genders = document.querySelectorAll(".pGender");
  let mobiles = document.querySelectorAll(".pMobile");

  for(let i=0; i<selectedSeats.length; i++){
    if(!names[i].value || !ages[i].value || !genders[i].value || !mobiles[i].value){
      alert("Fill all passenger details for every seat");
      return;
    }
    passengers.push({
      seat: selectedSeats[i],
      name: names[i].value,
      age: ages[i].value,
      gender: genders[i].value,
      mobile: mobiles[i].value
    });
  }

  document.getElementById("passengerBox").style.display = "none";
  document.getElementById("paymentBox").style.display = "block";
}

/* PAYMENT */
/* PAYMENT INPUTS */
function showPayment(){
  let amt = seatPrice*selectedSeats.length;
  let t = document.getElementById("paymentMethod").value;
  let paymentDetails = document.getElementById("paymentDetails");
  if(t==="upi")
    paymentDetails.innerHTML=`<input placeholder="UPI ID"><p>Amount ₹${amt}</p>`;
  else if(t==="card")
    paymentDetails.innerHTML=`<input placeholder="Card Holder"><input placeholder="Card Number">
    <input placeholder="MM/YY"><input placeholder="CVV"><p>Amount ₹${amt}</p>`;
  else if(t==="net")
    paymentDetails.innerHTML=`<input placeholder="Bank Name"><input placeholder="User ID">
    <input placeholder="Password"><p>Amount ₹${amt}</p>`;
}

/* CONFIRM BOOKING */
function confirmBooking(){
  lastPaidAmount = seatPrice * selectedSeats.length;
  let paymentMethodVal = document.getElementById("paymentMethod").value;
  let paymentInfo = "";

  if(paymentMethodVal === "upi"){
    let upiId = document.querySelector("#paymentDetails input").value;
    paymentInfo = `Payment Method: UPI<br>UPI ID: ${upiId}<br>`;
  } else if(paymentMethodVal === "card"){
    let inputs = document.querySelectorAll("#paymentDetails input");
    paymentInfo = `Payment Method: Card<br>
                   Card Holder: ${inputs[0].value}<br>
                   Card Number: ${inputs[1].value}<br>
                   MM/YY: ${inputs[2].value}<br>
                   CVV: ${inputs[3].value}<br>`;
  } else if(paymentMethodVal === "net"){
    let inputs = document.querySelectorAll("#paymentDetails input");
    paymentInfo = `Payment Method: Net Banking<br>
                   Bank Name: ${inputs[0].value}<br>
                   User ID: ${inputs[1].value}<br>
                   Password: ${inputs[2].value}<br>`;
  }

  document.getElementById("paymentBox").style.display = "none";
  let confirmBox = document.getElementById("confirmBox");
  confirmBox.style.display = "block";

  let detailsHTML = `<h2>Booking Confirmed </h2>`;
  passengers.forEach(p => {
    detailsHTML += `
      Seat: ${p.seat}<br>
      Name: ${p.name}<br>
      Age: ${p.age}<br>
      Gender: ${p.gender}<br>
      Mobile: ${p.mobile}<br><hr>`;
  });

  detailsHTML += `Total Paid: ₹${lastPaidAmount}<br>${paymentInfo}
                  <span style="color:green">SMS Sent</span>
                  <br><button onclick="cancelTicket()">Cancel Ticket</button>`;

  confirmBox.innerHTML = detailsHTML;
}
/* CANCEL & REFUND */
function cancelTicket(){
  let refund=Math.floor(lastPaidAmount*0.8);
  document.getElementById("confirmBox").innerHTML=`
    <h2>Ticket Cancelled ❌</h2>
    Paid: ₹${lastPaidAmount}<br>
    Refund (80%): ₹${refund}<br>
    <span style="color:green">Refund Initiated</span>`;
}

/* ADMIN */
function adminLogin(){
  if(document.getElementById("adminUser").value==="admin" && document.getElementById("adminPass").value==="admin123"){
    document.getElementById("adminLoginBox").style.display="none";
    document.getElementById("adminPanel").style.display="block";
    showAdminBuses();
  } else alert("Invalid Login");
}

function addBus(){
  let name=document.getElementById("busName").value;
  let fare=document.getElementById("busFare").value;
  let time=document.getElementById("busTime").value;
  if(name && fare && time){
    buses.push({name:name,fare:fare,time:time});
    showAdminBuses();
  } else alert("Fill all fields");
}

function showAdminBuses(){
  let adminBusList=document.getElementById("adminBusList");
  adminBusList.innerHTML="<h3>Bus List</h3>";
  buses.forEach(b=>adminBusList.innerHTML+=`<div class="admin-bus">${b.name} - ₹${b.fare} (${b.time})</div>`);
}

function logoutAdmin(){
  document.getElementById("adminPanel").style.display="none";
  document.getElementById("adminLoginBox").style.display="block";
}  