import * as Carousel from "./Carousel.js";
import {
  getBreeds,
  getBreedById,
  postFavourite,
  getFavourites,
  deleteFavourite,
} from "./additionalFileWithAxios.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_PCcSHCjPAHb5MZks4avqi2CanFuybs7IWgBdaiIAIsWjuTFsJeodK9pWhdw0lyLT";

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

const initialLoad = async () => {
  // const response = await fetch("https://api.thecatapi.com/v1/breeds", {
  //   headers: {
  //     "x-api-key": API_KEY,
  //   },
  // });

  // const dataBreeds = await response.json();

  const dataBreeds = await getBreeds();

  for (let i = 0; i < dataBreeds.length; i++) {
    const optionEl = document.createElement("option");

    optionEl.value = dataBreeds[i].id;
    optionEl.text = dataBreeds[i].name;

    breedSelect.appendChild(optionEl);
  }

  createCarouselItems(dataBreeds[0].id);

  const infoArr = [
    { infoName: "Origin:", infoValue: dataBreeds[0].origin },
    { infoName: "Temperament:", infoValue: dataBreeds[0].temperament },
    { infoName: "Description:", infoValue: dataBreeds[0].description },
  ];
  addBreedInfo(infoArr);
};

initialLoad();

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

const emptyArrMessage = (message) => {
  const pEl = document.createElement("p");
  pEl.textContent = message;
  pEl.style.textAlign = "center";
  infoDump.appendChild(pEl);
};

const createCarouselItems = async (breedId) => {
  // const response = await fetch(
  //   `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}`,
  //   {
  //     headers: {
  //       "x-api-key": API_KEY,
  //     },
  //   }
  // );

  // const dataBreed = await response.json();

  const dataBreed = await getBreedById(breedId);

  if (dataBreed.length <= 0) {
    emptyArrMessage("No pictures!");
  }

  Carousel.clear();

  for (let i = 0; i < dataBreed.length; i++) {
    const imgAlt = dataBreed[i].breeds[0].name;
    const imgSrc = dataBreed[i].url;
    const imgId = dataBreed[i].id;

    const carouselItem = Carousel.createCarouselItem(imgSrc, imgAlt, imgId);

    Carousel.appendCarousel(carouselItem);
  }

  Carousel.start();

  return dataBreed;
};

const deleteInfoDump = () => {
  while (infoDump.firstChild) {
    infoDump.removeChild(infoDump.firstChild);
  }
};

const addBreedInfo = (descArr) => {
  for (let i = 0; i < descArr.length; i++) {
    const pEl = document.createElement("p");
    const spanEl = document.createElement("span");
    const divEl = document.createElement("div");

    divEl.style.display = "flex";
    divEl.style.gap = "10px";

    spanEl.textContent = descArr[i].infoName;
    spanEl.style.fontWeight = "600";

    pEl.textContent = descArr[i].infoValue;

    divEl.appendChild(spanEl);
    divEl.appendChild(pEl);

    infoDump.appendChild(divEl);
  }
};

const breedSelectHandler = async (event) => {
  const breedId = event.target.value;

  deleteInfoDump();

  const dataBreed = await createCarouselItems(breedId);

  const infoArr = [
    { infoName: "Origin:", infoValue: dataBreed[0].breeds[0].origin },
    { infoName: "Temperament:", infoValue: dataBreed[0].breeds[0].temperament },
    { infoName: "Description:", infoValue: dataBreed[0].breeds[0].description },
  ];
  addBreedInfo(infoArr);
};

breedSelect.addEventListener("change", breedSelectHandler);

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
  const favourites = await getFavourites();
  const alreadyFavourited = favourites.find(
    (favourite) => favourite.image_id === imgId
  );

  if (alreadyFavourited) {
    await deleteFavourite(alreadyFavourited.id);
  } else {
    await postFavourite(imgId);
  }
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */
const showFavourites = async () => {
  deleteInfoDump();
  const favourites = await getFavourites();

  if (favourites.length <= 0) {
    emptyArrMessage("You don't have any favorites yet!");
  }

  Carousel.clear();

  for (let i = 0; i < favourites.length; i++) {
    const imgAlt = favourites[i].image_id;
    const imgSrc = favourites[i].image.url;
    const imgId = favourites[i].image_id;

    const carouselItem = Carousel.createCarouselItem(imgSrc, imgAlt, imgId);

    Carousel.appendCarousel(carouselItem);
  }
};

getFavouritesBtn.addEventListener("click", showFavourites);
/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
