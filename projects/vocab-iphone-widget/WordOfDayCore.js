// WordOfDayCore — v13: tap=next+App.close, left align
const WORDS = [{"en": "a bunch of", "ru": "куча"}, {"en": "a lot", "ru": "много"}, {"en": "abandoned", "ru": "заброшенный"}, {"en": "about to", "ru": "вот-вот, собираюсь"}, {"en": "about to end", "ru": "вот-вот закончится"}, {"en": "accept", "ru": "принять"}, {"en": "accident", "ru": "случайность; авария"}, {"en": "accidentally", "ru": "случайно"}, {"en": "accompanied by", "ru": "в сопровождении"}, {"en": "accompanied with an adult", "ru": "в сопровождении взрослого"}, {"en": "achieve success", "ru": "добиться успеха"}, {"en": "across the world", "ru": "по всему миру"}, {"en": "acrylic markers", "ru": "акриловые маркеры"}, {"en": "acted like that", "ru": "повёл себя так"}, {"en": "activity", "ru": "активность"}, {"en": "adapt", "ru": "адаптироваться"}, {"en": "addiction", "ru": "зависимость"}, {"en": "adjust my feed", "ru": "настроить ленту"}, {"en": "adjustments / corrections", "ru": "правки / исправления"}, {"en": "admit", "ru": "признать"}, {"en": "admit doing", "ru": "признать"}, {"en": "adopt", "ru": "усыновить / принять"}, {"en": "affected by", "ru": "подверженный влиянию"}, {"en": "affected by trends", "ru": "под влиянием трендов"}, {"en": "afford", "ru": "позволить себе"}, {"en": "afraid", "ru": "боящийся"}, {"en": "afraid of", "ru": "бояться"}, {"en": "afraid of losing", "ru": "бояться потерять"}, {"en": "aftertaste", "ru": "послевкусие"}, {"en": "agreement", "ru": "соглашение"}, {"en": "algorithm", "ru": "алгоритм"}, {"en": "alien", "ru": "инопланетянин; иностранец"}, {"en": "alien / foreigner / expat", "ru": "иностранец, экспат"}, {"en": "align with", "ru": "соответствовать"}, {"en": "already", "ru": "уже"}, {"en": "already happened", "ru": "уже случилось"}, {"en": "alumni", "ru": "выпускники"}, {"en": "amaze", "ru": "поразить"}, {"en": "among", "ru": "среди"}, {"en": "annoyed", "ru": "раздражённый"}, {"en": "annoyed by", "ru": "раздражён"}, {"en": "annual income", "ru": "годовой доход"}, {"en": "anxiety", "ru": "тревога"}, {"en": "anxious", "ru": "тревожный"}, {"en": "anyway", "ru": "в любом случае"}, {"en": "appearance", "ru": "внешний вид; появление"}, {"en": "apply documents", "ru": "подавать документы"}, {"en": "apply for", "ru": "подавать заявку"}, {"en": "appointment", "ru": "запись, встреча"}, {"en": "appreciate", "ru": "ценить"}, {"en": "as always", "ru": "как всегда"}, {"en": "as cool as a cucumber", "ru": "спокойный как удав"}, {"en": "as cool as cucumber", "ru": "спокойный как удав"}, {"en": "as usual", "ru": "как обычно"}, {"en": "ashamed", "ru": "стыдно"}, {"en": "ass is on fire", "ru": "срочность / «горят сроки»"}, {"en": "assume", "ru": "полагать"}, {"en": "assumed to", "ru": "предполагается"}, {"en": "assumption", "ru": "предположение"}, {"en": "at a time", "ru": "за раз"}, {"en": "at least", "ru": "хотя бы, минимум"}, {"en": "at morning", "ru": "в утреннее время"}, {"en": "at the age of", "ru": "в возрасте"}, {"en": "attempt", "ru": "попытка"}, {"en": "attempts", "ru": "попытки"}, {"en": "attitude", "ru": "отношение"}, {"en": "attitude to", "ru": "отношение к"}, {"en": "attract attention", "ru": "привлекать внимание"}, {"en": "attractive", "ru": "привлекательный"}, {"en": "automate", "ru": "автоматизировать"}, {"en": "automatically", "ru": "автоматически"}, {"en": "automation", "ru": "автоматизация"}, {"en": "avoid distractions", "ru": "избегать отвлечений"}, {"en": "avoid doing", "ru": "избегать"}, {"en": "avoid situation", "ru": "избежать ситуации"}, {"en": "awkward", "ru": "неловкий"}, {"en": "awkward silence", "ru": "неловкая тишина"}, {"en": "babysit", "ru": "сидеть с детьми"}, {"en": "babysit / kittensitting", "ru": "сидеть с детьми / котятами"}, {"en": "bachelor", "ru": "холостяк; бакалавр"}, {"en": "back down", "ru": "отступить"}, {"en": "back in town", "ru": "снова в городе"}, {"en": "back then", "ru": "тогда, в то время"}, {"en": "back up", "ru": "поддерживать; делать резервную копию"}, {"en": "backfire", "ru": "выйти боком"}, {"en": "base form", "ru": "начальная форма глагола"}, {"en": "be exposed to", "ru": "быть подверженным; сталкиваться с"}, {"en": "be into", "ru": "увлекаться, любить"}, {"en": "be involved in", "ru": "быть вовлечённым"}, {"en": "be judged by", "ru": "быть оцениваемым по"}, {"en": "be responsible for", "ru": "быть ответственным за"}, {"en": "be surrounded by", "ru": "быть окружённым"}, {"en": "be used to", "ru": "быть привыкшим"}, {"en": "bear a child", "ru": "вынашивать ребёнка"}, {"en": "bear weight", "ru": "нести тяжесть"}, {"en": "become aware of", "ru": "осознать"}, {"en": "bedsheets", "ru": "постельное бельё"}, {"en": "behave", "ru": "вести себя"}, {"en": "being constructed", "ru": "строится"}, {"en": "belief", "ru": "убеждение"}, {"en": "besides", "ru": "помимо"}, {"en": "besides it", "ru": "помимо этого"}, {"en": "binge-watching", "ru": "марафон сериалов"}, {"en": "blood test", "ru": "анализ крови"}, {"en": "bond", "ru": "связь"}, {"en": "boring", "ru": "скучный"}, {"en": "boring / rude / cruel", "ru": "скучный / грубый / жестокий"}, {"en": "bother", "ru": "беспокоить"}, {"en": "bottle up", "ru": "держать в себе"}, {"en": "bottled up", "ru": "держал в себе"}, {"en": "brand", "ru": "бренд"}, {"en": "breadwinner", "ru": "кормилец; кормилец семьи"}, {"en": "break down", "ru": "сорваться эмоционально; срыв"}, {"en": "break it down", "ru": "разобрать, объяснить"}, {"en": "brew coffee", "ru": "заваривать кофе"}, {"en": "brief", "ru": "краткий брифинг"}, {"en": "bring people together", "ru": "объединять людей"}, {"en": "bring someone down", "ru": "подавлять, расстраивать кого-то"}, {"en": "bring success", "ru": "приносить успех"}, {"en": "bring up", "ru": "поднимать тему"}, {"en": "broaden imagination", "ru": "расширять воображение"}, {"en": "brochure", "ru": "брошюра"}, {"en": "build", "ru": "строить; создавать"}, {"en": "build trust", "ru": "строить доверие"}, {"en": "build up", "ru": "наращивать, укреплять"}, {"en": "busy with work", "ru": "занят работой"}, {"en": "busy working", "ru": "занят работой"}, {"en": "by / until", "ru": "к / до"}, {"en": "by the time", "ru": "к тому времени как"}, {"en": "calm down", "ru": "успокоиться"}, {"en": "can't help doing", "ru": "не мочь удержаться"}, {"en": "can't stand doing", "ru": "терпеть не могу"}, {"en": "canned food", "ru": "консервы"}, {"en": "car accident", "ru": "автоавария"}, {"en": "career", "ru": "карьера"}, {"en": "carry a bag", "ru": "нести сумку"}, {"en": "carry out", "ru": "выполнять, осуществлять, реализовывать"}, {"en": "carry out a survey", "ru": "провести опрос"}, {"en": "carry-on", "ru": "ручная кладь"}, {"en": "carry-on bag", "ru": "ручная кладь"}, {"en": "catch", "ru": "ловить; уловить смысл"}, {"en": "catch meaning", "ru": "уловить смысл"}, {"en": "catch up on", "ru": "наверстать"}, {"en": "catch up on sleep", "ru": "отоспаться"}, {"en": "catch up with", "ru": "наверстать; встретиться"}, {"en": "catch up with husband", "ru": "встретиться с мужем"}, {"en": "catch up with you", "ru": "догонит тебя"}, {"en": "caught up on", "ru": "наверстал"}, {"en": "ceiling", "ru": "потолок"}, {"en": "challenge", "ru": "вызов, сложность"}, {"en": "challenge stereotypes", "ru": "бросать вызов стереотипам"}, {"en": "change your mind", "ru": "передумать"}, {"en": "change your perspective", "ru": "изменить взгляд"}, {"en": "cheapskate", "ru": "скряга"}, {"en": "check out", "ru": "посмотреть, изучить"}, {"en": "cheepskater", "ru": "скряга"}, {"en": "chill out", "ru": "расслабиться"}, {"en": "circumstances", "ru": "обстоятельства"}, {"en": "citizenship", "ru": "гражданство"}, {"en": "clue", "ru": "ключ, понятие"}, {"en": "coincidence", "ru": "совпадение"}, {"en": "collaboration", "ru": "сотрудничество"}, {"en": "come across", "ru": "случайно наткнуться"}, {"en": "come across a book", "ru": "наткнуться на книгу"}, {"en": "come back", "ru": "вернуться"}, {"en": "come up with", "ru": "придумать"}, {"en": "come up with an idea", "ru": "придумать идею"}, {"en": "comfortable", "ru": "удобный (комфортный)"}, {"en": "commercial product", "ru": "коммерческий продукт"}, {"en": "commitment", "ru": "обязательство"}, {"en": "communication", "ru": "коммуникация, общение"}, {"en": "compared to", "ru": "по сравнению с"}, {"en": "complain about", "ru": "жаловаться"}, {"en": "concerns", "ru": "опасения"}, {"en": "conclude", "ru": "сделать вывод"}, {"en": "confusion", "ru": "путаница"}, {"en": "conscious", "ru": "сознательный"}, {"en": "consciousness", "ru": "сознание"}, {"en": "consider doing", "ru": "рассматривать"}, {"en": "considered", "ru": "считается"}, {"en": "constantly", "ru": "постоянно"}, {"en": "construct", "ru": "строить"}, {"en": "construction planning", "ru": "планирование строительства"}, {"en": "contribute", "ru": "вносить вклад"}, {"en": "convenient", "ru": "удобный (время/место)"}, {"en": "coordinate", "ru": "координировать"}, {"en": "count on", "ru": "рассчитывать на"}, {"en": "count on / rely on", "ru": "рассчитывать / полагаться"}, {"en": "cozy", "ru": "уютный"}, {"en": "create", "ru": "создавать"}, {"en": "cross-functional", "ru": "кросс-функциональный"}, {"en": "crowded", "ru": "людный"}, {"en": "crowded / packed", "ru": "многолюдно / битком"}, {"en": "cruel", "ru": "жестокий"}, {"en": "current tasks", "ru": "текущие задачи"}, {"en": "currently", "ru": "в настоящее время"}, {"en": "customer", "ru": "заказчик, клиент"}, {"en": "cut back on", "ru": "сократить потребление"}, {"en": "day off", "ru": "выходной"}, {"en": "deadline", "ru": "срок, дедлайн"}, {"en": "deadline approaching", "ru": "срок приближается"}, {"en": "deal with", "ru": "справляться с, заниматься"}, {"en": "deal with a problem", "ru": "решать проблему"}, {"en": "deal with uncertainty", "ru": "справляться с неопределенностью"}, {"en": "dealing with problem", "ru": "решение проблемы"}, {"en": "debts", "ru": "долги"}, {"en": "debts catch up", "ru": "долги настигнут"}, {"en": "decision", "ru": "решение"}, {"en": "decisive", "ru": "решительный"}, {"en": "delay", "ru": "задержка"}, {"en": "delay doing", "ru": "откладывать"}, {"en": "delegate", "ru": "делегировать"}, {"en": "delicious", "ru": "вкусный"}, {"en": "deny doing", "ru": "отрицать"}, {"en": "depend on", "ru": "зависеть от"}, {"en": "depends on", "ru": "зависеть от"}, {"en": "depressive", "ru": "депрессивный"}, {"en": "designer", "ru": "проектировщик, дизайнер"}, {"en": "desire", "ru": "желание"}, {"en": "desperate", "ru": "отчаянный"}, {"en": "desperation", "ru": "отчаяние"}, {"en": "develop", "ru": "разрабатывать, развивать"}, {"en": "developer", "ru": "разработчик"}, {"en": "development", "ru": "развитие"}, {"en": "didn't last long", "ru": "длилось недолго"}, {"en": "direction", "ru": "направление"}, {"en": "discount", "ru": "скидка"}, {"en": "disgusting", "ru": "отвратительно"}, {"en": "dishwasher", "ru": "посудомойка"}, {"en": "distract", "ru": "отвлекать"}, {"en": "distractive", "ru": "отвлекающий"}, {"en": "disturbing", "ru": "тревожащий"}, {"en": "disturbing state", "ru": "тревожное состояние"}, {"en": "dive into", "ru": "погрузиться"}, {"en": "do for a living", "ru": "зарабатывать на жизнь"}, {"en": "do makeup", "ru": "делать макияж"}, {"en": "documents", "ru": "документы"}, {"en": "don't bother", "ru": "не беспокой"}, {"en": "don't bother him", "ru": "не беспокой его"}, {"en": "don’t get me wrong", "ru": "I didn’t mean that (неправильно понять)"}, {"en": "doubt", "ru": "сомнение"}, {"en": "drafting", "ru": "черчение"}, {"en": "drained", "ru": "выжатый"}, {"en": "draw attention", "ru": "привлекать внимание"}, {"en": "draw conclusions", "ru": "делать выводы"}, {"en": "drop by", "ru": "заглянуть"}, {"en": "dull", "ru": "скучный, унылый"}, {"en": "earn", "ru": "зарабатывать"}, {"en": "earn credibility", "ru": "завоёвывать доверие/авторитет"}, {"en": "earn money", "ru": "зарабатывать"}, {"en": "ease", "ru": "облегчать"}, {"en": "ease pain", "ru": "облегчить боль"}, {"en": "easy on me", "ru": "помягче со мной"}, {"en": "eat up", "ru": "съесть всё"}, {"en": "efficiently", "ru": "эффективно"}, {"en": "either", "ru": "тоже (в отриц.); либо"}, {"en": "either way", "ru": "так или иначе"}, {"en": "elaborate on", "ru": "подробнее объяснить"}, {"en": "emotional rollercoaster", "ru": "эмоциональные американские горки"}, {"en": "empower", "ru": "наделять полномочиями"}, {"en": "encourage", "ru": "поощрять, воодушевлять"}, {"en": "encourage to", "ru": "побуждать"}, {"en": "end up", "ru": "в итоге оказаться"}, {"en": "end up in hell", "ru": "попасть в ад"}, {"en": "ended up being", "ru": "в итоге стал"}, {"en": "endurance", "ru": "выносливость"}, {"en": "engineer", "ru": "инженер"}, {"en": "enjoy doing", "ru": "получать удовольствие от"}, {"en": "enough", "ru": "достаточно"}, {"en": "entertainment", "ru": "развлечение"}, {"en": "environment", "ru": "окружающая среда"}, {"en": "errands", "ru": "поручения"}, {"en": "even though", "ru": "хотя"}, {"en": "even worse", "ru": "ещё хуже"}, {"en": "eventually", "ru": "в конце концов"}, {"en": "ever", "ru": "когда-либо"}, {"en": "exact", "ru": "точный"}, {"en": "exactly this point", "ru": "именно этот момент"}, {"en": "excellent", "ru": "отлично"}, {"en": "except", "ru": "кроме"}, {"en": "except / but", "ru": "кроме"}, {"en": "exceptional", "ru": "исключительный"}, {"en": "excite", "ru": "волновать"}, {"en": "excited", "ru": "в восторге"}, {"en": "excuse", "ru": "оправдание; извинение"}, {"en": "exhausted", "ru": "измотанный"}, {"en": "exist", "ru": "существовать"}, {"en": "existence", "ru": "существование"}, {"en": "expand vocabulary", "ru": "расширять словарь"}, {"en": "expansion", "ru": "расширение"}, {"en": "expect", "ru": "ожидать"}, {"en": "expensive enough", "ru": "достаточно дорого"}, {"en": "experience feelings", "ru": "переживать чувства"}, {"en": "expose", "ru": "подвергать / разоблачать"}, {"en": "express your opinion", "ru": "выражать свое мнение"}, {"en": "extend", "ru": "продлить"}, {"en": "extraordinary", "ru": "необычный"}, {"en": "face a challenge", "ru": "столкнуться с трудностью"}, {"en": "failure", "ru": "провал"}, {"en": "fair", "ru": "справедливый; честный"}, {"en": "fair price", "ru": "справедливая цена"}, {"en": "fairytale", "ru": "сказка"}, {"en": "fairytales", "ru": "сказки"}, {"en": "fall out", "ru": "поссориться"}, {"en": "far enough", "ru": "достаточно далеко"}, {"en": "farewell party", "ru": "прощальная вечеринка"}, {"en": "fasteners", "ru": "крепёж"}, {"en": "fear", "ru": "страх"}, {"en": "fed", "ru": "кормил (feed)"}, {"en": "fed up with", "ru": "сыт по горло"}, {"en": "feedback", "ru": "обратная связь"}, {"en": "feel dizzy", "ru": "чувствовать головокружение"}, {"en": "feel hot", "ru": "чувствовать жару"}, {"en": "feel proud of", "ru": "гордиться"}, {"en": "feel sick", "ru": "чувствовать себя плохо"}, {"en": "feel under pressure", "ru": "чувствовать давление"}, {"en": "figure", "ru": "понять; разобраться"}, {"en": "figure out", "ru": "разобраться"}, {"en": "find a solution", "ru": "находить решение"}, {"en": "find an excuse", "ru": "найти оправдание"}, {"en": "find out", "ru": "узнать"}, {"en": "finish doing", "ru": "закончить"}, {"en": "flexible", "ru": "гибкий"}, {"en": "focus on", "ru": "сосредоточиться на"}, {"en": "foggy", "ru": "туманный"}, {"en": "folks", "ru": "народ, люди"}, {"en": "follow this path", "ru": "идти этим путём"}, {"en": "for", "ru": "в течение"}, {"en": "for instance", "ru": "например"}, {"en": "for some reason", "ru": "по какой-то причине"}, {"en": "for the past month", "ru": "за последний месяц"}, {"en": "force", "ru": "заставлять"}, {"en": "force majeure", "ru": "форс-мажор"}, {"en": "force yourself", "ru": "заставлять себя"}, {"en": "force-majeur", "ru": "форс-мажор"}, {"en": "forgive", "ru": "прощать"}, {"en": "form first impressions", "ru": "формировать первое впечатление"}, {"en": "freak out", "ru": "паниковать"}, {"en": "free will", "ru": "свобода воли"}, {"en": "full", "ru": "сытый; полный"}, {"en": "future in the past", "ru": "будущее в прошедшем"}, {"en": "future perfect", "ru": "будущее совершенное"}, {"en": "gain confidence", "ru": "обрести уверенность"}, {"en": "gain experience", "ru": "получать опыт"}, {"en": "gain popularity", "ru": "набирать популярность"}, {"en": "gather issues", "ru": "собрать проблемы"}, {"en": "get /become", "ru": "стать становится, становится"}, {"en": "get a good deal", "ru": "заключить выгодную сделку"}, {"en": "get better", "ru": "становиться лучше"}, {"en": "get by", "ru": "сводить концы с концами"}, {"en": "get distracted", "ru": "отвлечься"}, {"en": "get dressed", "ru": "одеться"}, {"en": "get injured", "ru": "повредить, получить травму"}, {"en": "get involved in", "ru": "включиться в"}, {"en": "get lost", "ru": "потеряться"}, {"en": "get lucky", "ru": "повезти"}, {"en": "get me wrong", "ru": "неправильно понять"}, {"en": "get over", "ru": "пережить"}, {"en": "get refused", "ru": "получить отказ"}, {"en": "get stuck", "ru": "застрять"}, {"en": "get tangled", "ru": "запутаться"}, {"en": "get tired", "ru": "уставать"}, {"en": "get unjured", "ru": "повредить, получить"}, {"en": "get used to", "ru": "привыкать"}, {"en": "getting used to", "ru": "привыкание"}, {"en": "girly", "ru": "девчачий"}, {"en": "girly thing", "ru": "девчачья штука"}, {"en": "give a chance", "ru": "дать шанс"}, {"en": "give a lift", "ru": "подвезти"}, {"en": "give an explanation", "ru": "давать объяснение"}, {"en": "give up", "ru": "бросить, сдаться"}, {"en": "go bananas", "ru": "сходить с ума"}, {"en": "go bananas / nuts / crazy", "ru": "сходить с ума"}, {"en": "go beyond responsibilities", "ru": "выйти за рамки обязанностей"}, {"en": "go crazy", "ru": "сходить с ума"}, {"en": "go crazy / bananas", "ru": "сходить с ума"}, {"en": "go nuts", "ru": "сходить с ума"}, {"en": "go on vacation", "ru": "отправиться в отпуск"}, {"en": "go through a difficult time", "ru": "переживать сложный период"}, {"en": "go through life with", "ru": "пройти жизнь вместе с"}, {"en": "god is watching", "ru": "бог видит"}, {"en": "going to", "ru": "собираться"}, {"en": "gonna", "ru": "собираюсь (= going to)"}, {"en": "good at", "ru": "хорош в"}, {"en": "good enough", "ru": "достаточно хорошо"}, {"en": "good for you", "ru": "молодец"}, {"en": "gotta", "ru": "надо (= have got to)"}, {"en": "gradually", "ru": "постепенно"}, {"en": "graduate", "ru": "окончить университет"}, {"en": "grey and dull", "ru": "серый и унылый"}, {"en": "gross", "ru": "противный"}, {"en": "grow apart", "ru": "отдалиться"}, {"en": "grow up", "ru": "вырасти"}, {"en": "guess", "ru": "гадать, полагать"}, {"en": "guilty", "ru": "виновный"}, {"en": "hand in", "ru": "сдавать"}, {"en": "hand over", "ru": "передать"}, {"en": "handle", "ru": "справляться"}, {"en": "hang out", "ru": "проводить время вместе"}, {"en": "hard for him", "ru": "ему было тяжело"}, {"en": "hard on yourself", "ru": "строг к себе"}, {"en": "hardly", "ru": "едва ли"}, {"en": "hardly notice", "ru": "едва заметить"}, {"en": "have a desire", "ru": "иметь желание"}, {"en": "have a discussion", "ru": "проводить обсуждение"}, {"en": "have a point", "ru": "быть правым, иметь смысл"}, {"en": "have an influence on", "ru": "влиять на"}, {"en": "have some rest", "ru": "отдохнуть"}, {"en": "have you ever", "ru": "ты когда-нибудь…?"}, {"en": "head back", "ru": "вернуться"}, {"en": "head out", "ru": "отправиться"}, {"en": "height", "ru": "высота"}, {"en": "help yourself", "ru": "угощайся"}, {"en": "hilarious", "ru": "уморительный"}, {"en": "hire", "ru": "нанимать"}, {"en": "hit it off", "ru": "сразу поладить"}, {"en": "hold back", "ru": "сдерживать"}, {"en": "homemade", "ru": "домашний"}, {"en": "horrible", "ru": "ужасный"}, {"en": "horrible things", "ru": "ужасные вещи"}, {"en": "horror / horrible", "ru": "ужас / ужасный"}, {"en": "hot", "ru": "жаркий; возбуждённый"}, {"en": "how come", "ru": "как так?"}, {"en": "huge fan", "ru": "большой фанат"}, {"en": "I am ok with this", "ru": "меня это устраивает"}, {"en": "I can relate", "ru": "я понимаю / мне знакомо"}, {"en": "I don't like it either", "ru": "мне тоже не нравится"}, {"en": "I doubt that", "ru": "сомневаюсь"}, {"en": "I hope so", "ru": "надеюсь"}, {"en": "I know, right?", "ru": "да ну? / именно!"}, {"en": "I like it too", "ru": "мне тоже нравится"}, {"en": "I think so", "ru": "я так думаю"}, {"en": "I'd like not to", "ru": "я бы не хотел"}, {"en": "I'd rather", "ru": "я бы предпочёл"}, {"en": "I'm fed up", "ru": "мне надоело"}, {"en": "I'm full", "ru": "я сыт"}, {"en": "ill", "ru": "больной"}, {"en": "imagine doing", "ru": "представлять"}, {"en": "immediately", "ru": "немедленно"}, {"en": "impede", "ru": "препятствовать"}, {"en": "implement", "ru": "внедрять"}, {"en": "implementation", "ru": "внедрение"}, {"en": "impression", "ru": "впечатление"}, {"en": "improve", "ru": "улучшать"}, {"en": "improvement", "ru": "улучшение"}, {"en": "in advance", "ru": "заранее"}, {"en": "in fact", "ru": "на самом деле"}, {"en": "in good shape", "ru": "в хорошей форме"}, {"en": "in my circle", "ru": "в моём кругу"}, {"en": "in order to", "ru": "чтобы"}, {"en": "in order to / to", "ru": "чтобы"}, {"en": "in the age of", "ru": "в эпоху"}, {"en": "in the morning", "ru": "утром"}, {"en": "in the shadow", "ru": "в тени"}, {"en": "in time", "ru": "вовремя (к сроку)"}, {"en": "independent", "ru": "независимый"}, {"en": "independently", "ru": "независимо"}, {"en": "informed decision", "ru": "взвешенное решение"}, {"en": "initially", "ru": "изначально"}, {"en": "insects", "ru": "насекомые"}, {"en": "instant coffee", "ru": "растворимый кофе"}, {"en": "instead", "ru": "вместо"}, {"en": "instead of", "ru": "вместо"}, {"en": "intention", "ru": "намерение"}, {"en": "interested in", "ru": "интересоваться"}, {"en": "into art", "ru": "увлекаюсь искусством"}, {"en": "invariably", "ru": "неизменно"}, {"en": "issue", "ru": "проблема, вопрос"}, {"en": "it doesn't matter", "ru": "неважно"}, {"en": "it seems", "ru": "кажется"}, {"en": "it took me", "ru": "у меня ушло"}, {"en": "it was a pleasure", "ru": "это было удовольствие"}, {"en": "it's pleasant", "ru": "приятно"}, {"en": "i’d rather (think)", "ru": "я бы скорее"}, {"en": "jealous", "ru": "ревнивый"}, {"en": "job interview", "ru": "собеседование"}, {"en": "journaling", "ru": "ведение дневника"}, {"en": "joy", "ru": "радость"}, {"en": "just in time", "ru": "как раз вовремя"}, {"en": "keep a promise", "ru": "сдержать обещание"}, {"en": "keep doing", "ru": "продолжать"}, {"en": "keep in touch", "ru": "поддерживать связь"}, {"en": "keep it with", "ru": "держать при себе"}, {"en": "keep silent", "ru": "молчать"}, {"en": "keep up with", "ru": "идти в ногу с"}, {"en": "keep up with trends", "ru": "следовать трендам"}, {"en": "keeps silent", "ru": "молчит"}, {"en": "killjoy", "ru": "человек, портящий настроение"}, {"en": "kinda", "ru": "вроде как"}, {"en": "lack", "ru": "нехватать"}, {"en": "lack time", "ru": "не хватает времени"}, {"en": "lacks choices", "ru": "не хватает выбора"}, {"en": "lash extension", "ru": "наращивание ресниц"}, {"en": "lately", "ru": "в последнее время"}, {"en": "lead", "ru": "руководить"}, {"en": "lead to", "ru": "приводить к"}, {"en": "learn / find out", "ru": "узнать"}, {"en": "learn from mistakes", "ru": "учиться на ошибках"}, {"en": "leave danang for HCMC", "ru": "покидать - куда-то"}, {"en": "leave for", "ru": "уезжать в"}, {"en": "leave Vietnam", "ru": "уехать из Вьетнама"}, {"en": "let go of", "ru": "отпустить"}, {"en": "let someone down", "ru": "подвести кого-то"}, {"en": "likely", "ru": "вероятно"}, {"en": "likely to happen", "ru": "вероятно случится"}, {"en": "likely to move", "ru": "скорее всего перееду"}, {"en": "link between", "ru": "связующее звено между"}, {"en": "little by little", "ru": "мало-помалу"}, {"en": "long-lasting", "ru": "долгосрочный"}, {"en": "long-lasting impression", "ru": "долгое впечатление"}, {"en": "look around", "ru": "осматривать"}, {"en": "look at", "ru": "смотреть на"}, {"en": "look forward to", "ru": "с нетерпением ждать"}, {"en": "look up", "ru": "посмотреть"}, {"en": "lucky", "ru": "везучий"}, {"en": "luxurious", "ru": "роскошный"}, {"en": "make a commitment", "ru": "взять обязательство"}, {"en": "make a decision", "ru": "принять решение"}, {"en": "make a judgement", "ru": "выносить суждение"}, {"en": "make a request", "ru": "сделать запрос"}, {"en": "make a suggestion", "ru": "делать предложение"}, {"en": "make an effort", "ru": "прилагать усилия"}, {"en": "make an excuse", "ru": "оправдаться"}, {"en": "make assumptions", "ru": "делать предположения"}, {"en": "make conclusions", "ru": "делать выводы"}, {"en": "make ends meet", "ru": "сводить концы с концами"}, {"en": "make it", "ru": "справиться, добиться"}, {"en": "make it / survive", "ru": "справиться / выжить"}, {"en": "make it clear", "ru": "ясно объяснить"}, {"en": "make money", "ru": "зарабатывать деньги"}, {"en": "make preserves", "ru": "делать заготовки"}, {"en": "make progress", "ru": "добиваться прогресса"}, {"en": "make the most of", "ru": "максимально использовать"}, {"en": "make up", "ru": "макияж; мириться"}, {"en": "manage to", "ru": "суметь, успешно сделать"}, {"en": "management", "ru": "управление"}, {"en": "manager", "ru": "менеджер"}, {"en": "manually", "ru": "вручную"}, {"en": "married", "ru": "женатый / замужняя"}, {"en": "match", "ru": "совпадать; подходить"}, {"en": "maternal leave", "ru": "декретный отпуск"}, {"en": "mature", "ru": "зрелый; взрослеть"}, {"en": "meet agreements", "ru": "выполнять договорённости"}, {"en": "meet deadlines", "ru": "укладываться в сроки"}, {"en": "meet expectations", "ru": "соответствовать ожиданиям"}, {"en": "meet society's expectations", "ru": "соответствовать ожиданиям общества"}, {"en": "meet up", "ru": "встретиться"}, {"en": "mention", "ru": "упомянуть"}, {"en": "mess up", "ru": "напортачить"}, {"en": "message is sent", "ru": "сообщение отправлено"}, {"en": "mind doing", "ru": "быть не против"}, {"en": "mind-blowing", "ru": "сногсшибательный"}, {"en": "miss doing", "ru": "скучать по"}, {"en": "mistake", "ru": "ошибка"}, {"en": "misunderstanding", "ru": "недопонимание"}, {"en": "mixed feelings", "ru": "смешанные чувства"}, {"en": "money is being earned", "ru": "деньги зарабатываются"}, {"en": "monitor", "ru": "контролировать"}, {"en": "mood swings", "ru": "перепады настроения"}, {"en": "most of", "ru": "большая часть"}, {"en": "mould", "ru": "плесень"}, {"en": "move in", "ru": "въехать"}, {"en": "move out", "ru": "съехать"}, {"en": "move up", "ru": "продвигаться по карьерной лестнице"}, {"en": "movement", "ru": "движение"}, {"en": "my pleasure", "ru": "пожалуйста / «моё удовольствие»"}, {"en": "my state", "ru": "моё состояние"}, {"en": "mysterious", "ru": "загадочный"}, {"en": "nail", "ru": "ноготь"}, {"en": "nail (finger)", "ru": "ноготь"}, {"en": "nail (metal)", "ru": "гвоздь"}, {"en": "nail it", "ru": "сделать на отлично"}, {"en": "negative attitude", "ru": "негативное отношение"}, {"en": "neighborhood", "ru": "район, соседство"}, {"en": "nervous", "ru": "нервничать"}, {"en": "never", "ru": "никогда"}, {"en": "never thought I would", "ru": "никогда не думал, что"}, {"en": "no doubt", "ru": "без сомнения"}, {"en": "no excuses", "ru": "без оправданий"}, {"en": "no idea / no clue", "ru": "понятия не имею"}, {"en": "no strength", "ru": "нет сил"}, {"en": "no worries", "ru": "не переживай"}, {"en": "not worth it", "ru": "не стоит того"}, {"en": "notice", "ru": "замечать"}, {"en": "obsessed with", "ru": "одержим"}, {"en": "obstacle", "ru": "препятствие"}, {"en": "obviously", "ru": "очевидно"}, {"en": "off season", "ru": "несезон"}, {"en": "ok with", "ru": "нормально относиться к"}, {"en": "on purpose", "ru": "намеренно"}, {"en": "on time", "ru": "вовремя"}, {"en": "once in my life", "ru": "однажды в жизни"}, {"en": "open up", "ru": "открыться, рассказать о чувствах"}, {"en": "open-minded", "ru": "открытый новому"}, {"en": "opportunity", "ru": "возможность"}, {"en": "optimize", "ru": "оптимизировать"}, {"en": "options", "ru": "варианты"}, {"en": "organize", "ru": "организовывать"}, {"en": "outcomes", "ru": "результаты"}, {"en": "outcomes = results", "ru": "исходы = результаты"}, {"en": "oven", "ru": "печь"}, {"en": "overcome", "ru": "преодолеть"}, {"en": "overcome / get over", "ru": "преодолеть / пережить"}, {"en": "overcome difficulties", "ru": "преодолеть трудности"}, {"en": "overlapping deadlines", "ru": "пересекающиеся сроки"}, {"en": "overloaded", "ru": "перегруженный"}, {"en": "overwhelmed", "ru": "перегруженный"}, {"en": "own up", "ru": "признаться"}, {"en": "pack up", "ru": "собрать вещи"}, {"en": "packed", "ru": "забитый"}, {"en": "packing", "ru": "собирать вещи"}, {"en": "paid maternal leave", "ru": "оплачиваемый декрет"}, {"en": "paid sick leave", "ru": "оплачиваемый больничный"}, {"en": "paid vacation", "ru": "оплачиваемый отпуск"}, {"en": "pain in the ass", "ru": "заноза в заднице"}, {"en": "participate", "ru": "участвовать"}, {"en": "partly", "ru": "частично"}, {"en": "partly cloudy", "ru": "переменная облачность"}, {"en": "partner in crime", "ru": "закадычный друг / soulmate"}, {"en": "passion fruit", "ru": "маракуйя"}, {"en": "passionate", "ru": "страстный"}, {"en": "passive voice", "ru": "страдательный залог"}, {"en": "past perfect", "ru": "прошедшее совершённое"}, {"en": "patience", "ru": "терпение"}, {"en": "patient", "ru": "терпеливый; пациент"}, {"en": "pay attention to", "ru": "обращать внимание"}, {"en": "pay extra", "ru": "доплатить"}, {"en": "pay off", "ru": "окупиться; выплатить"}, {"en": "pay off a loan", "ru": "погасить кредит"}, {"en": "pay off twice", "ru": "окупиться вдвойне"}, {"en": "peace and quiet", "ru": "тишина и покой"}, {"en": "peculiarity", "ru": "особенность"}, {"en": "per month", "ru": "в месяц"}, {"en": "perspective", "ru": "перспектива; точка зрения"}, {"en": "pick up", "ru": "забрать; подобрать; подхватить"}, {"en": "pills / medication", "ru": "таблетки / лекарства"}, {"en": "pissed off", "ru": "взбешён"}, {"en": "platform", "ru": "платформа"}, {"en": "pollution", "ru": "загрязнение"}, {"en": "poor", "ru": "бедный"}, {"en": "pop it", "ru": "щёлкнуть (поп-ит)"}, {"en": "pop out", "ru": "выскочить"}, {"en": "pop up", "ru": "всплыть"}, {"en": "position", "ru": "должность"}, {"en": "postpone doing", "ru": "откладывать"}, {"en": "practice doing", "ru": "практиковать"}, {"en": "prepare for", "ru": "готовиться к"}, {"en": "pressure", "ru": "давление"}, {"en": "pretend", "ru": "притворяться"}, {"en": "process", "ru": "процесс"}, {"en": "project", "ru": "проект"}, {"en": "project manager", "ru": "руководитель проекта"}, {"en": "promise", "ru": "обещать"}, {"en": "pronouns", "ru": "местоимения"}, {"en": "proposal", "ru": "предложение"}, {"en": "proudest project", "ru": "самый гордый проект"}, {"en": "purpose", "ru": "цель, смысл"}, {"en": "put effort", "ru": "приложить усилия"}, {"en": "put on music", "ru": "включить музыку"}, {"en": "put on stop", "ru": "поставить на паузу"}, {"en": "queue", "ru": "очередь"}, {"en": "quiet", "ru": "тихий"}, {"en": "quit doing", "ru": "бросить"}, {"en": "quite", "ru": "довольно"}, {"en": "radical acceptance", "ru": "радикальное принятие"}, {"en": "raise awareness", "ru": "повышать осведомлённость"}, {"en": "rapidly", "ru": "быстро"}, {"en": "rare", "ru": "редкий"}, {"en": "rather rare", "ru": "довольно редко"}, {"en": "reach a goal", "ru": "достигать цели"}, {"en": "reason", "ru": "причина"}, {"en": "recently", "ru": "недавно"}, {"en": "recommend doing", "ru": "рекомендовать"}, {"en": "reconsider", "ru": "пересмотреть"}, {"en": "recount", "ru": "пересчитать"}, {"en": "redistribute", "ru": "перераспределить"}, {"en": "reduce stress", "ru": "снизить стресс"}, {"en": "refuse", "ru": "отказать"}, {"en": "refuse / reject", "ru": "отказать / отклонить"}, {"en": "regret", "ru": "сожалеть"}, {"en": "regular job", "ru": "постоянная работа"}, {"en": "reject", "ru": "отклонить"}, {"en": "relate to", "ru": "понимать, соотносить с собой"}, {"en": "relate to it", "ru": "это мне близко"}, {"en": "relatives", "ru": "родственники"}, {"en": "relevant", "ru": "релевантный"}, {"en": "rely on", "ru": "полагаться на"}, {"en": "rely on me", "ru": "положись на меня"}, {"en": "request", "ru": "запрос; запросить"}, {"en": "resonate with", "ru": "резонировать с"}, {"en": "responsibility", "ru": "ответственность"}, {"en": "rest", "ru": "отдыхать"}, {"en": "resting bitch face", "ru": "вечно недовольное лицо"}, {"en": "retreat", "ru": "ретрит; отступление"}, {"en": "return", "ru": "возвращаться"}, {"en": "rich", "ru": "богатый"}, {"en": "risk", "ru": "риск"}, {"en": "risk doing", "ru": "рискнуть"}, {"en": "role", "ru": "роль"}, {"en": "rude", "ru": "грубый"}, {"en": "run into", "ru": "случайно встретить"}, {"en": "run out of time", "ru": "не хватить времени"}, {"en": "safe", "ru": "безопасный"}, {"en": "safety", "ru": "безопасность"}, {"en": "salary", "ru": "зарплата"}, {"en": "save money", "ru": "копить деньги"}, {"en": "save up", "ru": "откладывать"}, {"en": "scared", "ru": "испуганный"}, {"en": "scared / afraid of", "ru": "бояться"}, {"en": "scared to", "ru": "бояться сделать"}, {"en": "scene", "ru": "сцена"}, {"en": "second", "ru": "thoughts - сомнения"}, {"en": "second thoughts", "ru": "вторые мысли / сомнения"}, {"en": "second-guess", "ru": "подвергать сомнению"}, {"en": "see differently", "ru": "видеть иначе"}, {"en": "see off", "ru": "провожать"}, {"en": "self-sufficient", "ru": "самодостаточный"}, {"en": "sense", "ru": "чувство"}, {"en": "sense of community", "ru": "чувство общности"}, {"en": "sense of pride", "ru": "чувство гордости"}, {"en": "sense of relief", "ru": "чувство облегчения"}, {"en": "sensitive", "ru": "чувствительный"}, {"en": "separate", "ru": "разделение; отдельный"}, {"en": "series of books", "ru": "серия книг"}, {"en": "service fee", "ru": "плата за обслуживание"}, {"en": "set myself free", "ru": "освободить себя"}, {"en": "set out", "ru": "отправиться в путь"}, {"en": "set out for", "ru": "отправиться в"}, {"en": "set up", "ru": "создавать, организовывать, наладить, внедрять"}, {"en": "several", "ru": "несколько"}, {"en": "several times", "ru": "несколько раз"}, {"en": "shade", "ru": "тень"}, {"en": "shadow", "ru": "тень (от предмета)"}, {"en": "shock", "ru": "шокировать"}, {"en": "shocking", "ru": "шокирующий"}, {"en": "shocking moment", "ru": "шокирующий момент"}, {"en": "show off", "ru": "выпендриваться"}, {"en": "sick leave", "ru": "больничный"}, {"en": "sick of", "ru": "достало"}, {"en": "since", "ru": "с"}, {"en": "sleep in", "ru": "поспать подольше"}, {"en": "slightly", "ru": "слегка"}, {"en": "slightly unclear", "ru": "слегка неясно"}, {"en": "smart person", "ru": "умный человек"}, {"en": "smelly", "ru": "вонючий"}, {"en": "smoothly", "ru": "гладко"}, {"en": "so far", "ru": "до настоящего момента"}, {"en": "solution", "ru": "решение"}, {"en": "solution will pop up", "ru": "решение всплывёт"}, {"en": "solve", "ru": "решать"}, {"en": "solve a conflict", "ru": "решить конфликт"}, {"en": "sophomore", "ru": "студент второго курса"}, {"en": "speak volumes", "ru": "многое говорит"}, {"en": "specification", "ru": "спецификация"}, {"en": "speed up", "ru": "ускориться"}, {"en": "spend money", "ru": "тратить деньги"}, {"en": "squeezed", "ru": "сжатый"}, {"en": "stably / consistently", "ru": "стабильно"}, {"en": "stages", "ru": "этапы"}, {"en": "stand up to", "ru": "противостоять"}, {"en": "standard", "ru": "стандарт"}, {"en": "start from scratch", "ru": "начать с нуля"}, {"en": "state", "ru": "состояние"}, {"en": "state of desperation", "ru": "состояние отчаяния"}, {"en": "stay focused", "ru": "сохранять концентрацию"}, {"en": "stay up", "ru": "не ложиться спать"}, {"en": "step away", "ru": "временно уйти из профессии"}, {"en": "step by step", "ru": "шаг за шагом"}, {"en": "step down", "ru": "уйти с должности"}, {"en": "step outside your role", "ru": "выйти за рамки роли"}, {"en": "stick to", "ru": "придерживаться"}, {"en": "stick to a plan", "ru": "придерживаться плана"}, {"en": "stigmatized", "ru": "стигматизированный"}, {"en": "stigmatized topics", "ru": "стигматизированные темы"}, {"en": "stomach ache", "ru": "боль в животе"}, {"en": "stop over", "ru": "сделать остановку в пути"}, {"en": "stove / cooker", "ru": "плита; плитка"}, {"en": "strength", "ru": "сила"}, {"en": "strict", "ru": "строгий"}, {"en": "strip", "ru": "лишать; стрип"}, {"en": "strip power", "ru": "лишить власти"}, {"en": "succeed in", "ru": "преуспеть в"}, {"en": "success", "ru": "успех"}, {"en": "successful", "ru": "успешный"}, {"en": "suddenly", "ru": "неожиданно"}, {"en": "suffer from", "ru": "страдать от"}, {"en": "suggest", "ru": "предлагать"}, {"en": "suggest doing", "ru": "предлагать (что-то делать)"}, {"en": "support", "ru": "поддерживать"}, {"en": "suppose", "ru": "предполагать"}, {"en": "surprise", "ru": "удивить"}, {"en": "surprisingly", "ru": "удивительно"}, {"en": "surround", "ru": "окружать"}, {"en": "surrounded by", "ru": "окружён"}, {"en": "surroundings", "ru": "окружение"}, {"en": "survive", "ru": "выжить"}, {"en": "swap", "ru": "обмен"}, {"en": "switch off", "ru": "выключить"}, {"en": "switch on", "ru": "включать"}, {"en": "system", "ru": "система"}, {"en": "take a break", "ru": "сделать перерыв"}, {"en": "take a chance", "ru": "рискнуть"}, {"en": "take action", "ru": "принять меры"}, {"en": "take control of", "ru": "взять под контроль"}, {"en": "take into account", "ru": "учитывать"}, {"en": "take it easy", "ru": "не переживать, относиться спокойно"}, {"en": "take on", "ru": "брать на себя (новую роль/обязанности)"}, {"en": "take over", "ru": "перенимать, возглавлять"}, {"en": "take part", "ru": "участвовать"}, {"en": "take pictures", "ru": "фотографировать"}, {"en": "take place", "ru": "проходить / происходить"}, {"en": "take responsibility", "ru": "брать ответственность"}, {"en": "take seriously", "ru": "воспринимать серьезно"}, {"en": "take the piss", "ru": "стебаться"}, {"en": "takes a long time", "ru": "занимает много времени"}, {"en": "talk over", "ru": "обсудить"}, {"en": "target audience", "ru": "целевая аудитория"}, {"en": "tasteless", "ru": "безвкусный"}, {"en": "team", "ru": "команда"}, {"en": "tell me about yourself", "ru": "расскажите о себе"}, {"en": "tend to", "ru": "быть склонным"}, {"en": "tend to think", "ru": "склонен думать"}, {"en": "that's what I need", "ru": "вот что мне нужно"}, {"en": "the globe is round", "ru": "земля круглая"}, {"en": "the other day", "ru": "на днях"}, {"en": "the thing is", "ru": "дело в том"}, {"en": "the way she was treated", "ru": "то, как с ней обращались"}, {"en": "these / those", "ru": "эти / те"}, {"en": "thick paper", "ru": "плотная бумага"}, {"en": "this / that", "ru": "это / то"}, {"en": "thought escapes me", "ru": "мысль ускользает"}, {"en": "throw a party", "ru": "устроить вечеринку"}, {"en": "throw away", "ru": "выбрасывать"}, {"en": "tired of", "ru": "уставший от"}, {"en": "to accept", "ru": "принять"}, {"en": "to adjust", "ru": "скорректировать, подогнать, адаптировать"}, {"en": "to admit", "ru": "признать"}, {"en": "to allow", "ru": "позволять"}, {"en": "to amaze", "ru": "поражать"}, {"en": "to backfire", "ru": "выйти боком"}, {"en": "to be familiar with", "ru": "быть знакомым с чем-то"}, {"en": "to be late", "ru": "опоздать"}, {"en": "to bear", "ru": "вынашивать; нести"}, {"en": "to boost", "ru": "усилить"}, {"en": "to boost workflow", "ru": "ускорить рабочий процесс"}, {"en": "to carry", "ru": "носить"}, {"en": "to conclude", "ru": "заключить, сделать вывод"}, {"en": "to consider", "ru": "рассматривать, считать, подумать"}, {"en": "to consume", "ru": "потреблять"}, {"en": "to end up", "ru": "в итоге оказаться"}, {"en": "to entertain", "ru": "развлекать"}, {"en": "to excite", "ru": "волновать, возбуждать"}, {"en": "to exhausted", "ru": "extremely tired (игзостед)"}, {"en": "to exist", "ru": "существовать"}, {"en": "to expand", "ru": "расширять"}, {"en": "to expect", "ru": "ожидать"}, {"en": "to extend", "ru": "удлинить, продлить"}, {"en": "to force", "ru": "заставлять силой"}, {"en": "to forgive", "ru": "простить"}, {"en": "to hurry", "ru": "спешить"}, {"en": "to increase", "ru": "повысить"}, {"en": "to mature", "ru": "взрослеть"}, {"en": "to mention", "ru": "упоминать"}, {"en": "to nag", "ru": "ныть"}, {"en": "to pretend", "ru": "делать вид"}, {"en": "to promote", "ru": "продвигать"}, {"en": "to reschedule", "ru": "перенести"}, {"en": "to schedule", "ru": "планировать"}, {"en": "to shock", "ru": "шокировать"}, {"en": "to struggle with", "ru": "испытывать трудности с"}, {"en": "to sweat", "ru": "потеть"}, {"en": "to treat equally", "ru": "обращаться одинаково"}, {"en": "to unwind", "ru": "расслабиться"}, {"en": "to value / appreciate", "ru": "ценить"}, {"en": "to will", "ru": "хотеть"}, {"en": "to/in order to", "ru": "дабы чтобы"}, {"en": "traffic", "ru": "дорожное движение"}, {"en": "trainer", "ru": "тренер"}, {"en": "travel", "ru": "путешествовать"}, {"en": "treat like a queen", "ru": "относиться как к королеве"}, {"en": "treat well", "ru": "хорошо относиться"}, {"en": "treatment", "ru": "лечение, уход"}, {"en": "trends won't last", "ru": "тренды не продлятся"}, {"en": "triggered", "ru": "задетый, триггернутый"}, {"en": "triggered by", "ru": "задетый чем-то"}, {"en": "triggering", "ru": "триггерящий"}, {"en": "trust in anyone", "ru": "доверять кому-либо"}, {"en": "trust in yourself", "ru": "верить в себя"}, {"en": "turn down", "ru": "отклонять, отказываться"}, {"en": "turn on", "ru": "включать"}, {"en": "turn out", "ru": "оказаться"}, {"en": "turn out well", "ru": "хорошо обернуться"}, {"en": "turned out to be", "ru": "оказался"}, {"en": "twice as much", "ru": "в два раза больше"}, {"en": "two ways to act", "ru": "два способа действовать"}, {"en": "UFO", "ru": "НЛО"}, {"en": "unclear", "ru": "неясный"}, {"en": "unconscious", "ru": "бессознательный"}, {"en": "under pressure", "ru": "под давлением"}, {"en": "unfair", "ru": "несправедливо"}, {"en": "unflavoured", "ru": "без добавок вкуса"}, {"en": "unnecessary", "ru": "ненужный"}, {"en": "uplifted", "ru": "окрылённый"}, {"en": "used to", "ru": "раньше (делал)"}, {"en": "user", "ru": "пользователь"}, {"en": "UTC", "ru": "часовой пояс UTC"}, {"en": "vague", "ru": "смутный, туманный"}, {"en": "valuable", "ru": "ценный"}, {"en": "valuable lesson", "ru": "ценный урок"}, {"en": "value / appreciate", "ru": "ценить"}, {"en": "value for money", "ru": "цена-качество"}, {"en": "values", "ru": "ценности"}, {"en": "visarun", "ru": "визаран"}, {"en": "vocation / vacation", "ru": "призвание / отпуск"}, {"en": "volume", "ru": "том; громкость"}, {"en": "volumes", "ru": "тома"}, {"en": "wage", "ru": "почасовая оплата"}, {"en": "wage / salary / income", "ru": "ставка / зарплата / доход"}, {"en": "want for more", "ru": "хотеть большего"}, {"en": "warm up", "ru": "разминаться"}, {"en": "waste energy", "ru": "тратить энергию зря"}, {"en": "waste money", "ru": "транжирить деньги"}, {"en": "waste time", "ru": "тратить время зря"}, {"en": "watch", "ru": "наблюдать"}, {"en": "watercolors", "ru": "акварель"}, {"en": "we'll see", "ru": "посмотрим"}, {"en": "weights", "ru": "гантели, веса"}, {"en": "what is it like", "ru": "каково это"}, {"en": "where do you see yourself", "ru": "где вы видите себя"}, {"en": "why should we hire you", "ru": "почему мы должны вас нанять"}, {"en": "willing to", "ru": "готовый"}, {"en": "willpower", "ru": "сила воли"}, {"en": "wise", "ru": "мудрый"}, {"en": "within", "ru": "в течение"}, {"en": "within a year", "ru": "в течение года"}, {"en": "without a purpose", "ru": "без цели"}, {"en": "won't bring joy", "ru": "не принесёт радости"}, {"en": "word-of-mouth", "ru": "сарафанное радио"}, {"en": "work out", "ru": "получиться; сработать; тренироваться"}, {"en": "workflow", "ru": "рабочий процесс"}, {"en": "workload", "ru": "загрузка, объём работы"}, {"en": "workload reduction", "ru": "снижение нагрузки"}, {"en": "worth it", "ru": "стоит того"}, {"en": "wrap up", "ru": "завершить; упаковать"}, {"en": "write down", "ru": "записать"}, {"en": "yet", "ru": "еще (в вопросах и отрицаниях)"}, {"en": "you will nail it", "ru": "у тебя получится"}, {"en": "youth", "ru": "молодёжь; юность"}];

