import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css'
import { useState } from 'react'
import axios from 'axios'
function SignIn() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      console.log(user)
      const { data } = await axios.post("https://ecommerce-node4.onrender.com/auth/login", {user});
      console.log("Dtaaaaaaaaaaaaa", data)
      navigate("/");
    } catch (error) {
      console.log("error is___________________", error)
    } finally {
      setLoader(false);
    }
  }
  return (
    <div className={styles.signToSite}>
      <form onSubmit={handleFormSubmit}>
        <h2> Sign in to your account</h2>
        <input type="email" name="email" placeholder="example@gmail.com" value={user.email} onChange={handleChange} />
        <input type="password" name="password" placeholder='Password' value={user.password} onChange={handleChange} />
        <input type="submit" value={loader ? "Signing In" : "Sign In"} disabled={loader} />
        <Link to={'/forgotpassword'} className={styles.regLog}>Forgot password? </Link>
      </form>
    </div>
  )
}

export default SignIn
