import os

def to_kebab_case(name : str) -> str:
    # Replace spaces with hyphens and make lowercase
    new_name = name[0].lower()
    for char in name[1:]:
        if char.isupper():
            new_name += '-' + char.lower()
        else:
            new_name += char
    return new_name.replace(" ", "-").replace("_", "-").replace("--", "-")

def rename_files_in_directory(directory_path):
    for root, dirs, files in os.walk(directory_path):
        # Rename files
        for file in files:
            new_file_name = to_kebab_case(file)
            old_file_path = os.path.join(root, file)
            new_file_path = os.path.join(root, new_file_name)
            os.rename(old_file_path, new_file_path)
            print(f"Renamed {old_file_path} to {new_file_path}")

    for root, dirs, files in os.walk(directory_path):
        # Rename directories
        for dir in dirs:
            new_dir_name = to_kebab_case(dir)
            old_dir_path = os.path.join(root, dir)
            new_dir_path = os.path.join(root, new_dir_name)
            os.rename(old_dir_path, new_dir_path)
            print(f"Renamed {old_dir_path} to {new_dir_path}")

# Example usage
directory_path = "./assets/audio"
rename_files_in_directory(directory_path)