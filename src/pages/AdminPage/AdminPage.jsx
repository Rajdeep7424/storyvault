import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import './AdminPage.module.css';

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [storyData, setStoryData] = useState({
    title: '',
    excerpt: '',
    content: ''
  });
  const [auth, setAuth] = useState({
    email: '',
    password: '',
    isAuthenticated: false
  });
  const [message, setMessage] = useState('');

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

  const handleCategoryToggle = (categorySlug) => {
    setSelectedCategories(prev => 
      prev.includes(categorySlug)
        ? prev.filter(slug => slug !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        getAuth(), 
        auth.email, 
        auth.password
      );
      setAuth(prev => ({ ...prev, isAuthenticated: true }));
      setMessage('Login successful!');
    } catch (error) {
      setMessage(`Login failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    await signOut(getAuth());
    setAuth({ email: '', password: '', isAuthenticated: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "stories"), {
        ...storyData,
        categorySlugs: selectedCategories,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setMessage('Story published successfully!');
      setStoryData({ title: '', excerpt: '', content: '' });
      setSelectedCategories([]);
    } catch (error) {
      setMessage(`Error publishing story: ${error.message}`);
    }
  };

  if (!auth.isAuthenticated) {
    return (
      <div className="auth-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={auth.email}
              onChange={(e) => setAuth({...auth, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={auth.password}
              onChange={(e) => setAuth({...auth, password: e.target.value})}
              required
            />
          </div>
          <button type="submit">Login</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Add New Story</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input 
            type="text" 
            value={storyData.title}
            onChange={(e) => setStoryData({...storyData, title: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Excerpt (short preview):</label>
          <textarea
            value={storyData.excerpt}
            onChange={(e) => setStoryData({...storyData, excerpt: e.target.value})}
            required
            maxLength={200}
          />
        </div>
        
        <div className="form-group">
          <label>Content:</label>
          <textarea
            value={storyData.content}
            onChange={(e) => setStoryData({...storyData, content: e.target.value})}
            required
            rows={10}
          />
        </div>
        
        <div className="category-selection">
          <h3>Categories:</h3>
          <div className="category-tags">
            {categories.map(category => (
              <label key={category.id} className="category-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => handleCategoryToggle(category.slug)}
                />
                <span className="category-name">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        <button type="submit" className="publish-button">Publish Story</button>
      </form>
    </div>
  );
}