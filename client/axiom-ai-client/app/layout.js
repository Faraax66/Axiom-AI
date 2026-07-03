import './globals.css'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'

export const metadata = {
  title: 'Axiom AI — Automated Code Review',
  description: 'AI-powered code review agent for GitHub Pull Requests',
  icons: { icon: '/favicon.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <link href="https://fonts.googleapis.com/css2?family=Bacasime+Antique&family=Be+Vietnam+Pro:wght@300;400;500&family=Playfair+Display:wght@400;700&family=Anybody:wght@300;400;500&family=Syncopate:wght@400;700&family=Montserrat:wght@300;400&family=Metrophobic&family=Inter:wght@300;400;500;700&family=Antic+Didone&family=Bai+Jamjuree:wght@400;500&family=Manrope:wght@300;400;700&family=JetBrains+Mono:wght@400&family=Jura:wght@400;500;700&family=Antic&family=Instrument+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  )
}