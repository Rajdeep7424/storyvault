import styles from './Button.module.css';
function Sbtn(props){
    return(
        <button className={styles.btnPrimary}>
            <p>{props.text}</p>
        </button>
    )
}
export default Sbtn