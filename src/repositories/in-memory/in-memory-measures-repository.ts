import { Measures } from "@prisma/client";
import { randomUUID } from "crypto";
import { MeasuresRepository } from "../measures-repository";
import { ImageReader } from "../../lib/gemini";
import dayjs from "dayjs";

export class InMemoryMeasuresRepository implements MeasuresRepository {
  public items: Measures[] = [];

  async findMeasureInTheSameMonth(
    measureDate: Date,
    measureType: string,
    customer_code: string,
  ) {
    const startOfTheMonth = dayjs(measureDate).startOf("month");

    const measureOnSameMonth = this.items.find((measure) => {
      const measureMonth = dayjs(measure.measure_datetime);
      const isOnSameMonth =
        measureMonth.isAfter(startOfTheMonth) &&
        measureMonth.isBefore(measureDate);

      return (
        measure.measure_type === measureType,
        measure.customerCustomer_code === customer_code && isOnSameMonth
      );
    });

    if (!measureOnSameMonth) {
      return null;
    }

    return measureOnSameMonth;
  }

  async findManyByCodeAndType(
    customer_code: string,
    measure_type: string | undefined,
  ) {
    if (measure_type) {
      return this.items.filter(
        (item) =>
          item.customerCustomer_code === customer_code &&
          item.measure_type === measure_type,
      );
    }

    return this.items.filter(
      (item) => item.customerCustomer_code === customer_code,
    );
  }

  async create(data: Measures) {
    const measureValue = await ImageReader(data.image_url);

    const measure = {
      measure_uuid: randomUUID(),
      measure_datetime: new Date(),
      measure_type: data.measure_type,
      measure_value: measureValue,
      has_confirmed: data.has_confirmed,
      image_url: data.image_url,
      customerCustomer_code: data.customerCustomer_code,
    };

    this.items.push(measure);

    return measure;
  }

  async findById(measure_uuid: string) {
    const measure = this.items.find(
      (item) => item.measure_uuid === measure_uuid,
    );

    if (!measure) {
      return null;
    }

    return measure;
  }
}
