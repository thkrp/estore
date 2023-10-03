export interface BottomMenuItemDto {
    name: string;
    type: string;
    section: string | null;
    url: string;
}

export interface BottomMenu {
    name: string;
    sort: string;
    items: BottomMenuItemDto[];
}
