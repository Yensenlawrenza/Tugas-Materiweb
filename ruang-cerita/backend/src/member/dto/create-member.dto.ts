import {
  Equals,
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export const GOLONGAN_DARAH = ['A', 'B', 'AB', 'O', '-'];
export const AGAMA = [
  'Islam',
  'Kristen',
  'Katolik',
  'Hindu',
  'Buddha',
  'Konghucu',
];
export const STATUS = ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'];
export const TOPIK = [
  'Stres / Kecemasan',
  'Kesedihan / Depresi',
  'Hubungan / Keluarga',
  'Karier / Sekolah',
  'Lainnya',
];

export class CreateMemberDto {
  @IsString()
  @Length(16, 16, { message: 'NIK harus tepat 16 digit' })
  @Matches(/^\d+$/, { message: 'NIK hanya boleh berisi angka' })
  nik: string;

  @IsString()
  @MinLength(3, { message: 'Nama minimal 3 karakter' })
  @MaxLength(100)
  nama: string;

  @IsString()
  @IsNotEmpty({ message: 'Tempat lahir wajib diisi' })
  tempatLahir: string;

  @IsDateString({}, { message: 'Tanggal lahir harus format YYYY-MM-DD' })
  tanggalLahir: string;

  @IsIn(['L', 'P'], { message: 'Jenis kelamin harus L atau P' })
  jenisKelamin: 'L' | 'P';

  @IsIn(GOLONGAN_DARAH, { message: 'Golongan darah tidak valid' })
  golonganDarah: string;

  @IsString()
  @IsNotEmpty({ message: 'Alamat wajib diisi' })
  alamat: string;

  @IsString()
  @Matches(/^\d{1,3}$/, { message: 'RT harus berupa angka' })
  rt: string;

  @IsString()
  @Matches(/^\d{1,3}$/, { message: 'RW harus berupa angka' })
  rw: string;

  @IsString()
  @IsNotEmpty({ message: 'Kelurahan / Desa wajib diisi' })
  kelurahan: string;

  @IsString()
  @IsNotEmpty({ message: 'Kecamatan wajib diisi' })
  kecamatan: string;

  @IsIn(AGAMA, { message: 'Agama tidak valid' })
  agama: string;

  @IsIn(STATUS, { message: 'Status perkawinan tidak valid' })
  statusPerkawinan: string;

  @IsString()
  @IsNotEmpty({ message: 'Pekerjaan wajib diisi' })
  pekerjaan: string;

  @IsString()
  @IsNotEmpty()
  kewarganegaraan: string;

  @Matches(/^08\d{8,11}$/, {
    message: 'No. HP harus diawali 08 dan 10-13 digit',
  })
  noHp: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  email: string;

  @IsIn(TOPIK, { message: 'Topik curhat tidak valid' })
  topik: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Cerita maksimal 500 karakter' })
  cerita?: string;

  @Equals(true, { message: 'Anda harus menyetujui penggunaan data' })
  setuju: boolean;
}
