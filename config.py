import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base,sessionmaker

USER_DB:str=os.getenv('USER_DB','postgres')#cherche si user_db est initialiser si non on prend admin 
USER_PASSWORD:str=os.getenv('PASSWORD_DB','xoxoxoxo99$')#mot de passe de la base de donnee dyalkk
DATABASE_NAME:str="db_hotel"
DB_URL:str=f"postgresql+psycopg2://"+USER_DB+":"+USER_PASSWORD+"@localhost/"+DATABASE_NAME

engine=create_engine(DB_URL)
Sessionlocal=sessionmaker(bind=engine,autocommit=False)
Base=declarative_base()#classe apartire de laquelle on va creer nos entites
