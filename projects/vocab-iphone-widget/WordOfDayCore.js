// WordOfDayCore — v19: у правил короткий смысл (meaning)
const WORDS = [{"en": "a bunch of", "ru": "куча"}, {"en": "a lot", "ru": "много"}, {"en": "abandoned", "ru": "заброшенный"}, {"en": "about to", "ru": "вот-вот, собираюсь"}, {"en": "about to end", "ru": "вот-вот закончится"}, {"en": "accept", "ru": "принять"}, {"en": "accident", "ru": "несчастный случай; авария"}, {"en": "accidentally", "ru": "случайно"}, {"en": "accompanied by", "ru": "в сопровождении"}, {"en": "accompanied by an adult", "ru": "в сопровождении взрослого"}, {"en": "achieve success", "ru": "добиться успеха"}, {"en": "across the world", "ru": "по всему миру"}, {"en": "acrylic markers", "ru": "акриловые маркеры"}, {"en": "acted like that", "ru": "повёл себя так"}, {"en": "activity", "ru": "занятие, деятельность; активность"}, {"en": "adapt", "ru": "адаптироваться"}, {"en": "addiction", "ru": "зависимость"}, {"en": "adjust my feed", "ru": "настроить ленту"}, {"en": "adjustments / corrections", "ru": "правки / исправления"}, {"en": "admit", "ru": "признать"}, {"en": "admit doing", "ru": "признать, что делал(а)"}, {"en": "adopt", "ru": "усыновить / принять"}, {"en": "affected by", "ru": "подверженный влиянию"}, {"en": "affected by trends", "ru": "под влиянием трендов"}, {"en": "afford", "ru": "позволить себе"}, {"en": "afraid", "ru": "боящийся"}, {"en": "afraid of", "ru": "бояться"}, {"en": "afraid of losing", "ru": "бояться потерять"}, {"en": "aftertaste", "ru": "послевкусие"}, {"en": "agreement", "ru": "соглашение"}, {"en": "algorithm", "ru": "алгоритм"}, {"en": "alien", "ru": "инопланетянин; чужой"}, {"en": "alien / foreigner / expat", "ru": "иностранец, экспат"}, {"en": "align with", "ru": "соответствовать"}, {"en": "already", "ru": "уже"}, {"en": "already happened", "ru": "уже случилось"}, {"en": "alumni", "ru": "выпускники"}, {"en": "amaze", "ru": "поразить"}, {"en": "among", "ru": "среди"}, {"en": "annoyed", "ru": "раздражённый"}, {"en": "annoyed by", "ru": "раздражён"}, {"en": "annual income", "ru": "годовой доход"}, {"en": "anxiety", "ru": "тревога"}, {"en": "anxious", "ru": "тревожный"}, {"en": "anyway", "ru": "в любом случае"}, {"en": "appearance", "ru": "внешний вид; появление"}, {"en": "apply for", "ru": "подавать заявку"}, {"en": "appointment", "ru": "запись, встреча"}, {"en": "appreciate", "ru": "ценить"}, {"en": "as always", "ru": "как всегда"}, {"en": "as cool as a cucumber", "ru": "спокойный как удав"}, {"en": "as usual", "ru": "как обычно"}, {"en": "ashamed", "ru": "стыдно"}, {"en": "ass is on fire", "ru": "срочность / «горят сроки»"}, {"en": "assume", "ru": "полагать"}, {"en": "assumed to be", "ru": "предполагается (что кто-то/что-то является)"}, {"en": "assumption", "ru": "предположение"}, {"en": "at a time", "ru": "за раз"}, {"en": "at least", "ru": "хотя бы, минимум"}, {"en": "at the age of", "ru": "в возрасте"}, {"en": "attempt", "ru": "попытка"}, {"en": "attempts", "ru": "попытки"}, {"en": "attitude", "ru": "отношение"}, {"en": "attitude to", "ru": "отношение к"}, {"en": "attract attention", "ru": "привлекать внимание"}, {"en": "attractive", "ru": "привлекательный"}, {"en": "automate", "ru": "автоматизировать"}, {"en": "automatically", "ru": "автоматически"}, {"en": "automation", "ru": "автоматизация"}, {"en": "avoid a situation", "ru": "избегать ситуации"}, {"en": "avoid distractions", "ru": "избегать отвлечений"}, {"en": "avoid doing", "ru": "избегать"}, {"en": "awkward", "ru": "неловкий"}, {"en": "awkward silence", "ru": "неловкая тишина"}, {"en": "babysit", "ru": "сидеть с детьми"}, {"en": "babysit / kittensitting", "ru": "сидеть с детьми / котятами"}, {"en": "bachelor", "ru": "холостяк; бакалавр"}, {"en": "back down", "ru": "отступить"}, {"en": "back in town", "ru": "снова в городе"}, {"en": "back then", "ru": "тогда, в то время"}, {"en": "back up", "ru": "поддерживать; делать резервную копию"}, {"en": "backfire", "ru": "выйти боком"}, {"en": "base form", "ru": "начальная форма глагола"}, {"en": "be exposed to", "ru": "быть подверженным; сталкиваться с"}, {"en": "be into", "ru": "увлекаться, любить"}, {"en": "be involved in", "ru": "быть вовлечённым"}, {"en": "be judged by", "ru": "быть оцениваемым по"}, {"en": "be responsible for", "ru": "быть ответственным за"}, {"en": "be surrounded by", "ru": "быть окружённым"}, {"en": "be used to", "ru": "быть привыкшим"}, {"en": "bear a child", "ru": "родить ребёнка"}, {"en": "bear weight", "ru": "нести тяжесть"}, {"en": "become aware of", "ru": "осознать"}, {"en": "bedsheets", "ru": "постельное бельё"}, {"en": "behave", "ru": "вести себя"}, {"en": "being constructed", "ru": "строится"}, {"en": "belief", "ru": "убеждение"}, {"en": "besides", "ru": "помимо"}, {"en": "besides it", "ru": "помимо этого"}, {"en": "binge-watching", "ru": "марафон сериалов"}, {"en": "blood test", "ru": "анализ крови"}, {"en": "bond", "ru": "связь"}, {"en": "boring", "ru": "скучный"}, {"en": "boring / rude / cruel", "ru": "скучный / грубый / жестокий"}, {"en": "bother", "ru": "беспокоить"}, {"en": "bottle up", "ru": "держать в себе"}, {"en": "bottled up", "ru": "держал в себе"}, {"en": "brand", "ru": "бренд"}, {"en": "breadwinner", "ru": "кормилец; кормилец семьи"}, {"en": "break down", "ru": "сорваться эмоционально; срыв"}, {"en": "break it down", "ru": "разобрать, объяснить"}, {"en": "brew coffee", "ru": "заваривать кофе"}, {"en": "brief", "ru": "краткий; брифинг, инструктаж"}, {"en": "bring people together", "ru": "объединять людей"}, {"en": "bring someone down", "ru": "подавлять, расстраивать кого-то"}, {"en": "bring success", "ru": "приносить успех"}, {"en": "bring up", "ru": "поднимать тему"}, {"en": "broaden imagination", "ru": "расширять воображение"}, {"en": "brochure", "ru": "брошюра"}, {"en": "build", "ru": "строить; создавать"}, {"en": "build trust", "ru": "строить доверие"}, {"en": "build up", "ru": "наращивать, укреплять"}, {"en": "busy with work", "ru": "занят работой"}, {"en": "busy working", "ru": "занят работой"}, {"en": "by / until", "ru": "к / до"}, {"en": "by the time", "ru": "к тому времени как"}, {"en": "calm down", "ru": "успокоиться"}, {"en": "can't help doing", "ru": "не мочь удержаться от того, чтобы; невольно делать"}, {"en": "can't stand doing", "ru": "терпеть не могу"}, {"en": "canned food", "ru": "консервы"}, {"en": "car accident", "ru": "автоавария"}, {"en": "career", "ru": "карьера"}, {"en": "carry a bag", "ru": "нести сумку"}, {"en": "carry out", "ru": "выполнять, осуществлять, реализовывать"}, {"en": "carry out a survey", "ru": "провести опрос"}, {"en": "carry-on", "ru": "ручная кладь"}, {"en": "carry-on bag", "ru": "ручная кладь"}, {"en": "catch", "ru": "ловить; уловить смысл"}, {"en": "catch meaning", "ru": "уловить смысл"}, {"en": "catch up on", "ru": "наверстать"}, {"en": "catch up on sleep", "ru": "отоспаться"}, {"en": "catch up with", "ru": "наверстать; встретиться"}, {"en": "catch up with husband", "ru": "встретиться с мужем"}, {"en": "catch up with you", "ru": "настигнуть тебя; встретиться / поболтать"}, {"en": "caught up on", "ru": "наверстал"}, {"en": "ceiling", "ru": "потолок"}, {"en": "challenge", "ru": "вызов, сложность"}, {"en": "challenge stereotypes", "ru": "бросать вызов стереотипам"}, {"en": "change your mind", "ru": "передумать"}, {"en": "change your perspective", "ru": "изменить взгляд"}, {"en": "cheapskate", "ru": "скряга"}, {"en": "check out", "ru": "посмотреть, изучить"}, {"en": "chill out", "ru": "расслабиться"}, {"en": "circumstances", "ru": "обстоятельства"}, {"en": "citizenship", "ru": "гражданство"}, {"en": "clue", "ru": "улика; подсказка; ключ к разгадке"}, {"en": "coincidence", "ru": "совпадение"}, {"en": "collaboration", "ru": "сотрудничество"}, {"en": "come across", "ru": "случайно наткнуться"}, {"en": "come across a book", "ru": "наткнуться на книгу"}, {"en": "come back", "ru": "вернуться"}, {"en": "come up with", "ru": "придумать"}, {"en": "come up with an idea", "ru": "придумать идею"}, {"en": "comfortable", "ru": "удобный (комфортный)"}, {"en": "commercial product", "ru": "коммерческий продукт"}, {"en": "commitment", "ru": "обязательство"}, {"en": "communication", "ru": "коммуникация, общение"}, {"en": "compared to", "ru": "по сравнению с"}, {"en": "complain about", "ru": "жаловаться"}, {"en": "concerns", "ru": "опасения"}, {"en": "conclude", "ru": "сделать вывод"}, {"en": "confusion", "ru": "путаница"}, {"en": "conscious", "ru": "в сознании; осознающий"}, {"en": "consciousness", "ru": "сознание"}, {"en": "consider doing", "ru": "рассматривать"}, {"en": "considered", "ru": "считается"}, {"en": "constantly", "ru": "постоянно"}, {"en": "construct", "ru": "строить"}, {"en": "construction planning", "ru": "планирование строительства"}, {"en": "contribute", "ru": "вносить вклад"}, {"en": "convenient", "ru": "удобный (время/место)"}, {"en": "coordinate", "ru": "координировать"}, {"en": "count on", "ru": "рассчитывать на"}, {"en": "count on / rely on", "ru": "рассчитывать / полагаться"}, {"en": "cozy", "ru": "уютный"}, {"en": "create", "ru": "создавать"}, {"en": "cross-functional", "ru": "кросс-функциональный"}, {"en": "crowded", "ru": "людный"}, {"en": "crowded / packed", "ru": "многолюдно / битком"}, {"en": "cruel", "ru": "жестокий"}, {"en": "current tasks", "ru": "текущие задачи"}, {"en": "currently", "ru": "в настоящее время"}, {"en": "customer", "ru": "заказчик, клиент"}, {"en": "cut back on", "ru": "сократить потребление"}, {"en": "day off", "ru": "выходной"}, {"en": "deadline", "ru": "срок, дедлайн"}, {"en": "deadline approaching", "ru": "срок приближается"}, {"en": "deal with", "ru": "справляться с, заниматься"}, {"en": "deal with a problem", "ru": "решать проблему"}, {"en": "deal with uncertainty", "ru": "справляться с неопределенностью"}, {"en": "dealing with problem", "ru": "решение проблемы"}, {"en": "debts", "ru": "долги"}, {"en": "debts catch up", "ru": "долги настигнут"}, {"en": "decision", "ru": "решение"}, {"en": "decisive", "ru": "решительный"}, {"en": "delay", "ru": "задержка"}, {"en": "delay doing", "ru": "откладывать"}, {"en": "delegate", "ru": "делегировать"}, {"en": "delicious", "ru": "вкусный"}, {"en": "deny doing", "ru": "отрицать"}, {"en": "depend on", "ru": "зависеть от"}, {"en": "depends on", "ru": "зависеть от"}, {"en": "depressive", "ru": "депрессивный"}, {"en": "designer", "ru": "проектировщик, дизайнер"}, {"en": "desire", "ru": "желание"}, {"en": "desperate", "ru": "отчаянный"}, {"en": "desperation", "ru": "отчаяние"}, {"en": "develop", "ru": "разрабатывать, развивать"}, {"en": "developer", "ru": "разработчик"}, {"en": "development", "ru": "развитие"}, {"en": "didn't last long", "ru": "длилось недолго"}, {"en": "direction", "ru": "направление"}, {"en": "discount", "ru": "скидка"}, {"en": "disgusting", "ru": "отвратительный"}, {"en": "dishwasher", "ru": "посудомойка"}, {"en": "distract", "ru": "отвлекать"}, {"en": "distracting", "ru": "отвлекающий"}, {"en": "disturbing", "ru": "тревожащий"}, {"en": "disturbing state", "ru": "тревожное состояние"}, {"en": "dive into", "ru": "погрузиться"}, {"en": "do for a living", "ru": "зарабатывать на жизнь"}, {"en": "do makeup", "ru": "делать макияж"}, {"en": "documents", "ru": "документы"}, {"en": "don't bother", "ru": "не беспокой"}, {"en": "don't bother him", "ru": "не беспокой его"}, {"en": "don’t get me wrong", "ru": "не пойми меня неправильно"}, {"en": "doubt", "ru": "сомнение"}, {"en": "drafting", "ru": "черчение"}, {"en": "drained", "ru": "выжатый"}, {"en": "draw attention", "ru": "привлекать внимание"}, {"en": "draw conclusions", "ru": "делать выводы"}, {"en": "drop by", "ru": "заглянуть"}, {"en": "dull", "ru": "скучный, унылый"}, {"en": "earn", "ru": "зарабатывать"}, {"en": "earn credibility", "ru": "завоёвывать доверие/авторитет"}, {"en": "earn money", "ru": "зарабатывать"}, {"en": "ease", "ru": "облегчать"}, {"en": "ease pain", "ru": "облегчить боль"}, {"en": "easy on me", "ru": "помягче со мной"}, {"en": "eat up", "ru": "съесть всё"}, {"en": "efficiently", "ru": "эффективно"}, {"en": "either", "ru": "тоже (в отриц.); либо"}, {"en": "either way", "ru": "так или иначе"}, {"en": "elaborate on", "ru": "подробнее объяснить"}, {"en": "emotional rollercoaster", "ru": "эмоциональные американские горки"}, {"en": "empower", "ru": "наделять полномочиями"}, {"en": "encourage", "ru": "поощрять, воодушевлять"}, {"en": "encourage to", "ru": "побуждать"}, {"en": "end up", "ru": "в итоге оказаться"}, {"en": "end up in hell", "ru": "попасть в ад"}, {"en": "ended up being", "ru": "в итоге стал"}, {"en": "endurance", "ru": "выносливость"}, {"en": "engineer", "ru": "инженер"}, {"en": "enjoy doing", "ru": "получать удовольствие от"}, {"en": "enough", "ru": "достаточно"}, {"en": "entertainment", "ru": "развлечение"}, {"en": "environment", "ru": "окружающая среда"}, {"en": "errands", "ru": "поручения"}, {"en": "even though", "ru": "хотя"}, {"en": "even worse", "ru": "ещё хуже"}, {"en": "eventually", "ru": "в конце концов"}, {"en": "ever", "ru": "когда-либо"}, {"en": "exact", "ru": "точный"}, {"en": "exactly this point", "ru": "именно этот момент"}, {"en": "excellent", "ru": "отличный"}, {"en": "except", "ru": "кроме"}, {"en": "except / but", "ru": "кроме"}, {"en": "exceptional", "ru": "исключительный"}, {"en": "excite", "ru": "волновать"}, {"en": "excited", "ru": "в восторге"}, {"en": "excuse", "ru": "оправдание; извинение"}, {"en": "exhausted", "ru": "измотанный, выдохшийся"}, {"en": "exist", "ru": "существовать"}, {"en": "existence", "ru": "существование"}, {"en": "expand vocabulary", "ru": "расширять словарь"}, {"en": "expansion", "ru": "расширение"}, {"en": "expect", "ru": "ожидать"}, {"en": "expensive enough", "ru": "достаточно дорого"}, {"en": "experience feelings", "ru": "переживать чувства"}, {"en": "expose", "ru": "подвергать / разоблачать"}, {"en": "express your opinion", "ru": "выражать свое мнение"}, {"en": "extend", "ru": "продлить"}, {"en": "extraordinary", "ru": "необычный"}, {"en": "face a challenge", "ru": "столкнуться с трудностью"}, {"en": "failure", "ru": "провал"}, {"en": "fair", "ru": "справедливый; честный"}, {"en": "fair price", "ru": "справедливая цена"}, {"en": "fairytale", "ru": "сказка"}, {"en": "fairytales", "ru": "сказки"}, {"en": "fall out", "ru": "поссориться"}, {"en": "far enough", "ru": "достаточно далеко"}, {"en": "farewell party", "ru": "прощальная вечеринка"}, {"en": "fasteners", "ru": "крепёж"}, {"en": "fear", "ru": "страх"}, {"en": "fed", "ru": "кормил (feed)"}, {"en": "fed up with", "ru": "сыт по горло"}, {"en": "feedback", "ru": "обратная связь"}, {"en": "feel dizzy", "ru": "чувствовать головокружение"}, {"en": "feel hot", "ru": "чувствовать жару"}, {"en": "feel proud of", "ru": "гордиться"}, {"en": "feel sick", "ru": "чувствовать себя плохо"}, {"en": "feel under pressure", "ru": "чувствовать давление"}, {"en": "figure", "ru": "понять; разобраться"}, {"en": "figure out", "ru": "разобраться"}, {"en": "find a solution", "ru": "находить решение"}, {"en": "find an excuse", "ru": "найти оправдание"}, {"en": "find out", "ru": "узнать"}, {"en": "finish doing", "ru": "закончить"}, {"en": "flexible", "ru": "гибкий"}, {"en": "focus on", "ru": "сосредоточиться на"}, {"en": "foggy", "ru": "туманный"}, {"en": "folks", "ru": "народ, люди"}, {"en": "follow this path", "ru": "идти этим путём"}, {"en": "for", "ru": "в течение"}, {"en": "for instance", "ru": "например"}, {"en": "for some reason", "ru": "по какой-то причине"}, {"en": "for the past month", "ru": "за последний месяц"}, {"en": "force", "ru": "заставлять"}, {"en": "force majeure", "ru": "форс-мажор"}, {"en": "force yourself", "ru": "заставлять себя"}, {"en": "forgive", "ru": "прощать"}, {"en": "form first impressions", "ru": "формировать первое впечатление"}, {"en": "freak out", "ru": "паниковать"}, {"en": "free will", "ru": "свобода воли"}, {"en": "full", "ru": "сытый; полный"}, {"en": "future in the past", "ru": "будущее в прошедшем"}, {"en": "future perfect", "ru": "будущее совершенное"}, {"en": "gain confidence", "ru": "обрести уверенность"}, {"en": "gain experience", "ru": "получать опыт"}, {"en": "gain popularity", "ru": "набирать популярность"}, {"en": "gather issues", "ru": "собрать замечания / вопросы"}, {"en": "get / become", "ru": "стать, становиться"}, {"en": "get a good deal", "ru": "заключить выгодную сделку"}, {"en": "get better", "ru": "становиться лучше"}, {"en": "get by", "ru": "сводить концы с концами"}, {"en": "get distracted", "ru": "отвлечься"}, {"en": "get dressed", "ru": "одеться"}, {"en": "get injured", "ru": "получить травму"}, {"en": "get involved in", "ru": "включиться в"}, {"en": "get lost", "ru": "потеряться"}, {"en": "get lucky", "ru": "повезти"}, {"en": "get me wrong", "ru": "неправильно понять"}, {"en": "get over", "ru": "пережить"}, {"en": "get rejected", "ru": "получить отказ"}, {"en": "get stuck", "ru": "застрять"}, {"en": "get tangled", "ru": "запутаться"}, {"en": "get tired", "ru": "уставать"}, {"en": "get used to", "ru": "привыкать"}, {"en": "getting used to", "ru": "привыкание"}, {"en": "girly", "ru": "девчачий"}, {"en": "girly thing", "ru": "девчачья штука"}, {"en": "give a chance", "ru": "дать шанс"}, {"en": "give a lift", "ru": "подвезти"}, {"en": "give an explanation", "ru": "давать объяснение"}, {"en": "give up", "ru": "бросить, сдаться"}, {"en": "go bananas", "ru": "сходить с ума"}, {"en": "go bananas / nuts / crazy", "ru": "сходить с ума"}, {"en": "go beyond responsibilities", "ru": "выйти за рамки обязанностей"}, {"en": "go crazy", "ru": "сходить с ума"}, {"en": "go crazy / bananas", "ru": "сходить с ума"}, {"en": "go nuts", "ru": "сходить с ума"}, {"en": "go on vacation", "ru": "отправиться в отпуск"}, {"en": "go through a difficult time", "ru": "переживать сложный период"}, {"en": "go through life with", "ru": "прожить жизнь с; идти по жизни вместе с"}, {"en": "god is watching", "ru": "бог видит"}, {"en": "going to", "ru": "собираться"}, {"en": "gonna", "ru": "собираюсь (разг. от going to)"}, {"en": "good at", "ru": "хорош в"}, {"en": "good enough", "ru": "достаточно хорошо"}, {"en": "good for you", "ru": "молодец"}, {"en": "gotta", "ru": "надо (разг. от have got to)"}, {"en": "gradually", "ru": "постепенно"}, {"en": "graduate", "ru": "окончить университет"}, {"en": "grey and dull", "ru": "серый и унылый"}, {"en": "gross", "ru": "противный"}, {"en": "grow apart", "ru": "отдалиться"}, {"en": "grow up", "ru": "вырасти"}, {"en": "guess", "ru": "гадать, полагать"}, {"en": "guilty", "ru": "виновный"}, {"en": "hand in", "ru": "сдавать"}, {"en": "hand over", "ru": "передать"}, {"en": "handle", "ru": "справляться"}, {"en": "hang out", "ru": "проводить время вместе"}, {"en": "hard for him", "ru": "ему было тяжело"}, {"en": "hard on yourself", "ru": "строг к себе"}, {"en": "hardly", "ru": "едва, почти не"}, {"en": "hardly notice", "ru": "едва заметить"}, {"en": "have a desire", "ru": "иметь желание"}, {"en": "have a discussion", "ru": "проводить обсуждение"}, {"en": "have a point", "ru": "быть правым, иметь смысл"}, {"en": "have an influence on", "ru": "влиять на"}, {"en": "have some rest", "ru": "отдохнуть"}, {"en": "have you ever", "ru": "ты когда-нибудь…?"}, {"en": "head back", "ru": "вернуться"}, {"en": "head out", "ru": "отправиться"}, {"en": "height", "ru": "высота"}, {"en": "help yourself", "ru": "угощайся"}, {"en": "hilarious", "ru": "уморительный"}, {"en": "hire", "ru": "нанимать"}, {"en": "hit it off", "ru": "сразу поладить"}, {"en": "hold back", "ru": "сдерживать"}, {"en": "homemade", "ru": "домашний"}, {"en": "horrible", "ru": "ужасный"}, {"en": "horrible things", "ru": "ужасные вещи"}, {"en": "horror / horrible", "ru": "ужас / ужасный"}, {"en": "hot", "ru": "горячий; жаркий; сексуально привлекательный"}, {"en": "how come", "ru": "как так?"}, {"en": "huge fan", "ru": "большой фанат"}, {"en": "I am ok with this", "ru": "меня это устраивает"}, {"en": "I can relate", "ru": "я понимаю / мне знакомо"}, {"en": "I don't like it either", "ru": "мне тоже не нравится"}, {"en": "I doubt that", "ru": "сомневаюсь"}, {"en": "I hope so", "ru": "надеюсь"}, {"en": "I know, right?", "ru": "вот именно!; да уж!"}, {"en": "I like it too", "ru": "мне тоже нравится"}, {"en": "I think so", "ru": "я так думаю"}, {"en": "I'd like not to", "ru": "я бы не хотел"}, {"en": "I'd rather", "ru": "я бы предпочёл"}, {"en": "I'm fed up", "ru": "мне надоело"}, {"en": "I'm full", "ru": "я сыт"}, {"en": "ill", "ru": "больной"}, {"en": "imagine doing", "ru": "представлять"}, {"en": "immediately", "ru": "немедленно"}, {"en": "impede", "ru": "препятствовать"}, {"en": "implement", "ru": "внедрять"}, {"en": "implementation", "ru": "внедрение"}, {"en": "impression", "ru": "впечатление"}, {"en": "improve", "ru": "улучшать"}, {"en": "improvement", "ru": "улучшение"}, {"en": "in advance", "ru": "заранее"}, {"en": "in fact", "ru": "на самом деле"}, {"en": "in good shape", "ru": "в хорошей форме"}, {"en": "in my circle", "ru": "в моём кругу"}, {"en": "in order to", "ru": "чтобы; для того чтобы"}, {"en": "in order to / to", "ru": "чтобы"}, {"en": "in the age of", "ru": "в эпоху"}, {"en": "in the morning", "ru": "утром"}, {"en": "in the shadow", "ru": "в тени"}, {"en": "in time", "ru": "вовремя (к сроку)"}, {"en": "independent", "ru": "независимый"}, {"en": "independently", "ru": "независимо"}, {"en": "informed decision", "ru": "взвешенное решение"}, {"en": "initially", "ru": "изначально"}, {"en": "insects", "ru": "насекомые"}, {"en": "instant coffee", "ru": "растворимый кофе"}, {"en": "instead", "ru": "вместо"}, {"en": "instead of", "ru": "вместо"}, {"en": "intention", "ru": "намерение"}, {"en": "interested in", "ru": "интересоваться"}, {"en": "into art", "ru": "увлекаюсь искусством"}, {"en": "invariably", "ru": "неизменно"}, {"en": "issue", "ru": "проблема, вопрос"}, {"en": "it doesn't matter", "ru": "неважно"}, {"en": "it seems", "ru": "кажется"}, {"en": "it took me", "ru": "у меня ушло"}, {"en": "it was a pleasure", "ru": "это было приятно; рад был помочь"}, {"en": "it's pleasant", "ru": "приятно"}, {"en": "i’d rather (think)", "ru": "я бы скорее"}, {"en": "jealous", "ru": "ревнивый"}, {"en": "job interview", "ru": "собеседование"}, {"en": "journaling", "ru": "ведение дневника"}, {"en": "joy", "ru": "радость"}, {"en": "just in time", "ru": "как раз вовремя"}, {"en": "keep a promise", "ru": "сдержать обещание"}, {"en": "keep doing", "ru": "продолжать"}, {"en": "keep in touch", "ru": "поддерживать связь"}, {"en": "keep it with you", "ru": "держать при себе"}, {"en": "keep silent", "ru": "молчать"}, {"en": "keep up with", "ru": "идти в ногу с"}, {"en": "keep up with trends", "ru": "следовать трендам"}, {"en": "keeps silent", "ru": "молчит"}, {"en": "killjoy", "ru": "человек, портящий настроение"}, {"en": "kinda", "ru": "вроде как"}, {"en": "lack", "ru": "нехватка; не хватать"}, {"en": "lack time", "ru": "не хватает времени"}, {"en": "lacks choices", "ru": "не хватает выбора"}, {"en": "lash extension", "ru": "наращивание ресниц"}, {"en": "lately", "ru": "в последнее время"}, {"en": "lead", "ru": "руководить"}, {"en": "lead to", "ru": "приводить к"}, {"en": "learn / find out", "ru": "узнать"}, {"en": "learn from mistakes", "ru": "учиться на ошибках"}, {"en": "leave Da Nang for HCMC", "ru": "уезжать из Дананга в Хошимин"}, {"en": "leave for", "ru": "уезжать в"}, {"en": "leave Vietnam", "ru": "уехать из Вьетнама"}, {"en": "let go of", "ru": "отпустить"}, {"en": "let someone down", "ru": "подвести кого-то"}, {"en": "likely", "ru": "вероятно"}, {"en": "likely to happen", "ru": "вероятно случится"}, {"en": "likely to move", "ru": "скорее всего перееду"}, {"en": "link between", "ru": "связующее звено между"}, {"en": "little by little", "ru": "мало-помалу"}, {"en": "long-lasting", "ru": "длительный, долговечный"}, {"en": "long-lasting impression", "ru": "неизгладимое впечатление"}, {"en": "look around", "ru": "осматривать"}, {"en": "look at", "ru": "смотреть на"}, {"en": "look forward to", "ru": "с нетерпением ждать"}, {"en": "look up", "ru": "искать (в словаре/справочнике); поднять взгляд"}, {"en": "lucky", "ru": "везучий"}, {"en": "luxurious", "ru": "роскошный"}, {"en": "make a commitment", "ru": "взять обязательство"}, {"en": "make a decision", "ru": "принять решение"}, {"en": "make a judgement", "ru": "выносить суждение"}, {"en": "make a request", "ru": "сделать запрос"}, {"en": "make a suggestion", "ru": "делать предложение"}, {"en": "make an effort", "ru": "прилагать усилия"}, {"en": "make an excuse", "ru": "оправдаться"}, {"en": "make assumptions", "ru": "делать предположения"}, {"en": "make conclusions", "ru": "делать выводы"}, {"en": "make ends meet", "ru": "сводить концы с концами"}, {"en": "make it", "ru": "справиться, добиться"}, {"en": "make it / survive", "ru": "справиться / выжить"}, {"en": "make it clear", "ru": "ясно объяснить"}, {"en": "make money", "ru": "зарабатывать деньги"}, {"en": "make preserves", "ru": "делать заготовки"}, {"en": "make progress", "ru": "добиваться прогресса"}, {"en": "make the most of", "ru": "максимально использовать"}, {"en": "make up", "ru": "макияж; мириться"}, {"en": "manage to", "ru": "суметь, успешно сделать"}, {"en": "management", "ru": "управление"}, {"en": "manager", "ru": "менеджер"}, {"en": "manually", "ru": "вручную"}, {"en": "married", "ru": "женатый / замужняя"}, {"en": "match", "ru": "совпадать; подходить"}, {"en": "maternity leave", "ru": "декретный отпуск"}, {"en": "mature", "ru": "зрелый; взрослеть"}, {"en": "meet commitments", "ru": "выполнять договорённости"}, {"en": "meet deadlines", "ru": "укладываться в сроки"}, {"en": "meet expectations", "ru": "соответствовать ожиданиям"}, {"en": "meet society's expectations", "ru": "соответствовать ожиданиям общества"}, {"en": "meet up", "ru": "встретиться"}, {"en": "mention", "ru": "упомянуть"}, {"en": "mess up", "ru": "напортачить"}, {"en": "message is sent", "ru": "сообщение отправлено"}, {"en": "mind doing", "ru": "быть не против"}, {"en": "mind-blowing", "ru": "сногсшибательный"}, {"en": "miss doing", "ru": "скучать по"}, {"en": "mistake", "ru": "ошибка"}, {"en": "misunderstanding", "ru": "недопонимание"}, {"en": "mixed feelings", "ru": "смешанные чувства"}, {"en": "money is being earned", "ru": "деньги зарабатываются"}, {"en": "monitor", "ru": "контролировать"}, {"en": "mood swings", "ru": "перепады настроения"}, {"en": "most of", "ru": "большая часть"}, {"en": "mould", "ru": "плесень"}, {"en": "move in", "ru": "въехать"}, {"en": "move out", "ru": "съехать"}, {"en": "move up", "ru": "продвигаться по карьерной лестнице"}, {"en": "movement", "ru": "движение"}, {"en": "my pleasure", "ru": "пожалуйста / «моё удовольствие»"}, {"en": "my state", "ru": "моё состояние"}, {"en": "mysterious", "ru": "загадочный"}, {"en": "nail", "ru": "ноготь"}, {"en": "nail (finger)", "ru": "ноготь"}, {"en": "nail (metal)", "ru": "гвоздь"}, {"en": "nail it", "ru": "сделать на отлично"}, {"en": "negative attitude", "ru": "негативное отношение"}, {"en": "neighborhood", "ru": "район, соседство"}, {"en": "nervous", "ru": "нервный"}, {"en": "never", "ru": "никогда"}, {"en": "never thought I would", "ru": "никогда не думал, что"}, {"en": "no doubt", "ru": "без сомнения"}, {"en": "no excuses", "ru": "без оправданий"}, {"en": "no idea / no clue", "ru": "понятия не имею"}, {"en": "no strength", "ru": "нет сил"}, {"en": "no worries", "ru": "не переживай"}, {"en": "not worth it", "ru": "не стоит того"}, {"en": "notice", "ru": "замечать"}, {"en": "obsessed with", "ru": "одержим"}, {"en": "obstacle", "ru": "препятствие"}, {"en": "obviously", "ru": "очевидно"}, {"en": "off season", "ru": "несезон"}, {"en": "ok with", "ru": "нормально относиться к"}, {"en": "on purpose", "ru": "намеренно"}, {"en": "on time", "ru": "вовремя"}, {"en": "once in my life", "ru": "однажды в жизни"}, {"en": "open up", "ru": "открыться, рассказать о чувствах"}, {"en": "open-minded", "ru": "открытый новому"}, {"en": "opportunity", "ru": "возможность"}, {"en": "optimize", "ru": "оптимизировать"}, {"en": "options", "ru": "варианты"}, {"en": "organize", "ru": "организовывать"}, {"en": "outcomes", "ru": "результаты"}, {"en": "oven", "ru": "печь"}, {"en": "overcome", "ru": "преодолеть"}, {"en": "overcome / get over", "ru": "преодолеть / пережить"}, {"en": "overcome difficulties", "ru": "преодолеть трудности"}, {"en": "overlapping deadlines", "ru": "пересекающиеся сроки"}, {"en": "overloaded", "ru": "перегруженный"}, {"en": "overwhelmed", "ru": "ошеломлённый; заваленный (делами)"}, {"en": "own up", "ru": "признаться"}, {"en": "pack up", "ru": "собрать вещи"}, {"en": "packed", "ru": "забитый"}, {"en": "packing", "ru": "собирать вещи"}, {"en": "paid maternity leave", "ru": "оплачиваемый декретный отпуск"}, {"en": "paid sick leave", "ru": "оплачиваемый больничный"}, {"en": "paid vacation", "ru": "оплачиваемый отпуск"}, {"en": "pain in the ass", "ru": "заноза в заднице"}, {"en": "participate", "ru": "участвовать"}, {"en": "partly", "ru": "частично"}, {"en": "partly cloudy", "ru": "переменная облачность"}, {"en": "partner in crime", "ru": "закадычный сообщник; напарник по шалостям"}, {"en": "passion fruit", "ru": "маракуйя"}, {"en": "passionate", "ru": "страстный"}, {"en": "passive voice", "ru": "страдательный залог"}, {"en": "past perfect", "ru": "прошедшее совершённое"}, {"en": "patience", "ru": "терпение"}, {"en": "patient", "ru": "терпеливый; пациент"}, {"en": "pay attention to", "ru": "обращать внимание"}, {"en": "pay extra", "ru": "доплатить"}, {"en": "pay off", "ru": "окупиться; выплатить"}, {"en": "pay off a loan", "ru": "погасить кредит"}, {"en": "pay off twice", "ru": "окупиться вдвойне"}, {"en": "peace and quiet", "ru": "тишина и покой"}, {"en": "peculiarity", "ru": "особенность"}, {"en": "per month", "ru": "в месяц"}, {"en": "perspective", "ru": "перспектива; точка зрения"}, {"en": "pick up", "ru": "забрать; подобрать; подхватить"}, {"en": "pills / medication", "ru": "таблетки / лекарства"}, {"en": "pissed off", "ru": "взбешён"}, {"en": "platform", "ru": "платформа"}, {"en": "pollution", "ru": "загрязнение"}, {"en": "poor", "ru": "бедный"}, {"en": "pop it", "ru": "щёлкнуть (поп-ит)"}, {"en": "pop out", "ru": "выскочить"}, {"en": "pop up", "ru": "всплыть"}, {"en": "position", "ru": "должность"}, {"en": "postpone doing", "ru": "откладывать"}, {"en": "practice doing", "ru": "практиковать"}, {"en": "prepare for", "ru": "готовиться к"}, {"en": "pressure", "ru": "давление"}, {"en": "pretend", "ru": "притворяться"}, {"en": "process", "ru": "процесс"}, {"en": "project", "ru": "проект"}, {"en": "project manager", "ru": "руководитель проекта"}, {"en": "promise", "ru": "обещать"}, {"en": "pronouns", "ru": "местоимения"}, {"en": "proposal", "ru": "предложение"}, {"en": "proudest project", "ru": "проект, которым больше всего горжусь"}, {"en": "purpose", "ru": "цель, смысл"}, {"en": "put effort", "ru": "приложить усилия"}, {"en": "put on hold", "ru": "приостановить, отложить"}, {"en": "put on music", "ru": "включить музыку"}, {"en": "queue", "ru": "очередь"}, {"en": "quiet", "ru": "тихий"}, {"en": "quit doing", "ru": "бросить"}, {"en": "quite", "ru": "довольно"}, {"en": "radical acceptance", "ru": "радикальное принятие"}, {"en": "raise awareness", "ru": "повышать осведомлённость"}, {"en": "rapidly", "ru": "быстро"}, {"en": "rare", "ru": "редкий"}, {"en": "rather rare", "ru": "довольно редко"}, {"en": "reach a goal", "ru": "достигать цели"}, {"en": "reason", "ru": "причина"}, {"en": "recently", "ru": "недавно"}, {"en": "recommend doing", "ru": "рекомендовать"}, {"en": "reconsider", "ru": "пересмотреть"}, {"en": "recount", "ru": "пересчитать"}, {"en": "redistribute", "ru": "перераспределить"}, {"en": "reduce stress", "ru": "снизить стресс"}, {"en": "refuse", "ru": "отказать"}, {"en": "refuse / reject", "ru": "отказать / отклонить"}, {"en": "regret", "ru": "сожалеть"}, {"en": "regular job", "ru": "постоянная работа"}, {"en": "reject", "ru": "отклонить"}, {"en": "relate to", "ru": "понимать, соотносить с собой"}, {"en": "relate to it", "ru": "это мне близко"}, {"en": "relatives", "ru": "родственники"}, {"en": "relevant", "ru": "релевантный"}, {"en": "rely on", "ru": "полагаться на"}, {"en": "rely on me", "ru": "положись на меня"}, {"en": "request", "ru": "запрос; запросить"}, {"en": "resonate with", "ru": "резонировать с"}, {"en": "responsibility", "ru": "ответственность"}, {"en": "rest", "ru": "отдыхать"}, {"en": "resting bitch face", "ru": "вечно недовольное лицо"}, {"en": "retreat", "ru": "ретрит; отступление"}, {"en": "return", "ru": "возвращаться"}, {"en": "rich", "ru": "богатый"}, {"en": "risk", "ru": "риск"}, {"en": "risk doing", "ru": "рискнуть"}, {"en": "role", "ru": "роль"}, {"en": "rude", "ru": "грубый"}, {"en": "run into", "ru": "случайно встретить"}, {"en": "run out of time", "ru": "закончиться (о времени); не хватить времени"}, {"en": "safe", "ru": "безопасный"}, {"en": "safety", "ru": "безопасность"}, {"en": "salary", "ru": "зарплата"}, {"en": "save money", "ru": "копить деньги"}, {"en": "save up", "ru": "откладывать"}, {"en": "scared", "ru": "испуганный"}, {"en": "scared / afraid of", "ru": "бояться"}, {"en": "scared to", "ru": "бояться сделать"}, {"en": "scene", "ru": "сцена"}, {"en": "second thoughts", "ru": "сомнения; мысли передумать"}, {"en": "second-guess", "ru": "подвергать сомнению"}, {"en": "see differently", "ru": "видеть иначе"}, {"en": "see off", "ru": "провожать"}, {"en": "self-sufficient", "ru": "самодостаточный"}, {"en": "sense", "ru": "чувство"}, {"en": "sense of community", "ru": "чувство общности"}, {"en": "sense of pride", "ru": "чувство гордости"}, {"en": "sense of relief", "ru": "чувство облегчения"}, {"en": "sensitive", "ru": "чувствительный"}, {"en": "separate", "ru": "разделять, отделять; отдельный"}, {"en": "series of books", "ru": "серия книг"}, {"en": "service fee", "ru": "плата за обслуживание"}, {"en": "set myself free", "ru": "освободить себя"}, {"en": "set out", "ru": "отправиться в путь"}, {"en": "set out for", "ru": "отправиться в"}, {"en": "set up", "ru": "создавать, организовывать, наладить, внедрять"}, {"en": "several", "ru": "несколько"}, {"en": "several times", "ru": "несколько раз"}, {"en": "shade", "ru": "тень"}, {"en": "shadow", "ru": "тень (от предмета)"}, {"en": "shock", "ru": "шокировать"}, {"en": "shocking", "ru": "шокирующий"}, {"en": "shocking moment", "ru": "шокирующий момент"}, {"en": "show off", "ru": "выпендриваться"}, {"en": "sick leave", "ru": "больничный"}, {"en": "sick of", "ru": "достало"}, {"en": "since", "ru": "с; с тех пор как; поскольку"}, {"en": "sleep in", "ru": "поспать подольше"}, {"en": "slightly", "ru": "слегка"}, {"en": "slightly unclear", "ru": "слегка неясно"}, {"en": "smart person", "ru": "умный человек"}, {"en": "smelly", "ru": "вонючий"}, {"en": "smoothly", "ru": "гладко"}, {"en": "so far", "ru": "до настоящего момента"}, {"en": "solution", "ru": "решение"}, {"en": "solution will pop up", "ru": "решение всплывёт"}, {"en": "solve", "ru": "решать"}, {"en": "solve a conflict", "ru": "решить конфликт"}, {"en": "sophomore", "ru": "студент второго курса"}, {"en": "speak volumes", "ru": "многое говорит"}, {"en": "specification", "ru": "спецификация"}, {"en": "speed up", "ru": "ускориться"}, {"en": "spend money", "ru": "тратить деньги"}, {"en": "squeezed", "ru": "сжатый"}, {"en": "stably / consistently", "ru": "стабильно"}, {"en": "stages", "ru": "этапы"}, {"en": "stand up to", "ru": "противостоять"}, {"en": "standard", "ru": "стандарт"}, {"en": "start from scratch", "ru": "начать с нуля"}, {"en": "state", "ru": "состояние"}, {"en": "state of desperation", "ru": "состояние отчаяния"}, {"en": "stay focused", "ru": "сохранять концентрацию"}, {"en": "stay up", "ru": "не ложиться спать"}, {"en": "step away", "ru": "отойти, дистанцироваться"}, {"en": "step by step", "ru": "шаг за шагом"}, {"en": "step down", "ru": "уйти с должности"}, {"en": "step outside your role", "ru": "выйти за рамки роли"}, {"en": "stick to", "ru": "придерживаться"}, {"en": "stick to a plan", "ru": "придерживаться плана"}, {"en": "stigmatized", "ru": "стигматизированный"}, {"en": "stigmatized topics", "ru": "стигматизированные темы"}, {"en": "stomach ache", "ru": "боль в животе"}, {"en": "stop over", "ru": "сделать остановку в пути"}, {"en": "stove / cooker", "ru": "плита; плитка"}, {"en": "strength", "ru": "сила"}, {"en": "strict", "ru": "строгий"}, {"en": "strip", "ru": "лишать; снимать (одежду); полоска"}, {"en": "strip power", "ru": "лишить власти"}, {"en": "submit documents", "ru": "подавать документы"}, {"en": "succeed in", "ru": "преуспеть в"}, {"en": "success", "ru": "успех"}, {"en": "successful", "ru": "успешный"}, {"en": "suddenly", "ru": "неожиданно"}, {"en": "suffer from", "ru": "страдать от"}, {"en": "suggest", "ru": "предлагать"}, {"en": "suggest doing", "ru": "предлагать (что-то делать)"}, {"en": "support", "ru": "поддерживать"}, {"en": "suppose", "ru": "предполагать"}, {"en": "surprise", "ru": "удивить"}, {"en": "surprisingly", "ru": "удивительно"}, {"en": "surround", "ru": "окружать"}, {"en": "surrounded by", "ru": "окружён"}, {"en": "surroundings", "ru": "окружение"}, {"en": "survive", "ru": "выжить"}, {"en": "swap", "ru": "обмениваться; обмен"}, {"en": "switch off", "ru": "выключить"}, {"en": "switch on", "ru": "включать"}, {"en": "system", "ru": "система"}, {"en": "take a break", "ru": "сделать перерыв"}, {"en": "take a chance", "ru": "рискнуть"}, {"en": "take action", "ru": "принять меры"}, {"en": "take control of", "ru": "взять под контроль"}, {"en": "take into account", "ru": "учитывать"}, {"en": "take it easy", "ru": "не переживать, относиться спокойно"}, {"en": "take on", "ru": "брать на себя (новую роль/обязанности)"}, {"en": "take over", "ru": "перенимать, возглавлять"}, {"en": "take part", "ru": "участвовать"}, {"en": "take pictures", "ru": "фотографировать"}, {"en": "take place", "ru": "проходить / происходить"}, {"en": "take responsibility", "ru": "брать ответственность"}, {"en": "take seriously", "ru": "воспринимать серьезно"}, {"en": "take the piss", "ru": "стебаться"}, {"en": "takes a long time", "ru": "занимает много времени"}, {"en": "talk over", "ru": "обсудить"}, {"en": "target audience", "ru": "целевая аудитория"}, {"en": "tasteless", "ru": "безвкусный"}, {"en": "team", "ru": "команда"}, {"en": "tell me about yourself", "ru": "расскажите о себе"}, {"en": "tend to", "ru": "быть склонным"}, {"en": "tend to think", "ru": "склонен думать"}, {"en": "that's what I need", "ru": "вот что мне нужно"}, {"en": "the globe is round", "ru": "земля круглая"}, {"en": "the other day", "ru": "на днях"}, {"en": "the thing is", "ru": "дело в том"}, {"en": "the way she was treated", "ru": "то, как с ней обращались"}, {"en": "these / those", "ru": "эти / те"}, {"en": "thick paper", "ru": "плотная бумага"}, {"en": "this / that", "ru": "это / то"}, {"en": "thought escapes me", "ru": "мысль ускользает"}, {"en": "throw a party", "ru": "устроить вечеринку"}, {"en": "throw away", "ru": "выбрасывать"}, {"en": "tired of", "ru": "уставший от"}, {"en": "to accept", "ru": "принять"}, {"en": "to adjust", "ru": "скорректировать, подогнать, адаптировать"}, {"en": "to admit", "ru": "признать"}, {"en": "to allow", "ru": "позволять"}, {"en": "to amaze", "ru": "поражать"}, {"en": "to backfire", "ru": "выйти боком"}, {"en": "to be familiar with", "ru": "быть знакомым с чем-то"}, {"en": "to be late", "ru": "опоздать"}, {"en": "to bear", "ru": "вынашивать; нести"}, {"en": "to boost", "ru": "усилить"}, {"en": "to boost workflow", "ru": "ускорить рабочий процесс"}, {"en": "to carry", "ru": "носить"}, {"en": "to conclude", "ru": "заключить, сделать вывод"}, {"en": "to consider", "ru": "рассматривать, считать, подумать"}, {"en": "to consume", "ru": "потреблять"}, {"en": "to end up", "ru": "в итоге оказаться"}, {"en": "to entertain", "ru": "развлекать"}, {"en": "to excite", "ru": "волновать, возбуждать"}, {"en": "to exist", "ru": "существовать"}, {"en": "to expand", "ru": "расширять"}, {"en": "to expect", "ru": "ожидать"}, {"en": "to extend", "ru": "удлинить, продлить"}, {"en": "to force", "ru": "заставлять силой"}, {"en": "to forgive", "ru": "простить"}, {"en": "to hurry", "ru": "спешить"}, {"en": "to increase", "ru": "повысить"}, {"en": "to mature", "ru": "взрослеть"}, {"en": "to mention", "ru": "упоминать"}, {"en": "to nag", "ru": "пилить, ворчать, доставать"}, {"en": "to pretend", "ru": "делать вид"}, {"en": "to promote", "ru": "продвигать"}, {"en": "to reschedule", "ru": "перенести"}, {"en": "to schedule", "ru": "планировать"}, {"en": "to shock", "ru": "шокировать"}, {"en": "to struggle with", "ru": "испытывать трудности с"}, {"en": "to sweat", "ru": "потеть"}, {"en": "to treat equally", "ru": "обращаться одинаково"}, {"en": "to unwind", "ru": "расслабиться"}, {"en": "to value / appreciate", "ru": "ценить"}, {"en": "traffic", "ru": "дорожное движение"}, {"en": "trainer", "ru": "тренер"}, {"en": "travel", "ru": "путешествовать"}, {"en": "treat like a queen", "ru": "относиться как к королеве"}, {"en": "treat well", "ru": "хорошо относиться"}, {"en": "treatment", "ru": "лечение, уход"}, {"en": "trends won't last", "ru": "тренды не продлятся"}, {"en": "triggered", "ru": "задетый, триггернутый"}, {"en": "triggered by", "ru": "задетый чем-то"}, {"en": "triggering", "ru": "триггерящий"}, {"en": "trust in anyone", "ru": "доверять кому бы то ни было"}, {"en": "trust in yourself", "ru": "верить в себя"}, {"en": "turn down", "ru": "отклонять, отказываться"}, {"en": "turn on", "ru": "включать"}, {"en": "turn out", "ru": "оказаться"}, {"en": "turn out well", "ru": "хорошо обернуться"}, {"en": "turned out to be", "ru": "оказался"}, {"en": "twice as much", "ru": "в два раза больше"}, {"en": "two ways to act", "ru": "два способа действовать"}, {"en": "UFO", "ru": "НЛО"}, {"en": "unclear", "ru": "неясный"}, {"en": "unconscious", "ru": "бессознательный"}, {"en": "under pressure", "ru": "под давлением"}, {"en": "unfair", "ru": "несправедливый"}, {"en": "unflavoured", "ru": "без ароматизаторов, натуральный (без вкуса)"}, {"en": "unnecessary", "ru": "ненужный"}, {"en": "uplifted", "ru": "окрылённый"}, {"en": "used to", "ru": "раньше (делал)"}, {"en": "user", "ru": "пользователь"}, {"en": "UTC", "ru": "часовой пояс UTC"}, {"en": "vague", "ru": "смутный, туманный"}, {"en": "valuable", "ru": "ценный"}, {"en": "valuable lesson", "ru": "ценный урок"}, {"en": "value / appreciate", "ru": "ценить"}, {"en": "value for money", "ru": "соотношение цены и качества"}, {"en": "values", "ru": "ценности"}, {"en": "visarun", "ru": "визаран"}, {"en": "vocation / vacation", "ru": "призвание / отпуск"}, {"en": "volume", "ru": "том; громкость"}, {"en": "volumes", "ru": "тома"}, {"en": "wage", "ru": "зарплата, ставка (оплата труда)"}, {"en": "wage / salary / income", "ru": "ставка / зарплата / доход"}, {"en": "want more", "ru": "хотеть большего"}, {"en": "warm up", "ru": "разминаться"}, {"en": "waste energy", "ru": "тратить энергию зря"}, {"en": "waste money", "ru": "транжирить деньги"}, {"en": "waste time", "ru": "тратить время зря"}, {"en": "watch", "ru": "смотреть; наблюдать; часы"}, {"en": "watercolors", "ru": "акварель"}, {"en": "we'll see", "ru": "посмотрим"}, {"en": "weights", "ru": "гантели, веса"}, {"en": "what is it like", "ru": "каково это"}, {"en": "where do you see yourself", "ru": "где вы видите себя"}, {"en": "why should we hire you", "ru": "почему мы должны вас нанять"}, {"en": "willing to", "ru": "готовый"}, {"en": "willpower", "ru": "сила воли"}, {"en": "wise", "ru": "мудрый"}, {"en": "within", "ru": "в течение"}, {"en": "within a year", "ru": "в течение года"}, {"en": "without a purpose", "ru": "без цели"}, {"en": "won't bring joy", "ru": "не принесёт радости"}, {"en": "word-of-mouth", "ru": "сарафанное радио"}, {"en": "work out", "ru": "получиться; сработать; тренироваться"}, {"en": "workflow", "ru": "рабочий процесс"}, {"en": "workload", "ru": "загрузка, объём работы"}, {"en": "workload reduction", "ru": "снижение нагрузки"}, {"en": "worth it", "ru": "стоит того"}, {"en": "wrap up", "ru": "завершить; упаковать"}, {"en": "write down", "ru": "записать"}, {"en": "yet", "ru": "еще (в вопросах и отрицаниях)"}, {"en": "you will nail it", "ru": "у тебя получится"}, {"en": "youth", "ru": "молодёжь; юность"}];
const RULES = [{"id": "t01", "title": "Present Simple", "meaning": "привычка, факт, распорядок", "formula": "V1 / Vs · do/does", "tip": "I work from cafés every day"}, {"id": "t02", "title": "Present Continuous", "meaning": "сейчас / временно", "formula": "am/is/are + Ving", "tip": "I’m learning English now"}, {"id": "t03", "title": "Pr. Simple vs Continuous", "meaning": "обычно vs прямо сейчас", "formula": "usually vs now", "tip": "I live here · I’m staying at a hotel"}, {"id": "t04", "title": "Past Simple", "meaning": "законченное действие в прошлом", "formula": "V2 / did + V1", "tip": "We left Russia in 2022"}, {"id": "t05", "title": "Past Simple ? / −", "meaning": "вопрос и отрицание в прошлом", "formula": "Did you V1? · didn’t V1", "tip": "Did you book the flight? — No, I didn’t"}, {"id": "t06", "title": "Present Perfect", "meaning": "опыт / результат важен сейчас", "formula": "have/has + V3", "tip": "Have you ever tried pho?"}, {"id": "t07", "title": "Present Perfect смысл", "meaning": "сделал — когда неважно", "formula": "experience / result now", "tip": "I’ve already paid the rent"}, {"id": "t08", "title": "PP vs Past Simple", "meaning": "PP без when · PS с when", "formula": "PP: no time · PS: when", "tip": "I’ve been to Vietnam · I went last year"}, {"id": "t09", "title": "Present Perfect Cont.", "meaning": "действие длится / только что длилось", "formula": "have/has been + Ving", "tip": "I’ve been studying all morning"}, {"id": "t10", "title": "PP vs PPC", "meaning": "результат vs сам процесс", "formula": "result vs activity", "tip": "I’ve written it · I’ve been writing"}, {"id": "s01", "title": "PP markers", "meaning": "слова-маркеры Present Perfect", "formula": "never/ever · since/for", "tip": "I’ve lived here since 2022"}, {"id": "s02", "title": "Past Simple markers", "meaning": "слова-маркеры Past Simple", "formula": "yesterday · last · ago", "tip": "I bought tickets yesterday"}, {"id": "f01", "title": "Future will", "meaning": "решение / мнение / обещание", "formula": "will + V1", "tip": "I’ll help you with the form"}, {"id": "f02", "title": "be going to", "meaning": "план или очевидный исход", "formula": "am/is/are going to + V1", "tip": "I’m going to move next month"}, {"id": "f03", "title": "Present Cont. = future", "meaning": "договорённость в календаре", "formula": "am/is/are + Ving", "tip": "I’m meeting a friend tomorrow"}, {"id": "f04", "title": "Present Simple = future", "meaning": "расписание (поезд, рейс)", "formula": "V1 / Vs", "tip": "The flight leaves at 9 am"}, {"id": "u01", "title": "used to", "meaning": "раньше делал, сейчас нет", "formula": "used to + V1", "tip": "I used to play basketball"}, {"id": "u02", "title": "didn’t use to", "meaning": "раньше обычно не делал", "formula": "didn’t use to + V1", "tip": "I didn’t use to speak up at work"}, {"id": "u03", "title": "be used to", "meaning": "уже привык к чему-то", "formula": "be used to + Ving/noun", "tip": "I’m used to waking up early"}, {"id": "u04", "title": "get used to", "meaning": "привыкаю / привыкну", "formula": "get used to + Ving/noun", "tip": "I’m getting used to the heat"}, {"id": "m01", "title": "must / have to", "meaning": "обязанность, надо", "formula": "must · have to + V1", "tip": "I have to renew my visa"}, {"id": "m02", "title": "should", "meaning": "совет: лучше сделать", "formula": "should + V1", "tip": "You should keep in touch"}, {"id": "m03", "title": "should have", "meaning": "надо было — но не сделал", "formula": "should have + V3", "tip": "I should have left earlier"}, {"id": "m04", "title": "must have", "meaning": "наверное так и было", "formula": "must have + V3", "tip": "He must have missed the bus"}, {"id": "m05", "title": "could have", "meaning": "мог сделать — но не сделал", "formula": "could have + V3", "tip": "We could have taken a taxi"}, {"id": "m06", "title": "would have", "meaning": "сделал бы в прошлом — но нет", "formula": "would have + V3", "tip": "I would have called if I had known"}, {"id": "g01", "title": "verb + gerund", "meaning": "после глагола — Ving", "formula": "enjoy/avoid/keep + Ving", "tip": "I enjoy learning new skills"}, {"id": "g02", "title": "verb + to-inf", "meaning": "после глагола — to V", "formula": "decide/hope/want + to V", "tip": "She decided to take a chance"}, {"id": "g03", "title": "stop doing / to do", "meaning": "бросить привычку vs остановиться чтобы", "formula": "stop + Ving vs to V", "tip": "I stopped smoking · stopped to buy coffee"}, {"id": "g04", "title": "forget / remember", "meaning": "память о прошлом vs не забыть сделать", "formula": "Ving = past · to V = future", "tip": "I remember meeting her · Remember to call"}, {"id": "c00", "title": "Zero Conditional", "meaning": "всегда правда: если → то", "formula": "if + Present, Present", "tip": "If you heat water, it boils"}, {"id": "c01", "title": "1st Conditional", "meaning": "реальный будущий исход", "formula": "if + Present, will + V1", "tip": "If it rains, we’ll stay home"}, {"id": "c02", "title": "2nd Conditional", "meaning": "нереально сейчас / в будущем", "formula": "if + Past, would + V1", "tip": "If I had more time, I’d travel more"}, {"id": "c03", "title": "3rd Conditional", "meaning": "нереально в прошлом", "formula": "if + Past Perfect, would have + V3", "tip": "If I had studied, I would have passed"}, {"id": "c04", "title": "if vs when", "meaning": "if = может быть · when = точно", "formula": "if = maybe · when = sure", "tip": "When I get home, I’ll text you"}, {"id": "a01", "title": "a / an", "meaning": "один / любой (впервые)", "formula": "a + согласный · an + гласный", "tip": "a visa · an hour · an apple"}, {"id": "a02", "title": "the", "meaning": "конкретное / уже известное", "formula": "the = known / unique", "tip": "the sun · the job we discussed"}, {"id": "a03", "title": "no article", "meaning": "вообще / как класс вещей", "formula": "без a/an/the", "tip": "Life is hard · Cats sleep a lot"}, {"id": "r01", "title": "who / which / that", "meaning": "who люди · which вещи", "formula": "who / which / that", "tip": "the friend who helped me"}, {"id": "r02", "title": "where", "meaning": "относительное «где»", "formula": "where = place", "tip": "the city where I live"}, {"id": "p01", "title": "to vs for", "meaning": "to + глагол · for + сущ./Ving", "formula": "to + V · for + noun/Ving", "tip": "I came to learn · a book for learning"}, {"id": "p02", "title": "in / on / at (time)", "meaning": "предлоги времени", "formula": "at 5 · on Monday · in July", "tip": "at night · in the morning"}, {"id": "pc1", "title": "Past Continuous", "meaning": "был в процессе в тот момент", "formula": "was/were + Ving", "tip": "I was cooking when she called"}, {"id": "pc2", "title": "PC + Past Simple", "meaning": "фон + короткое событие", "formula": "was Ving when + V2", "tip": "I was working when the power went out"}];

