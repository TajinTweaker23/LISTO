import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts: Inter and Poppins */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@500;700&display=swap" rel="stylesheet"/>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialTheme() {
                  try {
                    const storedTheme = window.localStorage.getItem('theme');
                    if (storedTheme) {
                      return storedTheme;
                    }
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    return systemTheme;
                  } catch (e) {
                    return 'light'; // Default theme
                  }
                }
                const theme = getInitialTheme();
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}