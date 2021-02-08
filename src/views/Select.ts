import Ractive from "ractive";
import { MDCSelect } from "@material/select";

export const decorator = (node: HTMLElement, ...args: any[]) => {
    const select = new MDCSelect(node);
    select.listen("MDCSelect:change", () => {
        // notify callback to set value as component value
        args[0](select.value);
    });
    return {
        teardown: () => {
            select.destroy();
        },
    };
};

const Select = Ractive.extend({
    template: `
<div as-mdc-select="onChange" class="mdc-select mdc-select--filled {{classs}}">
  <div class="mdc-select__anchor"
       role="button"
       aria-haspopup="listbox"
       aria-expanded="false"
       aria-labelledby="demo-label demo-selected-text">
    <span class="mdc-select__ripple"></span>
    <span id="demo-label" class="mdc-floating-label">{{label}}</span>
    <span class="mdc-select__selected-text-container">
      <span id="demo-selected-text" class="mdc-select__selected-text"></span>
    </span>
    <span class="mdc-select__dropdown-icon">
      <svg
          class="mdc-select__dropdown-icon-graphic"
          viewBox="7 10 10 5" focusable="false">
        <polygon
            class="mdc-select__dropdown-icon-inactive"
            stroke="none"
            fill-rule="evenodd"
            points="7 10 12 15 17 10">
        </polygon>
        <polygon
            class="mdc-select__dropdown-icon-active"
            stroke="none"
            fill-rule="evenodd"
            points="7 15 12 10 17 15">
        </polygon>
      </svg>
    </span>
    <span class="mdc-line-ripple"></span>
  </div>

  <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
    <ul class="mdc-list" role="listbox" aria-label="Food picker listbox">
      {{#options:i}}
        {{#if value == options[i].val}}
        <li class="mdc-list-item mdc-list-item--selected" aria-selected="true" data-value="{{options[i].val}}" role="option">
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">{{options[i].label}}</span>
        </li>
        {{else}}
        <li class="mdc-list-item" aria-selected="false" data-value="{{options[i].val}}" role="option">
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">{{options[i].label}}</span>
        </li>
        {{/if}}
      {{/}}
    </ul>
  </div>
</div>`,
    /*
<div as-mdc-select="onChange" class="mdc-select {{#if disabled}}mdc-select--disabled{{/if}}">
  <div class="mdc-select__anchor">
  <i class="mdc-select__dropdown-icon"></i>
  <div class="mdc-select__selected-text"></div>
  <label class="mdc-floating-label">{{label}}</label>
  <div class="mdc-line-ripple"></div>
  </div>
  <div class="mdc-select__menu mdc-menu mdc-menu-surface demo-width-class">
  <ul class="mdc-list">
    {{#options:i}}
    <li class="mdc-list-item {{#if value == options[i].val}}mdc-list-item--selected{{/if}}" {{#if value == options[i].val}}aria-selected="true"{{/if}} data-value="{{options[i].val}}">{{options[i].label}}</li>
    {{/}}
  </ul>
  </div>
</div>`,
*/
    on: {
        init: function () {
            this.set({
                onChange: (value: any) => {
                    this.set({ value: value });
                },
                eq: (a: any, b: any) => {
                    return a == b;
                },
            });
        },
    },
    decorators: {
        "mdc-select": decorator,
    },
});

export default Select;
