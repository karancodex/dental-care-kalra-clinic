from PIL import Image
from collections import Counter

def get_palette(path):
    img = Image.open(path)
    img = img.resize((150, 150))
    result = img.convert('P', palette=Image.ADAPTIVE, colors=10)
    result.putalpha(0)
    colors = result.getcolors(150*150)
    sorted_colors = sorted(colors, key=lambda x: x[0], reverse=True)
    return [c[1] for c in sorted_colors]

colors = get_palette('/home/admin-k/Desktop/workspace/kalra’s-dental-clinic/public/clinic_logo.jpg')
print("Dominant colors:", colors)
