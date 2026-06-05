import { getClassName } from '@dead-harbour/shipshape/props';
import { HTML_DivProps } from '@dead-harbour/react-elements/types';
import { renderers } from '../helpers/renderers';
import { uniqueKey } from '@dead-harbour/shipshape/strings';
import { useMarkdownContent } from '../MarkdownContentProvider';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownBodyProps = HTML_DivProps

export function MarkdownBody(
    {
        className
    }: Readonly<MarkdownBodyProps>
) {

    const { showRaw, content } = useMarkdownContent();

    return <div
        className='md-body'
    >
        <div
            className={getClassName('md-content', showRaw && 'raw', className)}
        >
            {
                showRaw
                    ? <div>
                        {content.split(/\n/g).map((line) => {
                            if (!line)
                                return <br key={uniqueKey()} />;

                            return <p
                                key={uniqueKey()}
                            >
                                {line}
                            </p>;
                        })}
                    </div>
                    : <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={renderers}
                    >
                        {content}
                    </Markdown>
            }
        </div>
    </div>;
}