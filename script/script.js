"use strict";
var results = "";
var customer = "";

function search() {

    var output = "";
    const qInput = document.querySelector("#qInput");
    const qValue = qInput.value.trim();

    if (!qValue) {
        return;
    }

    output = document.getElementById("searchresult");
    output.innerHTML = "";

    results = CUSTOMERS.filter(customer => {
        return customer.last_name.toUpperCase().startsWith(qValue.toUpperCase());
    });

    for (let customer of results) {
        var breakTag = document.createElement("br");
        var btn = document.createElement("button");
        btn.style.width = '200px';
        btn.name = 'customerButton';
        btn.setAttribute("onclick", "enableForm(this);");
        btn.setAttribute("data-btnid", customer.last_name);
        btn.innerHTML += customer.first_name + " " + customer.last_name;
        document.getElementById('searchresult').appendChild(btn);
        document.getElementById('searchresult').appendChild(breakTag);
    }
}

function enableForm(btn) {
    document.querySelector("#orderinfo").innerHTML = "";

    for (let CUSTOMERS of results) {

        if (btn.getAttribute("data-btnid") === CUSTOMERS.last_name) {

            document.getElementById("carsize").disabled = false;
            document.getElementById("bicyclerack").disabled = false;
            document.getElementById("gps").disabled = false;
            document.getElementById("childseat").disabled = false;
            document.getElementById("duration").disabled = false;
            document.getElementById("calculateprice").disabled = false;


            document.getElementById("fName").innerText = CUSTOMERS.first_name;
            document.getElementById("lName").innerText = CUSTOMERS.last_name + " ";
            document.getElementById("adr").innerText = CUSTOMERS.address;
            document.getElementById("stProv").innerText = CUSTOMERS.state_prov;
            document.getElementById("emails").innerText = CUSTOMERS.email;
            document.getElementById("tel").innerText = CUSTOMERS.phone;
        }
    }
}

function calculateOrder() {
    if (document.getElementById('duration').value < 1) {
        document.getElementById('duration').value = 1;
    } else if (document.getElementById('duration').value > 30) {
        document.getElementById('duration').value = 30;
    }


    var orderList = document.querySelector("#orderinfo");
    orderList.innerHTML = "";
    var carSizeSelector = document.getElementById('carsize');
    var carSizePrice = carSizeSelector[carSizeSelector.selectedIndex].value;
    var rentPeriod = document.querySelector("input[name = quantity]").value;
    var orderTotal = 0;
    var additon = "";
    var carType = "";

    if (carSizeSelector[carSizeSelector.selectedIndex].value == '15') {
        carType = 'Compact';
    }
    if (carSizeSelector[carSizeSelector.selectedIndex].value == '20') {
        carType = 'Mid-size';
    }
    if (carSizeSelector[carSizeSelector.selectedIndex].value == '35') {
        carType = 'Luxury';
    }
    if (carSizeSelector[carSizeSelector.selectedIndex].value == '40') {
        carType = 'Van/Truck';
    }


    if (document.querySelector('input[name=bicycleRack]:checked')) {
        additon += "Roof Rack or Bicycle Rack $" + (document.getElementById('bicyclerack').value) * rentPeriod + "<br>";
        orderTotal += (document.getElementById('bicyclerack').value) * rentPeriod;
    }
    if (document.querySelector('input[name=GPS]:checked')) {
        additon += "GPS $" + (document.getElementById('gps').value) + "<br>";
        orderTotal += parseInt(document.getElementById('gps').value);

    }
    if (document.querySelector('input[name=childSeat]:checked')) {
        additon += "Child Seat $" + (document.getElementById('childseat').value) + "<br>";
        orderTotal += parseInt(document.getElementById('childseat').value);
    }

    orderTotal += carSizePrice * rentPeriod;




    orderList.innerHTML = 'Your Order Information:' + "<br>" + document.getElementById("lName").innerText + " " +
        document.getElementById("fName").innerText + "<br>" + document.getElementById("adr").innerText + "<br>" +
        document.getElementById("stProv").innerText + "<br>" + document.getElementById("emails").innerText + "<br>" +
        document.getElementById("tel").innerText + "<br><br>";
    orderList.innerHTML += "Car type " + carType + " $" +
        carSizePrice * rentPeriod + "<br>" + additon + "<br>";
    orderList.innerHTML += "Your order final Price" + "<br>" + "for " + rentPeriod + " days is " + "$" +
        orderTotal;

}