import type { HTMLElementProps } from '@syren-dev-tech/confects/types';
import { HeadingNode } from './HeadingNode';

interface TOCItemProps extends HTMLElementProps {
    heading: HeadingNode
}

export function TOCItem(
    {
        heading
    }: Readonly<TOCItemProps>
) {
    if (!heading.id) {
        return <ul
            className='toc-list root'
        >
            {
                heading.next.map((next) => {
                    return <TOCItem
                        key={next.id}
                        heading={next}
                    />;
                })
            }
        </ul>;
    }

    return <li
        className='toc-item'
    >
        <a
            href={`#${heading.id}`}
        >
            {heading.id.replaceAll('-', ' ')}
        </a>

        {
            heading.next.length > 0 &&
            <ul
                className='toc-list'
            >
                {
                    heading.next.map((next) => {
                        return <TOCItem
                            key={next.id}
                            heading={next}
                        />;
                    })
                }
            </ul>
        }
    </li>;
}