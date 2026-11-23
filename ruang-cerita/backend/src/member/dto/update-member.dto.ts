import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';

// Semua field menjadi opsional, aturan validasi tetap berlaku
export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
