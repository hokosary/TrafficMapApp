# TrafficMapApp — Карта дорожной обстановки

Веб-приложение на **React + Vite** для отображения загруженности дорог.
На карте показаны участки дорог Москвы с цветовой индикацией загрузки. При нажатии на маркер открывается подробная информация. Кнопка «Обновить данные» подтягивает свежее состояние из API.

> Проект запускается **только в браузере**.

---

## Содержание

- [Возможности](#возможности)
- [Стек технологий](#стек-технологий)
- [Структура проекта](#структура-проекта)
- [Клонирование репозитория](#клонирование-репозитория)
- [Установка и запуск](#установка-и-запуск)
- [Проверка корректной работы](#проверка-корректной-работы)
- [Git workflow](#git-workflow)
- [Теоретическая шпаргалка](#теоретическая-шпаргалка)

---

## Возможности

- Интерактивная карта (OpenStreetMap) с маркерами по участкам дорог.
- Цветовая индикация загруженности:
  - 🟢 **зелёный** — свободно;
  - 🟡 **жёлтый** — средняя загрузка;
  - 🔴 **красный** — пробка.
- Popup-окно прямо на карте и отдельная панель деталей под картой при выборе маркера (название, описание, уровень загрузки, скорость, время обновления).
- Кнопка **«Обновить данные»** — повторный запрос к API; отображается индикатор загрузки и обработка ошибок.
- Лаконичный дизайн, легенда уровней загрузки.

---

## Стек технологий

- **Vite** — быстрый сборщик
- **React** 18 + хуки `useState`, `useEffect`, `useCallback`.
- **react-leaflet** + **leaflet** — интерактивная карта на базе OpenStreetMap.
- API (`src/api/trafficApi.js`) — делает реальные сетевые запросы к Nominatim API (OpenStreetMap) для получения координат улиц, а уровень пробок генерируется локально (так как бесплатных API пробок без ключа не существует).

---

## Структура проекта

```
TrafficMapApp/
├── index.html                   # Точка входа HTML
├── package.json                 # Зависимости и скрипты
├── vite.config.js               # Конфигурация Vite
├── .gitignore
├── README.md
└── src/
    ├── main.jsx                 # Точка входа React
    ├── App.jsx                  # Корневой компонент
    ├── api/
    │   └── trafficApi.js        # Запросы к Nominatim API + LEVEL_META
    ├── components/
    │   ├── TrafficMap.jsx       # MapContainer + CircleMarker + Popup
    │   ├── Legend.jsx           # Легенда цветов
    │   └── SegmentDetails.jsx   # Панель деталей выбранного участка
    └── screens/
        └── MapScreen.jsx        # Основной экран: карта + кнопка обновления
```

---

## Клонирование репозитория

```bash
# По HTTPS
git clone https://github.com/<username>/TrafficMapApp.git

# Или по SSH
git clone git@github.com:<username>/TrafficMapApp.git

cd TrafficMapApp
```

> Замените `<username>` на имя владельца репозитория.

---

## Установка и запуск

### 1. Установить Node.js

- Node.js версии 18+ (рекомендуется LTS): https://nodejs.org/

Проверка:

```bash
node -v
npm -v
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Запустить проект в браузере

```bash
npm run dev
```

Команда откроет приложение по адресу вида `http://localhost:5173`.
Если вкладка не открылась автоматически — перейдите по этому URL вручную.

### 4. (Опционально) Собрать статическую версию

```bash
npm run build
```

Готовая сборка появится в `dist/` — можно разместить на любом статическом хостинге (GitHub Pages, Netlify, Vercel и т.д.).

---

## Проверка корректной работы

После запуска в браузере убедитесь, что:

1. Отображается карта Москвы с 5 цветными маркерами по основным магистралям.
2. Каждый маркер окрашен в один из трёх цветов: зелёный / жёлтый / красный.
3. Под заголовком виден ряд легенды с подписями уровней загрузки.
4. Клик по маркеру открывает popup на карте, а под картой появляется панель с подробной информацией: название, описание, уровень загрузки, скорость, время обновления.
5. Нажатие кнопки **«Обновить данные»** показывает индикатор загрузки и обновляет цвета маркеров и время последнего обновления.

---

## Git workflow

Для прозрачной истории изменений используется упрощённая модель Git Flow.

### Ветки

- **`master`** (или `main`) — стабильная, продакшн-ready версия. Сюда попадает только проверенный код.
- **`develop`** — основная ветка разработки. В неё сливаются завершённые `feature`-ветки.
- **`feature/<имя>`** — ветки для отдельных фич. Создаются от `develop`, мержатся обратно в `develop`.

### Пример рабочего процесса

```bash
# Развёртывание develop от master
git checkout master
git pull
git checkout -b develop
git push -u origin develop

# Новая фича
git checkout develop
git checkout -b feature/map-screen

# Атомарные коммиты в процессе работы
git add src/components/TrafficMap.jsx
git commit -m "feat(map): add MapContainer with OSM tile layer"

git add src/components/TrafficMap.jsx src/api/trafficApi.js
git commit -m "feat(map): render colored CircleMarker per road segment"

git add src/components/TrafficMap.jsx src/components/SegmentDetails.jsx
git commit -m "feat(map): show segment details on marker click"

git add src/screens/MapScreen.jsx
git commit -m "feat(map): add refresh button with loading state"

# Пуш на удалённый репозиторий
git push -u origin feature/map-screen

# После ревью — мерж в develop через Pull/Merge Request
# При релизе develop сливается в master с тегом версии (например, v1.0.0)
```

### Принципы атомарных коммитов

- Один коммит = одно логическое изменение.
- Сообщение коммита кратко описывает **что** и **почему**.
- Рекомендуется формат **Conventional Commits**: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `chore:`.
- Каждый коммит должен оставлять проект в рабочем состоянии.

### Примеры осмысленных сообщений

```
feat(api): add fetchTrafficData with real Nominatim API calls
feat(map): render colored markers for free/medium/jam
feat(ui): add refresh button and loading indicator
fix(api): handle network errors gracefully
docs(readme): describe project setup and git workflow
```

---

## Теоретическая шпаргалка

### Карты: `react-leaflet`

В нашем веб-проекте используется **`react-leaflet`** — тонкая обёртка над библиотекой Leaflet для React.

- `<MapContainer center={[lat, lng]} zoom={...}>` — корневой компонент карты.
- `<TileLayer url="..." />` — источник тайлов (например, OpenStreetMap).
- `<Marker>` / `<CircleMarker>` — маркер; обработчик клика передаётся через `eventHandlers={{ click: ... }}`.
- `<Popup>` — всплывающее окно, рендерится при клике на маркер.

### Запросы к API: `fetch`

**`fetch`** — встроенный браузерный API:

```js
const res = await fetch('https://example.com/api/traffic');
if (!res.ok) {
  throw new Error(`HTTP ${res.status}`);
}
const data = await res.json();
```

Особенности:

- Возвращает `Promise`. Первый `await` — на ответ, второй `await res.json()` — на разбор тела.
- `fetch` **не выбрасывает** ошибку для статусов 4xx/5xx — нужно проверять `res.ok`.
- Поддерживает методы (`method`), заголовки (`headers`), тело (`body: JSON.stringify(...)`).

В этом проекте используется паттерн `fetch`-стиля, и делается настоящий сетевой запрос к публичному API Nominatim (OpenStreetMap) для получения реальных координат улиц Москвы.

### Обновление состояний: `useState`, `useEffect`, `useCallback`

- **`useState(initial)`** — добавляет локальное состояние в функциональный компонент. Возвращает `[value, setValue]`. Вызов сеттера триггерит повторный рендер. Состояние **иммутабельно**: для массивов/объектов создавайте новый экземпляр.

- **`useEffect(fn, deps)`** — побочные эффекты (запросы, подписки, таймеры). Запускается после рендера. Зависимостный массив `deps` определяет, когда повторно выполнять эффект:
  - `[]` — один раз после монтирования;
  - `[x, y]` — каждый раз, когда меняется `x` или `y`;
  - без массива — после каждого рендера.

- **`useCallback(fn, deps)`** — мемоизирует функцию между рендерами. Полезно, когда функция передаётся вниз как зависимость или проп, чтобы избежать лишних эффектов/рендеров.

---

## Лицензия

Учебный проект. Используйте свободно.
