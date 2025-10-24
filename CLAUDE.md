# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Обзор проекта

Это приложение Next.js 15 для Biveki Group. Проект включает GraphQL API, систему аутентификации, управление кейсами и админ-панель.

## Команды для разработки

### Основные операции
- `npm run dev` - Запустить dev-сервер с Turbopack
- `npm run build` - Собрать продакшн-билд с Turbopack
- `npm start` - Запустить продакшн-сервер
- `npm run lint` - Запустить ESLint
- `npm run codegen` - Сгенерировать TypeScript типы из GraphQL схемы

### Работа с базой данных
- `npx prisma migrate dev` - Создать и применить миграции в dev-окружении
- `npx prisma migrate deploy` - Применить миграции в продакшне
- `npx prisma generate` - Сгенерировать Prisma Client
- `npx prisma studio` - Открыть GUI для базы данных

### Docker
- `docker-compose up -d` - Запустить продакшн-контейнер (требуется `stack.env`)
- Приложение доступно на порту 3022 снаружи, 3000 внутри контейнера

## Архитектура

### Структура GraphQL API
Весь GraphQL API находится в [src/app/api/graphql/route.ts](src/app/api/graphql/route.ts) с использованием Apollo Server. Этот файл содержит:
- Определения схемы (typeDefs) в виде inline GraphQL строк
- Все резолверы для запросов и мутаций
- Zod схемы для валидации входных данных
- Логику rate limiting (120 запросов за 60 секунд на IP)
- Управление сессиями через cookies
- Контекст аутентификации из JWT cookies

**Важно:** При изменении GraphQL API:
1. Обновить typeDefs и резолверы в `route.ts`
2. Обновить [schema.graphql](schema.graphql) в соответствии с изменениями
3. Запустить `npm run codegen` для регенерации TypeScript типов
4. Сгенерированные типы появятся в `src/graphql/generated.ts`

### Схема аутентификации
- JWT токены создаются с помощью библиотеки `jose`, хранятся в HTTP-only cookies
- Валидация сессий в [src/lib/auth.ts](src/lib/auth.ts)
- Middleware в [src/middleware.ts](src/middleware.ts) защищает `/dashboard`, `/profile`, `/admin/*`
- GraphQL контекст извлекает пользователя из session cookie
- Админские операции проверяют поле `isAdmin` из базы данных

### Схема базы данных
Используется Prisma с PostgreSQL ([prisma/schema.prisma](prisma/schema.prisma)):
- **User**: Аутентификация, флаг админа, владеет Projects и Cases
- **Contact**: Обращения с формы контактов
- **Project**: Проекты, созданные пользователями
- **Case**: Кейсы с enum ServiceCategory и флагом published
- **CaseMedia**: Изображения/видео для кейсов с сортировкой

Email-адреса в переменной `ADMIN_EMAILS` автоматически получают права админа при регистрации.

### Загрузка файлов
[src/app/api/upload/route.ts](src/app/api/upload/route.ts) обрабатывает загрузку файлов:
- Приоритет: AWS S3 (или S3-совместимое хранилище типа Timeweb Cloud)
- Fallback: Локальная директория `public/uploads/`
- Требуется аутентифицированная админская сессия
- Возвращает публичный URL загруженного файла

Конфигурация S3 ([src/lib/s3.ts](src/lib/s3.ts)):
- `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_BUCKET`
- `S3_PUBLIC_URL` - публичный базовый URL для доступа к файлам
- Использует `forcePathStyle: true` для S3-совместимых сервисов

### Структура страниц
- **Публичные страницы**: `/`, `/cases`, `/cases/[slug]`, `/about`, `/blog`, `/careers`, `/contacts` и др.
- **Требуют авторизации**: `/dashboard`, `/profile`
- **Только для админов**: `/admin/cases`, `/admin/users`, `/admin/contacts`
- Админский layout ([src/app/admin/layout.tsx](src/app/admin/layout.tsx)) проверяет статус админа

### GraphQL на клиенте
- Apollo Client настроен в [src/lib/apollo.ts](src/lib/apollo.ts)
- Запросы/мутации используют сгенерированные хуки из codegen
- Клиент автоматически отправляет cookies через `credentials: "same-origin"`

## Переменные окружения

Обязательные для продакшна (см. `stack.env` для деплоя):
- `DATABASE_URL` - Строка подключения к PostgreSQL
- `JWT_SECRET` - Секрет для подписи session токенов (по умолчанию: "dev-secret-change-me")
- `ADMIN_EMAILS` - Email-адреса через запятую для автоматических прав админа (например, "admin@example.com,owner@example.com")
- `S3_ENDPOINT` - URL эндпоинта S3 или S3-совместимого хранилища
- `S3_REGION` - AWS регион (по умолчанию: "us-east-1")
- `S3_ACCESS_KEY` - Access key для S3
- `S3_SECRET_KEY` - Secret key для S3
- `S3_BUCKET` - Имя S3 bucket
- `S3_PUBLIC_URL` - Публичный URL префикс для S3 файлов (например, "https://s3.twcstorage.ru")
- `INTERNAL_API_URL` - URL для server-side API вызовов (по умолчанию: "http://127.0.0.1:3000")

Опциональные:
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` - Отправка email уведомлений ([src/lib/mailer.ts](src/lib/mailer.ts))

## Конфигурация Next.js

Настройки в [next.config.ts](next.config.ts):
- `output: 'standalone'` для Docker деплоя
- ESLint и TypeScript ошибки игнорируются при билде (намеренно для деплоймента)
- Разрешены remote изображения с `s3.twcstorage.ru`

## Ключевые паттерны

### Добавление новых GraphQL операций
1. Добавить type/mutation в typeDefs в [src/app/api/graphql/route.ts](src/app/api/graphql/route.ts)
2. Добавить Zod схему для валидации
3. Реализовать резолвер с Prisma запросами
4. Обновить [schema.graphql](schema.graphql) в соответствии
5. Запустить `npm run codegen`

### Создание админских страниц
1. Создать страницу в `src/app/admin/`
2. Автоматически защищена middleware
3. Проверять `isAdmin` в GraphQL мутациях/запросах на сервере
4. Использовать Apollo Client хуки из codegen для загрузки данных

### Добавление моделей в БД
1. Обновить [prisma/schema.prisma](prisma/schema.prisma)
2. Запустить `npx prisma migrate dev --name описание_изменения`
3. Добавить GraphQL типы и резолверы
4. Обновить schema.graphql и запустить codegen

### Работа с Cases
Кейсы используют slug-based URL структуру. Медиа управляется через мутацию `setCaseMedia`, которая заменяет всё медиа для кейса. Флаг `published` контролирует публичную видимость (админы видят все).

## Важные замечания

- Приложение игнорирует TypeScript и ESLint ошибки при продакшн билдах - исправляйте проблемы локально перед деплоем
- GraphQL схема намеренно inline в route.ts для простоты, не разделена на отдельные файлы
- Rate limiting работает в памяти и сбрасывается при перезапуске сервера
- Использует Turbopack для более быстрой разработки и сборки
