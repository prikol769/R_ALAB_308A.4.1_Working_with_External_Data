import axios from "axios";

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_PCcSHCjPAHb5MZks4avqi2CanFuybs7IWgBdaiIAIsWjuTFsJeodK9pWhdw0lyLT";

axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

export const getBreeds = async () => {
  const response = await axios("/breeds");

  const dataBreeds = response.data;

  return dataBreeds;
};

export const getBreedById = async (breedId) => {
  const response = await axios(`/images/search?limit=10&breed_ids=${breedId}`);

  const dataBreed = response.data;

  return dataBreed;
};
