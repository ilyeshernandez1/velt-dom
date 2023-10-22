import {defineConfig} from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    watch: true,
    sourcemap: true,
    dts: true
})