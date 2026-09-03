import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:insider/core/design_system/design_system.dart';
import 'package:insider/features/profile/cubit/profile_cubit.dart';
import 'package:insider/features/profile/cubit/profile_state.dart';

class EditProfileScreen extends StatefulWidget {
  const EditProfileScreen({
    required this.fieldName,
    required this.fieldValue,
    super.key,
  });

  final String fieldName;
  final String fieldValue;

  @override
  State<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  late TextEditingController _controller;
  bool _hasChanges = false;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.fieldValue);
    _controller.addListener(_onTextChanged);
  }

  @override
  void dispose() {
    _controller.removeListener(_onTextChanged);
    _controller.dispose();
    super.dispose();
  }

  void _onTextChanged() {
    setState(() {
      _hasChanges = _controller.text.trim() != widget.fieldValue;
    });
  }

  Future<void> _handleUpdate(BuildContext context) async {
    if (!_hasChanges) return;

    final profileCubit = context.read<ProfileCubit>();
    final value = _controller.text.trim();

    String? name;
    String? username;
    String? introduction;
    String? location;
    
    final field = widget.fieldName.toLowerCase();
    if (field.contains('name') && !field.contains('username')) {
      name = value;
    } else if (field.contains('username')) {
      username = value;
    } else if (field.contains('introduction') || field.contains('bio')) {
      introduction = value;
    } else if (field.contains('location')) {
      location = value;
    }

    await profileCubit.updateProfile(
      name: name,
      username: username,
      introduction: introduction,
      location: location,
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return BlocConsumer<ProfileCubit, ProfileState>(
      listener: (context, state) {
        if (!state.isLoading && state.error == null && _hasChanges) {
          context.pop();
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('${widget.fieldName} updated successfully'),
              backgroundColor: Colors.green,
            ),
          );
        } else if (state.error != null && state.error!.isNotEmpty) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(state.error!),
              backgroundColor: DesignSystem.error,
            ),
          );
        }
      },
      builder: (context, state) {
        final isLoading = state.isLoading;

        return Scaffold(
          backgroundColor: isDark
              ? DesignSystem.backgroundDark
              : DesignSystem.backgroundLight,
          body: SafeArea(
            child: Column(
              children: [
                _buildHeader(context, isDark),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.fieldName,
                          style: TextStyle(
                            color: isDark
                                ? DesignSystem.textSecondaryDark
                                : DesignSystem.textSecondaryLight,
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        const SizedBox(height: 12),
                        TextField(
                          controller: _controller,
                          autofocus: true,
                          style: TextStyle(
                            color: isDark
                                ? DesignSystem.textPrimaryDark
                                : DesignSystem.textPrimaryLight,
                            fontSize: 16,
                            fontWeight: FontWeight.w400,
                          ),
                          decoration: InputDecoration(
                            filled: true,
                            fillColor: isDark
                                ? DesignSystem.backgroundDarkElevated
                                : DesignSystem.backgroundLightElevated,
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(
                                color: isDark
                                    ? DesignSystem.borderDark
                                    : DesignSystem.borderLight,
                              ),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(
                                color: isDark
                                    ? DesignSystem.borderDark
                                    : DesignSystem.borderLight,
                              ),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(
                                color: DesignSystem.primaryCyan,
                                width: 1.5,
                              ),
                            ),
                            contentPadding: const EdgeInsets.all(16),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(24),
                  child: SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: ElevatedButton(
                      onPressed: !_hasChanges || isLoading
                          ? null
                          : () => _handleUpdate(context),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _hasChanges && !isLoading
                            ? DesignSystem.primaryCyan
                            : (isDark
                                ? DesignSystem.backgroundDarkElevated
                                : DesignSystem.backgroundLightElevated),
                        foregroundColor: _hasChanges && !isLoading
                            ? Colors.white
                            : (isDark
                                ? DesignSystem.textTertiaryDark
                                : DesignSystem.textTertiaryLight),
                        disabledBackgroundColor: isDark
                            ? DesignSystem.backgroundDarkElevated
                            : DesignSystem.backgroundLightElevated,
                        disabledForegroundColor: isDark
                            ? DesignSystem.textTertiaryDark
                            : DesignSystem.textTertiaryLight,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        elevation: 0,
                      ),
                      child: isLoading
                          ? const SizedBox(
                              width: 20,
                              height: 20,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                valueColor:
                                    AlwaysStoppedAnimation<Color>(Colors.white),
                              ),
                            )
                          : const Text(
                              'Update',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildHeader(BuildContext context, bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: isDark ? DesignSystem.borderDark : DesignSystem.borderLight,
            width: 0.5,
          ),
        ),
      ),
      child: Row(
        children: [
          GestureDetector(
            onTap: () {
              HapticFeedback.lightImpact();
              context.pop();
            },
            child: Container(
              width: 40,
              height: 40,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.arrow_back,
                size: 24,
                color: isDark ? DesignSystem.iconDark : DesignSystem.iconLight,
              ),
            ),
          ),
          Expanded(
            child: Text(
              widget.fieldName,
              textAlign: TextAlign.center,
              style: DesignSystem.headingMedium.copyWith(
                color: isDark
                    ? DesignSystem.textPrimaryDark
                    : DesignSystem.textPrimaryLight,
                fontSize: 17,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          const SizedBox(width: 40),
        ],
      ),
    );
  }
}
