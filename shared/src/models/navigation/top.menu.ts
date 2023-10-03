export interface TopMenuItem {
    name: string;
    code: string;
    order: string;
}

export interface TopMenu {
    [key: string]: TopMenuItem;
}
