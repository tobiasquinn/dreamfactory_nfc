#!/usr/bin/python
from bottle import route, run
import os

@route('/nd9GMXhXWWOieoY1yCiH')
def updatesheets():
    os.system("node fetchlessons.js")
    return "Updated Spreadsheet"

run(host="0.0.0.0", port=9453)
