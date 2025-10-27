# Roadmap - Система управления заказной разработкой

## Общая концепция

Платформа для управления проектами заказной разработки, где клиенты могут отслеживать прогресс, а администраторы управлять задачами, временем и счетами.

---

## Фаза 1: Расширение модели данных

### 1.1 Обновление Prisma схемы

**Новые модели:**

```prisma
// Юридическая информация клиента
model ClientProfile {
  id            String   @id @default(cuid())
  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id])

  // Тип клиента
  clientType    ClientType // INDIVIDUAL или LEGAL_ENTITY

  // Физлицо
  fullName      String?
  passport      String?
  inn           String?
  address       String?
  phone         String?

  // Юрлицо
  companyName   String?
  legalAddress  String?
  actualAddress String?
  companyInn    String?
  kpp           String?
  ogrn          String?
  bankName      String?
  bik           String?
  checkingAccount String?
  corrAccount   String?

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum ClientType {
  INDIVIDUAL      // Физлицо
  LEGAL_ENTITY    // Юрлицо
}

// Задачи в проекте
model Task {
  id            String   @id @default(cuid())
  projectId     String
  project       Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)

  title         String
  description   String?
  status        TaskStatus @default(TODO)
  priority      TaskPriority @default(MEDIUM)

  hoursEstimated Float?  // Оценка времени
  hoursSpent    Float    @default(0) // Фактически потрачено

  assignedToId  String?  // ID админа (опционально)
  assignedTo    User?    @relation(fields: [assignedToId], references: [id])

  createdById   String   // ID админа который создал
  createdBy     User     @relation("TaskCreator", fields: [createdById], references: [id])

  completedAt   DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  timeEntries   TimeEntry[]

  @@index([projectId])
  @@index([status])
}

enum TaskStatus {
  TODO          // К выполнению
  IN_PROGRESS   // В работе
  REVIEW        // На проверке
  COMPLETED     // Завершено
  CANCELLED     // Отменено
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

// Учет времени по задачам
model TimeEntry {
  id          String   @id @default(cuid())
  taskId      String
  task        Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)

  userId      String   // Кто работал (админ)
  user        User     @relation(fields: [userId], references: [id])

  hours       Float    // Количество часов
  description String?  // Что делали
  date        DateTime @default(now()) // Дата работы

  createdAt   DateTime @default(now())

  @@index([taskId])
  @@index([userId])
}

// Счета на оплату
model Invoice {
  id            String   @id @default(cuid())
  projectId     String
  project       Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)

  invoiceNumber String   @unique // INV-2024-001

  status        InvoiceStatus @default(DRAFT)

  // Суммы
  subtotal      Float    // Сумма без НДС
  vatRate       Float    @default(0) // Ставка НДС (например 20)
  vatAmount     Float    @default(0) // Сумма НДС
  total         Float    // Итого к оплате

  // Описание работ
  description   String?

  // Даты
  issueDate     DateTime @default(now())
  dueDate       DateTime? // Срок оплаты
  paidAt        DateTime?

  // PDF файл счета
  pdfUrl        String?

  items         InvoiceItem[]

  createdById   String
  createdBy     User     @relation(fields: [createdById], references: [id])

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([projectId])
  @@index([status])
}

enum InvoiceStatus {
  DRAFT         // Черновик
  SENT          // Отправлен клиенту
  PAID          // Оплачен
  OVERDUE       // Просрочен
  CANCELLED     // Отменен
}

// Позиции счета
model InvoiceItem {
  id          String   @id @default(cuid())
  invoiceId   String
  invoice     Invoice  @relation(fields: [invoiceId], references: [id], onDelete: Cascade)

  description String   // Описание услуги
  quantity    Float    // Количество (часы, штуки)
  unitPrice   Float    // Цена за единицу
  total       Float    // Итого

  taskId      String?  // Опционально связь с задачей
  task        Task?    @relation(fields: [taskId], references: [id])

  @@index([invoiceId])
}

// Обновление модели Project
model Project {
  // ... существующие поля

  status        ProjectStatus @default(ACTIVE)
  budget        Float?        // Бюджет проекта
  hourlyRate    Float?        // Ставка за час

  tasks         Task[]
  invoices      Invoice[]
}

enum ProjectStatus {
  ACTIVE        // Активный
  ON_HOLD       // Приостановлен
  COMPLETED     // Завершен
  CANCELLED     // Отменен
}

// Обновление модели User
model User {
  // ... существующие поля

  clientProfile    ClientProfile?
  assignedTasks    Task[]         @relation
  createdTasks     Task[]         @relation("TaskCreator")
  timeEntries      TimeEntry[]
  createdInvoices  Invoice[]
}
```

### 1.2 Миграции

