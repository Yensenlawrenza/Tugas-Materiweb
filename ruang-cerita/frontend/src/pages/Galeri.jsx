import Layout from '../components/Layout.jsx';

const foto = [
  ['gambar1.jpeg', 'Ruang konseling', 'Ruang konseling'],
  ['ruang_cerita.jpeg', 'Ruang tunggu', 'Ruang tunggu'],
  ['cantik.jpeg', 'Psikolog', 'Psikolog kami'],
  ['workhsop.jpeg', 'Workshop', 'Workshop kesehatan mental'],
  ['konsultasi.jpeg', 'Konsultasi online', 'Konsultasi online'],
  ['logo.jpeg', 'Komunitas', 'Komunitas Ruang Cerita'],
];

export default function Galeri() {
  return (
    <Layout title="Galeri">
      <h2>Galeri Ruang Cerita</h2>
      <h3>Foto</h3>
      <div className="galeri">
        {foto.map(([file, alt, keterangan]) => (
          <figure key={file}>
            <img src={`/${file}`} alt={alt} />
            <br />
            {keterangan}
          </figure>
        ))}
      </div>
      <h3>Video edukasi</h3>
      <video width="480" controls>
        <source src="/vidioedukasi.mp4" type="video/mp4" />
        Browser kamu tidak mendukung video.
      </video>
    </Layout>
  );
}
