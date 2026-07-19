import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Search from './pages/Search';
import BookDetail from './pages/BookDetail';
import AuthorDetail from './pages/AuthorDetail';
import Favorites from './pages/Favorites';
import ReadingList from './pages/ReadingList';
import RecentBooks from './pages/RecentBooks';
import NotFound from './pages/NotFound';
import Subjects from './pages/Subjects';
import ToastContainer from './components/ToastContainer';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="book/:id" element={<BookDetail />} />
            <Route path="author/:id" element={<AuthorDetail />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="reading-list" element={<ReadingList />} />
            <Route path="recent" element={<RecentBooks />} />
           <Route path="subjects" element={<Subjects />} /> 
            {/* NotFound (404) her zaman EN ALTTA olmalıdır */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}