import { RegisterUseCase } from "../register/register";
import { PrismaMeasuresRepository } from "../../repositories/prisma/prisma-measures-repository";

export function makeRegisterUseCase() {
  const measuresRepository = new PrismaMeasuresRepository();
  const registerUseCase = new RegisterUseCase(measuresRepository);

  return registerUseCase;
}
