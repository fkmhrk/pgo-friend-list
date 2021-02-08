import Ractive from "ractive";
import { MDCList } from "@material/list";

export const mdcList = (node: HTMLElement, ...args: any[]) => {
    const e = new MDCList(node);
    return {
        teardown: () => {
            e.destroy();
        },
    };
};

export const List = Ractive.extend(<any>{
    template: `
<ul as-mdc-list class="mdc-list {{class}}">
  {{yield}}
</ul>`,
    decorators: {
        "mdc-list": mdcList,
    },
});

export const SingleLineListItem = Ractive.extend(<any>{
    template: `
<li class="mdc-list-item" tabindex="{{index}}" on-click="@this._click()">
  <span class="mdc-list-item__ripple"></span>
  <span class="mdc-list-item__text">{{label}}</span>
</li>`,
    _click: function () {
        this.fire("click");
    },
});
