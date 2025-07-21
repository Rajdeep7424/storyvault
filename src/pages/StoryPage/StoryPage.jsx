import { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useParams, Link } from 'react-router-dom';
import './StoryPage.module.css';

export default function StoryPage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the story
        const storyDoc = await getDoc(doc(db, "stories", id));
        if (storyDoc.exists()) {
          setStory({ id: storyDoc.id, ...storyDoc.data() });
        }

        // Get all categories for the tags
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        setCategories(categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="loading">Loading story...</div>;
  if (!story) return <div className="error">Story not found</div>;

  return (
    <div className="story-page">
      <div className="story-header">
        <h1>{story.title}</h1>
        <div className="story-meta">
          <span className="date">
            {story.createdAt?.toDate().toLocaleDateString()}
          </span>
          <div className="tags">
            {story.categorySlugs?.map(slug => {
              const category = categories.find(c => c.slug === slug);
              return category ? (
                <Link 
                  key={slug} 
                  to={`/collection?category=${slug}`}
                  className="tag"
                >
                  {category.name}
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className="story-content">
        {story.content.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <Link to="/collection" className="back-button">
        ← Back to Collection
      </Link>
    </div>
  );
}