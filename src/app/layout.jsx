import '../app/globals.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { Providers } from '../components/Providers';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export const metadata = {
  title: 'EconAgro',
  description: 'Conectando o campo às inovações tecnológicas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-bg-light font-body text-dark">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
