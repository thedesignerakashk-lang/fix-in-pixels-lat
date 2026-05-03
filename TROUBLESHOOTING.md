# Troubleshooting Guide

## Quick Diagnosis Checklist

### For Google Login Not Working

#### Step 1: Check Browser Console
1. Open DevTools (F12 or Right-click > Inspect)
2. Click on "Console" tab
3. Click "Client Login" button
4. Look for any error messages

#### Step 2: What Error Did You See?

**If you see: "Popup was blocked"**
```
✓ Your Firefox/Chrome/Safari is blocking popups
✓ Fix: Allow popups for this site in browser settings
```

**If you see: "CORS error" or "Failed to fetch"**
```
✓ Firebase domain isn't whitelisted
✓ Fix: Add your domain to Firebase Console > Authentication > Authorized domains
```

**If you see: "popup-closed-by-user"**
```
✓ You clicked the X on the Google login popup
✓ This is normal - just click "Client Login" again
```

**If popup opens but closes immediately**
```
✓ Check browser console for JavaScript errors
✓ May indicate Firebase config issues
✓ Fix: Verify firebase-applet-config.json is correct
```

**If you see: "operation-not-supported-in-this-environment"**
```
✓ Browser may not support third-party cookies
✓ Fix (Safari): Settings > Privacy > Allow all cookies
✓ Fix (Chrome): Check that cookies aren't blocked
```

---

### For Website Lagging

#### Step 1: Check Browser DevTools Performance
```
1. Open DevTools (F12)
2. Go to "Performance" tab
3. Click record circle
4. Scroll the page for 5 seconds
5. Click stop
6. Look for long tasks (red bars) in the timeline
```

#### Step 2: Identify Bottlenecks

**If you see "Long tasks" during scroll:**
```
✓ Likely: GSAP or animation issue
✓ Fix: Try commenting out <InteractiveBackground /> in App.tsx temporarily
```

**If FPS drops below 55:**
```
✓ Likely: Heavy animations or re-renders
✓ Check: Chrome's Rendering tab for paint issues
✓ Fix: Disable smooth scrolling in Lenis temporarily
```

**If Network requests are slow:**
```
✓ Check: DevTools Network tab
✓ Look for slow Firebase calls
✓ Verify: No blocked requests (red 'X' marks)
```

#### Step 3: Test Performance Mode
Edit `src/App.tsx` temporarily:

```typescript
// Comment out this import to test without animations
// import { InteractiveBackground } from './components/InteractiveBackground';

// And comment out this in the JSX:
{/* <InteractiveBackground /> */}
```

Then reload the page. If it's much faster, the animations are the issue.

---

## Environment-Specific Fixes

### Fix for Development (localhost)

**Problem: Popup closes after opening**
```bash
# 1. Clear cache
npm run clean

# 2. Restart dev server
npm run dev

# 3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
```

**Problem: Firebase not initialized**
```bash
# 1. Check firebase-applet-config.json exists
ls -la firebase-applet-config.json

# 2. Verify it has all required fields:
cat firebase-applet-config.json
# Should have: projectId, apiKey, authDomain, etc.
```

### Fix for Production

**Problem: Login doesn't work on deployed site**
```
1. Go to Firebase Console > Authentication > Settings
2. Add your production domain to "Authorized domains"
3. Go to Google Cloud Console > APIs & Services > Credentials
4. Edit your OAuth 2.0 Client ID
5. Add your production domain to "Authorized JavaScript origins"
6. Save and wait 10-15 minutes for changes to propagate
```

---

## Step-by-Step Diagnostic Script

Run this in your browser console to test Firebase:

```javascript
// Test 1: Check if Firebase is initialized
console.log('Firebase config loaded:', typeof firebase);

// Test 2: Test Auth module
import { auth, googleProvider } from './src/lib/firebase';
console.log('Auth initialized:', !!auth);
console.log('Google provider configured:', !!googleProvider);

// Test 3: Check current user
auth.currentUser && console.log('Current user:', auth.currentUser.email);

// Test 4: Test popup manually
import { signInWithPopup } from 'firebase/auth';
signInWithPopup(auth, googleProvider)
  .then(result => console.log('✓ Login successful:', result.user.email))
  .catch(error => console.error('✗ Login failed:', error.code, error.message));
```

---

## Performance Optimization Tips

### If Page is Still Slow After Fixes

1. **Disable smooth scrolling temporarily:**
   Edit `src/App.tsx`, change:
   ```typescript
   <ReactLenis root options={{ lerp: 0.02, duration: 0.8, smoothWheel: false }}>
   ```

2. **Reduce animation quality:**
   Edit `src/components/InteractiveBackground.tsx`, change animation durations:
   ```typescript
   duration: 5  // from 10, 12, 8
   ```

3. **Profile with Chrome DevTools:**
   - Performance tab > Record
   - Look for bottlenecks
   - Check "FCP" and "LCP" metrics

4. **Check if it's image loading:**
   - DevTools Network tab
   - Look for slow image requests
   - Consider lazy loading images

---

## Still Having Issues?

### Collect Debug Information

```bash
# 1. Export browser console logs to file
# (Right-click console > Save as...)

# 2. Check build output
npm run build

# 3. Look for warnings/errors in output
```

### Share These Details

When asking for help, provide:
1. Your exact error message from console
2. Browser name and version
3. Operating system
4. Steps to reproduce
5. Screenshot of error or network requests

---

## Reset Everything

If you want a clean slate:

```bash
# 1. Clear all cache
rm -rf node_modules dist .vite-cache

# 2. Reinstall dependencies
npm install

# 3. Clear browser cache
# DevTools > Application > Storage > Clear site data

# 4. Restart dev server
npm run dev

# 5. Hard refresh page (Ctrl+Shif+R)
```

---

## Common Solutions Reference

| Symbol | Meaning |
|--------|---------|
| ✓ | Issue identified |
| ✗ | Something not working |
| 🔍 | Investigate further |
| ⚠️ | Warning sign |

| Problem | Fast Fix | Full Fix |
|---------|----------|----------|
| Popup blocked | Allow popups | N/A |
| CORS error | Add domain to Firebase | Wait 10-15 min |
| Lagging scroll | Disable animations | Profile & optimize |
| Login fails | Hard refresh | Check Firebase config |
| Slow images | Lazy load | Optimize assets |

---

## When to Seek Help

**You should create an issue if:**
- Error persists after trying all fixes above
- Multiple error messages appear together
- Issue occurs on multiple devices/browsers
- Website completely unusable

**Helpful info to include:**
- Error message (full text from console)
- Browser name and version
- Steps you already tried
- Screenshot of the error
