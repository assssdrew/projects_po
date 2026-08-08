import Foundation

enum WordStore {
    static let payload: WordsPayload = loadPayload()
    static let words: [WordItem] = payload.words.sorted { $0.id < $1.id }

    static var courseDays: Int { payload.days }
    static var wordsPerDay: Int { payload.wordsPerDay }

    static func word(id: Int) -> WordItem? {
        words.first { $0.id == id }
    }

    static func words(forDay day: Int) -> [WordItem] {
        words.filter { $0.day == day }.sorted { $0.id < $1.id }
    }

    static func themes() -> [(day: Int, theme: String)] {
        let grouped = Dictionary(grouping: words, by: \.day)
        return grouped.keys.sorted().compactMap { day in
            guard let theme = grouped[day]?.first?.theme else { return nil }
            return (day, theme)
        }
    }

    private static func loadPayload() -> WordsPayload {
        let candidates: [URL?] = [
            Bundle.main.url(forResource: "words", withExtension: "json"),
            Bundle.main.url(forResource: "words", withExtension: "json", subdirectory: "Resources"),
        ]

        for url in candidates.compactMap({ $0 }) {
            if let data = try? Data(contentsOf: url),
               let payload = try? JSONDecoder().decode(WordsPayload.self, from: data) {
                return payload
            }
        }

        // Empty fallback keeps previews from crashing if the JSON is missing.
        return WordsPayload(
            version: 0,
            title: "Missing words.json",
            count: 0,
            days: 30,
            wordsPerDay: 10,
            words: []
        )
    }
}
