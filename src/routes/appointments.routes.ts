import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (_, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

// O path é / porque em index.ts eu chamo o recurso appointments
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  // const appointmentDate = startOfHour(parsedDate); // Vai para service porque faz parte da regra de negócio
  // const findAppointmentInSameDate = appointments.find(appointment =>
  //   isEqual(parsedDate, appointment.date),
  // );

  // if (findAppointmentInSameDate) {
  //   return response
  //     .status(400)
  //     .json({ message: 'This appointment is already booked' });
  // }

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
