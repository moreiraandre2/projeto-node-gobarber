import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository'

import AppError from '../errors/AppError';
/*
* SOLID
* Single Responsability Principle
* Dependency Inversion Principle
*/

interface Request {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService{

  public async execute({ provider_id, date } : Request) : Promise<Appointment>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    )

    if(findAppointmentInSameDate){
      throw new AppError('This Appointment is already booked.');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
