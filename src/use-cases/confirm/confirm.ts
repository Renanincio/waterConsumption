import { Measures } from "@prisma/client";
import { MeasuresRepository } from "../../repositories/measures-repository";
import { MeasureNotFound } from "../errors/measure-not-found";

interface ConfirmUseCaseRequest {
  measure_uuid: string;
  confirmed_value: number;
}

type ConfirmUseCaseResponse = {
  measure: Measures;
};

export class ConfirmUseCase {
  constructor(private measuresRepository: MeasuresRepository) {}

  async execute({
    measure_uuid,
    confirmed_value,
  }: ConfirmUseCaseRequest): Promise<ConfirmUseCaseResponse> {
    const measure = await this.measuresRepository.findById(measure_uuid);

    if (!measure) {
      throw new MeasureNotFound();
    }

    measure.measure_value = confirmed_value;

    return {
      measure,
    };
  }
}
