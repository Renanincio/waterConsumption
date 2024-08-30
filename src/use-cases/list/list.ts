import { Measures } from "@prisma/client";
import { MeasuresRepository } from "./../../repositories/measures-repository";

interface listUseCaseRequest {
  customer_code: string;
  measure_type?: string;
}

type listUseCaseResponse = {
  measures: Measures[];
};

export class ListUseCase {
  constructor(private measuresRepository: MeasuresRepository) {}

  async execute({
    customer_code,
    measure_type,
  }: listUseCaseRequest): Promise<listUseCaseResponse> {
    const measures = await this.measuresRepository.findManyByCodeAndType(
      customer_code,
      measure_type,
    );

    return {
      measures,
    };
  }
}
