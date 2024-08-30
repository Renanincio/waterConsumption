export class MeasureInTheSameMonthAlreadyExistsError extends Error {
  constructor() {
    super("Já existe uma leitura para este tipo no mês atual.");
  }
}
