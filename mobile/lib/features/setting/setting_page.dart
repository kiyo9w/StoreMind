import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:insider/core/design_system/design_system.dart';
import 'package:insider/features/auth/cubit/auth_cubit.dart';
import 'package:insider/features/auth/cubit/auth_state.dart';
import 'package:insider/features/auth/view/auth_bottom_sheet.dart';
import 'package:insider/router/app_router.dart';

class SettingPage extends StatelessWidget {
  const SettingPage({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor:
          isDark ? DesignSystem.backgroundDark : DesignSystem.backgroundLight,
      body: SafeArea(
        child: BlocBuilder<AuthCubit, AuthState>(
          builder: (context, state) {
            final isAuthenticated = state.isAuthenticated;
            final user = state.user;

            return CustomScrollView(
              slivers: [
                _buildAppBar(context, isDark),
                SliverList(
                  delegate: SliverChildListDelegate([
                    _buildProfileSection(
                      context,
                      isDark,
                      isAuthenticated,
                      user?.name,
                    ),
                    const SizedBox(height: 24),
                    // _buildToggleSection(context, isDark),
                    _buildSettingsSection(context, isDark, isAuthenticated),
                    _buildNotificationToggle(context, isDark),
                    const SizedBox(height: 32),
                    // _buildFooterLinks(context, isDark),
                    const SizedBox(height: 24),
                    _buildSignOutButton(
                      context,
                      isDark,
                      isAuthenticated,
                    ),
                    const SizedBox(height: 24),
                    _buildVersionInfo(context, isDark),
                    const SizedBox(height: 32),
                  ]),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildAppBar(BuildContext context, bool isDark) {
    return SliverAppBar(
      backgroundColor:
          isDark ? DesignSystem.backgroundDark : DesignSystem.backgroundLight,
      elevation: 0,
      pinned: true,
      centerTitle: true,
      leading: IconButton(
        icon: Icon(
          Icons.close,
          color: isDark ? DesignSystem.iconDark : DesignSystem.iconLight,
          size: 28,
        ),
        onPressed: () {
          HapticFeedback.lightImpact();
          context.pop();
        },
      ),
      title: Text(
        '設定',
        style: DesignSystem.headingMedium.copyWith(
          color: isDark
              ? DesignSystem.textPrimaryDark
              : DesignSystem.textPrimaryLight,
          fontWeight: DesignSystem.semiBold,
        ),
      ),
    );
  }

  Widget _buildProfileSection(
    BuildContext context,
    bool isDark,
    bool isAuthenticated,
    String? name,
  ) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Row(
        children: [
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: DesignSystem.backgroundDark,
              boxShadow: [
                BoxShadow(
                  color:
                      (isDark ? Colors.white : Colors.black).withOpacity(0.1),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Icon(
              Icons.person_rounded,
              color: Colors.white,
              size: 28,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name?.isNotEmpty == true ? name! : 'Guest',
                  style: DesignSystem.headingSmall.copyWith(
                    color: isDark
                        ? DesignSystem.textPrimaryDark
                        : DesignSystem.textPrimaryLight,
                    fontWeight: DesignSystem.semiBold,
                  ),
                ),
                const SizedBox(height: 4),
                GestureDetector(
                  onTap: () {
                    HapticFeedback.lightImpact();
                    if (isAuthenticated) {
                      context.push(AppRouter.accountPath);
                    } else {
                      _showAuthSheet(context);
                    }
                  },
                  child: Text(
                    'Manage Account',
                    style: DesignSystem.bodyMedium.copyWith(
                      color: const Color(0xFF3478F6),
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Widget _buildToggleSection(BuildContext context, bool isDark) {
  //   return _SettingsTile(
  //     icon: Icons.visibility_off_outlined,
  //     title: 'Incognito Mode',
  //     isDark: isDark,
  //     trailing: Switch.adaptive(
  //       value: false,
  //       onChanged: (value) {
  //         HapticFeedback.lightImpact();
  //       },
  //       activeColor: isDark
  //           ? DesignSystem.textPrimaryDark
  //           : DesignSystem.textPrimaryLight,
  //     ),
  //   );
  // }

  Widget _buildSettingsSection(
    BuildContext context,
    bool isDark,
    bool isAuthenticated,
  ) {
    return Column(
      children: [
        _SettingsTile(
          icon: Icons.palette_outlined,
          title: 'テーマ',
          isDark: isDark,
          onTap: () {
            HapticFeedback.lightImpact();
            context.push(AppRouter.themePath);
          },
        ),
        _SettingsTile(
          icon: Icons.language_outlined,
          title: 'アプリの言語',
          isDark: isDark,
          onTap: () {
            HapticFeedback.lightImpact();
            context.push(AppRouter.languagePath);
          },
        ),
        // if (isAuthenticated)
        //   _SettingsTile(
        //     icon: Icons.tune_outlined,
        //     title: 'Personalize',
        //     isDark: isDark,
        //     onTap: () => HapticFeedback.lightImpact(),
        //   ),
      ],
    );
  }

  Widget _buildNotificationToggle(BuildContext context, bool isDark) {
    return _SettingsTile(
      icon: Icons.notifications_outlined,
      title: 'プッシュ通知',
      isDark: isDark,
      trailing: Switch.adaptive(
        value: true,
        onChanged: (value) {
          HapticFeedback.lightImpact();
        },
        activeColor: isDark
            ? DesignSystem.textPrimaryDark
            : DesignSystem.textPrimaryLight,
      ),
    );
  }

  // Widget _buildFooterLinks(BuildContext context, bool isDark) {
  //   return Column(
  //     children: [
  //       _buildSimpleTile(
  //         title: 'プライバシーポリシー',
  //         isDark: isDark,
  //         onTap: () => HapticFeedback.lightImpact(),
  //       ),
  //       _buildSimpleTile(
  //         title: '利用規約',
  //         isDark: isDark,
  //         onTap: () => HapticFeedback.lightImpact(),
  //       ),
  //     ],
  //   );
  // }

  // Widget _buildSimpleTile({
  //   required String title,
  //   required bool isDark,
  //   required VoidCallback onTap,
  // }) {
  //   return Material(
  //     color: Colors.transparent,
  //     child: InkWell(
  //       onTap: onTap,
  //       child: Container(
  //         padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
  //         child: Row(
  //           children: [
  //             Expanded(
  //               child: Text(
  //                 title,
  //                 style: DesignSystem.bodyMedium.copyWith(
  //                   color: isDark
  //                       ? DesignSystem.textPrimaryDark
  //                       : DesignSystem.textPrimaryLight,
  //                   fontSize: 16,
  //                 ),
  //               ),
  //             ),
  //           ],
  //         ),
  //       ),
  //     ),
  //   );
  // }

  Widget _buildSignOutButton(
      BuildContext context, bool isDark, bool isAuthenticated) {
    if (!isAuthenticated) {
      return _buildLoginCard(context, isDark);
    }

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {
            HapticFeedback.mediumImpact();
            context.read<AuthCubit>().logout();
          },
          borderRadius: BorderRadius.circular(8),
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 16),
            child: Center(
              child: Text(
                'ログアウト',
                style: DesignSystem.bodyMedium.copyWith(
                  color: DesignSystem.error,
                  fontSize: 16,
                  fontWeight: DesignSystem.semiBold,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLoginCard(BuildContext context, bool isDark) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Material(
        color: Colors.transparent,
        child: Ink(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                isDark
                    ? DesignSystem.backgroundDarkElevated
                    : DesignSystem.backgroundLightElevated,
                isDark
                    ? DesignSystem.backgroundDarkCard
                    : DesignSystem.backgroundLightCard,
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: DesignSystem.borderRadiusLarge,
            border: Border.all(
              color:
                  isDark ? DesignSystem.borderDark : DesignSystem.borderLight,
              width: 1,
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 22,
                offset: const Offset(0, 14),
              ),
            ],
          ),
          child: InkWell(
            borderRadius: DesignSystem.borderRadiusLarge,
            onTap: () {
              HapticFeedback.mediumImpact();
              _showAuthSheet(context);
            },
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isDark
                              ? DesignSystem.backgroundDarkCard
                              : DesignSystem.backgroundLightCard,
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          Icons.login_rounded,
                          color: isDark
                              ? DesignSystem.iconDark
                              : DesignSystem.iconLight,
                          size: 22,
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'StoreMindにログイン',
                              style: DesignSystem.headingSmall.copyWith(
                                color: isDark
                                    ? DesignSystem.textPrimaryDark
                                    : DesignSystem.textPrimaryLight,
                                fontWeight: DesignSystem.semiBold,
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              '設定を同期し、進捗を保存して、どの端末でも最新の状態を保てます。',
                              style: DesignSystem.bodySmall.copyWith(
                                color: isDark
                                    ? DesignSystem.textSecondaryDark
                                    : DesignSystem.textSecondaryLight,
                                fontSize: 13,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  Row(
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          color: isDark
                              ? DesignSystem.textPrimaryDark
                              : DesignSystem.textPrimaryLight,
                          borderRadius: BorderRadius.circular(999),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 8,
                          ),
                          child: Row(
                            children: [
                              Icon(
                                Icons.lock_open_rounded,
                                color: isDark
                                    ? DesignSystem.backgroundDark
                                    : DesignSystem.backgroundLight,
                                size: 18,
                              ),
                              const SizedBox(width: 8),
                              Text(
                                '続ける',
                                style: DesignSystem.bodyMedium.copyWith(
                                  color: isDark
                                      ? DesignSystem.backgroundDark
                                      : DesignSystem.backgroundLight,
                                  fontWeight: DesignSystem.semiBold,
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      const Spacer(),
                      Icon(
                        Icons.arrow_forward_ios_rounded,
                        color: isDark
                            ? DesignSystem.iconDark
                            : DesignSystem.iconLight,
                        size: 18,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildVersionInfo(BuildContext context, bool isDark) {
    return Center(
      child: Text(
        'Insider v2.251030.0 • Build 17068',
        style: DesignSystem.caption.copyWith(
          color: isDark
              ? DesignSystem.textTertiaryDark
              : DesignSystem.textTertiaryLight,
          fontSize: 12,
        ),
      ),
    );
  }

  void _showAuthSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => const AuthBottomSheet(),
    );
  }
}

class _SettingsTile extends StatelessWidget {
  const _SettingsTile({
    required this.icon,
    required this.title,
    required this.isDark,
    this.trailing,
    this.onTap,
  });

  final IconData icon;
  final String title;
  final bool isDark;
  final Widget? trailing;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(
                color:
                    isDark ? DesignSystem.borderDark : DesignSystem.borderLight,
                width: 0.5,
              ),
            ),
          ),
          child: Row(
            children: [
              Icon(
                icon,
                size: 24,
                color: isDark ? DesignSystem.iconDark : DesignSystem.iconLight,
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  title,
                  style: DesignSystem.bodyMedium.copyWith(
                    color: isDark
                        ? DesignSystem.textPrimaryDark
                        : DesignSystem.textPrimaryLight,
                    fontSize: 16,
                  ),
                ),
              ),
              if (trailing != null)
                trailing!
              else
                Icon(
                  Icons.arrow_forward_ios_rounded,
                  size: 16,
                  color:
                      isDark ? DesignSystem.iconDark : DesignSystem.iconLight,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
