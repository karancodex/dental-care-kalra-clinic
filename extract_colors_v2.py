from PIL import Image
import collections

def get_dominant_colors(path, num_colors=5):
    img = Image.open(path)
    img = img.resize((50, 50)) # smaller for speed
    img = img.convert('RGB')
    pixels = list(img.getdata())
    # Simple quantization to group similar colors
    quantized_pixels = [(r//30*30, g//30*30, b//30*30) for r, g, b in pixels]
    counter = collections.Counter(quantized_pixels)
    most_common = counter.most_common(num_colors)
    return most_common

colors = get_dominant_colors('/home/admin-k/Desktop/workspace/kalra’s-dental-clinic/public/clinic_logo.jpg')
for color, count in colors:
    # Approximate back to center of bin
    r,g,b = color
    print(f"Hex: #{r:02x}{g:02x}{b:02x}")
