import { resolve } from "node:path";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { serwist } from "@serwist/vite";
import { defineConfig } from "vite";

const nitroPublicDir = resolve(import.meta.dirname, ".output/public");

export default defineConfig({
    ssr: {
        noExternal: ["@mui/*"],
    },
    resolve: {
        tsconfigPaths: true,
    },
    plugins: [
        tanstackStart(),
        nitro(),
        react({ compiler: true }),
        serwist({
            swSrc: "src/sw.ts",
            swDest: resolve(nitroPublicDir, "sw.js"),
            globDirectory: nitroPublicDir,
            injectionPoint: "self.__SW_MANIFEST",
            rollupFormat: "iife",
        }),
    ],
});
