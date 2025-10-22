import React from "react";
import { Text, TextProps } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { HabitKey, getHabitColor } from "../theme/theme-helpers";

type ThemedTextProps = TextProps & {
    muted?: boolean;
    habitKey?: HabitKey;
    weight?: "regular" | "medium" | "bold";
    size?: keyof ReturnType<typeof useTypography>["sizes"];
};

function useTypography() {
    const sizes = {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 22,
    } as const;
    const weights = {
        regular: "400",
        medium: "600",
        bold: "700",
    } as const;
    return { sizes, weights };
}

export const ThemedText: React.FC<ThemedTextProps> = ({
    style,
    muted,
    habitKey,
    weight = "regular",
    size = "md",
    ...rest
}) => {
    const { colors } = useTheme();
    const { sizes, weights } = useTypography();

    const color = habitKey
        ? getHabitColor(colors, habitKey, colors.fg)
        : muted
            ? colors.muted
            : colors.fg;

    return (
        <Text
            style={[
                {
                    color,
                    fontSize: sizes[size],
                    fontWeight: weights[weight] as any,
                },
                style,
            ]}
            {...rest}
        />
    );
};