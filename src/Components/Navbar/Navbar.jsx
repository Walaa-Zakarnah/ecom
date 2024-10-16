import style from './nav.module.css'
import Container from '../Container/Container';
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <nav>
            <Container>
                <div className={style.navItems}>
                    <ul className={style.navList}>
                        <li>
                            <NavLink to='/' >Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/categories">Categories</NavLink> 
                        </li>
                        <li>
                            <NavLink to='/products' >Products</NavLink>
                        </li>
                        <li>
                            <NavLink to='/cart' >Cart</NavLink>
                        </li>
                        
                    </ul>
                    <div className={style.navList}>
                        <Link to="/signin" className={style.authButton} > Sign In</Link>
                        <Link to="/signup" className={style.authButton}> Sign Up</Link>
                    </div>
                </div>
            </Container>
        </nav>
    )
}

export default Navbar
