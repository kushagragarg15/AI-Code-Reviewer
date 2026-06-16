import os

def save_file(file, path):
    with open(path, 'wb') as f:
        f.write(file.read())


def load_file(path):
    with open(path, 'r') as f:
        return f.read()