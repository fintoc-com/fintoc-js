import { Fintoc } from './core';

declare global {
  interface Window {
    Fintoc: Fintoc;
  }
}

export * from './core';
