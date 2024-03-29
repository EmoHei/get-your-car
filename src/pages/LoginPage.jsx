import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import GoogleAuthBtnComp from "../../src/components/GoogleAuthBtnComp";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./LoginComp.scss";
import lock from "../assets/padlock.png";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { email, password } = formData;
    const navigate = useNavigate();

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }
    async function onLogin(e) {
        e.preventDefault();
        if (email.trim() === '') {
            return toast.error("Please enter a valid email")
        }
        if (password.trim() === '') {
            return toast.error("Please enter a valid password")
        }
        try {
           
           
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        
            if (userCredential.user) {
                toast.success("Your Login Was Successful");
                navigate("/");
            }
        } catch (error) {
            toast.error("Wrong email or password! Please try again!");
        }
    }
    return (
        <section>
            <h1 className="title">Login</h1>

            <div className="main-container" >

                <div className="image-container"  >
                    <Card className="text-white" style={{ background: 'gray', border: 'none', width: "50%" }}>
                        <Card.Img className="image-container-image" src={lock} alt="lock"
                            style={{ padding: "10px" }} />
                    </Card>
                </div>
                <div className="form-container" >
                    <Form onSubmit={onLogin}>
                        <Form.Group className="mb-3" id="formBasicEmail">
                            <FloatingLabel
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    id="email"
                                    className="form-input"
                                    value={email}
                                    required
                                    onChange={onChange}
                                />
                            </FloatingLabel>

                            <div className="password-container">
                                <FloatingLabel className="floatingPassword" label="Password" >
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        id="password"
                                        className="form-input"
                                        value={password}
                                        required
                                        onChange={onChange}
                                    />
                                </FloatingLabel>

                                {showPassword ? (<AiFillEyeInvisible className="password-eye"
                                    onClick={() => setShowPassword((prevState) => !prevState)}
                                />
                                ) : (<AiFillEye className="password-eye"
                                    onClick={() => setShowPassword((prevState) => !prevState)}
                                />)}
                            </div>
                          

                            <div className="forgot-password-container">
                                <p>Don't have an account? <span><Link style={{ color: 'red', textDecoration: 'none' }} to='/register' >Register</Link></span></p>
                                <Link className="login-a" to='/forgot-password' >Forgot password?</Link>
                            </div>

                            <Button variant="primary" type="submit" className="submit-btn">
                                Login
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