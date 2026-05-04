import { CreateDateColumn, PrimaryColumn } from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id!: string;

  @CreateDateColumn()
  createDate!: Date;

  @CreateDateColumn()
  updateDate!: Date;
}
