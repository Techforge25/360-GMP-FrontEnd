# Profile Image Upload Implementation Log

**Date**: 2026-01-26  
**Time**: 10:13 AM  
**Feature**: Profile Picture and Banner Upload with Preview

---

## Overview

Implemented image upload functionality for business profile logo and banner with preview capability. Users can select images, preview them, and then save changes by clicking "Update Profile" button.

---

## User Flow

1. **Select Logo**: Click edit icon on logo → File picker opens → Select image → Preview shown with overlay
2. **Select Banner**: Click "Update cover" button → File picker opens → Select image → Preview shown with yellow indicator
3. **Save Changes**: Click "Update Profile" button → Images upload to Cloudinary → Profile updates via API
4. **Feedback**: Loading states and disabled states provide visual feedback during upload

---

## Implementation Details

### State Management

```javascript
const [newLogo, setNewLogo] = useState(null);
const [newBanner, setNewBanner] = useState(null);
const [isUploadingLogo, setIsUploadingLogo] = useState(false);
const [isUploadingBanner, setIsUploadingBanner] = useState(false);
const [isUpdating, setIsUpdating] = useState(false);

const logoInputRef = useRef(null);
const bannerInputRef = useRef(null);
```

### File Selection Handlers

**Logo Handler**:

- Validates file size (max 10MB)
- Creates preview URL using `URL.createObjectURL()`
- Stores file and preview URL in state

**Banner Handler**:

- Same validation and preview logic as logo
- Independent state management

### Upload Process

1. **Trigger**: User clicks "Update Profile" button
2. **Validation**: Button only enabled if `newLogo` or `newBanner` exists
3. **Upload Sequence**:
   - If new logo selected → Upload to `business/profile` folder
   - If new banner selected → Upload to `business/banner` folder
4. **API Update**: Send uploaded URLs to backend via `PUT /businessProfile/me`
5. **State Update**: Update local state with new profile data
6. **Cleanup**: Revoke preview URLs to free memory

### Visual Indicators

**Banner Preview**:

- Yellow badge at top-left: "New banner selected - Click 'Update Profile' to save"
- Image preview replaces current banner

**Logo Preview**:

- Dark overlay with "New logo" text
- Image preview replaces current logo

**Button States**:

- "Update Profile" button disabled when no changes pending
- Shows "Updating..." during upload
- Individual upload buttons show "Uploading..." during their respective uploads

---

## Code Structure

### Hidden File Inputs

```jsx
<input
  ref={logoInputRef}
  type="file"
  accept="image/*"
  onChange={handleLogoChange}
  className="hidden"
/>

<input
  ref={bannerInputRef}
  type="file"
  accept="image/*"
  onChange={handleBannerChange}
  className="hidden"
/>
```

### Button Connections

**Logo Edit Button**:

```jsx
<button
  onClick={handleLogoClick}
  disabled={isUploadingLogo}
  className="... disabled:opacity-50"
>
  <FiEdit2 className="w-4 h-4" />
</button>
```

**Banner Update Button**:

```jsx
<button
  onClick={handleBannerClick}
  disabled={isUploadingBanner}
  className="... disabled:opacity-50"
>
  <img src="/assets/images/cameraIcon.png" alt="" />
  {isUploadingBanner ? "Uploading..." : "Update cover"}
</button>
```

**Update Profile Button**:

```jsx
<button
  onClick={handleUpdateProfile}
  disabled={isUpdating || (!newLogo && !newBanner)}
  className="... disabled:opacity-50 disabled:cursor-not-allowed"
>
  <img src="/assets/images/updateProfileIcon.png" alt="" />
  {isUpdating ? "Updating..." : "Update Profile"}
</button>
```

---

## API Integration

### Cloudinary Upload

**Function**: `uploadToCloudinary(file, folder)`

**Folders**:

- Logo: `business/profile`
- Banner: `business/banner`

**Returns**: Secure URL of uploaded image

### Backend Update

**Endpoint**: `PUT /api/v1/businessProfile/me`

**Payload**:

```json
{
  "logo": "https://res.cloudinary.com/.../image.png",
  "banner": "https://res.cloudinary.com/.../image.png"
}
```

**Response**: Updated business profile object

---

## Features Implemented

✅ **File Selection**: Hidden file inputs triggered by visible buttons  
✅ **File Validation**: 10MB size limit with user feedback  
✅ **Preview**: Instant preview of selected images before upload  
✅ **Visual Indicators**: Clear feedback for pending changes  
✅ **Loading States**: Disabled buttons and loading text during upload  
✅ **Cloudinary Integration**: Automatic upload to cloud storage  
✅ **API Update**: Profile updated with new image URLs  
✅ **Memory Management**: Preview URLs properly cleaned up after upload  
✅ **Error Handling**: Try-catch blocks with console logging  
✅ **UX Polish**: Smooth transitions and disabled states

---

## User Experience Enhancements

1. **Two-Step Process**: Select images first, then confirm with "Update Profile"
2. **Visual Feedback**: Preview shows exactly what will be uploaded
3. **Batch Updates**: Can update both logo and banner in one action
4. **Loading Indicators**: Clear feedback during upload process
5. **Disabled States**: Prevents accidental double-clicks
6. **Error Prevention**: File size validation before upload

---

## Testing Checklist

- [ ] Logo edit button opens file picker
- [ ] Banner update button opens file picker
- [ ] File size validation works (>10MB rejected)
- [ ] Preview appears after selecting logo
- [ ] Preview appears after selecting banner
- [ ] Yellow indicator shows for new banner
- [ ] Dark overlay shows for new logo
- [ ] "Update Profile" button disabled when no changes
- [ ] "Update Profile" button enabled when image selected
- [ ] Upload to Cloudinary succeeds
- [ ] API update succeeds with new URLs
- [ ] Profile data refreshes after update
- [ ] Preview URLs properly cleaned up
- [ ] Loading states show during upload
- [ ] Buttons disabled during upload
- [ ] Can update logo only
- [ ] Can update banner only
- [ ] Can update both simultaneously
- [ ] Error handling works for failed uploads

---

## Dependencies

- `@/lib/cloudinary`: Cloudinary upload utility
- `@/services/businessProfileAPI`: Profile update API
- `react`: useState, useEffect, useRef hooks
- `next/image`: Image component
- `react-icons/fi`: Edit icon

---

## Memory Management

Preview URLs are created using `URL.createObjectURL()` and properly revoked after upload:

```javascript
if (newLogo?.previewUrl) URL.revokeObjectURL(newLogo.previewUrl);
if (newBanner?.previewUrl) URL.revokeObjectURL(newBanner.previewUrl);
```

This prevents memory leaks from blob URLs.

---

## Future Enhancements

- Add image cropping functionality
- Support drag-and-drop upload
- Add image compression before upload
- Show upload progress percentage
- Add undo functionality
- Support multiple image formats with conversion
- Add image dimension validation
- Implement optimistic UI updates
