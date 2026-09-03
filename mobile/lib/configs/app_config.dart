import 'package:flutter/foundation.dart';

class AppConfig {
  static String baseUrl = '';

  static const String defaultLocale = 'en';
  static const String firebaseWebVapidKey =
      String.fromEnvironment('FIREBASE_WEB_VAPID_KEY', defaultValue: '');

  /// Toggle this to switch between staging and production.
  /// true  => staging (localhost for dev)
  /// false => production (api.storemind.kiyo9w.dev)
  static bool useStaging = kDebugMode;

  static void configure() {
    if (useStaging) {
      configStaging();
    } else {
      configProduction();
    }
  }

  static void configStaging() {
    // For local development with Android emulator, use 10.0.2.2
    // For iOS simulator, localhost works
    // For real devices testing, use the production URL
    baseUrl = 'https://api.storemind.kiyo9w.dev'; // Use production for testing
  }

  static void configProduction() {
    baseUrl = 'https://api.storemind.kiyo9w.dev';
  }

  // Backward compatibility for any legacy calls.
  static void configDev() => configStaging();
}
