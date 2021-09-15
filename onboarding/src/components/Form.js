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

                <button disabled={disabled}>Submit</button>

                {/* I'll need errors here */}

            </div>
            <div className='form-group inputs'>
                <h4>General Information</h4>

                <label> Name
                    <input
                    value={values.name}
                    onChange={onChange}
                    name= 'name'
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
                    value={values.name}
                    onChange={onChange}
                    name= 'password'
                    type= 'text'
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