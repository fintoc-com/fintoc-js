import { FINTOC_URL, FINTOC_URL_REGEX } from './constants';
import { Fintoc, FintocWindow } from './types';

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

export const getFintoc = (): Promise<Fintoc | null> => new Promise((resolve) => {
  if (typeof window === 'undefined') {
    // Imports on server side will get a null
    // Fintoc object instead of failing
    resolve(null);
    return;
  }

  const modifiedWindow = window as unknown as FintocWindow;
  let script = findScript();

  if (!script) {
    script = injectScript();

    script.onload = () => {
      resolve(modifiedWindow.Fintoc);
    };
  } else {
    resolve(modifiedWindow.Fintoc);
  }
});
