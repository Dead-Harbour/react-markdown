import { HTMLElementProps } from '@syren-dev-tech/confects/types';
import { ReactNode } from 'react';
import { TableOfContents } from '../../fragments/TableOfContents';

interface Processor {
    element: (m: RegExpMatchArray) => ReactNode,
    pattern: RegExp
}

/*
 *Highlight:      ||text||
 *Superscript:    ^text^
 *Subscript:      ~text^
 */

const HIGHLIGHT_SYNTAX = /\|\|(?<content>.*)\|\|/;
const SUPERSCRIPT_SYNTAX = /[^^]\^(?<content>[^^]*)\^/;
const SUBSCRIPT_SYNTAX = /~(?<content>[^^]*)\^/;
const STYLE_SYNTAX = /%\((?<style>.+)\)(?<content>.*)%/;
const TOC_SYNTAX = /\[TOC\]/;

const HIGHLIGHT_PROCESS: Processor = {
    element: (m) => {
        return <span
            className='highlight f-primary'
        >
            {m[1]}
        </span>;
    },
    pattern: HIGHLIGHT_SYNTAX
};

const SUPERSCRIPT_PROCESS: Processor = {
    element: (m) => {
        return <sup>
            {m[1]}
        </sup>;
    },
    pattern: SUPERSCRIPT_SYNTAX
};

const SUBSCRIPT_PROCESS: Processor = {
    element: (m) => {
        return <sub>
            {m[1]}
        </sub>;
    },
    pattern: SUBSCRIPT_SYNTAX
};

function getAppliedStyles(tag: string, value: ReactNode) {
    const tagArr = tag.split(/;/g);
    const tags: HTMLElementProps = {};

    tagArr.forEach((tagItem) => {
        const [tagKey, tagValue] = tagItem.split('=');
        if (tagKey === undefined || tagValue === undefined)
            return;

        switch (tagKey) {
            case 'class': {
                tags.className = tagValue;
                break;
            }
            case 'style': {
                tags.style = JSON.parse(tagValue);
                break;
            }
            default: throw new Error('Unsupported key: ' + tagKey);
        }
    });

    return <span
        {...tags}
    >
        {value}
    </span>;
}

const STYLE_PROCESS: Processor = {
    element: (m) => {
        if (!m[1])
            return m[2];

        return getAppliedStyles(m[1], m[2]);
    },
    pattern: STYLE_SYNTAX
};

const TOC_PROCESS: Processor = {
    element: () => {
        return <TableOfContents />;
    },
    pattern: TOC_SYNTAX
};

export const processingOrder: Processor[] = [
    HIGHLIGHT_PROCESS,
    SUPERSCRIPT_PROCESS,
    SUBSCRIPT_PROCESS,
    STYLE_PROCESS,
    TOC_PROCESS
];