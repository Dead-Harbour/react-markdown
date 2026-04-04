import { ContentDivider, ContentGroup, ContentList, ContentListItem, ContentTileGroup, ContentTileGroupProps, ContentTileProps } from '@syren-dev-tech/confects/containers';
import { BlockContentType, isContentGroupSchema, isContentListSchema, isContentTileGroupSchema } from '../types';
import { RenderContent } from './RenderContent';
import type { HTMLElementProps } from '@syren-dev-tech/confects/types';
import { uniqueKey } from '@syren-dev-tech/concauses/strings';

interface BlockContentProps extends HTMLElementProps {
    blockContent: BlockContentType
}

export function BlockContent(
    {
        blockContent
    }: Readonly<BlockContentProps>) {

    if (blockContent === null) {
        return <ContentDivider
            key={uniqueKey()}
        />;
    }

    if (isContentTileGroupSchema(blockContent)) {
        console.log('tile group', blockContent.tiles.content);

        return <ContentTileGroup
            key={uniqueKey()}
            tiles={blockContent.tiles.content as ContentTileProps[]}
            {...blockContent.tiles.options as ContentTileGroupProps | undefined}
        />;
    }

    if (isContentGroupSchema(blockContent)) {
        console.log('is group');

        return <ContentGroup
            key={uniqueKey()}
        >
            {
                blockContent.group.map((groupContent, gC) => {
                    console.log('group', gC, groupContent);

                    return <RenderContent
                        key={uniqueKey()}
                        schema={groupContent}
                    />;
                })
            }
        </ContentGroup>;
    }

    if (isContentListSchema(blockContent)) {
        console.log('list');

        return <ContentList
            key={uniqueKey()}
        >
            {
                blockContent.list.map((listContent, lC) => {
                    console.log('list', lC, listContent);

                    return <ContentListItem
                        key={uniqueKey()}
                    >
                        {
                            listContent.content.map((listContentItem, lCI) => {
                                console.log('list item', lCI, listContent);

                                return <RenderContent
                                    key={uniqueKey()}
                                    schema={listContentItem}
                                />;
                            })
                        }

                    </ContentListItem>;
                })
            }
        </ContentList>;
    }

    return <RenderContent
        key={uniqueKey()}
        schema={blockContent}
    />;
}