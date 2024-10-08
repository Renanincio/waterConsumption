import { PrismaMeasuresRepository } from "../../repositories/prisma/prisma-measures-repository";
import { ListUseCase } from "../list/list";

export function makeListUseCase() {
  const measuresRepository = new PrismaMeasuresRepository();
  const useCase = new ListUseCase(measuresRepository);

  return useCase;
}
