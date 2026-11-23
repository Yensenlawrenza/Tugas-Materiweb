import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

export default function Beranda() {
  return (
    <Layout title="Beranda">
      <h2>Selamat Datang di Ruang Cerita</h2>
      <div className="napas">
        <h3 style={{ marginTop: 0 }}>Tarik napas dulu, yuk</h3>
        <div className="lingkaran">
          <span className="tarik">Tarik napas</span>
          <span className="hembus">Hembuskan</span>
        </div>
        <p><i>Ikuti lingkaran ini selama satu menit. Kamu aman di sini.</i></p>
      </div>
      <p>
        Ruang Cerita adalah layanan konsultasi dan curhat online bersama psikolog profesional.
        Apa pun yang kamu rasakan, kamu tidak sendirian.
      </p>
      <h3>Layanan Kami</h3>
      <ul>
        <li>Konsultasi individu (stres, kecemasan, kesedihan, burnout)</li>
        <li>Konsultasi remaja dan pelajar</li>
        <li>Konsultasi pasangan dan keluarga</li>
        <li>Curhat santai bersama psikolog</li>
      </ul>
      <h3>Mengapa Ruang Cerita?</h3>
      <ol>
        <li>Psikolog berpengalaman dan berizin</li>
        <li>Kerahasiaan terjamin</li>
        <li>Bisa lewat chat, telepon, atau video</li>
        <li>Jadwal fleksibel</li>
      </ol>
      <h3>Jam Layanan</h3>
      <table>
        <tbody>
          <tr><th>Hari</th><th>Jam</th></tr>
          <tr><td>Senin - Jumat</td><td>09.00 - 20.00 WIB</td></tr>
          <tr><td>Sabtu</td><td>09.00 - 15.00 WIB</td></tr>
          <tr><td>Minggu</td><td>Libur</td></tr>
        </tbody>
      </table>
      <p>
        Belum jadi member? <Link to="/pendaftaran">Daftar di sini</Link> atau lihat suasana kami di{' '}
        <Link to="/galeri">Galeri</Link>.
      </p>
    </Layout>
  );
}
