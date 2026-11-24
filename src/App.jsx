import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import InscriptionPage from './pages/InscriptionPage.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets" element={<ProjectsPage />} />
          <Route path="/formations" element={<CoursesPage />} />
          <Route path="/inscription" element={<InscriptionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
