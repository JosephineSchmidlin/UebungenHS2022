import uvicorn
from fastapi import FastAPI, Depends, status
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
import sqlalchemy
from fastapi import FastAPI, Form, Request
from fastapi.templating import Jinja2Templates
import databases


app = FastAPI()

manager = LoginManager("jflkdsjöfj48ur498u3t", token_url="/auth/login", use_cookie=True)
manager.cookie_name = "ch.fhnw.testapp_khfsj1234"
database = databases.Database('sqlite:///datenbank.db')
engine = sqlalchemy.create_engine('sqlite:///datenbank.db', connect_args={"check_same_thread":False})
metadate = sqlalchemy.MetaData()

notes = sqlalchemy.Table(
    "notes", metadate,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("user", sqlalchemy.String),
    sqlalchemy.Column("titel", sqlalchemy.String),
    sqlalchemy.Column("text", sqlalchemy.String)
)

metadate.create_all(engine)


DB = {"user1":{"name": "Hans Muster",
                "email": "hanswurst@gmail.com",
                "passwort": "12345"},
        "user2": {"name": "Alexandra Meier",
                "email": "ameier@gmx.net",
                "passwort": "pass"}
    }

@manager.user_loader()
def load_user(username: str):
    user = DB.get(username)
    return user


@app.post("/auth/login")
def login(data: OAuth2PasswordRequestForm = Depends()):
    username = data.username
    password = data.password
    user = load_user(username)

    if not user:
        raise InvalidCredentialsException
    if user["passwort"] != password:
        raise InvalidCredentialsException

    access_token = manager.create_access_token(
        data={"sub": username}
    )

    resp = RedirectResponse(url="/new", status_code=status.HTTP_302_FOUND)
    manager.set_cookie(resp, access_token)

    return resp


@app.get("/")
def login():
    file = open("templates/login.html", encoding="utf-8")
    data = file.read()
    file.close()
    return HTMLResponse(content=data)





#----------- Nachricht erfassen --------------
templates = Jinja2Templates(directory="templates/")

@app.on_event("startup")
async def startup():
    print("Verbinde Datenbank")
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    print("Beende DB Verbindung")
    await database.disconnect()


#@app.get("/notes")
#async def read_notes():
#    query = notes.select()
#    return await database.fetch_all(query)


@app.get("/new")
async def create_note(request: Request):
    return templates.TemplateResponse('new.html', context={'request': request})

@app.post("/new", response_class=HTMLResponse)
async def post_note(titel=Form(),text=Form(), user = Depends(manager)):
    query = notes.insert().values(title=titel, text=text, user= user["name"])
    myid = await database.execute(query)
    resp = RedirectResponse(url = "/new", status_code= status.HTTP_302_FOUND )
    return resp


  

# ------------- Nachrichten anzeigen ?????????? -----------------------------
@app.get("/users/{username}", response_class=HTMLResponse)
def getSecretPage(user=Depends(manager)):
    return "Hello" + user["name"]




uvicorn.run(app,  host="127.0.0.1", port=8000)