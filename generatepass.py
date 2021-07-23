import uuid
import hashlib

password = 'chach2021'

algorithm = 'sha512'
salt = uuid.uuid4().hex
hash_obj = hashlib.new(algorithm)
password_salted = salt + password
hash_obj.update(password_salted.encode('utf-8'))
password_hash = hash_obj.hexdigest()
password_db_string = "$".join([algorithm, salt, password_hash])
print(password_db_string)