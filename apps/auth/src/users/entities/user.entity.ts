import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  email!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string | null;

  @Column({ select: false })
  password!: string;

  @Column({ type: 'varchar', nullable: true, select: false })
  passwordResetToken!: string | null;

  @Column({ nullable: true, type: 'datetime', select: false })
  passwordResetExpiresAt!: Date | null;
}
