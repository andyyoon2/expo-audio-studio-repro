# Expo Audio Studio Permission Issue Reproduction

This is a minimal reproduction repository to test the `@siteed/expo-audio-studio` plugin's permission handling.

## Setup

1. Created with `npx create-expo-app@latest expo-audio-studio-repro --template blank-typescript`
2. Installed `@siteed/expo-audio-studio@2.14.3`
3. Configured plugin with `enableDeviceDetection: false`

## Configuration

The plugin is configured in `app.json` with:

```json
{
  "plugins": [
    [
      "@siteed/expo-audio-studio",
      {
        "enablePhoneStateHandling": false,
        "enableNotifications": false,
        "enableBackgroundAudio": true,
        "enableDeviceDetection": false,
        "iosBackgroundModes": {
          "useProcessing": true
        },
        "backgroundProcessingTitle": "Audio Recording",
        "microphoneUserPermission": "We need access to your microphone for testing."
      }
    ]
  ]
}
```

## Test App

The app has a simple button that calls `ExpoAudioStreamModule.requestPermissionsAsync()` and displays the permission status.

## Findings

### Base Manifest (After Prebuild)
The base `AndroidManifest.xml` contains:
- ✅ `RECORD_AUDIO` permission
- ✅ `FOREGROUND_SERVICE_MICROPHONE` permission
- ❌ **NO Bluetooth permissions** (as expected with `enableDeviceDetection: false`)

## Commands

```bash
# Prebuild the project
npx expo prebuild

# Run on device
npx expo run:android
``` 

- Click on "Request Permissions"
- Observe that permission is requested to find and connect to local devices
