import instagram from '../../assets/images/instagram.svg';
import linkdin from '../../assets/images/linkdin.svg'
import x from '../../assets/images/x.svg'
import youtube from '../../assets/images/youtube.svg'
import './Footer.module.css'

function Sfooter(){
    return(
        <footer>
            <span>
                <img src={instagram} alt="" />
                <img src={linkdin} alt="" />
                <img src={x} alt="" />
                <img src={youtube} alt="" />
            </span>
            <p>© StoryVault all rights reserved</p>
        </footer>
    )
}

export default Sfooter