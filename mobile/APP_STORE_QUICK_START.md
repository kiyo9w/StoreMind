# Quick Start: Upload Insider App to Apple App Store

## ⚡ Fast Track Checklist

### Before You Start (30 minutes)

- [ ] **Enroll in Apple Developer Program** ($99/year)
  - Go to: https://developer.apple.com/programs/
  - Sign up with your Apple ID
  - Wait for approval (24-48 hours)

- [ ] **Install/Update Xcode**
  - Download from Mac App Store
  - Open Xcode and install additional components

### Step 1: Prepare Assets (1-2 hours)

- [ ] **App Icon**: 1024x1024 PNG (no transparency, no rounded corners)
- [ ] **Screenshots**: At least one device size (iPhone 6.7" recommended: 1290x2796)
- [ ] **App Description**: Write compelling description (max 4000 chars)
- [ ] **Privacy Policy URL**: Create and host privacy policy
- [ ] **Support URL**: Create support page or use company website

### Step 2: Configure Project (15 minutes)

```bash
cd /Volumes/FreeSpace/insider/mobile

# 1. Update version in pubspec.yaml
# Current: version: 1.0.7+6
# Change to: version: 1.0.7+7 (increment build number)

# 2. Clean and get dependencies
flutter clean
flutter pub get

# 3. Open in Xcode
open ios/Runner.xcworkspace
```

**In Xcode:**
1. Select **Runner** project → **Runner** target
2. Go to **Signing & Capabilities**
3. Select your **Team** (Apple Developer account)
4. Verify **Bundle Identifier**: `com.insider.horseai`
5. Enable **Automatically manage signing**

### Step 3: Build & Archive (20 minutes)

**Option A: Xcode GUI (Recommended)**

1. In Xcode, select **Any iOS Device (arm64)** as destination
2. Menu: **Product** → **Archive**
3. Wait for archive to complete
4. Organizer window opens automatically

**Option B: Command Line**

```bash
cd /Volumes/FreeSpace/insider/mobile

# Build release
flutter build ios --release

# Archive in Xcode
cd ios
xcodebuild -workspace Runner.xcworkspace \
  -scheme Runner \
  -configuration Release \
  -archivePath build/Runner.xcarchive \
  archive
```

### Step 4: Upload to App Store (30 minutes)

**In Xcode Organizer:**

1. Select your archive
2. Click **Validate App** → Fix any issues
3. Click **Distribute App**
4. Select **App Store Connect** → **Upload**
5. Check options:
   - ✅ Upload symbols
   - ✅ Manage version and build number
6. Click **Upload**
7. Wait for upload to complete (10-30 minutes)

### Step 5: Configure in App Store Connect (1-2 hours)

1. Go to: https://appstoreconnect.apple.com/
2. Click **My Apps** → **+** → **New App**

**Fill Required Information:**

| Section | What to Fill |
|---------|--------------|
| **App Information** | Name, Subtitle, Category |
| **Pricing** | Free or Paid, Countries |
| **Privacy** | Privacy policy URL, data collection |
| **Screenshots** | Upload for required device sizes |
| **Description** | App description, keywords, support URL |
| **Build** | Select uploaded build (wait 10-30 min to appear) |
| **App Icon** | 1024x1024 PNG |
| **Age Rating** | Complete questionnaire |
| **App Review Info** | Contact info, demo account if needed |

### Step 6: Submit for Review (5 minutes)

1. Verify all sections have green checkmarks
2. Click **Add for Review**
3. Review all information
4. Click **Submit to App Review**
5. Wait for review (24-48 hours typically)

---

## 🚨 Common Issues & Quick Fixes

### "No signing certificate"
→ Xcode → Preferences → Accounts → Add Apple ID → Download Profiles

### "Bundle ID already in use"
→ Change bundle ID in Xcode and create new App ID in Developer Portal

### "Build not appearing"
→ Wait 30 minutes, check email for processing errors

### "Missing compliance"
→ Answer Export Compliance in App Store Connect (usually "No" for standard apps)

---

## 📱 What I've Already Done for You

✅ Added required privacy permissions to `Info.plist`:
- Camera access permission
- Photo library access permission
- Photo library save permission

✅ Current app configuration:
- **App Name**: Insider
- **Bundle ID**: com.insider.horseai (verify in Xcode)
- **Version**: 1.0.7+6 (increment to +7 for next upload)
- **Languages**: Vietnamese, English

---

## 🎯 Critical Requirements

### Must Have Before Submission:

1. **Privacy Policy URL** (REQUIRED)
   - Host on your website or use free service
   - Must be publicly accessible
   - Example services: iubenda.com, freeprivacypolicy.com

2. **Support URL** (REQUIRED)
   - Can be company website
   - Email: support@yourcompany.com
   - Or dedicated support page

3. **App Store Screenshots** (REQUIRED)
   - Minimum: 3 screenshots for one device size
   - Recommended: 6.7" iPhone (1290 x 2796 px)
   - Use actual app screenshots, not mockups

4. **App Icon** (REQUIRED)
   - 1024x1024 pixels
   - PNG format
   - No transparency
   - No rounded corners (Apple adds them)

---

## ⏱️ Timeline Estimate

| Phase | Time |
|-------|------|
| Apple Developer enrollment | 24-48 hours |
| Prepare assets | 1-2 hours |
| Configure & build | 30-45 minutes |
| Upload to App Store Connect | 30 minutes |
| Fill App Store Connect info | 1-2 hours |
| Apple review | 24-48 hours |
| **Total** | **2-4 days** |

---

## 📞 Need Help?

- **Full detailed guide**: See `APP_STORE_UPLOAD_GUIDE.md`
- **Apple Developer Support**: https://developer.apple.com/contact/
- **Flutter iOS Deployment**: https://docs.flutter.dev/deployment/ios
- **App Store Review Guidelines**: https://developer.apple.com/app-store/review/guidelines/

---

## 🎉 After Approval

Your app will be live on the App Store! You can:

1. Monitor downloads in App Store Connect Analytics
2. Respond to user reviews
3. Use TestFlight for beta testing future versions
4. Submit updates by incrementing version number

**App Store Link Format:**
`https://apps.apple.com/app/id[YOUR_APP_ID]`

---

**Ready to start? Begin with Step 1! 🚀**
