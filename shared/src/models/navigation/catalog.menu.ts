export type CatalogMenu = Record<string, CatalogMenuItem>;

export interface CatalogMenuItem {
    id: string;
    name: string;
    code: string;
    url: string;
    children?: CatalogMenu;
}

