import { css } from 'styled-components';

export const maxWidth = '1200px';

export const devices = {
    /** 1280px */
    desktopLg: 1280,
    /** 1200px */
    desktopMd: 1200,
    /** 1024px */
    desktop: 1024,
    /** 992px */
    tabletLg: 992,
    /** 768px */
    tablet: 768,
    /** 568px */
    phoneLg: 568,
    /** 480px */
    phoneMd: 480,
    /** 360px */
    phoneSm: 360,
    /** 320px */
    phoneXs: 320
} as const;

type Media = {
    -readonly [key in keyof typeof devices]: Function;
} & Record<`until${Capitalize<keyof typeof devices>}`, Function>;
/**
    desktopLg: 1280<br >
    desktopMd: 1200<br >
    desktop: 1024<br >
    tabletLg: 992<br >
    tablet: 768<br >
    phoneLg: 568<br >
    phoneMd: 480<br >
    phoneSm: 360<br >
    phoneXs: 320<br >
 */
export const media = Object.keys(devices).reduce((acc, label) => {
    acc[label as keyof Media] = (literals: TemplateStringsArray, ...args: string[]) => {
        return css`
            @media (max-width: /** 321 */ ${devices[label as keyof typeof devices]}px) {
                ${css(literals, ...args)}
            }
        `;
    };

    const untilLabel = `until${label.substring(0, 1).toUpperCase()}${label.substring(1)}` as keyof Media;
    acc[untilLabel] = (literals: TemplateStringsArray, ...args: string[]) => css`
        @media (max-width: ${devices[label as keyof typeof devices] - 1}px) {
            ${css(literals, ...args)}
        }
    `;

    return acc;
}, {} as Media);
