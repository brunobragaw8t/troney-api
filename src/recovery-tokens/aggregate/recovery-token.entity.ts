import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'recovery_tokens' })
export class RecoveryToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false, unique: true })
  userId: string;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
