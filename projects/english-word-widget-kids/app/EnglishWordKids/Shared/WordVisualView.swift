import SwiftUI

/// Visual for a vocabulary card. MVP uses SF Symbols for every word.
/// When WikiVoc/asset images are added to the asset catalog later, switch on `visual.mode`.
struct WordVisualView: View {
    let item: WordItem
    var symbolFont: Font = .system(size: 56)
    var frameHeight: CGFloat? = 88

    var body: some View {
        Image(systemName: item.symbolName)
            .font(symbolFont)
            .symbolRenderingMode(.hierarchical)
            .foregroundStyle(.tint)
            .frame(height: frameHeight)
            .accessibilityHidden(true)
    }
}
