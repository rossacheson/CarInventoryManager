/* 
 * Ross Acheson
 * 4/11/16
 */

//define car object
function car(make, model, year, type, baseprice, features) {
    //take in input
    this.make = make;
    this.model = model;
    this.year = year;
    this.type = type;
    this.basePrice = baseprice;
    this.features = features;
    //calculate features price
    this.featuresPrice = 0;
    if (features.doors === "4-door")
        this.featuresPrice += 2500;
    if (features.fuel === "Hybrid") {
        this.featuresPrice += 10000;
    } else if (features.fuel === "Electric")
        this.featuresPrice += 15000;
    if (features.transmission === "Automatic")
        this.featuresPrice += 1000;
    if (features.interior === "Leather")
        this.featuresPrice += 1500;
    //sum
    this.carPrice = this.basePrice + this.featuresPrice;

    this.display = function() {
        var result = "<table class='table-bordered'><tr><th>Make</th>"
                + "<th>Model</th><th>Year</th><th>Type</th><th>Features</th>"
                + "<th>Calculated Sales Price</th>"
                + "<tr><td>" + this.make + "</td><td>" + this.model + "</td><td>"
                + this.year + "</td><td>" + this.type + "</td><td>"
                + displayFeatures(this) + "</td><td>" + currency(getSalesPrice(this))
                + "</td></tr></table>";
        return result;
    };
}

//define some feature sets
var ftSetCheapo = new features("2-door", "Gas", "Manual", "Cloth");
var ftSetBasic = new features("4-door", "Gas", "Automatic", "Cloth");
var ftSetHybrid = new features("4-door", "Hybrid", "Automatic", "Cloth");
var ftSetSporty = new features("2-door", "Gas", "Manual", "Leather");
var ftSetElectric = new features("2-door", "Electric", "Automatic", "Cloth");
var ftSetFancy = new features("4-door", "Hybrid", "Automatic", "Leather");

//initialize some cars
var carsArray = new Array();
carsArray[0] = new car("Dodge", "Avenger", 2015, "Car", 20500, ftSetBasic);
carsArray[1] = new car("Dodge", "Dart", 2016, "Car", 16000, ftSetElectric);
carsArray[2] = new car("Dodge", "Durango", 2015, "SUV", 29500, ftSetBasic);
carsArray[3] = new car("Dodge", "Durango", 2016, "SUV", 29500, ftSetHybrid);
carsArray[4] = new car("Ford", "Focus", 2016, "Car", 16500, ftSetSporty);
carsArray[5] = new car("Ford", "Focus", 2016, "Car", 16500, ftSetHybrid);
carsArray[6] = new car("Ford", "Fusion", 2015, "Car", 22000, ftSetElectric);
carsArray[7] = new car("Ford", "F-150", 2016, "Truck", 24500, ftSetCheapo);
carsArray[8] = new car("Lincoln", "MKZ", 2014, "Car", 34500, ftSetFancy);
carsArray[9] = new car("Lincoln", "Navigator", 2014, "SUV", 56000, ftSetFancy);

//global variable from form input
var markup;

//main function to display inventory table
function loadInventoryList() {
    sortCars(carsArray); //sort by make and model
    markup = document.getElementById("markupInput").value;
    document.getElementById("markupMessage").innerHTML = "Retail Prices are shown at a markup of: " + markup;
    var result = "<tr><th>Make</th><th>Model</th><th>Year</th><th>Type</th><th>Features</th><th>Calculated Sales Price</th><th>Delete?</tr>";
    for (i = 0; i < carsArray.length; i++) {
        result += "<tr><td>" + carsArray[i].make + "</td><td>" + carsArray[i].model + "</td><td>"
                + carsArray[i].year + "</td><td>" + carsArray[i].type + "</td><td>"
                + displayFeatures(carsArray[i]) + "</td><td>$" + currency(getSalesPrice(carsArray[i]))
                + "</td><td><a href='javascript:deleteCar(" + i + ")'>delete</a></td></tr>";
    }
    document.getElementById("inventoryList").innerHTML = result;
    loadTotals();
}

function loadTotals() {
    var result = "<tr><th>Total Potential Sales</th><th>Total Potential Profit</th></tr>";
    var totSalesPot = 0;
    var totProfitPot = 0;
    var salesPrice;
    var profit;
    for (i = 0; i < carsArray.length; i++) {
        salesPrice = getSalesPrice(carsArray[i]);
        profit = salesPrice - carsArray[i].carPrice;
        totSalesPot += salesPrice;
        totProfitPot += profit;
    }
    result += "<tr><td>$" + currency(totSalesPot) + "</td><td>$" + currency(totProfitPot) + "</td></tr>";
    document.getElementById("inventoryTotals").innerHTML = result;
}

function deleteCar(index) {
    carsArray.splice(index, 1);
    loadInventoryList();
}

function features(doors, fuel, transmission, interior) {
    this.doors = doors;
    this.fuel = fuel;
    this.transmission = transmission;
    this.interior = interior;
}


function displayFeatures(car) {
    return car.features.doors + ", " + car.features.fuel + ", " +
            car.features.transmission + ", " + car.features.interior + " ";
}

function getSalesPrice(car) {
    return car.carPrice * (1 + parseFloat(markup));
}

//from https://css-tricks.com/snippets/javascript/format-currency/
function currency(n) {
    n = parseFloat(n);
    return isNaN(n) ? false : n.toFixed(2);
}

//sort by make and model
function sortCars(carsArray) {
    carsArray.sort(function(a, b) {
        if (a.make === b.make) {
            return a.model.localeCompare(b.model);
        } else {
            return a.make.localeCompare(b.make);
        }
    });
}

//jQuery Ajax with PHP...
$(document).ready(function() {
    $('#addForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            type: "POST",
            data: $(this).serialize(),
            success: function(json) {
                data = JSON.parse(json);
                newCar = new car(data.make, data.model, data.year, data.type, data.basePrice,
                        new features(data.doors, data.fuel, data.transmission, data.interior));
                for (i = 0; i < data.numToAdd; i++) {
                    newCar.stockNumber = date.getTime()+(i/10);
                    carsArray.push(newCar);
                }
                document.getElementById("formOutput").innerHTML = "&nbsp<em>" + data.numToAdd + " vehicles added</em>";
                loadInventoryList();
            },
            error: function(jXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    });
});