/// Shared string utilities for tag cleanup across the app.
///
/// Mirrors `AgentOrchestrator.StripInternalTags` on the backend so both
/// sides apply the exact same cleanup rules.
class StringUtils {
  StringUtils._(); // prevent instantiation

  // Pre-built patterns (Dart RegExp objects are already compiled internally)
  static final _statusPairTag = RegExp('<status>[^<]*</status>');
  static final _statusSingleTag = RegExp('</?status[^>]*>');
  static final _thinkingPairTag = RegExp(r'<thinking>[\s\S]*?</thinking>');
  static final _thinkingSingleTag = RegExp('</?thinking[^>]*>');
  static final _excessiveNewlines = RegExp(r'\n{3,}');

  /// Strips all `<status>`, `<thinking>` tags and orphaned fragments.
  ///
  /// This is the frontend equivalent of `AgentOrchestrator.StripInternalTags`
  /// on the C# backend. Keep both in sync when adding new tag patterns.
  static String stripInternalTags(String text) {
    var result = text;
    result = result.replaceAll(_statusPairTag, '');
    result = result.replaceAll(_statusSingleTag, '');
    result = result.replaceAll('status>', ''); // orphaned fragment
    result = result.replaceAll('thinking>', ''); // orphaned fragment
    result = result.replaceAll(_thinkingPairTag, '');
    result = result.replaceAll(_thinkingSingleTag, '');
    result = result.replaceAll(_excessiveNewlines, '\n\n');
    return result;
  }
}
