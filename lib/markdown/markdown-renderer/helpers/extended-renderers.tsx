import { CodeEditor, CodeEditorProps } from '@dead-harbour/react-editors';
import { Components } from 'react-markdown';
import { HTML_CodeProps } from '@dead-harbour/react-elements/types';
import { getClassName } from '@dead-harbour/shipshape/props';
import { uniqueKey } from '@dead-harbour/shipshape/strings';

export const extendedRenderers: Components = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    code: ({ children, node, className, ...props }: HTML_CodeProps & { node?: unknown }) => {
        if (typeof children !== 'string')
            return <code className={getClassName('f-body', className)} {...props} />;

        const spl = children.toString().split(/\n/g);
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