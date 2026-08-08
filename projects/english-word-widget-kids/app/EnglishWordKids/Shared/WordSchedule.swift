import Foundation

/// Picks the course day and the word shown on the widget.
///
/// - Course day cycles 1...30 from a fixed anchor date.
/// - Inside a day, the 10 words rotate every `rotationHours`.
enum WordSchedule {
    /// Change only if you want to restart the 30-day cycle for everyone.
    static let courseAnchor = Calendar.current.date(
        from: DateComponents(year: 2026, month: 1, day: 1)
    )!

    /// How often the Home Screen widget flips to the next word of the day.
    static let rotationHours = 2

    static func courseDay(on date: Date = Date(), calendar: Calendar = .current) -> Int {
        let start = calendar.startOfDay(for: courseAnchor)
        let current = calendar.startOfDay(for: date)
        let delta = calendar.dateComponents([.day], from: start, to: current).day ?? 0
        let days = max(WordStore.courseDays, 1)
        let idx = ((delta % days) + days) % days
        return idx + 1
    }

    static func todaysWords(on date: Date = Date(), calendar: Calendar = .current) -> [WordItem] {
        WordStore.words(forDay: courseDay(on: date, calendar: calendar))
    }

    static func currentWord(on date: Date = Date(), calendar: Calendar = .current) -> WordItem? {
        let pool = todaysWords(on: date, calendar: calendar)
        guard !pool.isEmpty else { return WordStore.words.first }

        let hour = calendar.component(.hour, from: date)
        let slot = hour / max(rotationHours, 1)
        return pool[slot % pool.count]
    }

    /// Timeline entries for WidgetKit: one entry per rotation slot for the next ~24h.
    static func timelineDates(from date: Date = Date(), calendar: Calendar = .current, hoursAhead: Int = 24) -> [Date] {
        let step = max(rotationHours, 1)
        var dates: [Date] = [date]

        let hour = calendar.component(.hour, from: date)
        let nextHour = ((hour / step) + 1) * step
        var cursor = calendar.date(bySettingHour: 0, minute: 0, second: 0, of: date) ?? date
        cursor = calendar.date(byAdding: .hour, value: nextHour, to: cursor) ?? date

        let end = calendar.date(byAdding: .hour, value: hoursAhead, to: date) ?? date
        while cursor <= end {
            dates.append(cursor)
            guard let next = calendar.date(byAdding: .hour, value: step, to: cursor) else { break }
            cursor = next
        }
        return dates
    }
}
