import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './User.entity';

@Entity()
export class SessionEntity extends BaseEntity {

  constructor(data: Partial<SessionEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  device: string;

  @Column()
  ip: string;

  @Column()
  active: boolean;

  @UpdateDateColumn()
  update: Date;

  @CreateDateColumn()
  create: Date;

  @Column()
  refreshToken: string;

  @ManyToOne(type => UserEntity)
  user: UserEntity;
}
