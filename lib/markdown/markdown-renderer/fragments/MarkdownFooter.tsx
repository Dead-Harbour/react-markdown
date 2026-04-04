import { HTML_DivProps } from '@syren-dev-tech/confects/types';
import type { MarkdownFeatureFlags } from './MarkdownHeader';

export interface MarkdownFooterProps extends HTML_DivProps {
    features?: MarkdownFeatureFlags
}

export function MarkdownFooter(
    {
        children,
        features,
        ...props
    }: Readonly<MarkdownFooterProps>
) {
    if (features?.bodyOnly)
        return null;

    return <div
        className='md-footer f-secondary'
        {...props}
    >
        {children}
    </div>;
}