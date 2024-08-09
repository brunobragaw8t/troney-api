import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'activation_tokens' })
export class ActivationToken {
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