const STORE_NAME = "vocab-progress.json";
const SCRIPT_NAME = "WordOfDay";
const ROTATE_SECONDS = 10;
const PASSIVE_MARKER = "PASSIVE_WIDGET_V19";
const RELATED_LIMIT = 2;
const VOCAB_SIZE = 938; // для проверки полной загрузки
const RULES_COUNT = 44;
const WORD_SETS_PER_RULE = 4; // 4 набора слов → 1 правило

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

function emptyProgress() {
  return {
    order: [],
    pos: 0,
    pass: 1,
    ruleOrder: [],
    rulePos: 0,
    wordsSinceRule: 0,
    kind: "words",
    rule: null,
    current: null,
    set: [],
    shownAt: 0,
    history: {},
  };
}

function loadProgress() {
  const fm = FileManager.local();
  const path = getStorePath();
  if (!fm.fileExists(path)) return emptyProgress();
  try {
    const data = JSON.parse(fm.readString(path));
    if (typeof data.shownAt !== "number") data.shownAt = 0;
    if (!data.history) data.history = {};
    if (!Array.isArray(data.set)) data.set = [];
    if (!Array.isArray(data.order)) data.order = [];
    if (!Array.isArray(data.ruleOrder)) data.ruleOrder = [];
    if (typeof data.pos !== "number") data.pos = 0;
    if (typeof data.pass !== "number") data.pass = 1;
    if (typeof data.rulePos !== "number") data.rulePos = 0;
    if (typeof data.wordsSinceRule !== "number") data.wordsSinceRule = 0;
    if (data.kind !== "rule" && data.kind !== "words") data.kind = "words";
    if (!data.rule) data.rule = null;
    return data;
  } catch (e) {
    return emptyProgress();
  }
}

