import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

// Não precisa mais do construct porque criamos uma entidade do typeorm

// class Appointment {
//   id: string;

//   provider: string;

//   date: Date;

//   constructor({ provider, date }: Omit<Appointment, 'id'>) {
//     this.id = uuid();
//     this.provider = provider;
//     this.date = date;
//   }
// }

export default Appointment;
