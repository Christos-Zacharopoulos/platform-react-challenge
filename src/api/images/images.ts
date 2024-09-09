import axios from "axios";
import { MODEL_BASE } from "./consts";
import { Image } from "./types";

const imagesList = async (breedID = "", limit = 10) =>
  await axios.get<Image[]>(
    `${MODEL_BASE}search?breed_ids=${breedID}&limit=${limit}`
  );

const images = {
  batch: {
    get: imagesList,
  },
};

export default images;
