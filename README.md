# KARTEJI Web Portal (Deploy-Ready)

Static hosting guide:

1. Install Firebase CLI
   npm i -g firebase-tools

2. Login
   firebase login

3. Initialize (optional if files already exist)
   firebase use karteji

4. Deploy
   firebase deploy

This build already includes:
- index.html (weather 3D, kalender, jadwal sholat, previews)
- login/register (Firebase Auth)
- dashboard CRUD + role manager (superadmin only)
- Cloudinary uploads
- Global __firebase_config and __app_id in HTML
