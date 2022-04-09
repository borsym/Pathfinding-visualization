import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import sys
import os
sys.path.append("./")
data = os.path.abspath(os.path.dirname(__file__)) + "/service/serviceAccountKey.json"
cred = credentials.Certificate(data)
firebase_admin.initialize_app(cred)

db = firestore.client()


def get_solution_qtype_id(
    algorithm, questiontype, id
):  # u? lehet törölni kell, itt id lehet nem lesz jó és idx kell
    doc = db.collection("solutions").document(algorithm).get()
    if doc.exists:
        return doc.to_dict()[questiontype][id]
    return ""


def set_user_points(uid, points):
    doc = db.collection("users").document(uid).get()
    if doc.exists:
        curr_points = doc.to_dict()["points"]
        doc.reference.update({"points": curr_points + points})
    else:
        raise Exception("User not found")


def set_user_points_zero(uid):
    doc = db.collection("users").document(uid).get()
    if doc.exists:
        doc.reference.set({"points": int(0), "name": doc.to_dict()["name"]})
    else:
        raise Exception("User not found")


def new_user(uid, name):
    is_exists = db.collection("users").document(uid).get()
    if not is_exists.exists:
        db.collection("users").document(uid).set({"name": name, "points": 0})
