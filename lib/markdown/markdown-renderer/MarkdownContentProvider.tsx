import type { HTMLElementProps } from '@syren-dev-tech/confects/types';
import { createContext, useContext, useMemo, useState, type Dispatch, type SetStateAction } from 'react';

interface IMarkdownContentContext {
    content: string
    setContent: Dispatch<SetStateAction<string>>
    setShowRaw: Dispatch<SetStateAction<boolean>>
    showRaw: boolean
}

const MarkdownContentContext = createContext<IMarkdownContentContext>({
    content: '',
    setContent: () => null,
    setShowRaw: () => null,
    showRaw: false
});

export function MarkdownContentProvider({ children }: Readonly<HTMLElementProps>) {
    const [content, setContent] = useState('');
    const [showRaw, setShowRaw] = useState(false);

    const context = useMemo<IMarkdownContentContext>(() => {
        return {
            content,
            setContent,
            setShowRaw,
            showRaw
        };
    }, [content, showRaw]);

    return <MarkdownContentContext.Provider value={context}>
        {children}
    </MarkdownContentContext.Provider>;
}

export function useMarkdownContent() {
    return useContext(MarkdownContentContext);
}