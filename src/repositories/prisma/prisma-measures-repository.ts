import { Measures } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { MeasuresRepository } from "../measures-repository";
import dayjs from "dayjs";

export class PrismaMeasuresRepository implements MeasuresRepository {
  async create(data: Measures) {
    const user = await prisma.measures.create({
      data,
    });

    return user;
  }

  async findManyByCodeAndType(
    customer_code: string,
    measure_type: string | undefined,
  ) {
    if (measure_type) {
      const measures = await prisma.measures.findMany({
        where: {
          customerCustomer_code: customer_code,
          measure_type,
        },
      });

      return measures;
    }
    const measures = await prisma.measures.findMany({
      where: {
        customerCustomer_code: customer_code,
      },
    });

    return measures;
  }

  async findMeasureInTheSameMonth(measureDate: Date, measureType: string) {
    const startOfTheMonth = dayjs(measureDate).startOf("month");

    const measure = await prisma.measures.findFirst({
      where: {
        measure_type: measureType,
        measure_datetime: {
          gte: startOfTheMonth.toDate(),
          lte: measureDate,
        },
      },
    });

    return measure;
  }
}
