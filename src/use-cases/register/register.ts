import { Measures } from "@prisma/client";
import { MeasuresRepository } from "../../repositories/measures-repository";
import { MeasureInTheSameMonthAlreadyExistsError } from "../errors/measure-in-the-same-month-already-exists-error";

interface RegisterUseCaseRequest {
  measure_uuid: string;
  image_url: string;
  measure_value: number;
  measure_datetime: Date;
  has_confirmed: boolean;
  measure_type: string;
  customer_code: string;
}

interface RegisterUseCaseResponse {
  measure: Measures;
}

export class RegisterUseCase {
  constructor(private measuresRepository: MeasuresRepository) {}

  async execute({
    has_confirmed,
    measure_uuid,
    measure_value,
    image_url,
    measure_datetime,
    measure_type,
    customer_code,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const measureInTheSameMonth =
      await this.measuresRepository.findMeasureInTheSameMonth(
        measure_datetime,
        measure_type,
      );

    if (measureInTheSameMonth) {
      throw new MeasureInTheSameMonthAlreadyExistsError();
    }

    const measure = await this.measuresRepository.create({
      image_url,
      measure_value,
      measure_datetime,
      measure_type,
      has_confirmed,
      measure_uuid,
      customerCustomer_code: customer_code,
    });

    return {
      measure,
    };
  }
}
