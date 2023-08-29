const requiredString = {
  presence: {
    allowEmpty: false,
    message: "is required"
  },
};

const constraints = {
  loginPassword: requiredString,
  loginUsername: requiredString,

  firstName: requiredString,
  email: {
    presence: {
      allowEmpty: false,
      message: "is required"
    },
    email: true
  },
  phoneNumber: {
    presence: { message: "is required" },
    format: {
      pattern: "^[0-9]{11}$",
      message: '^Not a valid phone number',
    },
  },
  countryCode: requiredString,
  username: requiredString,
  password: {
    presence: {
      allowEmpty: false,
      message: "is required"
    },
    length: {
      minimum: 5,
      message: '^Password must be >5 characters'
    }
  },

  executions: {
    presence: { allowEmpty: false },
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 10,
    }
  },
  downloadFile: requiredString,
  uploadFile: requiredString,
  serverUrl: {
    presence: {
      allowEmpty: false,
      message: "is required"
    },
    url: {
      allowLocal: true
    },
  }
};

export default constraints;