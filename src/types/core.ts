export type FintocOptions = Record<string, any>;

export interface FintocWidget {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

export interface Fintoc {
  create: (options: FintocOptions) => FintocWidget;
}
