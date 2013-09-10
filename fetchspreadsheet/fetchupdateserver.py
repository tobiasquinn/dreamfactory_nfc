#!/usr/bin/python
from bottle import route, run
from datetime import datetime
import os

@route('/update/9yI04CuSx6NQ1Lf8am7m')
def updatesheets():
    print("Start fetch")
    os.system("node fetchmatrix.js")
    print("End fetch")
    return "Last Updated " + str(datetime.now())

run(host="0.0.0.0", port=9453)
