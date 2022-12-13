import uvicorn
from fastapi import FastAPI, Response
import pyproj

app = FastAPI()

g = pyproj.Geod(ellps="WGS84")

# startlong = 8.5391632
# startlat = 47.3771216

# endlong = -74.001
# endlat = 40.709


@app.get("/geodetic/&")
async def geodetic(startlong: float, startlat: float, endlong: float, endlat: float, point: int):
    lonlats = g.npts(startlong, startlat, endlong, endlat, point)
    lonlats = [(startlong, startlat)] + lonlats + [(endlong, endlat)]

    geojson = f"""{{
    "type": "Feature",
    "geometry": {{
    "type": "LineString",
    "coordinates": {lonlats}
    }},
    "properties": {{
    "about": "Geodätische Linie"
    }}
    }}
    """

    return Response(content=geojson)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8002)

