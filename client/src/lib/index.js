export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export function getWordStr(str, len = 10) {
  return str?.split(/\s+/).slice(0, len).join(" ");
}

export function getSum(total, num) {
  return total + Math.ceil(num);
}

export function formatFloatingNumber(number) {
  const roundedNumber = Math.round(number * 100) / 100;
  const formattedNumber = roundedNumber.toFixed(2);
  return formattedNumber;
}
