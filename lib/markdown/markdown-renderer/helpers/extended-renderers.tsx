import { CodeEditor, CodeEditorProps } from '@syren-dev-tech/confects-editors';
import { Components } from 'react-markdown';
import { HTML_CodeProps } from '@syren-dev-tech/confects/types';
import { getClassName } from '@syren-dev-tech/concauses/props';
import { uniqueKey } from '@syren-dev-tech/concauses/strings';

export const extendedRenderers: Components = {
    code: ({ children, node, className, ...props }: HTML_CodeProps & { node?: unknown }) => {
        const spl = children?.toString().split(/\n/g);
        if (!spl)
            return <code className={getClassName('f-body', className)} />;

        const m = /^\/\/ md-flags: (?<flags>.+)/.exec(spl[0]);
        if (m) {
            const content = spl.slice(1).join('\n')
                .trim();

            const flags = m.groups?.flags?.split(/;/g).map((s) => s.trim());
            if (!flags)
                return null;

            if (flags.includes('editor')) {
                const codeEditorProps: CodeEditorProps = {
                    id: uniqueKey('editor:')
                };

                flags.forEach((flag) => {
                    if (/file=\w+/.exec(flag)) {
                        const [, fileName] = flag.split('=');

                        codeEditorProps.heading = fileName;
                        codeEditorProps.id = `editor:${fileName}`;
                    }
                });

                return <CodeEditor defaultValue={content} className='f-primary' {...codeEditorProps} />;
            }

            return <code className={getClassName('f-body', className)} {...props}>{content}</code>;
        }

        return <code className={getClassName('f-body', className)} {...props}>{children}</code>;
    }
};