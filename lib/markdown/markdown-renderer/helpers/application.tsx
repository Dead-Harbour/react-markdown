import { isInterfaceTypeIterable } from '@dead-harbour/react-elements/types';
import { process } from './helpers';
import { uniqueKey } from '@dead-harbour/shipshape/strings';
import type { ClassAttributes, HTMLAttributes, JSX, ReactNode } from 'react';
import type { ExtraProps } from 'react-markdown';

type ElementProps<T extends HTMLElement> = ClassAttributes<T> & HTMLAttributes<T> & ExtraProps;

export function application<T extends HTMLElement>({ children, node }: ElementProps<T>): JSX.Element {
    if (Array.isArray(children)) {
        console.debug(node?.tagName, children);

        const cache = new Map<number, ReactNode>();
        const temp = children.map((c, i) => {
            if (typeof c === 'object') {
                cache.set(i, c);

                return `OBJECT:${i}`;
            }

            return c;
        }).join('');

        const val = process([temp]);

        const pRepl = val.map((v) => {
            if (
                !v ||
                typeof v === 'number' ||
                typeof v === 'boolean' ||
                typeof v === 'object' &&
                isInterfaceTypeIterable(v)
            ) {
                return <p
                    key={uniqueKey()}
                >
                    {v}
                </p>;
            }


            if (typeof v === 'string') {
                const ret: ReactNode[] = [v];

                const loop = () => {
                    let doLoop = false;

                    ret.forEach((part, p) => {
                        if (typeof part !== 'string')
                            return;

                        cache.forEach((value, n) => {
                            const key = `OBJECT:${n}`;
                            const i = part.indexOf(key);
                            const l = key.length;

                            if (i === -1)
                                return;

                            doLoop = true;

                            const splice = [
                                part.slice(0, i),
                                value,
                                part.slice(i + l)
                            ];

                            ret.splice(p, 1, ...splice);
                        });
                    });

                    if (doLoop)
                        loop();
                };

                loop();

                return ret.map((r) => (typeof r === 'object'
                    ? r
                    : <span key={uniqueKey()}>{r}</span>));
            }

            return v;
        });

        return <p>{pRepl}</p>;
    }

    if (typeof children !== 'string')
        return <>{children}</>;


    const processed = process([children]);

    if (processed.length === 1) {
        const [content] = processed;

        if (typeof content !== 'object') {
            return <p>
                {content}
            </p>;
        }

        return <>{content}</>;
    }

    return <p>{processed}</p>;
}