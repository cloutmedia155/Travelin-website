from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.request import urlopen, Request
from PIL import Image, ImageOps, ImageDraw
import shutil

root = Path('/workspace/sites/travel-and-liv/public/media')
assets = {
 'olivia': 'olivia_photo.jpg', 'group': 'story_collective.jpg',
 'bali': 'bali_hero.png', 'punta': 'punta_cana_hero.png', 'rio': 'rio_hero.png',
 'ocean': 'zanzibar_hero.png', 'snorkel': 'snorkeling_mnemba.png',
 'video-poster': 'video_poster.jpg',
 'stay': 'bali/27ea4d6e_fbd36235-e900-4c1c-896b-f246125f8159.avif',
 'resort': 'punta/IMG_6312.JPG',
 'toast': 'punta/8CECEBEC-DDD1-4B9B-BEE3-DBD0FA5ECC10.JPG',
 'terraces': 'bali/jatiluwih-warisan-budaya_f4caf68e-bd5a-4190-834f-4645784211f5.jpeg',
 'boat': 'bali/utopia-catamaran-floating-beach-club-aerial-view_7d80a1cd-173f-48cf-94ab-ef690209fa34.jpeg',
 'beach': 'bali/kelingking-beach-nusa-penida_c3b4aac4-411f-4131-ab9c-705fc53b648f.jpeg',
 'moment-1': 'social_proof/KQ6A1033.JPG', 'moment-2': 'social_proof/IMG_2476.JPG',
 'moment-3': 'social_proof/IMG_2539.JPG', 'moment-4': 'social_proof/IMG_3312.JPG',
 'moment-5': 'social_proof/IMG_3328.JPG', 'moment-6': 'social_proof/IMG_3337.JPG',
 'moment-7': 'social_proof/IMG_3428.JPG', 'moment-8': 'social_proof/IMG_3482.JPG',
}
def get_asset(item):
 name,path=item
 try:
  req=Request('https://www.travelnliv.com/'+path,headers={'User-Agent':'Mozilla/5.0'})
  data=urlopen(req,timeout=40).read()
  tmp=Path('/tmp/liv-'+name);tmp.write_bytes(data)
  im=ImageOps.exif_transpose(Image.open(tmp)).convert('RGB')
  im.thumbnail((1900,1500));im.save(root/(name+'.webp'),'WEBP',quality=85)
  return name,im.size
 except Exception as e:return name,str(e)
with ThreadPoolExecutor(max_workers=8) as pool:
 for r in pool.map(get_asset,assets.items()):print(r,flush=True)

sheet=Image.new('RGB',(960,720),'white');draw=ImageDraw.Draw(sheet)
for n,frame in enumerate([0,45,90,135,180,240]):
 im=Image.open('/tmp/liv-door/images/image_'+str(frame)+'.webp');im.thumbnail((470,220))
 x=(n%2)*480;y=(n//2)*240;sheet.paste(im,(x,y));draw.text((x+8,y+220),str(frame),fill='black')
sheet.save('/tmp/door-sheet.jpg')
Image.open('/tmp/liv-door/images/image_0.webp').save(root/'door-poster.webp')
