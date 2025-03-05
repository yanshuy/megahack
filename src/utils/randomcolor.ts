const playfulColors = [
  "rgb(231,252,254,", // Light Pink
  "rgb(255,245,240,",
  "rgb(233,202,254,", // Light Blue
];

export function genColorFn(opacity: number) {
  const randomIndex = Math.floor(Math.random() * playfulColors.length);
  const selectedColor = playfulColors[randomIndex];
  return `${selectedColor}${opacity})`;
}
