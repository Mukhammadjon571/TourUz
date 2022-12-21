import { PartialType } from "@nestjs/swagger";
import { CreateToursMediaDto } from "./create-tours-media.dto";

export class UpdateTourMediaDTO extends PartialType(CreateToursMediaDto) {}