# Хочу Яхту

React-додаток крипто-спільноти «Хочу Яхту» з адаптивними сторінками, світлою та
темною темами, а також централізованим станом через Redux Toolkit.

## Архітектура

- **components/** — презентаційні компоненти (хедер, футер, перемикач теми).
- **containers/** — сторінкові компоненти з логікою відображення та підключенням до Redux.
- **slices/** — Redux slices, що інкапсулюють стан та редʼюсери.
- **resources/** — статичні дані для демо-контенту (пости, стейкінг, launchpool).
- **styles/** — глобальні стилі та дизайн-токени.

## Запуск локально

1. Встановіть залежності:

   ```bash
   npm install
   ```

   > Якщо доступ до npm registry обмежений, перегляньте [інструкцію з розблокування](docs/npm-access.md)
   > або встановіть необхідні пакети вручну в офлайн-режимі.

2. Запустіть dev-сервер Vite:

   ```bash
   npm run dev
   ```

3. Відкрийте застосунок за адресою, яку виведе консоль (типово
   [http://localhost:5173](http://localhost:5173)).

## Скрипти

- `npm run dev` — локальний дев-сервер із hot-reload.
- `npm run build` — продакшн-збірка.
- `npm run preview` — попередній перегляд продакшн-збірки.
- `npm run lint` — запуск ESLint з базовою конфігурацією React.

## API-сервер

Для роботи API необхідно налаштувати URL-адреси біржових ендпоінтів через змінні середовища. Кожна змінна приймає один або кілька URL, розділених комами. Якщо вказано декілька адрес, запити будуть виконуватися по черзі до першого успішного.

| Змінна | Призначення |
| --- | --- |
| `BINANCE_LAUNCHPOOL_ENDPOINTS` | Проєкти Binance Launchpool |
| `BINANCE_EARN_ENDPOINTS` | Продукти Binance Earn |
| `BINANCE_STAKING_ENDPOINTS` | Продукти Binance Staking |
| `BITGET_LAUNCHPOOL_ENDPOINTS` | Проєкти Bitget Launchpool |
| `BITGET_EARN_ENDPOINTS` | Продукти Bitget Earn |
| `BYBIT_LAUNCHPOOL_ENDPOINTS` | Проєкти Bybit Launchpool |
| `BYBIT_EARN_ENDPOINTS` | Продукти Bybit Earn |
| `KRAKEN_STAKING_ENDPOINTS` | Продукти Kraken Staking |
| `MEXC_LAUNCHPOOL_ENDPOINTS` | Проєкти MEXC Launchpool |
| `MEXC_EARN_ENDPOINTS` | Продукти MEXC Earn |
| `OKX_LAUNCHPOOL_ENDPOINTS` | Проєкти OKX Launchpool |
| `OKX_EARN_ENDPOINTS` | Продукти OKX Earn |
| `OKX_STAKING_ENDPOINTS` | Продукти OKX Staking |
| `WHITEBIT_LAUNCHPOOL_ENDPOINTS` | Проєкти WhiteBIT Launchpad |
| `WHITEBIT_EARN_ENDPOINTS` | Продукти WhiteBIT Earn |

Приклад файлу `.env`:

```env
BINANCE_LAUNCHPOOL_ENDPOINTS=https://example.com/binance/launchpool
BINANCE_EARN_ENDPOINTS=https://example.com/binance/earn
BINANCE_STAKING_ENDPOINTS=https://example.com/binance/staking
BITGET_LAUNCHPOOL_ENDPOINTS=https://example.com/bitget/launchpool
BITGET_EARN_ENDPOINTS=https://example.com/bitget/earn
BYBIT_LAUNCHPOOL_ENDPOINTS=https://example.com/bybit/launchpool
BYBIT_EARN_ENDPOINTS=https://example.com/bybit/earn
KRAKEN_STAKING_ENDPOINTS=https://example.com/kraken/staking
MEXC_LAUNCHPOOL_ENDPOINTS=https://example.com/mexc/launchpool
MEXC_EARN_ENDPOINTS=https://example.com/mexc/earn
OKX_LAUNCHPOOL_ENDPOINTS=https://example.com/okx/launchpool
OKX_EARN_ENDPOINTS=https://example.com/okx/earn
OKX_STAKING_ENDPOINTS=https://example.com/okx/staking
WHITEBIT_LAUNCHPOOL_ENDPOINTS=https://example.com/whitebit/launchpool
WHITEBIT_EARN_ENDPOINTS=https://example.com/whitebit/earn
```

> Для передачі змінних середовища при запуску API скористайтеся командою `PORT=4000 BINANCE_LAUNCHPOOL_ENDPOINTS=... npm run server` або створіть файл `.env` і завантажте його через менеджер процесів.
