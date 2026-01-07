from config import Sessionlocal
from sqlalchemy import text

s = Sessionlocal()
try:
    # Update room images
    s.execute(text("UPDATE room SET url_image_chambre = replace(url_image_chambre, 'http://192.168.0.102:9090', 'http://localhost:9090') WHERE url_image_chambre LIKE 'http://192.168.0.102:9090%'"))
    
    # Update plat images
    s.execute(text("UPDATE plat SET plat_url = replace(plat_url, 'http://192.168.0.102:9090', 'http://localhost:9090') WHERE plat_url LIKE 'http://192.168.0.102:9090%'"))
    
    # Update evenement images
    s.execute(text("UPDATE evenement SET evenement_url = replace(evenement_url, 'http://192.168.0.102:9090', 'http://localhost:9090') WHERE evenement_url LIKE 'http://192.168.0.102:9090%'"))
    
    # Update user images
    s.execute(text('UPDATE "user" SET url_image_user = replace(url_image_user, \'http://192.168.0.102:9090\', \'http://localhost:9090\') WHERE url_image_user LIKE \'http://192.168.0.102:9090%\''))
    
    s.commit()
    print("✅ Images URLs updated to localhost:9090")
except Exception as e:
    s.rollback()
    print(f"❌ Error: {e}")
finally:
    s.close()
