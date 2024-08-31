import { afterEach } from "node:test";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryMeasuresRepository } from "../../repositories/in-memory/in-memory-measures-repository";
import { MaxNumberMeasuresError } from "../errors/max-number-measures-error";
import { RegisterUseCase } from "./register";

let measuresRepository: InMemoryMeasuresRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(async () => {
    measuresRepository = new InMemoryMeasuresRepository();
    sut = new RegisterUseCase(measuresRepository);

    await measuresRepository.create({
      customerCustomer_code: "Customer-1",
      has_confirmed: false,
      image_url: "",
      measure_datetime: new Date(),
      measure_type: "Water",
      measure_uuid: "measure-1",
      measure_value: 0,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
it("should not be able to read measure twice in the same month", async () => {
  vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

  await sut.execute({
    customer_code: "Customer-1",
    has_confirmed: false,
    image_url: "",
    measure_datetime: new Date(),
    measure_type: "Water",
    measure_uuid: "measure-1",
    measure_value: 0,
  });

  await expect(() =>
    sut.execute({
      customer_code: "Customer-1",
      has_confirmed: false,
      image_url: "",
      measure_datetime: new Date(),
      measure_type: "Water",
      measure_uuid: "measure-2",
      measure_value: 0,
    }),
  ).rejects.toBeInstanceOf(MaxNumberMeasuresError);
});
