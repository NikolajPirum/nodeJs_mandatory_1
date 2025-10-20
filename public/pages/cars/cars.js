
const carOwnerContainer = document.getElementById("table-carOwner-container");
const carOwnerName = document.getElementById("owner-name");
const carOwnerBirthday = document.getElementById("owner-birthday");
const carOwnerVerhice = document.getElementById("owner-verhicle");
const carOwnerVerhicleColor = document.getElementById("owner-verhicle-color");

function getCarOwner () {
    fetch("/api/cars")
    .then((response) => response.json())
    .then((result) => { 
      createCarOwnerProfile(result.data);
     })
    };

    getCarOwner();


function createCarOwnerProfile(carOwner){

  carOwnerName.textContent = "Name: " + carOwner.name;
  carOwnerBirthday.textContent = "Birthday: " + carOwner.birthday;
  carOwnerVerhice.textContent = "Current Car: " + carOwner.verhicle;
  carOwnerVerhicleColor.textContent = "Car Color: " + carOwner.color;


  const carOwnerImage = document.createElement("img");
  carOwnerImage.src = carOwner.imageUrl;
  carOwnerImage.alt = "Car owner profile picture";
  carOwnerImage.id = "owner-profile-picture";

  const elements= [carOwnerName, carOwnerBirthday, carOwnerVerhice, carOwnerVerhicleColor]
  appendChildren(elements,carOwnerContainer);
  carOwnerContainer.appendChild(carOwnerImage);
  
}

function appendChildren(elementsHTML,containerParent){

   elementsHTML.forEach(element => {
    containerParent.appendChild(element);
  }); 
}
 