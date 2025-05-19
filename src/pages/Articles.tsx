import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, Article } from '../services/api';
import { BookOpen, Search, Tag, Clock, Loader2 } from 'lucide-react';

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        setError('Makaleler yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Get unique categories from articles
  const categories = articles
    ? Array.from(new Set(articles.map((article) => article.category)))
    : [];

  // Filter articles based on search term and selected category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary-500 animate-spin" />
        <span className="ml-2 text-xl">Makaleler yükleniyor...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">{error}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => window.location.reload()}
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sağlık Makaleleri</h1>
        <p className="text-gray-600">
          Sağlıklı yaşam ve wellness konularında bilgilendirici makaleler keşfedin.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Makale ara..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-64">
            <select
              className="input"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">Sonuç bulunamadı</h3>
          <p className="text-gray-500">
            Aramanızla eşleşen makale bulunamadı. Farklı anahtar kelimeler deneyin veya filtrelerinizi temizleyin.
          </p>
          <button
            className="mt-4 btn btn-secondary"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
            }}
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              className="card hover:shadow-lg transition-shadow duration-300 overflow-hidden group animate-fade-in"
            >
              <div className="h-40 bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <BookOpen className="text-white h-16 w-16 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <Tag size={14} className="text-primary-500 mr-1" />
                  <span className="text-sm text-primary-600 font-medium">
                    {article.category}
                  </span>
                </div>
                <h3 className="font-semibold text-xl mb-2 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.summary}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={14} className="mr-1" />
                  <span>{formatDate(article.createdAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;