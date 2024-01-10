import Context from './components/Context'
import './globals.scss'

export const metadata = {
    title: "petSalon",
    description: "i wanna find my Lucky",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Context>
        <head>
          {/* 카카오 로그인 */}
          <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
          {/* alert창 */}
          <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
          {/* manifest 정의 */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="icons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="icons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="icons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="icons/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon-precomposed" sizes="60x60" href="icons/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon-precomposed" sizes="120x120" href="icons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon-precomposed" sizes="76x76" href="icons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon-precomposed" sizes="152x152" href="icons/apple-touch-icon-152x152.png" />
          <link rel="icon" type="image/png" href="icons/favicon-196x196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="icons/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="icons/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="icons/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="icons/favicon-128.png" sizes="128x128" />
          <meta name="petSalon" content="&nbsp;"/>
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="icons/mstile-144x144.png" />
          <meta name="msapplication-square70x70logo" content="icons/mstile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="icons/mstile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="icons/mstile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="icons/mstile-310x310.png" />
        </head>
        <body>
          <main>{children}</main>
        </body>
      </Context>
    </html>

  )
}
