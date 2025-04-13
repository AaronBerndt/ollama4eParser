import ollama from "ollama";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Power } from "./schema/Power";

const server = Bun.serve({
  routes: {
    "/parsePower": {
      POST: async (req) => {
        try {
          const body = await req.json();
          const power = body.power;

          if (typeof power !== "string") {
            return new Response(
              JSON.stringify({ error: "power must be a string!" }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          let prompt = `Parse the following D&D 4e power \n\n${power} into JSON based on the schema`;

          const response = await ollama.generate({
            model: "4eParser",
            prompt,
            format: zodToJsonSchema(Power),
          });

          return Response.json(JSON.parse(response.response));
        } catch (err) {
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
