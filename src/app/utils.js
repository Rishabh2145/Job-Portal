import { toast } from 'react-toastify';
import * as Yup from 'yup'

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'bottom-right'
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'bottom-right'
    })
}


export const contactValidation = Yup.object({
    firstName: Yup.string().trim().min(3, "Name must Contain atleast 3 Characters.").max(30, "Name must not contain above 30 Characters.").matches(/^[A-Za-z ]+$/, 'Name can contain only letters and spaces').required("First Name is required"),
    lastName: Yup.string().trim().min(3, "Name must Contain atleast 3 Characters.").max(30, "Name must not contain above 30 Characters.").matches(/^[A-Za-z ]+$/, 'Name can contain only letters and spaces').required("Last Name is required"),
    email: Yup.string()
        .email("Invalid Email Address")
        .required("Email Address is required"),
    message: Yup.string().trim().min(10, "Message must Contain atleast 10 Characters.").max(500, "Message must not contain above 500 Characters.").required("Message is required")
})

export const profileValidation = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name must be at most 50 characters')
    .matches(/^[A-Za-z ]+$/, 'Full name can contain only letters and spaces')
    .required('Full name is required'),

  email: Yup.string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),

  contact: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits')
    .required('Contact number is required'),

  mobile: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),

  institute: Yup.string()
    .trim()
    .min(2, 'Institute name is too short')
    .required('Institute name is required'),

  instituteGrade: Yup.string()
    .trim()
    .required('Institute grade is required'),

  school: Yup.string()
    .trim()
    .min(2, 'School name is too short')
    .required('School name is required'),

  schoolGrade: Yup.string()
    .trim()
    .required('School grade is required'),

  address: Yup.string()
    .trim()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must be at most 200 characters')
    .required('Address is required')
})
