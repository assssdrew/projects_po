import WidgetKit
import SwiftUI

struct WordEntry: TimelineEntry {
    let date: Date
    let word: WordItem?
    let courseDay: Int
}

struct WordProvider: TimelineProvider {
    func placeholder(in context: Context) -> WordEntry {
        WordEntry(
            date: Date(),
            word: WordStore.words.first,
            courseDay: 1
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (WordEntry) -> Void) {
        completion(makeEntry(for: Date()))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<WordEntry>) -> Void) {
        let dates = WordSchedule.timelineDates(from: Date(), hoursAhead: 24)
        let entries = dates.map(makeEntry(for:))
        let refresh = Calendar.current.date(byAdding: .hour, value: 24, to: Date()) ?? Date()
        completion(Timeline(entries: entries, policy: .after(refresh)))
    }

    private func makeEntry(for date: Date) -> WordEntry {
        WordEntry(
            date: date,
            word: WordSchedule.currentWord(on: date),
            courseDay: WordSchedule.courseDay(on: date)
        )
    }
}

struct EnglishWordKidsWidget: Widget {
    let kind = "EnglishWordKidsWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: WordProvider()) { entry in
            WordWidgetView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget)
        }
        .configurationDisplayName("Слово дня")
        .description("Английское слово с переводом для ребёнка.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

struct WordWidgetView: View {
    @Environment(\.widgetFamily) private var family
    let entry: WordEntry

    var body: some View {
        if let word = entry.word {
            switch family {
            case .systemMedium:
                MediumWordView(word: word, courseDay: entry.courseDay)
            default:
                SmallWordView(word: word)
            }
        } else {
            Text("Нет слов")
                .font(.headline)
        }
    }
}

struct SmallWordView: View {
    let word: WordItem

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Image(systemName: word.symbolName)
                .font(.title)
                .symbolRenderingMode(.hierarchical)
            Spacer(minLength: 0)
            Text(word.word)
                .font(.headline)
                .minimumScaleFactor(0.7)
                .lineLimit(2)
            Text(word.translation)
                .font(.caption)
                .foregroundStyle(.secondary)
                .lineLimit(2)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
    }
}

struct MediumWordView: View {
    let word: WordItem
    let courseDay: Int

    var body: some View {
        HStack(spacing: 16) {
            Image(systemName: word.symbolName)
                .font(.system(size: 44))
                .symbolRenderingMode(.hierarchical)
                .frame(width: 56)

            VStack(alignment: .leading, spacing: 4) {
                Text("День \(courseDay)/\(WordStore.courseDays)")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                Text(word.word)
                    .font(.title2.weight(.bold))
                    .minimumScaleFactor(0.7)
                    .lineLimit(2)
                Text(word.pronunciation)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
                Text(word.translation)
                    .font(.body)
                    .lineLimit(2)
            }
            Spacer(minLength: 0)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
    }
}

#Preview(as: .systemSmall) {
    EnglishWordKidsWidget()
} timeline: {
    WordEntry(date: .now, word: WordStore.words.first, courseDay: 1)
}

#Preview(as: .systemMedium) {
    EnglishWordKidsWidget()
} timeline: {
    WordEntry(date: .now, word: WordStore.words.first, courseDay: 1)
}
