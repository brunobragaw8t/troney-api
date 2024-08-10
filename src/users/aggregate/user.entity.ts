import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, unique: true })
  email: string;

  @Column('varchar', { nullable: false })
  password: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', { nullable: true, default: null })
  activatedAt: Date | null;
}
