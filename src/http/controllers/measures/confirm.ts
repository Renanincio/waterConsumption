import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MeasureInTheSameMonthAlreadyExistsError } from "../../../use-cases/errors/measure-in-the-same-month-already-exists-error";
import { makeConfirmUseCase } from "../../../use-cases/factories/make-confirm-use-case";

export async function Confirm(request: FastifyRequest, reply: FastifyReply) {
  const confirmBodySchema = z.object({
    measure_uuid: z.string().uuid(),
    confirmed_value: z.number(),
  });

  const { measure_uuid, confirmed_value } = confirmBodySchema.parse(
    request.body,
  );

  try {
    const confirmUseCase = makeConfirmUseCase();

    await confirmUseCase.execute({
      measure_uuid,
      confirmed_value,
    });
  } catch (err) {
    if (err instanceof MeasureInTheSameMonthAlreadyExistsError) {
      return reply.status(400).send({
        message: "os dados fornecidos no corpo da requisição são inválidos.",
      });
    }

    throw err;
  }

  return reply.status(200).send({
    success: true,
  });
}
