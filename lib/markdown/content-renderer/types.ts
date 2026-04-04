export interface ContentMarkdownSchema {
    href: string
}

export interface ContentImageSchema {
    image: {
        src: string
    }
    caption?: string
}

export interface ContentTextSchema {
    text: string
}

export interface ContentTileGroupOptions {
    perRow?: number
}

export interface ContentSchema {
    content: ContentMarkdownSchema | ContentImageSchema | ContentTextSchema
}

export interface ContentGroupSchema {
    group: ContentSchema[]
}

export interface ContentListItemSchema {
    content: ContentSchema[]
}

export interface ContentListSchema {
    list: ContentListItemSchema[]
}

export interface ContentTileSchema {
    figure?: {
        image: ContentImageSchema
        caption?: ContentSchema
    }
}

export interface ContentTileGroupSchema {
    tiles: {
        options: ContentTileGroupOptions
        content: ContentTileSchema[]
    }
}

export type BlockContentType = ContentSchema | ContentListSchema | ContentGroupSchema | ContentTileGroupSchema | null

export interface ContentBlockSchema {
    content: BlockContentType[]
}

export interface ContentLayoutSchema {
    title?: string
    layout: ContentBlockSchema[]
}

export function isContentSchema(obj: unknown): obj is ContentSchema {
    return 'content' in (obj as ContentSchema);
}

export function isContentMarkdownSchema(obj: unknown): obj is ContentMarkdownSchema {
    return 'href' in (obj as ContentMarkdownSchema);
}

export function isContentImageSchema(obj: unknown): obj is ContentImageSchema {
    return 'image' in (obj as ContentImageSchema);
}

export function isContentTextSchema(obj: unknown): obj is ContentTextSchema {
    return 'text' in (obj as ContentTextSchema);
}

export function isContentListSchema(obj: unknown): obj is ContentListSchema {
    return 'list' in (obj as ContentListSchema);
}

export function isContentListItemSchema(obj: unknown): obj is ContentListItemSchema {
    return 'content' in (obj as ContentListItemSchema) && isContentImageSchema((obj as ContentListItemSchema).content);
}

export function isContentGroupSchema(obj: unknown): obj is ContentGroupSchema {
    return 'group' in (obj as ContentGroupSchema);
}

export function isContentTileGroupSchema(obj: unknown): obj is ContentTileGroupSchema {
    return 'tiles' in (obj as ContentTileGroupSchema);
}