- Создать миграцию для новых моделей
- Заполнить дефолтные значения для существующих проектов

---

## Фаза 2: API (GraphQL)

### 2.1 Client Profile API

**Mutations:**
- `updateClientProfile` - Обновление профиля клиента (юр/физ лицо)
- `setClientType` - Установка типа клиента

**Queries:**
- `myClientProfile` - Получить свой профиль
- `clientProfile(userId)` - Админ получает профиль клиента

### 2.2 Tasks API

**Mutations (админ):**
- `createTask` - Создать задачу в проекте
- `updateTask` - Обновить задачу
- `updateTaskStatus` - Изменить статус
- `deleteTask` - Удалить задачу

**Queries:**
- `projectTasks(projectId)` - Задачи проекта (клиент видит свои, админ - все)
- `task(id)` - Детали задачи

### 2.3 Time Tracking API

**Mutations (админ):**
- `addTimeEntry` - Добавить затраченное время
- `updateTimeEntry` - Обновить запись времени
- `deleteTimeEntry` - Удалить запись

**Queries:**
- `taskTimeEntries(taskId)` - Записи времени по задаче
- `projectTimeReport(projectId)` - Отчет по времени проекта

### 2.4 Invoices API

**Mutations (админ):**
- `createInvoice` - Создать счет
- `updateInvoice` - Обновить счет
- `updateInvoiceStatus` - Изменить статус счета
- `generateInvoicePDF` - Сгенерировать PDF счета
- `deleteInvoice` - Удалить счет

**Queries:**
- `projectInvoices(projectId)` - Счета по проекту
- `invoice(id)` - Детали счета
- `myInvoices` - Счета текущего пользователя (клиент)

### 2.5 Projects API (расширение)

**Mutations:**
- `updateProjectStatus` - Изменить статус проекта
- `updateProjectBudget` - Обновить бюджет и ставку

**Queries:**
- `projectStats(id)` - Статистика проекта (часы, бюджет, счета)

---

## Фаза 3: UI - Личный кабинет клиента

### 3.1 Профиль клиента

**Страница:** `/profile/legal-info`

**Функционал:**
- Выбор типа: Физлицо / Юрлицо
- Форма для физлица:
  - ФИО
  - Паспортные данные
  - ИНН
  - Адрес регистрации
  - Телефон
- Форма для юрлица:
  - Название организации
  - ИНН, КПП, ОГРН
  - Юридический адрес
  - Фактический адрес
  - Банковские реквизиты (БИК, расчетный счет, корр. счет)
  - Название банка

### 3.2 Детальная страница проекта

**Страница:** `/projects/[id]`

**Разделы:**

1. **Обзор проекта**
   - Название, описание
   - Статус, прогресс
   - Бюджет, потрачено
   - Статистика (часы, задачи)

2. **Задачи** (таб)
   - Список задач с фильтрами (статус, приоритет)
   - Карточки задач:
     - Название, описание
     - Статус (бейджи с цветами)
     - Приоритет
     - Оценка vs Факт часов
     - Прогресс-бар
   - Детали задачи (модалка):
     - Полное описание
     - История времени
     - Комментарии

3. **Счета** (таб)
   - Список счетов
   - Карточки счетов:
     - Номер счета
     - Дата выставления
     - Сумма
     - Статус (draft/sent/paid/overdue)
     - Кнопка скачать PDF
   - Детали счета (модалка):
     - Позиции счета
     - Итоговые суммы
     - Даты (выставлен, оплатить до, оплачен)

4. **Активность** (таймлайн)
   - Лента событий:
     - Создана задача
     - Изменен статус задачи
     - Выставлен счет
     - Оплачен счет

### 3.3 Дашборд клиента

**Обновить:** `/dashboard`

**Добавить:**
- Активные проекты с прогрессом
- Статистика:
  - Всего проектов
  - Активных задач
  - Неоплаченных счетов
  - Общая сумма долга
- Последние задачи
- Последние счета
- Уведомления

---

## Фаза 4: UI - Админ-панель

### 4.1 Управление клиентами

**Страница:** `/admin/clients`

**Функционал:**
- Список всех клиентов
- Просмотр профиля клиента
- Просмотр юридической информации
- Список проектов клиента
- Общая статистика по клиенту

### 4.2 Управление проектами

**Страница:** `/admin/projects`

**Функционал:**
- Список всех проектов
- Фильтры: статус, клиент, дата
- Создание проекта для клиента
- Редактирование проекта:
  - Установка бюджета
  - Установка ставки за час
  - Изменение статуса

**Страница:** `/admin/projects/[id]`

**Функционал:**

1. **Обзор**
   - Информация о клиенте
   - Статус, бюджет, прогресс
   - Статистика (часы, задачи, счета)

