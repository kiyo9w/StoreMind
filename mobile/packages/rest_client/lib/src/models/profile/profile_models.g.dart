// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'profile_models.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_ProfileData _$ProfileDataFromJson(Map<String, dynamic> json) => _ProfileData(
  id: json['id'] as String,
  name: json['name'] as String,
  email: json['email'] as String,
  username: json['username'] as String?,
  emailVerified: json['email_verified'] as bool,
  image: json['image'] as String?,
  imageUrl: json['image_url'] as String?,
  introduction: json['introduction'] as String?,
  location: json['location'] as String?,
  role: json['role'] as String,
  createdAt: DateTime.parse(json['created_at'] as String),
  updatedAt: DateTime.parse(json['updated_at'] as String),
);

Map<String, dynamic> _$ProfileDataToJson(_ProfileData instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'email': instance.email,
      'username': instance.username,
      'email_verified': instance.emailVerified,
      'image': instance.image,
      'image_url': instance.imageUrl,
      'introduction': instance.introduction,
      'location': instance.location,
      'role': instance.role,
      'created_at': instance.createdAt.toIso8601String(),
      'updated_at': instance.updatedAt.toIso8601String(),
    };

_ProfileResponse _$ProfileResponseFromJson(Map<String, dynamic> json) =>
    _ProfileResponse(
      success: json['success'] as bool,
      message: json['message'] as String,
      data: ProfileData.fromJson(json['data'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ProfileResponseToJson(_ProfileResponse instance) =>
    <String, dynamic>{
      'success': instance.success,
      'message': instance.message,
      'data': instance.data,
    };

_UpdateProfileRequest _$UpdateProfileRequestFromJson(
  Map<String, dynamic> json,
) => _UpdateProfileRequest(
  name: json['name'] as String?,
  username: json['username'] as String?,
  introduction: json['introduction'] as String?,
  location: json['location'] as String?,
);

Map<String, dynamic> _$UpdateProfileRequestToJson(
  _UpdateProfileRequest instance,
) => <String, dynamic>{
  'name': instance.name,
  'username': instance.username,
  'introduction': instance.introduction,
  'location': instance.location,
};

_UploadAvatarResponse _$UploadAvatarResponseFromJson(
  Map<String, dynamic> json,
) => _UploadAvatarResponse(
  data: ProfileData.fromJson(json['data'] as Map<String, dynamic>),
);

Map<String, dynamic> _$UploadAvatarResponseToJson(
  _UploadAvatarResponse instance,
) => <String, dynamic>{'data': instance.data};

_PersonalizationData _$PersonalizationDataFromJson(Map<String, dynamic> json) =>
    _PersonalizationData(
      userId: json['user_id'] as String,
      bio: json['bio'] as String,
      interestedCategories: (json['interested_categories'] as List<dynamic>)
          .map((e) => e as String)
          .toList(),
    );

Map<String, dynamic> _$PersonalizationDataToJson(
  _PersonalizationData instance,
) => <String, dynamic>{
  'user_id': instance.userId,
  'bio': instance.bio,
  'interested_categories': instance.interestedCategories,
};

_PersonalizationResponse _$PersonalizationResponseFromJson(
  Map<String, dynamic> json,
) => _PersonalizationResponse(
  success: json['success'] as bool,
  message: json['message'] as String,
  data: PersonalizationData.fromJson(json['data'] as Map<String, dynamic>),
);

Map<String, dynamic> _$PersonalizationResponseToJson(
  _PersonalizationResponse instance,
) => <String, dynamic>{
  'success': instance.success,
  'message': instance.message,
  'data': instance.data,
};

_UpdatePersonalizationRequest _$UpdatePersonalizationRequestFromJson(
  Map<String, dynamic> json,
) => _UpdatePersonalizationRequest(
  bio: json['bio'] as String?,
  interestedCategories: (json['interestedCategories'] as List<dynamic>?)
      ?.map((e) => e as String)
      .toList(),
);

Map<String, dynamic> _$UpdatePersonalizationRequestToJson(
  _UpdatePersonalizationRequest instance,
) => <String, dynamic>{
  'bio': instance.bio,
  'interestedCategories': instance.interestedCategories,
};
