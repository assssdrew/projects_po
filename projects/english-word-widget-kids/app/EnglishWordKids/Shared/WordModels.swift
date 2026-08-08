import Foundation

struct WordsPayload: Codable {
    let version: Int
    let title: String
    let count: Int
    let days: Int
    let wordsPerDay: Int
    let words: [WordItem]

    enum CodingKeys: String, CodingKey {
        case version, title, count, days
        case wordsPerDay = "words_per_day"
        case words
    }
}

struct WordItem: Identifiable, Codable, Hashable {
    struct Visual: Codable, Hashable {
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
    let imageConcept: String?
    let visual: Visual

    enum CodingKeys: String, CodingKey {
        case id
        case assetId = "asset_id"
        case day, theme, word, pronunciation, translation, example, visual
        case imageConcept = "image_concept"
    }

    var symbolName: String { visual.sfSymbol }
}
