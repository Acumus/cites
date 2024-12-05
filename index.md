<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cites Mèdiques</title>
    <link rel="shortcut icon" href="icon-512.png">
    <link rel="stylesheet" href="styles.css">
    <link rel="manifest" href="manifest.json">
<script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(() => console.log('Service Worker registrado'));
    }
</script>

</head>
<body>
    <div class="container">
        <h1>Cites Mèdiques</h1>
        <form id="appointmentForm">
            <label for="date">Data:</label>
            <input type="date" id="date" required>
            
            <label for="time">Hora:</label>
            <input type="time" id="time" required>
            
            <label for="description">Descripció:</label>
            <input type="text" id="description" placeholder="ex: consulta" required>
            
            <button type="submit" id="addButton">Agregar Cita</button>
        </form>
        <h2>Les meves cites</h2>
        <ul id="appointmentList"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>