function saveProgress(data) {
  const fm = FileManager.local();
  fm.writeString(getStorePath(), JSON.stringify(data));
}

function wordKey(w) {
  return String((w && w.en) || "").toLowerCase().trim();
}

function asSetItem(w, idx) {
  return { en: w.en, ru: w.ru, index: idx };
}

function recordHistory(progress, word) {
  const day = todayKey();
  const key = wordKey(word);
  if (!key) return;
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
}

/** Новая перемешанная очередь на полный круг по всем словам. */
function shuffleIndices(n) {
  const order = [];
  for (let i = 0; i < n; i++) order.push(i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = order[i];
    order[i] = order[j];
    order[j] = tmp;
  }
  return order;
}

function reshuffleOrder(progress) {
  progress.order = shuffleIndices(WORDS.length);
  progress.pos = 0;
}

function reshuffleRules(progress) {
  progress.ruleOrder = shuffleIndices(RULES.length);
  progress.rulePos = 0;
}

function ensureOrder(progress) {
  const n = WORDS.length;
  if (
    Array.isArray(progress.order) &&
    progress.order.length === n &&
    typeof progress.pos === "number" &&
    progress.pos >= 0 &&
    progress.pos <= n
  ) {
    return;
  }
  reshuffleOrder(progress);
  if (typeof progress.pass !== "number" || progress.pass < 1) {
    progress.pass = 1;
  }
}

