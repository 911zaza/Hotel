#!/usr/bin/env python3
import re

# Update models.py
with open('models.py', 'r') as f:
    content = f.read()

# Add url_image_user to User class
user_pattern = r'(    address = Column\(String\(200\)\))\n(    created_at = Column\(DateTime, default=datetime\.now\))'
user_replacement = r'\1\n    url_image_user = Column(String, nullable=True)  # User profile image URL\n\2'
content = re.sub(user_pattern, user_replacement, content)

# Add url_image_chambre to Room class  
room_pattern = r'(    status = Column\(String\(20\), default="available"\))\n(    created_at = Column\(DateTime, default=datetime\.now\))'
room_replacement = r'\1\n    url_image_chambre = Column(String, nullable=True)  # Room image URL\n\2'
content = re.sub(room_pattern, room_replacement, content)

with open('models.py', 'w') as f:
    f.write(content)

print('✅ models.py updated with image columns')

# Update dto.py
with open('dto.py', 'r') as f:
    dto_content = f.read()

# Add image field to UserResponse
user_response_pattern = r'(class UserResponse\(BaseModel\):.*?address: str \| None = None)'
user_response_replacement = r'\1\n    url_image_user: str | None = None'
dto_content = re.sub(user_response_pattern, user_response_replacement, dto_content, flags=re.DOTALL, count=1)

# Add image field to UserUpdateRequest
user_update_pattern = r'(class UserUpdateRequest\(BaseModel\):.*?address: str \| None = Field\(None, min_length=5, max_length=200\))'
user_update_replacement = r'\1\n    url_image_user: str | None = None'
dto_content = re.sub(user_update_pattern, user_update_replacement, dto_content, flags=re.DOTALL, count=1)

# Add image field to RoomRequest
room_req_pattern = r'(class RoomRequest\(BaseModel\):.*?price_per_night: float = Field\(\.\.\., gt=0\))'
room_req_replacement = r'\1\n    image_url: str | None = None'
dto_content = re.sub(room_req_pattern, room_req_replacement, dto_content, flags=re.DOTALL, count=1)

# Add image field to RoomResponse
room_resp_pattern = r'(class RoomResponse\(BaseModel\):.*?is_available: bool)'
room_resp_replacement = r'\1\n    image_url: str | None = None'
dto_content = re.sub(room_resp_pattern, room_resp_replacement, dto_content, flags=re.DOTALL, count=1)

with open('dto.py', 'w') as f:
    f.write(dto_content)

print('✅ dto.py updated with image fields')
