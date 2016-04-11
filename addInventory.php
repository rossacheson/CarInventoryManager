<?php

/*
 * Ross Acheson
 * 4/11/16
 */
$carInfo = array();
//basic info
$carInfo["model"] = $_POST["model"];
$carInfo["year"] = intval($_POST["year"]);
$carInfo["numToAdd"] = intval($_POST["quantity"]);
//extrapolate info from model
if ($carInfo["model"] == "Avenger") {
    $carInfo["make"] = "Dodge";
    $carInfo["basePrice"] = 20500;
    $carInfo["type"] = "Car";
} else if ($carInfo["model"] == "Dart") {
    $carInfo["make"] = "Dodge";
    $carInfo["basePrice"] = 16000;
    $carInfo["type"] = "Car";
} else if ($carInfo["model"] == "Durango") {
    $carInfo["make"] = "Dodge";
    $carInfo["basePrice"] = 29500;
    $carInfo["type"] = "SUV";
} else if ($carInfo["model"] == "Focus") {
    $carInfo["make"] = "Ford";
    $carInfo["basePrice"] = 16500;
    $carInfo["type"] = "Car";
} else if ($carInfo["model"] == "Fusion") {
    $carInfo["make"] = "Ford";
    $carInfo["basePrice"] = 22000;
    $carInfo["type"] = "Car";
} else if ($carInfo["model"] == "F-150") {
    $carInfo["make"] = "Ford";
    $carInfo["basePrice"] = 24500;
    $carInfo["type"] = "Truck";
} else if ($carInfo["model"] == "MKZ" ) {
    $carInfo["make"] = "Lincoln";
    $carInfo["basePrice"] = 34500;
    $carInfo["type"] = "Car";
} else if ($carInfo["model"] == "Navigator") {
    $carInfo["make"] = "Lincoln";
    $carInfo["basePrice"] = 56000;
    $carInfo["type"] = "SUV";
}
//feature info
$carInfo["doors"] = $_POST["doors"];
$carInfo["fuel"] = $_POST["fuel"];
$carInfo["transmission"] = $_POST["transmission"];
$carInfo["interior"] = $_POST["interior"];
 
echo json_encode($carInfo);