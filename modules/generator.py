import time
from modules import scripts
from modules import p_mqtt

flag = False

# создание и запуск нового генератора
def generator(name):
    global flag

    while(flag):
        test_data = scripts.open_script(name)
        x = p_mqtt.run(test_data)
        time.sleep(1)