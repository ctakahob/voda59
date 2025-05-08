import MuiProvider from "../styles/MuiProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <MuiProvider>{children}</MuiProvider>
      </body>
    </html>
  );
}
