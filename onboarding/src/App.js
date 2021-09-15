import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import schema from './validation/FormSchema'
import './App.css';
import * as yup from 'yup'
import axios from 'axios'
import User from './components/User'

//Initial States for Form
const initialFormValues = {
  name: '',
  //last_name:
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
const [users, setUsers] = useState(initialUsers)
const [formValues, setFormValues] = useState(initialFormValues)
const [formErrors, setFormErrors] = useState(initialFormErrors)
const [disabled, setDisabled] = useState(initialDisabled)

//Get user Data
const getUser = () => {
  axios.get('https://reqres.in/api/users')
  .then(res => {
    setUsers(res.data.data);
  }).catch(err => console.error(err))
}

//Post User Data
const postNewUser = newUser => {
  axios.post('https://reqres.in/api/users', newUser)
  .then(res => {
    setUsers([res.data, ...users])
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

//Side Effects

useEffect(() => {
  getUser()
}, [])

useEffect(() => {
  schema.isValid(formValues).then(valid => setDisabled(!valid))
}, [formValues])

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

      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  );
}

export default App;
