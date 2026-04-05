import type { ReactNode } from 'react';
import { processingOrder } from './patterns';

export function repl(str: string, pattern: RegExp, element: (m: RegExpMatchArray) => ReactNode) {
    const m = pattern.exec(str);

    if (!m)
        return [str];

    if (!m[1])
        m[1] = '';

    const i = str.indexOf(m[0]);
    const l = m[0].length;

    return [
        str.slice(0, i),
        element(m),
        str.slice(i + l)
    ];
}

export function process(arr: ReactNode[]) {
    processingOrder.forEach(({ element, pattern }) => {
        arr.forEach((str, s) => {
            if (typeof str === 'string')
                arr.splice(s, 1, ...repl(str, pattern, element));
        });
    });

    return arr.filter((v) => v !== '');
}