import SwiftUI

/// Prefers downloaded Fluent/Twemoji PNG from the asset catalog; falls back to SF Symbol.
struct WordVisualView: View {
    let item: WordItem
    var symbolFont: Font = .system(size: 56)
    var imageSide: CGFloat = 88

    var body: some View {
        Group {
            if let name = item.imageName {
                Image(name)
                    .resizable()
                    .scaledToFit()
                    .frame(width: imageSide, height: imageSide)
            } else {
                Image(systemName: item.symbolName)
                    .font(symbolFont)
                    .symbolRenderingMode(.hierarchical)
                    .foregroundStyle(.tint)
                    .frame(width: imageSide, height: imageSide)
            }
        }
        .accessibilityHidden(true)
    }
}
