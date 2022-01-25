export type FintocOptions = Record<string, any>;

export type FintocWidget = {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

export type Fintoc = {
  create: (options: FintocOptions) => FintocWidget;
}

export interface FintocWindow extends Window {
  Fintoc: Fintoc;
}
