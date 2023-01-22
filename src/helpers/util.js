const titleCase = (str, upperCaseTags = false) => {
  if (typeof str !== 'string') throw new TypeError('Expected type: String');
  str = str.split(' ');
  for (let i = 0; i < str.length; i++) {
    // Uppercase tags if appropriate
    if (
      upperCaseTags
      && str[i].length <= 3
      && str[i].toLowerCase() !== 'gun' // Don't uppercase the gun tag
    ) str[i] = str[i].toUpperCase();
    // Uppercase the first character of the string
    else str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
};

export {
  titleCase
};
