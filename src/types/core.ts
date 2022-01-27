/**
 * The options used to create the widget. You can read more
 * here: {@link https://docs.fintoc.com/docs/widget}.
 */
export type FintocOptions = Record<string, any>;

/**
 * The Fintoc widget. You can read more
 * here: {@link https://docs.fintoc.com/docs/widget}.
 */
export interface FintocWidget {
  /**
   * This method opens the Fintoc widget, revealing it
   * in the UI.
   */
  open: () => void;
  /**
   * This method closes the Fintoc widget, concealing it
   * in the UI. Keep in mind that this method **doesn't destroy
   * the widget**, it just hides it. You can re-open it by
   * using the `open` method again.
   */
  close: () => void;
  /**
   * This method destroys the Fintoc widget. This means that
   * it will no longer exist on the DOM, so you can't use
   * the `open` method to re-open it. If you need to open
   * the widget again, you need to create a new one using the
   * {@link Fintoc.create} method of the {@link Fintoc} object.
   */
  destroy: () => void;
}

/**
 * The object containing the {@link Fintoc.create} method, used
 * to create an instance of the Fintoc widget.
 */
export interface Fintoc {
  /**
   * This method creates an instance of the Fintoc
   * widget, using `options` to initialize it.
   *
   * @param options - The options used to create the widget. You can read
   *   more here: {@link https://docs.fintoc.com/docs/widget}.
   *
   * @returns The Fintoc widget.
   */
  create: (options: FintocOptions) => FintocWidget;
}
