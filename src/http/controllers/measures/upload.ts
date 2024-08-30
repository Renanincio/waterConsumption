import { MeasureInTheSameMonthAlreadyExistsError } from "./../../../use-cases/errors/measure-in-the-same-month-already-exists-error";

import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Base64 } from "js-base64";

export async function Upload(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    image: z.string().refine(Base64.isValid),
    customer_code: z.string(),
    measure_datetime: z.date(),
    measure_type: z.string(),
    has_confirmed: z.boolean().optional().default(false),
    measure_uuid: z.string().optional().default(""),
    measure_value: z.number().optional().default(0),
  });

  const {
    image,
    customer_code,
    measure_datetime,
    measure_type,
    has_confirmed,
    measure_uuid,
    measure_value,
  } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      image_url: image,
      customer_code,
      measure_datetime,
      measure_type,
      has_confirmed,
      measure_uuid,
      measure_value,
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
    image_url: image,
    measure_value,
    measure_uuid,
  });
}
