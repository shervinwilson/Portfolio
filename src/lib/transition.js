// Tiny shared flag so page animations know a page transition is in progress
// and can wait for the curtain to start lifting.
let navigating = false;

export const setNavigating = (value) => {
  navigating = value;
};

export const isNavigating = () => navigating;
