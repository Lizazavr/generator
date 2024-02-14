form.addEventListener('submit', getFormValue);

form_generates.addEventListener('submit', getFormValue_one);

var numx = 0;
var flag = 0;

// функция отображения блока создания нового генератора
function show(event){
document.getElementById('form').style.display = 'block';
}

function doFunction(event) {
    data_go('upload', 'upload');
    document.getElementById('modal').style.display = 'none';
}

function check_name(name_gen) {
    var ddl = document.getElementById('select_generate');

    for (i = 0; i < ddl.options.length; i++) {
        if (name_gen == ddl.options[i].value){

            return false
        }
    }
    return true
}

// функция получения выбранного генератора
function getFormValue_one(event) {
    if (flag == false){
        flag = true
        document.getElementById('start').value = 'Остановить';
        document.getElementById('gen').style.display = 'block';
        event.preventDefault();
        var generate = document.getElementById('select_generate').value;
        //if (generate){
            //document.getElementById('modal').style.display = 'block';
        data_go(generate, 'name')
        //}
    } else {
        flag = false
        document.getElementById('start').value = 'Запустить';
        document.getElementById('gen').style.display = 'none';
        data_go(1, 'stop')
    }
}

// функция получения данных для создания нового генератора
function getFormValue(event) {
    event.preventDefault();
    var name_gen = document.getElementById('name_gen').value;
    if (check_name(name_gen)){
    document.getElementById('valid').style.display = 'none';
    var dict_json = new Map();
    var o = {}; // object
    o["name_gen"] = name_gen;
    for (y = 0; y <= numx; y++) {
        var dict_one = new Map();
        var two = {};
        var name_pattern = document.getElementById('name_pattern_' + y).value;
        dict_one.set("name", name_pattern);
        two["name"] =  name_pattern;
        var pattern_type = document.getElementById('pattern_type_' + y).value;
        dict_one.set("type", pattern_type);
        two["type"] = pattern_type;

        var dict_two = new Map();

        three = {};
        if (pattern_type == 1) {
            var text_word = document.getElementById('text_word_' + y).value;
            dict_two.set("length", text_word);

            three["length"] = text_word;
            var select_word = document.getElementById('select_word_' + y).value;
            dict_two.set("reg", select_word);
            three["reg"] = select_word;
        } else if (pattern_type == 2) {
            var text_text = document.getElementById('text_text_' + y).value;
            dict_two.set("length", text_text);
            three["length"] = text_text;
            var count_text = document.getElementById('count_text_' + y).value;
            dict_two.set("count", count_text);
            three["count"] = count_text;
            var select_text = document.getElementById('select_text_' + y).value;
            dict_two.set("reg", select_text);
            three["reg"] = select_text;
        } else if (pattern_type == 3) {
            var text_number = document.getElementById('text_number_' + y).value;
            dict_two.set("length", text_number);
            three["length"] = text_number;
            var select_number = document.getElementById('select_number_' + y).value;
            dict_two.set("reg", select_number);
            three["reg"] = select_number;
        } else if (pattern_type == 4) {
            var text_name = document.getElementById('text_name_' + y).value;
            dict_two.set("length", text_name);
            three["length"] = text_name;
        } else if (pattern_type == 6) {
            var text_email = document.getElementById('text_email_' + y).value;
            dict_two.set("length", text_email)
            three["length"] = text_email;
        }
        else if (pattern_type == 7) {
            var text_math = document.getElementById('text_math_' + y).value;
            dict_two.set("formul", text_math)
            three["formul"] = text_math;
        }
        dict_one.set("patern", dict_two)

        two["pattern"] = three;

        o[y] = two;

        dict_json.set(y, dict_one)
    }
    data_go(o, 'list')
    } else {
        document.getElementById('valid').style.display = 'block';
    }
}

