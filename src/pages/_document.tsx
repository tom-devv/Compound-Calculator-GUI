import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <body className="font-Rubik scrollbar-thumb-red-500 scrollbar-thin">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
