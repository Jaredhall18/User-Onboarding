import react from 'react'

export default function Form(props) {
    const {
        values,
        submit,
        change,
        disabled, 
        errors,
    } = props

    const onSubmit = e => {
        e.preventDefault()
        submit()
    }

    const onChange = e => {
        const { name, value, checked, type } = e.target 
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div>
                <h2>Enter Information Here</h2>

                <button id='submit' disabled={disabled}>Submit</button>

                <div>{errors.first_name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.tos}</div>

                {/* I'll need errors here */}

            </div>
            <div className='form-group inputs'>
                <h4>General Information</h4>

                <label> First Name
                    <input
                    value={values.first_name}
                    onChange={onChange}
                    name= 'first_name'
                    type= 'text'
                    />
                </label>
                <label> Email
                    <input
                    value={values.email}
                    onChange={onChange}
                    name= 'email'
                    type= 'text'
                    />
                </label>
                <label> Password
                    <input
                    value={values.password}
                    onChange={onChange}
                    name= 'password'
                    type= 'password'
                    />
                </label>
                <label> Terms of Service
                    <input
                    value={values.tos}
                    onChange={onChange}
                    name= 'tos'
                    type= 'checkbox'
                    />
                </label>
            </div>
        </form>
    )

}