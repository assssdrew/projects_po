import SwiftUI

struct FlashcardView: View {
    @StateObject private var speech = SpeechHelper()
    @State private var index = 0

    private var pool: [WordItem] {
        let today = WordSchedule.todaysWords()
        return today.isEmpty ? WordStore.words : today
    }

    var body: some View {
        NavigationStack {
            Group {
                if pool.isEmpty {
                    ProgressView("Загрузка слов…")
                } else {
                    let item = pool[index % pool.count]
                    VStack(spacing: 18) {
                        Text("День \(item.day) · \(item.theme)")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)

                        WordVisualView(item: item, symbolFont: .system(size: 72), imageSide: 120)

                        Text(item.word)
                            .font(.system(size: 36, weight: .bold))
                            .multilineTextAlignment(.center)

                        Text(item.pronunciation)
                            .font(.title3)
                            .foregroundStyle(.secondary)

                        Button {
                            speech.speakEnglish(item.word)
                        } label: {
                            Label("Слушать", systemImage: "speaker.wave.2.fill")
                        }
                        .buttonStyle(.borderedProminent)
                        .controlSize(.large)

                        Text(item.translation)
                            .font(.title2)

                        Text(item.example)
                            .font(.body)
                            .multilineTextAlignment(.center)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(.thinMaterial)
                            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))

                        HStack {
                            Button("← Назад") {
                                index = (index - 1 + pool.count) % pool.count
                            }
                            Spacer()
                            Text("\(index + 1) / \(pool.count)")
                                .foregroundStyle(.secondary)
                            Spacer()
                            Button("Дальше →") {
                                index = (index + 1) % pool.count
                            }
                        }
                        .padding(.top, 8)
                    }
                    .padding()
                }
            }
            .navigationTitle("Карточка")
            .onAppear {
                if let current = WordSchedule.currentWord(),
                   let i = pool.firstIndex(of: current) {
                    index = i
                }
            }
        }
    }
}

#Preview {
    FlashcardView()
}
