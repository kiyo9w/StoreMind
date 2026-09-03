import 'dart:io';
import 'package:rest_client/rest_client.dart';

abstract class ProfileRepository {
  Future<ProfileResponse> getProfile();
  Future<ProfileResponse> updateProfile(UpdateProfileRequest request);
  Future<ProfileResponse> uploadAvatar(File file);
  Future<ProfileResponse> deleteAvatar();
  Future<PersonalizationResponse> getPersonalization();
  Future<PersonalizationResponse> updatePersonalization(
      UpdatePersonalizationRequest request);
}
