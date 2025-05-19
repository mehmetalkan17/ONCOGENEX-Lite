import { Link } from 'react-router-dom';
import { Heart, Activity, Users, BookOpen, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="health-bg-gradient text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              SAĞLIKLI BİR GELECEK İÇİN!
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Sağlık yolculuğunuzda size rehberlik eden kişisel sağlık yönetimi uygulaması.
            </p>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/dashboard"
                className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Hemen Başla
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Özelliklerimiz</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sağlık Takibi</h3>
              <p className="text-gray-600">
                Günlük adımlarınızı, su tüketiminizi ve uyku sürenizi kolayca takip edin ve ilerlemelerinizi görün.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eğitici İçerikler</h3>
              <p className="text-gray-600">
                Sağlık ve wellness konularında uzmanlar tarafından hazırlanmış bilgilendirici makaleler keşfedin.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Topluluk</h3>
              <p className="text-gray-600">
                Aynı sağlık hedeflerine sahip kişilerle bağlantı kurun, anketlere katılın ve fikirlerinizi paylaşın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Sağlık Yolculuğunuza Başlayın</h2>
              <p className="text-gray-600 mb-0">
                ONCOGENEX-LITE ile sağlık alışkanlıklarınızı takip edin ve daha sağlıklı bir yaşam sürün.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="btn btn-primary flex items-center px-6 py-3 whitespace-nowrap"
            >
              <span>Dashboard'a Git</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Kullanıcılarımız Ne Diyor?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">AY</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Ayşe Yılmaz</h4>
                  <p className="text-sm text-gray-500">İstanbul</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "ONCOGENEX-LITE sayesinde günlük su tüketimimi düzenli olarak takip etmeye başladım. 
                Kişiselleştirilmiş sağlık önerileri gerçekten faydalı!"
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">MK</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Mehmet Kaya</h4>
                  <p className="text-sm text-gray-500">Ankara</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Sağlık makaleleri ve topluluk tartışmaları benim için çok değerli bilgiler sunuyor. 
                Uygulamanın kullanımı da oldukça kolay ve sezgisel."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="health-bg-gradient text-white py-12">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Sağlıklı Yaşam İçin İlk Adımı Atın</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            ONCOGENEX-LITE ile sağlığınızı yönetin, bilgi edinin ve toplulukla bağlantı kurun.
          </p>
          <Link
            to="/dashboard"
            className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
          >
            <Heart className="mr-2 h-5 w-5" />
            <span>Hemen Başla</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;