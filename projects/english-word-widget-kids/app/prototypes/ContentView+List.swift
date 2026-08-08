import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            List(WordStore.words) { item in
                HStack(spacing: 14) {
                    Image(systemName: item.symbol)
                        .frame(width: 36)
                    VStack(alignment: .leading) {
                        Text(item.word).font(.headline)
                        Text(item.pronunciation).foregroundStyle(.secondary)
                        Text(item.translation)
                    }
                }
                .padding(.vertical, 4)
            }
            .navigationTitle("English Words")
        }
    }
}
