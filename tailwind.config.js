module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/**/*.vue"],
    options: {
      safelist: [/^bg-\w+$/, /^hover:bg-\w+$/, /^border-\w+$/],
    },
  },
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      honey: "#FFB600",
      cocoa: "#6C5042",
      cranberry: "#ac0735",
      peach: "#ffb6b1",
      lavender: "#b8aff2",
      malt: "#ab805b",
      light: "#d1b79f",
      medium: "#633e33",
      dark: "#363030",
      primary: "#2b785e",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      honey: "#FFB600",
      cocoa: "#6C5042",
      cranberry: "#ac0735",
      peach: "#ffb6b1",
      lavender: "#b8aff2",
      malt: "#ab805b",
      light: "#d1b79f",
      medium: "#633e33",
      dark: "#363030",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      honey: "#FFB600",
      cocoa: "#6C5042",
      cranberry: "#ac0735",
      peach: "#ffb6b1",
      lavender: "#b8aff2",
      malt: "#ab805b",
      light: "#d1b79f",
      medium: "#633e33",
      dark: "#363030",
      primary: "#2b785e",
    }),
  },
  variants: {
    extend: {
      borderRadius: ["first", "last"],
      backgroundColor: ["first", "last"],
    },
  },
  plugins: [],
};
