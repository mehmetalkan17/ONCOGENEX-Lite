import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database - In a real app, this would be a database
const mockDb = {
  users: [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      healthMetrics: {
        steps: 7500,
        waterIntake: 2.1,
        sleepHours: 7.5
      }
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      healthMetrics: {
        steps: 6200,
        waterIntake: 1.8,
        sleepHours: 6.5
      }
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      healthMetrics: {
        steps: 9800,
        waterIntake: 2.5,
        sleepHours: 8.0
      }
    },
    {
      id: 4,
      name: 'Zeynep Şahin',
      email: 'zeynep@example.com',
      healthMetrics: {
        steps: 5500,
        waterIntake: 1.6,
        sleepHours: 7.0
      }
    },
    {
      id: 5,
      name: 'Emre Yıldız',
      email: 'emre@example.com',
      healthMetrics: {
        steps: 8300,
        waterIntake: 2.2,
        sleepHours: 7.2
      }
    }
  ],
  
  articles: [
    {
      id: 1,
      title: 'Kanser Önleme İpuçları',
      summary: 'Günlük yaşamınızda uygulayabileceğiniz kanser riskini azaltmaya yardımcı olabilecek basit adımlar.',
      content: 'Kanser, dünya genelinde en yaygın sağlık sorunlarından biridir, ancak yaşam tarzı değişiklikleri ile riskinizi azaltabilirsiniz.\n\nSağlıklı beslenme, düzenli egzersiz ve sigara kullanmamak kanser riskini azaltmanın en temel yollarıdır. Meyveler, sebzeler, tam tahıllar ve sağlıklı proteinlerden oluşan dengeli bir diyet bağışıklık sisteminizi güçlendirir.\n\nGüneş koruması da cilt kanseri riskini azaltmak için çok önemlidir. Her gün güneş kremi kullanın ve güneşin en yoğun olduğu saatlerde dışarı çıkmaktan kaçının.\n\nDüzenli sağlık kontrolleri yaptırmak, erken teşhis için kritik öneme sahiptir. Yaşınıza ve risk faktörlerinize göre uygun taramaları yaptırmayı ihmal etmeyin.\n\nStres yönetimi de önemlidir. Kronik stres bağışıklık sistemini zayıflatabilir. Meditasyon, yoga veya doğa yürüyüşleri gibi aktivitelerle stresi azaltabilirsiniz.\n\nYeterli uyku almak da vücudunuzun kendini onarması için gereklidir. Her gece 7-8 saat kaliteli uyku almaya çalışın.',
      category: 'Kanser Önleme',
      createdAt: '2023-06-15T09:30:00Z'
    },
    {
      id: 2,
      title: 'Sağlıklı Beslenme Rehberi',
      summary: 'Dengeli ve sağlıklı bir beslenme planı oluşturmak için pratik öneriler ve ipuçları.',
      content: 'Sağlıklı beslenme, yaşam kalitenizi artırmak ve birçok hastalık riskini azaltmak için en temel adımlardan biridir.\n\nGünlük beslenmenizde çeşitliliğe önem verin. Farklı renklerde meyve ve sebzeler, tam tahıllar, kaliteli proteinler ve sağlıklı yağlar tüketin.\n\nPorsiyonlarınıza dikkat edin. Aşırı yemek yemek kilo almanıza ve metabolik sorunlara yol açabilir. Açlık ve tokluk sinyallerinizi dinlemeyi öğrenin.\n\nİşlenmiş gıdalardan ve trans yağlardan kaçının. Bunlar, kronik inflamasyona ve kalp hastalıklarına neden olabilir. Taze ve doğal gıdaları tercih edin.\n\nYeterli su içmek de son derece önemlidir. Günde en az 2-2.5 litre su içmeyi hedefleyin. Kafein ve alkol tüketimini sınırlandırın.\n\nYemeklerinizi düzenli zamanlarda yiyin ve atıştırmalıkları sınırlandırın. Düzenli öğün alışkanlıkları, kan şekerinizi dengede tutar ve aşırı yemenizi önler.',
      category: 'Beslenme',
      createdAt: '2023-07-22T14:45:00Z'
    },
    {
      id: 3,
      title: 'Stres Yönetimi ve Zihinsel Sağlık',
      summary: 'Günlük hayatta stresi azaltmak ve zihinsel sağlığınızı korumak için etkili stratejiler.',
      content: 'Modern yaşamın kaçınılmaz bir parçası haline gelen stres, doğru yönetilmediğinde fiziksel ve zihinsel sağlığımıza ciddi zararlar verebilir.\n\nMindfulness (bilinçli farkındalık) uygulamaları, stres yönetiminde en etkili yöntemlerden biridir. Her gün 10-15 dakika nefes egzersizleri yaparak başlayabilirsiniz.\n\nDüzenli fiziksel aktivite, endorfin salgılanmasını sağlayarak ruh halinizi iyileştirir. Haftada en az 150 dakika orta yoğunlukta egzersiz yapmayı hedefleyin.\n\nUyku düzeninize özen gösterin. Yetersiz uyku, stres hormonlarının artmasına ve zihinsel dayanıklılığın azalmasına neden olur.\n\nSosyal bağlantılarınızı güçlendirin. Sevdiklerinizle vakit geçirmek, yalnızlık hissini azaltır ve duygusal destek sağlar.\n\nBilişsel yeniden çerçeveleme tekniklerini öğrenin. Olumsuz düşünce kalıplarını fark edip değiştirmek, stresi azaltmanın etkili bir yoludur.',
      category: 'Zihinsel Sağlık',
      createdAt: '2023-08-10T11:20:00Z'
    },
    {
      id: 4,
      title: 'Düzenli Egzersizin Faydaları',
      summary: 'Düzenli fiziksel aktivitenin sağlığınız üzerindeki olumlu etkileri ve başlangıç için öneriler.',
      content: 'Düzenli egzersiz yapmak, sağlıklı bir yaşamın en temel bileşenlerinden biridir ve birçok kronik hastalık riskini azaltmaya yardımcı olur.\n\nEgzersiz, kalp-damar sağlığınızı iyileştirir, kan basıncını düzenler ve kolesterol seviyelerinizi dengeler. Haftada en az 150 dakika orta yoğunlukta aerobik aktivite yapmanız önerilir.\n\nKas gücünü artırmak için haftada en az iki gün güç antrenmanı yapılmalıdır. Bu, yaş ilerledikçe kas kütlesinin korunmasına yardımcı olur.\n\nEgzersiz, zihinsel sağlığınızı da olumlu etkiler. Düzenli fiziksel aktivite, depresyon ve anksiyete semptomlarını azaltabilir ve uyku kalitesini artırabilir.\n\nYeni başlayanlar için en önemli nokta, kademeli olarak ilerlemektir. Çok yoğun başlamak yerine, vücudunuzun adapte olmasına izin verin ve zamanla yoğunluğu artırın.\n\nEgzersiz rutininizi çeşitlendirin. Yürüyüş, yüzme, bisiklet, dans gibi farklı aktiviteleri deneyerek motivasyonunuzu yüksek tutabilirsiniz.',
      category: 'Fiziksel Aktivite',
      createdAt: '2023-09-05T16:15:00Z'
    },
    {
      id: 5,
      title: 'Bağışıklık Sistemini Güçlendirme Yolları',
      summary: 'Bağışıklık sisteminizi desteklemek ve hastalıklara karşı dirençli olmak için pratik öneriler.',
      content: 'Güçlü bir bağışıklık sistemi, vücudunuzun enfeksiyonlara ve hastalıklara karşı doğal savunma mekanizmasıdır. Doğru yaşam tarzı seçimleriyle bu sistemi destekleyebilirsiniz.\n\nBeslenmenizde antioksidanlardan zengin gıdalara yer verin. Renkli meyve ve sebzeler, C ve E vitaminleri, beta-karoten ve selenyum gibi bağışıklık sistemini destekleyen besin ögelerini içerir.\n\nProteinden zengin gıdalar tüketin. Protein, bağışıklık hücrelerinin yapı taşlarıdır. Yumurta, balık, baklagiller ve yağsız et gibi kaliteli protein kaynaklarını tercih edin.\n\nYeterli D vitamini alın. Güneş ışığına maruz kalmak ve D vitamini açısından zengin gıdalar tüketmek bağışıklık sistemini güçlendirir.\n\nDüzenli egzersiz yapın, ancak aşırıya kaçmayın. Orta yoğunlukta düzenli fiziksel aktivite bağışıklık hücrelerinin dolaşımını artırır.\n\nStres yönetimine önem verin. Kronik stres, bağışıklık sistemini zayıflatır. Meditasyon, derin nefes egzersizleri ve yeterli uyku bağışıklık sisteminizi destekler.',
      category: 'Bağışıklık',
      createdAt: '2023-10-18T08:45:00Z'
    },
    {
      id: 6,
      title: 'Kalp Sağlığını Koruma Rehberi',
      summary: 'Kalp hastalıklarını önlemek ve kalp sağlığınızı korumak için yaşam tarzı değişiklikleri.',
      content: 'Kalp hastalıkları, dünya genelinde en yaygın ölüm nedenlerinden biridir, ancak sağlıklı yaşam alışkanlıklarıyla riskinizi önemli ölçüde azaltabilirsiniz.\n\nSağlıklı beslenme, kalp sağlığının temelidir. Akdeniz diyeti gibi bitkisel gıdalar, tam tahıllar, zeytinyağı ve balık içeren bir beslenme düzeni kalp hastalığı riskini azaltabilir.\n\nDüzenli egzersiz yapmak, kalp kasınızı güçlendirir ve kolesterol seviyelerinizi iyileştirir. Haftada en az 150 dakika orta yoğunlukta aktivite hedefleyin.\n\nSigara içmekten kaçının. Sigara, kalp hastalığı riskini önemli ölçüde artırır. Sigarayı bırakmak, kalp sağlığınız için yapabileceğiniz en önemli adımlardan biridir.\n\nTansiyonunuzu ve kolesterol seviyelerinizi düzenli olarak kontrol ettirin. Yüksek tansiyon ve kolesterol, kalp hastalığı için önemli risk faktörleridir.\n\nStresi yönetmeyi öğrenin. Kronik stres, kalp sağlığınızı olumsuz etkileyebilir. Stres azaltıcı aktiviteler ve yeterli uyku kalp sağlığınızı destekler.',
      category: 'Kalp Sağlığı',
      createdAt: '2023-11-27T13:30:00Z'
    },
    {
      id: 7,
      title: 'Sağlıklı Yaşlanma Stratejileri',
      summary: 'Yaşlanma sürecini sağlıklı geçirmek ve yaşam kalitenizi artırmak için öneriler.',
      content: 'Sağlıklı yaşlanmak, sadece uzun yaşamak değil, aynı zamanda yaşam kalitenizi korumak anlamına gelir. Doğru yaşam tarzı seçimleriyle bu süreci olumlu şekilde etkileyebilirsiniz.\n\nBeslenmenize özen gösterin. Antioksidanlardan zengin gıdalar, omega-3 yağ asitleri ve protein açısından zengin bir diyet, yaşlanma sürecini yavaşlatabilir.\n\nZihinsel aktiviteye önem verin. Bulmaca çözmek, kitap okumak, yeni diller öğrenmek gibi aktiviteler, bilişsel fonksiyonlarınızı korur ve demans riskini azaltır.\n\nSosyal bağlantılarınızı güçlendirin. Sosyal izolasyon, yaşlılıkta depresyon ve bilişsel gerileme riskini artırır. Arkadaşlarınız ve ailenizle düzenli iletişim halinde olun.\n\nDüzenli sağlık kontrolleri yaptırın. Erken teşhis, birçok yaşa bağlı hastalığın etkili şekilde tedavi edilmesini sağlar.\n\nFiziksel aktiviteyi yaşamınızın bir parçası haline getirin. Yaşınıza uygun egzersizler, kas kütlenizi korumanıza, kemik sağlığınızı sürdürmenize ve düşme riskinizi azaltmanıza yardımcı olur.',
      category: 'Yaşlanma',
      createdAt: '2024-01-08T10:15:00Z'
    },
    {
      id: 8,
      title: 'Uyku Kalitesini Artırma Teknikleri',
      summary: 'Daha iyi uyumak ve uyku kalitenizi artırmak için pratik öneriler ve doğal yöntemler.',
      content: 'Kaliteli uyku, genel sağlığınız için temel bir unsurdur. Yetersiz uyku, birçok kronik hastalık riskini artırabilir ve yaşam kalitenizi düşürebilir.\n\nDüzenli bir uyku programı oluşturun. Her gün aynı saatte yatmak ve kalkmak, vücudunuzun biyolojik saatini düzenler ve uyku kalitenizi artırır.\n\nUyku ortamınıza özen gösterin. Yatak odanızın karanlık, sessiz ve serin olması (18-20°C) kaliteli uyku için idealdir.\n\nYatmadan önce ekran kullanımını sınırlandırın. Mavi ışık, melatonin üretimini baskılayarak uyku düzeninizi bozabilir. Yatmadan en az 1 saat önce elektronik cihazları kapatın.\n\nUyku rutini oluşturun. Yatmadan önce kitap okumak, hafif germe egzersizleri yapmak veya sıcak bir duş almak vücudunuzu uykuya hazırlar.\n\nKafein, alkol ve nikotin tüketimini sınırlandırın. Bu maddeler uyku düzeninizi bozabilir. Özellikle akşam saatlerinde kafein tüketiminden kaçının.\n\nGünlük fiziksel aktivite, uyku kalitenizi artırabilir. Ancak yatmadan hemen önce yoğun egzersiz yapmaktan kaçının, çünkü bu sizi uyarabilir.',
      category: 'Uyku',
      createdAt: '2024-02-14T09:00:00Z'
    },
    {
      id: 9,
      title: 'Sağlıklı Kilo Yönetimi',
      summary: 'Sağlıklı bir şekilde kilo vermek ve ideal kilonuzu korumak için bilimsel yaklaşımlar.',
      content: 'Sağlıklı kilo yönetimi, hızlı diyetler veya aşırı kısıtlamalar yerine sürdürülebilir yaşam tarzı değişiklikleri gerektirir.\n\nDengeli beslenmeye odaklanın. Kalori kısıtlaması tek başına yeterli değildir. Protein, sağlıklı yağlar, kompleks karbonhidratlar ve bol miktarda sebze ve meyve içeren bir diyet planı oluşturun.\n\nPorsiyon kontrolüne dikkat edin. Yemek miktarınızı azaltmak yerine, yediklerinizin kalitesine odaklanın ve açlık-tokluk sinyallerinizi dinlemeyi öğrenin.\n\nDüzenli fiziksel aktivite, kilo yönetiminin vazgeçilmez bir parçasıdır. Kardiyovasküler egzersizler ve güç antrenmanlarını birleştirerek metabolizmanızı hızlandırabilirsiniz.\n\nYeterli su içmek, tokluk hissini artırabilir ve metabolizmanızı destekleyebilir. Günde en az 2 litre su içmeyi hedefleyin.\n\nStres yönetimi ve yeterli uyku, kilo yönetimi için kritik öneme sahiptir. Stres ve uyku eksikliği, açlık hormonlarını düzenleyen sistemleri bozabilir.\n\nHedefiniz sağlıklı bir vücut ağırlığına ulaşmak olmalıdır, mükemmel bir vücut şekli değil. Küçük adımlarla başlayın ve zamanla ilerleme kaydedin.',
      category: 'Kilo Yönetimi',
      createdAt: '2024-03-22T15:30:00Z'
    },
    {
      id: 10,
      title: 'Dijital Detoks ve Zihinsel İyi Oluş',
      summary: 'Teknoloji kullanımınızı dengelemek ve zihinsel sağlığınızı korumak için dijital detoks önerileri.',
      content: 'Modern çağda teknoloji hayatımızın vazgeçilmez bir parçası haline geldi, ancak aşırı kullanım zihinsel sağlığımızı olumsuz etkileyebilir.\n\nDijital detoks, belirli bir süre teknolojiden uzak durmak anlamına gelir. Her gün en az 1-2 saat telefonunuzu ve diğer elektronik cihazlarınızı kapatmayı deneyin.\n\nUyku kalitenizi artırmak için yatmadan en az bir saat önce tüm ekranlardan uzak durun. Mavi ışık, melatonin üretimini bastırarak uyku düzeninizi bozabilir.\n\nSosyal medya kullanımınızı sınırlandırın. Sosyal medyada geçirdiğiniz süreyi takip eden uygulamalar kullanarak farkındalığınızı artırabilirsiniz.\n\nGerçek sosyal etkileşimlere zaman ayırın. Yüz yüze iletişim, dijital iletişime göre zihinsel sağlığınız için çok daha faydalıdır.\n\nDoğada vakit geçirin. Orman banyosu (shinrin-yoku) gibi doğa temelli aktiviteler, stresi azaltabilir ve dikkat kapasitesini artırabilir.\n\nMindfulness uygulamaları yapın. Bilinçli farkındalık, teknoloji bağımlılığını azaltmaya ve anı yaşamaya yardımcı olabilir.',
      category: 'Zihinsel Sağlık',
      createdAt: '2024-04-05T11:45:00Z'
    }
  ],
  
  polls: [
    {
      id: 1,
      question: 'Hangi sağlık alışkanlığını daha çok önemsiyorsunuz?',
      options: [
        { id: 1, text: 'Düzenli egzersiz', votes: 42 },
        { id: 2, text: 'Sağlıklı beslenme', votes: 68 },
        { id: 3, text: 'Yeterli uyku', votes: 37 }
      ],
      totalVotes: 147
    }
  ],
  
  comments: [
    {
      id: 1,
      userId: 2,
      username: 'Ayşe Demir',
      text: 'Sağlıklı beslenme konusundaki makaleyi çok faydalı buldum. Özellikle porsiyonları kontrol etme kısmı, kilo yönetimi için gerçekten önemli!',
      createdAt: '2024-01-15T14:30:00Z'
    },
    {
      id: 2,
      userId: 3,
      username: 'Mehmet Kaya',
      text: 'Düzenli egzersizin faydaları hakkındaki bilgiler çok değerli. Ben haftada 3 gün koşu ve 2 gün ağırlık çalışıyorum, kendimi çok daha enerjik hissediyorum.',
      createdAt: '2024-01-17T09:45:00Z'
    },
    {
      id: 3,
      userId: 5,
      username: 'Emre Yıldız',
      text: 'Stres yönetimi benim için en zor konu. Meditasyon yapmaya başladım ve gerçekten faydasını görüyorum. Herkese tavsiye ederim!',
      createdAt: '2024-01-20T16:20:00Z'
    },
    {
      id: 4,
      userId: 4,
      username: 'Zeynep Şahin',
      text: 'Su tüketimini artırmak için her saat başı bir hatırlatıcı kurdum. Günde 2.5 litre su içmeyi hedefliyorum ve cildimde büyük fark görüyorum.',
      createdAt: '2024-01-25T11:15:00Z'
    },
    {
      id: 5,
      userId: 1,
      username: 'Ahmet Yılmaz',
      text: 'Kalp sağlığı hakkındaki makale çok bilgilendirici. Ailemde kalp hastalığı geçmişi var, bu yüzden önleyici tedbirler almak benim için çok önemli.',
      createdAt: '2024-02-02T08:30:00Z'
    },
    {
      id: 6,
      userId: 2,
      username: 'Ayşe Demir',
      text: 'Uyku düzeni gerçekten çok önemli! Geceleri telefonu yatak odasına sokmamaya başladığımdan beri uyku kalitem çok arttı.',
      createdAt: '2024-02-10T22:05:00Z'
    },
    {
      id: 7,
      userId: 5,
      username: 'Emre Yıldız',
      text: 'Kanser önleme ipuçları makalesini okuduktan sonra sigara içmeyi tamamen bırakmaya karar verdim. 2 haftadır içmiyorum!',
      createdAt: '2024-02-18T13:45:00Z'
    },
    {
      id: 8,
      userId: 3,
      username: 'Mehmet Kaya',
      text: 'Dijital detoks yapmayı deniyorum ama çok zor. Ancak her hafta sonu bir gün telefonu tamamen kapatmak bile büyük bir fark yaratıyor.',
      createdAt: '2024-02-25T17:30:00Z'
    },
    {
      id: 9,
      userId: 1,
      username: 'Ahmet Yılmaz',
      text: 'Sağlıklı yaşlanma konusunda daha fazla içerik görmek isterim. Yaşımız ilerledikçe nelere dikkat etmemiz gerektiği çok önemli.',
      createdAt: '2024-03-05T10:20:00Z'
    },
    {
      id: 10,
      userId: 4,
      username: 'Zeynep Şahin',
      text: 'Bağışıklık sistemini güçlendirme makalesindeki vitamin önerileri çok faydalı oldu. Özellikle D vitamini takviyesi almaya başladım ve kış boyunca hiç hastalanmadım!',
      createdAt: '2024-03-12T14:10:00Z'
    }
  ]
};

