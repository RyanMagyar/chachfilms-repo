"""
Chachapp development configuration
Ryan Magayr <magyar.ryan@gmail.com>
"""
import os
from datetime import timedelta
JWT_SECRET_KEY = (
    b'\n\x9dvyk\x90\x11Z/\xba#\xce~mG,\x1d-\x97\xe3Q\x01\xc4\x1f'
)

JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=60)

# Database
POSTGRESQL_DATABASE_HOST = os.getenv("DB_HOST")
POSTGRESQL_DATABASE_PORT = 5432
POSTGRESQL_DATABASE_USER = "ryanmagyar"  # OS or WSL username
POSTGRESQL_DATABASE_PASSWORD = "nintendo11"
POSTGRESQL_DATABASE_DB = "chachfilms"
# # Database
# POSTGRESQL_DATABASE_HOST = "localhost"
# POSTGRESQL_DATABASE_PORT = 5432
# POSTGRESQL_DATABASE_USER = "ryanmagyar"  # OS or WSL username
# POSTGRESQL_DATABASE_PASSWORD = None
# POSTGRESQL_DATABASE_DB = "chachfilms"
