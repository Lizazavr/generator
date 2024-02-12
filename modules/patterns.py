import string
import random
import faker

# Шаблон слова или текста только из букв
def generate_random_word(length, symbol, count, type):
    letters = ""
    for i in range(count):
        if type == 0:
            let = string.ascii_lowercase
        elif type == 1:
            let = string.ascii_uppercase
        else:
            let = string.ascii_letters
        strlet = ''.join(random.choice(let) for _ in range(length))
        letters = letters + strlet + symbol
    return letters[:-1]


# Шаблон слова или текста из букв и символов
def generate_random_word_number(length, symbol, count):
    letters = ""
    for i in range(count):
        let = string.hexdigits
        strlet = ''.join(random.choice(let) for _ in range(length))
        letters = letters + strlet + symbol
    return letters[:-1]


# Шаблон имени
def generate_random_name(length):
    if length == "Null":
        length = random.randrange(3, 12)
    letters = ""
    let = string.ascii_lowercase
    letters = ''.join(random.choice(let) for _ in range(length))
    return letters.capitalize()


# Шаблон даты
def generate_date():
    fake = faker.Faker()
    rand_date = fake.date()
    return rand_date


# Шаблон почты
def generate_email(char_num):
    return ''.join(random.choice(string.ascii_letters) for _ in range(char_num)) + "@gmail.com"


# Шаблон числа
def generate_number(count):
    if count == "Null":
        count = random.randrange(1, 5)
    number = ""
    for i in range(count):
        number = number + str(random.randrange(0, 9))

    return int(number)

# шаблон математического выражения
def math_formuls(str):
    return eval(str)

