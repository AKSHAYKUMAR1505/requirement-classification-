import './globals.css'

export const metadata = {
  title: 'Tender Analyzer',
  description: 'Extract hardware and software requirements from documents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}