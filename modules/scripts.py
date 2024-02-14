import json
import os
from config import Settings
from modules import patterns
from modules import generator

path = Settings().path

# Функция полученния всех сценариев из папки scripts
def find_scripts():
    # Get the list of all files and directories
    try:
        dir_list = os.listdir(path)
        dir_list = list(map(lambda number: number[:-5], dir_list))
        return dir_list
    except:
        return []


# работа со сценариями
def open_script(file):
    try:
        with open("scripts/" + file, "r") as read_file:
            data = json.load(read_file)
            length = len(data)
    except:
        generator.flag = False
        return {}

    items = list(data.keys())
    data_json = {}
    for i in range(length):
        func = data[items[i]]
        # print(func)
        # print(eval(func))
        data_json[items[i]] = eval("patterns." + func)
        json_data = json.dumps(data_json)

    save_test_data(json_data)
    return json_data


# Создание нового генератора
def new_generate(data):
    data_json = {}
    with open("scripts/" + data["name_gen"] + ".json", "w") as write_file:
        for i in data:
            if i != "name_gen":
                data_two = data[i]
                name = data_two["name"]
                type_pattern = data_two["type"]
                data_pattern = data_two["pattern"]
                if type_pattern == "1":
                    if not data_pattern["length"]:
                        data_pattern["length"] = "'Null'"
                    data_json[str(name)] = "generate_random_word(" + data_pattern["length"] + ", '', 1, '" + \
                                           data_pattern["reg"] + "')"
                if type_pattern == "2":
                    if not data_pattern["length"]:
                        data_pattern["length"] = "'Null'"
                    if not data_pattern["count"]:
                        data_pattern["count"] = "'Null'"
                    data_json[str(name)] = "generate_random_word(" + data_pattern["length"] + ", ' ', " + data_pattern[
                        "count"] + ", '" + data_pattern["reg"] + "')"
                if type_pattern == "3":
                    if not data_pattern["length"]:
                        data_pattern["length"] = "'Null'"
                    data_json[str(name)] = "generate_number(" + data_pattern["length"] + ")"
                if type_pattern == "4":
                    if not data_pattern["length"]:
                        data_pattern["length"] = "'Null'"
                    data_json[str(name)] = "generate_random_name(" + data_pattern["length"] + ")"
                if type_pattern == "5":
                    data_json[str(name)] = "generate_date()"
                if type_pattern == "6":
                    if not data_pattern["length"]:
                        data_pattern["length"] = "'Null'"
                    data_json[str(name)] = "generate_email(" + data_pattern["length"] + ")"
                if type_pattern == "7":
                    data_json[str(name)] = "math_formuls(\"" + data_pattern["formul"] + "\")"
        json.dump(data_json, write_file)


def save_test_data(test_data):
    with open("test_data/test_data" + ".json", "w", encoding='utf-8') as write_file:
        write_file.write(test_data)
