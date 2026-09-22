import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

/**
 * Roda a Vercel Function `api/chat.ts` dentro do dev server do Vite, para que
 * `npm run dev` sirva o endpoint `/api/*` sem precisar do `vercel dev`.
 * Em produção quem serve é a function real da Vercel — este plugin só roda em `serve`.
 */
function devApi(): Plugin {
  return {
    name: "dev-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);

        const headers = new Headers();
        for (const [key, value] of Object.entries(req.headers)) {
          if (Array.isArray(value)) value.forEach((v) => headers.append(key, v));
          else if (value != null) headers.set(key, value);
        }

        const method = req.method ?? "GET";
        const hasBody = method !== "GET" && method !== "HEAD" && chunks.length > 0;
        const request = new Request(`http://localhost${req.url}`, {
          method,
          headers,
          body: hasBody ? Buffer.concat(chunks) : undefined,
        });

        try {
          const mod = await server.ssrLoadModule("/api/chat.ts");
          const handler = (mod as Record<string, unknown>)[method] ?? mod.default;

          if (typeof handler !== "function") {
            res.statusCode = 405;
            res.end(JSON.stringify({ error: "method_not_allowed" }));
            return;
          }

          const response: Response = await handler(request);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (error) {
          console.error("[dev-api]", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "dev_handler_failed" }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Expõe as vars de .env / .env.local (sem prefixo) para a function em dev.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [react(), tailwindcss(), devApi()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  };
});
