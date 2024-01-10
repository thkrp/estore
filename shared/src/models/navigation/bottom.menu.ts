export interface BottomMenuItem {
    name: string;
    type: string;
    section: string | null;
    url: string;
}

export interface BottomMenu {
    name: string;
    sort: string;
    items: BottomMenuItem[];
}
