import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  currency: string;

  @Prop()
  totalCap: number;

  @Prop()
  minVoter: number;

  @Prop()
  maxVoter: number;

  @Prop({ required: true, default: false })
  isPublic: boolean;

  @Prop()
  feeListing: number;

  @Prop()
  voteWeightPerOne: number;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop({ required: true, default: true })
  isDraft: boolean;

  @Prop([String])
  whitelists: string[];

  @Prop()
  contract: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
