const stringToSlug = (str: string) => {
  return str
    .toLowerCase() // convert to lowercase
    .normalize("NFD") // sperate character of vietnamese
    .replace(/[\u0300-\u036f]/g, "") // remove character of vietnamese
    .replace(/đ/g, "d") // convert đ -> d
    .replace(/[^a-z0-9\s-]/g, "") // remove special character
    .trim() // remove space
    .replace(/\s+/g, "-"); // replace space with -
};

export { stringToSlug };
