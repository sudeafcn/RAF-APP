import axios from 'axios';

// API adresini artık direkt yazmıyoruz, varsa .env dosyasından çekiyoruz (Ortak Teknik Gereksinim)
const BASE_URL = import.meta.env.VITE_API_URL || 'https://openlibrary.org';

export const bookApi = {
  // Arama fonksiyonuna Yıl (year) ve Dil (language) parametrelerini ekledik
  searchBooks: async (
    query: string, 
    page: number = 1, 
    searchType: 'title' | 'author' | 'q' = 'title',
    year?: string,
    language?: string
  ) => {
    const formattedQuery = query.replace(/\s+/g, '+');
    let url = `${BASE_URL}/search.json?${searchType}=${formattedQuery}&page=${page}&limit=20`;
    
    // Eğer filtre seçilmişse URL'e ekle
    if (year) url += `&first_publish_year=${year}`;
    if (language) url += `&language=${language}`;

    const response = await axios.get(url);
    return response.data;
  },
  
  getBookDetails: async (id: string) => {
    const response = await axios.get(`${BASE_URL}/works/${id}.json`);
    return response.data;
  },
  
  getSimilarBooks: async (subject: string) => {
    const response = await axios.get(`${BASE_URL}/subjects/${subject.toLowerCase()}.json?limit=10`);
    return response.data;
  },
  
  getAuthorDetails: async (authorId: string) => {
    const response = await axios.get(`${BASE_URL}/authors/${authorId}.json`);
    return response.data;
  },
  
  getAuthorBooks: async (authorId: string) => {
    const response = await axios.get(`${BASE_URL}/authors/${authorId}/works.json?limit=12`);
    return response.data;
  },
  
  getCoverUrl: (coverId: number | string | undefined | null, size: 'S' | 'M' | 'L' = 'M') => {
    if (!coverId) return 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop';
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  },
  
  getAuthorPhotoUrl: (photoId: number | string | undefined | null, size: 'S' | 'M' | 'L' = 'M') => {
    if (!photoId) return 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=400&auto=format&fit=crop';
    return `https://covers.openlibrary.org/a/id/${photoId}-${size}.jpg`;
  }
};