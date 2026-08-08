import Foundation

struct WordItem: Identifiable, Codable {
    struct Visual: Codable {
        let mode: String
        let sfSymbol: String
        let imageFile: String?
        let wikivocFile: String?

        enum CodingKeys: String, CodingKey {
            case mode
            case sfSymbol = "sf_symbol"
            case imageFile = "image_file"
            case wikivocFile = "wikivoc_file"
        }
    }

    let id: Int
    let assetId: String
    let day: Int
    let theme: String
    let word: String
    let pronunciation: String
    let translation: String
    let example: String
    let visual: Visual

    enum CodingKeys: String, CodingKey {
        case id
        case assetId = "asset_id"
        case day, theme, word, pronunciation, translation, example, visual
    }

    /// Compatibility with early ContentView prototypes that used `symbol`.
    var symbol: String { visual.sfSymbol }
}

enum WordStore {
    private struct Payload: Codable {
        let words: [WordItem]
    }

    static let words: [WordItem] = load()

    private static func load() -> [WordItem] {
        guard
            let url = Bundle.main.url(forResource: "words", withExtension: "json"),
            let data = try? Data(contentsOf: url),
            let payload = try? JSONDecoder().decode(Payload.self, from: data)
        else {
            return []
        }
        return payload.words.sorted { $0.id < $1.id }
    }

    static func words(forDay day: Int) -> [WordItem] {
        words.filter { $0.day == day }
    }
}
