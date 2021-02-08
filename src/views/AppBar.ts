import Ractive from "ractive";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCMenu } from "@material/menu";
import { APP_NAME } from "../appInfo";

const appBarDecorator = (node: HTMLElement, ...args: any[]) => {
    const e = new MDCTopAppBar(node);
    return {
        teardown: () => {
            e.destroy();
        },
    };
};

export class AppBar implements IAppBar {
    private ractive: Ractive;
    private topAppBar!: MDCTopAppBar;
    private menu!: MDCMenu;
    private menuCallback: ((item: IMenu) => void) | null = null;

    constructor(drawer: IDrawer) {
        this.ractive = new Ractive({
            el: "#appbar",
            template: `
<header as-mdc-top-app-bar class="mdc-top-app-bar mdc-top-app-bar--fixed">
  <div class="mdc-top-app-bar__row">
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
      {{#if hasBack}}<i class="material-icons mdc-top-app-bar__navigation-icon" on-click="back">arrow_back</i>{{/if}}
      {{#if hasDrawer}}<i class="material-icons mdc-top-app-bar__navigation-icon" on-click="open">menu</i>{{/if}}
      <span class="mdc-top-app-bar__title">{{title}}</span>
    </section>

    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end " role="toolbar">
      {{#if menuItems.length > 0}}
      <span class="material-icons mdc-top-app-bar__action-item" aria-label="Menu" alt="Menu" on-click="openMenu">more_vert</span>
      {{/if}}
    </section>
  </div>
</header>
<div style="position:fixed; top:56px; right: 0;" class="mdc-menu-surface--anchor">
  <div class="mdc-menu mdc-menu-surface" tabindex="-1">
    <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical">
    {{#menuItems}}
      <li class="mdc-list-item" role="menuitem" on-click="['menuClicked',.]">
        <span class="mdc-list-item__text">{{.label}}</span>
      </li>
    {{/}}
    </ul>
  </div>
</div>`,
            decorators: {
                "mdc-top-app-bar": appBarDecorator,
            },
            data: {
                title: APP_NAME,
                hasDrawer: false,
                menuItems: [],
            },
            on: {
                complete: () => {
                    this.menu = new MDCMenu(
                        document.querySelector(".mdc-menu")!
                    );
                },
                teardown: () => {
                    this.menu.destroy();
                },
                open: () => {
                    drawer.open();
                },
                back: () => {
                    window.history.back();
                },
                openMenu: () => {
                    this.menu.open = !this.menu.open;
                },
                menuClicked: (e: any, item: IMenu) => {
                    if (this.menuCallback != null) {
                        this.menuCallback(item);
                    }
                },
            },
        });
    }

    setTitle(title: string): void {
        this.ractive.set("title", title);
    }

    setHasBack(have: boolean): void {
        if (have) {
            this.ractive.set({
                hasDrawer: false,
                hasBack: true,
            });
        } else {
            this.ractive.set({
                hasBack: false,
            });
        }
    }

    setHasDrawer(have: boolean) {
        if (have) {
            this.ractive.set({
                hasDrawer: true,
                hasBack: false,
            });
        } else {
            this.ractive.set({
                hasDrawer: false,
            });
        }
    }

    setMenuItems(items: IMenu[], callback: (item: IMenu) => void): void {
        this.ractive.set("menuItems", items);
        this.menuCallback = callback;
    }
    clearMenuItems(): void {
        this.ractive.set("menuItems", []);
        this.menuCallback = null;
    }
}
