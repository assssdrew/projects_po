import SwiftUI

struct TodayView: View {
    @StateObject private var speech = SpeechHelper()

    private var day: Int { WordSchedule.courseDay() }
    private var words: [WordItem] { WordSchedule.todaysWords() }
    private var theme: String { words.first?.theme ?? "" }

    var body: some View {
        NavigationStack {
            Group {
                if words.isEmpty {
                    VStack(spacing: 12) {
                        Image(systemName: "book.closed")
                            .font(.largeTitle)
                        Text("Нет слов")
                            .font(.headline)
                        Text("Проверь, что words.json добавлен в target приложения.")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding()
                } else {
                    List {
                        Section {
                            VStack(alignment: .leading, spacing: 6) {
                                Text("День \(day) из \(WordStore.courseDays)")
                                    .font(.headline)
                                Text(theme)
                                    .foregroundStyle(.secondary)
                                Text("Сейчас на виджете: \(WordSchedule.currentWord()?.word ?? "—")")
                                    .font(.subheadline)
                                    .foregroundStyle(.secondary)
                            }
                            .padding(.vertical, 4)
                        }

                        Section("10 слов на сегодня") {
                            ForEach(words) { item in
                                Button {
                                    speech.speakEnglish(item.word)
                                } label: {
                                    WordRow(item: item)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }
                }
            }
            .navigationTitle("Сегодня")
        }
    }
}

struct WordRow: View {
    let item: WordItem

    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: item.symbolName)
                .font(.title2)
                .frame(width: 36)
                .foregroundStyle(.tint)
            VStack(alignment: .leading, spacing: 2) {
                Text(item.word)
                    .font(.headline)
                Text(item.pronunciation)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                Text(item.translation)
                    .font(.subheadline)
            }
            Spacer()
            Image(systemName: "speaker.wave.2.fill")
                .foregroundStyle(.secondary)
        }
        .padding(.vertical, 4)
        .contentShape(Rectangle())
    }
}

#Preview {
    TodayView()
}
