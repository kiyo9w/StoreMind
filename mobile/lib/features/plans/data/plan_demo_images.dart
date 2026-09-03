/// Bundled grocery photos for Plan Review demo tiles.
class PlanDemoImages {
  PlanDemoImages._();

  static const int count = 12;

  static String forKey(String key) {
    final i = key.isEmpty ? 0 : key.hashCode.abs() % count;
    final n = i.toString().padLeft(2, '0');
    return 'assets/images/products/$n.jpg';
  }
}
