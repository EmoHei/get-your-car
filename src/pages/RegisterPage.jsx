// import React from "react";
// import { useState } from "react";
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Card from 'react-bootstrap/Card';
// import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
// import GoogleAuthBtnComp from '../components/GoogleAuthBtnComp';
// import './RegisterPage.scss';
// import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { db } from '../firebase'
// import { doc, serverTimestamp, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import lock from "../assets/padlock.png";

// export default function SignUp() {
//     const [showPassword, setShowPassword] = useState(false);
//     const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
//     const { name, email, password, confirmPassword } = formData;
//     const navigate = useNavigate();

//     function onChange(e) {
//         setFormData((prevState) => ({
//             ...prevState,
//             [e.target.id]: e.target.value,
//             }))

//     }

//     // Register
//     async function onRegister(e) {
//         e.preventDefault();
//         try {
//              if (name.trim() === '') {
//                 return toast.error("Please enter a name")
//             }
//             if (email.trim() === '') {
//                 return toast.error("Please enter a valid email")
//             }
//             if (password.trim() ==='') {
//                 return toast.error("Please enter a password")
//             }
//             if (password.length < 6) {
//                 return toast.error("Password must be at least 6 characters long")
//             }
//             if (password !== confirmPassword) {
//                 return toast.error("Confirm password don't match")
//             }

//             const auth = getAuth()
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             //  If for example name in formData ()
//             updateProfile(auth.currentUser, {
//                 displayName: name,
//             })
//             const user = userCredential.user
//             const formDataCopy = { ...formData };
//             // !!! Important (delete password before add data to db)
//             delete formDataCopy.password;
//             delete formDataCopy.confirmPassword;
//             formDataCopy.timestamp = serverTimestamp();
//             await setDoc(doc(db, "users", user.uid), formDataCopy);
//             // Alert success Msg -usually we don't do that !!!
//             toast.success('Registration was successful')
//             navigate('/');
//         } catch (error) {
//             // Alert Notification Message
//             toast.error("Something went wrong! Password must be at least 6 characters")
//             console.log(error);
//         }
//     }
//     return (
//         <section>
//             <h1 className="title">Register</h1>
//             <div className="main-container" >
//                 <div className="image-container" >
//                     <Card className=" text-white" style={{ background: 'gray', border: 'none', width: "50%",padding:'10px' }}>
//                         <Card.Img className="image-container-image" src={lock} alt="lock"
//                         />
//                     </Card>

//                 </div>

//                 <div className="form-container" >
//                     <Form onSubmit={onRegister}>
//                         <Form.Group className="mb-3" id="formBasicEmail">
//                             <FloatingLabel

//                                 label="Full Name"
//                                 className="mb-3"
//                             >
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="John Doe"
//                                     id="name"
//                                     className="form-input"
//                                     value={name}
//                                     onChange={onChange}
//                                 />
//                             </FloatingLabel>
//                             <div>

//                             </div>
//                             <FloatingLabel
//                                 label="Email address"
//                                 className="mb-3"
//                             >
//                                 <Form.Control
//                                     type="email"
//                                     placeholder="name@example.com"
//                                     id="email"
//                                     className="form-input"
//                                     value={email}
//                                     onChange={onChange}
//                                 />
//                             </FloatingLabel>

//                             <div className="password-container">
//                                 <FloatingLabel

//                                     label="Password"
//                                 >
//                                     <Form.Control
//                                         type={showPassword ? 'text' : 'password'}
//                                         placeholder="Password"
//                                         id="password"
//                                         className="form-input"
//                                         value={password}

//                                         onChange={onChange}
//                                     />
//                                 </FloatingLabel>

//                                 {showPassword ? (<AiFillEyeInvisible className="password-eye"
//                                     onClick={() => setShowPassword((prevState) => !prevState)}
//                                 />
//                                 ) : (<AiFillEye className="password-eye"
//                                     onClick={() => setShowPassword((prevState) => !prevState)}
//                                 />)}
//                             </div>
//                             <div className="password-container">
//                                 <FloatingLabel

