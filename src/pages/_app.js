import '../styles/globals.css';
import { AuthProvider } from '../../src/context/AuthContext';
import { CompanyProvider } from '../../src/context/CompanyContext';


export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider>
      <CompanyProvider>
          {getLayout(<Component {...pageProps} />)}
      </CompanyProvider>
    </AuthProvider>
  );
}
