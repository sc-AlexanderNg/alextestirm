// import { ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';

// export const getVisibility = (params: ComponentParams): string => {
//   if (params?.GridParameters) {
//     return JSON.parse(params?.GridParameters).Value.value;
//   }

//   return '';
// };

import {
  ComponentProps,
  ComponentWithContextProps,
} from '../lib/component-props';

export const getVisibility = (
  props: ComponentProps | ComponentWithContextProps
): string => {
  let cssclass = ' ';
  const parameters = props?.params?.GridParameters?.toString().toLowerCase();

  if (parameters) {
    //Compact Phone Device
    if (parameters.indexOf('64e70996-17a5-42b1-aca7-0cc49459b74b') > 0) {
      cssclass += 'hidden-xs ';
    }

    //Mobile Device
    if (parameters.indexOf('36d97f2b-4b82-47b3-867c-aef27ceba054') > 0) {
      cssclass += 'hidden-sm ';
    }

    //Tablet Device
    if (parameters.indexOf('c6cddbf6-58af-4bbe-b9b3-b8e0b4561701') > 0) {
      cssclass += 'hidden-md ';
    }

    //Laptop Device
    if (parameters.indexOf('95710a52-36f6-4668-a9ae-4a42249ce8c3') > 0) {
      cssclass += 'hidden-lg ';
    }

    //Desktop Device
    if (parameters.indexOf('64410009-60ba-403f-a171-d8831c4ca136') > 0) {
      cssclass += 'hidden-xl ';
    }

    //Extra Large Device
    if (parameters.indexOf('c2f9a05a-659e-40cc-ae26-d18f6037f60e') > 0) {
      cssclass += 'hidden-xxl ';
    }

    return cssclass;
  }

  return '';
};
