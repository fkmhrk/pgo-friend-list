interface IDrawer {
    open(): void;
    setSelected(index: number): void;
}

interface IDrawerMenuItem {
    label: string;
    icon: string;
    path: string;
}
