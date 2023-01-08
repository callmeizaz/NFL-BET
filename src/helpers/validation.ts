var Filter = require("bad-words");
var badwordsArray = require("badwords/array");

const checkIfFilesAreTooBig = (acceptedSize: number, file?: File): boolean => {
  let valid = true;
  if (file) {
    const fileSize = file.size / 1024 / 1024;
    if (fileSize > acceptedSize) {
      valid = false;
    }
  }
  return valid;
};

const checkIfFilesAreCorrectType = (
  acceptedTypes: string[],
  file?: File
): boolean => {
  let valid = true;
  if (file) {
    if (!acceptedTypes.includes(file.type)) {
      valid = false;
    }
  }
  return valid;
};

const checkIfContainsBannedWords = (word: string): boolean => {
  const filter = new Filter();
  filter.addWords(...badwordsArray);
  const valid = filter.isProfane(word);
  return !valid;
};

const checkIfContainsSpaces = (word: string): boolean => {
  const parts = word.split(" ");
  const valid = parts.length === 1;
  return valid;
};

export {
  checkIfFilesAreTooBig,
  checkIfFilesAreCorrectType,
  checkIfContainsBannedWords,
  checkIfContainsSpaces
};
