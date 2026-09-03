import 'dart:io';
import 'package:insider/core/exceptions/api_exception.dart';
import 'package:insider/data/repositories/profile/profile_repository.dart';
import 'package:rest_client/rest_client.dart';

class ProfileRepositoryImpl implements ProfileRepository {
  ProfileRepositoryImpl({
    required ProfileClient profileClient,
  }) : _profileClient = profileClient;

  late final ProfileClient _profileClient;

  @override
  Future<ProfileResponse> getProfile() async {
    return _profileClient.getProfile().onApiError;
  }

  @override
  Future<ProfileResponse> updateProfile(UpdateProfileRequest request) async {
    return _profileClient.updateProfile(request).onApiError;
  }

  @override
  Future<ProfileResponse> uploadAvatar(File file) async {
    return _profileClient.uploadAvatar(file).onApiError;
  }

  @override
  Future<ProfileResponse> deleteAvatar() async {
    return _profileClient.deleteAvatar().onApiError;
  }

  @override
  Future<PersonalizationResponse> getPersonalization() async {
    return _profileClient.getPersonalization().onApiError;
  }

  @override
  Future<PersonalizationResponse> updatePersonalization(
      UpdatePersonalizationRequest request) async {
    return _profileClient.updatePersonalization(request).onApiError;
  }
}
