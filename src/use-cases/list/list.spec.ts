import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryMeasuresRepository } from "../../repositories/in-memory/in-memory-measures-repository";
import { MeasuresRepository } from "../../repositories/measures-repository";
import { ListUseCase } from "./list";

let measuresRepository: MeasuresRepository;
let sut: ListUseCase;

describe("List Use Case", () => {
  beforeEach(async () => {
    measuresRepository = new InMemoryMeasuresRepository();
    sut = new ListUseCase(measuresRepository);
  });

  it("should return a list of measurements", async () => {
    await measuresRepository.create({
      customerCustomer_code: "Customer-1",
      has_confirmed: false,
      image_url: "",
      measure_datetime: new Date(),
      measure_type: "Water",
      measure_uuid: "measure-1",
      measure_value: 0,
    });

    await measuresRepository.create({
      customerCustomer_code: "Customer-1",
      has_confirmed: false,
      image_url: "",
      measure_datetime: new Date(),
      measure_type: "Gas",
      measure_uuid: "measure-2",
      measure_value: 0,
    });

    const { measures } = await sut.execute({
      customer_code: "Customer-1",
    });

    expect(measures).toHaveLength(1);
    expect(measures).toEqual([
      expect.objectContaining({ customerCustomer_code: "Customer-1" }),
    ]);
  });
});
