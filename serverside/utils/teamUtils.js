const getRandomColor = () => {
  var red = Math.floor(Math.random() * 100);
  var green = Math.floor(Math.random() * 100);
  var blue = Math.floor(Math.random() * 100);

  var darkColor = "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);

  return darkColor;
};

const getRandomNumber = (n) => {
  var randomNumber = Math.floor(Math.random() * n);

  return randomNumber + 1;
};

module.exports = { getRandomColor, getRandomNumber };
