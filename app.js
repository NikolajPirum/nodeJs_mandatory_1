import express from "express"

const app = express();
app.use(express.json())
app.use(express.static("public"));
app.use(express.urlencoded());


const carOwners = [];
// ====================================== API =============================================
import { getCarOwnerProfileWithCatImg } from "./utils/carsUtil.js";

app.get("/api/cars", async (req,res) => {
    const carOwner = await getCarOwnerProfileWithCatImg()
    carOwners.push(carOwner);

    res.send({data : carOwner});
});

app.get("/carOwners",(req,res) => {
    res.send({data : carOwners})
});

// =============================== PAGES ==================================================
import { frontpagePage,carOwnerPage,createCarOwnerPage } from "./utils/pageUtil.js"; 


const dummyCarOwner = {    
      id: 1,
      name: "Messi",
      birthday : "2025-10-11",
      verhicle : "skoda",
      verhicleColor: "red",
    }

carOwners.push(dummyCarOwner);

app.get("/",(req,res) => {
    res.send(frontpagePage);
})

app.get("/carOwner", (req,res) => {
    res.send(carOwnerPage);
});
app.get("/newCarOwner", (req,res) => {
    res.send(createCarOwnerPage)
});

app.post("/newCarOwner", (req,res) => {
    const {id, name, birthday, verhicle, verhicleColor, imageFile} = req.body;
    
    const carOwner = {id, name, birthday, verhicle, verhicleColor, imageFile};

    if(!id ||!name || !birthday|| !verhicle || !verhicleColor || !imageFile){
        return res.status(400).send({message : "Bad request. please enter id, name, birthday, verhicle, verhicleColor and opload an image"});  
    }else{
        carOwners.push(carOwner);
        return res.status(201).redirect("/");
    }
});

app.put("/carOwners/:id", (req,res) => {
    const providedCarOwnerId = Number(req.params.id);
    const foundCarOwnerByIndex = carOwners.findIndex((carOwner) => carOwner.id === providedCarOwnerId);

    if(foundCarOwnerByIndex === -1){
        return res.status(404).send({message : "car owner with id: " + providedCarOwnerId + " was not found"})
    }else{
        const { id, name, birthday, verhicle, verhicleColor} = req.body;

        const newCarOwner = {
            id : providedCarOwnerId,
            name : req.body.name,
            birthday : req.body.birthday,
            verhicle : req.body.verhicle,
            verhicleColor : req.body.verhicleColor
        }
        carOwners[foundCarOwnerByIndex] = newCarOwner;
        res.status(201).send({data : carOwners});
    }
});

app.patch("/carOwners/:id", (req,res) => {
    const providedCarOwnerId = Number(req.params.id);
    const foundCarOwnerByIndex = carOwners.findIndex((carOwner) => carOwner.id === providedCarOwnerId);

    if(foundCarOwnerByIndex === -1){
        return res.status(404).send({message : "car owner with id: " + providedCarOwnerId + "was not found"})
    }else{
        const { id, name, birthday, verhicle, verhicleColor} = req.body;
            
        const foundcarOwner = carOwners[foundCarOwnerByIndex];

        const newCarOwner = {...foundcarOwner, ...req.body, id : foundcarOwner.id};

        carOwners[foundCarOwnerByIndex] = newCarOwner;
        console.log(carOwners)

        return res.status(201).send({data : newCarOwner});
    }
});

app.delete("/carOwner/:id", (req,res) => {
    const providedCarOwnerId = Number(req.params.id);
    const foundCarOwnerByIndex = carOwners.findIndex((carOwner) => carOwner.id === providedCarOwnerId);

    if(foundCarOwnerByIndex === -1){
        return res.status(400).send({message : "car owner with id: " + providedCarOwnerId + " does not exist"})
    }else{
        carOwners.splice(foundCarOwnerByIndex,1);
        return res.status(200).send({data : carOwners})
    }
});

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT );
});