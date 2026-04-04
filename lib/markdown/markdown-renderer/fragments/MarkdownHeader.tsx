import { Button } from '@syren-dev-tech/confects/buttons';
import { FileControls } from './header/FileControls';
import { HTML_DivProps } from '@syren-dev-tech/confects/types';
import { useMarkdownContent } from '../MarkdownContentProvider';
import { getClassName } from '@syren-dev-tech/concauses/props';

export interface MarkdownFeatureFlags {
    bodyOnly?: boolean
    download?: boolean
    print?: boolean
    reload?: () => void
    renderToggle?: boolean
}

export interface MarkdownHeaderProps extends HTML_DivProps {
    features: MarkdownFeatureFlags
    reload?: () => Promise<void>
}

export function MarkdownHeader(
    {
        features,
        ...props
    }: Readonly<MarkdownHeaderProps>
) {

    const { setShowRaw } = useMarkdownContent();

    if (features.bodyOnly)
        return null;

    return <div
        className='md-header f-primary'
        {...props}
    >
        {
            features.reload &&
            <Button
                className='f-trinary'
                onClick={features.reload}
            >
                Reload
            </Button>
        }

        {
            features.renderToggle &&
            <div
                className='render-controls'
            >
                <Button
                    onClick={() => setShowRaw(false)}
                    className={getClassName('show-pretty')}
                >
                    Pretty
                </Button>

                <Button
                    onClick={() => setShowRaw(true)}
                    className={getClassName('show-raw')}
                >
                    Raw
                </Button>
            </div>
        }

        <FileControls
            features={features}
        />
    </div>;
}