# React Markdown

**Required Dependencies**

[![GitHub Logo](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dead-harbour/shipshape)
![GitHub package.json prod dependency version](https://img.shields.io/github/package-json/dependency-version/dead-harbour/react-markdown/%40dead-harbour%2Fshipshape)

**Peer Dependencies**

[![GitHub Logo](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dead-harbour/react-editors)
![GitHub package.json dev/peer/optional dependency version (branch)](https://img.shields.io/github/package-json/dependency-version/dead-harbour/react-markdown/peer/%40dead-harbour%2Freact-editors/master)

[![GitHub Logo](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dead-harbour/react-elements)
![GitHub package.json dev/peer/optional dependency version (branch)](https://img.shields.io/github/package-json/dependency-version/dead-harbour/react-markdown/peer/%40dead-harbour%2Freact-elements/master)

[![GitHub Logo](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dead-harbour/scss-rigging)
![GitHub package.json dev/peer/optional dependency version (branch)](https://img.shields.io/github/package-json/dependency-version/dead-harbour/react-markdown/peer/%40dead-harbour%2Fscss-rigging/master)

***

## `MarkdownRenderer`

> Expects a `MarkdownContentProvider` wrapping.

Takes the provided `href` URL and fetches markdown content to render.

```tsx
<MarkdownRenderer className features href />
```

## `ContentRenderer`

Takes the provided `href` URL and fetches markdown content to render as a layout.

```tsx
<ContentRenderer className defaultContent href />
```