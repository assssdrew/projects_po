#!/usr/bin/env python3
"""Build words.json from image_plan_300.csv + curated RU/pronunciation/symbol data."""

from __future__ import annotations

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / "data" / "image_plan_300.csv"
OUT_PATH = ROOT / "data" / "words.json"
COVERAGE_PATH = ROOT / "data" / "image_coverage.json"

# word/phrase -> (translation, pronunciation_ru, sf_symbol, example)
LEXICON: dict[str, tuple[str, str, str, str]] = {
    # Day 1 Daily routine
    "wake up": ("просыпаться", "уэйк ап", "sunrise.fill", "I wake up at seven."),
    "get up": ("вставать", "гет ап", "figure.stand", "I get up early."),
    "wash": ("мыть(ся)", "вош", "drop.fill", "I wash my face."),
    "get dressed": ("одеваться", "гет дрест", "tshirt.fill", "I get dressed for school."),
    "breakfast": ("завтрак", "брэкфаст", "cup.and.saucer.fill", "I eat breakfast."),
    "school": ("школа", "скул", "building.columns.fill", "I go to school."),
    "lesson": ("урок", "лэсн", "book.closed.fill", "The lesson is fun."),
    "homework": ("домашнее задание", "хоумвёрк", "pencil.and.outline", "I do my homework."),
    "friend": ("друг", "френд", "person.2.fill", "This is my friend."),
    "play": ("играть", "плэй", "gamecontroller.fill", "We play after school."),
    # Day 2 Family
    "family": ("семья", "фэмили", "figure.2.and.child.holdinghands", "I love my family."),
    "mother": ("мама", "ма́зе", "figure.stand.dress", "My mother helps me."),
    "father": ("папа", "фа́зе", "figure.stand", "My father is kind."),
    "brother": ("брат", "бра́зе", "person.2.fill", "I have a brother."),
    "sister": ("сестра", "си́сте", "person.2.fill", "I have a sister."),
    "parents": ("родители", "пэ́рэнтс", "person.2.fill", "My parents are at home."),
    "son": ("сын", "сан", "figure.child", "He is their son."),
    "daughter": ("дочь", "дóтэ", "figure.child", "She is their daughter."),
    "child": ("ребёнок", "чайлд", "figure.child", "The child is happy."),
    "together": ("вместе", "тугéзэ", "person.3.fill", "We play together."),
    # Day 3 School
    "teacher": ("учитель", "тúчэ", "person.fill", "Our teacher is nice."),
    "student": ("ученик", "стьюдэнт", "studentdesk", "I am a student."),
    "class": ("класс", "клас", "person.3.sequence", "Our class is big."),
    "subject": ("предмет", "сáбджикт", "list.bullet.rectangle", "Math is my subject."),
    "book": ("книга", "бук", "book.fill", "I read a book."),
    "notebook": ("тетрадь", "нóутбук", "book.pages", "I write in my notebook."),
    "pencil": ("карандаш", "пэнсл", "pencil", "I need a pencil."),
    "question": ("вопрос", "квэсчэн", "questionmark.circle.fill", "I have a question."),
    "answer": ("ответ", "áнсэ", "checkmark.bubble.fill", "I know the answer."),
    "test": ("тест", "тест", "checklist", "We have a test today."),
    # Day 4 Friends
    "team": ("команда", "тим", "person.3.fill", "Our team is strong."),
    "game": ("игра", "гейм", "dice.fill", "This game is fun."),
    "help": ("помогать / помощь", "хелп", "hands.clap.fill", "Can you help me?"),
    "share": ("делиться", "шэа", "square.and.arrow.up", "We share toys."),
    "talk": ("говорить", "ток", "bubble.left.and.bubble.right.fill", "We talk a lot."),
    "laugh": ("смеяться", "лаф", "face.smiling.fill", "We laugh together."),
    "fun": ("весело / веселье", "фан", "party.popper.fill", "The party is fun."),
    # Day 5 Actions
    "go": ("идти / ехать", "гоу", "arrow.right.circle.fill", "Let's go home."),
    "come": ("приходить", "кам", "arrow.left.circle.fill", "Come here, please."),
    "take": ("брать", "тэйк", "hand.raised.fill", "Take your bag."),
    "give": ("давать", "гив", "gift.fill", "Give me the book."),
    "make": ("делать / делать что-то", "мэйк", "hammer.fill", "I make a cake."),
    "get": ("получать / добираться", "гет", "tray.and.arrow.down.fill", "I get a present."),
    "find": ("находить", "файнд", "magnifyingglass", "I find my keys."),
    "want": ("хотеть", "вонт", "heart.fill", "I want juice."),
    "need": ("нуждаться / нужно", "нид", "exclamationmark.circle.fill", "I need help."),
    "like": ("нравиться", "лайк", "hand.thumbsup.fill", "I like apples."),
    # Day 6 Food
    "food": ("еда", "фуд", "fork.knife", "The food is good."),
    "lunch": ("обед", "ланч", "takeoutbag.and.cup.and.straw.fill", "We eat lunch at school."),
    "dinner": ("ужин", "дúнэ", "fork.knife.circle.fill", "Dinner is at seven."),
    "bread": ("хлеб", "бред", "birthday.cake.fill", "I eat bread."),
    "rice": ("рис", "райс", "leaf.fill", "Rice is tasty."),
    "meat": ("мясо", "мит", "flame.fill", "I don't eat meat."),
    "fish": ("рыба", "фиш", "fish.fill", "The fish is fresh."),
    "fruit": ("фрукт", "фрут", "carrot.fill", "I like fruit."),
    "vegetable": ("овощ", "вэ́джтэбл", "leaf.circle.fill", "Eat a vegetable."),
    # Day 7 Drinks & taste
    "water": ("вода", "вóтэ", "drop.fill", "I drink water."),
    "milk": ("молоко", "милк", "cup.fill", "I like milk."),
    "juice": ("сок", "джус", "mug.fill", "Orange juice, please."),
    "tea": ("чай", "ти", "cup.and.saucer.fill", "Mum drinks tea."),
    "sweet": ("сладкий", "свит", "birthday.cake.fill", "This cake is sweet."),
    "salty": ("солёный", "сóлти", "sparkles", "The soup is salty."),
    "hot": ("горячий / жаркий", "хот", "thermometer.sun.fill", "The tea is hot."),
    "cold": ("холодный", "коулд", "thermometer.snowflake", "The water is cold."),
    "hungry": ("голодный", "хáнгри", "fork.knife", "I am hungry."),
    "thirsty": ("хочет пить", "сёсти", "drop.circle.fill", "I am thirsty."),
    # Day 8 Home
    "house": ("дом", "хаус", "house.fill", "This is my house."),
    "room": ("комната", "рум", "square.split.2x1.fill", "My room is clean."),
    "bedroom": ("спальня", "бэ́друм", "bed.double.fill", "I sleep in my bedroom."),
    "kitchen": ("кухня", "кúчн", "cooktop.fill", "Mum is in the kitchen."),
    "bathroom": ("ванная", "бáсрум", "shower.fill", "I wash in the bathroom."),
    "door": ("дверь", "до", "door.left.hand.open", "Open the door."),
    "window": ("окно", "уúндоу", "window.ceiling", "Look out the window."),
    "table": ("стол", "тэйбл", "table.furniture.fill", "The book is on the table."),
    "chair": ("стул", "чэа", "chair.fill", "Sit on the chair."),
    "bed": ("кровать", "бед", "bed.double.fill", "I sleep in bed."),
    # Day 9 Things at home
    "phone": ("телефон", "фоун", "iphone", "My phone is new."),
    "computer": ("компьютер", "кэмпью́тэ", "desktopcomputer", "I use a computer."),
    "TV": ("телевизор", "ти-ви", "tv.fill", "We watch TV."),
    "bag": ("сумка / портфель", "бэг", "bag.fill", "My bag is heavy."),
    "toy": ("игрушка", "той", "teddybear.fill", "This toy is soft."),
    "ball": ("мяч", "бол", "soccerball", "Kick the ball."),
    "clothes": ("одежда", "клоуз", "tshirt.fill", "My clothes are clean."),
    "shoes": ("обувь / туфли", "шуз", "shoe.fill", "Put on your shoes."),
    "key": ("ключ", "ки", "key.fill", "I lost my key."),
    # Day 10 Feelings
    "happy": ("счастливый", "хэ́пи", "face.smiling.fill", "I am happy."),
    "sad": ("грустный", "сэд", "face.dashed", "She is sad."),
    "angry": ("злой / сердитый", "э́нгри", "flame.fill", "Don't be angry."),
    "scared": ("напуганный", "скэад", "eye.trianglebadge.exclamationmark", "I am scared."),
    "excited": ("взволнованный", "иксáйтид", "star.fill", "I am excited!"),
    "bored": ("скучающий", "бод", "zzz", "I am bored."),
    "tired": ("уставший", "тáйэд", "bed.double.fill", "I am tired."),
    "surprised": ("удивлённый", "сэпрáйзд", "eyes", "I am surprised."),
    "nervous": ("нервный", "нёвэс", "waveform.path.ecg", "I feel nervous."),
    "proud": ("гордый", "прауд", "medal.fill", "I am proud of you."),
    # Day 11 Sports
    "football": ("футбол", "футбол", "soccerball", "We play football."),
    "basketball": ("баскетбол", "ба́скетбол", "basketball.fill", "I like basketball."),
    "tennis": ("теннис", "тэнис", "tennisball.fill", "She plays tennis."),
    "swimming": ("плавание", "суúминг", "figure.pool.swim", "Swimming is fun."),
    "running": ("бег", "рáнинг", "figure.run", "Running is good."),
    "training": ("тренировка", "трэ́йнинг", "dumbbell.fill", "Training is hard."),
    "player": ("игрок", "плэ́йэ", "figure.team.play", "He is a good player."),
    "coach": ("тренер", "коуч", "whistle.fill", "Our coach is kind."),
    "win": ("побеждать / победа", "вин", "trophy.fill", "We want to win."),
    # Day 12 Body
    "head": ("голова", "хед", "brain.head.profile", "My head hurts."),
    "face": ("лицо", "фэйс", "face.smiling", "Wash your face."),
    "eye": ("глаз", "ай", "eye.fill", "I have brown eyes."),
    "ear": ("ухо", "иэ", "ear.fill", "Listen with your ears."),
    "nose": ("нос", "ноуз", "nose.fill", "My nose is cold."),
    "mouth": ("рот", "маус", "mouth.fill", "Open your mouth."),
    "hand": ("рука (кисть)", "хэнд", "hand.raised.fill", "Raise your hand."),
    "leg": ("нога", "лег", "figure.walk", "My leg is long."),
    "foot": ("ступня / нога", "фут", "shoe.fill", "My foot is small."),
    "hair": ("волосы", "хэа", "comb.fill", "I wash my hair."),
    # Day 13 Clothes
    "shirt": ("рубашка", "шёт", "tshirt.fill", "I wear a shirt."),
    "T-shirt": ("футболка", "ти-шёт", "tshirt.fill", "I like this T-shirt."),
    "trousers": ("брюки", "тра́узез", "pants.fill", "These trousers are new."),
    "shorts": ("шорты", "шотс", "pants.fill", "I wear shorts in summer."),
    "jacket": ("куртка", "джэ́кит", "jacket.fill", "Put on your jacket."),
    "socks": ("носки", "сокс", "sock.fill", "I need clean socks."),
    "hat": ("шляпа / шапка", "хэт", "crown.fill", "This hat is warm."),
    "dress": ("платье", "дрес", "figure.stand.dress", "She wears a dress."),
    "wear": ("носить (одежду)", "вэа", "tshirt.fill", "I wear shoes."),
    # Day 14 Weather
    "weather": ("погода", "уэ́зэ", "cloud.sun.fill", "The weather is nice."),
    "sunny": ("солнечный", "сáни", "sun.max.fill", "It is sunny today."),
    "rainy": ("дождливый", "рэйни", "cloud.rain.fill", "It is rainy."),
    "cloudy": ("облачный", "клáуди", "cloud.fill", "The sky is cloudy."),
    "windy": ("ветреный", "уúнди", "wind", "It is windy outside."),
    "warm": ("тёплый", "вом", "sun.min.fill", "The day is warm."),
    "sky": ("небо", "скай", "cloud.fill", "The sky is blue."),
    "rain": ("дождь", "рэйн", "cloud.rain.fill", "I don't like rain."),
    # Day 15 Nature
    "tree": ("дерево", "три", "tree.fill", "The tree is tall."),
    "flower": ("цветок", "флáуэ", "camera.macro", "This flower is red."),
    "grass": ("трава", "грас", "leaf.fill", "The grass is green."),
    "river": ("река", "рúвэ", "water.waves", "We swim in the river."),
    "sea": ("море", "си", "water.waves", "The sea is big."),
    "beach": ("пляж", "бич", "beach.umbrella.fill", "We play on the beach."),
    "mountain": ("гора", "мáунтин", "mountain.2.fill", "The mountain is high."),
    "forest": ("лес", "фóрист", "tree.fill", "Animals live in the forest."),
    "animal": ("животное", "э́нимл", "pawprint.fill", "A dog is an animal."),
    "bird": ("птица", "бёд", "bird.fill", "The bird can fly."),
    # Day 16 Animals
    "dog": ("собака", "дог", "dog.fill", "The dog is friendly."),
    "cat": ("кошка", "кэт", "cat.fill", "The cat sleeps."),
    "horse": ("лошадь", "хорс", "hare.fill", "The horse is fast."),
    "cow": ("корова", "кау", "hare.fill", "The cow eats grass."),
    "elephant": ("слон", "э́лифэнт", "animal", "The elephant is big."),
    "lion": ("лев", "лайэн", "lioness", "The lion is strong."),
    "tiger": ("тигр", "тáйгэ", "cat.fill", "The tiger is orange."),
    "monkey": ("обезьяна", "мáнки", "lizard.fill", "The monkey climbs."),
    "rabbit": ("кролик", "рэ́бит", "hare.fill", "The rabbit is white."),
    # Day 17 City
    "city": ("город", "сúти", "building.2.fill", "I live in a city."),
    "street": ("улица", "стрит", "road.lanes", "This street is quiet."),
    "road": ("дорога", "роуд", "road.lanes", "The road is long."),
    "shop": ("магазин", "шоп", "storefront.fill", "I buy bread in the shop."),
    "park": ("парк", "пак", "tree.fill", "We play in the park."),
    "hospital": ("больница", "хóспитл", "cross.case.fill", "The hospital is near."),
    "restaurant": ("ресторан", "рэ́сторонт", "fork.knife", "We eat in a restaurant."),
    "market": ("рынок", "мáкит", "cart.fill", "Mum goes to the market."),
    "building": ("здание", "бúлдинг", "building.fill", "That building is tall."),
    # Day 18 Transport
    "car": ("машина", "ка", "car.fill", "Dad drives a car."),
    "bus": ("автобус", "бас", "bus.fill", "I go by bus."),
    "train": ("поезд", "трэйн", "tram.fill", "The train is fast."),
    "plane": ("самолёт", "плэйн", "airplane", "The plane flies."),
    "bicycle": ("велосипед", "бáйсикл", "bicycle", "I ride a bicycle."),
    "motorbike": ("мотоцикл", "мóутербайк", "motorcycle.fill", "A motorbike is loud."),
    "taxi": ("такси", "тэ́кси", "car.fill", "We take a taxi."),
    "airport": ("аэропорт", "э́апот", "airplane.departure", "The airport is busy."),
    "station": ("станция / вокзал", "стэйшн", "tram.fill", "Wait at the station."),
    "ticket": ("билет", "тúкит", "ticket.fill", "I have a ticket."),
    # Day 19 Travel
    "travel": ("путешествовать", "трэ́вл", "globe.europe.africa.fill", "I love to travel."),
    "trip": ("поездка", "трип", "map.fill", "Our trip is fun."),
    "country": ("страна", "кáнтри", "flag.fill", "What country is this?"),
    "hotel": ("отель", "хоутэл", "bed.double.fill", "We stay in a hotel."),
    "passport": ("паспорт", "пáспорт", "person.text.rectangle.fill", "Show your passport."),
    "suitcase": ("чемодан", "сútкейс", "suitcase.fill", "My suitcase is heavy."),
    # Day 20 Time
    "today": ("сегодня", "тудэй", "calendar", "Today is Monday."),
    "tomorrow": ("завтра", "тумóроу", "calendar.badge.plus", "See you tomorrow."),
    "yesterday": ("вчера", "éстэдэй", "calendar.badge.minus", "Yesterday was fun."),
    "morning": ("утро", "мóнинг", "sunrise.fill", "Good morning!"),
    "afternoon": ("день (после обеда)", "áфтенун", "sun.max.fill", "See you in the afternoon."),
    "evening": ("вечер", "úвнинг", "moon.stars.fill", "Good evening."),
    "night": ("ночь", "найт", "moon.fill", "Good night."),
    "week": ("неделя", "уик", "calendar", "This week is busy."),
    "month": ("месяц", "манс", "calendar", "This month is June."),
    "year": ("год", "йиэ", "calendar", "Happy New Year!"),
    # Day 21 Common adjectives
    "big": ("большой", "биг", "arrow.up.left.and.arrow.down.right", "The dog is big."),
    "small": ("маленький", "смол", "arrow.down.right.and.arrow.up.left", "The cat is small."),
    "long": ("длинный", "лонг", "ruler.fill", "The river is long."),
    "short": ("короткий", "шот", "ruler", "My hair is short."),
    "good": ("хороший", "гуд", "hand.thumbsup.fill", "This book is good."),
    "bad": ("плохой", "бэд", "hand.thumbsdown.fill", "That idea is bad."),
    "new": ("новый", "нью", "sparkles", "I have a new bag."),
    "old": ("старый", "оулд", "clock.fill", "This house is old."),
    "easy": ("лёгкий / простой", "úзи", "checkmark.circle.fill", "This test is easy."),
    "difficult": ("трудный", "дúфиклт", "xmark.circle.fill", "This lesson is difficult."),
    # Day 22 More adjectives
    "beautiful": ("красивый", "бью́тифл", "sparkle", "The flower is beautiful."),
    "interesting": ("интересный", "úнтрэстинг", "lightbulb.fill", "The book is interesting."),
    "boring": ("скучный", "бóринг", "zzz", "The film is boring."),
    "funny": ("смешной", "фáни", "face.smiling.fill", "The joke is funny."),
    "fast": ("быстрый", "фаст", "hare.fill", "The car is fast."),
    "slow": ("медленный", "слоу", "tortoise.fill", "The bus is slow."),
    "strong": ("сильный", "стронг", "dumbbell.fill", "He is strong."),
    "weak": ("слабый", "уик", "leaf", "I feel weak."),
    "clean": ("чистый", "клин", "sparkles", "My room is clean."),
    "dirty": ("грязный", "дёти", "trash.fill", "My shoes are dirty."),
    # Day 23 Communication
    "say": ("говорить / сказать", "сэй", "bubble.left.fill", "What did you say?"),
    "tell": ("рассказывать", "тел", "text.bubble.fill", "Tell me a story."),
    "ask": ("спрашивать", "аск", "questionmark.bubble.fill", "Ask the teacher."),
    "speak": ("говорить (на языке)", "спик", "mic.fill", "I speak English."),
    "listen": ("слушать", "лúсн", "ear.fill", "Listen to me."),
    "hear": ("слышать", "хиэ", "ear.fill", "I hear music."),
    "read": ("читать", "рид", "book.fill", "I read every day."),
    "write": ("писать", "райт", "pencil", "Write your name."),
    "understand": ("понимать", "андэстэнд", "brain.head.profile", "I understand."),
    # Day 24 Useful verbs
    "think": ("думать", "синк", "brain", "I think so."),
    "know": ("знать", "ноу", "lightbulb.fill", "I know the answer."),
    "remember": ("помнить", "римэмбэ", "brain.head.profile", "I remember you."),
    "forget": ("забывать", "фэгет", "xmark.bin.fill", "Don't forget your bag."),
    "learn": ("учить(ся)", "лён", "graduationcap.fill", "I learn English."),
    "teach": ("учить (кого-то)", "тич", "person.fill", "Mum can teach me."),
    "try": ("пробовать / пытаться", "трай", "arrow.triangle.2.circlepath", "Try again."),
    "start": ("начинать", "стат", "play.fill", "Let's start."),
    "finish": ("заканчивать", "фúниш", "flag.checkered", "I finish my homework."),
    # Day 25 Everyday phrases
    "Come here.": ("Иди сюда.", "кам хиэ", "hand.wave.fill", "Come here, please."),
    "Wait a minute.": ("Подожди минуту.", "уэйт э мúнит", "clock.fill", "Wait a minute."),
    "Let's go.": ("Пойдём.", "летс гоу", "figure.walk", "Let's go home."),
    "I don't know.": ("Я не знаю.", "ай доунт ноу", "questionmark.circle", "I don't know."),
    "I don't understand.": ("Я не понимаю.", "ай доунт андэстэнд", "ear", "I don't understand."),
    "Can you help me?": ("Можешь мне помочь?", "кэн ю хелп ми", "hands.clap.fill", "Can you help me?"),
    "What is this?": ("Что это?", "вот из зис", "questionmark.circle.fill", "What is this?"),
    "Where is it?": ("Где это?", "вэа из ит", "mappin.circle.fill", "Where is it?"),
    "What happened?": ("Что случилось?", "вот хэ́пэнд", "exclamationmark.bubble.fill", "What happened?"),
    "Are you OK?": ("Ты в порядке?", "а ю оу-кей", "heart.circle.fill", "Are you OK?"),
    # Day 26 Questions
    "what": ("что / какой", "вот", "questionmark.circle.fill", "What is your name?"),
    "who": ("кто", "ху", "person.crop.circle.badge.questionmark", "Who is that?"),
    "where": ("где / куда", "вэа", "mappin.and.ellipse", "Where do you live?"),
    "when": ("когда", "уэн", "calendar.circle.fill", "When is the lesson?"),
    "why": ("почему", "уай", "questionmark.bubble.fill", "Why are you sad?"),
    "how": ("как", "хау", "gearshape.fill", "How are you?"),
    "which": ("который / какой", "уич", "checklist", "Which book is yours?"),
    "whose": ("чей", "хуз", "person.crop.circle", "Whose bag is this?"),
    "how much": ("сколько (неисчисл.)", "хау мач", "yensign.circle.fill", "How much is it?"),
    "how many": ("сколько (исчисл.)", "хау мэни", "number.circle.fill", "How many books?"),
    # Day 27 Basic conversation
    "hello": ("привет / здравствуй", "хелóу", "hand.wave.fill", "Hello!"),
    "goodbye": ("до свидания", "гудбáй", "hand.wave", "Goodbye!"),
    "please": ("пожалуйста", "плиз", "heart.fill", "Help me, please."),
    "thanks": ("спасибо", "сэнкс", "hands.clap.fill", "Thanks a lot!"),
    "sorry": ("извини", "сóри", "face.dashed", "I am sorry."),
    "excuse me": ("извините", "икскьюз ми", "hand.raised.fill", "Excuse me!"),
    "welcome": ("добро пожаловать", "уэлкам", "house.fill", "Welcome!"),
    "sure": ("конечно", "шуэ", "checkmark.circle.fill", "Sure!"),
    "maybe": ("может быть", "мэйби", "circle.dashed", "Maybe later."),
    "really": ("правда? / действительно", "рúэли", "exclamationmark.circle.fill", "Really?"),
    # Day 28 Useful phrases
    "I think so.": ("Я думаю, да.", "ай синк соу", "brain.head.profile", "I think so."),
    "I don't think so.": ("Я так не думаю.", "ай доунт синк соу", "xmark.circle", "I don't think so."),
    "I like it.": ("Мне это нравится.", "ай лайк ит", "hand.thumbsup.fill", "I like it."),
    "I don't like it.": ("Мне это не нравится.", "ай доунт лайк ит", "hand.thumbsdown.fill", "I don't like it."),
    "I'm hungry.": ("Я голодный.", "айм хáнгри", "fork.knife", "I'm hungry."),
    "I'm tired.": ("Я устал.", "айм тáйэд", "bed.double.fill", "I'm tired."),
    "I'm ready.": ("Я готов.", "айм рэ́ди", "checkmark.circle.fill", "I'm ready."),
    "I'm not ready.": ("Я не готов.", "айм нот рэ́ди", "clock.fill", "I'm not ready."),
    "It's OK.": ("Всё нормально.", "итс оу-кей", "checkmark.circle", "It's OK."),
    "That's great!": ("Отлично!", "зэтс грейт", "star.fill", "That's great!"),
    # Day 29 Important verbs
    "open": ("открывать", "óупэн", "door.left.hand.open", "Open the window."),
    "close": ("закрывать", "клоуз", "door.left.hand.closed", "Close the door."),
    "buy": ("покупать", "бай", "cart.fill", "I buy milk."),
    "sell": ("продавать", "сел", "tag.fill", "They sell books."),
    "bring": ("приносить", "бринг", "tray.and.arrow.down.fill", "Bring your book."),
    "put": ("класть / ставить", "пут", "square.and.arrow.down.fill", "Put it here."),
    "keep": ("оставлять / хранить", "кип", "archivebox.fill", "Keep this key."),
    "lose": ("терять", "луз", "trash.fill", "Don't lose your ticket."),
    # Day 30 Core words
    "thing": ("вещь", "тинг", "cube.fill", "What is this thing?"),
    "place": ("место", "плэйс", "mappin.circle.fill", "This place is nice."),
    "person": ("человек", "пёсэн", "person.fill", "Who is that person?"),
    "time": ("время", "тайм", "clock.fill", "What time is it?"),
    "day": ("день", "дэй", "sun.max.fill", "Have a nice day."),
    "way": ("путь / способ", "уэй", "arrow.triangle.turn.up.right.diamond.fill", "Which way?"),
    "problem": ("проблема", "прóблем", "exclamationmark.triangle.fill", "No problem."),
    "idea": ("идея", "айдúэ", "lightbulb.fill", "Good idea!"),
}

