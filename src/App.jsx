import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importando todas as Páginas
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Resources from './pages/Resources';
import Testimonials from './pages/Testimonials';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CoursePlayer from './pages/CoursePlayer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/como-funciona" element={<HowItWorks />} />
        <Route path="/recursos" element={<Resources />} />
        <Route path="/depoimentos" element={<Testimonials />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Signup />} />
        <Route path="/aulas" element={<CoursePlayer />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;