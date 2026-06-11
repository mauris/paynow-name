# paynow-name

A zero-dependency npm package that masks full names using the standard PayNow partial masking rules. This repository also includes a browser demo that updates the masked result in real time.

## Install

```sh
npm install paynow-name
```

## Use

```js
import { maskPayNowName } from 'paynow-name';

maskPayNowName('Ravi s/o Kumar'); // "RaXX s/X KumXX"
```

`maskPayNowName()` returns an empty string for empty or non-string values. It trims and normalizes whitespace before masking each name block independently.

## Masking rules

| Block length | Visible characters |
| --- | --- |
| 1–2 | 1 |
| 3–4 | 2 |
| 5–6 | 3 |
| 7 | 4 |
| 8+ | First 5 characters |

The legal conjunctions `s/o` and `d/o` are displayed as `s/X` and `d/X`, preserving their original letter casing.

## Demo

The static demo imports the same package source used by npm and includes a button for trying randomly generated Singaporean names. To run it locally, serve the repository root with any static file server, for example:

```sh
npx serve .
```

The workflow in `.github/workflows/pages.yml` publishes the demo to GitHub Pages whenever the `main` branch is updated. In the repository settings, set **Pages → Source** to **GitHub Actions**.

## Development

```sh
npm test
npm run check
```

## License

MIT
