import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0B0F15",
      paper: "#111821",
    },
    primary: {
      main: "#5B9CF5",       // soft sky blue — easy on eyes
      light: "#7DB4FF",
      dark: "#3A7BD5",
    },
    secondary: {
      main: "#64D8CB",       // muted teal for accents
    },
    error: {
      main: "#F06272",
    },
    text: {
      primary: "#D8DEE9",
      secondary: "#6B7B8F",
    },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h3: {
      fontFamily: "'Bebas Neue', sans-serif",
      letterSpacing: 2,
    },
    h5: {
      fontFamily: "'Bebas Neue', sans-serif",
      letterSpacing: 2,
    },
    button: {
      fontFamily: "'Bebas Neue', sans-serif",
      letterSpacing: 3,
      fontSize: 18,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#0B0F15",
            "& fieldset": {
              borderColor: "#1E2A3A",
              borderWidth: 1.5,
            },
            "&:hover fieldset": {
              borderColor: "#3A5068",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#5B9CF5",
              boxShadow: "0 0 0 3px rgba(91,156,245,0.10)",
            },
          },
        },
      },
    },
  },
});

export default theme;