const STORE_NAME = "vocab-progress.json";
const SCRIPT_NAME = "WordOfDay";
const ROTATE_SECONDS = 10;
const PASSIVE_MARKER = "PASSIVE_WIDGET_V13";
const RELATED_LIMIT = 2;

const STOP_EN = {
  a: 1, an: 1, the: 1, to: 1, of: 1, in: 1, on: 1, for: 1, with: 1, by: 1,
  at: 1, as: 1, is: 1, be: 1, or: 1, and: 1, it: 1, my: 1, your: 1, from: 1,
  do: 1, did: 1, does: 1, not: 1, this: 1, that: 1, up: 1, out: 1,
};
const STOP_RU = {
  "в": 1, "на": 1, "с": 1, "к": 1, "по": 1, "о": 1, "и": 1, "или": 1,
  "не": 1, "от": 1, "за": 1, "для": 1, "как": 1, "это": 1, "из": 1,
};

function nowMs() {
  return Date.now();
}

function rotateMs() {
  return ROTATE_SECONDS * 1000;
}

function todayKey() {
  const d = new Date();
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

function getStorePath() {
  const fm = FileManager.local();
  return fm.joinPath(fm.documentsDirectory(), STORE_NAME);
}

function loadProgress() {
  const fm = FileManager.local();
  const path = getStorePath();
  if (!fm.fileExists(path)) {
    return { index: 0, current: null, shownAt: 0, history: {} };
  }
  try {
    const data = JSON.parse(fm.readString(path));
    if (typeof data.shownAt !== "number") data.shownAt = 0;
    if (!data.history) data.history = {};
    return data;
  } catch (e) {
    return { index: 0, current: null, shownAt: 0, history: {} };
  }
}

function saveProgress(data) {
  const fm = FileManager.local();
  fm.writeString(getStorePath(), JSON.stringify(data));
}

function nextWord(progress) {
  let idx = typeof progress.index === "number" ? progress.index : 0;
  if (idx >= WORDS.length) idx = 0;
  const word = WORDS[idx];
  const day = todayKey();
  progress.current = { en: word.en, ru: word.ru, index: idx };
  progress.index = idx + 1;
  progress.shownAt = nowMs();
  const key = word.en.toLowerCase();
  if (!progress.history[key]) {
    progress.history[key] = {
      en: word.en,
      ru: word.ru,
      firstDay: day,
      shownCount: 0,
    };
  }
  progress.history[key].shownCount = (progress.history[key].shownCount || 0) + 1;
  progress.history[key].lastShownAt = new Date().toISOString();
  saveProgress(progress);
  return progress;
}

function needsRotate(progress) {
  if (!progress.current) return true;
  if (!progress.shownAt) return true;
  return nowMs() - progress.shownAt >= rotateMs();
}

function ensureCurrentWord(progress) {
  if (needsRotate(progress)) return nextWord(progress);
  return progress;
}

function nextRefreshDate() {
  return new Date(nowMs() + ROTATE_SECONDS * 1000);
}

function tapNextUrl() {
  return (
    "scriptable:///run/" +
    encodeURIComponent(SCRIPT_NAME) +
    "?action=next"
  );
}

function isTapNext() {
  try {
    const q = args.queryParameters || {};
    return String(q.action || "") === "next";
  } catch (e) {
    return false;
  }
}

function leftText(t) {
  try {
    t.leftAlignText();
  } catch (e) {}
  return t;
}

function closeToHome() {
  try {
    Script.complete();
  } catch (e) {}
  try {
    App.close();
  } catch (e) {}
}

function tokensEn(s) {
  return String(s || "")
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((p) => p.length >= 3 && !STOP_EN[p]);
}

function tokensRu(s) {
  return String(s || "")
    .toLowerCase()
    .split(/[^a-zа-яё0-9]+/i)
    .filter((p) => p.length >= 3 && !STOP_RU[p]);
}

function findRelated(current, limit) {
  limit = limit || RELATED_LIMIT;
  if (!current) return [];
  const curEn = String(current.en || "").toLowerCase().trim();
  const enToks = tokensEn(current.en);
  const ruToks = tokensRu(current.ru);
  const enSet = {};
  for (const t of enToks) enSet[t] = 1;
  const ruSet = {};
  for (const t of ruToks) ruSet[t] = 1;

  const scored = [];
  for (let i = 0; i < WORDS.length; i++) {
    const w = WORDS[i];
    const oEn = String(w.en || "").toLowerCase().trim();
    if (oEn === curEn) continue;

    let score = 0;
    if (curEn.length >= 3 && (oEn.indexOf(curEn) !== -1 || curEn.indexOf(oEn) !== -1)) {
      score += 100;
    }
    const parts = String(current.en || "").split(/\s*\/\s*/);
    for (const part of parts) {
      const p = part.toLowerCase().trim();
      if (p.length >= 3 && (oEn.indexOf(p) !== -1 || p.indexOf(oEn) !== -1)) {
        score += 80;
        break;
      }
    }
    const ot = tokensEn(w.en);
    let sharedEn = 0;
    for (const t of ot) if (enSet[t]) sharedEn++;
    score += 25 * sharedEn;

    const ort = tokensRu(w.ru);
    let sharedRu = 0;
    for (const t of ort) if (ruSet[t]) sharedRu++;
    score += 20 * sharedRu;

    if (enToks.length && ot.length && enSet[ot[0]]) score += 10;

    if (score > 0) scored.push({ score: score, i: i, w: w });
  }

  scored.sort((a, b) => b.score - a.score || a.i - b.i);
  const out = [];
  const seen = {};
  for (const item of scored) {
    if (out.length >= limit) break;
    if (item.score < 15) continue;
    const k = item.w.en.toLowerCase();
    if (seen[k]) continue;
    seen[k] = 1;
    out.push(item.w);
  }

  if (out.length < limit && typeof current.index === "number") {
    const around = [1, -1, 2, -2, 3, -3];
    for (const d of around) {
      if (out.length >= limit) break;
      let j = current.index + d;
      if (j < 0 || j >= WORDS.length) continue;
      const w = WORDS[j];
      const k = w.en.toLowerCase();
      if (k === curEn || seen[k]) continue;
      seen[k] = 1;
      out.push(w);
    }
  }
  return out;
}

async function speakWord(text) {
  const clean = String(text || "")
    .replace(/[\/→←•]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return;
  await Speech.speak(clean, { language: "en-US", rate: 0.42 });
}

function addShadow(t, alpha) {
  t.shadowColor = new Color("#000000", alpha);
  t.shadowRadius = 2;
  t.shadowOffset = new Point(0, 1);
}

function familyName() {
  return config.widgetFamily || "medium";
}

function isAccessoryFamily(family) {
  const f = family || familyName();
  return (
    f === "accessoryRectangular" ||
    f === "accessoryInline" ||
    f === "accessoryCircular"
  );
}

/** Ширина medium/small/large/accessory по экрану устройства (pt). */
function widgetOuterWidth() {
  const family = familyName();
  let sw = 390;
  let sh = 844;
  try {
    const s = Device.screenSize();
    sw = Math.min(s.width, s.height);
    sh = Math.max(s.width, s.height);
  } catch (e) {}

  // типовые medium-ширины iPhone
  let medium = 338;
  if (sw >= 428 || sh >= 926) medium = 364; // Pro Max
  else if (sw >= 414 || sh >= 896) medium = 360; // 11 / XR
  else if (sw >= 393 || sh >= 852) medium = 338; // 14/15
  else if (sw >= 390 || sh >= 844) medium = 338; // 12/13
  else if (sw >= 375 && sh >= 812) medium = 329; // X / 11 Pro
  else if (sw >= 375) medium = 322;
  else medium = 321;

  if (family === "accessoryInline") return Math.round(medium * 0.55);
  if (family === "accessoryCircular") return 60;
  if (family === "accessoryRectangular") return Math.round(medium * 0.48);
  if (family === "small") return Math.round(medium * 0.48);
  if (family === "large" || family === "extraLarge") return medium;
  return medium; // medium
}

function contentWidth() {
  const family = familyName();
  if (family === "accessoryInline") return widgetOuterWidth();
  if (family === "accessoryCircular") return widgetOuterWidth() - 8;
  if (family === "accessoryRectangular") return widgetOuterWidth() - 12;
  // padding 16+16
  return widgetOuterWidth() - 32;
}

function enColor() {
  if (isAccessoryFamily()) {
    try {
      return Color.labelColor();
    } catch (e) {
      return Color.black();
    }
  }
  return Color.white();
}

function ruColor(alpha) {
  if (isAccessoryFamily()) {
    try {
      return Color.secondaryLabelColor();
    } catch (e) {
      return Color.darkGray();
    }
  }
  return new Color("#FFFFFF", alpha);
}

/** Точная ширина текста через DrawContext (как рисует система). */
function measureTextWidth(text, fontSize, bold) {
  const s = String(text || "");
  if (!s) return 0;
  try {
    const ctx = new DrawContext();
    ctx.opaque = false;
    ctx.size = new Size(2000, Math.ceil(fontSize * 2));
    ctx.font = bold ? Font.boldSystemFont(fontSize) : Font.systemFont(fontSize);
    const size = ctx.sizeForText(s);
    return size && size.width ? size.width : 0;
  } catch (e) {
    // fallback: мягкая оценка, в пользу одной строки
    return s.length * fontSize * (bold ? 0.45 : 0.4);
  }
}

/** Перенос только если EN - RU реально не влезает. */
function needsWrap(word, enSize, ruSize) {
  const max = contentWidth();
  const line =
    measureTextWidth(word.en, enSize, true) +
    measureTextWidth(" - ", ruSize, false) +
    measureTextWidth(word.ru, ruSize, false);
  // небольшой запас: стек не должен переноситься «на глаз»
  return line > max + 2;
}

/**
 * EN фиксированного размера.
 * В одну строку с переводом, если влезает; иначе перевод снизу.
 */
function addWordBlock(w, word, opts) {
  const enSize = opts.enSize;
  const ruSize = opts.ruSize;
  const ruAlpha = opts.ruAlpha;
  const accessory = !!opts.accessory;
  const wrap = needsWrap(word, enSize, ruSize);
  const scale = accessory ? 0.7 : 1;

  if (wrap) {
    const en = leftText(w.addText(word.en));
    en.font = Font.boldSystemFont(enSize);
    en.textColor = enColor();
    en.lineLimit = accessory ? 2 : 3;
    en.minimumScaleFactor = scale;
    if (!accessory) addShadow(en, 0.5);

    w.addSpacer(2);
    const ru = leftText(w.addText(word.ru));
    ru.font = Font.systemFont(ruSize);
    ru.textColor = ruColor(ruAlpha);
    ru.lineLimit = accessory ? 2 : 3;
    ru.minimumScaleFactor = scale;
    if (!accessory) addShadow(ru, 0.4);
    return;
  }

  const row = w.addStack();
  row.layoutHorizontally();
  row.centerAlignContent();

  const en = leftText(row.addText(word.en));
  en.font = Font.boldSystemFont(enSize);
  en.textColor = enColor();
  en.lineLimit = 1;
  en.minimumScaleFactor = scale;
  if (!accessory) addShadow(en, 0.5);

  const sep = leftText(row.addText(" - "));
  sep.font = Font.systemFont(ruSize);
  sep.textColor = ruColor(0.7);
  sep.minimumScaleFactor = scale;
  if (!accessory) addShadow(sep, 0.35);

  const ru = leftText(row.addText(word.ru));
  ru.font = Font.systemFont(ruSize);
  ru.textColor = ruColor(ruAlpha);
  ru.lineLimit = 1;
  ru.minimumScaleFactor = scale;
  if (!accessory) addShadow(ru, 0.4);
}

function createWidget(progress) {
  const w = new ListWidget();
  const family = familyName();
  const accessory = isAccessoryFamily(family);

  w.backgroundColor = Color.clear();
  if (accessory) {
    try {
      w.addAccessoryWidgetBackground = true;
    } catch (e) {}
    w.setPadding(2, 4, 2, 4);
  } else {
    w.setPadding(14, 16, 14, 16);
  }
  w.refreshAfterDate = nextRefreshDate();
  // тап → Scriptable меняет набор и закрывается обратно на экран
  w.url = tapNextUrl();

  let enSize = 20;
  let ruSize = 17;
  let blockGap = 14;
  let relLimit = RELATED_LIMIT;

  if (family === "large") {
    enSize = 24;
    ruSize = 20;
  } else if (family === "small") {
    enSize = 16;
    ruSize = 14;
    blockGap = 10;
    relLimit = 1;
  } else if (family === "accessoryRectangular") {
    enSize = 13;
    ruSize = 12;
    blockGap = 3;
    relLimit = 1;
  } else if (family === "accessoryInline") {
    enSize = 12;
    ruSize = 12;
    relLimit = 0;
  } else if (family === "accessoryCircular") {
    enSize = 11;
    ruSize = 10;
    relLimit = 0;
  }

  if (!accessory) w.addSpacer();

  if (family === "accessoryCircular") {
    const en = leftText(w.addText(progress.current.en));
    en.font = Font.boldSystemFont(enSize);
    en.textColor = enColor();
    en.lineLimit = 3;
    en.minimumScaleFactor = 0.5;
  } else if (family === "accessoryInline") {
    const line = leftText(
      w.addText(progress.current.en + " - " + progress.current.ru)
    );
    line.font = Font.systemFont(enSize);
    line.textColor = enColor();
    line.lineLimit = 1;
    line.minimumScaleFactor = 0.6;
  } else {
    addWordBlock(w, progress.current, {
      enSize: enSize,
      ruSize: ruSize,
      ruAlpha: 0.92,
      accessory: accessory,
    });

    const related = findRelated(progress.current, relLimit);
    for (const r of related) {
      w.addSpacer(blockGap);
      addWordBlock(w, r, {
        enSize: enSize,
        ruSize: ruSize,
        ruAlpha: 0.8,
        accessory: accessory,
      });
    }
  }

  if (!accessory) w.addSpacer();
  return w;
}

async function showHistory(progress) {
  const entries = Object.values(progress.history).sort((a, b) =>
    (b.lastShownAt || b.firstDay || "").localeCompare(
      a.lastShownAt || a.firstDay || ""
    )
  );
  const lines = entries.slice(0, 40).map((e) => {
    const n = e.shownCount ? " x" + e.shownCount : "";
    return e.en + n + " - " + e.ru;
  });
  const a = new Alert();
  a.title = "Shown (" + entries.length + ")";
  a.message = lines.length ? lines.join("\n") : "Empty";
  a.addAction("OK");
  await a.presentAlert();
}

async function runMenu(progress) {
  const related = findRelated(progress.current, 2);
  const lines = [progress.current.en + " - " + progress.current.ru]
    .concat(related.map((r) => r.en + " - " + r.ru))
    .join("\n");

  const alert = new Alert();
  alert.title = "Word";
  alert.message =
    lines +
    "\n\nTap widget = next set\nAuto ~" +
    ROTATE_SECONDS +
    "s (iOS may delay)";

  alert.addAction("Next now");
  alert.addAction("Speak");
  alert.addAction("History");
  alert.addDestructiveAction("Reset");
  alert.addCancelAction("Close");

  const choice = await alert.presentSheet();
  if (choice === 0) {
    nextWord(progress);
  } else if (choice === 1) {
    await speakWord(progress.current.en);
  } else if (choice === 2) {
    await showHistory(progress);
  } else if (choice === 3) {
    const conf = new Alert();
    conf.title = "Reset progress?";
    conf.message = "Queue starts from the beginning.";
    conf.addDestructiveAction("Reset");
    conf.addCancelAction("Cancel");
    if ((await conf.presentAlert()) === 0) {
      saveProgress({ index: 0, current: null, shownAt: 0, history: {} });
    }
  }
}

async function runTapNext() {
  let progress = loadProgress();
  progress = nextWord(progress);
  Script.setWidget(createWidget(progress));
  closeToHome();
}

async function main() {
  if (config.runsInWidget) {
    const progress = ensureCurrentWord(loadProgress());
    Script.setWidget(createWidget(progress));
    return;
  }

  if (isTapNext()) {
    await runTapNext();
    return;
  }

  await runMenu(ensureCurrentWord(loadProgress()));
  Script.setWidget(createWidget(ensureCurrentWord(loadProgress())));
}

module.exports = { main, PASSIVE_MARKER };
