import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false, unique: true })
  userId: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('numeric', { precision: 20, scale: 2, nullable: false })
  balance: number;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
