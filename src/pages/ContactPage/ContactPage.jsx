import styles from '../ContactPage/ContactPage.module.css';

function Scontact(){
    return(
        <form>
            <h2>Connect with us</h2>
            <span className={styles.formSection}>
                <label htmlFor="name">Name :</label>
                <input className={styles.forminput} type="name" name="name" required/>
            </span>
            <span className={styles.formSection}>
                <label htmlFor="email">Email :</label>
                <input className={styles.forminput} type="email" name="email" required/>
            </span>
            <span className={styles.formSection}>
                <label htmlFor="message">Message :</label>
                <textarea className={`${styles.forminput} ${styles.msgbox}`} name="message"></textarea>
            </span>
        </form>
    )
}
export default Scontact