import * as yup from "yup";


// const passwordRegex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const createListingSchema = yup.object().shape({
    name: yup
        .string()
        .required("Full Name is Required"),
    email: yup
        .string()
        // .email("Please enter a valid email") !!!
        .matches(emailRegex, { message: "Please enter a valid email" })
        .required("Email is Required"),
    password: yup
        .string()
        .min(6)
        // .matches(passwordRegex, { message: "Please create a stronger password" })
        .required("Password is Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords doesn't match")
        .required("Confirm-Password is Required"),
});
