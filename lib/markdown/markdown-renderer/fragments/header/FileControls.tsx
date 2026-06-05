import { downloadContent, openInNewTab } from '@dead-harbour/react-elements/helpers';
import { Glyph } from '@dead-harbour/react-elements/buttons';
import { HTML_DivProps } from '@dead-harbour/react-elements/types';
import { MarkdownFeatureFlags } from '../MarkdownHeader';
import { useMarkdownContent } from '../../MarkdownContentProvider';

interface FileControlsProps extends HTML_DivProps {
    features: MarkdownFeatureFlags
}

export function FileControls(
    {
        features,
        ...props
    }: Readonly<FileControlsProps>
) {

    const { content } = useMarkdownContent();

    if (!content || !(features.print || features.download))
        return null;

    return <div
        className='file-controls'
        {...props}
    >
        {
            features.print &&
            <Glyph
                className='f-trinary'
                icon='printer'
                onClick={() => openInNewTab(content)}
                title='Open in new tab'
            />
        }

        {
            features.download &&
            <Glyph
                className='f-trinary'
                icon='download'
                onClick={() => downloadContent(content)}
                title='Download as text file'
            />
        }
    </div>;
}