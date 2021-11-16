// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
    document.getElementById("missionTarget").innerHTML=`
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`

}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty"
    }
    else if (isNaN(testInput)) {
        return "Not a Number"
    }
    else if (!isNaN(testInput)) {
        return "Is a Number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  
    if (validateInput(pilot.value) === "Empty" || validateInput(copilot.value) === "Empty" || validateInput(fuelLevel.value) === "Empty" || validateInput(cargoLevel.value) === "Empty") {
        alert("Please enter all the required information, do not leave any entry blank");
    }
    else if (validateInput(pilot.value) === "Is a Number") {
        alert("Please enter a valid Pilot name")
    }
    else if (validateInput(copilot.value) === "Is a Number") {
        alert("Please enter a valid Co-Pilot name")
    }
    else if (validateInput(fuelLevel.value) === "Not a Number") {
        alert("Please enter a valid number for Fuel Level")
    }
    else if (validateInput(cargoLevel.value) === "Not a Number") {
        alert("Please enter a valid number for Cargo Mass")
    }

    list.innerHTML = `
    <ol>
        <li id="pilotStatus" data-testid="pilotStatus">${pilot.value} Ready</li>
        <li id="copilotStatus" data-testid="copilotStatus">${copilot.value} Ready</li>
        <li id="fuelStatus" data-testid="fuelStatus">Fuel level high enough for launch</li>
        <li id="cargoStatus" data-testid="cargoStatus">Cargo mass low enough for launch</li>
    </ol>`

    let launchCount = 0
    if (fuelLevel.value < 10000) {
        list.style.visibility = 'visible'
        fuelStatus = document.getElementById("fuelStatus").innerHTML= "Not Enough Fuel";
        launchStatus = document.getElementById("launchStatus");
        launchStatus.innerHTML="Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color="red";
    } else {
        launchCount += 1

        // fuelStatus = document.getElementById("fuelStatus")
        // launchStatus.innerHTML= "Shuttle is ready for launch!";
        // document.getElementById("launchStatus").style.color="green";
    };

    if (cargoLevel.value > 10000) {
        list.style.visibility = 'visible'
        cargoStatus = document.getElementById("cargoStatus").innerHTML= "Too much Cargo for takeoff";
        launchStatus = document.getElementById("launchStatus");
        launchStatus.innerHTML="Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color="red";
    } else {
        launchCount += 1
        // launchStatus = document.getElementById("launchStatus");
        // launchStatus.innerHTML="Shuttle is ready for launch!";
        // document.getElementById("launchStatus").style.color="green";
    }

    if (launchCount === 2) {
        launchStatus = document.getElementById("launchStatus");
        launchStatus.innerHTML="Shuttle is ready for launch!";
        document.getElementById("launchStatus").style.color="green";
    } else {
        launchStatus.innerHTML= "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color="red";
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random()*planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
