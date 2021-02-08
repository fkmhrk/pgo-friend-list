import Ractive from "ractive";
import { MDCDrawer } from "@material/drawer";
import { DRAWER_MENU_ITEMS } from "../appInfo";

export class Drawer implements IDrawer {
    private app: IApplication;
    private ractive: Ractive;
    private mdcDrawer!: MDCDrawer;

    constructor(app: IApplication) {
        this.app = app;
        this.ractive = new Ractive({
            el: "#drawer",
            template: `
<aside class="mdc-drawer">      
  <div class="mdc-drawer__content">
    <nav class="mdc-list">
    {{#items:i}}
    <a                                        
      class="mdc-list-item {{#if i == selected}}mdc-list-item--activated{{/if}}"
      tabindex="{{i}}"
      on-click="['show', .,i]"
      {{#if i == selected}}aria-current="page"{{/if}}>
      <i                            
        class="material-icons mdc-list-item__graphic"
        aria-hidden="true">
        {{.icon}}
      </i>           
      <span class="mdc-list-item__text">{{.label}}</span>                    
    </a>
    {{/}}
    </nav>
  </div>
</aside>`,
            data: {
                selected: 0,
                items: DRAWER_MENU_ITEMS,
            },
            on: {
                complete: () => {
                    const elem = document.querySelector(
                        ".mdc-drawer"
                    ) as Element;
                    this.mdcDrawer = MDCDrawer.attachTo(elem);
                },
                show: (e: any, item: IDrawerMenuItem, index: number) =>
                    this.show(item, index),
            },
        });
    }

    open() {
        this.mdcDrawer.open = true;
    }

    close() {
        this.mdcDrawer.open = false;
    }

    setSelected(index: number) {
        this.ractive.set("selected", index);
    }

    private show(item: IDrawerMenuItem, index: number) {
        this.close();
        const current = this.ractive.get("selected");
        if (index == current) {
            return;
        }
        this.app.navigate(item.path);
    }
}
