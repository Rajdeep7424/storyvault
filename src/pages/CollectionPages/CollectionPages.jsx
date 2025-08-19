import { Link } from 'react-router-dom';
import { useStories } from '../../hooks/useStories';
import styles from './CollectionPages.module.css';

export default function CollectionPage() {
  const { stories, loading } = useStories();

  if (loading) return <div className={styles.loading}>Loading stories...</div>;

  return (
    <div className={styles.container}>
      <h1>Story Collection</h1>
      <div className={styles.storiesGrid}>
        {stories.map((story) => (
          <Link
            to={`/story/${story.id}`}
            key={story.id}
            className={styles.storyCardLink}
          >
            <div className={styles.storyCard}>
              <h3>{story.title}</h3>
              <p>{story.excerpt || 'Read more...'}</p>

              {Array.isArray(story.categorySlugs) &&
                story.categorySlugs.length > 0 && (
                  <div className={styles.categories}>
                    Categories: {story.categorySlugs.join(', ')}
                  </div>
                )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}