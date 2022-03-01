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

let fintocPromise: Promise<Fintoc | null> | null = null;

/**
 * Gets the Fintoc object. If the Fintoc script isn't loaded,
 * this method loads it before retunring the Fintoc object.
 *
 * @returns The {@link Fintoc} object
 */
export const getFintoc = (): Promise<Fintoc | null> => {
  if (fintocPromise !== null) {
    return fintocPromise;
  }

  fintocPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Imports on server side will get a null
      // Fintoc object instead of failing
      resolve(null);
      return;
    }

    if (window.Fintoc) {
      resolve(window.Fintoc);
      return;
    }

    try {
      let script = findScript();

      if (!script) {
        script = injectScript();
      }

      script.addEventListener('load', () => {
        if (window.Fintoc) {
          resolve(window.Fintoc);
        } else {
          reject(new Error('Fintoc.js is not available'));
        }
      });

      script.addEventListener('error', () => {
        reject(new Error('Failed to load Fintoc.js'));
      });
    } catch (error) {
      reject(error);
    }
  });

  return fintocPromise;
};
