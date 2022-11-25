import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    delete createEventDto.isDraft;
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(@Query('_limit') _limit, @Query('_page') _page) {
    return this.eventsService.findAll(
      {},
      {
        limit: _limit || 50,
        page: _page || 0,
      },
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
