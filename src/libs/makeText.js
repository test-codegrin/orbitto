const makeText = (path) => {
  const text = path.split("_").join(" ").split("-").join(" ");
  return text;
};

export default makeText;
