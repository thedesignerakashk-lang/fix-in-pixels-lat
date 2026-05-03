# Firebase Authentication Setup Guide

## Issues Fixed

This guide addresses three main issues:
1. **Google Login Popup Closing Suddenly** - Firebase auth provider configuration
2. **Website Lagging** - Performance optimizations applied
3. **Login Not Working** - Error handling and configuration

---

## Firebase Console Configuration (REQUIRED)

### Step 1: Add Authorized Domains
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `gen-lang-client-0221318926`
3. Navigate to **Authentication > Settings**
4. Under "Authorized domains", add:
   - `localhost`
   - `localhost:3000`
   - Your production domain (e.g., `example.com`)
   - `127.0.0.1`

### Step 2: Enable Google Sign-In Method
1. Go to **Authentication > Sign-in method**
2. Click on **Google**
3. Enable it and ensure:
   - Support email is properly set
   - Google Cloud project is linked
4. Click **Save**

### Step 3: Verify Google Cloud Project Settings
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select the same project
3. Navigate to **APIs & Services > Credentials**
4. Find your OAuth 2.0 Client ID (the Web application one)
5. Click it and verify:
   - **Authorized JavaScript origins** includes:
     - `http://localhost:3000`
     - `http://localhost`
     - `http://127.0.0.1:3000`
     - Your production domain
   - **Authorized redirect URIs** includes:
     - `https://gen-lang-client-0221318926.firebaseapp.com/__/auth/handler`
     - Any other custom domains you're using

### Step 4: Enable Firestore
1. Go to **Firestore Database**
2. Ensure it's created and initialized
3. The database ID in your config should match: `ai-studio-ab7d7563-9918-4fff-a5c9-a1e6c569a8b4`

---

## Code Changes Applied

### 1. Enhanced Firebase Configuration (`src/lib/firebase.ts`)
- ✅ Added persistent authentication storage
- ✅ Configured Google provider with proper scopes
- ✅ Added email and profile permissions

### 2. Improved Login Error Handling (`src/App.tsx`)
- ✅ Handles popup blocked errors
- ✅ Handles CORS errors
- ✅ Provides user-friendly error messages
- ✅ Logs errors for debugging

### 3. Performance Optimizations
- ✅ Optimized Lenis scroll behavior (reduced duration from 1.5s to 1.2s, lerp from 0.1 to 0.08)
- ✅ Added wheel multiplier to reduce scroll intensity (0.8)
- ✅ Optimized SVG animations with reduced opacity and will-change hints
- ✅ Configured Vite for code splitting of large dependencies

---

## Testing Your Setup

### Test 1: Local Development
```bash
npm install
npm run dev
```
Open browser to `http://localhost:3000`

### Test 2: Check Browser Console
1. Open DevTools (F12)
2. Go to **Console** tab
3. Click "Client Login" button
4. You should see either:
   - Google login popup (success)
   - Error message in browser alert (check console for details)

### Test 3: Common Issues & Solutions

#### Issue: "Popup was blocked by your browser"
- **Solution**: Check browser popup blocker settings
- Allow popups from `localhost:3000` and your domain
- Some browsers require user interaction before popup

#### Issue: "Unable to reach authentication service"
- **Solution**: Check CORS configuration in Google Cloud Console
- Verify authorized domains are properly added
- Clear browser cache and try again

#### Issue: Popup closes immediately after opening
- **Solution**: 
  - Check if there's a JavaScript error (see DevTools Console)
  - Verify Firebase config is correct
  - Check that Google Sign-In is enabled in Firebase Console

#### Issue: Login succeeds but no redirect
- **Solution**: Clear localStorage and try again
- Check that `thedesignerakashk@gmail.com` is added as test user if in dev mode

---

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: May need to allow "third-party cookies" for authentication
- Mobile browsers: Use redirect flow instead of popup (future enhancement)

---

## Environment Variables
Ensure your `.env` file includes:
```
VITE_FIREBASE_API_KEY=AIzaSyBh3ntcfSWYGWJvlqDgbedPKIbBUgsf1io
VITE_FIREBASE_PROJECT_ID=gen-lang-client-0221318926
# Other variables as needed
```

---

## Performance Tips After Setup

1. **Use Chrome DevTools Lighthouse** to check performance
   - Target: Lighthouse score > 80
   
2. **Monitor Network Tab** for slow requests
   - Firebase API calls should be <500ms
   
3. **Check FCP/LCP Metrics**
   - First Contentful Paint should be < 1.8s
   - Largest Contentful Paint should be < 2.5s

4. **Disable unused features** if still lagging:
   - Comment out `InteractiveBackground` temporarily to test
   - Disable mouse tracking in `CustomCursor` if needed
   - Use Chrome DevTools Performance tab to profile

---

## Need More Help?

### Firebase Docs
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Google Sign-In Setup](https://firebase.google.com/docs/auth/web/google-signin)

### Debugging
1. Check browser console (DevTools F12)
2. Check Firebase Console error logs
3. Enable verbose logging: `setLogLevel('debug')` in firebase.ts
4. Check network requests in DevTools > Network tab

---

## Deployment Checklist

Before deploying to production:
- [ ] Add production domain to Firebase authorized domains
- [ ] Add production domain to Google Cloud Console credentials
- [ ] Update any hardcoded localhost URLs
- [ ] Set admin email to actual admin email (currently `thedesignerakashk@gmail.com`)
- [ ] Test login flow on production domain
- [ ] Verify Firestore security rules are appropriate
- [ ] Run `npm run build` and test with `npm run preview`
