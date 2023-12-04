# OptimacrosTestTask CLI Application

## Запуск приложения

### Запуск контейнеров

Запустите контейнеры с помощью Docker Compose:

```bash
docker-compose up --build
```

### Подключение к контейнеру клиента

После запуска контейнеров, подключитесь к контейнеру клиента в интерактивном режиме:

```bash
docker exec -it optimacrostesttask_client_1 sh
```

### Использование CLI-приложения

#### Просмотр доступных команд

Внутри контейнера перейдите в папку `dist` и выполните команду `--help` для просмотра доступных команд:

```bash
cd dist
node index.js --help
```

#### Примеры команд

1. **Добавление нового автомобиля:**

   ```bash
   node index.js add-car Toyota Corolla 2018 20000 TestUser TestPass
   ```

2. **Список всех автомобилей:**

   ```bash
   node index.js list-cars TestUser TestPass
   ```

3. **Список автомобилей по марке:**

   ```bash
   node index.js list-cars-by-brand Toyota TestUser TestPass
   ```

4. **Обновление информации об автомобиле:**

   Замените `<id>` на идентификатор автомобиля, который вы хотите обновить.

   ```bash
   node index.js update-car <id> Toyota Camry 2019 21000 TestUser TestPass
   ```

5. **Удаление автомобиля:**

   Замените `<id>` на идентификатор автомобиля, который вы хотите удалить.

   ```bash
   node index.js delete-car <id> TestUser TestPass
   ```
```