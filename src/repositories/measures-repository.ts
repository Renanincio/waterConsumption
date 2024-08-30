import { Measures } from "@prisma/client";

export interface MeasuresRepository {
  create(data: Measures): Promise<Measures>;
  findById(measure_uuid: string): Promise<Measures | null>;
  findManyByCodeAndType(
    customer_code: string,
    measure_type: string | undefined,
  ): Promise<Measures[]>;
  findMeasureInTheSameMonth(
    measureDate: Date,
    measureType: string,
  ): Promise<Measures | null>;
}
