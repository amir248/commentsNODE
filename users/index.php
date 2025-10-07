<?php
// Параметры подключения
$host = 'localhost';
$port = '5432';
$dbname = 'excellent';
$user = 'pguser';
$password = 'Gfhjkm123';

// Строка подключения
$connection_string = "host={$host} port={$port} dbname={$dbname} user={$user} password={$password}";

// Подключение к базе данных
$conn = pg_connect($connection_string);
if (!$conn) {
    echo "Ошибка подключения: " . pg_last_error();
    exit;
}
echo "Успешное подключение!";

// Пример выполнения запроса
$query = "SELECT * FROM users";
$result = pg_query($conn, $query);
if (!$result) {
    echo "Ошибка выполнения запроса: " . pg_last_error();
    exit;
}

while ($row = pg_fetch_assoc($result)) {
    echo "ID: " . $row['id'] . ", Имя: " . $row['name'] . "<br>";
}

// Освобождение памяти и закрытие соединения
pg_free_result($result);
pg_close($conn);
?>
<html>
    <p>oK</p>
</html>