function ensureRuleOrder(progress) {
  const n = RULES.length;
  if (
    Array.isArray(progress.ruleOrder) &&
    progress.ruleOrder.length === n &&
    typeof progress.rulePos === "number" &&
    progress.rulePos >= 0 &&
    progress.rulePos <= n
  ) {
    return;
  }
  reshuffleRules(progress);
}

function setSizeForFamily() {
  return 1 + RELATED_LIMIT;
}

function nextWordSet(progress) {
  ensureOrder(progress);
  const size = setSizeForFamily();
  const n = WORDS.length;

  if (progress.pos + size > progress.order.length) {
    reshuffleOrder(progress);
    progress.pass = (typeof progress.pass === "number" ? progress.pass : 1) + 1;
  }

  const set = [];
  for (let k = 0; k < size; k++) {
    const idx = progress.order[progress.pos];
    progress.pos += 1;
    const item = asSetItem(WORDS[idx], idx);
    set.push(item);
    recordHistory(progress, item);
  }

  progress.kind = "words";
  progress.rule = null;
  progress.current = set[0];
  progress.set = set;
  progress.wordsSinceRule = (progress.wordsSinceRule || 0) + 1;
  progress.shownAt = nowMs();
  if (progress.pos > n) progress.pos = n;
  return progress;
}

