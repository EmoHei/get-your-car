import React, { useState } from 'react';
import { db, } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate, } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from "uuid";  // Install package -  npm i uuid
import SpinnerComp from "../components/SpinnerComp"
function CreatePage() {
    const navigate = useNavigate();
    const auth = getAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "rent",
        offer:true,
        brand: '',
        model: '',
        category: '',
        fuel: '',
        year: 10,
        month: '',
        color: '',
        price: 0,
        description: '',
        kilometer:0,
        images: {},

    })
    const {
        type,
        offer,
        brand,
        model,
        category,
        fuel,
        year,
        month,
        color,
        price,
        description,
        kilometer,
        images,

    } = formData;
    function onChange(e) {
        console.log(e.target.value);
        let boolean = null;
        if (e.target.value === "true") {
            boolean = true;
        }
        if (e.target.value === "false") {
            boolean = false;
        }
        // Files
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files,
            }));
        }
        // Text/Boolean/Number
        if (!e.target.files) {
            if (boolean) {

                setFormData((prevState) => ({
                    ...prevState,
                    [e.target.id]: boolean
                }));
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [e.target.id]: e.target.value,
                }));
            }

        }
        console.log(e.target.value);
    }
    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);

        if (images.length > 6) {
            setLoading(false);
            toast.error("maximum 6 images are allowed");
            return;
        }
        async function storeImage(image) {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        reject(error);
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            });
        }
        const imgUrls = await Promise.all([...images]
            .map((image) => storeImage(image)))
            .catch((error) => {
                setLoading(false);
                toast.error("Images not uploaded");
                return;
            });

        const formDataCopy = {
            ...formData,
            imgUrls,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
        };
        delete formDataCopy.images;
        const docRef = await addDoc(collection(db, "listings"), formDataCopy);
        setLoading(false);
        toast.success("Listing created successfully");
        navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    }
    if (loading) {
        return <SpinnerComp />;
    }

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col>
                        <h1 style={{ textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}>Create Announcement</h1>
                    </Col>
                </Row>
                <Row className=''>
                    <h6 style={{ textAlign: 'center', marginTop: '30px' }} >
                        Sell / Rent
                    </h6>
                    <Col>
                        <Button
                            type="button"
                            id="type"
                            value="sell"
                            onClick={onChange}
                            variant={`${type === "rent"
                                ? "outline-secondary"
                                : "secondary"
                                }`}>Sell</Button>
                    </Col>
                    <Col>
                        <Button
                            type="button"
                            id="type"
                            value="rent"
                            onClick={onChange}
                            variant={`${type === "sell"
                                ? "outline-secondary"
                                : "secondary"
                                }`}
                        >Rent</Button>
                    </Col>
                </Row>
                <Row>
                    <Col> <h6 style={{ marginTop: '30px' }} >
                        Brand
                    </h6>
                        <Form.Control
                            type="text"
                            placeholder='Brand'
                            autoComplete='on'
                            id='brand'
                            value={brand}
                            onChange={onChange}
                            maxLength="20"
                            minLength="2"
                            required
                            style={{ width: '100%', margin: 'auto' }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col> <h6 style={{ marginTop: '30px' }} >
                        Model
                    </h6>
                        <Form.Control
                            type="text"
                            placeholder='Model'
                            autoComplete='on'
                            id='model'
                            value={model}
                            onChange={onChange}
                            maxLength="20"
                            minLength="2"
                            required
                            style={{ width: '100%', margin: 'auto' }}
                        />
                    </Col>
                    <Col>
                        <h6 style={{ marginTop: '30px' }} >
                            Kilometers
                        </h6>
                        <Form.Control
                            type="number"
                            placeholder='Kilometer'
                            value={kilometer}
                            id="kilometer"
                            onChange={onChange}
                            required
                            style={{ width: '100%', margin: 'auto' }} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h6 style={{ marginTop: '30px' }} >
                            Type
                        </h6>
                        <Form.Select
                            id='category'
                            value={category}
                            onChange={onChange}
                            required
                        >
                            <option>Select type</option>
                            <option>Bus</option>
                            <option>Minivan</option>
                            <option>SUV</option>
                            <option>Pick-up</option>
                            <option>Limousine</option>
                            <option>Small car</option>
                            <option>Station wagon</option>
                            <option>Convertible</option>
                            <option>Sports car</option>
                            <option>Motor bike</option>

                            <option>Other</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <h6 style={{ marginTop: '30px' }} >
                            Fuel type
                        </h6>
                        <Form.Select
                            id="fuel"
                            value={fuel}
                            onChange={onChange}
                            required
                        >
                            <option>Choose fuel type</option>
                            <option>Petrol</option>
                            <option>Diesel</option>
                            <option>Electric</option>
                            <option>LPG</option>
                            <option>Natural Gas</option>
                            <option>Hybrid (petrol/electric)</option>
                            <option>Hybrid (diesel/electric)</option>
                            <option>Ethanol</option>
                            <option>Hydrogen</option>
                            <option>Other</option>
                        </Form.Select>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h6 style={{ marginTop: '30px' }} >
                            Year
                        </h6>
                        <Form.Control
                            type="number"
                            placeholder='Year'
                            value={year}
                            id="year"
                            onChange={onChange}
                            required
                            style={{ width: '100%', margin: 'auto' }} />
                    </Col>
                    <Col>
                        <h6 style={{ marginTop: '30px' }} >
                            Month
                        </h6>
                        <Form.Select
                            value={month}
                            id="month"
                            onChange={onChange}
                            required
                        >
                            <option>Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h6 style={{ marginTop: '30px' }} >
                            Color
                        </h6>
                        <Form.Select
                            value={color}
                            id="color"
                            onChange={onChange}
                            required
                        >
                            <option>Choose Color</option>
                            <option>black</option>
                            <option>white</option>
                            <option>gray</option>
                            <option>gold</option>
                            <option>silver</option>
                            <option>red</option>
                            <option>blue</option>
                            <option>navy blue</option>
                            <option>sky blue</option>
                            <option>green</option>
                            <option>lime green</option>
                            <option>yellow</option>
                            <option>pink</option>
                            <option>purple</option>
                            <option>orange</option>
                            <option>brown</option>
                            <option>teal</option>
                            <option>indigo</option>
                            <option>magenta</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <h6 style={{ marginTop: '30px' }} >
                            Price
                        </h6>
                        <Form.Control
                            type='number'
                            id='price'
                            value={price}
                            onChange={onChange}
                            min="50"
                            max="4000000"
                            required
                        >
                        </Form.Control>
                        {type === "rent" && (
                            <div className="">
                                <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                            </div>
                        )}
                    </Col>
                </Row>
                <Row className='row-description input-row'>
                    <Col className='col-description input-col'>
                        <h6 style={{ marginTop: '30px' }} >
                            Description
                        </h6>
                        <Form.Control
                            as="textarea"
                            type="text"
                            id="description"
                            value={description}
                            onChange={onChange}
                            placeholder="Description"
                            required
                        >
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Form.Group id="formFile" className="mb-3">
                        <h6 style={{ marginTop: '30px' }} >
                            Select Images  <p style={{ fontWeight: 300 }}>( The first image will be the cover (max. 6 images) )</p>
                        </h6>
                        <Form.Control
                            type="file"
                            id="images"
                            onChange={onChange}
                            accept=".jpg,.png,.jpeg"
                            multiple
                            required
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Button
                            type="submit"
                        // disabled={progress !== null && progress < 100}
                        >
                            Create Listing
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
export default CreatePage
