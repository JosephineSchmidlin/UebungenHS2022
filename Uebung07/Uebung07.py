import uvicorn
from fastapi import FastAPI

app = FastAPI()


d = {}
file = open("PLZO_CSV_LV95.csv", encoding="utf-8")
next(file)
for line in file:
    daten = line.strip().split(";")
    ort = daten[0]
    zip = daten[1]
    zusatz = daten[2]
    gemeinde = daten[3]
    bfs = daten[4]
    kanton = daten[5]
    e = daten[6]
    n = daten[7]
    sprache = daten[8]
    d[ort] = {"Ort": ort,"PLZ": zip, "Zusatzziffer": zusatz, "Gemeinde": gemeinde, "Kanton": kanton, "BFS-Nr": bfs, "Easting": e, "Northing": n, "Sprache": sprache}

file.close()





@app.get("/name")
async def name(name: str):
    if name in d:
        return d[name]

    return {"ERROR": "Ort NOT FOUND"}

uvicorn.run (app, host ="127.0.0.1", port=8000)