import json
def read_json(json_path):
  with open(json_path, 'r') as f:
    return json.load(f)
  
def write_json(json_path, data):
  with open(json_path, 'w') as f:
    json.dump(data, f, indent=2)


if __name__ == '__main__':
  data = read_json("data/projects.json")
  key = "blurDataURL"

  for project in data:
    for image in project["media"]:
      if key in image:
        print(f"removing from: {image['src']}")
        del image[key]
  write_json("data/projects.json", data)
  print("\n\ndone!")