2. **Управление задачами**
   - Создание задачи
   - Редактирование задачи
   - Изменение статуса
   - Назначение на админа
   - Установка приоритета
   - Оценка времени

3. **Учет времени**
   - Добавление времени к задаче
   - Редактирование записей времени
   - Фильтры: задача, дата, админ
   - Отчет по времени (таблица, графики)

4. **Счета**
   - Создание счета:
     - Автоподстановка работ из задач
     - Ручное добавление позиций
     - Расчет НДС
     - Установка срока оплаты
   - Редактирование счета
   - Изменение статуса
   - Генерация PDF
   - Отправка клиенту (email)

5. **Активность**
   - Полный таймлайн проекта

### 4.3 Финансы

**Страница:** `/admin/finances`

**Функционал:**
- Дашборд финансов:
  - Общая выручка
  - Ожидается к оплате
  - Просроченные счета
  - Доход по месяцам (график)
- Все счета (таблица):
  - Фильтры: статус, клиент, дата
  - Сортировка
  - Экспорт в Excel
- Аналитика:
  - По клиентам
  - По проектам
  - По периодам

### 4.4 Отчеты

**Страница:** `/admin/reports`

**Отчеты:**
- Отчет по времени:
  - По проектам
  - По сотрудникам
  - За период
- Отчет по задачам:
  - Completion rate
  - Среднее время выполнения
  - Задачи в работе
- Финансовый отчет:
  - Выручка за период
  - По клиентам
  - По проектам
- Экспорт в PDF/Excel

---

## Фаза 5: Автоматизация и уведомления

### 5.1 Email уведомления

**Клиенту:**
- Создана новая задача в проекте
- Задача завершена
- Выставлен новый счет
- Счет скоро истекает
- Добро пожаловать (после регистрации)

**Админу:**
- Клиент зарегистрировался
- Клиент заполнил юридическую информацию
- Счет оплачен

### 5.2 In-app уведомления

**Модель:**
```prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  type      String   // task_created, invoice_sent, etc
  title     String
  message   String
  link      String?  // Ссылка на объект

  read      Boolean  @default(false)

  createdAt DateTime @default(now())

  @@index([userId, read])
}
```

**UI:**
- Колокольчик в хедере с счетчиком
- Dropdown с последними уведомлениями
- Страница всех уведомлений

### 5.3 Auto-статусы

- Счет автоматически становится OVERDUE если не оплачен до dueDate
- Задача автоматически COMPLETED когда статус изменен на завершено
- Проект автоматически COMPLETED когда все задачи завершены (опция)

---

## Фаза 6: Генерация документов

### 6.1 PDF счета

**Библиотека:** `@react-pdf/renderer` или `puppeteer`

**Шаблон счета:**
- Шапка с логотипом Biveki
- Реквизиты исполнителя
- Реквизиты заказчика (из ClientProfile)
- Таблица работ/услуг
- Итого, НДС, всего к оплате
- Подпись, печать

**API:**
- `generateInvoicePDF(invoiceId)` - генерирует и сохраняет в S3
- Возвращает URL на файл

### 6.2 Акт выполненных работ

**Шаблон:**
- Аналогично счету
- Список выполненных задач за период
- Итоговая стоимость

### 6.3 Договор (опционально)

**Шаблон договора на оказание услуг:**
- Автозаполнение из ClientProfile
- Генерация PDF

---

## Фаза 7: Расширенный функционал

### 7.1 Комментарии и обсуждения

**Модель:**
```prisma
model Comment {
  id        String   @id @default(cuid())
  taskId    String?
  task      Task?    @relation(fields: [taskId], references: [id])

  userId    String
  user      User     @relation(fields: [userId], references: [id])

  content   String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([taskId])
}
```

**Функционал:**
- Комментарии к задачам
- Клиент может задавать вопросы
- Админ может отвечать
- Real-time обновления (опционально WebSockets)

### 7.2 Файлы и вложения

**Модель:**
```prisma
model Attachment {
  id        String   @id @default(cuid())
  taskId    String?
  task      Task?    @relation(fields: [taskId], references: [id])
  projectId String?
  project   Project? @relation(fields: [projectId], references: [id])

  name      String
  url       String
  size      Int
  mimeType  String

  uploadedById String
  uploadedBy   User   @relation(fields: [uploadedById], references: [id])

  createdAt DateTime @default(now())

  @@index([taskId])
  @@index([projectId])
}
```

**Функционал:**
- Загрузка файлов к задачам
- Загрузка файлов к проектам
- Превью изображений
- Скачивание файлов

### 7.3 Канбан-доска

**Страница:** `/admin/projects/[id]/board`

