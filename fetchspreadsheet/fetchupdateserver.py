#!/usr/bin/python
from bottle import route, run
import os

@route('/9yI04CuSx6NQ1Lf8am7m')
def updatesheets():
    print("Start fetch")
    os.system("node fetchmatrix.js")
    print("End fetch")
    return "Updated From Matrix Spreadsheet"

run(host="0.0.0.0", port=9453)
