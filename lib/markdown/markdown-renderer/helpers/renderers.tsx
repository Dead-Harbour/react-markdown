import { Components } from 'react-markdown';
import { HTML_CodeProps } from '@syren-dev-tech/confects/types';
import { getClassName } from '@syren-dev-tech/concauses/props';
import { application } from './application';

export const renderers: Components = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blockquote: ({ children, node, ...props }) => <blockquote className='f-body' {...props}>{children}</blockquote>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

            return <code className={getClassName('f-body', className)} {...props}>{content}</code>;
        }

        return <code className={getClassName('f-body', className)} {...props}>{children}</code>;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h1: ({ children, node, ...props }) => <h1 {...props} id={(children ?? '').toString().toLowerCase()
        .replaceAll(/\s/g, '-')} className='heading'>{children}</h1>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h2: ({ children, node, ...props }) => <h2 {...props} id={(children ?? '').toString().toLowerCase()
        .replaceAll(/\s/g, '-')} className='heading'>{children}</h2>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h3: ({ children, node, ...props }) => <h3 {...props} id={(children ?? '').toString().toLowerCase()
        .replaceAll(/\s/g, '-')} className='heading'>{children}</h3>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h4: ({ children, node, ...props }) => <h4 {...props} id={(children ?? '').toString().toLowerCase()
        .replaceAll(/\s/g, '-')} className='heading'>{children}</h4>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h5: ({ children, node, ...props }) => <h5 {...props} id={(children ?? '').toString().toLowerCase()
        .replaceAll(/\s/g, '-')} className='heading'>{children}</h5>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h6: ({ children, node, ...props }) => <h6 {...props} id={(children ?? '').toString().toLowerCase()
        .replaceAll(/\s/g, '-')} className='heading'>{children}</h6>,
    p: (props) => application<HTMLParagraphElement>(props)
};