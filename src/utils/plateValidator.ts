export default function validatePlateNoSpaces(plate: string) {
  const re = /^\d{3}[A-Z]{3}\d{2}$/;
  return re.test(plate);
}