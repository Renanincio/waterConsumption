import { PrismaMeasuresRepository } from "../../repositories/prisma/prisma-measures-repository";
import { listUseCase } from "../list/list";

export function makeListUseCase() {
  const measuresRepository = new PrismaMeasuresRepository();
  const useCase = new listUseCase(measuresRepository);

  return useCase;
}
