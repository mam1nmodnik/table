

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/style/style.css">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=" crossorigin="anonymous"></script>
</head>
<body>
    <div class="container">
        <div class="container-form">
            <form id="newProduct" name="">
                <label for="manufacturer">Производитель</label>
                <input type="text" name="manufacturer"  placeholder="Производитель">
                <label for="name">Наименование</label>
                <input type="text" name="name" placeholder="Наименование">
                <label for="price" >Цена</label>
                <input type="text" name="price" placeholder="Цена">
                <label for="quantity" >Количество</label>
                <input type="number" min="1" name="quantity" placeholder="Количество">    
            </form>
            <button type="submit" id="button">Добавить</button>
            
            <div id="popup-overlay"></div>

            <div class="table-wrap">
                <table id="table">
                    <thead>
                    <tr>
                        <th data-filter="1">Производитель</th>
                        <th data-filter="2">Наименование</th>
                        <th data-filter="3">Цена</th>
                        <th data-filter="4">Количество</th>
                    </tr>
                    </thead>
                    <tbody class="order" id="order"></tbody>
                </table>
                <div id="sumBlock"></div>
            </div>
        </div>
    </div>
    <script src="JavaScript/script.js"></script>
</body>
</html>