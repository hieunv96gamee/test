import os
import zipfile

RootDir = os.getcwd()

htmlPath = RootDir + '/playableAds/index.html'


def build(html_file_name, build_file_name, adNetwork=None, adSize=None):
    with open(html_file_name, "r", encoding='utf8') as htmlFile:
        htmlStr = htmlFile.read()
        if adNetwork:
            htmlStr = htmlStr.replace('__adNetwork__', adNetwork)
        if adSize:
            htmlStr = htmlStr.replace('<!--__MetaAdSize__-->', '<meta name="ad.size" content="width=' +
                                      adSize['width'] + ',height=' + adSize['height'] + '">')
        else:
            htmlStr = htmlStr.replace('<!--__MetaAdSize__-->', '')
        with open(build_file_name, "w", encoding='utf8') as buildFile:
            buildFile.write(htmlStr)


build(htmlPath, 'playableAds/index.html',
      'adword', {'width': '300', 'height': '250'})
zip = zipfile.ZipFile("playableAds/adword_300_250.zip",
                      "w", zipfile.ZIP_DEFLATED)
zip.write("playableAds/index.html", "index.html")
zip.close()

build(htmlPath, 'playableAds/index.html',
      'adword', {'width': '480', 'height': '320'})
zip = zipfile.ZipFile("playableAds/adword_480_320.zip",
                      "w", zipfile.ZIP_DEFLATED)
zip.write("playableAds/index.html", "index.html")
zip.close()

build(htmlPath, 'playableAds/index.html',
      'adword', {'width': '320', 'height': '480'})
zip = zipfile.ZipFile("playableAds/adword_320_480.zip",
                      "w", zipfile.ZIP_DEFLATED)
zip.write("playableAds/index.html", "index.html")
zip.close()

print("Build playable ads google_ads Done!")
