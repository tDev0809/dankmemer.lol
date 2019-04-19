export default (string) => {
  const stringArray = string.split('');
  
  for (
    let index = stringArray.indexOf('-');
    index !== -1;
    index = stringArray.indexOf('-')
  ) {
    stringArray[index] = ' ';
    stringArray[index + 1] = stringArray[index + 1].toUpperCase();
  }

  return stringArray.join('');
};
