import './styles/markdown-renderer.scss';
import { HTML_DivProps } from '@syren-dev-tech/confects/types';
import { Loading } from '@syren-dev-tech/confects/decorations';
import { MarkdownBody } from './fragments/MarkdownBody';
import { MarkdownFeatureFlags, MarkdownHeader } from './fragments/MarkdownHeader';
import { MarkdownFooter } from './fragments/MarkdownFooter';
import { useEffect } from 'react';
import { getClassName } from '@syren-dev-tech/concauses/props';
import { useMarkdownContent } from './MarkdownContentProvider';

export interface MarkdownRendererProps extends HTML_DivProps {
    features?: MarkdownFeatureFlags
    href?: string
}

export function MarkdownRenderer(
    {
        className,
        features = {},
        href,
        ...props
    }: Readonly<MarkdownRendererProps>
) {

    const { content, setContent } = useMarkdownContent();

    useEffect(() => {
        if (!href)
            return;

        (async () => {
            try {
                const response = await fetch(href);
                const text = await response.text();
                setContent(text);
            }
            catch (err) {
                console.error(err);
            }
        })();
    }, [href]);

    if (!content) {
        return <Loading>
            Fetching content...
        </Loading>;
    }

    return <div
        className={getClassName('markdown-renderer', className)}
        {...props}
    >
        <MarkdownHeader
            features={features}
        />

        <MarkdownBody />

        <MarkdownFooter
            features={features}
        />
    </div>;
}