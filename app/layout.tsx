import "./globals.css";

import Image from "next/image";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased">

      <body className="min-h-full">
        <header className={"flex justify-between px-10 py-2 shadow-md"}>
            <a className={"flex items-center space-x-2"}
               href="/">
                <Image src="/logo.svg"
                       alt="Logo Pokédex"
                       width={24}
                       height={24} />
                <span className="text-xl">
                    Pokédex
                </span>
            </a>
            {/*<nav>*/}
            {/*    <ul className={"flex items-center justify-center space-x-2"}>*/}
            {/*        <li><a href="">Page1</a></li>*/}
            {/*        <li><a href="">Page2</a></li>*/}
            {/*        <li><a href="">Page3</a></li>*/}
            {/*    </ul>*/}
            {/*</nav>*/}

            <input className={"border border-gray-300 rounded-md border-gray-300 px-2 py-1"}
                   type="text"
                   placeholder={"Search..."}/>
        </header>

            {children}

        <footer className={"bg-gray-100"}>
            Footer
        </footer>

      </body>
    </html>
  );
}
