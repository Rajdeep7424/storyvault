import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import styles from './StoryPage.module.css';

export default function StoryPage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const docRef = doc(db, "stories", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setStory({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) return <div className={styles.loading}>Loading story...</div>;
  if (!story) return <div className={styles.error}>Story not found</div>;

  return (
    <div className={styles.container}>
      <Link to="/collection" className={styles.backButton}>
        ← Back to Collection
      </Link>
      
      <article className={styles.storyContent}>
        <h1>{story.title}</h1>
        {story.categorySlugs?.length > 0 && (
          <div className={styles.categories}>
            Categories: {story.categorySlugs.join(', ')}
          </div>
        )}
        <div className={styles.content}>
          {story.content.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
      <Link to="/collection" className={styles.backButton}>
        ← Back to Collection
      </Link>
    </div>
  );
}