function nextRuleCard(progress) {
  ensureRuleOrder(progress);
  if (progress.rulePos >= progress.ruleOrder.length) {
    reshuffleRules(progress);
  }
  const idx = progress.ruleOrder[progress.rulePos];
  progress.rulePos += 1;
  const rule = RULES[idx];
  progress.kind = "rule";
  progress.rule = {
    id: rule.id,
    title: rule.title,
    meaning: rule.meaning || "",
    formula: rule.formula,
    tip: rule.tip,
  };
  progress.current = { en: rule.title, ru: rule.formula, index: -1 };
  progress.set = [];
  progress.wordsSinceRule = 0;
  progress.shownAt = nowMs();
  return progress;
}

/**
 * Карусель: 4 набора слов → 1 правило → снова слова.
 * Слова — полный проход без повторов; правила — свой shuffle.
 */
function nextWord(progress) {
  ensureOrder(progress);
  ensureRuleOrder(progress);
  if ((progress.wordsSinceRule || 0) >= WORD_SETS_PER_RULE) {
    nextRuleCard(progress);
  } else {
    nextWordSet(progress);
  }
  saveProgress(progress);
  return progress;
}

function hasCard(progress) {
  if (progress.kind === "rule") return !!(progress.rule && progress.rule.title);
  return !!(progress.current && progress.set && progress.set.length);
}

