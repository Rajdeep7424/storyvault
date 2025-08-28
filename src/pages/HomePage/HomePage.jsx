import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";
import heroImg from "../../assets/images/heroImg.webp";
import styles from "./HomePage.module.css";
import Sbtn from "../../components/Button/Button";

function Shome() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        // Get latest 4 stories ordered by timestamp (make sure you have "createdAt" field in Firestore)
        const q = query(
          collection(db, "stories"),
          orderBy("createdAt", "desc"),
          limit(4)
        );
        const querySnapshot = await getDocs(q);

        const storyList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStories(storyList);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <div className={styles.hero}>
        <img src={heroImg} alt="Library-TypeWriter-MagicBook" />
        <span>
          <h2>StoryVault</h2>
          <p>
            Story Vault is more than just a platform—it's a community where
            readers and writers come together to celebrate the art of
            storytelling. Our mission is to inspire creativity, foster
            connections, and bring stories to life.
          </p>
          <NavLink to="/collection">
            <Sbtn text="Read Stories" className={styles.ctaBtn} />
          </NavLink>
        </span>
      </div>

      {/* Latest Stories Section */}
      <div className={styles.cards}>
        <h2>Latest Stories</h2>
        {loading ? (
          <p>Loading stories...</p>
        ) : stories.length === 0 ? (
          <p>No stories available.</p>
        ) : (
          <div className={styles.cards}>
            {stories.map((story) => (
              <div key={story.id} className={styles.card}>
                <h3>{story.title}</h3>
                <p>
                  {story.content?.slice(0, 100)}...
                </p>
                <Link to={`/story/${story.id}`} className={styles.readMore}>
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Shome;
