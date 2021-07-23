from setuptools import setup

setup(
    name='chachapp',
    version='0.1.0',
    packages=['chachapp'],
    include_package_data=True,
    install_requires=[
	'Flask-S3==0.3.3',
        'arrow',
        'bs4',
        'Flask',
        'html5validator',
        'pycodestyle',
        'pydocstyle',
        'pylint',
        'pytest',
        'requests',
        'imdbpy',
        'psycopg2'
    ],
    python_requires='>=3.6',
)