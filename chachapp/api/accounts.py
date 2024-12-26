"""REST API for accounts."""
import hashlib
import uuid
import base64
import pathlib
from flask_jwt_extended import (
    create_access_token, get_jwt_identity,
    jwt_required, get_jwt, JWTManager)
from datetime import datetime, timedelta, timezone
import flask
from flask import (
    request
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


@chachapp.app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        print(exp_timestamp)
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            print("NEW TOKEN")
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = (flask.jsonify(**data)).data
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@chachapp.app.route('/api/v1/accounts/users/', methods=['GET'])
def get_users():
    """Get names of all users"""
    cur = chachapp.model.get_db()

    cur.execute("""SELECT username FROM reviewers""")
    users = cur.fetchall()

    context = {'users': users,
               'status_code': 200}
    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/accounts/picture/', methods=['POST'])
@jwt_required()
def post_pic():
    """Update and save profile picture"""
    cur = chachapp.model.get_db()

    user = get_jwt_identity()
    username = user['username']
    request_data = request.get_json()

    fileobj = base64.b64decode(request_data['file'].split(",")[1])
    filename = request_data['filename']

    uuid_basename = "{stem}{suffix}".format(
        stem=uuid.uuid4().hex,
        suffix=pathlib.Path(filename).suffix
    )
    path = chachapp.app.config["UPLOAD_FOLDER"] / uuid_basename

    with open(path, "wb") as f:
        f.write(fileobj)

    cur.execute("""SELECT filename FROM reviewers
                   WHERE username=%s""", (username,))
    user = cur.fetchone()

    path = chachapp.app.config["UPLOAD_FOLDER"] / user['filename']
    path.unlink()

    cur.execute("""UPDATE reviewers SET filename=%s
                   WHERE username = %s""", (uuid_basename, username))

    context = {'message': 'Picture upload successful.',
               'status_code': 200}

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/accounts/getbio/', methods=['GET'])
@jwt_required()
def get_bio():
    """Return bio of user."""
    cur = chachapp.model.get_db()

    user = get_jwt_identity()
    username = user['username']

    cur.execute("""SELECT bio, filename FROM reviewers
                   WHERE username = %s""", (username,))

    user = cur.fetchone()
    user['filename'] = "/uploads/{}".format(user['filename'])

    context = {'bio': user['bio'],
               'filename': user["filename"],
               'status_code': 200}

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/accounts/submitbio/', methods=['POST'])
@jwt_required()
def post_bio():
    """Update bio of user."""
    cur = chachapp.model.get_db()

    user = get_jwt_identity()
    username = user['username']
    request_data = request.get_json()
    bio = request_data['bio']

    cur.execute("""Update reviewers SET bio = %s
                   WHERE username = %s""", (bio, username,))

    context = {'message': 'Bio update successful',
               'status_code': 200}

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/accounts/password/', methods=['POST'])
@jwt_required()
def accounts():
    """Perform account edit operations."""
    return update_password()


def update_password():
    """Update user password."""
    cur = chachapp.model.get_db()

    user = get_jwt_identity()
    username = user['username']
    request_data = request.get_json()

    password = request_data['oldPassword']
    new_password1 = request_data['newPassword']
    new_password2 = request_data['repeatNewPassword']

    if password == '':
        response = {'message': 'Old password must not be blank.',
                    'status_code': 400}
        return response, 400
    elif new_password1 == '' or new_password2 == '':
        response = {'message': 'New password must not be blank.',
                    'status_code': 400}
        return response, 400
    elif new_password1 != new_password2:
        response = {'message': 'New passwords do not match',
                    'status_code': 400}
        return response, 400
    elif len(new_password1) < 8:
        response = {'message': 'New password must be at least 8 characters.',
                    'status_code': 400}
        return response, 400

    has_num = False
    has_upper = False
    has_lower = False

    for char in new_password1:
        if char.isdigit():
            has_num = True
            continue
        elif char.isupper():
            has_upper = True
            continue
        elif char.islower():
            has_lower = True
            continue
        elif has_num and has_lower and has_upper:
            break

    if not has_num or not has_lower or not has_upper:
        response = {'message': 'New password must contain at least one number, uppercase, and lowercase character.',
                    'status_code': 400}
        return response, 400

    cur.execute(
        'SELECT * FROM reviewers WHERE username = %s', (username,)
    )

    user = cur.fetchone()

    if not check_password(user['password'], password):
        response = {'message': 'Old password incorrect',
                    'status_code': 400}
        return response, 400

    algorithm = 'sha512'
    salt = uuid.uuid4().hex
    hash_obj = hashlib.new(algorithm)
    password_salted = salt + new_password1
    hash_obj.update(password_salted.encode('utf-8'))
    password_hash = hash_obj.hexdigest()
    password_db_string = "$".join([algorithm, salt, password_hash])

    cur.execute(
        '''UPDATE reviewers
        SET password = %s
        WHERE
        username = %s
        ''', (password_db_string, username)
    )

    context = {'message': 'Password change success.',
               'status_code': 200}

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/reviewers/', methods=['GET'])
def get_reviewers():
    """Get reviewers info."""
    cur = chachapp.model.get_db()

    cur.execute("""
                SELECT * FROM reviewers
                """)
    reviewers = cur.fetchall()

    for reviewer in reviewers:
        reviewer['filename'] = "/uploads/{}".format(reviewer['filename'])

    context = {'reviewers': reviewers,
               'status_code': 201}

    return flask.jsonify(**context)


def check_password(hashword, password):
    """Check if password matches db entry."""
    splitpass = hashword.split('$')
    algorithm = 'sha512'
    salt = splitpass[1]
    hash_obj = hashlib.new(algorithm)
    password_salted = salt + password
    hash_obj.update(password_salted.encode('utf-8'))
    password_hash = hash_obj.hexdigest()
    password_db_string = "$".join([algorithm, salt, password_hash])
    return hashword.replace(' ', '') == password_db_string

