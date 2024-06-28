from PIL import Image
import pillow_avif
import base64
import io
import json
import requests
import pathlib

def scale_image_dim(img, max_size):
  width, height = img.size
  if width > height:
    new_width = max_size
    new_height = int(max_size * height / width)
  else:
    new_height = max_size
    new_width = int(max_size * width / height)
  
  if new_width == 0: new_width = 1
  if new_height == 0: new_height = 1
  return new_width, new_height

def create_blur_url(image_path, max_size=32):
  with Image.open(image_path) as img:
    width, height = img.size
    img = img.convert('RGB')
    img = img.resize(scale_image_dim(img, max_size))
    buffer = io.BytesIO()
    img.save(buffer, format='JPEG', quality=10)
    blurDataUrl = f'data:image/jpeg;base64,{base64.b64encode(buffer.getvalue()).decode()}'
    return blurDataUrl, width, height
      

def is_external_url(url):
  return url.startswith('http')

def read_json(json_path):
  with open(json_path, 'r') as f:
    return json.load(f)
  
def write_json(json_path, data):
  with open(json_path, 'w') as f:
    json.dump(data, f, indent=2)


if __name__ == '__main__':
  # ============= CONFIG =============
  SOURCE = "data/projects.json"
  DESTINATION = "data/generated/imagesMeta.json"
  SIZE = 16
  # ============= CONFIG =============

  data = read_json(SOURCE)
  isError = False
  imageDatas = []
  for project in data:
    for image in project["media"]:
      if "isVideo" in image and image["isVideo"]: continue
      if is_external_url(image["src"]):
        path = requests.get(image["src"], stream=True).raw
      else: 
        path = f"public/{image['src']}"

      try:
        print(f'{image["src"]}')
        blurUrl, width, height  = create_blur_url(path, SIZE)
        imageDatas.append({
          "src": image["src"],
          "blurDataURL": blurUrl,
          "width": width,
          "height": height
        })

        
      except Exception as e:
        print(f'Error: {e}, image: {image["src"]}')
        isError = True
        break
    
  if isError:
    print("\n\nError occured, aborting...")
  else:
    print("\n\nWrite to file...")
    pathlib.Path(DESTINATION).parent.mkdir(parents=True, exist_ok=True)
    write_json(DESTINATION, imageDatas)
    print("Done!")
  
  
  

  
