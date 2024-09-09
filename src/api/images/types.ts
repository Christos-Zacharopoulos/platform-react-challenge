import { Breed } from "../breeds/types";

export type Image = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type ImagePerBreed = Image & {
  breeds: Breed[];
};
