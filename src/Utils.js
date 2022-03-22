export const isNumeric = (number) => {
  if (typeof number != "string") return false;
  return !isNaN(number) && !isNaN(parseFloat(number));
};

export const epochsEnum = [
  // to be replaced with Blockfrost or Ogmios
  "Epoch 329",
  "Epoch 330",
  "Epoch 331",
  "Epoch 332",
  "Epoch 333",
  "Epoch 334",
  "Epoch 335",
  "Epoch 336",
  "Epoch 337",
  "Epoch 338",
  "Epoch 339",
  "Epoch 340", //12
  "Epoch 341",
  "Epoch 342",
  // "Epoch 343",
  // "Epoch 344",
  // "Epoch 345",
  // "Epoch 346",
  // "Epoch 347",
  // "Epoch 348",
  // "Epoch 349",
  // "Epoch 350",
  // "Epoch 351",
  // "Epoch 352",
  // "Epoch 353",
];

export const yAxisOptions = {
  max: 0,
  interval: 0,
};

export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
