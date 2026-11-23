import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Pesan from '../components/Pesan.jsx';
import { createMember, pesanError } from '../api.js';

const AWAL = {
  nik: '',
  nama: '',
  tempatLahir: '',
  tanggalLahir: '',
  jenisKelamin: '',
  golonganDarah: 'A',
  alamat: '',
  rt: '',
  rw: '',
  kelurahan: '',
  kecamatan: '',
  agama: 'Islam',
  statusPerkawinan: 'Belum Kawin',
  pekerjaan: '',
  kewarganegaraan: 'WNI',
  noHp: '',
  email: '',
  topik: 'Stres / Kecemasan',
  cerita: '',
  setuju: false,
};

export default function Pendaftaran() {
  const [form, setForm] = useState(AWAL);
  const [galat, setGalat] = useState([]);
  const [mengirim, setMengirim] = useState(false);
  const navigate = useNavigate();

  const isi = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  async function kirim(e) {
    e.preventDefault();
    setGalat([]);
    setMengirim(true);

    // Rapikan data: hapus spasi di tepi, kirim `cerita` hanya jika diisi
    const body = {};
    for (const [k, v] of Object.entries(form)) {
      body[k] = typeof v === 'string' ? v.trim() : v;
    }
    if (!body.cerita) delete body.cerita;

    try {
      const hasil = await createMember(body);
      alert(`Pendaftaran berhasil! Selamat datang, ${hasil.nama}`);
      navigate('/member');
    } catch (err) {
      setGalat(pesanError(err));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setMengirim(false);
    }
  }

  // Satu baris input teks, supaya kode form tidak berulang-ulang
  const teks = (label, name, props = {}) => (
    <tr>
      <td>{label}</td>
      <td><input type="text" name={name} value={form[name]} onChange={isi} {...props} /></td>
    </tr>
  );

  const pilih = (label, name, opsi) => (
    <tr>
      <td>{label}</td>
      <td>
        <select name={name} value={form[name]} onChange={isi}>
          {opsi.map((o) => <option key={o}>{o}</option>)}
        </select>
      </td>
    </tr>
  );

  return (
    <Layout title="Pendaftaran">
      <h2>Formulir Pendaftaran Member</h2>
      <p>Isi biodata lengkap sesuai KTP. Data dijaga kerahasiaannya.</p>
      <Pesan jenis="galat" isi={galat} />

      <form onSubmit={kirim}>
        <table>
          <tbody>
            {teks('NIK', 'nik', { maxLength: 16 })}
            {teks('Nama Lengkap', 'nama')}
            {teks('Tempat Lahir', 'tempatLahir')}
            <tr>
              <td>Tanggal Lahir</td>
              <td><input type="date" name="tanggalLahir" value={form.tanggalLahir} onChange={isi} /></td>
            </tr>
            <tr>
              <td>Jenis Kelamin</td>
              <td>
                <input type="radio" name="jenisKelamin" value="L" checked={form.jenisKelamin === 'L'} onChange={isi} /> Laki-laki
                &nbsp;
                <input type="radio" name="jenisKelamin" value="P" checked={form.jenisKelamin === 'P'} onChange={isi} /> Perempuan
              </td>
            </tr>
            {pilih('Golongan Darah', 'golonganDarah', ['A', 'B', 'AB', 'O', '-'])}
            <tr>
              <td>Alamat</td>
              <td><textarea name="alamat" rows="3" value={form.alamat} onChange={isi}></textarea></td>
            </tr>
            <tr>
              <td>RT / RW</td>
              <td>
                <input type="text" name="rt" value={form.rt} onChange={isi} style={{ width: 70 }} /> /{' '}
                <input type="text" name="rw" value={form.rw} onChange={isi} style={{ width: 70 }} />
              </td>
            </tr>
            {teks('Kelurahan / Desa', 'kelurahan')}
            {teks('Kecamatan', 'kecamatan')}
            {pilih('Agama', 'agama', ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'])}
            {pilih('Status Perkawinan', 'statusPerkawinan', ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'])}
            {teks('Pekerjaan', 'pekerjaan')}
            {teks('Kewarganegaraan', 'kewarganegaraan')}
            <tr>
              <td>No. HP / WhatsApp</td>
              <td><input type="tel" name="noHp" value={form.noHp} onChange={isi} /></td>
            </tr>
            <tr>
              <td>Email</td>
              <td><input type="email" name="email" value={form.email} onChange={isi} /></td>
            </tr>
            {pilih('Topik curhat', 'topik', ['Stres / Kecemasan', 'Kesedihan / Depresi', 'Hubungan / Keluarga', 'Karier / Sekolah', 'Lainnya'])}
            <tr>
              <td>Cerita singkat (opsional)</td>
              <td><textarea name="cerita" rows="4" value={form.cerita} onChange={isi}></textarea></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input type="checkbox" name="setuju" checked={form.setuju} onChange={isi} /> Saya menyetujui data saya digunakan untuk keperluan layanan.
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input type="submit" value={mengirim ? 'Mengirim...' : 'Daftar'} disabled={mengirim} />{' '}
                <input type="button" value="Ulangi" onClick={() => { setForm(AWAL); setGalat([]); }} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </Layout>
  );
}
