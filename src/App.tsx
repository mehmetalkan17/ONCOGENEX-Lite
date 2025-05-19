import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Community from './pages/Community';
import Profile from './pages/Profile';
import { UserProvider } from './contexts/UserContext';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Update document title
    document.title = 'ONCOGENEX-LITE | Sağlıklı Bir Gelecek İçin';
    
    // Update favicon dynamically 
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (link) {
      link.href = '/favicon.svg';
    }
  }, []);

  return (
    <UserProvider>
      <div className="app min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:id" element={<ArticleDetail />} />
            <Route path="community" element={<Community />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;