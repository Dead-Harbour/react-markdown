import { Button } from '@dead-harbour/react-elements/buttons';
import { ContentLayoutSchema } from './types';
import { getClassName } from '@dead-harbour/shipshape/props';
import { SchemaRenderer } from './fragments/SchemaRenderer';
import { useEffect, useRef, useState } from 'react';
import type { HTML_DivProps } from '@dead-harbour/react-elements/types';

export interface ContentRendererProps extends HTML_DivProps {
    defaultContent?: ContentLayoutSchema
    href: string
}

export function ContentRenderer(
    {
        className,
        defaultContent,
        href,
        ...props
    }: Readonly<ContentRendererProps>
) {
    const [content, setContent] = useState(defaultContent);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('FETCH:', href);

        const controller = new AbortController();

        fetch(href, { signal: controller.signal })
            .then((resp) => resp.json() as Promise<ContentLayoutSchema>)
            .then((data) => setContent(data))
            .catch(console.error);

        return () => controller.abort();
    }, [href]);

    if (!content) {
        return <div>
            Fetching content...
        </div>;
    }

    return <div
        className={getClassName('content-renderer', className)}
        ref={ref}
        {...props}
    >
        <Button
            onClick={
                () => {
                    if (!ref.current)
                        return;

                    const printWindow = window.open('', 'print_window');

                    if (!printWindow)
                        return;

                    const elementHtml = ref.current.outerHTML;
                    const printDocument = printWindow.document;

                    printDocument.title = 'Print';

                    const styleElement = printDocument.createElement('style');
                    styleElement.textContent = 'body { font-family: Arial, sans-serif; }';

                    printDocument.head.innerHTML = '';
                    printDocument.head.appendChild(styleElement);
                    printDocument.body.innerHTML = elementHtml;

                    setTimeout(() => {
                        printWindow.print();
                    }, 0);
                }
            }
        >
            Print
        </Button>

        <SchemaRenderer
            schema={content}
        />
    </div>;
}
