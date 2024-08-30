// import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListUseCase } from "../../../use-cases/factories/make-fetch-list-use-case";

export async function List(request: FastifyRequest, reply: FastifyReply) {
  const listQuerySchema = z.object({
    measure_type: z.coerce.string().optional(),
    customer_code: z.string().uuid(),
  });

  const { measure_type, customer_code } = listQuerySchema.parse(request.query);

  const fetchListUseCase = makeListUseCase();

  if (measure_type) {
    const { measures } = await fetchListUseCase.execute({
      customer_code,
      measure_type,
    });

    return reply.status(200).send({
      measures,
    });
  }

  const { measures } = await fetchListUseCase.execute({
    customer_code,
  });

  return reply.status(200).send({
    customer_code,
    measures: [measures],
  });
}
