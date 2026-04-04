import { Content } from '@syren-dev-tech/confects/containers';
import { ContentSchema, isContentImageSchema, isContentMarkdownSchema } from '../types';
import type { HTMLElementProps } from '@syren-dev-tech/confects/types';
import { MarkdownRenderer } from '../../markdown-renderer/MarkdownRenderer';

interface RenderContentProps extends HTMLElementProps {
    schema: ContentSchema
}

export function RenderContent(
    {
        schema
    }: Readonly<RenderContentProps>
) {

    const { content } = schema;

    if (!content) {
        console.warn(schema);

        return <div>UNDEFINED</div>;
    }

    if (isContentMarkdownSchema(content)) {
        return <Content>
            <MarkdownRenderer
                href={content.href}
                features={
                    {
                        bodyOnly: true
                    }
                }
            />
        </Content>;
    }

    if (isContentImageSchema(content)) {
        return <Content>
            <figure>
                <img
                    alt='content-img'
                    src={content.image.src}
                />

                {
                    content.caption &&
                    <figcaption>
                        {content.caption}
                    </figcaption>
                }
            </figure>
        </Content>;
    }

    return <Content>
        {content.text}
    </Content>;
}