# Semantic WikiVoc matches (filename without path). Keep conservative.
WIKIVOC_MATCH: dict[str, str] = {
    "idea": "WikiVoc-lightbulb.svg",
    "bathroom": "WikiVoc-toilet.svg",
    "fruit": "WikiVoc-banana.svg",
    "animal": "WikiVoc-otter.svg",
    "interesting": "WikiVoc-lightbulb.svg",
    "know": "WikiVoc-lightbulb.svg",
}


def asset_id(n: int) -> str:
    return f"word_{n:03d}"


def main() -> None:
    rows = list(csv.DictReader(CSV_PATH.open(encoding="utf-8")))
    missing = []
    words = []
    coverage = {"wikivoc": [], "sf_symbol": []}

    for row in rows:
        wid = int(row["id"])
        word = row["word"]
        if word not in LEXICON:
            missing.append(word)
            continue
        translation, pronunciation, symbol, example = LEXICON[word]

        image_file = WIKIVOC_MATCH.get(word)
        visual = {
            "mode": "wikivoc" if image_file else "sf_symbol",
            "sf_symbol": symbol,
            "image_file": f"images/wikivoc/{image_file}" if image_file else None,
            "wikivoc_file": image_file,
        }
        if image_file:
            coverage["wikivoc"].append({"id": wid, "word": word, "file": image_file})
        else:
            coverage["sf_symbol"].append({"id": wid, "word": word, "sf_symbol": symbol})

        words.append(
            {
                "id": wid,
                "asset_id": asset_id(wid),
                "day": int(row["day"]),
                "theme": row["theme"],
                "word": word,
                "pronunciation": pronunciation,
                "translation": translation,
                "example": example,
                "image_concept": row["image_concept"],
                "visual": visual,
            }
        )

    if missing:
        raise SystemExit(f"Missing lexicon entries ({len(missing)}): {missing}")

    payload = {
        "version": 1,
        "title": "English Word Widget Kids",
        "locale_hint": "ru-child",
        "count": len(words),
        "days": 30,
        "words_per_day": 10,
        "visual_strategy": "wikivoc_where_available_else_sf_symbol",
        "attribution": {
            "wikivoc": {
                "source": "https://commons.wikimedia.org/wiki/Commons:WikiVoc",
                "license": "Public Domain (see each Commons file page)",
                "credit": "Images from Commons:WikiVoc; Licence: Public Domain; Authors: WikiVoc team.",
            }
        },
        "words": words,
    }
    OUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    coverage_doc = {
        "strategy": "WikiVoc where a clear semantic match exists; otherwise SF Symbol",
        "wikivoc_catalog_size_on_commons": "~20 vocabulary SVGs total",
        "matched_count": len(coverage["wikivoc"]),
        "sf_symbol_fallback_count": len(coverage["sf_symbol"]),
        "matched": coverage["wikivoc"],
        "note": (
            "WikiVoc on Wikimedia Commons currently has a very small set. "
            "Most of the 300-card curriculum uses SF Symbols until more WikiVoc-style "
            "images are generated or sourced."
        ),
    }
    COVERAGE_PATH.write_text(json.dumps(coverage_doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT_PATH} ({len(words)} words)")
    print(f"WikiVoc matches: {len(coverage['wikivoc'])}")
    print(f"SF Symbol fallbacks: {len(coverage['sf_symbol'])}")


if __name__ == "__main__":
    main()
