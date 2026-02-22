# How to Add Your Resume to Your Portfolio

## Step 1: Prepare Your Resume
- You have a resume file: "AkshatMncResume(1)" 
- Rename it to: **`Akshat_Ghatiya_Resume.pdf`** (or keep your preferred name and update the import below)

## Step 2: Add Resume File to Assets Folder
1. Navigate to: `frontend/src/assests/`
2. Place your PDF file there
3. The full path should be: `frontend/src/assests/Akshat_Ghatiya_Resume.pdf`

## Step 3: File Already Imported!
✅ The resume is already imported in Portfolio.tsx:
```tsx
import resume from "@/assests/Akshat_Ghatiya_Resume.pdf";
```

## Step 4: Download Buttons Added!
✅ Download buttons are now available in:
1. **Hero Section** - Between "View Projects" and "Contact Me" buttons
2. **About Section** - Below the stats cards

## Customization (if needed):

### If you want to rename the file:
Edit these lines in `Portfolio.tsx`:

**Line 17** - Update the import:
```tsx
// Change this:
import resume from "@/assests/Akshat_Ghatiya_Resume.pdf";

// To your filename (e.g.):
import resume from "@/assests/AkshatMncResume.pdf";
```

**Line 390** - Update the download name:
```tsx
// Change this:
download="Akshat_Ghatiya_Resume.pdf"

// To your filename:
download="AkshatMncResume.pdf"
```

**Line 468** - Update the download name:
```tsx
// Change this:
download="Akshat_Ghatiya_Resume.pdf"

// To your filename:
download="AkshatMncResume.pdf"
```

## That's It! 🎉
Once you've added your PDF file to the assets folder, the download buttons will work perfectly!

## Features Implemented:
✅ Download button with Download icon in Hero section
✅ Download button in About section
✅ Automatic file download with proper filename
✅ Responsive design (works on mobile & desktop)
✅ Smooth animations and styling
