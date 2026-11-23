import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Pesan from '../components/Pesan.jsx';
import { getMembers, updateMember, deleteMember, pesanError } from '../api.js';

const TOPIK = [
  'Stres / Kecemasan',
  'Kesedihan / Depresi',
  'Hubungan / Keluarga',
  'Karier / Sekolah',
  'Lainnya',
];

const formatTanggal = (iso) => iso.slice(0, 10).split('-').reverse().join('-');

export default function Member() {
  const [members, setMembers] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [pesan, setPesan] = useState(null); // { jenis, isi }
  const [ubah, setUbah] = useState(null); // data form ubah, null = tertutup

  async function muat() {
    try {
      setMembers(await getMembers());
    } catch (err) {
      setPesan({ jenis: 'galat', isi: pesanError(err) });
    } finally {
      setMemuat(false);
    }
  }

  useEffect(() => {
    muat();
  }, []);

  function bukaUbah(m) {
    setUbah({
      id: m.id,
      nama: m.nama,
      pekerjaan: m.pekerjaan,
      noHp: m.noHp,
      email: m.email,
      topik: m.topik,
    });
    setPesan(null);
  }

  const isiUbah = (e) => setUbah({ ...ubah, [e.target.name]: e.target.value });

  async function simpanUbah(e) {
    e.preventDefault();
    const { id, ...body } = ubah;
    try {
      await updateMember(id, body);
      setPesan({ jenis: 'sukses', isi: 'Data member berhasil diubah.' });
      setUbah(null);
      muat();
    } catch (err) {
      setPesan({ jenis: 'galat', isi: pesanError(err) });
    }
  }

  async function hapus(m) {
    if (!window.confirm(`Hapus member "${m.nama}"?`)) return;
    try {
      const hasil = await deleteMember(m.id);
      setPesan({ jenis: 'sukses', isi: hasil.message });
      muat();
    } catch (err) {
      setPesan({ jenis: 'galat', isi: pesanError(err) });
    }
  }

  return (
    <Layout title="Member">
      <h2>Daftar Member</h2>
      {pesan && <Pesan jenis={pesan.jenis} isi={pesan.isi} />}

      <div className="scroll">
        <table>
          <thead>
            <tr>
              <th>No</th><th>NIK</th><th>Nama</th><th>Tempat, Tgl Lahir</th><th>JK</th>
              <th>Pekerjaan</th><th>Topik</th><th>No. HP</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {memuat && (
              <tr><td colSpan="9">Memuat data...</td></tr>
            )}
            {!memuat && members.length === 0 && (
              <tr><td colSpan="9">Belum ada member.</td></tr>
            )}
            {members.map((m, i) => (
              <tr key={m.id}>
                <td>{i + 1}</td>
                <td>{m.nik}</td>
                <td>{m.nama}</td>
                <td>{m.tempatLahir}, {formatTanggal(m.tanggalLahir)}</td>
                <td>{m.jenisKelamin}</td>
                <td>{m.pekerjaan}</td>
                <td>{m.topik}</td>
                <td>{m.noHp}</td>
                <td>
                  <button className="btn" onClick={() => bukaUbah(m)}>Ubah</button>{' '}
                  <button className="btn btn-hapus" onClick={() => hapus(m)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ubah && (
        <div className="panel-ubah">
          <h3 style={{ marginTop: 0 }}>Ubah Data Member</h3>
          <form onSubmit={simpanUbah}>
            <table>
              <tbody>
                <tr><td>Nama</td><td><input type="text" name="nama" value={ubah.nama} onChange={isiUbah} /></td></tr>
                <tr><td>Pekerjaan</td><td><input type="text" name="pekerjaan" value={ubah.pekerjaan} onChange={isiUbah} /></td></tr>
                <tr><td>No. HP</td><td><input type="tel" name="noHp" value={ubah.noHp} onChange={isiUbah} /></td></tr>
                <tr><td>Email</td><td><input type="email" name="email" value={ubah.email} onChange={isiUbah} /></td></tr>
                <tr>
                  <td>Topik</td>
                  <td>
                    <select name="topik" value={ubah.topik} onChange={isiUbah}>
                      {TOPIK.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <input type="submit" value="Simpan Perubahan" />{' '}
                    <input type="button" value="Batal" onClick={() => setUbah(null)} />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      )}

      <p>Ingin bergabung? <Link to="/pendaftaran">Daftar sekarang</Link>.</p>
    </Layout>
  );
}
