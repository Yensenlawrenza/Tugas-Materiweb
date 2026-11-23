// Alamat backend NestJS. Bisa diganti lewat file .env (VITE_API_URL)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // NestJS mengirim `message` berupa string atau array (hasil validasi)
    const err = new Error('Request gagal');
    err.messages = [].concat(data.message || 'Terjadi kesalahan pada server');
    err.status = res.status;
    throw err;
  }
  return data;
}

export const getMembers = () => request('/member');
export const createMember = (body) =>
  request('/member', { method: 'POST', body: JSON.stringify(body) });
export const updateMember = (id, body) =>
  request(`/member/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
export const deleteMember = (id) => request(`/member/${id}`, { method: 'DELETE' });

// Ubah error apa pun menjadi daftar pesan yang siap ditampilkan
export function pesanError(err) {
  if (err && err.messages) return err.messages;
  return ['Tidak dapat terhubung ke server. Pastikan backend NestJS sudah berjalan (npm run start:dev).'];
}
