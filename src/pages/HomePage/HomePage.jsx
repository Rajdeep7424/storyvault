import heroImg from '../../assets/images/heroImg.webp';
import styles from './HomePage.module.css';
import Sbtn from '../../components/Button/Button';
import { NavLink } from 'react-router-dom';

function Shome(){
    return(
        <main>

            <div className={styles.hero}>
                <img src={heroImg} alt="Library-TypeWriter-MagicBook" />
                <span>
                    <h2>StoryVault</h2>
                    <p>Story Vault is more than just a platform—it's a community where readers and writers come together to celebrate the art of storytelling. Our mission is to inspire creativity, foster connections, and bring stories to life.</p>
                    <NavLink to="/collection">
                        <Sbtn text="Read Stories" className={`${styles.ctaBtn}`} />
                    </NavLink>
                </span>
            </div>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <h2>Story Name</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui id suscipit et laborum maxime tenetur aliquam quos sint, corporis iure in hic deserunt veniam laboriosam expedita dicta est sit porro nihil, dolores, tempore harum nulla consequatur. Quod temporibus deleniti at dignissimos minus voluptate doloremque quibusdam? Ut deleniti odit voluptatem eum architecto, quae nemo veritatis labore.</p>
                </div>

                <div className={styles.card}>
                    <h2>Story Name</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui id suscipit et laborum maxime tenetur aliquam quos sint, corporis iure in hic deserunt veniam laboriosam expedita dicta est sit porro nihil, dolores, tempore harum nulla consequatur. Quod temporibus deleniti at dignissimos minus voluptate doloremque quibusdam? Ut deleniti odit voluptatem eum architecto, quae nemo veritatis labore.</p>
                </div>

                <div className={styles.card}>
                    <h2>Story Name</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui id suscipit et laborum maxime tenetur aliquam quos sint, corporis iure in hic deserunt veniam laboriosam expedita dicta est sit porro nihil, dolores, tempore harum nulla consequatur. Quod temporibus deleniti at dignissimos minus voluptate doloremque quibusdam? Ut deleniti odit voluptatem eum architecto, quae nemo veritatis labore.</p>
                </div>

                <div className={styles.card}>
                    <h2>Story Name</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui id suscipit et laborum maxime tenetur aliquam quos sint, corporis iure in hic deserunt veniam laboriosam expedita dicta est sit porro nihil, dolores, tempore harum nulla consequatur. Quod temporibus deleniti at dignissimos minus voluptate doloremque quibusdam? Ut deleniti odit voluptatem eum architecto, quae nemo veritatis labore.</p>
                </div>
            </div>
        </main>
    )
}
export default Shome