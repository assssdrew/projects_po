import SwiftUI

struct BrowseView: View {
    @StateObject private var speech = SpeechHelper()

    private var days: [(day: Int, theme: String)] { WordStore.themes() }

    var body: some View {
        NavigationStack {
            List {
                ForEach(days, id: \.day) { entry in
                    NavigationLink {
                        DayDetailView(day: entry.day, theme: entry.theme, speech: speech)
                    } label: {
                        HStack {
                            Text("День \(entry.day)")
                                .font(.headline)
                            Spacer()
                            Text(entry.theme)
                                .foregroundStyle(.secondary)
                        }
                    }
                }
            }
            .navigationTitle("Все \(WordStore.words.count) слов")
        }
    }
}

struct DayDetailView: View {
    let day: Int
    let theme: String
    @ObservedObject var speech: SpeechHelper

    private var words: [WordItem] { WordStore.words(forDay: day) }

    var body: some View {
        List(words) { item in
            Button {
                speech.speakEnglish(item.word)
            } label: {
                WordRow(item: item)
            }
            .buttonStyle(.plain)
        }
        .navigationTitle("День \(day)")
        .navigationBarTitleDisplayMode(.inline)
        .safeAreaInset(edge: .top) {
            Text(theme)
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal)
                .padding(.bottom, 4)
        }
    }
}

#Preview {
    BrowseView()
}
