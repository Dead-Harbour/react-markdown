import { ContentBlock } from '@dead-harbour/react-elements/containers';
import { ContentLayoutSchema } from '../types';
import type { HTMLElementProps } from '@dead-harbour/react-elements/types';
import { uniqueKey } from '@dead-harbour/shipshape/strings';
import { BlockContent } from './BlockContent';

interface SchemaRendererProps extends HTMLElementProps {
    schema: ContentLayoutSchema
}

export function SchemaRenderer(
    {
        schema
    }: Readonly<SchemaRendererProps>
) {
    return <>
        {
            schema.title &&
            <title>
                {schema.title}
            </title>
        }

        {
            schema.layout.map((blockSchema, bS) => {
                console.log('block content', bS, blockSchema);

                return <ContentBlock
                    key={uniqueKey()}
                >
                    {
                        blockSchema.content.map((blockContent) => {
                            return <BlockContent
                                key={uniqueKey()}
                                blockContent={blockContent}
                            />;
                        })
                    }
                </ContentBlock>;
            })
        }
    </>;
}
