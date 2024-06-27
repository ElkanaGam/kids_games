from pymongo import MongoClient

# Initialize MongoDB client and database
client = MongoClient("mongodb+srv://elkana1234:Hv4iD5Z3x60ixeuW@hmo.st6jfjf.mongodb.net/?retryWrites=true&w=majority")

ret = client.admin.command('ping')
print(ret)
db = client['curd_db']

def create_collection(therapist_name):
    '''Create a new collection for a therapist'''
    collection = db[therapist_name]
    # Insert seven empty records for each weekday
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    for day in days:
        collection.insert_one({day: []})

def add_patient(therapist_name, day, patient_name, patient_id, patient_hmo):
    '''Add a patient to the therapist's collection on a specific day'''
    collection = db[therapist_name]
    patient = {
        'patient_name': patient_name,
        'patient_id': patient_id,
        'patient_hmo': patient_hmo
    }
    collection.update_one({}, {'$push': {day: patient}})

def remove_patient(therapist_name, patient_name, patient_id, patient_hmo):
    '''Remove a patient from the therapist's collection'''
    collection = db[therapist_name]
    for day in collection.find():
        patients = day.get(day, [])
        for patient in patients:
            if (
                patient.get('patient_name') == patient_name and
                patient.get('patient_id') == patient_id and
                patient.get('patient_hmo') == patient_hmo
            ):
                collection.update_one({}, {'$pull': {day: patient}})
                return
    print("Patient not found!")

def get_therapist_weekly(therapist_name):
    '''Get the therapist's weekly schedule'''
    collection = db[therapist_name]
    schedule = {}
    for day in collection.find():
        print("DAY= ", day)
        schedule.update(day)
    
    return schedule

def get_therapist_list_for_day(therapist_name, day):
    '''Get the list of patients scheduled for a specific day'''
    collection = db[therapist_name]
    return collection.find_one({}, {day: 1, '_id': 0})

# Now let's create a Python API using Flask to handle the endpoints
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/therapists', methods=['POST'])
def create_therapist_collection():
    therapist_name = request.json.get('therapist_name')
    create_collection(therapist_name)
    return jsonify({"message": f"Collection created for therapist {therapist_name}"}), 201

@app.route('/therapists/schedual', methods=['PUT', 'DELETE'])
def modify_therapist_schedule(patient):
    therapist_name = request.json.get('therapist_name')
    day = request.json.get('day')
    patient_name = request.json.get('patient_name')
    patient_id = request.json.get('patient_id')
    patient_hmo = request.json.get('patient_hmo')
    
    if request.method == 'PUT':
        add_patient(therapist_name, day, patient_name, patient_id, patient_hmo)
        return jsonify({"message": "Patient added to the schedule"}), 201
    elif request.method == 'DELETE':
        remove_patient(therapist_name, patient_name, patient_id, patient_hmo)
        return jsonify({"message": "Patient removed from the schedule"}), 200

@app.route('/therapists', methods=['GET'])
def get_therapists():
    opt = [[], ["therapist_name","day"],  ["therapist_name"]]
    schedule = {}
    args = list(request.args)
    if args not in opt:
        return "Mismatch Params"
    else:
        therapists = db.list_collection_names()
        if request.args == []:
            return jsonify({"therapists": therapists})
        elif args == ["therapist_name","day"]:
            therapist_name = request.args.get('therapist_name')
            day = request.json.get('day')
            for therapist_name in therapists:
                schedule[therapist_name] = get_therapist_list_for_day(therapist_name, day)
                print(schedule)
            return jsonify(schedule)

        else:
            therapist_name = request.args.get('therapist_name')
            for therapist_name in therapists:
                schedule[therapist_name] = get_therapist_weekly(therapist_name)
                print(schedule)
            return jsonify(schedule)



@app.route('/', methods=['GET'])
def welcome():
    return {"msg":"Hello there"}

if __name__ == '__main__':
    #curl -X POST -d "therapist_name=roy" http://localhost:5000/therapists
    #curl -X PUT -d "therapist_name=roy&day=Monday&patient_name=Alice&patient_id=12345&patient_hmo=XYZHMO" http://localhost:5000//therapists/schedual
    #curl -X DELETE -d "therapist_name=roy&day=Monday&patient_name=Alice&patient_id=12345&patient_hmo=XYZHMO" http://localhost:5000//therapists/schedual
    #curl -X GET -d "therapist_name=roy&day=Monday" http://localhost:5000/therapists
    
    print("start Run")
    print(app.url_map)
    app.run(debug=True)

    # need to find with out the id. Id only for therapists
