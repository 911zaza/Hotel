from config import Sessionlocal
from sqlalchemy import text


def main():
    s = Sessionlocal()
    try:
        sqls = [
            "UPDATE plat SET plat_url = replace(plat_url, 'http://127.0.0.1:9090', 'http://192.168.0.102:9090') WHERE plat_url LIKE 'http://127.0.0.1:9090%';",
            "UPDATE room SET url_image_chambre = replace(url_image_chambre, 'http://127.0.0.1:9090', 'http://192.168.0.102:9090') WHERE url_image_chambre LIKE 'http://127.0.0.1:9090%';",
            "UPDATE \"user\" SET url_image_user = replace(url_image_user, 'http://127.0.0.1:9090', 'http://192.168.0.102:9090') WHERE url_image_user LIKE 'http://127.0.0.1:9090%';",
            "UPDATE evenement SET evenement_url = replace(evenement_url, 'http://127.0.0.1:9090', 'http://192.168.0.102:9090') WHERE evenement_url LIKE 'http://127.0.0.1:9090%';",
        ]
        for q in sqls:
            s.execute(text(q))
        s.commit()
        print("Mise à jour terminée.")
    except Exception as e:
        s.rollback()
        print("Erreur lors de la mise à jour :", e)
    finally:
        s.close()


if __name__ == '__main__':
    main()
