import type { Meta, StoryObj } from '@storybook/react';
import SolutionsNavigation from 'components/SolutionsNavigation/SolutionsNavigation';

const meta: Meta<typeof Image> = {
  title: 'Components/SolutionsNavigation',
  component: SolutionsNavigation,
  argTypes: {},
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SolutionsNavigation>;

export const Default: Story = {
  args: {
    rendering: {
      componentName: 'ImageBlock',
      dataSource: 'ImageBlock',
    },
    params: {
      ImageType: '{"Value":{"value":"full-bleed"}}',
    },
    fields: {
      PhoneText: {
        value: 'Call Us:',
      },
      Logo1: {
        value: {
          src: 'https://picsum.photos/600/300',
          alt: 'This is Alt Text',
          width: '600',
          height: '300',
        },
      },
      LogoLink1: {
        value: {
          href: '/',
        },
      },
      Logo2: {
        value: {
          src: 'https://picsum.photos/600/300',
          alt: 'This is Alt Text',
          width: '600',
          height: '300',
        },
      },
      LogoLink2: {
        value: {
          href: '/',
        },
      },
      PhoneLink: {
        value: {
          href: 'http://tel:99999999',
          text: '9999999999',
          linktype: 'external',
          url: 'http://tel:99999999',
          anchor: '',
          target: '',
        },
      },
    },
  },
};
