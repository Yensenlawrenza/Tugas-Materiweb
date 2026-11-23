import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

export default function Artikel() {
  return (
    <Layout title="Artikel">
      <h2>Artikel &amp; Tips Kesehatan Mental</h2>
      <p>Bacaan ringan untuk menemani harimu.</p>

      <h3>1. Cara Menenangkan Pikiran Saat Cemas</h3>
      <p><i>Kategori: Kecemasan</i></p>
      <p>
        Coba teknik pernapasan 4-4-6: tarik napas 4 detik, tahan 4 detik, hembuskan 6 detik.
        Ulangi lima kali sambil memperhatikan apa yang kamu lihat, dengar, dan rasakan di sekitarmu.
      </p>

      <h3>2. Tanda Kamu Perlu Bercerita pada Profesional</h3>
      <p><i>Kategori: Konsultasi</i></p>
      <ul>
        <li>Perasaan sedih atau cemas berlangsung lebih dari dua minggu</li>
        <li>Tidur dan makan terganggu</li>
        <li>Sulit berkonsentrasi atau kehilangan minat pada hal yang biasa disukai</li>
        <li>Merasa terlalu lelah untuk menjalani hari</li>
      </ul>
      <p>
        Meminta bantuan bukan tanda lemah, melainkan langkah berani.{' '}
        <Link to="/pendaftaran">Daftar konsultasi</Link> kapan saja kamu siap.
      </p>

      <h3>3. Kebiasaan Kecil untuk Menjaga Kesehatan Mental</h3>
      <p><i>Kategori: Gaya Hidup</i></p>
      <ol>
        <li>Tidur cukup 7-8 jam</li>
        <li>Bergerak atau jalan santai 15 menit sehari</li>
        <li>Menulis jurnal perasaan sebelum tidur</li>
        <li>Batasi media sosial saat merasa lelah</li>
        <li>Bercerita pada orang yang dipercaya</li>
      </ol>
    </Layout>
  );
}
