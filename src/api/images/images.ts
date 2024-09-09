import axios from "axios";
import { MODEL_BASE } from "./consts";
import { Image, ImagePerBreed } from "./types";

const imagesList = async (breedID = "", limit = 10) =>
  await axios.get<Image[]>(
    `${MODEL_BASE}search?breed_ids=${breedID}&limit=${limit}`
  );

const imagePerId = async (id: string) =>
  await axios.get<ImagePerBreed>(`${MODEL_BASE}${id}/`);

const images = {
  batch: {
    get: imagesList,
  },
  single: {
    get: imagePerId,
  },
};

export default images;
