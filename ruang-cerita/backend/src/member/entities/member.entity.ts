// Struktur data Member, mengikuti formulir registrasi.html
export class Member {
  id: number; // number
  nik: string; // string (16 digit)
  nama: string; // string
  tempatLahir: string; // string
  tanggalLahir: string; // string tanggal ISO (YYYY-MM-DD)
  jenisKelamin: 'L' | 'P'; // union type
  golonganDarah: string;
  alamat: string;
  rt: string;
  rw: string;
  kelurahan: string;
  kecamatan: string;
  agama: string;
  statusPerkawinan: string;
  pekerjaan: string;
  kewarganegaraan: string;
  noHp: string;
  email: string;
  topik: string; // topik curhat
  cerita?: string; // opsional
  setuju: boolean; // boolean (persetujuan penggunaan data)
  dibuatPada: Date; // Date
}
