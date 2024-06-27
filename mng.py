from pymongo import MongoClient

# Initialize MongoDB client and database
client = MongoClient("mongodb+srv://elkana1234:Hv4iD5Z3x60ixeuW@hmo.st6jfjf.mongodb.net/?retryWrites=true&w=majority")

ret = client.admin.command('ping')
print(ret)
db = client['new_curd_db']



def create_collection(therapist_name):
    '''Create a new collection for a therapist'''
    collection = db[therapist_name]
    # Insert seven empty records for each weekday
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    for day in days:
        collection.update(
        {'day': day},\
        {'$setOnInsert' : {'day':day, 'data':[]}},
        upsert =  True
         )

def add_patient(therapist_name, day, patient_name, patient_id, patient_hmo):
    '''Add a patient to the therapist's collection on a specific day'''
    collection = db[therapist_name]
    patient = {
        'patient_name': patient_name,
        'patient_id': patient_id,
        'patient_hmo': patient_hmo
    }
    collection.update_one({'day': day}, {'$push': {'data': patient}})
    print("done")


if __name__ == '__main__':
    print("start")
    create_collection('noam')
    add_patient('noam', 'Sunday', 'dan', '0212','clalit')
    
 