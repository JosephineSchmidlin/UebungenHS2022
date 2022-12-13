import uvicorn
from fastapi import FastAPI
from pyproj import Transformer

app = FastAPI()

wgs84 = "epsg:4326"
lv95 = "epsg:2056"

transformer1 = Transformer.from_crs("epsg:4326", "epsg:2056")
transformer2 = Transformer.from_crs("epsg:2056", "epsg:4326")

#r1 = transformer1.transform(47.534999681368944, 7.641871616526384)
#r2 = transformer2.transform(2600000, 1200000)
#print(r2)

@app.get("/transform/wgs84lv95")
async def transform1(long: float, lat: float):
    r1 = transformer1.transform(long, lat)
    return {"Ost":{r1[0]}, "Nord":{r1[1]}}

@app.get("/transform/lv95wgs84")
async def transform2(ost: float, nord: float):
    r2 = transformer1.transform(ost, nord)
    return {"long":{r2[0]}, "lat":{r2[1]}}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)



