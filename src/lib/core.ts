import { Fintoc } from '../types';

import { FINTOC_URL, FINTOC_URL_REGEX } from './constants';

export const findScript = (): HTMLScriptElement | null => {
  const scripts = document.querySelectorAll<HTMLScriptElement>(
    `script[src^="${FINTOC_URL}"]`,
  );

  return Array.from(scripts).find((script) => FINTOC_URL_REGEX.test(script.src)) || null;
};

export const injectScript = (): HTMLScriptElement => {
  const script = document.createElement('script');
  script.src = FINTOC_URL;

  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error('Expected document.head or document.body not to be null.');
  }

  headOrBody.appendChild(script);

  return script;
};

/**
 * Gets the Fintoc object. If the Fintoc script isn't loaded,
 * this method loads it before retunring the Fintoc object.
 *
 * @returns The {@link Fintoc} object
 */
export const getFintoc = (): Promise<Fintoc | null> => new Promise((resolve) => {
  if (typeof window === 'undefined') {
    // Imports on server side will get a null
    // Fintoc object instead of failing
    resolve(null);
    return;
  }

  let script = findScript();

  if (!script) {
    script = injectScript();

    script.onload = () => {
      resolve(window.Fintoc);
    };
  } else {
    resolve(window.Fintoc);
  }
});
