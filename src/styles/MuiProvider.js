import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import roboto from "./fonts";

export default function MuiProvider({ children }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <main className={roboto.variable}>{children}</main>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