//                                     label=" Confirm Password"
//                                 >
//                                     <Form.Control
//                                         type={showPassword ? 'text' : 'password'}
//                                         placeholder="Confirm Password"
//                                         id="confirmPassword"
//                                         className="form-input"
//                                         value={confirmPassword}

//                                         onChange={onChange}
//                                     />
//                                 </FloatingLabel>

//                                 {showPassword ? (<AiFillEyeInvisible className="password-eye"
//                                     onClick={() => setShowPassword((prevState) => !prevState)}
//                                 />
//                                 ) : (<AiFillEye className="password-eye"
//                                     onClick={() => setShowPassword((prevState) => !prevState)}
//                                 />)}
//                             </div>

//                             <FloatingLabel className="forgot-password-container">
//                                 <span>Already have an account? <span><Link style={{ color: 'red', textDecoration: 'none' }} to='/login' > Login</Link></span> </span>

//                             </FloatingLabel>
//                             <Button variant="primary" type="submit" className="submit-btn">
//                                 Register
//                             </Button>
//                             <div className="or-container">
//                                 <hr />
//                                 <p className="or">OR</p>
//                                 <hr />
//                             </div>
//                             <GoogleAuthBtnComp></GoogleAuthBtnComp>
//                         </Form.Group>
//                     </Form>

//                 </div>

//             </div>
//         </section>
//     );
// }

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import GoogleAuthBtnComp from "../components/GoogleAuthBtnComp";
import "./RegisterPage.scss";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import lock from "../assets/padlock.png";
import { useFormik } from "formik";
import { registerSchema } from "../schemas/registerSchema";

export default function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  async function onSubmit( values, actions) {
 
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      updateProfile(auth.currentUser, {
        displayName: values.name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...values };
      // !!! Important (delete password before add data to db)
      delete formDataCopy.password;
      delete formDataCopy.confirmPassword;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      toast.success("Registration was successful");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong! Please try again!");
      console.log(error);
    }
   
  }
  return (
    <section>
      <h1 className="title">Register</h1>
      <div className="main-container">
        <div className="image-container">
          <Card
            className=" text-white"
            style={{
              background: "gray",
              border: "none",
              width: "50%",
              padding: "10px",
            }}
          >
            <Card.Img className="image-container-image" src={lock} alt="lock" />
          </Card>
        </div>

        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="formBasicEmail">
              {errors.name && touched.name && (
                <p className="error-message">{errors.name}</p>
              )}
              <FloatingLabel label="Full Name" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  id="name"
                  // className="form-input"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? "input-error" : "form-input"
                  }
                />
              </FloatingLabel>

              {errors.email && touched.email && (
                <p className="error-message">{errors.email}</p>
              )}
              <FloatingLabel label="Email address" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? "input-error" : "form-input"
                  }
                />
              </FloatingLabel>

              <div className="password-container">
                <FloatingLabel label="Password">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? "input-error"
                        : "form-input"
                    }
                  />
                </FloatingLabel>
                {errors.password && touched.password && (
                  <p className="error-message">{errors.password}</p>
                )}
                {showPassword ? (
                  <AiFillEyeInvisible
                    className="password-eye"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                ) : (
                  <AiFillEye
                    className="password-eye"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                )}
              </div>

              <div className="password-container">
                <FloatingLabel label=" Confirm Password">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? "input-error"
                        : "form-input"
                    }
                  />
                </FloatingLabel>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="error-message">{errors.confirmPassword}</p>
                )}
                {showPassword ? (
                  <AiFillEyeInvisible
                    className="password-eye"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                ) : (
                  <AiFillEye
                    className="password-eye"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                )}
              </div>

              <FloatingLabel className="forgot-password-container">
                <span>
                  Already have an account?{" "}
                  <span>
                    <Link
                      style={{ color: "red", textDecoration: "none" }}
                      to="/login"
                    >
                      {" "}
                      Login
                    </Link>
                  </span>{" "}
                </span>
              </FloatingLabel>
              <Button
                variant="primary"
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                Register
              </Button>
              <div className="or-container">
                <hr />
                <p className="or">OR</p>
                <hr />
              </div>
              <GoogleAuthBtnComp></GoogleAuthBtnComp>
            </Form.Group>
          </Form>
        </div>
      </div>
    </section>
  );
}
