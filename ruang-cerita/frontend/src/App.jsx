import { Routes, Route } from 'react-router-dom';
import Beranda from './pages/Beranda.jsx';
import Pendaftaran from './pages/Pendaftaran.jsx';
import Galeri from './pages/Galeri.jsx';
import Member from './pages/Member.jsx';
import Konsultasi from './pages/Konsultasi.jsx';
import Artikel from './pages/Artikel.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Beranda />} />
      <Route path="/pendaftaran" element={<Pendaftaran />} />
      <Route path="/galeri" element={<Galeri />} />
      <Route path="/member" element={<Member />} />
      <Route path="/konsultasi" element={<Konsultasi />} />
      <Route path="/artikel" element={<Artikel />} />
      <Route path="*" element={<Beranda />} />
    </Routes>
  );
}
