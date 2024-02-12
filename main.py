from flask import Flask, render_template, request, redirect, jsonify
from modules import p_mqtt
from modules import scripts
from modules import generator
import ast

app = Flask(__name__, template_folder='templates')

test_data = " "

@app.route('/', methods=["POST", "GET"])
def index():
    global test_data
    if request.method == 'POST':
        type_gen = request.form.get('type')
        if type_gen == 'name':
            generator.flag = True
            data = request.form.get('data')
            generator.generator(data.replace('"', '') + ".json")
        elif type_gen == 'list':
            test_data = ""
            data = request.form.to_dict()
            dict_obj = ast.literal_eval(data['data'])
            scripts.new_generate(dict_obj)
        if type_gen == "upload":
            print("mqtt")
            #answer_mqtt = p_mqtt.run(test_data)
            #return jsonify({"success": answer_mqtt})
    return render_template('main.html', scripts=scripts.find_scripts(), test_data=test_data)

if __name__ == '__main__':
    scripts.find_scripts()
    app.run(debug=True)