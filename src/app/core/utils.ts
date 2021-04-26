export const capitalizeText = (text: string) => {
  const arrayText = text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  return arrayText.join(' ');
};
