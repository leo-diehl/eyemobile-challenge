const cpfRegex = /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/g;

export function cpf(value) {
  if (!value) {
    return '';
  }

  return value.replace(cpfRegex, '$1.$2.$3-$4');
}
