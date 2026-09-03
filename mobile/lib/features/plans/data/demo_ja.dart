import 'package:insider/features/plans/data/mock_plans.dart';

class DemoJa {
  DemoJa._();

  static const planReview = '計画レビュー';
  static const all = 'すべて';
  static const pending = '未処理';
  static const approved = '承認済';
  static const rejected = '却下済';
  static const retry = '再試行';
  static const failedLoad = '計画を読み込めませんでした';
  static const unknownError = '不明なエラー';
  static const allCaughtUp = '対応は完了しています';
  static const askHint = 'この計画について質問する…';
  static const managerOnly = 'マネージャー専用です';
  static const after = '確定';
  static const hideTrace = '分析トレースを隠す';
  static String viewTrace(int n) => '分析トレースを見る（$n ステップ）';
  static const hideReasoning = '根拠を隠す';
  static const viewReasoning = '根拠を見る';
  static const reasoning = '根拠';
  static const evidence = '証拠';
  static const reject = '却下';
  static const accept = '承認';
  static const reset = 'リセット';
  static const approvedStatus = '承認済み';
  static const rejectedStatus = '却下済み';
  static String adjustedTo(int q) => '数量を $q に調整';
  static String acceptQty(int q) => '承認（$q）';
  static String confident(int pct) => '$pct% 確信度';
  static String marginPct(String signed) => '$signed% 粗利';
  static const today = '今日';
  static const yesterday = '昨日';
  static const unit = '点';
  static String obsActions(int o, int a) => '観察 $o ・提案 $a';
  static String confidenceLine(double score) =>
      '計画 ・ 信頼度 ${(score * 100).toStringAsFixed(1)}%';

  static String tokenLabel(String label) {
    switch (label) {
      case 'Confidence':
      case 'confidence':
        return '確信度';
      case 'Qty':
      case 'qty':
        return '数量';
      default:
        return label;
    }
  }

  static String tokenSegment(String segment) {
    return segment
        .replaceAll('Confidence', '確信度')
        .replaceAll('Qty', '数量')
        .replaceAll('margin', '粗利');
  }

  static String source(String raw) {
    switch (raw.toUpperCase()) {
      case 'INVENTORY':
        return '在庫';
      case 'SALES':
        return '売上';
      case 'WEATHER':
        return '天候';
      case 'EXPIRY':
        return '期限';
      case 'AI':
        return 'AI';
      case 'POLICY':
        return '方針';
      case 'UNKNOWN':
        return '不明';
      default:
        return raw;
    }
  }

  static String reasoningFor(String sku, ProposalType type, int qty) {
    switch (type) {
      case ProposalType.order:
        return '$sku の在庫が不足しています。販売動向から $qty 点の発注を推奨します。';
      case ProposalType.markdown:
        return '$sku は期限が近いため、値下げで $qty 点の消化を推奨します。';
      case ProposalType.restock:
        return '$sku の棚在庫が少ないため、$qty 点の補充を推奨します。';
      case ProposalType.discontinue:
        return '$sku の需要が低下しているため、取り扱い終了を推奨します。';
    }
  }

  static String evidenceLine(String sku, String sourceName) {
    switch (source(sourceName)) {
      case '在庫':
        return '$sku の現在庫は安全在庫を下回っています。';
      case '売上':
        return '直近の販売は安定、または需要の変化が見られます。';
      case '天候':
        return '今後の天候が需要に影響する見込みです。';
      case '期限':
        return '賞味・消費期限が近いため、早めの対応が必要です。';
      default:
        return '$sku の状況を確認し、上記の対応を提案します。';
    }
  }
}
