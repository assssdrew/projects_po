import SwiftUI

struct RootView: View {
    var body: some View {
        TabView {
            TodayView()
                .tabItem {
                    Label("Сегодня", systemImage: "sun.max.fill")
                }

            FlashcardView()
                .tabItem {
                    Label("Карточка", systemImage: "rectangle.on.rectangle.angled")
                }

            BrowseView()
                .tabItem {
                    Label("Все дни", systemImage: "list.bullet")
                }
        }
        .tint(Color("AccentColor"))
    }
}

#Preview {
    RootView()
}
