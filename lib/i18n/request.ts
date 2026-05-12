import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isLocale } from './config';

export default getRequestConfig(async ({ locale }) => {
  const activeLocale = locale;

  if (!activeLocale || !isLocale(activeLocale)) {
    notFound();
  }

  return {
    messages: (await import(`./dictionaries/${activeLocale}.json`)).default
  };
});
