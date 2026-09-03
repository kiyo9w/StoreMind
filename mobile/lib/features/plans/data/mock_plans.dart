/// Mock data for Plans feature - hardcoded placeholder data
/// This simulates the overnight AI-generated inventory recommendations

enum ProposalType {
  order,
  markdown,
  restock,
  discontinue,
}

enum ProposalStatus {
  pending,
  approved,
  adjusted,
  rejected,
}

/// Represents a single agent trace from the multi-agent planning conversation
class AgentTraceItem {
  final String agentName;
  final String role;
  final String content;
  final DateTime timestamp;
  final String? modelUsed;
  final int? tokensUsed;
  final int? latencyMs;

  const AgentTraceItem({
    required this.agentName,
    required this.role,
    required this.content,
    required this.timestamp,
    this.modelUsed,
    this.tokensUsed,
    this.latencyMs,
  });

  /// Parse question and answer from AnalysisLLM trace content
  String? get question {
    if (!content.startsWith('Q: ')) return null;
    final qEnd = content.indexOf('\nA: ');
    if (qEnd < 0) return content.substring(3);
    return content.substring(3, qEnd);
  }

  String? get answer {
    final aStart = content.indexOf('\nA: ');
    if (aStart < 0) return null;
    return content.substring(aStart + 4);
  }

  /// Role-based icon
  String get roleIcon {
    switch (role) {
      case 'Deterministic':
        return '📊';
      case 'Specialist':
        return '🔍';
      case 'マネージャー':
        return '✅';
      default:
        return '🤖';
    }
  }

  /// Agent display name
  String get displayName {
    switch (agentName) {
      case 'DataGatherer':
        return 'データ収集';
      case 'AnalysisLLM':
        return 'AI分析';
      case 'ProposalGenerator':
        return '提案生成';
      case 'CriticLLM':
        return '品質レビュー';
      case 'RevisionLLM':
        return '計画修正';
      default:
        return agentName;
    }
  }
}

/// Summary information about the plan generation
class PlanSummary {
  final List<String> assumptions;
  final String? weatherSummary;
  final String? modelUsed;
  final double confidenceScore;
  final int totalActions;
  final int agentInteractions;
  final int analysisObservations;
  final int durationMs;
  final List<AgentTraceItem> traces;

  const PlanSummary({
    this.assumptions = const [],
    this.weatherSummary,
    this.modelUsed,
    this.confidenceScore = 0.0,
    this.totalActions = 0,
    this.agentInteractions = 0,
    this.analysisObservations = 0,
    this.durationMs = 0,
    this.traces = const [],
  });

  /// Format duration as human-readable string
  String get formattedDuration {
    if (durationMs < 1000) return '${durationMs}ms';
    final seconds = durationMs / 1000;
    if (seconds < 60) return '${seconds.toStringAsFixed(1)}s';
    final minutes = seconds / 60;
    return '${minutes.toStringAsFixed(1)}min';
  }
}

/// Structured evidence item for display
class EvidenceItem {
  final String source;
  final String description;

  const EvidenceItem({required this.source, required this.description});

  /// Source-based icon
  String get sourceIcon {
    switch (source.toUpperCase()) {
      case 'INVENTORY':
        return '📦';
      case 'SALES':
        return '📈';
      case 'WEATHER':
        return '🌤️';
      case 'EXPIRY':
        return '⏰';
      case 'AI':
        return '🤖';
      case 'POLICY':
        return '📋';
      default:
        return '📌';
    }
  }
}

class PlanItem {
  final String id;
  final String title;
  final String subtitle;
  final String? imageUrl;
  final int quantity;
  final String unit;
  final ProposalType type;
  final String reasoning;
  final List<String> evidence;
  final List<EvidenceItem> structuredEvidence;
  final List<String> riskFlags;
  final double confidence;
  final double? marginDelta;
  ProposalStatus status;
  int adjustedQuantity;

  PlanItem({
    required this.id,
    required this.title,
    required this.subtitle,
    this.imageUrl,
    required this.quantity,
    this.unit = '点',
    required this.type,
    required this.reasoning,
    required this.evidence,
    this.structuredEvidence = const [],
    this.riskFlags = const [],
    this.confidence = 1.0,
    this.marginDelta,
    this.status = ProposalStatus.pending,
    int? adjustedQuantity,
  }) : adjustedQuantity = adjustedQuantity ?? quantity;

