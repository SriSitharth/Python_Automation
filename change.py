import os
import shutil
import re
from bs4 import BeautifulSoup

# Basic Declarations
source_js_dir = "Source_js"
source_img_dir = "Source_img"
marker_img_src = 'Source_img/marker_img'
server_path = r"C:\xampp\htdocs"
new_icon_value = "icon: startPoint"

# Main folder Declaration
destination_dir = "Documentation"

if os.path.exists(destination_dir):
 try:
  # To find the file name
  for name in os.listdir(destination_dir):
    if name.endswith(".html"):
      filename, file_extension = os.path.splitext(name)

  # Dictonary for replace
  Dict = {"PointCab Web Viewer": filename, "www.pointcab-software.com" : "www.qosteq.com", "PointCab" : "Qosteq", "info@pointcab-software.com" : "project@qosteq.com"}

  # Destination folder Declaration
  destination_js_dir = destination_dir+"/"+filename+"_web/js"
  destination_img_dir = destination_dir+"/"+filename+"_web/basestyle"
  marker_img_dest = destination_dir+"/"+filename+"_web/img"

  # Copying files to Destination
  for file in os.listdir(source_js_dir):
      shutil.copy(os.path.join(source_js_dir, file), destination_js_dir)
      print("JS file copied successful")
  for file in os.listdir(source_img_dir):
    if file.startswith("logo"):
      shutil.copy(os.path.join(source_img_dir, file), destination_img_dir)
      print("Image copied successful")
  for file in os.listdir(marker_img_src):
      shutil.copy(os.path.join(marker_img_src, file), marker_img_dest)
      print("Marker Image copied successful")

  # Folder path containing the HTML files
  folder_path = destination_dir+'/'+filename+"_web"
  server_folder = server_path+'/'+filename+'_web'
  leaflet_path = destination_dir+"/"+filename+"_web/js"

  # Code to Insert
  line_to_insert = "var startPoint = L.icon({ iconUrl: './img/startPoint.png', iconSize: [13, 13], iconAnchor: [6, 6]});"
  function_insert = "var previousSrc;var previousImgTag;addEventListener('click', function(event) {var container = event.target;if (container.tagName === 'IMG') {if (previousImgTag) {previousImgTag.src = previousSrc;}previousSrc = container.src;previousImgTag = container;container.src = './img/active.png';}});"
 
  # Script source
  script_src = './js/zoom-in-out.js'
  zoom_in_out_path = './js/zoom-in-out.js'

  # Read and process each HTML file in the web folder
  for file_name in os.listdir(folder_path):
    if file_name.startswith('panoWebGL') and file_name.endswith('.html'):
        file_path = os.path.join(folder_path, file_name)
        
        with open(file_path, 'r', encoding='utf-8') as file:
            soup = BeautifulSoup(file, 'html.parser')

            smallmap = soup.find(class_='smallmap')
            script_elements = smallmap.find_all('script')
            for script in script_elements:
                src = script.get('src')
                if not src:
                    script.extract()

            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(str(soup))

            script_exists = soup.find('script', src=zoom_in_out_path)
            if not script_exists:
                smallmap.append(soup.new_tag('script', src=script_src))
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(str(soup))
                print(f'Added script to {file_name}')
            else:
                print(f'Script already exists in {file_name}')

  # Read and process index HTML file in the folder
  for name in os.listdir(destination_dir):
        if name.endswith(".html"):
            file_path = os.path.join(destination_dir, name)
            with open(file_path, 'r') as file:
                html_content = file.read()

            for key in Dict:
              html_content = html_content.replace(key,Dict[key])
            
            with open(file_path, 'w') as file:
                file.write(html_content)
            print("HTML file updated successful")

  # Read and process layoutLeaflet file in the web/js folder
  for file in os.listdir(leaflet_path):
    if file.startswith("layoutLeaflet"):
      file_path = os.path.join(leaflet_path, file)

      with open(file_path, 'r') as f:
        lines = f.readlines()
        
      for i in range(len(lines)):
        if "measureArea.addTo(map);" in lines[i]:
          lines.insert(i+1,line_to_insert)

      for i in range(len(lines)):
        if "var scan0 =" in lines[i]:
          if "icon: " in lines[i]:
            match = re.search(r'icon:\s*[^,}]+', lines[i])
            if match:
                lines[i] = lines[i].replace(match.group(0), new_icon_value)

      lines.append(function_insert)

      with open(file_path, 'w') as f:
        f.writelines(lines)

      print("JS file updated successful")
  # Copy Html file to server
  for file in os.listdir(destination_dir):
    if file.endswith(".html"):
      shutil.copy(os.path.join(destination_dir, file), server_path)
      print("HTML file copied to server successful")
  # Copy web folder to server
  for file in os.listdir(destination_dir):
    if not os.path.exists(server_path+'/'+filename+'_web'):
      shutil.copytree(folder_path,server_folder)
      print("Web folder copied to server successful")

 except Exception as e:
    print(e)

else:
   print("The Folder Doesn't Exist")

# Just for waiting....
input("Press any key to exit")