# 🎺 Miles

**Trumpet Design System — React component library**

Miles is the coded counterpart to Trumpet's Figma design system. Every component is built directly from Figma tokens, keeping design and code always in sync.

---

## Components

| Component | Status | Figma |
|-----------|--------|-------|
| Checkbox  | ✅ Ready | [View in Figma](https://www.figma.com/design/7DND1T1ZUjrPPI3vzAVOpg/Components?node-id=77-478) |
| Toggle    | 🚧 Coming soon | [View in Figma](https://www.figma.com/design/7DND1T1ZUjrPPI3vzAVOpg/Components?node-id=159-4880) |
| Input     | 🚧 Coming soon | [View in Figma](https://www.figma.com/design/7DND1T1ZUjrPPI3vzAVOpg/Components?node-id=281-17809) |
| Button    | 🚧 Coming soon | — |

---

## Usage
```tsx
import { Checkbox } from '@trumpet/miles';

<Checkbox
  label="Send me product updates"
  checked={checked}
  onChange={setChecked}
  size="M"
/>
```

## Tokens

All design tokens live in `src/tokens/tokens.ts` and are sourced directly from the Figma file.
```ts
import { colors, spacing, radii, typography } from '@trumpet/miles';

colors.primary   // #413cc3
colors.g200      // #e4e3e8
spacing[8]       // '8px'
```

---

## Repo structure
```
miles/
├── src/
│   ├── tokens/
│   │   └── tokens.ts         ← all Figma tokens
│   └── components/
│       ├── Checkbox/
│       │   ├── Checkbox.tsx
│       │   └── index.ts
│       ├── Toggle/            ← coming soon
│       └── Input/             ← coming soon
├── tsconfig.json
└── package.json
```

---

## Design system doc

The Miles documentation site (HTML) lives separately and documents every component with live interactive demos, states, tokens and Figma references.

---

*Built with ❤️ by ila @ trumpet*
