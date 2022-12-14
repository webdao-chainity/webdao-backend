import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EventDocument } from '../../schemas/events.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  create(createEventDto: CreateEventDto) {
    return this.eventModel.create(createEventDto);
  }

  findAll(query: any, { limit, page }) {
    return this.eventModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(page * limit);
  }

  findOne(id: string) {
    return this.eventModel.findOne({ _id: id });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventModel.findOneAndUpdate(
      {
        _id: id,
      },
      updateEventDto,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
