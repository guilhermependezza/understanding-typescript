
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function isValid(validatableInput: Validatable): boolean {
  let isValidValue = true;
  const valueToValidate = validatableInput.value;

  if (validatableInput.required) {
    isValidValue = isValidValue && !!valueToValidate;
  }

  if (validatableInput.minLength != null && typeof valueToValidate === 'string') {
    isValidValue = isValidValue && valueToValidate.length >= validatableInput.minLength;
  }

  if (validatableInput.maxLength != null && typeof valueToValidate === 'string') {
    isValidValue = isValidValue && valueToValidate.length <= validatableInput.maxLength;
  }

  if (validatableInput.min != null && typeof valueToValidate === 'number') {
    isValidValue = isValidValue && valueToValidate >= validatableInput.min;
  }

  if (validatableInput.max != null && typeof valueToValidate === 'number') {
    isValidValue = isValidValue && valueToValidate <= validatableInput.max;
  }

  return isValidValue;
}
