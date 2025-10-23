export const lightTokens = {
    bg: '#F6F8FF',
    fg: '#1F2435',
    card: '#FFFFFF',
    muted: '#979ba6',
    border: '#D6DCEF',

    primary: '#6E8DFF',
    secondary: '#F2A4D9',
    accent: '#A7E9C9',

    habit1: '#7B9DFF',
    habit2: '#80CDAA',
    habit3: '#C6D363',
    habit4: '#F5C96E',
    habit5: '#EE8CC7',
    habit6: '#B793E8',
};

export const darkTokens = {
    bg: '#171A22',
    fg: '#EAF0FF',
    card: '#1E2330',
    muted: '#46526b',
    border: '#374055',

    primary: '#5E7BEE',
    secondary: '#E38BC8',
    accent: '#8FDDB6',

    habit1: '#6789FF',
    habit2: '#63C3A2',
    habit3: '#B8C74D',
    habit4: '#E4B650',
    habit5: '#E278B9',
    habit6: '#A47DE2',
};

export type Theme = typeof darkTokens;

export const radii = {
    md: 12,
    xl: 16,
    '2xl': 24,
} as const;

export const space = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
} as const;

export const fontSize = {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    '2xl': 24,
} as const;

export type Tokens = typeof lightTokens & {
    radii: typeof radii;
    space: typeof space;
    fontSize: typeof fontSize;
};