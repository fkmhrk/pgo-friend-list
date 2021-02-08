interface IAppBar {
    setTitle(title: string): void;
    setHasDrawer(have: boolean): void;
    setHasBack(have: boolean): void;

    setMenuItems(items: IMenu[], callback: (item: IMenu) => void): void;
    clearMenuItems(): void;
}

interface IMenu {
    id: number;
    label: string;
}
