"""
Chachapp development configuration
Ryan Magayr <magyar.ryan@gmail.com>
"""

import os

JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
if not JWT_SECRET_KEY:
    raise ValueError("No JWT_SECRET_KEY enviroment variable.")
POSTGRESQL_DATABASE_PASSWORD = os.environ.get("POSTGRESQL_DATABASE_PASSWORD")
if not POSTGRESQL_DATABASE_PASSWORD:
    raise ValueError("No POSTGRESQL_DATABASE_PASSWORD enviroment variable.")


# Production Database Config
# Database
POSTGRESQL_DATABASE_HOST = os.environ.get("DB_HOST")
POSTGRESQL_DATABASE_PORT = 5432
POSTGRESQL_DATABASE_USER = "ryanmagyar"  # OS or WSL username
POSTGRESQL_DATABASE_PASSWORD = "nintendo11"
POSTGRESQL_DATABASE_DB = "chachfilms"
