import { PrismaMeasuresRepository } from "../../repositories/prisma/prisma-measures-repository";
import { ConfirmUseCase } from "../confirm/confirm";

export function makeConfirmUseCase() {
  const measuresRepository = new PrismaMeasuresRepository();
  const useCase = new ConfirmUseCase(measuresRepository);

  return useCase;
}
