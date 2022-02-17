import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def get_solution_qtype_id(algorithm, questiontype, id): # u? lehet törölni kell, itt id lehet nem lesz jó és idx kell
    print("alg", algorithm)
    print("qtype", questiontype)
    print("id", id)
    doc = db.collection(u'solutions').document(algorithm).get()
    if doc.exists:
        return doc.to_dict()[questiontype][id]
    return ""

def set_user_points(uid, points):
    print("u",uid)
    print("benne a pontok", points)
    doc = db.collection(u'users').document(uid).get()
    print("doc", doc.to_dict())
    if doc.exists:
        curr_points = doc.to_dict()['points']
        print("ez meg mi xd", curr_points)
        doc.reference.update({
            u'points': curr_points + points
        })
    else:
        raise Exception("User not found")

def set_user_points_zero(uid):
    print("u",uid)
    doc = db.collection(u'users').document(uid).get()
    if doc.exists:
        doc.reference.set({
            u'points':  int(0),
            u'name': doc.to_dict()['name']
        })
        print("ez megtortént")
        print(db.collection(u'users').document(uid).get().to_dict())
    else:
        raise Exception("User not found")

def new_user(uid, name):
    is_exists = db.collection(u'users').document(uid).get()
    if not is_exists.exists:
        db.collection(u'users').document(uid).set({
            u'name': name,
            u'points': 0
        })
    
# print(get_solution("Astar", "dnd", "id-1"))

# result = db.collection("questions").document("Astar").get()
# if result.exists:
#     print(result.to_dict()['dnd'])


#le küldöm a választ, az idt, a kérdés típusát és az algoritmust -> itt ellenőrzöm majd visszaküldöm mi jó mi nem