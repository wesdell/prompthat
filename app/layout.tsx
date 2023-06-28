import { NavBar, Provider } from '@/components';
import '@/styles/globals.css';

export const metadata = {
  title: 'Prompthat',
  description: 'Find and Share The Best AI Prompts',
  icons: {
    icon: '/icons/favicon.png'
  }
};

interface Props  {
  children: React.ReactNode
}

export default function RootLayout ({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <section className="main">
            <div className="gradient"></div>
          </section>
          <main className="app">
            <NavBar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
