import {readPage, constructPage} from "./templatingEngine.js";

const headerCSS = '<link rel="stylesheet" href="/components/header/header.css">'

const frontpage = readPage("./public/pages/frontend/index.html"); 
export const frontpagePage = constructPage(frontpage, {
    cssLinks : headerCSS});

const carOwner = readPage("./public/pages/cars/cars.html")
export const carOwnerPage = constructPage(carOwner, {
    cssLinks : '<link rel="stylesheet" href="/pages/cars/cars.css">' + headerCSS});

const createCarOwner = readPage("./public/pages/cars/createCarOwner/createCarOwner.html")
export const createCarOwnerPage = constructPage(createCarOwner, {
    cssLinks : '<link rel="stylesheet" href="/pages/cars/createCarOwner/createCarOwner.css">' + headerCSS});