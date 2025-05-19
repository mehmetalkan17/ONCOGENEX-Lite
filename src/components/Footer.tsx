import { Mail, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ONCOGENEX-LITE</h3>
            <p className="text-gray-300 text-sm">
              Sağlıklı bir gelecek için kişisel sağlık yönetimi ve wellness uygulaması.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Ana Sayfa</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/articles" className="text-gray-300 hover:text-white transition-colors">Makaleler</a></li>
              <li><a href="/community" className="text-gray-300 hover:text-white transition-colors">Topluluk</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <div className="space-y-3 text-sm">
              <a 
                href="https://linkedin.com/in/mehmetalkanmete" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin size={16} className="mr-2" />
                linkedin.com/in/mehmetalkanmete
              </a>
              <a 
                href="mailto:mehmetalkanmete@hotmail.com"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={16} className="mr-2" />
                mehmetalkanmete@hotmail.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} ONCOGENEX-LITE. Tüm hakları saklıdır.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-2 md:mt-0">
            <span className="mr-1">Sevgiyle yapıldı</span> 
            <Heart size={14} className="text-red-500 mx-1" fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;