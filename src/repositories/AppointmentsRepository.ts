import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

// import { isEqual } from 'date-fns';

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

// class AppointmentsRepository {
//   private appointments: Appointment[];

//   constructor() {
//     this.appointments = [];
//   }

//   public findByDate(date: Date): Appointment | null {
//     const findAppointment = this.appointments.find(appointment =>
//       isEqual(date, appointment.date),
//     );

//     return findAppointment || null;
//   }

//   public create({ provider, date }: CreateAppointmentDTO): Appointment {
//     const appointment = new Appointment({ provider, date });

//     this.appointments.push(appointment);

//     return appointment;
//   }
// }

export default AppointmentsRepository;