  PlanItem copyWith({
    String? id,
    String? title,
    String? subtitle,
    String? imageUrl,
    int? quantity,
    String? unit,
    ProposalType? type,
    String? reasoning,
    List<String>? evidence,
    List<EvidenceItem>? structuredEvidence,
    List<String>? riskFlags,
    double? confidence,
    double? marginDelta,
    ProposalStatus? status,
    int? adjustedQuantity,
  }) {
    return PlanItem(
      id: id ?? this.id,
      title: title ?? this.title,
      subtitle: subtitle ?? this.subtitle,
      imageUrl: imageUrl ?? this.imageUrl,
      quantity: quantity ?? this.quantity,
      unit: unit ?? this.unit,
      type: type ?? this.type,
      reasoning: reasoning ?? this.reasoning,
      evidence: evidence ?? this.evidence,
      structuredEvidence: structuredEvidence ?? this.structuredEvidence,
      riskFlags: riskFlags ?? this.riskFlags,
      confidence: confidence ?? this.confidence,
      marginDelta: marginDelta ?? this.marginDelta,
      status: status ?? this.status,
      adjustedQuantity: adjustedQuantity ?? this.adjustedQuantity,
    );
  }
}

class DailyPlan {
  final String id;
  final DateTime date;
  final String storeId;
  final List<PlanItem> items;
  final DateTime generatedAt;

  DailyPlan({
    required this.id,
    required this.date,
    required this.storeId,
    required this.items,
    required this.generatedAt,
  });
}

/// Mock plans data for UI development
final mockPlanItems = <PlanItem>[
  PlanItem(
    id: '1',
    title: '傘の発注',
    subtitle: '仕入先A ・ \$4.50/本',
    imageUrl:
        'https://images.unsplash.com/photo-1541697183324-e15d407c91cf?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quantity: 50,
    unit: '点',
    type: ProposalType.order,
    reasoning:
        '木〜土の降水確率は89%。現在庫は12本と危険水準です。雨天時の販売は1日平均45本。'
        '仕入先Aは\$4.50/本で、市場平均\$5.16より12.8%安いです。3日分と安全在庫を見て50本の発注を推奨します。',
    evidence: [
      '天候API: 木〜土 降水確率89%',
      '現在庫: 12本（危険水準）',
      '販売実績: 雨天時 平均45本/日',
      '価格: \$4.50 vs 市場平均 \$5.16（-12.8%）',
    ],
  ),
  PlanItem(
    id: '2',
    title: '弁当の値下げ',
    subtitle: 'SKU #BNT-042 ・ 20%割引',
    imageUrl:
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200',
    quantity: 30,
    unit: '点',
    type: ProposalType.markdown,
    reasoning:
        'SKU #BNT-042（サーモン弁当）30点は18時間で期限切れです。'
        '20%値下げで販売速度が2.1倍になる実績があります。対応しない場合の廃棄は約¥18,000。'
        '値下げすれば期限までに25〜28点売れる見込みです。',
    evidence: [
      '期限: 残り18時間',
      '値下げ効果: 販売速度2.1倍',
      '廃棄リスク: 未対応なら¥18,000',
      '見込み削減: ¥12,000〜15,000',
    ],
  ),
  PlanItem(
    id: '3',
    title: '牛乳340mlの補充',
    subtitle: '24本入り ・ 乳製品売場',
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200',
    quantity: 5,
    unit: '箱',
    type: ProposalType.restock,
    reasoning:
        '340ml牛乳の現在庫は2箱（48本）。1日平均1.2箱。リードタイムは2日。'
        '1.5日分の安全在庫を維持するため、今5箱の発注を推奨します。次回納品は翌朝です。',
    evidence: [
      '現在庫: 2箱（48本）',
      '日販: 1.2箱（29本）',
      'リードタイム: 2日',
      '安全在庫: 1.5日分',
    ],
  ),
  PlanItem(
    id: '4',
    title: 'おにぎり発注',
    subtitle: '朝便 ・ 各種味',
    imageUrl:
        'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=200',
    quantity: 120,
    unit: '点',
    type: ProposalType.order,
    reasoning:
        '明日は金曜で、おにぎりの販売が最も多い日です（平均95点、平日62点）。'
        '夕方時点の在庫は朝までにほぼゼロ。晴れ予想で来店+15%。'
        '95×1.15×1.10≈120点の発注を推奨します。',
    evidence: [
      '金曜平均: 95点（平日比+53%）',
      '天候: 晴れ、来店+15%見込み',
      '現在庫: 朝までにほぼゼロ',
      '発注計算: 95 × 1.15 × 1.10 ≈ 120',
    ],
  ),
  PlanItem(
    id: '5',
    title: '季節商品の終売',
    subtitle: '冬のホットドリンク売場',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200',
    quantity: 1,
    unit: '売場',
    type: ProposalType.discontinue,
    reasoning:
        '冬のホットドリンク販促は3週連続で売上が落ちています（ピーク比-45%）。'
        '来週は気温上昇の予報。売場は春飲料へ切り替え、残り8点は30%値下げで処分を推奨します。',
    evidence: [
      '売上推移: 3週で-45%',
      '気温: 上昇傾向',
      '残在庫: 8点',
      '推奨: 30%の見切り値下げ',
    ],
  ),
];


final mockDailyPlan = DailyPlan(
  id: 'plan-2026-01-22',
  date: DateTime(2026, 1, 22),
  storeId: 'store-001',
  items: mockPlanItems,
  generatedAt: DateTime(2026, 1, 22, 2, 0), // Generated at 2 AM
);
