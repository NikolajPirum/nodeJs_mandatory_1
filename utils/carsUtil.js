import { faker } from "@faker-js/faker";


function getCarOwnerprofileWithoutImg(){
    return  {
        name : faker.person.fullName(),
        birthday : faker.date.birthdate({mode : 'year', min : 1950, max : 2007}).toDateString(),
        verhicle : faker.vehicle.vehicle(),
        color : faker.vehicle.color()
    }
}

export async function getCarOwnerProfileWithCatImg(){
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data =  await response.json();

    const imageUrl = data[0].url;

    const drivingCat  = {...getCarOwnerprofileWithoutImg(), imageUrl};

    return drivingCat;
} 
