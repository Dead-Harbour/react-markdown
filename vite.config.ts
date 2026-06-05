import { defineConfig, loadEnv, UserConfig } from 'vite';
import { resolve } from 'node:path';
import { viteConfigAliases } from '@dead-harbour/scss-rigging/config';
import react from '@vitejs/plugin-react';

const vite = ({ mode }: UserConfig) => {
    process.env = mode && {
        ...process.env,
        ...loadEnv(mode, process.cwd())
    } || process.env;

    const { DEV } = process.env;
    const USE_DEV = !!DEV;

    return defineConfig({
        build: {
            copyPublicDir: false,
            emptyOutDir: false,
            lib: {
                entry: resolve('./lib/markdown.ts'),
                formats: ['es'],
                name: 'confects-md'
            },
            minify: !USE_DEV,
            rolldownOptions: {
                external: (id) => id.startsWith('@dead-harbour/') || [
                    'react',
                    'react-dom',
                    'react-router-dom'
                ].includes(id),
                output: {
                    minify: {
                        compress: {
                            dropConsole: !USE_DEV,
                            dropDebugger: !USE_DEV
                        }
                    }
                }
            }
        },
        plugins: [react()],
        resolve: {
            alias: {
                ...viteConfigAliases()
            }
        },
        server: {
            port: 3000
        }
    });
};
export default vite;