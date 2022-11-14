// import { describe, expect, test } from '@jest/globals';

import { compile } from './compile.js';

describe('compile', () => {
  test('top level props', () => {
    const style = `
      color: red;
      margin: 1px;
    `;

    expect(compile(style)).toMatchInlineSnapshot(`
      {
        "children": [
          "color: red",
          "margin: 1px",
        ],
      }
    `);
  });

  test('selectors block', () => {
    const style = `
      .foo, .bar[baz=",;{}()[]"] {
        color: red;
        margin: 1px;
      }
    `;

    expect(compile(style)).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "children": [
              "color: red",
              "margin: 1px",
            ],
            "condition": {
              "selectors": [
                ".foo",
                ".bar[baz=",;{}()[]"]",
              ],
            },
          },
        ],
      }
    `);
  });

  test('parent selectors', () => {
    const style = `
      @media & {
        color: red;
      }
      & input {
        a & {
          cont&nt: "&";
        }
      }
    `;

    expect(compile(style)).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "children": [
              "color: red",
            ],
            "condition": {
              "at": "@media &",
            },
          },
          {
            "children": [
              {
                "children": [
                  "cont&nt: "&"",
                ],
                "condition": {
                  "selectors": [
                    "a  & ",
                  ],
                },
              },
            ],
            "condition": {
              "selectors": [
                " &  input",
              ],
            },
          },
        ],
      }
    `);
  });

  test.todo('escapes work as expected');
  test.todo('missing semicolon ignored');
  test.todo('properties with empty values are omitted');
  test.todo('unclosed quotes error');
  test.todo('unclosed selector brackets error');
  test.todo('unclosed block brackets error');
  test.todo('extra block bracket error');
});
