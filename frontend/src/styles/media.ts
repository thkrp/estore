import { css } from 'styled-components';

export const maxWidth = '1200px';

const devices = {
    desktop: 1024,
    desktopLg: 1280,
    desktopMd: 1200,
    tabletLg: 992,
    tablet: 768,
    phoneLg: 568,
    phoneMd: 480,
    phoneSm: 360,
    phoneXs: 320
};

type Media = {
    [key in keyof typeof devices]: Function;
};

export const media = Object.keys(devices).reduce((acc, label) => {
    acc[label as keyof Media] = (literals: TemplateStringsArray, ...args: string[]) => {
        return css`
            @media (max-width: ${devices[label as keyof typeof devices]}px) {
                ${css(literals, ...args)}
            }
        `;
    };

    return acc;
}, {} as Media);
