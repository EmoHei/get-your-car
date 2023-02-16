import React, { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from 'react-bootstrap'

function CreatePage() {
    const navigate = useNavigate();
    const auth = getAuth();
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "rent",
        brand: '',
        model: '',
        year: 10,
        month: '',
        color: '',
        price: 0,
        images: {},
        hp: 0,
    })
    const {
        type,
        brand,
        model,
        year,
        month,
        color,
        price,
        images,
        hp,
    } = formData;

    return (
        <Container>
            <Form>
                <Row>
                    <Col>
                        <h1 style={{ textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}>Create Announcement</h1>
                    </Col>
                </Row>
                <Row>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" class="btn-check" name="radio" id="sell" autocomplete="off" />
                        <label class="btn btn-outline-secondary" for="sell">SELL</label>

                        <input type="radio" class="btn-check" name="radio" id="rent" autocomplete="off" />
                        <label class="btn btn-outline-secondary" for="rent">RENT</label>
                    </div>
                </Row>
                <Row>
                    <Col> <h6 style={{ marginTop: '30px' }} >
                        Brand
                    </h6>
                        <Form.Control type="text" placeholder='Brand' style={{ width: '100%', margin: 'auto' }} />
                    </Col>
                </Row>
                <Row>
                    <Col> <h6 style={{ marginTop: '30px' }} >
                        Model
                    </h6>
                        <Form.Control type="text" placeholder='Model' style={{ width: '100%', margin: 'auto' }} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h6 style={{ marginTop: '30px' }} >
                            Type
                        </h6>
                        <Form.Select>
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
                            <option>Other</option>
                        </Form.Select>

                    </Col>
                    <Col>
                        <h6 style={{ marginTop: '30px' }} >
                            Fuel type
                        </h6>
                        <Form.Select>
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
                        <Form.Control type="number" placeholder='Year' defaultValue={1990} style={{ width: '100%', margin: 'auto' }} />
                    </Col>
                    <Col>
                        <h6 style={{ marginTop: '30px' }} >
                            Month
                        </h6>
                        <Form.Select>
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
                        <Form.Select>
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
                        <Form.Control type='number'>
                            
                        </Form.Control>

                    </Col>
                </Row>
                <Row>
                    <Form.Group controlId="formFile" className="mb-3">
                        <h6 style={{ marginTop: '30px' }} >
                            Select Images  <span style={{fontWeight:300}}>( The first image will be the cover (max. 6 images) )</span> 
                        </h6>
                        <Form.Control type="file" />
                    </Form.Group>
                </Row>
  </Form>
        </Container>
    )
}

export default CreatePage
