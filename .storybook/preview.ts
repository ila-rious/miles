import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light',       value: '#f5f5f7' },
        { name: 'white',       value: '#ffffff' },
        { name: 'dark',        value: '#18171c' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
