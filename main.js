const DEFAULT_PRICE = 0.21;

const ticketForm = document.querySelector("form");

const userFullName = ticketForm.querySelector("#fullName");
const userKm = ticketForm.querySelector("#kmToTravel");
const userAge = ticketForm.querySelector("#ageRange");

const tickets = [];

const calcTotalPrice = (totalPrice, userAge) =>
  userAge === "minorenne"
    ? (totalPrice = totalPrice - totalPrice * (20 / 100))
    : userAge === "over-65"
    ? (totalPrice = totalPrice - totalPrice * (40 / 100))
    : totalPrice;

function generateTicket(e) {
  e.preventDefault();

  const canGenerate = [userFullName.value, userKm.value, userAge.value].every(
    Boolean
  );

  if (!canGenerate) return alert("Riempi tutti i campi");

  const totalPrice = calcTotalPrice(
    parseFloat(userKm.value) * DEFAULT_PRICE,
    userAge.value
  );

  const ticket = {
    userFullName: userFullName.value,
    offer: `Biglietto ${userAge.value.replace("-", " ")}`,
    carriage: Math.floor(Math.random() * 10) + 1,
    CPCode: Math.floor(Math.random() * 100000) + 1,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
  };

  tickets.push(ticket);

  displayTicket(ticket);

  ticketForm.reset();
}

ticketForm.addEventListener("submit", generateTicket);

const ticketsTbody = document.querySelector(".tickets tbody");

const displayTicket = (ticket) =>
  (ticketsTbody.innerHTML += `<tr>
                        <th>${ticket.userFullName}</th>
                        <td>${ticket.offer}</td>
                        <td>${ticket.carriage}</td>
                        <td>${ticket.CPCode}</td>
                        <td>${ticket.totalPrice}&euro;</td>
                      </tr>`);

// function displayTicket(ticket) {
//   const tr = document.createElement("tr");

//   for (const key in ticket) {
//     if (key === "userFullName") {
//       const th = document.createElement("th");
//       th.innerText = ticket.userFullName;
//       tr.append(th);
//       continue;
//     }

//     const td = document.createElement("td");
//     td.innerHTML = key === "totalPrice" ? `${ticket[key]}&euro;` : ticket[key];

//     tr.append(td);
//   }

//   ticketsTbody.append(tr);
// }
