/* eslint-disable */

// This file is not part of the library. It's a sandbox for
// experimentation during development.

import React, { Component, createRef, LegacyRef, ReactNode } from 'react';
import { styled, createTheme, InferProps } from '.';
import { css } from './css';
import { Defaults, Merge } from './types/Utilities';

// Styled

function Foo(props: { className?: string; bar: number; ref?: LegacyRef<string> }): null {
  return null;
}

function Bar(): null {
  return null;
}

const helperA = css``;
const helperB = css`
  ${() => ''}
`;
const helperC = css<{}>`
  ${() => ''}
`;
const helperD = css<{ foo?: string }>`
  ${(props) => ''}
`;
const helperE = css<{ foo: string }>`
  ${(props) => ''}
`;
const helperF = css<string>`
  ${(props) => ''}
`;

// styled(() => null);
// styled((props: {}) => null);
// styled((props: { className?: number }) => null);
// styled(() => null, '');
// styled((props: {}) => null, '');
// styled((props: { className?: number }) => null, '');

class Baz extends Component<{ className?: string }> {
  render(): ReactNode {
    return null;
  }
}

const refA = createRef<HTMLAnchorElement>();
const A = styled('a')
  .use<{ z?: number }>((props) => ({ z: 1 }))
  .use((props) => ({ className: '' }))
  .set((props) => ({}))
  .set((props) => ({ a: 1 }))
  .map((props) => ({ ...props, z: 1, ref: props.ref }))
  .map((props) => ({ z: 1 }))`
    color: blue;
  `;
<A ref={refA} />;

const refB = createRef<string>();
const B = styled(Foo, 'Foo')
  .use((props) => ({}))
  .use<{ z?: number }>((props) => ({ z: 1 }))
  .use((props) => ({ className: '', z: '' }))
  .set((props) => ({}))
  .set((props) => ({ a: 1 }))
  .map((props) => ({ ...props, z: 1 }))
  .map((props) => ({ z: 1, bar: 1 }))
  .map((props) => ({ bar: 1, className: '' }))`
    color: blue;
  `;
<B bar={1} ref={refB} />;

const C = styled(Baz, 'Baz')
  .use<{ z?: number }>((props) => ({ z: 1 }))
  .use((props) => ({ className: '' }))
  .set((props) => ({ className: '', a: 1 }))
  .map((props) => props)
  .map((props) => ({ ...props, z: 1, className: '' }))`
    color: blue;
  `;

// const D = styled<{ className: string; bar: number }, 'IKnowWhatIAmDoing'>(Foo)`
//   color: blue;
// `;

styled(Foo)
  .set(() => ({ className: undefined }))
  .set((props) => ({}));

styled(Foo).set<{ a: number }>(() => ({ a: 1 }));
styled(Foo).map<{ className?: string; bar: number }>(() => ({ className: '', bar: 1, a: '' }));
styled(Foo).map<{ bar: number }>((props) => ({ ...props }));
// styled(Bar, '');
// styled<{ className?: string; bar: number }>(Foo);

// Theming

const [useTheme, ThemeProvider] = createTheme({
  colorInputBorder: 'black',
  colorInputBorderFocus: 'blue',
});

type ThemeType = ReturnType<typeof useTheme>;

interface ITextInputProps {
  className?: string;
  name?: string;
  type?: 'text' | 'password' | 'email' | 'date' | 'datetime-local' | 'month' | 'number';
  theme?: ThemeType;
  $size?: 'small' | 'large';
}

const TextInput = styled('input', 'TextInput')
  .props<ITextInputProps>()
  .use(() => ({
    theme: useTheme(),
    $size: 'small' as const,
    type: 'text' as const,
  }))`
    color: inherit;
    background: transparent;
    width: ${({ $size }) => ($size === 'small' ? '32rem' : '16rem')};
    border-width: 0 0 1px 0;
    border-color: ${({ theme }) => theme.colorInputBorder};
    &:focus {
      border-color: ${({ theme }) => theme.colorInputBorderFocus};
    }
  `;

const SignatureInput = styled(TextInput, 'SignatureInput')
  .props<Omit<InferProps<typeof TextInput>, 'type'>>({ extend: false })
  .set(() => ({ type: 'text' }))`
    font-family: cursive;
  `;

const Form = styled('form')`
  ${TextInput}, ${SignatureInput} {
    margin: 1em;
  }
`;

const GlobalStyle = styled('style')``;

<>
  <GlobalStyle />
  <Form onSubmit={() => undefined}>
    <TextInput name={'text'} />
    <SignatureInput name={'signature'} className={''} />
  </Form>
</>;

const M = styled('a')
  .props((props: { foo?: string }) => ({ 'data-test': '', foo: props.foo }))
  .use(() => ({
    className: '',
  }))`
    color: ${(props) => props.foo ?? props['data-test']};
  `;

// Utility types

interface IFoo0 {
  a: string;
  b?: string;
  c: string | undefined;
  d: string | undefined;
  e: number;
  f: string | undefined;
}

interface IBar0 {
  a: number;
  b?: number;
  c: number | undefined;
  d: string;
  e: string | undefined;
  f: number;
}

type DefaultsFoo = Defaults<IFoo0, IBar0>;
type MergeFoo = Merge<IFoo0, IBar0>;

const font = css<{ scale?: number }>`
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 400;
  font-size: ${(props) => props.scale ?? 1}rem;
`;

const style = css`
  ${'foo'}
`;

const CompA = (props: { className?: string; foo?: string; bar?: string }) => null;
const CompB = styled(CompA).props<{ className?: string }>({ extend: false })``;
const CompC = styled(CompB).props<{ className?: string; foo: string }>({ extend: false })`
  color: blue;
`;
const CompD = styled(CompC).props((props: { className?: string; foo: number }) => ({
  foo: '',
  bar: '',
}))`
  color: blue;
`;
const CompE = styled(CompD).props(() => ({
  foo: 1,
}));

export default styled('div').props((props: Omit<InferProps<'div'>, 'children'>) => ({
  ...props,
  children: undefined,
}))``;
