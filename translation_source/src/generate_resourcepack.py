#! /usr/bin/python
import os
from pathlib import Path
import json
from datetime import datetime
lang = os.getenv('MAJSOUL_LANG', 'jp')

def main(dist_path):
    resourcepack_data = {
        'id': 'korean',
        'version': '0.69.69',
        'name': '한국어',
        'author': 'Nesswit/마작 갤러리',
        'description': '마작 플러스 한국어화',
        'preview': 'preview.png',
        'dependencies': {
            'majsoul_plus': '^2.0.0'
        },
        'replace': []
    }

    assets_path = Path(dist_path) / 'assets'
    for file_path in sorted(assets_path.glob('**/*')):
        if file_path.is_dir():
            continue
        resourcepack_data['replace'].append(file_path.relative_to(assets_path).as_posix())

    with open(Path(dist_path) / 'resourcepack_temp.json', 'w', encoding='utf-8') as resourcepack_file:
        json.dump(resourcepack_data, resourcepack_file, indent=2, ensure_ascii=False)

if __name__ == '__main__':
    main(
        str(Path('..'))
    )