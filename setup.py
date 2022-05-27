from setuptools import setup

setup(
    name='chachapp',
    version='0.1.0',
    packages=['chachapp'],
    include_package_data=True,
    install_requires=[
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
        'psycopg2-binary'
    ],
    python_requires='>=3.6',
)
