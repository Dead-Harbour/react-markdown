import { HTML_DivProps } from '@dead-harbour/react-elements/types';
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