// API Endpoints

// User endpoints
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = mockDb.users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
  }
  
  res.json(user);
});

app.put('/users/:id/health', (req, res) => {
  const userId = parseInt(req.params.id);
  const { healthMetrics } = req.body;
  
  const userIndex = mockDb.users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
  }
  
  mockDb.users[userIndex].healthMetrics = {
    ...mockDb.users[userIndex].healthMetrics,
    ...healthMetrics
  };
  
  res.json(mockDb.users[userIndex]);
});

// Health tips endpoint
app.get('/health-tips/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = mockDb.users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
  }
  
  const { steps, waterIntake, sleepHours } = user.healthMetrics;
  const tips = [];
  
  // Generate personalized tips based on health metrics
  if (steps < 5000) {
    tips.push('Günlük adım sayınızı artırmak için kısa yürüyüşler planlayın. Hedef: günde 10.000 adım.');
  } else if (steps < 10000) {
    tips.push('İyi gidiyorsunuz! Günlük 10.000 adıma ulaşmak için tempolu yürüyüşler ekleyin.');
  } else {
    tips.push('Harika! Günlük adım hedefinizi aşıyorsunuz. Bu şekilde devam edin.');
  }
  
  if (waterIntake < 1.5) {
    tips.push('Su tüketiminizi artırın. Yanınızda su şişesi bulundurun ve her saat başı bir bardak su için.');
  } else if (waterIntake < 2.5) {
    tips.push('Su tüketiminiz iyi düzeyde. Günde 2-2.5 litre su içmeyi hedefleyin.');
  } else {
    tips.push('Su tüketim hedefinizi başarıyla karşılıyorsunuz! Sıvı dengenizi korumaya devam edin.');
  }
  
  if (sleepHours < 6) {
    tips.push('Uyku süreniz yetersiz. Gece en az 7-8 saat uyumayı hedefleyin ve düzenli bir uyku rutini oluşturun.');
  } else if (sleepHours < 7) {
    tips.push('Uyku süreniz kabul edilebilir düzeyde, ancak ideal olarak 7-8 saat uyumaya çalışın.');
  } else {
    tips.push('Uyku düzeniniz mükemmel! Kaliteli uyku, genel sağlığınız için çok önemlidir.');
  }
  
  // Add some general tips
  tips.push('Günde en az 5 porsiyon meyve ve sebze tüketmeyi hedefleyin.');
  tips.push('Haftada en az 150 dakika orta yoğunlukta egzersiz yapın.');
  
  res.json(tips);
});

