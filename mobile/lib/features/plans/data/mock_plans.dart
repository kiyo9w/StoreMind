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
      case 'Manager':
        return '✅';
      default:
        return '🤖';
    }
  }

  /// Agent display name
  String get displayName {
    switch (agentName) {
      case 'DataGatherer':
        return 'Data Gathering';
      case 'AnalysisLLM':
        return 'AI Analysis';
      case 'ProposalGenerator':
        return 'Proposal Engine';
      case 'CriticLLM':
        return 'Quality Review';
      case 'RevisionLLM':
        return 'Plan Revision';
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
    this.unit = 'units',
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
    title: 'Order Umbrellas',
    subtitle: 'Supplier A • \$4.50/unit',
    imageUrl: 'https://images.unsplash.com/photo-1541697183324-e15d407c91cf?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quantity: 50,
    unit: 'units',
    type: ProposalType.order,
    reasoning:
        'Rain forecast shows 89% precipitation probability from Thursday through Saturday. '
        'Current stock is critically low at 12 units. Historical sales data indicates average '
        'demand of 45 units per day during rain events. Supplier A is currently offering a price '
        'of \$4.50/unit, which is 12.8% below this week\'s market average of \$5.16/unit. '
        'Recommending order of 50 units to cover expected 3-day demand plus safety buffer.',
    evidence: [
      'Weather API: 89% precipitation Thu-Sat',
      'Current inventory: 12 units (critical low)',
      'Sales history: 45 units/day avg during rain',
      'Price comparison: \$4.50 vs \$5.16 market avg (-12.8%)',
    ],
  ),
  PlanItem(
    id: '2',
    title: 'Markdown Bento Boxes',
    subtitle: 'SKU #BNT-042 • Apply 20% discount',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200',
    quantity: 30,
    unit: 'units',
    type: ProposalType.markdown,
    reasoning:
        'SKU #BNT-042 (Premium Salmon Bento) has 30 units expiring within 18 hours. '
        'Historical data shows that a 20% markdown increases sales velocity by 2.1x for '
        'this product category. At current velocity (8 units/day), without markdown these '
        'items will expire unsold resulting in ¥18,000 waste. With 20% markdown, projected '
        'to sell 25-28 units before expiry, reducing waste to ¥3,000-6,000.',
    evidence: [
      'Expiry: 18 hours remaining',
      'Markdown effect: 2.1x sales velocity',
      'Waste risk: ¥18,000 if no action',
      'Projected savings: ¥12,000-15,000',
    ],
  ),
  PlanItem(
    id: '3',
    title: 'Restock Milk 340ml',
    subtitle: '24-pack boxes • Dairy section',
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200',
    quantity: 5,
    unit: 'boxes',
    type: ProposalType.restock,
    reasoning:
        'Current inventory of 340ml milk is at 2 boxes (48 units). Average daily sales '
        'is 1.2 boxes (29 units). Lead time from supplier is 2 days. To maintain safety '
        'stock of 1.5 days coverage, recommend ordering 5 boxes now. Next delivery window '
        'is tomorrow morning. Supplier B offering standard price of ¥2,400/box.',
    evidence: [
      'Current stock: 2 boxes (48 units)',
      'Daily sales: 1.2 boxes (29 units)',
      'Lead time: 2 days',
      'Safety stock target: 1.5 days',
    ],
  ),
  PlanItem(
    id: '4',
    title: 'Order Rice Balls (Onigiri)',
    subtitle: 'Morning delivery • Various flavors',
    imageUrl: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=200',
    quantity: 120,
    unit: 'units',
    type: ProposalType.order,
    reasoning:
        'Tomorrow is Friday, historically our highest onigiri sales day (avg 95 units vs '
        'weekday avg of 62 units). Current evening stock will be near zero by morning. '
        'Weather forecast shows clear skies, correlating with +15% foot traffic. '
        'Recommending 120 units: 95 base + 15% weather boost + 10% safety margin.',
    evidence: [
      'Friday sales avg: 95 units (+53% vs weekday)',
      'Clear weather: +15% expected foot traffic',
      'Current stock: Near zero by morning',
      'Order calculation: 95 × 1.15 × 1.10 ≈ 120',
    ],
  ),
  PlanItem(
    id: '5',
    title: 'Discontinue Seasonal Item',
    subtitle: 'Winter hot drinks display',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200',
    quantity: 1,
    unit: 'display',
    type: ProposalType.discontinue,
    reasoning:
        'Winter hot drinks promotional display has shown declining sales for 3 consecutive '
        'weeks (down 45% from peak). Temperature forecast shows warming trend next week. '
        'Recommend discontinuing display and transitioning shelf space to spring beverages. '
        'Remaining 8 hot drink units should be marked down 30% for clearance.',
    evidence: [
      'Sales trend: -45% over 3 weeks',
      'Temperature forecast: Warming trend',
      'Remaining inventory: 8 units',
      'Recommendation: 30% clearance markdown',
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
