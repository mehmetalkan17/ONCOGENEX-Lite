import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { getHealthTips } from '../services/api';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Activity, Droplets, Moon, TrendingUp, Loader2 } from 'lucide-react';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user, loading, error, updateHealth } = useUser();
  const [tips, setTips] = useState<string[]>([]);
  const [tipsLoading, setTipsLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    steps: 0,
    waterIntake: 0,
    sleepHours: 0
  });

  useEffect(() => {
    if (user) {
      // Update form values when user data is loaded
      setFormValues({
        steps: user.healthMetrics.steps,
        waterIntake: user.healthMetrics.waterIntake,
        sleepHours: user.healthMetrics.sleepHours
      });
      
      // Fetch health tips
      const fetchTips = async () => {
        try {
          const healthTips = await getHealthTips(user.id);
          setTips(healthTips);
        } catch (err) {
          console.error('Failed to fetch health tips:', err);
        } finally {
          setTipsLoading(false);
        }
      };
      
      fetchTips();
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateHealth(formValues);
  };

  // Sample data for charts (would be replaced with actual history data in a real app)
  const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  
  const stepsData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: 'Günlük Adımlar',
        data: [6000, 7500, 5500, user?.healthMetrics.steps || 0, 8000, 9500, 7000],
        borderColor: 'rgb(0, 114, 255)',
        backgroundColor: 'rgba(0, 114, 255, 0.1)',
        tension: 0.3,
      },
    ],
  };
  
  const waterData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: 'Su Tüketimi (L)',
        data: [1.8, 2.2, 1.7, user?.healthMetrics.waterIntake || 0, 2.5, 2.8, 2.0],
        backgroundColor: 'rgba(0, 170, 145, 0.7)',
        borderRadius: 5,
      },
    ],
  };
  
  const sleepData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: 'Uyku Saatleri',
        data: [7.5, 6.8, 7.2, user?.healthMetrics.sleepHours || 0, 8.1, 8.5, 7.8],
        borderColor: 'rgb(255, 184, 0)',
        backgroundColor: 'rgba(255, 184, 0, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary-500 animate-spin" />
        <span className="ml-2 text-xl">Yükleniyor...</span>
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
      <h1 className="text-3xl font-bold mb-8">Merhaba, {user.name}!</h1>
      
      {/* Health Metrics Input */}
      <div className="card p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Günlük Sağlık Metriklerinizi Güncelleyin</h2>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Günlük Adımlar
            </label>
            <div className="flex items-center">
              <Activity className="text-primary-500 mr-2" />
              <input
                type="number"
                name="steps"
                value={formValues.steps}
                onChange={handleInputChange}
                min="0"
                max="50000"
                className="input"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Su Tüketimi (Litre)
            </label>
            <div className="flex items-center">
              <Droplets className="text-secondary-500 mr-2" />
              <input
                type="number"
                name="waterIntake"
                value={formValues.waterIntake}
                onChange={handleInputChange}
                min="0"
                max="10"
                step="0.1"
                className="input"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Uyku Saatleri
            </label>
            <div className="flex items-center">
              <Moon className="text-accent-500 mr-2" />
              <input
                type="number"
                name="sleepHours"
                value={formValues.sleepHours}
                onChange={handleInputChange}
                min="0"
                max="24"
                step="0.5"
                className="input"
              />
            </div>
          </div>
          
          <div className="md:col-span-3">
            <button
              onClick={handleSubmit}
              className="btn btn-primary flex items-center"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Metrikleri Güncelle
            </button>
          </div>
        </form>
      </div>
      
      {/* Health Tips */}
      <div className="card p-6 mb-8 bg-primary-50 border border-primary-100">
        <h2 className="text-2xl font-semibold mb-4">Kişiselleştirilmiş Sağlık Önerileri</h2>
        
        {tipsLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 text-primary-500 animate-spin mr-2" />
            <span>Öneriler yükleniyor...</span>
          </div>
        ) : (
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2 mt-0.5">
                  {index + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Health Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Steps Chart */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="h-5 w-5 text-primary-500 mr-2" />
            Adım İstatistikleri
          </h3>
          <Line data={stepsData} options={chartOptions} />
        </div>
        
        {/* Water Intake Chart */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Droplets className="h-5 w-5 text-secondary-500 mr-2" />
            Su Tüketimi
          </h3>
          <Bar data={waterData} options={chartOptions} />
        </div>
        
        {/* Sleep Chart */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Moon className="h-5 w-5 text-accent-500 mr-2" />
            Uyku Düzeni
          </h3>
          <Line data={sleepData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;