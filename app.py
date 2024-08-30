from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb+srv://tarunjanapati7:%4074run54I@educationdetaails.x0zu5mp.mongodb.net/?retryWrites=true&w=majority&appName=EducationDetaails")
db = client.job_tracker
jobs_collection = db.jobs

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_job', methods=['POST'])
def add_job():
    data = request.json
    job_id = jobs_collection.insert_one(data).inserted_id
    job = jobs_collection.find_one({'_id': job_id})
    job['_id'] = str(job['_id'])
    return jsonify(job)


@app.route('/get_jobs', methods=['GET'])
def get_jobs():
    jobs = list(jobs_collection.find())
    for job in jobs:
        job['_id'] = str(job['_id'])
    return jsonify(jobs)

if __name__ == '__main__':
    app.run(debug=True) 