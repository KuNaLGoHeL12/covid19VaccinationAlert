import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import States from './States';
import SweetAlert from 'react-bootstrap-sweetalert';
import { wait } from '@testing-library/dom';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            radio: 'P',
            pincode: '',
            pinCodeRendered: true,
            state_id: '',
            district_id: '',
            alert: null
        }
        const dotenv = require('dotenv').config();
    }
    handleNameChange = (event) => {
        //console.log("GGGGG ::: "+event.target.value);
        this.setState({
            name: event.target.value
        });
    }

    handlePincodeChange = (event) => {
        this.setState({
            pincode: event.target.value
        });
    }

    handleEmailChange = (event) => {
        //console.log("GGGGG ::: "+event.target.value);
        this.setState({
            email: event.target.value
        });
    }

    handleSubmit = (event) => {


        if (this.state.radio === 'P') {
            const formValues = {
                username: this.state.name,
                email_id: this.state.email,
                search_based_on: this.state.radio,
                search_value: this.state.pincode
            }
            console.log(formValues);
        } else {
            const formValues = {
                username: this.state.name,
                email_id: this.state.email,
                search_based_on: this.state.radio,
                search_value: this.state.district_id
            }
            console.log(formValues);
        }
        this.setState({
            alert: (<SweetAlert
                success
                title="Subscribed Successfully"
                onConfirm={this.hideAlertCustom}
            >
                You should start receiving the covid19 Vaccination Alert on your registered E-mail in 30 mins.
            </SweetAlert>)
        });

        const username = process.env.REACT_APP_API_USERNAME;
        const password = process.env.REACT_APP_API_PASSWORD;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('api_admin_user:C0w1N_aP1'),
                'Accept' : '*/*'
            },
            body: JSON.stringify()
        };

        console.log("Starting to call API");

        fetch("https://covaccine-tracker.herokuapp.com/rest/data/district_name/775",requestOptions)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log("KKG : ");
                console.log(data);


            }).catch(error => {
                console.log(error);
            });

        event.preventDefault();
    }

    hideAlertCustom = (event) => {
        console.log("Inside Hide Alert");
        setTimeout(function() { //Start the timer
            window.location.reload(false); //After 1 second, set render to true
        }.bind(this), 1200)
        
    }

    districtRadioClicked = (event) => {
        console.log("kunal");
        this.setState({
            radio: 'D',
            pinCodeRendered: false,
            pincode: ''
        });
    }

    pincodeRadioClicked = (event) => {
        console.log("kunal123 : " + event.target.checked);
        this.setState({
            radio: 'P',
            pinCodeRendered: true,
            state_id: '',
            district_id: ''
        });
    }
    handleStateCallback = (childData) => {
        console.log("Inside Parent for State change : " + childData);
        this.setState({
            state_id: childData
        })
    }


    handleDistrictCallback = (childData) => {
        console.log("Inside Parent For District CHange : " + childData);
        this.setState({ district_id: childData });
    }
    render() {
        const p_rendered = this.state.pinCodeRendered;
        //const d_rendered = !p_rendered && this.state.state_id !== ''; 
        const submit_disabled = this.state.name === '' || this.state.email === '' || ((this.state.radio === 'P' && this.state.pincode === '') || (this.state.radio === 'D' && (this.state.state_id === '' || this.state.district_id === '')));

        return (
            <>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Register</h2>
                        <Form >
                            <Form.Group id="name" className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" required placeholder="Full Name" value={this.state.name} onChange={this.handleNameChange}></Form.Control>
                            </Form.Group>
                            <Form.Group id="email" className="mb-3">
                                <Form.Label>Email</Form.Label >
                                <Form.Control type="email" required placeholder="Email Address" value={this.state.email} onChange={this.handleEmailChange}></Form.Control>
                            </Form.Group>
                            <Form.Group id="searchBy" className="mb-3">
                                <Form.Check
                                    type="radio"
                                    checked={this.state.radio === 'P'}
                                    id="SearchByPincode"
                                    label={'Search By Pincode'}
                                    onChange={this.pincodeRadioClicked}
                                />
                                <Form.Check
                                    type="radio"
                                    id="SearchByPincode"
                                    label={'Search By District'}
                                    checked={this.state.radio === 'D'}
                                    onChange={this.districtRadioClicked}
                                />
                            </Form.Group>
                            {p_rendered && (
                                <Form.Group id="email" className="mb-3" >
                                    <Form.Label>Pincode</Form.Label>
                                    <Form.Control type="number" required placeholder="Area Pincode" value={this.state.pincode} onChange={this.handlePincodeChange} ></Form.Control>
                                </Form.Group>
                            )}
                            {!p_rendered && (
                                <States parentCallbackForState={this.handleStateCallback} parentCallbackForDistrict={this.handleDistrictCallback}></States>
                            )}
                            {/* {d_rendered && (
                            <Districts parentCallbackForDistrict = {this.handleDistrictCallback} state_id = {this.state.state_id}></Districts>
                         )} */}
                            <br></br>
                            <Button className="w-100 btn btn-success" type="submit" disabled={submit_disabled} onClick={this.handleSubmit}>Subscribe</Button>
                        </Form>
                    </Card.Body>
                </Card>
                {this.state.alert}
            </>
        );
    }
}


export default Register;
