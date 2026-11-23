import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const menu = [
  ['/', 'Beranda'],
  ['/pendaftaran', 'Pendaftaran'],
  ['/galeri', 'Galeri'],
  ['/member', 'Member'],
  ['/konsultasi', 'Konsultasi'],
  ['/artikel', 'Artikel'],
];

export default function Layout({ title, children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${title} - Ruang Cerita`;
  }, [title]);

  return (
    <div className="wrap">
      <header>
        {pathname === '/' && (
          <div className="gelembung">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
          </div>
        )}
        <h1>Ruang Cerita</h1>
        <p>Tempat aman untuk bercerita, didengar, dan didampingi psikolog.</p>
      </header>
      <div className="layout">
        <aside>
          <h3>Menu</h3>
          <ul>
            {menu.map(([to, label]) => (
              <li key={to}>
                <NavLink to={to} end className={({ isActive }) => (isActive ? 'aktif' : undefined)}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="kotak">
            <b>Darurat?</b>
            <br />
            Jika kamu dalam kondisi krisis, segera hubungi layanan darurat atau orang terdekat.
          </div>
        </aside>
        <main>{children}</main>
      </div>
      <footer>&copy; 2026 Ruang Cerita &mdash; Layanan Konsultasi dan Curhat dengan Psikolog</footer>
    </div>
  );
}
