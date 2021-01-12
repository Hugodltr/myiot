import base64
import paho.mqtt.client as mqtt
import time
import sys
import json
import base64

broker_address = "94.247.176.184"

client = mqtt.Client("P1")
client.connect(broker_address)

with open("lisa.jpg", "rb") as imageFile:
    str = base64.b64encode(imageFile.read())

temperature = 30
timestamp = 70000007

client.publish("test_image", json.dumps(
    {'timestamp': timestamp, 'temperature': temperature, 'image': str.decode("utf-8")})
)
