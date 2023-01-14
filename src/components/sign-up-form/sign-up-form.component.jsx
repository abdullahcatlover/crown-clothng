import {useState} from 'react'
import {createAuthUserWithEmailANdPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import Button from '../button/Button'
import FormInput from '../form-input/Form-input.component'
import './sign-up-form.styles.scss'


const defaultFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

   const [formField, setFormFields] = useState(defaultFields)
   const {displayName, email, password, confirmPassword} = formField;



   const resetFormFields =()=> {
    setFormFields(defaultFields);
}




   const handleSubmit = async (event)=> {
    event.preventDefault();

    if(password !== confirmPassword) {
        alert('password do not match')
        return;
    }

    try {
        const {user} = await createAuthUserWithEmailANdPassword(
            email,
            password
        )
        resetFormFields()
        alert('you signed up seccessfully')

        await createUserDocumentFromAuth(user, {displayName})
       
       
        
    }catch(error) {
        if(error.code === 'auth/email-already-in-use') {
            alert("Cannot create user, email already in use")
        } else {
            console.log('user creation faced an error', error);
        }
    }
}


   const handleChange =(event)=> {
    const {name, value} = event.target;

    setFormFields({...formField,[name]: value})
   }

  return (
    <div className='sign-up-container'>
        <h1>Sign Up With your email and password</h1>
        <form onSubmit={handleSubmit}>
           
            <FormInput label='Display Name' type="text" required onChange={handleChange}
            name='displayName' value={displayName}/>

            
            <FormInput label='Email' type="email" required onChange={handleChange}
            name='email' value={email}
            />

           
            <FormInput label='password' type="password" required onChange={handleChange}
            name='password' value={password}/>

           
            <FormInput label='Confirm Password' required onChange={handleChange}
             type="password" name='confirmPassword'
            value={confirmPassword}/>
            <Button type='submit'>Sign Up</Button>
        </form>
    </div>
  )
}

export default SignUpForm;