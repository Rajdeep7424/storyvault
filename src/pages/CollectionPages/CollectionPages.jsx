// src/pages/CollectionPage.jsx
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useStories } from '../../hooks/useStories';
import { Link } from 'react-router-dom';
import styles from './CollectionPages.module.css';

export default function CollectionPage() {
  const { stories, loading } = useStories();
  const [categories, setCategories] = useState([]);

  // Load all categories
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      setCategories(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    };
    fetchCategories();
  }, []);

  // Function to get category names by slugs
  const getCategoryNames = (categorySlugs) => {
    if (!categorySlugs || !Array.isArray(categorySlugs)) return [];
    return categories
      .filter(category => categorySlugs.includes(category.slug))
      .map(category => category.name);
  };

  if (loading) return <div className={styles.loading}>Loading stories...</div>;
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Story Collection</h1>
      <div className={styles.storiesGrid}>
        {stories.map(story => (
          <div key={story.id} className={styles.storyCard}>
            <h3 className={styles.storyTitle}>{story.title}</h3>
            <p className={styles.storyExcerpt}>{story.excerpt || 'No preview available...'}</p>
            
            {/* Display categories */}
            <div className={styles.categories}>
              <span>Categories: </span>
              {getCategoryNames(story.categorySlugs).length > 0 ? (
                getCategoryNames(story.categorySlugs).map((name, index) => (
                  <Link 
                    key={index} 
                    to={`/collection?category=${story.categorySlugs[index]}`}
                    className={styles.categoryBadge}
                  >
                    {name}
                  </Link>
                ))
              ) : (
                <span className={styles.noCategories}>Uncategorized</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}