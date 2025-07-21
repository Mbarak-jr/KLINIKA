import * as Yup from 'yup'

export const emailValidator = Yup.string()
  .email('Invalid email address')
  .required('Email is required')

export const passwordValidator = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .required('Password is required')

export const confirmPasswordValidator = Yup.string()
  .oneOf([Yup.ref('password')], 'Passwords must match')
  .required('Confirm Password is required')

export const nameValidator = Yup.string().required('Name is required')

export const phoneValidator = Yup.string()
  .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
  .required('Phone is required')

export const addressValidator = Yup.string().required('Address is required')

export const dateValidator = Yup.string().required('Date is required')

export const timeValidator = Yup.string().required('Time is required')
