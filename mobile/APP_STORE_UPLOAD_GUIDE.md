# Apple App Store Upload Guide for Insider App

This guide will walk you through the complete process of uploading your Flutter app to the Apple App Store.

## Prerequisites Checklist

Before you begin, ensure you have:

- [ ] **Apple Developer Account** ($99/year)
  - Sign up at: https://developer.apple.com/programs/
  - Enrollment can take 24-48 hours for approval
  
- [ ] **Mac with Xcode installed** (latest stable version recommended)
  - Download from Mac App Store or https://developer.apple.com/xcode/
  
- [ ] **Valid Apple ID** with Two-Factor Authentication enabled

- [ ] **App Store Connect Access**
  - Access at: https://appstoreconnect.apple.com/

---

## Step 1: Prepare Your App Metadata

### 1.1 App Information You'll Need

Gather the following information before starting:

- **App Name**: "Insider" (or your preferred name - check availability)
- **Bundle ID**: `com.insider.horseai` (must be unique, cannot be changed after first upload)
- **Primary Language**: English or Vietnamese
- **Category**: Choose appropriate category (e.g., News, Productivity, etc.)
- **Privacy Policy URL**: Required for App Store submission
- **Support URL**: Required for App Store submission

### 1.2 Required Assets

Prepare these visual assets:

1. **App Icon** (1024x1024 px, PNG, no transparency, no rounded corners)
   - Location: `/Volumes/FreeSpace/insider/mobile/ios/Runner/Assets.xcassets/AppIcon.appiconset/`

2. **Screenshots** (Required for at least one device size):
   - iPhone 6.7" (1290 x 2796 px) - iPhone 15 Pro Max
   - iPhone 6.5" (1284 x 2778 px) - iPhone 14 Plus
   - iPhone 5.5" (1242 x 2208 px) - iPhone 8 Plus
   - iPad Pro 12.9" (2048 x 2732 px)
   
3. **App Preview Videos** (Optional but recommended)
   - Max 30 seconds, MP4 or MOV format

4. **App Description**:
   - Short description (170 characters max)
   - Full description (4000 characters max)
   - Keywords (100 characters max, comma-separated)
   - What's New text for this version

---

## Step 2: Configure Your Xcode Project

### 2.1 Open Project in Xcode

```bash
cd /Volumes/FreeSpace/insider/mobile
open ios/Runner.xcworkspace
```

> ⚠️ **IMPORTANT**: Always open `.xcworkspace`, NOT `.xcodeproj` when using CocoaPods!

### 2.2 Configure Signing & Capabilities

1. In Xcode, select **Runner** in the project navigator
2. Select the **Runner** target
3. Go to **Signing & Capabilities** tab
4. **Team**: Select your Apple Developer Team
5. **Bundle Identifier**: Verify it matches your desired ID (e.g., `com.insider.horseai`)
6. **Signing Certificate**: Select "Apple Distribution" for App Store builds
7. Enable **Automatically manage signing** (recommended for beginners)

### 2.3 Update App Version

Your current version in `pubspec.yaml` is: **1.0.7+6**

- Version name: `1.0.7` (user-facing version)
- Build number: `6` (internal build number)

> 📝 **Note**: Each new upload to App Store Connect must have a unique build number. Increment the number after `+` for each upload.

To update version:

```bash
# Edit pubspec.yaml
# Change: version: 1.0.7+6
# To:     version: 1.0.7+7  (or higher)
```

### 2.4 Configure Info.plist Permissions

Your app uses Firebase and image picker, so ensure these permissions are in `Info.plist`:

```xml
<!-- Camera Permission (for image_picker) -->
<key>NSCameraUsageDescription</key>
<string>This app needs camera access to upload images</string>

<!-- Photo Library Permission -->
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs photo library access to select images</string>

<!-- Internet Access (Firebase) -->
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

---

## Step 3: Build and Archive Your App

### 3.1 Clean and Build

```bash
cd /Volumes/FreeSpace/insider/mobile

# Clean previous builds
flutter clean

# Get dependencies
flutter pub get

# Build iOS release
flutter build ios --release
```

### 3.2 Create Archive in Xcode

**Option A: Using Xcode GUI** (Recommended for first-time users)

1. Open `ios/Runner.xcworkspace` in Xcode
2. Select **Any iOS Device (arm64)** as the build destination (NOT a simulator)
3. Go to **Product** → **Archive**
4. Wait for the archive process to complete (5-10 minutes)
5. The **Organizer** window will open automatically

**Option B: Using Command Line**

```bash
cd /Volumes/FreeSpace/insider/mobile/ios

# Create archive
xcodebuild -workspace Runner.xcworkspace \
  -scheme Runner \
  -configuration Release \
  -archivePath build/Runner.xcarchive \
  archive
