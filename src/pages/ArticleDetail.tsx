import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle, Article } from '../services/api';
import { ArrowLeft, Tag, Clock, Loader2 } from 'lucide-react';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        const articleId = parseInt(id);
        const data = await getArticle(articleId);
        setArticle(data);
      } catch (err) {
        setError('Makale yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

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
        <span className="ml-2 text-xl">Makale yükleniyor...</span>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">{error || 'Makale bulunamadı.'}</p>
          <Link to="/articles" className="btn btn-primary">
            Makalelere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition container-custom py-8">
      <Link to="/articles" className="inline-flex items-center text-primary-600 mb-6 hover:underline">
        <ArrowLeft size={18} className="mr-1" />
        Makalelere Dön
      </Link>
      
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-4">
              <Tag size={16} className="mr-2" />
              <span className="font-medium">{article.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
          </div>
        </div>
        
        {/* Article content */}
        <div className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>
      
      {/* Related articles suggestion would go here in a full implementation */}
    </div>
  );
};

export default ArticleDetail;