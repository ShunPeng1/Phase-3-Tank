import os

def get_file_type(file_name):
    # Define file type based on the extension
    image_extensions = ['.png', '.jpg', '.jpeg'
                        , '.gif', '.bmp'
                        #, '.svg'
                        ]
    audio_extensions = ['.mp3', '.wav', '.ogg', '.flac']
    text_extensions = ['.txt', '.json', '.xml', '.csv']

    if any(file_name.endswith(ext) for ext in image_extensions):
        return "image"
    elif any(file_name.endswith(ext) for ext in audio_extensions):
        return "audio"
    elif any(file_name.endswith(ext) for ext in text_extensions):
        return "text"
    else:
        return None

def print_asset_info(directory, output_file):
    with open(output_file, 'w') as file:
        for root, dirs, files in os.walk(directory):
            for file_name in files:
                file_type = get_file_type(file_name)
                if file_type:
                    key = file_name.split('.')[0]  # Remove the file extension to get the key
                    relative_path = os.path.relpath(root, directory)  # Get relative path of the file
                    url = os.path.join(relative_path, file_name).replace('\\', '/')
                    file.write(f"""      {{
        "type": "{file_type}",
        "key": "{key}",
        "url": "{url}"
      }},\n""")

# Example usage
directory = "./assets/penzilla-basic-gui/"
output_file = "asset_info.txt"
print_asset_info(directory, output_file)