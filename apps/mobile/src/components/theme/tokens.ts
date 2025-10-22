export const lightTokens = {
    bg: '#F6F8FF',
    fg: '#1F2435',
    card: '#FFFFFF',
    muted: '#979ba6',
    border: '#D6DCEF',

    primary: '#6E8DFF',
    secondary: '#F2A4D9',
    accent: '#A7E9C9',

    habit1: '#6E8DFF',
    habit2: '#A7E9C9',
    habit3: '#EAF28A',
    habit4: '#F3E07A',
    habit5: '#F2A4D9',
    habit6: '#D0A6F0',
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

    habit1: '#5E7BEE',
    habit2: '#8FDDB6',
    habit3: '#C9DA6E',
    habit4: '#D6C65F',
    habit5: '#E38BC8',
    habit6: '#B58ADF',
};

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