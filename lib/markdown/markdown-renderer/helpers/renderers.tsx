import { Components } from 'react-markdown';
import { HTML_CodeProps } from '@dead-harbour/react-elements/types';
import { getClassName } from '@dead-harbour/shipshape/props';
import { application } from './application';
import { uniqueKey } from '@dead-harbour/shipshape/strings';

function getIdFromChildren(children: unknown): string {
    if (typeof children === 'string')
        return children;

    return uniqueKey('heading:');
}

export const renderers: Components = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blockquote: ({ children, node, ...props }) => <blockquote className='f-body' {...props}>{children}</blockquote>,
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

            return <code className={getClassName('f-body', className)} {...props}>{content}</code>;
        }

        return <code className={getClassName('f-body', className)} {...props}>{children}</code>;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h1: ({ children, node, ...props }) => <h1 {...props} id={getIdFromChildren(children)} className='heading'>{children}</h1>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h2: ({ children, node, ...props }) => <h2 {...props} id={getIdFromChildren(children)} className='heading'>{children}</h2>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h3: ({ children, node, ...props }) => <h3 {...props} id={getIdFromChildren(children)} className='heading'>{children}</h3>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h4: ({ children, node, ...props }) => <h4 {...props} id={getIdFromChildren(children)} className='heading'>{children}</h4>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h5: ({ children, node, ...props }) => <h5 {...props} id={getIdFromChildren(children)} className='heading'>{children}</h5>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h6: ({ children, node, ...props }) => <h6 {...props} id={getIdFromChildren(children)} className='heading'>{children}</h6>,
    p: (props) => application<HTMLParagraphElement>(props)
};