```

---

## Step 4: Upload to App Store Connect

### 4.1 Validate Archive

In Xcode Organizer:

1. Select your archive
2. Click **Validate App**
3. Choose your distribution certificate and provisioning profile
4. Wait for validation to complete
5. Fix any errors or warnings that appear

### 4.2 Distribute to App Store

1. Click **Distribute App**
2. Select **App Store Connect**
3. Click **Upload**
4. Select distribution options:
   - ✅ Upload your app's symbols (for crash reports)
   - ✅ Manage Version and Build Number (Xcode will auto-increment)
5. Review and click **Upload**
6. Wait for upload to complete (10-30 minutes depending on app size)

### 4.3 Alternative: Using Transporter App

Apple's Transporter app provides a simpler upload interface:

1. Export IPA from Xcode:
   - In Organizer, click **Distribute App**
   - Select **App Store Connect**
   - Select **Export**
   - Save the `.ipa` file

2. Download **Transporter** from Mac App Store

3. Open Transporter and drag your `.ipa` file

4. Click **Deliver** to upload

---

## Step 5: Configure App in App Store Connect

### 5.1 Create App Record

1. Go to https://appstoreconnect.apple.com/
2. Click **My Apps** → **+** → **New App**
3. Fill in:
   - **Platform**: iOS
   - **Name**: Insider
   - **Primary Language**: English or Vietnamese
   - **Bundle ID**: Select your bundle ID from dropdown
   - **SKU**: Unique identifier (e.g., `insider-app-001`)
   - **User Access**: Full Access

### 5.2 Complete App Information

Navigate through all sections and fill required information:

#### **App Information**
- Name, Subtitle, Category, Content Rights

#### **Pricing and Availability**
- Price: Free or Paid
- Availability: All countries or specific regions

#### **App Privacy**
- Complete privacy questionnaire
- Add privacy policy URL
- Declare data collection practices

#### **Prepare for Submission**

1. **Version Information**:
   - Screenshots (upload for required device sizes)
   - Description
   - Keywords
   - Support URL
   - Marketing URL (optional)
   - Version (must match your build: 1.0.7)
   - Copyright

2. **Build**:
   - Click **+** next to Build
   - Select the build you uploaded (may take 10-30 minutes to process)
   - Answer Export Compliance questions

3. **General App Information**:
   - App Icon (1024x1024)
   - Age Rating (complete questionnaire)
   - Copyright

4. **App Review Information**:
   - Contact information
   - Demo account (if login required)
   - Notes for reviewer

5. **Version Release**:
   - Automatic release after approval
   - Or manual release

---

## Step 6: Submit for Review

### 6.1 Final Checklist

Before submitting, verify:

- [ ] All required screenshots uploaded
- [ ] App description is clear and accurate
- [ ] Privacy policy URL is valid and accessible
- [ ] Support URL is valid
- [ ] Build is selected and processed
- [ ] Age rating completed
- [ ] App Review Information filled (including demo account if needed)
- [ ] All sections show green checkmarks

### 6.2 Submit

1. Click **Add for Review** (top right)
2. Review all information one final time
3. Click **Submit to App Review**
4. You'll receive confirmation email

### 6.3 Review Timeline

- **Initial Review**: 24-48 hours (can be longer)
- **Status Updates**: Check App Store Connect or email
- **Possible Outcomes**:
  - ✅ **Approved**: App goes live (or scheduled release)
  - ❌ **Rejected**: Review rejection reasons and resubmit
  - ⚠️ **Metadata Rejected**: Fix metadata issues only
  - ℹ️ **In Review**: Apple is actively reviewing
  - 🔄 **Waiting for Review**: In queue

---

## Step 7: Post-Submission

### 7.1 Monitor Status

Check status at: https://appstoreconnect.apple.com/

Status progression:
1. **Waiting for Review**
2. **In Review**
3. **Pending Developer Release** (if manual release selected)
4. **Ready for Sale** (live on App Store!)

### 7.2 If Rejected

Common rejection reasons:

1. **Missing Privacy Policy**: Add valid URL
2. **Incomplete App Information**: Fill all required fields
3. **Crashes**: Fix bugs and resubmit
4. **Guideline Violations**: Review App Store Review Guidelines
5. **Missing Demo Account**: Provide working test credentials

**To Resubmit**:
1. Address all issues mentioned in rejection
2. Increment build number if code changes required
3. Upload new build (if needed)
4. Update metadata (if needed)
5. Click **Submit for Review** again

---

## Quick Command Reference

```bash
# Update version
# Edit pubspec.yaml: version: 1.0.7+7

# Clean and build
flutter clean
flutter pub get
flutter build ios --release

# Open in Xcode
open ios/Runner.xcworkspace

# Archive (in Xcode)
# Product → Archive

# Or via command line
cd ios
xcodebuild -workspace Runner.xcworkspace \
  -scheme Runner \
  -configuration Release \
  -archivePath build/Runner.xcarchive \
  archive
```

---

## Troubleshooting

### Issue: "No signing certificate found"

**Solution**: 
1. Open Xcode → Preferences → Accounts
2. Add your Apple ID
3. Download Manual Profiles
4. Or enable "Automatically manage signing"

### Issue: "Bundle identifier is already in use"

**Solution**: 
1. Change bundle ID in Xcode
2. Update in `pubspec.yaml` if needed
3. Create new App ID in Apple Developer Portal

### Issue: "Build not appearing in App Store Connect"

**Solution**: 
1. Wait 10-30 minutes for processing
2. Check email for processing errors
3. Verify bundle ID matches App Store Connect app

### Issue: "Missing compliance"

**Solution**: 
1. Answer Export Compliance questions in App Store Connect
2. For most apps: "No" to encryption (unless you use custom encryption)

---

## Additional Resources

- **App Store Review Guidelines**: https://developer.apple.com/app-store/review/guidelines/
- **App Store Connect Help**: https://developer.apple.com/help/app-store-connect/
- **Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/
- **Flutter iOS Deployment**: https://docs.flutter.dev/deployment/ios
- **TestFlight Beta Testing**: https://developer.apple.com/testflight/

---

## Next Steps After Approval

1. **Monitor Analytics**: Check App Store Connect for downloads and metrics
2. **Respond to Reviews**: Engage with user feedback
3. **Plan Updates**: Regular updates improve ranking
4. **TestFlight**: Use for beta testing future versions
5. **App Store Optimization**: Improve keywords, screenshots, description

---

## Need Help?

If you encounter issues during this process:

1. Check Apple Developer Forums: https://developer.apple.com/forums/
2. Review Flutter iOS deployment docs: https://docs.flutter.dev/deployment/ios
3. Contact Apple Developer Support (if enrolled in paid program)

---

**Good luck with your App Store submission! 🚀**
