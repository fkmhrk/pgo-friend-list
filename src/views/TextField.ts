import Ractive from "ractive";
import { MDCTextField } from "@material/textfield";

const decorator = (node: HTMLElement, ...args: any[]) => {
    const e = new MDCTextField(node);
    return {
        teardown: () => {
            e.destroy();
        },
    };
};

export const TextField = Ractive.extend(<any>{
    template: `
<label as-mdc-text class="mdc-text-field mdc-text-field--filled {{class}}">
  <div class="mdc-text-field__ripple"></div>
  <input
    class="mdc-text-field__input"
    type="{{type}}"
    name="{{name}}"
    aria-labelledby="{{id}}"
    value="{{value}}"
    {{#if required}}required{{/if}}>
  <span class="mdc-floating-label" id="{{id}}">{{label}}</span>
  <div class="mdc-line-ripple"></div>
</label>`,
    decorators: {
        "mdc-text": decorator,
    },
});

export const TextArea = Ractive.extend(<any>{
    template: `
<label as-mdc-text class="mdc-text-field mdc-text-field--filled mdc-text-field--textarea {{class}}">
  <span class="mdc-text-field__ripple"></span>
  <span class="mdc-text-field__resizer">
    <textarea
      class="mdc-text-field__input"
      rows="{{rows}}"
      cols="{{cols}}"
      aria-label="{{label}}"
      value="{{value}}"
      {{#if required}}required{{/if}}></textarea>
  </span>
  <span class="mdc-floating-label" id="{{id}}">{{label}}</span>
  <span class="mdc-line-ripple"></span>
</label>`,
    decorators: {
        "mdc-text": decorator,
    },
    data: {
        rows: 8,
        cols: 40,
    },
});
