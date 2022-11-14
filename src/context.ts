import { createBrowserContext } from './browser-context';
import { environment } from './environment';
import { type Ids, createIds } from './ids';
import { createServerContext } from './server-context';
import { type StyleStringCache, createStyleStringCache } from './style-string-cache';
import { type StyledComponentCache, createStyledComponentCache } from './styled-component-cache';
import { type Stylesheet } from './stylesheet';
import { type StylesheetCollection, createStylesheetCollection } from './stylesheet-collection';

const $$tssContext = Symbol.for('$$tssContext');

declare const global: {};
declare const window: { readonly document: Document };

type Context = {
  readonly createStylesheet: () => Stylesheet;
  readonly ids: Ids;
  readonly rehydrate?: () => void;
  readonly reset: () => void;
  readonly styleStringCache: StyleStringCache;
  readonly styledComponentCache: StyledComponentCache;
  readonly stylesheetCollection: StylesheetCollection;
  readonly useLayoutEffect: (callback: () => (() => void) | void, deps?: readonly unknown[]) => void;
};

type Global = {
  // eslint-disable-next-line functional/prefer-readonly-type
  [$$tssContext]?: Context;
};

const globalObject = (typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {}) as Global;
const context: Context =
  globalObject[$$tssContext] ??
  (globalObject[$$tssContext] = {
    ...(environment.isBrowser && !environment.isTest ? createBrowserContext() : createServerContext()),
    ids: createIds(),
    reset: () => {
      Object.assign(context, {
        styleStringCache: createStyleStringCache(),
        styledComponentCache: createStyledComponentCache(),
        stylesheetCollection: createStylesheetCollection(),
      });
    },
    styleStringCache: createStyleStringCache(),
    styledComponentCache: createStyledComponentCache(),
    stylesheetCollection: createStylesheetCollection(),
  });

/**
 * Get a stable ID string which is safe to use as a CSS identifier.
 *
 * ```tsx
 * const id = getId('namespace');
 * ```
 *
 * **Note**: When `process.env.NODE_ENV` is "test" (eg. during Jest testing),
 * this function returns a stable value for the given display name. This value
 * is *NOT* unique per invocation like it would be at runtime.
 */
const getId = (namespace: string): string => {
  return context.ids.next(namespace);
};

/**
 * Get all of the `<style>` elements as an HTML string.
 */
const renderStylesToString = (): string => {
  return context.stylesheetCollection.toHtmlString();
};

context.rehydrate?.();

export { type Context, context, getId, renderStylesToString };
