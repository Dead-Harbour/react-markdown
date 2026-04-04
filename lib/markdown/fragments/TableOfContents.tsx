import './styles/toc.scss';
import { HeadingNode } from './HeadingNode';
import { TOCItem } from './TOCItem';
import { useEffect, useMemo, useRef } from 'react';

const MAX_CLIMB_ATTEMPTS = 20;

function getHeadingLevel(tag: string) {
    const nChar = tag.codePointAt(1);
    const n = Number(nChar);
    if (Number.isNaN(n))
        return 1;
    return n;
}

export function TableOfContents() {

    const ref = useRef<HTMLSpanElement>(null);
    const [root] = useMemo(() => [new HeadingNode('', 0)], []);

    useEffect(() => {
        if (!ref.current)
            return;

        let attempts = 0;
        let mdParent = ref.current.parentElement;
        while (mdParent && !mdParent.classList.contains('markdown-renderer') && attempts < MAX_CLIMB_ATTEMPTS) {
            mdParent = mdParent.parentElement;
            attempts++;
        }

        if (!mdParent?.classList.contains('markdown-renderer'))
            return;

        root.clear();

        const all = mdParent.querySelectorAll('*');

        let pointer: HeadingNode;
        all.forEach((element) => {
            if (element instanceof HTMLHeadingElement) {
                const tier = getHeadingLevel(element.tagName);
                if (!tier)
                    return;

                const heading = new HeadingNode(element.id, tier);

                if (!pointer) {
                    pointer = root.addNext(heading);

                    return;
                }

                if (tier === pointer.tier)
                    pointer = pointer.parent().addNext(heading);

                else if (tier > pointer.tier)
                    pointer = pointer.addNext(heading);

                else {
                    let parent = pointer.parent();

                    while (parent && parent.tier !== tier - 1)
                        parent = parent.parent();

                    pointer = parent.addNext(heading);
                }
            }
        });
    }, [ref]);

    return <span
        ref={ref}
        className='toc'
    >
        <TOCItem heading={root} />
    </span>;
}