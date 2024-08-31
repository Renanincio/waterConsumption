import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryMeasuresRepository } from "../../repositories/in-memory/in-memory-measures-repository";
import { MeasuresRepository } from "../../repositories/measures-repository";
import { ConfirmUseCase } from "./confirm";

let measuresRepository: MeasuresRepository;
let sut: ConfirmUseCase;

describe("confirm Use Case", () => {
  beforeEach(async () => {
    measuresRepository = new InMemoryMeasuresRepository();
    sut = new ConfirmUseCase(measuresRepository);
  });

  it("should return a unique measure", async () => {
    const createdMeasure = await measuresRepository.create({
      customerCustomer_code: "Customer-1",
      has_confirmed: false,
      image_url: "",
      measure_datetime: new Date(),
      measure_type: "Water",
      measure_uuid: "measure-1",
      measure_value: 0,
    });

    const { measure } = await sut.execute({
      measure_uuid: createdMeasure.measure_uuid,
      confirmed_value: 0,
    });

    expect(measure.measure_value).toEqual(expect.any(Number));
    expect(measure.measure_uuid).toEqual(createdMeasure.measure_uuid);
  });
});
