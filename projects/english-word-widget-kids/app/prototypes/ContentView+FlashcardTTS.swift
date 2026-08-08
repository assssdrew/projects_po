import SwiftUI
import AVFoundation

struct ContentView: View {
    @State private var index = 0
    private let synthesizer = AVSpeechSynthesizer()

    var body: some View {
        NavigationStack {
            if !WordStore.words.isEmpty {
                let word = WordStore.words[index]
                VStack(spacing: 18) {
                    Image(systemName: word.symbol)
                        .font(.system(size: 64))
                        .frame(height: 90)

                    Text(word.word)
                        .font(.system(size: 38, weight: .bold))

                    Text(word.pronunciation)
                        .foregroundStyle(.secondary)
                        .font(.title3)

                    Button("🔊  Listen") {
                        let utterance = AVSpeechUtterance(string: word.word)
                        utterance.voice = AVSpeechSynthesisVoice(language: "en-US")
                        utterance.rate = 0.42
                        synthesizer.speak(utterance)
                    }
                    .buttonStyle(.borderedProminent)

                    Text(word.translation)
                        .font(.title2)

                    Text(word.example)
                        .font(.body)
                        .multilineTextAlignment(.center)
                        .padding()
                        .background(.thinMaterial)
                        .clipShape(RoundedRectangle(cornerRadius: 16))

                    HStack {
                        Button("← Previous") {
                            index = index == 0 ? WordStore.words.count - 1 : index - 1
                        }
                        Spacer()
                        Text("\(index + 1) / \(WordStore.words.count)")
                            .foregroundStyle(.secondary)
                        Spacer()
                        Button("Next →") {
                            index = (index + 1) % WordStore.words.count
                        }
                    }
                    .padding(.top)
                }
                .padding()
                .navigationTitle("English Words")
            } else {
                ProgressView("Loading words…")
            }
        }
    }
}
