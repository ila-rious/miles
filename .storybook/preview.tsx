import type { Preview } from '@storybook/react';
import React from 'react';
import { Title, Subtitle, Description, ArgTypes, Primary } from '@storybook/blocks';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f7' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark',  value: '#18171c' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /date$/i,
      },
    },
    docs: {
      toc: true,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <ArgTypes />
        </>
      ),
    },
  },
};

export default preview;
