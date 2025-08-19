import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

function Snav() {
    return (
        <nav className={styles.navbar}>
            <span>
                <NavLink to="/" className={styles.brand}>
                <h1 className={styles.brandName}>StoryVault</h1>
                <p className={styles.tagLine}>Where stories come alive</p>
                </NavLink>
            </span>
            <ul className={styles.navLinks}>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                    }
                >
                    <li>Home</li>
                </NavLink>
                <NavLink 
                    to="/collection" 
                    className={({ isActive }) => 
                        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                    }
                >
                    <li>Collection</li>
                </NavLink>
                <NavLink 
                    to="/contact" 
                    className={({ isActive }) => 
                        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                    }
                >
                    <li>Contact</li>
                </NavLink>
            </ul>
        </nav>
    )
}

export default Snav;