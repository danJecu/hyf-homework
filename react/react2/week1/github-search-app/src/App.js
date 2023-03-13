import { SearchProvider } from './contexts/SearchContext';

// Import components
import Display from './components/Display';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <SearchProvider>
        <Navbar />
        <Display />
      </SearchProvider>
    </>
  );
}
