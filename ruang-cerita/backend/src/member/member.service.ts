import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  // Penyimpanan sementara di memori. Data awal sama dengan tabel di member.html
  private members: Member[] = [
    this.seed(1, '3201010101010001', 'Yensen', 'Medan', '2006-11-14', 'P', 'Mahasiswa', 'Stres / Kecemasan', '081234567801'),
    this.seed(2, '3201010101010002', 'Naia', 'Purbalingga', '2006-07-06', 'L', 'Karyawan', 'Karier / Sekolah', '081234567802'),
    this.seed(3, '3201010101010003', 'Cia', 'Jakarta', '2005-04-21', 'P', 'Guru', 'Hubungan / Keluarga', '081234567803'),
    this.seed(4, '3201010101010004', 'Pak Amruh', 'Surabaya', '1987-01-30', 'L', 'Dosen', 'Kesedihan / Depresi', '081234567804'),
    this.seed(5, '3201010101010005', 'Pak Abed', 'Kalimantan', '1995-08-17', 'P', 'Dosen', 'Lainnya', '081234567805'),
  ];
  private nextId = 6;

  private seed(
    id: number, nik: string, nama: string, tempatLahir: string,
    tanggalLahir: string, jenisKelamin: 'L' | 'P', pekerjaan: string,
    topik: string, noHp: string,
  ): Member {
    return {
      id, nik, nama, tempatLahir, tanggalLahir, jenisKelamin,
      golonganDarah: '-', alamat: '-', rt: '0', rw: '0', kelurahan: '-',
      kecamatan: '-', agama: 'Islam', statusPerkawinan: 'Belum Kawin',
      pekerjaan, kewarganegaraan: 'WNI', noHp,
      email: `${nama.toLowerCase().replace(/\s/g, '')}@mail.com`,
      topik, setuju: true, dibuatPada: new Date(),
    };
  }

  create(dto: CreateMemberDto): Member {
    // Skenario error 1: NIK sudah terdaftar -> 409 Conflict
    if (this.members.some((m) => m.nik === dto.nik)) {
      throw new ConflictException(`NIK ${dto.nik} sudah terdaftar sebagai member`);
    }
    const baru: Member = { id: this.nextId++, ...dto, dibuatPada: new Date() };
    this.members.push(baru);
    return baru;
  }

  findAll(): Member[] {
    return this.members;
  }

  findOne(id: number): Member {
    const member = this.members.find((m) => m.id === id);
    // Skenario error 2: member tidak ditemukan -> 404 Not Found
    if (!member) {
      throw new NotFoundException(`Member dengan id ${id} tidak ditemukan`);
    }
    return member;
  }

  update(id: number, dto: UpdateMemberDto): Member {
    const member = this.findOne(id);
    // Jika NIK diubah, pastikan tidak bentrok dengan member lain
    if (dto.nik && this.members.some((m) => m.nik === dto.nik && m.id !== id)) {
      throw new ConflictException(`NIK ${dto.nik} sudah dipakai member lain`);
    }
    Object.assign(member, dto);
    return member;
  }

  remove(id: number): { message: string } {
    const member = this.findOne(id);
    this.members = this.members.filter((m) => m.id !== member.id);
    return { message: `Member ${member.nama} berhasil dihapus` };
  }
}
