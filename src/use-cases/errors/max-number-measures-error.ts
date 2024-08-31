export class MaxNumberMeasuresError extends Error {
  constructor() {
    super("Já existe uma leitura para este tipo no mês atual.");
  }
}
