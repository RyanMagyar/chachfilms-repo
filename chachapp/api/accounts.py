"""REST API for accounts."""
import hashlib
from flask_jwt_extended import (
    create_access_token, get_jwt_identity,
    jwt_required, JWTManager)
import flask
from flask import (
    session, request
)
import chachapp
jwt = JWTManager(chachapp.app)

@chachapp.app.route('/api/v1/login/', methods=['POST'])
def login():
    """Generate token if login is succesful"""
    cur = chachapp.model.get_db()
    request_data = request.get_json()
    username = request_data['username']
    password = request_data['password']
    print(username)
    print(password)
    

    if username == '' or password == '':
        response = {'message': 'Username or password cannot be blank.', 
                    'status_code': 400}
        return response, 400
    
    cur.execute(
        '''SELECT username, password 
        FROM reviewers WHERE username = %s
        ''', (username,))
    user = cur.fetchone()
    
    if user is None:
        response = {'message': 'User could not be found.', 
                    'status_code': 400}
        return response, 400
    elif not check_password(user['password'], password):
        response = {'message': 'Username or password incorrect.', 
                    'status_code': 400}
        return response, 400
    access_token = create_access_token(identity={"username": user['username']})
    context = {'message': 'Login success.',
                'access_token': access_token,
                'status_code': 200}

    return flask.jsonify(**context)
    
def check_password(hashword, password):
    """Display / route."""
    splitpass = hashword.split('$')
    algorithm = 'sha512'
    salt = splitpass[1]
    hash_obj = hashlib.new(algorithm)
    password_salted = salt + password
    hash_obj.update(password_salted.encode('utf-8'))
    password_hash = hash_obj.hexdigest()
    password_db_string = "$".join([algorithm, salt, password_hash])
    return hashword.replace(' ', '') == password_db_string