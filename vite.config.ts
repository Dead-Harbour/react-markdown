import { defineConfig, loadEnv, UserConfig } from 'vite';
import { resolve } from 'node:path';
import { viteConfigAliases } from '@syren-dev-tech/confetti/config';
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
                external: ['react', 'react-dom'],
                output: {
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM'
                    },
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