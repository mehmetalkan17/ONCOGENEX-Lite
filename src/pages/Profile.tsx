import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { User, Mail, Linkedin, ArrowRight, Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, loading, error } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary-500 animate-spin" />
        <span className="ml-2 text-xl">Profil yükleniyor...</span>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">{error || 'Kullanıcı verisi yüklenemedi.'}</p>
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
      <h1 className="text-3xl font-bold mb-8">Profil</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8 text-white text-center">
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-12 w-12 text-primary-500" />
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="opacity-90 mt-1">{user.email}</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  İletişim Bilgileri
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Mail className="text-gray-500 h-5 w-5 mr-2" />
                    <a 
                      href="mailto:mehmetalkanmete@hotmail.com" 
                      className="text-primary-600 hover:underline"
                    >
                      mehmetalkanmete@hotmail.com
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Linkedin className="text-gray-500 h-5 w-5 mr-2" />
                    <a 
                      href="https://linkedin.com/in/mehmetalkanmete" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      linkedin.com/in/mehmetalkanmete
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Hesap Ayrıntıları
                </h3>
                <p className="text-gray-700 mb-4">
                  ONCOGENEX-LITE platformunda sağlık metriklerinizi takip edebilir,
                  makalelere erişebilir ve topluluğa katılabilirsiniz.
                </p>
                <Link to="/dashboard" className="btn btn-primary w-full">
                  Dashboard'a Git
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Health Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-primary-600 text-white p-4">
              <h2 className="text-xl font-semibold">Sağlık Özeti</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Steps */}
                <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Günlük Adımlar</h3>
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600">{user.healthMetrics.steps}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {user.healthMetrics.steps < 5000 ? (
                      'Günlük adımlarınızı artırmanız önerilir. Hedef: 10.000 adım.'
                    ) : user.healthMetrics.steps < 10000 ? (
                      'İyi gidiyorsunuz! Hedef: 10.000 adım.'
                    ) : (
                      'Harika! Hedefinizi aştınız.'
                    )}
                  </p>
                </div>
                
                {/* Water Intake */}
                <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Su Tüketimi</h3>
                    <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                      <span className="text-secondary-600">{user.healthMetrics.waterIntake}L</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {user.healthMetrics.waterIntake < 1.5 ? (
                      'Daha fazla su içmeniz önerilir. Hedef: 2-2.5 litre/gün.'
                    ) : user.healthMetrics.waterIntake < 2.5 ? (
                      'İyi gidiyorsunuz! Hedef: 2-2.5 litre/gün.'
                    ) : (
                      'Harika! Yeterli miktarda su içiyorsunuz.'
                    )}
                  </p>
                </div>
                
                {/* Sleep Hours */}
                <div className="bg-accent-50 rounded-lg p-6 border border-accent-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Uyku Saatleri</h3>
                    <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                      <span className="text-accent-600">{user.healthMetrics.sleepHours}s</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {user.healthMetrics.sleepHours < 6 ? (
                      'Daha fazla uyumanız önerilir. Hedef: 7-8 saat/gün.'
                    ) : user.healthMetrics.sleepHours < 7 ? (
                      'Uyku sürenizi biraz artırmanız faydalı olabilir.'
                    ) : (
                      'Harika! Yeterli uyku alıyorsunuz.'
                    )}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link to="/dashboard" className="inline-flex items-center text-primary-600 hover:text-primary-800">
                  <span>Detaylı sağlık metriklerine git</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Activity Summary */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-secondary-600 text-white p-4">
              <h2 className="text-xl font-semibold">Platform Aktivitesi</h2>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Platform içerisindeki aktivitelerinizi görüntüleyin ve sağlık yolculuğunuzda ilerlemeye devam edin.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-all duration-300">
                  <h3 className="font-medium mb-2">Son Okunan Makaleler</h3>
                  <div className="text-sm text-gray-500">
                    <p className="italic">Bu özellik yakında kullanıma sunulacaktır.</p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-all duration-300">
                  <h3 className="font-medium mb-2">Topluluk Etkileşimleri</h3>
                  <div className="text-sm text-gray-500">
                    <p className="italic">Bu özellik yakında kullanıma sunulacaktır.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;