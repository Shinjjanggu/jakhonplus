작혼 플러스 일본서버 한글패치

========================

![리소스 팩 썸네일](/sample/nya1.png)

냥따봉

작혼 플러스 일본서버 한글패치는 [작혼 Plus](https://github.com/MajsoulPlus/majsoul-plus)에서 사용할 수 있는 리소스 팩입니다.

원제작자의 [글로벌 서버 한글패치](https://github.com/yf-dev/majsoul-plus-korean)를 일본서버에서도 적용할 수 있도록 바꿔놓은 것입니다.


### 1. 요구조건

- [작혼 Plus](https://github.com/MajsoulPlus/majsoul-plus) Version 2.0.0 
- 작혼 Plus의 Settings에서 User Data의 Server to play 값을 1로 설정

#### 2.스크린샷

나중에 추가함

#### 3.이모티콘

![냥따봉](/sample/nya1.png)

따봉

#### 4.셀프빌드 (점검하고 작동이 안될때)

0.github에서 파일을 다운로드합니다.
translation_source 폴더는 data로 이름을 바꿔서 korean폴더 안으로 옮겨줘야 합니다.. (resourcepack\korean\data\)

1.명령 프롬프트를 엽니다.

2.pipenv run mpk download로 애셋을 다운로드 받습니다.

3.pipenv run mpk template로 탬플릿을 다운로드 받습니다.
이 명령어를 사용하면 data\translation에 translate_jp.po가 생성됩니다.

4.poedit으로 translate_ko.po 파일을 열어
카달로그 -> POT 파일에서 업데이트 -> translate_jp.po 파일을 선택해주고
이후 로딩이 끝나면 저장합니다.

5.pipenv run mpk build로 새로 빌드해줍니다.

6.접속이 되는지 체크합니다.

7.웹버전은 resourcepack.json과 assets 폴더를 올리고
resourcepack.json 주소와 res_base_url 주소만 고치면 됩니다.

8.참고 : 워낙 파일관리를 못하는 편이라 위에 올려놓은 소스에선
resourcepack.json 자동 작성을 resourcepack_temp.json으로 바꿔놓아
assets 폴더에 넣는다고 하더라도 자동으로 resourcepack.json에 작성되지 않습니다. (작성되어야 할 내용은 resourcepack_temp.json에 작성됩니다)
data\src\generate_resourcepack.py 파일을 열어 적절히 수정하세요.

9.참고2 : 웹버전 리소스 링크를 변경해도 이미지, 칭호 등 일부 이미지가 보이지 않을 수 있습니다.
원제작자의 설명에 의하면 XOR 파일로 변환과정을 거쳐야 하며 변환 스크립트가 공개되어 있습니다.
https://github.com/Shinjjanggu/jakhonplus/issues/2

### 제작

- [Nesswit](https://github.com/rishubil)
- 신짱구
- 일급천재
- 소사희

### License

MIT

이 프로젝트는 다음의 제3자 소프트웨어 및 폰트의 바이너리를 포함하고 있습니다.

- [fontbm](https://github.com/vladimirgamalyan/fontbm) - BMFont compatible, cross-platform command line bitmap font generator
- [Protocol Buffers](https://github.com/protocolbuffers/protobuf) - Google's data interchange format
- [Noto Sans (CJK)](https://www.google.com/get/noto/)
- [배달의민족 을지로체](https://www.woowahan.com/#/fonts)
- [산돌국대떡볶이체](http://kukde.co.kr/?page_id=627)
- [정묵 바위체](https://sangsangfont.com/21/?idx=122)
- 거...설명추가하겟슴
