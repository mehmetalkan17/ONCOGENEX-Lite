# ONCOGENEX-LITE

ONCOGENEX-LITE, Türk kullanıcılar için tasarlanmış, sağlık yönetimi ve wellness odaklı bir web uygulamasıdır. Kullanıcılara sağlık metriklerini takip etme, eğitim içeriklerine erişme ve toplulukla etkileşim kurma imkanı sunar.

## Özellikler

- Sağlık metriklerini (adımlar, su tüketimi, uyku) takip etme ve görselleştirme
- Sağlık ve wellness konularında eğitici makaleler
- Topluluk anketleri ve yorumları
- Kişiselleştirilmiş sağlık önerileri
- Kullanıcı profil sayfası
- Modern, duyarlı tasarım
- Tamamen Türkçe arayüz

## Teknolojiler

- **Frontend:** React, Tailwind CSS, Chart.js
- **Backend:** Node.js, Express.js
- **Veri Yönetimi:** Bellek içi simülasyon (JSON)

## Başlangıç

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### Önkoşullar

- Node.js (v14 veya üzeri)
- npm (v6 veya üzeri)

### Kurulum

1. Repoyu klonlayın:
```
git clone https://github.com/username/oncogenex-lite.git
cd oncogenex-lite
```

2. Bağımlılıkları yükleyin:
```
npm install
```

3. Uygulamayı başlatın:

Backend ve frontend için ayrı terminaller kullanarak:

Backend:
```
npm run server
```

Frontend:
```
npm run dev
```

Ya da tümünü tek bir komutla başlatmak için:
```
npm run dev:all
```

4. Tarayıcınızda aşağıdaki adreslere gidin:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## API Endpoints

### Kullanıcılar
- `GET /users/:id` - Belirli bir kullanıcının bilgilerini alır
- `PUT /users/:id/health` - Kullanıcının sağlık metriklerini günceller

### Sağlık Önerileri
- `GET /health-tips/:userId` - Kullanıcıya özel sağlık önerileri alır

### Makaleler
- `GET /articles` - Tüm makaleleri listeler
- `GET /articles/:id` - Belirli bir makaleyi getirir

### Anketler
- `GET /polls` - Tüm anketleri listeler
- `POST /polls/:id/vote` - Bir ankette oy kullanır

### Yorumlar
- `GET /comments` - Tüm yorumları listeler
- `POST /comments` - Yeni bir yorum ekler

## İletişim

- LinkedIn: [linkedin.com/in/mehmetalkanmete](https://linkedin.com/in/mehmetalkanmete)
- E-posta: mehmetalkanmete@hotmail.com

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.