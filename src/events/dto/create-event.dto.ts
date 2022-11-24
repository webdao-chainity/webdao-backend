
export class CreateEventDto {
  name: string;
  description: string;
  currency: string;
  totalCap: number;
  minVoter: number;
  maxVoter: number;
  isPublic: boolean;
  feeListing: number;
  voteWeightPerOne: number;
  startTime: Date;
  endTime: Date;

  // @ApiHideProperty()
  isDraft: boolean;

  whitelists: string[];
}
