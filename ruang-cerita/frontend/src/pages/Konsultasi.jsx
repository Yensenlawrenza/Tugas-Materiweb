import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

export default function Konsultasi() {
  return (
    <Layout title="Konsultasi">
      <h2>Jadwal dan Tarif Konsultasi</h2>
      <table>
        <tbody>
          <tr><th>Paket</th><th>Durasi</th><th>Media</th><th>Tarif</th></tr>
          <tr><td>Curhat Santai</td><td>30 menit</td><td>Chat</td><td>Rp 50.000</td></tr>
          <tr><td>Konsultasi Reguler</td><td>60 menit</td><td>Video / Telepon</td><td>Rp 150.000</td></tr>
          <tr><td>Konsultasi Pasangan / Keluarga</td><td>90 menit</td><td>Video</td><td>Rp 250.000</td></tr>
        </tbody>
      </table>
      <h3>Cara Konsultasi</h3>
      <ol>
        <li><Link to="/pendaftaran">Daftar</Link> sebagai member</li>
        <li>Pilih paket dan jadwal</li>
        <li>Lakukan pembayaran</li>
        <li>Mulai bercerita bersama psikolog</li>
      </ol>
      <p><i>Tarif di atas hanya contoh, silakan ubah sesuai kebutuhan.</i></p>
    </Layout>
  );
}
