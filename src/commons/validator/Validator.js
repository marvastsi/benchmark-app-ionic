import { validate } from "validate.js";
import constraints from "./constraints";

const validateField = (fieldName, value) => {
  var formValues = {};
  formValues[fieldName] = value;

  var formFields = {}
  formFields[fieldName] = constraints[fieldName];

  const result = validate(formValues, formFields)

  if (result) {
    return result[fieldName][0]
  }

  return null
}

export default validateField;
