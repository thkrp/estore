export interface Breadcrumb {
    name?: string;
    code: string;
    url: string;
    children?: Breadcrumb[];
}