// функция добавления нового шалона
function changeColor(event) {
    numx = numx + 1;
    event.preventDefault();
    var p;
    p = document.getElementById('emdop');
    p.innerHTML += "<input class=\"element2\" type=\"text\" id=\"name_pattern_" + numx + "\" placeholder=\"Название\" required>\
            <select class=\"element2\" id=\"pattern_type_" + numx + "\" name=\"select\" size=\"1\" onChange=\"check(this);\">\
            <option></option>\
            <option value=\"1\">Случайное слово</option>\
            <option value=\"2\">Случайный текст</option>\
            <option value=\"3\">Число</option>\
            <option value=\"4\">Имя</option>\
            <option value=\"5\">Дата</option>\
            <option value=\"6\">Почта</option>\
            </select><br>\
            <fieldset id=\"word_" + numx + "\">\
            <label>Длина:</label>\
            <input type=\"text\" name=\"nameReq\" id=\"text_word_" + numx + "\" pattern=\"^[0-9]+$\">\
            <label>Регистры:</label>\
            <select name=\"select2\" size=\"1\" id=\"select_word_" + numx + "\">\
                <option value=\"Up\">Только большие буквы</option>\
                <option value=\"Low\">Только маленькие буквы</option>\
                <option value=\"Eny\">Любые буквы</option>\
            </select>\
        </fieldset>\
        <fieldset id=\"text_" + numx + "\">\
            <label>Длина слов:</label>\
            <input type=\"text\" name=\"nameReq\" id=\"text_text_" + numx + "\" pattern=\"^[0-9]+$\">\
            <label>Количество слов:</label>\
            <input type=\"text\" name=\"nameReq\" id=\"count_text_" + numx + "\" pattern=\"^[0-9]+$\">\
            <label>Регистры:</label>\
            <select name=\"select2\" size=\"1\" id=\"select_text_" + numx + "\">\
                <option value=\"Up\">Только большие буквы</option>\
                <option value=\"Low\">Только маленькие буквы</option>\
                <option value=\"Eny\">Любые буквы</option>\
            </select>\
        </fieldset>\
        <fieldset id=\"number_" + numx + "\">\
            <label>Длина числа:</label>\
            <input type=\"text\" name=\"nameReq\" id=\"text_number_" + numx + "\" pattern=\"^[0-9]+$\">\
            <label>Регистры:</label>\
            <select name=\"select2\" size=\"1\" id=\"select_number_" + numx + "\">\
                <option value=\"Pos\">Положительное</option>\
                <option value=\"Neg\">Отрицательное</option>\
                <option value=\"Eny\">Любое</option>\
            </select>\
        </fieldset>\
        <fieldset id=\"name_" + numx + "\">\
            <label>Длина имени:</label>\
            <input type=\"text\" name=\"nameReq\" id=\"text_name_" + numx + "\" pattern=\"^[0-9]+$\">\
        </fieldset>\
        <fieldset id=\"email_" + numx + "\"><label>Длина почты:</label><input type=\"text\" name=\"nameReq\" id=\"text_email_" + numx + "\"></fieldset><fieldset id=\"math_" + numx + "\"><label>Длина почты:</label><input type=\"text\" name=\"nameReq\" id=\"text_math_" + numx + "\"></fieldset>"

    document.getElementById('word_' + numx).style.display = 'none';
    document.getElementById('name_' + numx).style.display = 'none';
    document.getElementById('text_' + numx).style.display = 'none';
    document.getElementById('number_' + numx).style.display = 'none';
    document.getElementById('email_' + numx).style.display = 'none';
    document.getElementById('math_' + numx).style.display = 'none';
    numy = 1;
}

var numy = 1;

// функция отображения блоков инфофрмации о шаблонах
function check(event) {
    for (i = 0; i <= numx; i++) {
        var e = document.getElementById("pattern_type_" + i);
        var strUser = e.options[e.selectedIndex].value;
        if (strUser == 1) {
            document.getElementById('word_' + i).style.display = 'block';
            document.getElementById('text_' + i).style.display = 'none';
            document.getElementById('number_' + i).style.display = 'none';
            document.getElementById('name_' + i).style.display = 'none';
            document.getElementById('email_' + i).style.display = 'none';
            document.getElementById('math_' + i).style.display = 'none';
        } else if (strUser == 2) {
            document.getElementById('word_' + i).style.display = 'none';
            document.getElementById('text_' + i).style.display = 'block';
            document.getElementById('number_' + i).style.display = 'none';
            document.getElementById('name_' + i).style.display = 'none';
            document.getElementById('email_' + i).style.display = 'none';
            document.getElementById('math_' + i).style.display = 'none';
        } else if (strUser == 3) {
            document.getElementById('word_' + i).style.display = 'none';
            document.getElementById('number_' + i).style.display = 'block';
            document.getElementById('text_' + i).style.display = 'none';
            document.getElementById('name_' + i).style.display = 'none';
            document.getElementById('email_' + i).style.display = 'none';
            document.getElementById('math_' + i).style.display = 'none';
        } else if (strUser == 4) {
            document.getElementById('word_' + i).style.display = 'none';
            document.getElementById('name_' + i).style.display = 'block';
            document.getElementById('text_' + i).style.display = 'none';
            document.getElementById('number_' + i).style.display = 'none';
            document.getElementById('email_' + i).style.display = 'none';
            document.getElementById('math_' + i).style.display = 'none';
        } else if (strUser == 5) {
            document.getElementById('word_' + i).style.display = 'none';
            document.getElementById('name_' + i).style.display = 'none';
            document.getElementById('text_' + i).style.display = 'none';
            document.getElementById('number_' + i).style.display = 'none';
            document.getElementById('email_' + i).style.display = 'none';
            document.getElementById('math_' + i).style.display = 'none';
        } else if (strUser == 6) {
            document.getElementById('word_' + i).style.display = 'none';
            document.getElementById('email_' + i).style.display = 'block';
            document.getElementById('text_' + i).style.display = 'none';
            document.getElementById('number_' + i).style.display = 'none';
            document.getElementById('name_' + i).style.display = 'none';
            document.getElementById('math_' + i).style.display = 'none';
        } else {
            document.getElementById('word_' + i).style.display = 'none';
            document.getElementById('name_' + i).style.display = 'none';
            document.getElementById('text_' + i).style.display = 'none';
            document.getElementById('number_' + i).style.display = 'none';
            document.getElementById('email_' + i).style.display = 'none';
            document.getElementById('math_' + i).style.display = 'block';
        }
    }
}

// функция отправки запроса на сервер
function data_go(data, x){
    // Создает POST запрос для кнопки "Обновить данные об учебных планах"
    //
          // Инициализировать новый запрос
          const request = new XMLHttpRequest();
          request.open('POST', '/');

          // Добавить данные для отправки с запросом
          const type = new FormData();
          type.append('type', x);
          type.append('data', JSON.stringify(data));

          // Послать запрос
          request.send(type);
          return 0;
}