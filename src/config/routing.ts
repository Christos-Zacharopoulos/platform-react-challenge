export const routing = {
  home: () => "/",
  cat: (catId = ":catId") => `/cat/${catId}/`,
  breeds: () => `/breeds/`,
  breed: (breedId = ":breedId") => `/breeds/${breedId}/`,
  favorites: () => `/favorites/`,
};
