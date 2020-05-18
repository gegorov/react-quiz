export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
  };
}

export function validate(value, validation = null) {
  let isValid = true;

  if (!validation) {
    return isValid;
  }

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }

  return isValid;
}

export function validateForm(formControls) {
  let isFormValid = true;

  Object.keys(formControls).forEach((name) => {
    isFormValid = formControls[name].valid && isFormValid;
  });

  return isFormValid;
}
