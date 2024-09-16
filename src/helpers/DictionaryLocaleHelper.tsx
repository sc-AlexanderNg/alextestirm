export const getDictionaryLocale = (locale: string | undefined): string => {
  if (locale) {
    const localeArray = locale?.split('-');
    const languageCode = localeArray[0];
    const countryCode = localeArray[1]?.toUpperCase();

    if (countryCode) {
      locale = languageCode?.concat('-', countryCode);
    }
  }

  return locale || 'en';
};
