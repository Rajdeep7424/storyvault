import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export function useStories(categorySlug = null) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let q;
        if (categorySlug) {
          q = query(collection(db, "stories"), 
                where("categorySlugs", "array-contains", categorySlug));
        } else {
          q = collection(db, "stories");
        }
        
        const querySnapshot = await getDocs(q);
        setStories(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  return { stories, loading };
}