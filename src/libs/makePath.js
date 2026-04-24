const makePath = (text) => {
  const pathMakeAbleText = text
    ?.split("/")
    .join(" ")
    .split("&")
    .join(" ");
  return pathMakeAbleText?.split(" ")?.join("_");
};

export default makePath;
