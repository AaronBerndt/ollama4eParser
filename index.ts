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

          let prompt = `
Please parse the following power string into a JSON object. The power string is: ${power}.
`;

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
