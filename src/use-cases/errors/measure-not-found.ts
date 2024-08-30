export class MeasureNotFound extends Error {
  constructor() {
    super("o código informado não pertence a nenhuma leitura.");
  }
}
