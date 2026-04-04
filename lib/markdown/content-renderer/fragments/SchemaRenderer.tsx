import { ContentBlock } from '@syren-dev-tech/confects/containers';
import { ContentLayoutSchema } from '../types';
import type { HTMLElementProps } from '@syren-dev-tech/confects/types';
import { uniqueKey } from '@syren-dev-tech/concauses/strings';
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
