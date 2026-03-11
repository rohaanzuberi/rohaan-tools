export const metadata = {
  title: 'The People Grid — by Rohaan Zuberi',
  description: 'How much time do you have left with the people who matter most to you?',
  openGraph: {
    title: 'The People Grid',
    description: 'How much time do you have left with the people who matter most to you?',
    url: 'https://rohaanzuberi.com/people-grid',
    siteName: 'Rohaan Zuberi',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The People Grid',
    description: 'How much time do you have left with the people who matter most to you?',
    creator: '@rohaanzuberi',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
