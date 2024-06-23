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

const updateProgress = (progressEvent) => {
  const percentage = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  );
  if (percentage === 100) {
    progressBar.style.width = `${percentage}%`;
    setTimeout(() => {
      progressBar.style.width = "0%";
    }, 400);
  } else {
    progressBar.style.width = `${percentage}%`;
  }
};

export const getBreeds = async () => {
  axios.interceptors.request.use((request) => {
    console.log("requests begin");
    request.metadata = request.metadata || {};
    request.metadata.startTime = new Date().getTime();
    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      response.config.metadata.endTime = new Date().getTime();
      response.durationInMS =
        response.config.metadata.endTime - response.config.metadata.startTime;
      return response;
    },
    (error) => {
      error.config.metadata.endTime = new Date().getTime();
      error.durationInMS =
        error.config.metadata.endTime - error.config.metadata.startTime;
      throw error;
    }
  );

  const response = await axios("/breeds", {
    onDownloadProgress: updateProgress,
  });

  const { data, durationInMS } = response;
  console.log(`Request took ${durationInMS} milliseconds.`);

  return data;
};

export const getBreedById = async (breedId) => {
  const response = await axios(`/images/search?limit=10&breed_ids=${breedId}`, {
    onDownloadProgress: updateProgress,
  });

  const dataBreed = response.data;

  return dataBreed;
};
