import validator from 'email-validator'

export const validateEmail = email => {
  return validator.validate(email)
}

export const isNotEmpty = value => {
  if (
    value === undefined ||
    (Array.isArray(value) && value.length === 0) ||
    ((typeof value === 'string' || value instanceof String) && value.trim().length === 0)
  ) {
    return false
  }
  return true
}

export const errorOn = (validation, error) => {
  return value => {
    if (validation(value)) {
      return undefined
    }
    return error
  }
}

export const not = validation => v => !validation(v)

export const pipe = errorsOn => {
  return value => {
    const errors = []
    errorsOn.forEach(errorOnFunction => {
      const error = errorOnFunction(value)
      if (error) {
        errors.push(error)
      }
    })
    if (errors.length > 0) {
      return errors[0]
    }
    return undefined
  }
}