**Функционал:**
- Drag-and-drop задачи между столбцами (TODO, IN_PROGRESS, REVIEW, COMPLETED)
- Быстрое создание задач
- Фильтры и поиск

### 7.4 Календарь и дедлайны

**Добавить к Task:**
- `dueDate` - срок выполнения
- `startDate` - дата начала

**Страница:** `/admin/calendar`

**Функционал:**
- Календарь с задачами
- Цветовая кодировка по проектам
- Просроченные задачи

### 7.5 Шаблоны задач

**Функционал:**
- Создание шаблонов типовых задач
- Быстрое создание из шаблона
- Библиотека шаблонов

### 7.6 Теги и категории

**Модель:**
```prisma
model Tag {
  id    String @id @default(cuid())
  name  String @unique
  color String
  tasks Task[]
}
```

**Функционал:**
- Теги для задач (frontend, backend, design, bug, feature)
- Фильтрация по тегам
- Цветовые метки

---

## Фаза 8: Аналитика и Dashboard

### 8.1 Админский дашборд

**Страница:** `/admin/dashboard`

**Виджеты:**
- KPI карточки:
  - Активных проектов
  - Задач в работе
  - Счетов к оплате
  - Доход за месяц
- Графики:
  - Доход по месяцам
  - Часы по проектам
  - Задачи по статусам
- Списки:
  - Последние задачи
  - Просроченные счета
  - Новые клиенты

### 8.2 Графики и визуализация

**Библиотеки:** `recharts` или `chart.js`

**Графики:**
- Burndown chart для проектов
- Velocity chart (скорость выполнения задач)
- Timeline выполнения проекта
- Распределение времени по задачам

---

## Фаза 9: Интеграции

### 9.1 Email интеграция

**Провайдер:** уже есть SMTP

**Функционал:**
- Отправка счетов клиентам
- Напоминания об оплате
- Уведомления о задачах

### 9.2 Payment gateway (опционально)

**Провайдеры:** ЮKassa, Stripe, PayPal

**Функционал:**
- Оплата счетов онлайн
- Автоматическое изменение статуса при оплате
- Webhook обработка

### 9.3 Календарь (опционально)

**Google Calendar / iCal**

**Функционал:**
- Синхронизация дедлайнов задач
- Экспорт календаря проекта

---

## Фаза 10: Мобильная версия и PWA

### 10.1 Адаптивная верстка

- Оптимизация всех страниц под мобилки
- Touch-friendly интерфейсы
- Мобильная навигация

### 10.2 PWA

**Конфигурация:**
- Service Worker
- Manifest.json
- Offline-режим (кэширование)
- Push-уведомления

---

## Приоритеты разработки

### MVP (Minimum Viable Product)

**Must have для запуска:**
1. ✅ Регистрация/авторизация
2. ✅ Профиль пользователя
3. ✅ Создание проектов
4. ⚠️ Юридическая информация клиента
5. ⚠️ Задачи в проектах (CRUD)
6. ⚠️ Учет времени по задачам
7. ⚠️ Счета (создание, статусы, PDF)
8. ⚠️ Просмотр проекта клиентом
9. ⚠️ Email уведомления

### V2 (После MVP)

10. In-app уведомления
11. Комментарии к задачам
12. Файлы и вложения
13. Финансовая аналитика
14. Отчеты

### V3 (Future)

15. Канбан-доска
16. Календарь и дедлайны
17. Теги и категории
18. Payment gateway
19. PWA

---

## Технические задачи

### Сейчас нужно сделать:

1. **Обновить схему Prisma** (добавить все новые модели)
2. **Создать миграции**
3. **Написать GraphQL API** для:
   - ClientProfile
   - Tasks
   - TimeEntry
   - Invoices
4. **Создать UI страницы:**
   - `/profile/legal-info` - юридическая информация
   - `/projects/[id]` - детальная страница проекта
   - `/admin/projects/[id]` - админка проекта с задачами
   - `/admin/invoices` - управление счетами
5. **Настроить PDF генерацию** счетов
6. **Настроить Email** уведомления

---

## Метрики успеха

**KPI системы:**
- Время создания счета: < 2 минут
- Конверсия отправленных счетов в оплаченные: > 80%
- Среднее время ответа на задачу: < 24 часа
- Удовлетворенность клиентов: > 4.5/5

---

## Заметки

- Все денежные суммы хранить в копейках (Int) или Decimal
- Даты хранить в UTC
- Файлы хранить в S3 (уже настроено)
- Использовать транзакции для операций со счетами
- Логировать все изменения статусов (audit log)
- Регулярные бэкапы БД

---

**Дата создания:** 2025-10-25
**Версия:** 1.0
**Автор:** Claude Code
