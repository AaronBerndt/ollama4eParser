import ollama from "ollama";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Power } from "./schema/Power";
import { generateMock } from "@anatine/zod-mock";

const server = Bun.serve({
  routes: {
    "/parsePower": {
      POST: async (req) => {
        try {
          // const body = await req.json();
          // const power = body.power;

          // if (typeof power !== "string") {
          //   return new Response(
          //     JSON.stringify({ error: "power must be a string!" }),
          //     {
          //       status: 400,
          //       headers: { "Content-Type": "application/json" },
          //     },
          //   );
          // }
          //
          // let prompt = `Convert the 4e power HTML ${power} to JSON`;
          //
          // const response = await ollama.chat({
          //   model: "llama3.2",
          //   messages: [{ role: "user", content: prompt }],
          //   format: zodToJsonSchema(Power),
          // });

          return Response.json(generateMock(Power));
        } catch (err) {
          console.log(err);
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
