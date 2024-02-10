# python 3.6

import random
from paho.mqtt import client as mqtt_client
from config import Settings

broker = Settings().broker
port = Settings().port
topic = Settings().topic
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 1000)}'


def connect_mqtt():
    def on_connect(rc):
        if rc == 0:
            return True
        else:
            return False

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def publish(client, message):
    result = client.publish(topic, message)
    # result: [0, 1]
    status = result[0]
    if status == 0:
        return True
    else:
        return False


def run(test_data):
    client = connect_mqtt()
    client.loop_start()
    publish(client, test_data)

    return publish(client, test_data)