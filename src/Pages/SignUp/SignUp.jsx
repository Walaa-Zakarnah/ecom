import styles from '../Login/login.module.css'
import { useState } from 'react'
import axios from 'axios';
import { object, string, mixed } from 'yup';
import { Bounce, toast } from 'react-toastify';
import Loader from './../../Components/Loader/Loader';
function SignUp() {
    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        image: null,
    });
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        setUser({
            ...user,
            [name]: files[0]
        });
    }
    const registerValidation = async () => {
        const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/gif'];
        const RegisterSchema = object({
            userName: string().min(3).max(12).required("Username is required."),
            email: string().email().required("Email is required."),
            password: string().min(8).max(30).required("Password is required."),
            image: mixed()
                .required("Image is required") // Ensure the image is present
                .test(
                    'fileFormat',
                    'Unsupported Format',
                    value => value && SUPPORTED_FORMATS.includes(value.type) // Ensure valid format
                )
        });
        try {
            await RegisterSchema.validate(user, { abortEarly: false });
            return true;
        } catch (error) {
            console.log("Validation error: ", error.errors);
            const validationErrors = {};
            error.inner.forEach(err =>
                validationErrors[err.path] = err.message
            )
            setErrors(validationErrors);
            setLoader(false);
            return false;

        }
    }
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        if (!await registerValidation()) {
            console.log('error')
        } else {
            const formData = new FormData();
            formData.append('userName', user.userName);
            formData.append('email', user.email);
            formData.append('password', user.password);
            formData.append('image', user.image);
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/signup`, formData);
                console.log(data);

                if (data.message === 'success') {
                    toast('Account created successfully!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    })
                }
            } catch (error) {
                if (error.response.status === 409) {
                    toast.error('Email already exists!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            } finally {
                setLoader(false);
            }
        }
    }
    return (
        <div className={styles.signToSite}>
            {loader && <Loader />}
            <form onSubmit={handleRegisterSubmit}>
                <h2>Create your account</h2>
                <input type='text' placeholder='Username' name='userName' value={user.userName} onChange={handleChange} />
                {
                    errors.userName
                }
                <input type='email' placeholder='Email' name='email' value={user.email} onChange={handleChange} />
                {
                    errors.email
                }
                <input type='password' placeholder='Password' name='password' value={user.password} onChange={handleChange} />
                {
                    errors.password
                }
                <label>
                    Upload your picture here:
                    <input type='file' name='image' onChange={handleImageChange} />
                </label>
                {
                    errors.image
                }
                <input type='submit' value='Sign Up' disabled={loader} />
            </form>
        </div>
    )
}

export default SignUp