function needsRotate(progress) {
  if (!hasCard(progress)) return true;
  if (!progress.shownAt) return true;
  return nowMs() - progress.shownAt >= rotateMs();
}

function ensureCurrentWord(progress) {
  if (needsRotate(progress)) return nextWord(progress);
  ensureOrder(progress);
  ensureRuleOrder(progress);
  return progress;
}

function currentSet(progress, limit) {
  if (progress.kind === "rule") return [];
  const size = typeof limit === "number" ? limit : setSizeForFamily();
  if (progress.set && progress.set.length) {
    return progress.set.slice(0, size);
  }
  if (!progress.current) return [];
  return [progress.current];
}

function passStats(progress) {
  const n = WORDS.length || VOCAB_SIZE;
  const pos = typeof progress.pos === "number" ? progress.pos : 0;
  const unique = progress.history ? Object.keys(progress.history).length : 0;
  const pass = typeof progress.pass === "number" ? progress.pass : 1;
  const since = typeof progress.wordsSinceRule === "number" ? progress.wordsSinceRule : 0;
  const rpos = typeof progress.rulePos === "number" ? progress.rulePos : 0;
  return {
    n: n,
    pos: pos,
    unique: unique,
    pass: pass,
    since: since,
    rules: RULES.length || RULES_COUNT,
    rpos: rpos,
  };
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

function findRelated(current, limit, exclude) {
  limit = limit || RELATED_LIMIT;
  if (!current || limit <= 0) return [];
  const banned = exclude || {};
  const curEn = wordKey(current);
  const enToks = tokensEn(current.en);
  const ruToks = tokensRu(current.ru);
  const enSet = {};
  for (const t of enToks) enSet[t] = 1;
  const ruSet = {};
  for (const t of ruToks) ruSet[t] = 1;

  const scored = [];
  for (let i = 0; i < WORDS.length; i++) {
    const w = WORDS[i];
    const oEn = wordKey(w);
    if (!oEn || oEn === curEn || banned[oEn]) continue;

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
    const k = wordKey(item.w);
    if (seen[k] || banned[k]) continue;
    seen[k] = 1;
    out.push(asSetItem(item.w, item.i));
  }

  // соседи только если не из banned (прошлый/текущий набор)
  if (out.length < limit && typeof current.index === "number") {
    const around = [1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6];
    for (const d of around) {
      if (out.length >= limit) break;
      let j = current.index + d;
      if (j < 0 || j >= WORDS.length) continue;
      const w = WORDS[j];
      const k = wordKey(w);
      if (!k || k === curEn || seen[k] || banned[k]) continue;
      seen[k] = 1;
      out.push(asSetItem(w, j));
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
    // fallback чуть шире — лучше перенести, чем обрезать «…»
    return s.length * fontSize * (bold ? 0.56 : 0.5);
  }
}

/** Перенос раньше, чем стек начнёт резать текст многоточием. */
function needsWrap(word, enSize, ruSize) {
  const max = contentWidth();
  const line =
    measureTextWidth(word.en, enSize, true) +
    measureTextWidth(" - ", ruSize, false) +
    measureTextWidth(word.ru, ruSize, false);
  // 12% запас: горизонтальный стек с lineLimit=1 иначе обрезает
  return line > max * 0.88;
}

function addRuleBlock(w, rule, opts) {
  const titleSize = opts.titleSize;
  const bodySize = opts.bodySize;
  const accessory = !!opts.accessory;
  const scale = accessory ? 0.65 : 0.85;
  // 4 строки: название → смысл → формула → пример
  const meaningSize = accessory ? Math.max(10, bodySize - 1) : Math.max(13, bodySize - 1);
  const tipSize = Math.max(11, bodySize - 2);

  const title = leftText(w.addText(rule.title));
  title.font = Font.boldSystemFont(titleSize);
  title.textColor = enColor();
  title.lineLimit = 2;
  title.minimumScaleFactor = scale;
  if (!accessory) addShadow(title, 0.5);

  if (rule.meaning) {
    w.addSpacer(accessory ? 1 : 3);
    const meaning = leftText(w.addText(rule.meaning));
    meaning.font = Font.systemFont(meaningSize);
    meaning.textColor = ruColor(0.95);
    meaning.lineLimit = accessory ? 2 : 2;
    meaning.minimumScaleFactor = scale;
    if (!accessory) addShadow(meaning, 0.4);
  }

  w.addSpacer(accessory ? 1 : 3);
  const formula = leftText(w.addText(rule.formula));
  formula.font = Font.systemFont(bodySize);
  formula.textColor = ruColor(0.8);
  formula.lineLimit = 2;
  formula.minimumScaleFactor = scale;
  if (!accessory) addShadow(formula, 0.35);

  if (rule.tip) {
    w.addSpacer(accessory ? 1 : 2);
    const tip = leftText(w.addText(rule.tip));
    tip.font = Font.systemFont(tipSize);
    tip.textColor = ruColor(0.68);
    tip.lineLimit = accessory ? 2 : 2;
    tip.minimumScaleFactor = scale;
    if (!accessory) addShadow(tip, 0.3);
  }
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
  // EN не сжимаем; RU при переносе может чуть уменьшиться, но не обрезается
  const enScale = 1;
  const ruScale = accessory ? 0.7 : 0.85;

  if (wrap) {
    const en = leftText(w.addText(word.en));
    en.font = Font.boldSystemFont(enSize);
    en.textColor = enColor();
    en.lineLimit = accessory ? 2 : 3;
    en.minimumScaleFactor = enScale;
    if (!accessory) addShadow(en, 0.5);

    w.addSpacer(2);
    const ru = leftText(w.addText(word.ru));
    ru.font = Font.systemFont(ruSize);
    ru.textColor = ruColor(ruAlpha);
    ru.lineLimit = accessory ? 3 : 4;
    ru.minimumScaleFactor = ruScale;
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
  en.minimumScaleFactor = enScale;
  if (!accessory) addShadow(en, 0.5);

  const sep = leftText(row.addText(" - "));
  sep.font = Font.systemFont(ruSize);
  sep.textColor = ruColor(0.7);
  sep.minimumScaleFactor = 1;
  if (!accessory) addShadow(sep, 0.35);

  const ru = leftText(row.addText(word.ru));
  ru.font = Font.systemFont(ruSize);
  ru.textColor = ruColor(ruAlpha);
  ru.lineLimit = 1;
  ru.minimumScaleFactor = 1;
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
  } else if (progress.kind === "rule") {
    // 4 строки правила: чуть плотнее по вертикали
    w.setPadding(10, 16, 10, 16);
  } else {
    w.setPadding(14, 16, 14, 16);
  }
  w.refreshAfterDate = nextRefreshDate();
  // тап → Scriptable меняет набор и закрывается обратно на экран
  w.url = tapNextUrl();

  let enSize = progress.kind === "rule" ? 18 : 20;
  let ruSize = progress.kind === "rule" ? 15 : 17;
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

  if (progress.kind === "rule" && progress.rule) {
    const rule = progress.rule;
    if (family === "accessoryCircular") {
      const t = leftText(w.addText(rule.title));
      t.font = Font.boldSystemFont(enSize);
      t.textColor = enColor();
      t.lineLimit = 3;
      t.minimumScaleFactor = 0.45;
    } else if (family === "accessoryInline") {
      const line = leftText(
        w.addText(
          rule.title +
            " — " +
            (rule.meaning || rule.formula)
        )
      );
      line.font = Font.systemFont(enSize);
      line.textColor = enColor();
      line.lineLimit = 1;
      line.minimumScaleFactor = 0.55;
    } else {
      addRuleBlock(w, rule, {
        titleSize: enSize,
        bodySize: ruSize,
        accessory: accessory,
      });
    }
  } else {
    const set = currentSet(progress, 1 + relLimit);
    const main = set[0] || progress.current;
    const related = set.slice(1);

    if (family === "accessoryCircular") {
      const en = leftText(w.addText(main.en));
      en.font = Font.boldSystemFont(enSize);
      en.textColor = enColor();
      en.lineLimit = 3;
      en.minimumScaleFactor = 0.5;
    } else if (family === "accessoryInline") {
      const line = leftText(w.addText(main.en + " - " + main.ru));
      line.font = Font.systemFont(enSize);
      line.textColor = enColor();
      line.lineLimit = 1;
      line.minimumScaleFactor = 0.6;
    } else {
      addWordBlock(w, main, {
        enSize: enSize,
        ruSize: ruSize,
        ruAlpha: 0.92,
        accessory: accessory,
      });

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
  const st = passStats(progress);
  let lines = "";
  if (progress.kind === "rule" && progress.rule) {
    lines =
      progress.rule.title +
      "\n" +
      (progress.rule.meaning || "") +
      "\n" +
      progress.rule.formula +
      "\n" +
      (progress.rule.tip || "");
  } else {
    lines = currentSet(progress, 1 + RELATED_LIMIT)
      .map((w) => w.en + " - " + w.ru)
      .join("\n");
  }

  const alert = new Alert();
  alert.title = progress.kind === "rule" ? "Rule" : "Word";
  alert.message =
    lines +
    "\n\n" +
    st.pos +
    "/" +
    st.n +
    " words · pass #" +
    st.pass +
    "\nrules " +
    st.rpos +
    "/" +
    st.rules +
    " · mix " +
    st.since +
    "/" +
    WORD_SETS_PER_RULE +
    "\nTap = next (4 word sets → 1 rule)";

  alert.addAction("Next now");
  alert.addAction("Speak");
  alert.addAction("History");
  alert.addDestructiveAction("Reset");
  alert.addCancelAction("Close");

  const choice = await alert.presentSheet();
  if (choice === 0) {
    nextWord(progress);
  } else if (choice === 1) {
    const speak =
      progress.kind === "rule" && progress.rule
        ? progress.rule.title
        : progress.current && progress.current.en;
    if (speak) await speakWord(speak);
  } else if (choice === 2) {
    await showHistory(progress);
  } else if (choice === 3) {
    const conf = new Alert();
    conf.title = "Reset progress?";
    conf.message = "Queue starts from the beginning.";
    conf.addDestructiveAction("Reset");
    conf.addCancelAction("Cancel");
    if ((await conf.presentAlert()) === 0) {
      saveProgress(emptyProgress());
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

module.exports = { main, PASSIVE_MARKER, VOCAB_SIZE, RULES_COUNT };