// Article endpoints
app.get('/articles', (req, res) => {
  res.json(mockDb.articles);
});

app.get('/articles/:id', (req, res) => {
  const articleId = parseInt(req.params.id);
  const article = mockDb.articles.find(a => a.id === articleId);
  
  if (!article) {
    return res.status(404).json({ error: 'Makale bulunamadı' });
  }
  
  res.json(article);
});

// Poll endpoints
app.get('/polls', (req, res) => {
  res.json(mockDb.polls);
});

app.post('/polls/:id/vote', (req, res) => {
  const pollId = parseInt(req.params.id);
  const { optionId } = req.body;
  
  const pollIndex = mockDb.polls.findIndex(p => p.id === pollId);
  
  if (pollIndex === -1) {
    return res.status(404).json({ error: 'Anket bulunamadı' });
  }
  
  const poll = mockDb.polls[pollIndex];
  const optionIndex = poll.options.findIndex(o => o.id === optionId);
  
  if (optionIndex === -1) {
    return res.status(404).json({ error: 'Seçenek bulunamadı' });
  }
  
  // Increment vote count
  poll.options[optionIndex].votes += 1;
  poll.totalVotes += 1;
  
  res.json(poll);
});

// Comment endpoints
app.get('/comments', (req, res) => {
  res.json(mockDb.comments);
});

app.post('/comments', (req, res) => {
  const { text, userId } = req.body;
  
  if (!text || !userId) {
    return res.status(400).json({ error: 'Yorum metni ve kullanıcı ID gereklidir' });
  }
  
  const user = mockDb.users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
  }
  
  const newComment = {
    id: mockDb.comments.length + 1,
    userId,
    username: user.name,
    text,
    createdAt: new Date().toISOString()
  };
  
  mockDb.comments.unshift(newComment);
  
  res.status(201).json(newComment);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});