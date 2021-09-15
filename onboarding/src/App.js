import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import schema from './validation/FormSchema'
import './App.css';
import * as yup from 'yup'
import axios from 'axios'

//Initial States for Form
const initialFormValues = {
  name: '',
  email: '',
  password: '',
  //Checkbox
  tos: false,
}
//Initial State for Errors
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}

const initialUsers = []
const initialDisabled = true


function App() {
//Set all of our States!
const [user, setUser] = useState(initialUsers)
const [formValues, setFormValues] = useState(initialFormValues)
const [formErrors, setFormErrors] = useState(initialFormErrors)
const [disabled, setDisabled] = useState(initialDisabled)

//Get user Data
const getUser = () => {
  axios.get('https://reqres.in/api/users')
  .then(res => {
    setUser(res.data);
  }).catch(err => console.error(err))
}

//Post User Data
const postNewUser = newUser => {
  axios.post('https://reqres.in/api/users', newUser)
  .then(res => {
    setUser([res.data, ...user])
    setFormValues(initialFormValues);
  }).catch(err => {
    console.error(err);
    setFormValues(initialFormValues)
  })
}

//Event Handlers for Change and submit
const validate = (name, value) => {
  yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors ({...formErrors, [name]: ''}))
    .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
}

const inputChange = (name, value) => {
  validate(name, value);
  setFormValues({
    ...formValues,
    [name]: value
  })
}

const formSubmit = () => {
  const newUser = {
  name: formValues.name.trim(),
  email: formValues.email.trim(),
  password: formValues.password.trim(),
  tos: !!formValues.tos
  }
  postNewUser(newUser);
}

  return (
    <div className="App">
      <header><h1>Form</h1></header>
    <Form 
      values={formValues}
      change= {inputChange}
      submit= {formSubmit}
      disabled= {disabled}
      errors= {formErrors}
    />
    </div>
  );
}

export default App;
