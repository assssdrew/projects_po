// WordOfDayCore — v41: interview — весь текст, без обрезки, по высоте виджета
const WORDS = [{"en":"a bunch of","ru":"куча","ex":"I bought a bunch of fresh bananas.","exRu":"Я купил кучу свежих бананов."},{"en":"a lot","ru":"много","ex":"We laughed a lot on the way home.","exRu":"По дороге домой мы много смеялись."},{"en":"abandoned","ru":"заброшенный","ex":"We found an abandoned house nearby.","exRu":"Неподалёку мы нашли заброшенный дом."},{"en":"about to","ru":"вот-вот, собираюсь","ex":"The train is about to leave.","exRu":"Поезд вот-вот отправится."},{"en":"about to end","ru":"вот-вот закончится","ex":"Our meeting is about to end.","exRu":"Наша встреча вот-вот закончится."},{"en":"accept","ru":"принять","ex":"She chose to accept the new role.","exRu":"Она решила принять новую должность."},{"en":"accident","ru":"несчастный случай; авария","ex":"Nobody was hurt in the accident.","exRu":"В аварии никто не пострадал."},{"en":"accidentally","ru":"случайно","ex":"I accidentally deleted the email.","exRu":"Я случайно удалил письмо."},{"en":"accompanied by","ru":"в сопровождении","ex":"The meal was accompanied by salad.","exRu":"К блюду подали салат."},{"en":"accompanied by an adult","ru":"в сопровождении взрослого","ex":"Children must be accompanied by an adult.","exRu":"Дети должны быть в сопровождении взрослого."},{"en":"achieve success","ru":"добиться успеха","ex":"Patience can help you achieve success.","exRu":"Терпение поможет тебе добиться успеха."},{"en":"across the world","ru":"по всему миру","ex":"They have friends across the world.","exRu":"У них есть друзья по всему миру."},{"en":"acrylic markers","ru":"акриловые маркеры","ex":"These acrylic markers dry quickly.","exRu":"Эти акриловые маркеры быстро сохнут."},{"en":"acted like that","ru":"повёл себя так","ex":"I’m sorry I acted like that.","exRu":"Прости, что я так себя повёл."},{"en":"activity","ru":"занятие, деятельность; активность","ex":"Walking is my favorite activity.","exRu":"Прогулки — моё любимое занятие."},{"en":"adapt","ru":"адаптироваться","ex":"It took me time to adapt to city life.","exRu":"Мне понадобилось время, чтобы привыкнуть к городу."},{"en":"addiction","ru":"зависимость","ex":"Phone addiction can affect sleep.","exRu":"Зависимость от телефона может нарушить сон."},{"en":"adjust my feed","ru":"настроить ленту","ex":"I need to adjust my feed again.","exRu":"Мне снова нужно настроить свою ленту."},{"en":"adjustments / corrections","ru":"правки / исправления","ex":"We made a few adjustments today.","exRu":"Сегодня мы внесли несколько правок."},{"en":"admit","ru":"признать","ex":"He refused to admit his mistake.","exRu":"Он отказался признать свою ошибку."},{"en":"admit doing","ru":"признать, что делал(а)","ex":"He wouldn’t admit doing anything wrong.","exRu":"Он не хотел признавать, что сделал что-то плохое."},{"en":"adopt","ru":"усыновить / принять","ex":"They hope to adopt a child someday.","exRu":"Они надеются когда-нибудь усыновить ребёнка."},{"en":"affected by","ru":"подверженный влиянию","ex":"Our plans were affected by the rain.","exRu":"Дождь повлиял на наши планы."},{"en":"affected by trends","ru":"под влиянием трендов","ex":"Young shoppers are affected by trends.","exRu":"Молодые покупатели подвержены влиянию трендов."},{"en":"afford","ru":"позволить себе","ex":"We can’t afford a bigger apartment.","exRu":"Мы не можем позволить себе квартиру побольше."},{"en":"afraid","ru":"боящийся","ex":"She felt afraid walking home alone.","exRu":"Ей было страшно идти домой одной."},{"en":"afraid of","ru":"бояться","ex":"My dog is afraid of thunderstorms.","exRu":"Моя собака боится грозы."},{"en":"afraid of losing","ru":"бояться потерять","ex":"He is afraid of losing his job.","exRu":"Он боится потерять работу."},{"en":"aftertaste","ru":"послевкусие","ex":"This tea has a bitter aftertaste.","exRu":"У этого чая горькое послевкусие."},{"en":"agreement","ru":"соглашение","ex":"We finally reached an agreement.","exRu":"Мы наконец пришли к соглашению."},{"en":"algorithm","ru":"алгоритм","ex":"The algorithm suggests new songs.","exRu":"Алгоритм предлагает новые песни."},{"en":"alien","ru":"инопланетянин; чужой","ex":"The movie is about a friendly alien.","exRu":"Этот фильм о дружелюбном пришельце."},{"en":"alien / foreigner / expat","ru":"иностранец, экспат","ex":"As an expat, she misses her family.","exRu":"Живя за границей, она скучает по семье."},{"en":"align with","ru":"соответствовать","ex":"This schedule must align with our goals.","exRu":"Этот график должен соответствовать нашим целям."},{"en":"already","ru":"уже","ex":"I’ve already washed the dishes.","exRu":"Я уже помыл посуду."},{"en":"already happened","ru":"уже случилось","ex":"It already happened, so let it go.","exRu":"Это уже случилось, так что отпусти ситуацию."},{"en":"alumni","ru":"выпускники","ex":"The college invited its alumni back.","exRu":"Колледж пригласил своих выпускников."},{"en":"amaze","ru":"поразить","ex":"Her calm response will amaze you.","exRu":"Её спокойный ответ тебя поразит."},{"en":"among","ru":"среди","ex":"I found my keys among the papers.","exRu":"Я нашёл ключи среди бумаг."},{"en":"annoyed","ru":"раздражённый","ex":"She looked annoyed by the delay.","exRu":"Задержка явно её раздражала."},{"en":"annoyed by","ru":"раздражён","ex":"I’m annoyed by the loud music.","exRu":"Меня раздражает громкая музыка."},{"en":"annual income","ru":"годовой доход","ex":"They asked about my annual income.","exRu":"Меня спросили о годовом доходе."},{"en":"anxiety","ru":"тревога","ex":"A short walk helps ease my anxiety.","exRu":"Короткая прогулка помогает унять тревогу."},{"en":"anxious","ru":"тревожный","ex":"I felt anxious before the interview.","exRu":"Перед собеседованием я нервничал."},{"en":"anyway","ru":"в любом случае","ex":"It was raining, but we went anyway.","exRu":"Шёл дождь, но мы всё равно вышли."},{"en":"appearance","ru":"внешний вид; появление","ex":"Don’t judge anyone by appearance.","exRu":"Не суди людей по внешности."},{"en":"apply for","ru":"подавать заявку","ex":"I’m going to apply for that job.","exRu":"Я собираюсь откликнуться на эту вакансию."},{"en":"appointment","ru":"запись, встреча","ex":"My dentist appointment is at three.","exRu":"Я записан к стоматологу на три."},{"en":"appreciate","ru":"ценить","ex":"I really appreciate your help.","exRu":"Я очень ценю твою помощь."},{"en":"as always","ru":"как всегда","ex":"Dad arrived early, as always.","exRu":"Папа, как всегда, пришёл рано."},{"en":"as cool as a cucumber","ru":"спокойный как удав","ex":"She stayed as cool as a cucumber.","exRu":"Она сохраняла полное спокойствие."},{"en":"as usual","ru":"как обычно","ex":"The bus was late, as usual.","exRu":"Автобус, как обычно, опоздал."},{"en":"ashamed","ru":"стыдно","ex":"I felt ashamed of my rude reply.","exRu":"Мне было стыдно за свой грубый ответ."},{"en":"ass is on fire","ru":"срочность / «горят сроки»","ex":"My ass is on fire; this is urgent.","exRu":"У меня задница горит: дело срочное."},{"en":"assume","ru":"полагать","ex":"Don’t assume everyone agrees.","exRu":"Не думай, что все согласны."},{"en":"assumed to be","ru":"предполагается (что кто-то/что-то является)","ex":"The old bridge is assumed to be safe.","exRu":"Считается, что старый мост безопасен."},{"en":"assumption","ru":"предположение","ex":"That assumption turned out to be wrong.","exRu":"Это предположение оказалось неверным."},{"en":"at a time","ru":"за раз","ex":"Please answer one question at a time.","exRu":"Отвечайте, пожалуйста, по одному вопросу за раз."},{"en":"at least","ru":"хотя бы, минимум","ex":"Call me at least once a week.","exRu":"Звони мне хотя бы раз в неделю."},{"en":"at the age of","ru":"в возрасте","ex":"She moved abroad at the age of twenty.","exRu":"Она переехала за границу в двадцать лет."},{"en":"attempt","ru":"попытка","ex":"My first attempt ended in a mess.","exRu":"Моя первая попытка обернулась полным бардаком."},{"en":"attempts","ru":"попытки","ex":"After three attempts, the lock opened.","exRu":"После трёх попыток замок открылся."},{"en":"attitude","ru":"отношение","ex":"Her positive attitude lifts the team.","exRu":"Её позитивный настрой воодушевляет команду."},{"en":"attitude to","ru":"отношение к","ex":"His attitude to work has changed.","exRu":"Его отношение к работе изменилось."},{"en":"attract attention","ru":"привлекать внимание","ex":"Bright colors attract attention.","exRu":"Яркие цвета привлекают внимание."},{"en":"attractive","ru":"привлекательный","ex":"It’s an attractive offer.","exRu":"Это привлекательное предложение."},{"en":"automate","ru":"автоматизировать","ex":"We should automate this daily task.","exRu":"Нам стоит автоматизировать эту ежедневную задачу."},{"en":"automatically","ru":"автоматически","ex":"The lights turn on automatically.","exRu":"Свет включается автоматически."},{"en":"automation","ru":"автоматизация","ex":"Automation saves us several hours.","exRu":"Автоматизация экономит нам несколько часов."},{"en":"avoid a situation","ru":"избегать ситуации","ex":"A call can avoid a situation like this.","exRu":"Звонок поможет избежать такой ситуации."},{"en":"avoid distractions","ru":"избегать отвлечений","ex":"I mute my phone to avoid distractions.","exRu":"Я отключаю звук, чтобы не отвлекаться."},{"en":"avoid doing","ru":"избегать","ex":"I avoid doing chores late at night.","exRu":"Я стараюсь не заниматься делами поздно вечером."},{"en":"awkward","ru":"неловкий","ex":"Our first date was a little awkward.","exRu":"На первом свидании было немного неловко."},{"en":"awkward silence","ru":"неловкая тишина","ex":"An awkward silence filled the room.","exRu":"В комнате повисло неловкое молчание."},{"en":"babysit","ru":"сидеть с детьми","ex":"Can you babysit on Friday night?","exRu":"Посидишь с ребёнком в пятницу вечером?"},{"en":"babysit / kittensitting","ru":"сидеть с детьми / котятами","ex":"I’ll babysit my niece this weekend.","exRu":"На выходных я посижу с племянницей."},{"en":"bachelor","ru":"холостяк; бакалавр","ex":"My brother is still a bachelor.","exRu":"Мой брат всё ещё холост."},{"en":"back down","ru":"отступить","ex":"She refused to back down.","exRu":"Она отказалась отступать."},{"en":"back in town","ru":"снова в городе","ex":"Call me when you’re back in town.","exRu":"Позвони, когда вернёшься в город."},{"en":"back then","ru":"тогда, в то время","ex":"We didn’t have smartphones back then.","exRu":"Тогда у нас не было смартфонов."},{"en":"back up","ru":"поддерживать; делать резервную копию","ex":"Remember to back up your photos.","exRu":"Не забудь сделать резервную копию фотографий."},{"en":"backfire","ru":"выйти боком","ex":"His plan could backfire badly.","exRu":"Его план может обернуться полным провалом."},{"en":"base form","ru":"начальная форма глагола","ex":"Write each verb in its base form.","exRu":"Запишите каждый глагол в начальной форме."},{"en":"be exposed to","ru":"быть подверженным; сталкиваться с","ex":"Kids shouldn’t be exposed to that smoke.","exRu":"Дети не должны подвергаться воздействию этого дыма."},{"en":"be into","ru":"увлекаться, любить","ex":"You must be into jazz too.","exRu":"Ты, похоже, тоже увлекаешься джазом."},{"en":"be involved in","ru":"быть вовлечённым","ex":"I’d like to be involved in the project.","exRu":"Я хотел бы участвовать в этом проекте."},{"en":"be judged by","ru":"быть оцениваемым по","ex":"Nobody wants to be judged by looks.","exRu":"Никто не хочет, чтобы его судили по внешности."},{"en":"be responsible for","ru":"быть ответственным за","ex":"I’ll be responsible for the budget.","exRu":"Я буду отвечать за бюджет."},{"en":"be surrounded by","ru":"быть окружённым","ex":"I want to be surrounded by good friends.","exRu":"Я хочу, чтобы меня окружали хорошие друзья."},{"en":"be used to","ru":"быть привыкшим","ex":"You’ll soon be used to the noise.","exRu":"Ты скоро привыкнешь к шуму."},{"en":"bear a child","ru":"родить ребёнка","ex":"She chose to bear a child on her own.","exRu":"Она решила сама родить ребёнка."},{"en":"bear weight","ru":"нести тяжесть","ex":"This old shelf can’t bear weight.","exRu":"Эта старая полка не выдержит нагрузки."},{"en":"become aware of","ru":"осознать","ex":"Travel helps us become aware of bias.","exRu":"Путешествия помогают нам осознать свои предубеждения."},{"en":"bedsheets","ru":"постельное бельё","ex":"I changed the bedsheets this morning.","exRu":"Сегодня утром я сменил постельное бельё."},{"en":"behave","ru":"вести себя","ex":"Please behave at Grandma’s house.","exRu":"Пожалуйста, веди себя хорошо у бабушки."},{"en":"being constructed","ru":"строится","ex":"A new hotel is being constructed.","exRu":"Сейчас строится новый отель."},{"en":"belief","ru":"убеждение","ex":"Her belief in me kept me going.","exRu":"Её вера в меня помогала мне не сдаваться."},{"en":"besides","ru":"помимо","ex":"Besides, we can always go tomorrow.","exRu":"К тому же мы всегда можем пойти завтра."},{"en":"besides it","ru":"помимо этого","ex":"Besides it, there is one more option.","exRu":"Кроме этого, есть ещё один вариант."},{"en":"binge-watching","ru":"марафон сериалов","ex":"We spent Sunday binge-watching dramas.","exRu":"Всё воскресенье мы запоем смотрели сериалы."},{"en":"blood test","ru":"анализ крови","ex":"My doctor ordered a blood test.","exRu":"Врач назначил мне анализ крови."},{"en":"bond","ru":"связь","ex":"Travel created a strong bond between us.","exRu":"Путешествие сильно нас сблизило."},{"en":"boring","ru":"скучный","ex":"The lecture was surprisingly boring.","exRu":"Лекция оказалась на удивление скучной."},{"en":"boring / rude / cruel","ru":"скучный / грубый / жестокий","ex":"The movie was boring, so we left.","exRu":"Фильм был скучным, и мы ушли."},{"en":"bother","ru":"беспокоить","ex":"Does the street noise bother you?","exRu":"Тебе мешает шум с улицы?"},{"en":"bottle up","ru":"держать в себе","ex":"Don’t bottle up your feelings.","exRu":"Не держи чувства в себе."},{"en":"bottled up","ru":"держал в себе","ex":"Years of bottled up anger came out.","exRu":"Копившийся годами гнев вырвался наружу."},{"en":"brand","ru":"бренд","ex":"This brand makes sturdy backpacks.","exRu":"Этот бренд делает прочные рюкзаки."},{"en":"breadwinner","ru":"кормилец; кормилец семьи","ex":"Her mother is the family breadwinner.","exRu":"В их семье мать — главный кормилец."},{"en":"break down","ru":"сорваться эмоционально; срыв","ex":"I tend to break down when I’m exhausted.","exRu":"Когда я вымотан, то часто не выдерживаю."},{"en":"break it down","ru":"разобрать, объяснить","ex":"Could you break it down for me?","exRu":"Можешь объяснить мне это по шагам?"},{"en":"brew coffee","ru":"заваривать кофе","ex":"I brew coffee every morning.","exRu":"Каждое утро я завариваю кофе."},{"en":"brief","ru":"краткий; брифинг, инструктаж","ex":"Let’s keep the meeting brief.","exRu":"Пусть встреча будет короткой."},{"en":"bring people together","ru":"объединять людей","ex":"Good food can bring people together.","exRu":"Хорошая еда объединяет людей."},{"en":"bring someone down","ru":"подавлять, расстраивать кого-то","ex":"Harsh comments can bring someone down.","exRu":"Резкие слова могут выбить человека из колеи."},{"en":"bring success","ru":"приносить успех","ex":"Hard work alone may not bring success.","exRu":"Одного упорного труда для успеха может быть мало."},{"en":"bring up","ru":"поднимать тему","ex":"I didn’t want to bring up money.","exRu":"Я не хотел поднимать тему денег."},{"en":"broaden imagination","ru":"расширять воображение","ex":"Stories can broaden imagination.","exRu":"Истории помогают развивать воображение."},{"en":"brochure","ru":"брошюра","ex":"I picked up a travel brochure.","exRu":"Я взял туристическую брошюру."},{"en":"build","ru":"строить; создавать","ex":"We plan to build a small cabin.","exRu":"Мы планируем построить небольшой домик."},{"en":"build trust","ru":"строить доверие","ex":"Honest talks help build trust.","exRu":"Честные разговоры помогают укрепить доверие."},{"en":"build up","ru":"наращивать, укреплять","ex":"Small wins build up your confidence.","exRu":"Маленькие победы укрепляют твою уверенность."},{"en":"busy with work","ru":"занят работой","ex":"I’ve been busy with work all week.","exRu":"Всю неделю я был занят работой."},{"en":"busy working","ru":"занят работой","ex":"She’s busy working on the report.","exRu":"Она занята работой над отчётом."},{"en":"by / until","ru":"к / до","ex":"Please send the form by Friday.","exRu":"Пожалуйста, отправьте форму до пятницы."},{"en":"by the time","ru":"к тому времени как","ex":"Dinner was cold by the time I arrived.","exRu":"К моему приходу ужин уже остыл."},{"en":"calm down","ru":"успокоиться","ex":"Take a breath and calm down.","exRu":"Вдохни поглубже и успокойся."},{"en":"can't help doing","ru":"не мочь удержаться от того, чтобы; невольно делать","ex":"I can't help doing her chores for her.","exRu":"Не могу удержаться и делаю её дела за неё."},{"en":"can't stand doing","ru":"терпеть не могу","ex":"I can't stand doing paperwork.","exRu":"Я терпеть не могу возиться с документами."},{"en":"canned food","ru":"консервы","ex":"We keep canned food for emergencies.","exRu":"Мы храним консервы на случай чрезвычайной ситуации."},{"en":"car accident","ru":"автоавария","ex":"He was shaken after the car accident.","exRu":"После аварии он был потрясён."},{"en":"career","ru":"карьера","ex":"She wants a career in design.","exRu":"Она хочет сделать карьеру в дизайне."},{"en":"carry a bag","ru":"нести сумку","ex":"I carry a bag to work every day.","exRu":"Каждый день я беру на работу сумку."},{"en":"carry out","ru":"выполнять, осуществлять, реализовывать","ex":"The team will carry out the plan.","exRu":"Команда выполнит план."},{"en":"carry out a survey","ru":"провести опрос","ex":"We need to carry out a survey.","exRu":"Нам нужно провести опрос."},{"en":"carry-on","ru":"ручная кладь","ex":"My carry-on fits under the seat.","exRu":"Моя ручная кладь помещается под сиденьем."},{"en":"carry-on bag","ru":"ручная кладь","ex":"Your carry-on bag is too heavy.","exRu":"Твоя сумка для ручной клади слишком тяжёлая."},{"en":"catch","ru":"ловить; уловить смысл","ex":"Did you catch what she said?","exRu":"Ты понял, что она сказала?"},{"en":"catch meaning","ru":"уловить смысл","ex":"Context helps us catch meaning quickly.","exRu":"Контекст помогает быстро уловить смысл."},{"en":"catch up on","ru":"наверстать","ex":"I need to catch up on my emails.","exRu":"Мне нужно разобрать накопившиеся письма."},{"en":"catch up on sleep","ru":"отоспаться","ex":"I need the weekend to catch up on sleep.","exRu":"На выходных мне нужно отоспаться."},{"en":"catch up with","ru":"наверстать; встретиться","ex":"Let’s meet and catch up with each other.","exRu":"Давай встретимся и расскажем друг другу новости."},{"en":"catch up with husband","ru":"встретиться с мужем","ex":"My note says: catch up with husband.","exRu":"В моей заметке написано: пообщаться с мужем."},{"en":"catch up with you","ru":"настигнуть тебя; встретиться / поболтать","ex":"I’d love to catch up with you soon.","exRu":"Я бы с радостью встретился и поболтал с тобой."},{"en":"caught up on","ru":"наверстал","ex":"I finally caught up on my emails.","exRu":"Я наконец разобрал все накопившиеся письма."},{"en":"ceiling","ru":"потолок","ex":"There’s a crack in the ceiling.","exRu":"На потолке трещина."},{"en":"challenge","ru":"вызов, сложность","ex":"Starting over was a real challenge.","exRu":"Начать всё заново было настоящим испытанием."},{"en":"challenge stereotypes","ru":"бросать вызов стереотипам","ex":"These stories challenge stereotypes.","exRu":"Эти истории ставят стереотипы под сомнение."},{"en":"change your mind","ru":"передумать","ex":"You can still change your mind.","exRu":"Ты ещё можешь передумать."},{"en":"change your perspective","ru":"изменить взгляд","ex":"Travel can change your perspective.","exRu":"Путешествия могут изменить твой взгляд на мир."},{"en":"cheapskate","ru":"скряга","ex":"Don’t be a cheapskate; leave a tip.","exRu":"Не жадничай, оставь чаевые."},{"en":"check out","ru":"посмотреть, изучить","ex":"You should check out this new café.","exRu":"Тебе стоит заглянуть в это новое кафе."},{"en":"chill out","ru":"расслабиться","ex":"Let’s stay home and chill out.","exRu":"Давай останемся дома и расслабимся."},{"en":"circumstances","ru":"обстоятельства","ex":"Plans change when circumstances shift.","exRu":"Планы меняются вместе с обстоятельствами."},{"en":"citizenship","ru":"гражданство","ex":"She applied for citizenship last year.","exRu":"В прошлом году она подала на гражданство."},{"en":"clue","ru":"улика; подсказка; ключ к разгадке","ex":"I don’t have a clue where he went.","exRu":"Понятия не имею, куда он ушёл."},{"en":"coincidence","ru":"совпадение","ex":"Meeting there was a funny coincidence.","exRu":"Забавно, что мы случайно там встретились."},{"en":"collaboration","ru":"сотрудничество","ex":"The launch was a team collaboration.","exRu":"Запуск стал результатом командной работы."},{"en":"come across","ru":"случайно наткнуться","ex":"I often come across old photos.","exRu":"Мне часто попадаются старые фотографии."},{"en":"come across a book","ru":"наткнуться на книгу","ex":"I happened to come across a book there.","exRu":"Там мне случайно попалась одна книга."},{"en":"come back","ru":"вернуться","ex":"Please come back before dark.","exRu":"Пожалуйста, вернись до темноты."},{"en":"come up with","ru":"придумать","ex":"Can we come up with a better plan?","exRu":"Мы можем придумать план получше?"},{"en":"come up with an idea","ru":"придумать идею","ex":"Let’s come up with an idea together.","exRu":"Давай вместе что-нибудь придумаем."},{"en":"comfortable","ru":"удобный (комфортный)","ex":"These shoes are really comfortable.","exRu":"Эти туфли очень удобные."},{"en":"commercial product","ru":"коммерческий продукт","ex":"It’s ready to become a commercial product.","exRu":"Продукт готов выйти на рынок."},{"en":"commitment","ru":"обязательство","ex":"A pet is a long-term commitment.","exRu":"Домашний питомец — это надолго и всерьёз."},{"en":"communication","ru":"коммуникация, общение","ex":"Clear communication prevents mistakes.","exRu":"Чёткое общение помогает избежать ошибок."},{"en":"compared to","ru":"по сравнению с","ex":"Rent is low compared to London.","exRu":"По сравнению с Лондоном аренда здесь дешёвая."},{"en":"complain about","ru":"жаловаться","ex":"He likes to complain about traffic.","exRu":"Он любит жаловаться на пробки."},{"en":"concerns","ru":"опасения","ex":"Please share your concerns with me.","exRu":"Пожалуйста, расскажи мне, что тебя беспокоит."},{"en":"conclude","ru":"сделать вывод","ex":"We can conclude the meeting now.","exRu":"Теперь мы можем завершить встречу."},{"en":"confusion","ru":"путаница","ex":"The new schedule caused confusion.","exRu":"Новое расписание вызвало путаницу."},{"en":"conscious","ru":"в сознании; осознающий","ex":"He was conscious after the fall.","exRu":"После падения он был в сознании."},{"en":"consciousness","ru":"сознание","ex":"She briefly lost consciousness.","exRu":"Она ненадолго потеряла сознание."},{"en":"consider doing","ru":"рассматривать","ex":"You should consider doing yoga.","exRu":"Тебе стоит подумать о занятиях йогой."},{"en":"considered","ru":"считается","ex":"This area is considered safe.","exRu":"Этот район считается безопасным."},{"en":"constantly","ru":"постоянно","ex":"My phone is constantly buzzing.","exRu":"Мой телефон постоянно вибрирует."},{"en":"construct","ru":"строить","ex":"They plan to construct a new bridge.","exRu":"Они планируют построить новый мост."},{"en":"construction planning","ru":"планирование строительства","ex":"She works in construction planning.","exRu":"Она занимается планированием строительства."},{"en":"contribute","ru":"вносить вклад","ex":"Everyone can contribute an idea.","exRu":"Каждый может предложить свою идею."},{"en":"convenient","ru":"удобный (время/место)","ex":"Is six o’clock convenient for you?","exRu":"Тебе удобно в шесть часов?"},{"en":"coordinate","ru":"координировать","ex":"I’ll coordinate the travel plans.","exRu":"Я согласую планы поездки."},{"en":"count on","ru":"рассчитывать на","ex":"You can always count on your sister.","exRu":"На сестру всегда можно положиться."},{"en":"count on / rely on","ru":"рассчитывать / полагаться","ex":"You can count on me.","exRu":"Ты можешь на меня рассчитывать."},{"en":"cozy","ru":"уютный","ex":"This little café feels cozy.","exRu":"В этом маленьком кафе очень уютно."},{"en":"create","ru":"создавать","ex":"Let’s create a shared calendar.","exRu":"Давай создадим общий календарь."},{"en":"cross-functional","ru":"кросс-функциональный","ex":"We formed a cross-functional team.","exRu":"Мы собрали кросс-функциональную команду."},{"en":"crowded","ru":"людный","ex":"The train was crowded this morning.","exRu":"Сегодня утром в поезде было тесно."},{"en":"crowded / packed","ru":"многолюдно / битком","ex":"The beach gets crowded at noon.","exRu":"В полдень пляж переполнен."},{"en":"cruel","ru":"жестокий","ex":"It was cruel to leave the dog outside.","exRu":"Было жестоко оставлять собаку на улице."},{"en":"current tasks","ru":"текущие задачи","ex":"Let’s review our current tasks.","exRu":"Давайте рассмотрим наши текущие задачи."},{"en":"currently","ru":"в настоящее время","ex":"She is currently working from home.","exRu":"Сейчас она работает из дома."},{"en":"customer","ru":"заказчик, клиент","ex":"The customer asked for a refund.","exRu":"Клиент попросил вернуть деньги."},{"en":"cut back on","ru":"сократить потребление","ex":"I’m trying to cut back on sugar.","exRu":"Я стараюсь есть меньше сахара."},{"en":"day off","ru":"выходной","ex":"I’m taking a day off tomorrow.","exRu":"Завтра я беру выходной."},{"en":"deadline","ru":"срок, дедлайн","ex":"The deadline is next Monday.","exRu":"Крайний срок — следующий понедельник."},{"en":"deadline approaching","ru":"срок приближается","ex":"With the deadline approaching, we focused.","exRu":"С приближением срока мы сосредоточились на деле."},{"en":"deal with","ru":"справляться с, заниматься","ex":"I’ll deal with the broken sink.","exRu":"Я разберусь со сломанной раковиной."},{"en":"deal with a problem","ru":"решать проблему","ex":"We must deal with a problem at work.","exRu":"Нам нужно решить одну проблему на работе."},{"en":"deal with uncertainty","ru":"справляться с неопределенностью","ex":"It’s hard to deal with uncertainty.","exRu":"С неопределённостью трудно справляться."},{"en":"dealing with problem","ru":"решение проблемы","ex":"We discussed dealing with problem debt.","exRu":"Мы обсудили, как решить проблему с долгами."},{"en":"debts","ru":"долги","ex":"He finally paid off his debts.","exRu":"Он наконец выплатил все долги."},{"en":"debts catch up","ru":"долги настигнут","ex":"Ignore bills, and your debts catch up.","exRu":"Игнорируй счета — и долги тебя настигнут."},{"en":"decision","ru":"решение","ex":"Moving abroad was a big decision.","exRu":"Переезд за границу был серьёзным решением."},{"en":"decisive","ru":"решительный","ex":"We need a decisive leader today.","exRu":"Сегодня нам нужен решительный лидер."},{"en":"delay","ru":"задержка","ex":"Fog caused a two-hour delay.","exRu":"Из-за тумана рейс задержали на два часа."},{"en":"delay doing","ru":"откладывать","ex":"Don’t delay doing the laundry.","exRu":"Не откладывай стирку."},{"en":"delegate","ru":"делегировать","ex":"A good manager knows when to delegate.","exRu":"Хороший руководитель знает, когда делегировать."},{"en":"delicious","ru":"вкусный","ex":"This homemade soup is delicious.","exRu":"Этот домашний суп очень вкусный."},{"en":"deny doing","ru":"отрицать","ex":"She can’t deny doing it herself.","exRu":"Она не может отрицать, что сама это сделала."},{"en":"depend on","ru":"зависеть от","ex":"You can depend on me.","exRu":"Ты можешь на меня положиться."},{"en":"depends on","ru":"зависеть от","ex":"The price depends on the season.","exRu":"Цена зависит от сезона."},{"en":"depressive","ru":"депрессивный","ex":"He was in a depressive state.","exRu":"Он находился в депрессивном состоянии."},{"en":"designer","ru":"проектировщик, дизайнер","ex":"We hired a designer for the kitchen.","exRu":"Мы наняли дизайнера для оформления кухни."},{"en":"desire","ru":"желание","ex":"I have no desire to argue.","exRu":"У меня нет желания спорить."},{"en":"desperate","ru":"отчаянный","ex":"I was desperate for a quiet night.","exRu":"Я отчаянно хотел провести тихий вечер."},{"en":"desperation","ru":"отчаяние","ex":"He called me in desperation.","exRu":"Он позвонил мне в отчаянии."},{"en":"develop","ru":"разрабатывать, развивать","ex":"I want to develop better habits.","exRu":"Я хочу выработать более полезные привычки."},{"en":"developer","ru":"разработчик","ex":"My cousin works as a developer.","exRu":"Мой двоюродный брат работает разработчиком."},{"en":"development","ru":"развитие","ex":"The app is still in development.","exRu":"Приложение всё ещё в разработке."},{"en":"didn't last long","ru":"длилось недолго","ex":"Our sunny weather didn't last long.","exRu":"Солнечная погода продержалась недолго."},{"en":"direction","ru":"направление","ex":"Could you point me in the right direction?","exRu":"Не подскажете, куда мне идти?"},{"en":"discount","ru":"скидка","ex":"Students get a ten percent discount.","exRu":"Студентам дают скидку десять процентов."},{"en":"disgusting","ru":"отвратительный","ex":"The milk smells disgusting.","exRu":"Молоко отвратительно пахнет."},{"en":"dishwasher","ru":"посудомойка","ex":"Please load the dishwasher tonight.","exRu":"Пожалуйста, вечером загрузи посудомойку."},{"en":"distract","ru":"отвлекать","ex":"Loud calls distract me from work.","exRu":"Громкие разговоры отвлекают меня от работы."},{"en":"distracting","ru":"отвлекающий","ex":"That flashing light is distracting.","exRu":"Этот мигающий свет отвлекает."},{"en":"disturbing","ru":"тревожащий","ex":"We heard some disturbing news.","exRu":"Мы услышали тревожные новости."},{"en":"disturbing state","ru":"тревожное состояние","ex":"He returned home in a disturbing state.","exRu":"Он вернулся домой в тревожном состоянии."},{"en":"dive into","ru":"погрузиться","ex":"Let’s dive into the first topic.","exRu":"Давайте погрузимся в первую тему."},{"en":"do for a living","ru":"зарабатывать на жизнь","ex":"What do you do for a living?","exRu":"Чем ты зарабатываешь на жизнь?"},{"en":"do makeup","ru":"делать макияж","ex":"I usually do makeup by the window.","exRu":"Обычно я крашусь у окна."},{"en":"documents","ru":"документы","ex":"Keep your travel documents safe.","exRu":"Храни проездные документы в надёжном месте."},{"en":"don't bother","ru":"не беспокой","ex":"Please don't bother; I can manage.","exRu":"Не беспокойся, я сам справлюсь."},{"en":"don't bother him","ru":"не беспокой его","ex":"Please don't bother him while he works.","exRu":"Не мешай ему, пока он работает."},{"en":"don’t get me wrong","ru":"не пойми меня неправильно","ex":"Don’t get me wrong, I love this place.","exRu":"Не пойми меня неправильно, мне здесь нравится."},{"en":"doubt","ru":"сомнение","ex":"I have no doubt she’ll succeed.","exRu":"Я не сомневаюсь, что она добьётся успеха."},{"en":"drafting","ru":"черчение","ex":"He does drafting for an architecture firm.","exRu":"Он делает чертежи для архитектурной фирмы."},{"en":"drained","ru":"выжатый","ex":"After the meeting, I felt drained.","exRu":"После встречи я чувствовал себя выжатым."},{"en":"draw attention","ru":"привлекать внимание","ex":"That bright sign will draw attention.","exRu":"Эта яркая вывеска привлечёт внимание."},{"en":"draw conclusions","ru":"делать выводы","ex":"Don’t draw conclusions too quickly.","exRu":"Не делай выводов слишком быстро."},{"en":"drop by","ru":"заглянуть","ex":"Feel free to drop by after work.","exRu":"Заходи после работы, если хочешь."},{"en":"dull","ru":"скучный, унылый","ex":"The sky looked grey and dull.","exRu":"Небо было серым и унылым."},{"en":"earn","ru":"зарабатывать","ex":"She works weekends to earn extra cash.","exRu":"Она работает по выходным, чтобы подзаработать."},{"en":"earn credibility","ru":"завоёвывать доверие/авторитет","ex":"Honest work helps you earn credibility.","exRu":"Честная работа помогает заслужить доверие."},{"en":"earn money","ru":"зарабатывать","ex":"He repairs bikes to earn money.","exRu":"Он чинит велосипеды, чтобы заработать."},{"en":"ease","ru":"облегчать","ex":"A warm bath can ease tired muscles.","exRu":"Тёплая ванна поможет расслабить уставшие мышцы."},{"en":"ease pain","ru":"облегчить боль","ex":"This medicine should ease pain.","exRu":"Это лекарство должно облегчить боль."},{"en":"easy on me","ru":"помягче со мной","ex":"Please go easy on me today.","exRu":"Пожалуйста, не будь сегодня со мной строг."},{"en":"eat up","ru":"съесть всё","ex":"Eat up before your food gets cold.","exRu":"Доедай, пока еда не остыла."},{"en":"efficiently","ru":"эффективно","ex":"We finished the task efficiently.","exRu":"Мы эффективно справились с задачей."},{"en":"either","ru":"тоже (в отриц.); либо","ex":"I don’t want either option.","exRu":"Мне не нравится ни один вариант."},{"en":"either way","ru":"так или иначе","ex":"Either way, I’ll support you.","exRu":"В любом случае я тебя поддержу."},{"en":"elaborate on","ru":"подробнее объяснить","ex":"Could you elaborate on that point?","exRu":"Можешь подробнее объяснить эту мысль?"},{"en":"emotional rollercoaster","ru":"эмоциональные американские горки","ex":"The trip was an emotional rollercoaster.","exRu":"Поездка превратилась в эмоциональные качели."},{"en":"empower","ru":"наделять полномочиями","ex":"Good leaders empower their teams.","exRu":"Хорошие лидеры дают своим командам больше свободы."},{"en":"encourage","ru":"поощрять, воодушевлять","ex":"Her words encourage me to keep going.","exRu":"Её слова вдохновляют меня не сдаваться."},{"en":"encourage to","ru":"побуждать","ex":"We use encourage to mean give support.","exRu":"Encourage означает поддерживать и воодушевлять."},{"en":"end up","ru":"в итоге оказаться","ex":"We may end up staying home.","exRu":"В итоге мы, возможно, останемся дома."},{"en":"end up in hell","ru":"попасть в ад","ex":"He joked that we’d end up in hell.","exRu":"Он пошутил, что мы попадём в ад."},{"en":"ended up being","ru":"в итоге стал","ex":"The trip ended up being wonderful.","exRu":"В итоге поездка оказалась замечательной."},{"en":"endurance","ru":"выносливость","ex":"Cycling uphill builds endurance.","exRu":"Езда в гору развивает выносливость."},{"en":"engineer","ru":"инженер","ex":"An engineer checked the old bridge.","exRu":"Инженер осмотрел старый мост."},{"en":"enjoy doing","ru":"получать удовольствие от","ex":"I enjoy doing puzzles after dinner.","exRu":"После ужина я люблю собирать пазлы."},{"en":"enough","ru":"достаточно","ex":"We have enough food for everyone.","exRu":"У нас достаточно еды на всех."},{"en":"entertainment","ru":"развлечение","ex":"The hotel offers evening entertainment.","exRu":"По вечерам в отеле есть развлечения."},{"en":"environment","ru":"окружающая среда","ex":"We all need to protect the environment.","exRu":"Мы все должны защищать окружающую среду."},{"en":"errands","ru":"поручения","ex":"I have a few errands to run.","exRu":"Мне нужно сделать несколько дел."},{"en":"even though","ru":"хотя","ex":"I went out even though I was tired.","exRu":"Я вышел, хотя и устал."},{"en":"even worse","ru":"ещё хуже","ex":"The traffic was even worse today.","exRu":"Сегодня пробки были ещё хуже."},{"en":"eventually","ru":"в конце концов","ex":"We eventually found the right address.","exRu":"В конце концов мы нашли нужный адрес."},{"en":"ever","ru":"когда-либо","ex":"Have you ever traveled alone?","exRu":"Ты когда-нибудь путешествовал один?"},{"en":"exact","ru":"точный","ex":"Tell me the exact time you arrived.","exRu":"Скажи точное время своего приезда."},{"en":"exactly this point","ru":"именно этот момент","ex":"I meant exactly this point.","exRu":"Я имел в виду именно этот момент."},{"en":"excellent","ru":"отличный","ex":"You did an excellent job today.","exRu":"Сегодня ты отлично поработал."},{"en":"except","ru":"кроме","ex":"Everyone came except Mark.","exRu":"Пришли все, кроме Марка."},{"en":"except / but","ru":"кроме","ex":"Everyone except Lena was ready.","exRu":"Все, кроме Лены, были готовы."},{"en":"exceptional","ru":"исключительный","ex":"Her service was truly exceptional.","exRu":"Она обслужила нас просто превосходно."},{"en":"excite","ru":"волновать","ex":"New places always excite me.","exRu":"Новые места всегда приводят меня в восторг."},{"en":"excited","ru":"в восторге","ex":"The kids are excited about the trip.","exRu":"Дети в восторге от предстоящей поездки."},{"en":"excuse","ru":"оправдание; извинение","ex":"That sounds like a weak excuse.","exRu":"Звучит как слабая отговорка."},{"en":"exhausted","ru":"измотанный, выдохшийся","ex":"I was exhausted after the long flight.","exRu":"После долгого перелёта я был без сил."},{"en":"exist","ru":"существовать","ex":"Some old traditions still exist.","exRu":"Некоторые старые традиции всё ещё существуют."},{"en":"existence","ru":"существование","ex":"I forgot about the file’s existence.","exRu":"Я забыл о существовании этого файла."},{"en":"expand vocabulary","ru":"расширять словарь","ex":"Reading daily can expand vocabulary.","exRu":"Ежедневное чтение помогает расширить словарный запас."},{"en":"expansion","ru":"расширение","ex":"The store is closed for expansion.","exRu":"Магазин закрыт на время расширения."},{"en":"expect","ru":"ожидать","ex":"I expect the package tomorrow.","exRu":"Я жду посылку завтра."},{"en":"expensive enough","ru":"достаточно дорого","ex":"Rent is expensive enough already.","exRu":"Аренда и так уже достаточно дорогая."},{"en":"experience feelings","ru":"переживать чувства","ex":"It’s normal to experience feelings deeply.","exRu":"Испытывать сильные чувства — это нормально."},{"en":"expose","ru":"подвергать / разоблачать","ex":"Don’t expose the plants to cold air.","exRu":"Не подвергай растения воздействию холодного воздуха."},{"en":"express your opinion","ru":"выражать свое мнение","ex":"It’s safe to express your opinion here.","exRu":"Здесь можно спокойно высказать своё мнение."},{"en":"extend","ru":"продлить","ex":"Can we extend our stay by one night?","exRu":"Можем мы продлить поездку на одну ночь?"},{"en":"extraordinary","ru":"необычный","ex":"We had an extraordinary view.","exRu":"Из окна открывался необыкновенный вид."},{"en":"face a challenge","ru":"столкнуться с трудностью","ex":"Every new team will face a challenge.","exRu":"Каждой новой команде придётся принять вызов."},{"en":"failure","ru":"провал","ex":"One failure doesn’t define you.","exRu":"Одна неудача не определяет, кто ты."},{"en":"fair","ru":"справедливый; честный","ex":"That doesn’t seem fair to me.","exRu":"Мне это не кажется справедливым."},{"en":"fair price","ru":"справедливая цена","ex":"We paid a fair price for the table.","exRu":"Мы заплатили за стол нормальную цену."},{"en":"fairytale","ru":"сказка","ex":"The village looked like a fairytale.","exRu":"Деревня выглядела как в сказке."},{"en":"fairytales","ru":"сказки","ex":"My grandmother told wonderful fairytales.","exRu":"Бабушка рассказывала мне чудесные сказки."},{"en":"fall out","ru":"поссориться","ex":"Good friends sometimes fall out.","exRu":"Даже хорошие друзья иногда ссорятся."},{"en":"far enough","ru":"достаточно далеко","ex":"We haven’t walked far enough yet.","exRu":"Мы ещё не прошли достаточно далеко."},{"en":"farewell party","ru":"прощальная вечеринка","ex":"We planned a farewell party for Mia.","exRu":"Мы устроили для Мии прощальную вечеринку."},{"en":"fasteners","ru":"крепёж","ex":"Check the fasteners on the shelf.","exRu":"Проверь крепления на полке."},{"en":"fear","ru":"страх","ex":"Her greatest fear is flying.","exRu":"Больше всего она боится летать."},{"en":"fed","ru":"кормил (feed)","ex":"I fed the cat before leaving.","exRu":"Перед уходом я покормил кота."},{"en":"fed up with","ru":"сыт по горло","ex":"I’m fed up with these delays.","exRu":"Мне надоели эти задержки."},{"en":"feedback","ru":"обратная связь","ex":"Thanks for your honest feedback.","exRu":"Спасибо за честный отзыв."},{"en":"feel dizzy","ru":"чувствовать головокружение","ex":"Sit down if you feel dizzy.","exRu":"Если кружится голова, присядь."},{"en":"feel hot","ru":"чувствовать жару","ex":"I feel hot in this heavy coat.","exRu":"Мне жарко в этом тяжёлом пальто."},{"en":"feel proud of","ru":"гордиться","ex":"You should feel proud of your progress.","exRu":"Тебе стоит гордиться своими успехами."},{"en":"feel sick","ru":"чувствовать себя плохо","ex":"I feel sick after that boat ride.","exRu":"После прогулки на лодке меня тошнит."},{"en":"feel under pressure","ru":"чувствовать давление","ex":"Many people feel under pressure at work.","exRu":"Многие чувствуют давление на работе."},{"en":"figure","ru":"понять; разобраться","ex":"I figure we can leave after lunch.","exRu":"Думаю, мы можем уйти после обеда."},{"en":"figure out","ru":"разобраться","ex":"We’ll figure out a solution.","exRu":"Мы найдём решение."},{"en":"find a solution","ru":"находить решение","ex":"Let’s work together to find a solution.","exRu":"Давайте вместе найдём решение."},{"en":"find an excuse","ru":"найти оправдание","ex":"He can always find an excuse to leave.","exRu":"Он всегда найдёт повод уйти."},{"en":"find out","ru":"узнать","ex":"I called to find out the price.","exRu":"Я позвонил, чтобы узнать цену."},{"en":"finish doing","ru":"закончить","ex":"Let me finish doing the dishes first.","exRu":"Дай мне сначала домыть посуду."},{"en":"flexible","ru":"гибкий","ex":"My work schedule is quite flexible.","exRu":"У меня довольно гибкий рабочий график."},{"en":"focus on","ru":"сосредоточиться на","ex":"Today I need to focus on one task.","exRu":"Сегодня мне нужно сосредоточиться на одной задаче."},{"en":"foggy","ru":"туманный","ex":"It was too foggy to drive safely.","exRu":"Из-за тумана безопасно ехать было невозможно."},{"en":"folks","ru":"народ, люди","ex":"The folks next door are friendly.","exRu":"Соседи — дружелюбные люди."},{"en":"follow this path","ru":"идти этим путём","ex":"Follow this path to reach the lake.","exRu":"Иди по этой тропинке до самого озера."},{"en":"for","ru":"в течение","ex":"I’ve lived here for a year.","exRu":"Я живу здесь уже год."},{"en":"for instance","ru":"например","ex":"For instance, Mia works remotely.","exRu":"Например, Мия работает удалённо."},{"en":"for some reason","ru":"по какой-то причине","ex":"For some reason, the door won’t open.","exRu":"Почему-то дверь не открывается."},{"en":"for the past month","ru":"за последний месяц","ex":"I’ve worked from home for the past month.","exRu":"Последний месяц я работаю из дома."},{"en":"force","ru":"заставлять","ex":"Don’t force yourself to stay awake.","exRu":"Не заставляй себя бодрствовать."},{"en":"force majeure","ru":"форс-мажор","ex":"The delay was due to force majeure.","exRu":"Задержка произошла из-за форс-мажора."},{"en":"force yourself","ru":"заставлять себя","ex":"You can’t force yourself to feel happy.","exRu":"Нельзя заставить себя чувствовать радость."},{"en":"forgive","ru":"прощать","ex":"I hope you can forgive me.","exRu":"Надеюсь, ты сможешь меня простить."},{"en":"form first impressions","ru":"формировать первое впечатление","ex":"People quickly form first impressions.","exRu":"У людей быстро складывается первое впечатление."},{"en":"freak out","ru":"паниковать","ex":"Try not to freak out over one mistake.","exRu":"Не паникуй из-за одной ошибки."},{"en":"free will","ru":"свобода воли","ex":"Everyone deserves to have free will.","exRu":"Каждый заслуживает свободы воли."},{"en":"full","ru":"сытый; полный","ex":"The bus was full by eight.","exRu":"К восьми часам автобус был полон."},{"en":"future in the past","ru":"будущее в прошедшем","ex":"Today we studied future in the past.","exRu":"Сегодня мы изучали будущее в прошедшем."},{"en":"future perfect","ru":"будущее совершенное","ex":"We practiced the future perfect today.","exRu":"Сегодня мы практиковали будущее совершенное время."},{"en":"gain confidence","ru":"обрести уверенность","ex":"Small wins help you gain confidence.","exRu":"Маленькие победы помогают обрести уверенность."},{"en":"gain experience","ru":"получать опыт","ex":"Volunteering helps you gain experience.","exRu":"Волонтёрство помогает набраться опыта."},{"en":"gain popularity","ru":"набирать популярность","ex":"The café began to gain popularity.","exRu":"Кафе стало набирать популярность."},{"en":"gather issues","ru":"собрать замечания / вопросы","ex":"Let’s gather issues before the meeting.","exRu":"Давайте соберём все вопросы перед встречей."},{"en":"get / become","ru":"стать, становиться","ex":"Things will get easier soon.","exRu":"Скоро всё станет проще."},{"en":"get a good deal","ru":"заключить выгодную сделку","ex":"Shop around to get a good deal.","exRu":"Сравни цены, чтобы выгодно купить."},{"en":"get better","ru":"становиться лучше","ex":"Your English will get better soon.","exRu":"Скоро твой английский станет лучше."},{"en":"get by","ru":"сводить концы с концами","ex":"We can get by on one salary.","exRu":"Мы можем прожить на одну зарплату."},{"en":"get distracted","ru":"отвлечься","ex":"I get distracted when my phone buzzes.","exRu":"Я отвлекаюсь, когда телефон вибрирует."},{"en":"get dressed","ru":"одеться","ex":"I need ten minutes to get dressed.","exRu":"Мне нужно десять минут, чтобы одеться."},{"en":"get injured","ru":"получить травму","ex":"Warm up so you don’t get injured.","exRu":"Разомнись, чтобы не получить травму."},{"en":"get involved in","ru":"включиться в","ex":"I want to get involved in local events.","exRu":"Я хочу участвовать в местных мероприятиях."},{"en":"get lost","ru":"потеряться","ex":"Save the map so we don’t get lost.","exRu":"Сохрани карту, чтобы мы не заблудились."},{"en":"get lucky","ru":"повезти","ex":"Sometimes you just get lucky.","exRu":"Иногда тебе просто везёт."},{"en":"get me wrong","ru":"неправильно понять","ex":"Please don’t get me wrong.","exRu":"Пожалуйста, не пойми меня неправильно."},{"en":"get over","ru":"пережить","ex":"She struggled to get over the breakup.","exRu":"Ей было трудно пережить расставание."},{"en":"get rejected","ru":"получить отказ","ex":"Don’t be afraid to get rejected.","exRu":"Не бойся получить отказ."},{"en":"get stuck","ru":"застрять","ex":"Call me if you get stuck.","exRu":"Позвони мне, если застрянешь."},{"en":"get tangled","ru":"запутаться","ex":"Earphone wires always get tangled.","exRu":"Провода наушников всегда запутываются."},{"en":"get tired","ru":"уставать","ex":"I get tired after long meetings.","exRu":"Я устаю после долгих встреч."},{"en":"get used to","ru":"привыкать","ex":"It takes time to get used to the heat.","exRu":"Нужно время, чтобы привыкнуть к жаре."},{"en":"getting used to","ru":"привыкание","ex":"I’m still getting used to my new job.","exRu":"Я всё ещё привыкаю к новой работе."},{"en":"girly","ru":"девчачий","ex":"She loves bright, girly colors.","exRu":"Она любит яркие девчачьи цвета."},{"en":"girly thing","ru":"девчачья штука","ex":"Pink isn’t only a girly thing.","exRu":"Розовый — не только для девочек."},{"en":"give a chance","ru":"дать шанс","ex":"Please give a chance to the new intern.","exRu":"Пожалуйста, дай новому стажёру шанс."},{"en":"give a lift","ru":"подвезти","ex":"Could you give a lift to Maya?","exRu":"Можешь подвезти Майю?"},{"en":"give an explanation","ru":"давать объяснение","ex":"You need to give an explanation.","exRu":"Тебе нужно всё объяснить."},{"en":"give up","ru":"бросить, сдаться","ex":"Don’t give up after one bad day.","exRu":"Не сдавайся после одного плохого дня."},{"en":"go bananas","ru":"сходить с ума","ex":"The kids go bananas over ice cream.","exRu":"Дети сходят с ума от мороженого."},{"en":"go bananas / nuts / crazy","ru":"сходить с ума","ex":"The crowd will go bananas.","exRu":"Толпа просто сойдёт с ума."},{"en":"go beyond responsibilities","ru":"выйти за рамки обязанностей","ex":"Teams can go beyond responsibilities.","exRu":"Команды могут выходить за рамки обязанностей."},{"en":"go crazy","ru":"сходить с ума","ex":"I’ll go crazy if this noise continues.","exRu":"Я сойду с ума, если этот шум не прекратится."},{"en":"go crazy / bananas","ru":"сходить с ума","ex":"The fans will go crazy tonight.","exRu":"Сегодня фанаты будут в полном восторге."},{"en":"go nuts","ru":"сходить с ума","ex":"Try not to go nuts over the delay.","exRu":"Постарайся не сходить с ума из-за задержки."},{"en":"go on vacation","ru":"отправиться в отпуск","ex":"We hope to go on vacation in June.","exRu":"Мы надеемся поехать в отпуск в июне."},{"en":"go through a difficult time","ru":"переживать сложный период","ex":"We all go through a difficult time.","exRu":"Все мы переживаем трудные времена."},{"en":"go through life with","ru":"прожить жизнь с; идти по жизни вместе с","ex":"I want to go through life with curiosity.","exRu":"Я хочу идти по жизни с любопытством."},{"en":"god is watching","ru":"бог видит","ex":"Be kind; God is watching.","exRu":"Будь добрее: Бог всё видит."},{"en":"going to","ru":"собираться","ex":"We’re going to cook at home tonight.","exRu":"Сегодня вечером мы будем готовить дома."},{"en":"gonna","ru":"собираюсь (разг. от going to)","ex":"I’m gonna call her after work.","exRu":"Я позвоню ей после работы."},{"en":"good at","ru":"хорош в","ex":"My sister is good at fixing things.","exRu":"Моя сестра хорошо умеет всё чинить."},{"en":"good enough","ru":"достаточно хорошо","ex":"Your first draft is good enough.","exRu":"Твой первый черновик вполне хорош."},{"en":"good for you","ru":"молодец","ex":"You finished the course—good for you.","exRu":"Ты закончил курс — молодец."},{"en":"gotta","ru":"надо (разг. от have got to)","ex":"I gotta leave before the traffic starts.","exRu":"Мне пора идти, пока не начались пробки."},{"en":"gradually","ru":"постепенно","ex":"The pain gradually disappeared.","exRu":"Боль постепенно прошла."},{"en":"graduate","ru":"окончить университет","ex":"I hope to graduate next spring.","exRu":"Надеюсь выпуститься следующей весной."},{"en":"grey and dull","ru":"серый и унылый","ex":"The whole city looked grey and dull.","exRu":"Весь город выглядел серым и унылым."},{"en":"gross","ru":"противный","ex":"This old sponge smells gross.","exRu":"Эта старая губка мерзко пахнет."},{"en":"grow apart","ru":"отдалиться","ex":"Friends sometimes grow apart.","exRu":"Иногда друзья отдаляются друг от друга."},{"en":"grow up","ru":"вырасти","ex":"I want my kids to grow up near nature.","exRu":"Я хочу, чтобы мои дети росли рядом с природой."},{"en":"guess","ru":"гадать, полагать","ex":"Can you guess what I bought?","exRu":"Угадаешь, что я купил?"},{"en":"guilty","ru":"виновный","ex":"I felt guilty about missing her party.","exRu":"Я винил себя за то, что пропустил её вечеринку."},{"en":"hand in","ru":"сдавать","ex":"Please hand in your form by Friday.","exRu":"Пожалуйста, сдай форму до пятницы."},{"en":"hand over","ru":"передать","ex":"You must hand over your passport.","exRu":"Вы должны передать свой паспорт."},{"en":"handle","ru":"справляться","ex":"She can handle difficult customers.","exRu":"Она умеет работать с трудными клиентами."},{"en":"hang out","ru":"проводить время вместе","ex":"We often hang out after work.","exRu":"Мы часто проводим время вместе после работы."},{"en":"hard for him","ru":"ему было тяжело","ex":"Moving away was hard for him.","exRu":"Переезд дался ему нелегко."},{"en":"hard on yourself","ru":"строг к себе","ex":"Don’t be so hard on yourself.","exRu":"Не будь к себе так строг."},{"en":"hardly","ru":"едва, почти не","ex":"I could hardly hear her.","exRu":"Я едва её слышал."},{"en":"hardly notice","ru":"едва заметить","ex":"You’ll hardly notice the small scar.","exRu":"Ты почти не заметишь маленький шрам."},{"en":"have a desire","ru":"иметь желание","ex":"I have a desire to see the world.","exRu":"Я хочу увидеть мир."},{"en":"have a discussion","ru":"проводить обсуждение","ex":"Let’s have a discussion after lunch.","exRu":"Давайте обсудим это после обеда."},{"en":"have a point","ru":"быть правым, иметь смысл","ex":"You have a point about the cost.","exRu":"Насчёт цены ты прав."},{"en":"have an influence on","ru":"влиять на","ex":"Friends have an influence on our choices.","exRu":"Друзья влияют на наш выбор."},{"en":"have some rest","ru":"отдохнуть","ex":"You look tired; go have some rest.","exRu":"Ты выглядишь уставшим, пойди отдохни."},{"en":"have you ever","ru":"ты когда-нибудь…?","ex":"Have you ever missed a flight?","exRu":"Ты когда-нибудь опаздывал на самолёт?"},{"en":"head back","ru":"вернуться","ex":"We should head back before dark.","exRu":"Нам стоит вернуться до темноты."},{"en":"head out","ru":"отправиться","ex":"Let’s head out after breakfast.","exRu":"Давай отправимся после завтрака."},{"en":"height","ru":"высота","ex":"I’m scared of that height.","exRu":"Я боюсь такой высоты."},{"en":"help yourself","ru":"угощайся","ex":"Please help yourself to some cake.","exRu":"Угощайся пирогом."},{"en":"hilarious","ru":"уморительный","ex":"That video was absolutely hilarious.","exRu":"Это видео было невероятно смешным."},{"en":"hire","ru":"нанимать","ex":"We need to hire another designer.","exRu":"Нам нужно нанять ещё одного дизайнера."},{"en":"hit it off","ru":"сразу поладить","ex":"We really hit it off at the party.","exRu":"На вечеринке мы сразу нашли общий язык."},{"en":"hold back","ru":"сдерживать","ex":"Don’t let fear hold back your career.","exRu":"Не позволяй страху мешать твоей карьере."},{"en":"homemade","ru":"домашний","ex":"I brought some homemade cookies.","exRu":"Я принёс домашнее печенье."},{"en":"horrible","ru":"ужасный","ex":"I had a horrible headache yesterday.","exRu":"Вчера у меня ужасно болела голова."},{"en":"horrible things","ru":"ужасные вещи","ex":"Nobody should say such horrible things.","exRu":"Никому не следует говорить такие ужасные вещи."},{"en":"horror / horrible","ru":"ужас / ужасный","ex":"We watched a horror movie last night.","exRu":"Вчера вечером мы смотрели фильм ужасов."},{"en":"hot","ru":"горячий; жаркий; сексуально привлекательный","ex":"Be careful—the soup is hot.","exRu":"Осторожно, суп горячий."},{"en":"how come","ru":"как так?","ex":"How come you’re home so early?","exRu":"Почему ты так рано дома?"},{"en":"huge fan","ru":"большой фанат","ex":"I’m a huge fan of this little café.","exRu":"Мне очень нравится это маленькое кафе."},{"en":"I am ok with this","ru":"меня это устраивает","ex":"I am ok with this.","exRu":"Меня это устраивает."},{"en":"I can relate","ru":"я понимаю / мне знакомо","ex":"I can relate to that feeling.","exRu":"Мне знакомо это чувство."},{"en":"I don't like it either","ru":"мне тоже не нравится","ex":"I don't like it either.","exRu":"Мне это тоже не нравится."},{"en":"I doubt that","ru":"сомневаюсь","ex":"I doubt that.","exRu":"Я в этом сомневаюсь."},{"en":"I hope so","ru":"надеюсь","ex":"I hope so.","exRu":"Надеюсь."},{"en":"I know, right?","ru":"вот именно!; да уж!","ex":"I know, right?","exRu":"Вот именно, да?"},{"en":"I like it too","ru":"мне тоже нравится","ex":"I like it too.","exRu":"Мне это тоже нравится."},{"en":"I think so","ru":"я так думаю","ex":"I think so.","exRu":"Думаю, да."},{"en":"I'd like not to","ru":"я бы не хотел","ex":"I'd like not to discuss it today.","exRu":"Я бы предпочёл сегодня это не обсуждать."},{"en":"I'd rather","ru":"я бы предпочёл","ex":"I'd rather stay home tonight.","exRu":"Я бы лучше остался сегодня дома."},{"en":"I'm fed up","ru":"мне надоело","ex":"I'm fed up with this traffic.","exRu":"Мне надоели эти пробки."},{"en":"I'm full","ru":"я сыт","ex":"I'm full, thank you.","exRu":"Спасибо, я наелся."},{"en":"ill","ru":"больной","ex":"She became ill during the trip.","exRu":"Во время поездки она заболела."},{"en":"imagine doing","ru":"представлять","ex":"Imagine doing this job without a laptop.","exRu":"Представь, каково делать эту работу без ноутбука."},{"en":"immediately","ru":"немедленно","ex":"Please call me immediately.","exRu":"Пожалуйста, позвони мне немедленно."},{"en":"impede","ru":"препятствовать","ex":"Heavy traffic may impede our progress.","exRu":"Сильные пробки могут замедлить наше продвижение."},{"en":"implement","ru":"внедрять","ex":"We’ll implement the new plan tomorrow.","exRu":"Завтра мы внедрим новый план."},{"en":"implementation","ru":"внедрение","ex":"The implementation went smoothly.","exRu":"Внедрение прошло гладко."},{"en":"impression","ru":"впечатление","ex":"Her kindness made a strong impression.","exRu":"Её доброта произвела сильное впечатление."},{"en":"improve","ru":"улучшать","ex":"Daily walks can improve your mood.","exRu":"Ежедневные прогулки могут улучшить настроение."},{"en":"improvement","ru":"улучшение","ex":"I can see a real improvement.","exRu":"Я вижу реальное улучшение."},{"en":"in advance","ru":"заранее","ex":"Book your tickets in advance.","exRu":"Забронируй билеты заранее."},{"en":"in fact","ru":"на самом деле","ex":"In fact, I’ve already finished.","exRu":"На самом деле я уже закончил."},{"en":"in good shape","ru":"в хорошей форме","ex":"This old bike is still in good shape.","exRu":"Этот старый велосипед всё ещё в хорошем состоянии."},{"en":"in my circle","ru":"в моём кругу","ex":"Remote work is common in my circle.","exRu":"В моём кругу многие работают удалённо."},{"en":"in order to","ru":"чтобы; для того чтобы","ex":"I left early in order to catch the bus.","exRu":"Я вышел пораньше, чтобы успеть на автобус."},{"en":"in order to / to","ru":"чтобы","ex":"I called in order to confirm the time.","exRu":"Я позвонил, чтобы уточнить время."},{"en":"in the age of","ru":"в эпоху","ex":"We work online in the age of apps.","exRu":"В эпоху приложений мы работаем онлайн."},{"en":"in the morning","ru":"утром","ex":"I’ll call you in the morning.","exRu":"Я позвоню тебе утром."},{"en":"in the shadow","ru":"в тени","ex":"We rested in the shadow of a tree.","exRu":"Мы отдыхали в тени дерева."},{"en":"in time","ru":"вовремя (к сроку)","ex":"We arrived in time for dinner.","exRu":"Мы успели к ужину."},{"en":"independent","ru":"независимый","ex":"She became independent at eighteen.","exRu":"В восемнадцать лет она стала самостоятельной."},{"en":"independently","ru":"независимо","ex":"He completed the task independently.","exRu":"Он самостоятельно выполнил задание."},{"en":"informed decision","ru":"взвешенное решение","ex":"Facts help us make an informed decision.","exRu":"Факты помогают принять взвешенное решение."},{"en":"initially","ru":"изначально","ex":"Initially, I found the job difficult.","exRu":"Сначала работа казалась мне сложной."},{"en":"insects","ru":"насекомые","ex":"Keep the window shut to stop insects.","exRu":"Закрой окно, чтобы не залетели насекомые."},{"en":"instant coffee","ru":"растворимый кофе","ex":"I made instant coffee at the hotel.","exRu":"В отеле я заварил растворимый кофе."},{"en":"instead","ru":"вместо","ex":"Let’s walk instead.","exRu":"Давай лучше пойдём пешком."},{"en":"instead of","ru":"вместо","ex":"We cooked instead of ordering food.","exRu":"Мы приготовили еду сами, а не стали заказывать."},{"en":"intention","ru":"намерение","ex":"I had no intention of staying late.","exRu":"Я вовсе не собирался задерживаться."},{"en":"interested in","ru":"интересоваться","ex":"She’s interested in modern art.","exRu":"Она интересуется современным искусством."},{"en":"into art","ru":"увлекаюсь искусством","ex":"My youngest daughter is really into art.","exRu":"Моя младшая дочь очень увлекается искусством."},{"en":"invariably","ru":"неизменно","ex":"He invariably arrives five minutes late.","exRu":"Он неизменно опаздывает на пять минут."},{"en":"issue","ru":"проблема, вопрос","ex":"We need to discuss one small issue.","exRu":"Нам нужно обсудить один небольшой вопрос."},{"en":"it doesn't matter","ru":"неважно","ex":"It doesn't matter.","exRu":"Это неважно."},{"en":"it seems","ru":"кажется","ex":"It seems we took the wrong turn.","exRu":"Похоже, мы свернули не туда."},{"en":"it took me","ru":"у меня ушло","ex":"It took me an hour to get home.","exRu":"Я добирался домой целый час."},{"en":"it was a pleasure","ru":"это было приятно; рад был помочь","ex":"It was a pleasure to meet you.","exRu":"Было приятно познакомиться."},{"en":"it's pleasant","ru":"приятно","ex":"It's pleasant to sit outside at dusk.","exRu":"В сумерках приятно посидеть на улице."},{"en":"i’d rather (think)","ru":"я бы скорее","ex":"I’d rather think before I answer.","exRu":"Я бы предпочёл подумать перед ответом."},{"en":"jealous","ru":"ревнивый","ex":"I felt jealous of her long vacation.","exRu":"Я завидовал её долгому отпуску."},{"en":"job interview","ru":"собеседование","ex":"My job interview starts at ten.","exRu":"Моё собеседование начинается в десять."},{"en":"journaling","ru":"ведение дневника","ex":"Journaling helps me clear my mind.","exRu":"Дневник помогает мне привести мысли в порядок."},{"en":"joy","ru":"радость","ex":"Her visit brought us so much joy.","exRu":"Её визит принёс нам столько радости."},{"en":"just in time","ru":"как раз вовремя","ex":"We reached the gate just in time.","exRu":"Мы добрались до выхода как раз вовремя."},{"en":"keep a promise","ru":"сдержать обещание","ex":"It’s important to keep a promise.","exRu":"Важно держать обещания."},{"en":"keep doing","ru":"продолжать","ex":"Keep doing what works for you.","exRu":"Продолжай делать то, что тебе помогает."},{"en":"keep in touch","ru":"поддерживать связь","ex":"Let’s keep in touch after the trip.","exRu":"Давай не терять связь после поездки."},{"en":"keep it with you","ru":"держать при себе","ex":"Take your passport and keep it with you.","exRu":"Возьми паспорт и держи его при себе."},{"en":"keep silent","ru":"молчать","ex":"I chose to keep silent in the meeting.","exRu":"На встрече я решил промолчать."},{"en":"keep up with","ru":"идти в ногу с","ex":"I can’t keep up with all these messages.","exRu":"Я не успеваю читать все эти сообщения."},{"en":"keep up with trends","ru":"следовать трендам","ex":"Brands try to keep up with trends.","exRu":"Бренды стараются идти в ногу с трендами."},{"en":"keeps silent","ru":"молчит","ex":"He keeps silent when he feels hurt.","exRu":"Когда ему больно, он молчит."},{"en":"killjoy","ru":"человек, портящий настроение","ex":"Don’t be a killjoy; join the game.","exRu":"Не порть всем веселье, присоединяйся к игре."},{"en":"kinda","ru":"вроде как","ex":"I’m kinda tired today.","exRu":"Я сегодня немного устал."},{"en":"lack","ru":"нехватка; не хватать","ex":"A lack of sleep affects my mood.","exRu":"Недостаток сна влияет на моё настроение."},{"en":"lack time","ru":"не хватает времени","ex":"Busy parents often lack time to rest.","exRu":"Занятым родителям часто не хватает времени на отдых."},{"en":"lacks choices","ru":"не хватает выбора","ex":"This menu lacks choices for vegans.","exRu":"В этом меню мало блюд для веганов."},{"en":"lash extension","ru":"наращивание ресниц","ex":"I booked a lash extension for Friday.","exRu":"Я записалась на наращивание ресниц на пятницу."},{"en":"lately","ru":"в последнее время","ex":"I’ve been sleeping badly lately.","exRu":"В последнее время я плохо сплю."},{"en":"lead","ru":"руководить","ex":"Maya will lead today’s meeting.","exRu":"Майя проведёт сегодняшнюю встречу."},{"en":"lead to","ru":"приводить к","ex":"Small errors can lead to big delays.","exRu":"Мелкие ошибки могут привести к большим задержкам."},{"en":"learn / find out","ru":"узнать","ex":"I hope to learn the truth today.","exRu":"Надеюсь сегодня узнать правду."},{"en":"learn from mistakes","ru":"учиться на ошибках","ex":"Good leaders learn from mistakes.","exRu":"Хорошие лидеры учатся на ошибках."},{"en":"leave Da Nang for HCMC","ru":"уезжать из Дананга в Хошимин","ex":"We leave Da Nang for HCMC tomorrow.","exRu":"Завтра мы уезжаем из Дананга в Хошимин."},{"en":"leave for","ru":"уезжать в","ex":"I need to leave for work by eight.","exRu":"Мне нужно выйти на работу до восьми."},{"en":"leave Vietnam","ru":"уехать из Вьетнама","ex":"They plan to leave Vietnam in May.","exRu":"Они планируют уехать из Вьетнама в мае."},{"en":"let go of","ru":"отпустить","ex":"It’s time to let go of that anger.","exRu":"Пора отпустить этот гнев."},{"en":"let someone down","ru":"подвести кого-то","ex":"I never want to let someone down.","exRu":"Я никого не хочу подводить."},{"en":"likely","ru":"вероятно","ex":"Rain is likely this afternoon.","exRu":"Днём, скорее всего, пойдёт дождь."},{"en":"likely to happen","ru":"вероятно случится","ex":"Another delay is likely to happen.","exRu":"Вероятно, будет ещё одна задержка."},{"en":"likely to move","ru":"скорее всего перееду","ex":"We’re likely to move next year.","exRu":"Скорее всего, в следующем году мы переедем."},{"en":"link between","ru":"связующее звено между","ex":"We see a link between sleep and mood.","exRu":"Мы видим связь между сном и настроением."},{"en":"little by little","ru":"мало-помалу","ex":"Little by little, the room felt like home.","exRu":"Постепенно комната стала казаться родной."},{"en":"long-lasting","ru":"длительный, долговечный","ex":"We built a long-lasting friendship.","exRu":"Мы построили крепкую дружбу на долгие годы."},{"en":"long-lasting impression","ru":"неизгладимое впечатление","ex":"Her speech left a long-lasting impression.","exRu":"Её речь оставила неизгладимое впечатление."},{"en":"look around","ru":"осматривать","ex":"Take some time to look around.","exRu":"Не спеша осмотрись вокруг."},{"en":"look at","ru":"смотреть на","ex":"Let’s look at the map again.","exRu":"Давай ещё раз посмотрим на карту."},{"en":"look forward to","ru":"с нетерпением ждать","ex":"I look forward to our weekend away.","exRu":"Я с нетерпением жду нашей поездки на выходные."},{"en":"look up","ru":"искать (в словаре/справочнике); поднять взгляд","ex":"I’ll look up the address online.","exRu":"Я найду адрес в интернете."},{"en":"lucky","ru":"везучий","ex":"We were lucky to catch the last train.","exRu":"Нам повезло успеть на последний поезд."},{"en":"luxurious","ru":"роскошный","ex":"The hotel room felt luxurious.","exRu":"Номер в отеле казался роскошным."},{"en":"make a commitment","ru":"взять обязательство","ex":"I’m ready to make a commitment.","exRu":"Я готов взять на себя обязательство."},{"en":"make a decision","ru":"принять решение","ex":"We need to make a decision today.","exRu":"Нам нужно принять решение сегодня."},{"en":"make a judgement","ru":"выносить суждение","ex":"Don’t make a judgement too quickly.","exRu":"Не суди слишком поспешно."},{"en":"make a request","ru":"сделать запрос","ex":"You can make a request at reception.","exRu":"С просьбой можно обратиться на стойку регистрации."},{"en":"make a suggestion","ru":"делать предложение","ex":"May I make a suggestion?","exRu":"Можно кое-что предложить?"},{"en":"make an effort","ru":"прилагать усилия","ex":"Please make an effort to arrive early.","exRu":"Пожалуйста, постарайся прийти пораньше."},{"en":"make an excuse","ru":"оправдаться","ex":"Don’t make an excuse; tell the truth.","exRu":"Не оправдывайся, скажи правду."},{"en":"make assumptions","ru":"делать предположения","ex":"It’s risky to make assumptions.","exRu":"Строить догадки рискованно."},{"en":"make conclusions","ru":"делать выводы","ex":"We need more facts to make conclusions.","exRu":"Для выводов нам нужно больше фактов."},{"en":"make ends meet","ru":"сводить концы с концами","ex":"They work two jobs to make ends meet.","exRu":"Они берут две работы, чтобы свести концы с концами."},{"en":"make it","ru":"справиться, добиться","ex":"Hurry, or we won’t make it.","exRu":"Поторопись, иначе мы не успеем."},{"en":"make it / survive","ru":"справиться / выжить","ex":"I know you can make it.","exRu":"Я знаю, ты справишься."},{"en":"make it clear","ru":"ясно объяснить","ex":"Let me make it clear: I support you.","exRu":"Скажу прямо: я тебя поддерживаю."},{"en":"make money","ru":"зарабатывать деньги","ex":"She sells art online to make money.","exRu":"Она продаёт картины онлайн, чтобы заработать."},{"en":"make preserves","ru":"делать заготовки","ex":"We make preserves every autumn.","exRu":"Каждую осень мы делаем домашние заготовки."},{"en":"make progress","ru":"добиваться прогресса","ex":"A daily routine helps me make progress.","exRu":"Ежедневный распорядок помогает мне двигаться вперёд."},{"en":"make the most of","ru":"максимально использовать","ex":"Let’s make the most of our day off.","exRu":"Давай проведём выходной с максимальной пользой."},{"en":"make up","ru":"макияж; мириться","ex":"They argued but soon chose to make up.","exRu":"Они поссорились, но вскоре решили помириться."},{"en":"manage to","ru":"суметь, успешно сделать","ex":"Did you manage to catch the bus?","exRu":"Тебе удалось успеть на автобус?"},{"en":"management","ru":"управление","ex":"Good time management reduces stress.","exRu":"Грамотное управление временем снижает стресс."},{"en":"manager","ru":"менеджер","ex":"My manager approved my day off.","exRu":"Руководитель одобрил мой выходной."},{"en":"manually","ru":"вручную","ex":"I entered every address manually.","exRu":"Я вручную ввёл каждый адрес."},{"en":"married","ru":"женатый / замужняя","ex":"They’ve been married for ten years.","exRu":"Они женаты уже десять лет."},{"en":"match","ru":"совпадать; подходить","ex":"These curtains match the sofa.","exRu":"Эти шторы подходят к дивану."},{"en":"maternity leave","ru":"декретный отпуск","ex":"She is on maternity leave until June.","exRu":"Она в декрете до июня."},{"en":"mature","ru":"зрелый; взрослеть","ex":"He’s mature enough to decide for himself.","exRu":"Он достаточно взрослый, чтобы решить самому."},{"en":"meet commitments","ru":"выполнять договорённости","ex":"Good planning helps us meet commitments.","exRu":"Планирование помогает нам выполнять обязательства."},{"en":"meet deadlines","ru":"укладываться в сроки","ex":"This calendar helps me meet deadlines.","exRu":"Этот календарь помогает мне соблюдать сроки."},{"en":"meet expectations","ru":"соответствовать ожиданиям","ex":"The hotel didn’t meet expectations.","exRu":"Отель не оправдал ожиданий."},{"en":"meet society's expectations","ru":"соответствовать ожиданиям общества","ex":"We try to meet society's expectations.","exRu":"Мы стараемся соответствовать ожиданиям общества."},{"en":"meet up","ru":"встретиться","ex":"Let’s meet up for coffee tomorrow.","exRu":"Давай завтра встретимся за чашкой кофе."},{"en":"mention","ru":"упомянуть","ex":"Did she mention the new deadline?","exRu":"Она упомянула новый срок?"},{"en":"mess up","ru":"напортачить","ex":"I’m afraid I’ll mess up the presentation.","exRu":"Боюсь провалить презентацию."},{"en":"message is sent","ru":"сообщение отправлено","ex":"A check appears when the message is sent.","exRu":"После отправки сообщения появляется галочка."},{"en":"mind doing","ru":"быть не против","ex":"Would you mind doing the dishes?","exRu":"Ты не мог бы помыть посуду?"},{"en":"mind-blowing","ru":"сногсшибательный","ex":"The view from the top was mind-blowing.","exRu":"Вид с вершины просто поразил воображение."},{"en":"miss doing","ru":"скучать по","ex":"I miss doing yoga with my friends.","exRu":"Мне не хватает занятий йогой с друзьями."},{"en":"mistake","ru":"ошибка","ex":"Everyone makes a mistake sometimes.","exRu":"Все иногда совершают ошибки."},{"en":"misunderstanding","ru":"недопонимание","ex":"A text caused the misunderstanding.","exRu":"Сообщение стало причиной недоразумения."},{"en":"mixed feelings","ru":"смешанные чувства","ex":"I have mixed feelings about moving.","exRu":"У меня смешанные чувства насчёт переезда."},{"en":"money is being earned","ru":"деньги зарабатываются","ex":"Money is being earned online.","exRu":"Деньги зарабатывают онлайн."},{"en":"monitor","ru":"контролировать","ex":"We monitor the budget each week.","exRu":"Мы проверяем бюджет каждую неделю."},{"en":"mood swings","ru":"перепады настроения","ex":"Lack of sleep causes my mood swings.","exRu":"Из-за недосыпа у меня скачет настроение."},{"en":"most of","ru":"большая часть","ex":"I spent most of Sunday reading.","exRu":"Большую часть воскресенья я читал."},{"en":"mould","ru":"плесень","ex":"There’s mould around the bathroom window.","exRu":"Вокруг окна в ванной появилась плесень."},{"en":"move in","ru":"въехать","ex":"We can move in next Saturday.","exRu":"Мы можем въехать в следующую субботу."},{"en":"move out","ru":"съехать","ex":"Our neighbors plan to move out.","exRu":"Наши соседи собираются съехать."},{"en":"move up","ru":"продвигаться по карьерной лестнице","ex":"She hopes to move up at work.","exRu":"Она надеется продвинуться по службе."},{"en":"movement","ru":"движение","ex":"The camera detected movement outside.","exRu":"Камера зафиксировала движение снаружи."},{"en":"my pleasure","ru":"пожалуйста / «моё удовольствие»","ex":"It was my pleasure to help.","exRu":"Мне было приятно помочь."},{"en":"my state","ru":"моё состояние","ex":"A short walk improved my state of mind.","exRu":"Короткая прогулка улучшила моё душевное состояние."},{"en":"mysterious","ru":"загадочный","ex":"A mysterious package arrived today.","exRu":"Сегодня пришла загадочная посылка."},{"en":"nail","ru":"ноготь","ex":"I broke a nail while opening the box.","exRu":"Открывая коробку, я сломала ноготь."},{"en":"nail (finger)","ru":"ноготь","ex":"I painted each nail bright red.","exRu":"Я накрасила каждый ноготь ярко-красным."},{"en":"nail (metal)","ru":"гвоздь","ex":"Use a nail to hang the picture.","exRu":"Повесь картину на гвоздь."},{"en":"nail it","ru":"сделать на отлично","ex":"Practice once more, and you’ll nail it.","exRu":"Потренируйся ещё раз — и всё получится."},{"en":"negative attitude","ru":"негативное отношение","ex":"His negative attitude affects the team.","exRu":"Его негативный настрой влияет на команду."},{"en":"neighborhood","ru":"район, соседство","ex":"Our neighborhood is quiet at night.","exRu":"По ночам в нашем районе тихо."},{"en":"nervous","ru":"нервный","ex":"I always get nervous before flying.","exRu":"Я всегда нервничаю перед полётом."},{"en":"never","ru":"никогда","ex":"I’ve never seen snow.","exRu":"Я никогда не видел снега."},{"en":"never thought I would","ru":"никогда не думал, что","ex":"I never thought I would enjoy running.","exRu":"Не думал, что мне понравится бегать."},{"en":"no doubt","ru":"без сомнения","ex":"There’s no doubt she earned the role.","exRu":"Несомненно, она заслужила эту должность."},{"en":"no excuses","ru":"без оправданий","ex":"The coach said, no excuses today.","exRu":"Тренер сказал: сегодня без оправданий."},{"en":"no idea / no clue","ru":"понятия не имею","ex":"I have no idea where my keys are.","exRu":"Понятия не имею, где мои ключи."},{"en":"no strength","ru":"нет сил","ex":"After the flu, I had no strength.","exRu":"После гриппа у меня совсем не было сил."},{"en":"no worries","ru":"не переживай","ex":"No worries, I can wait.","exRu":"Не переживай, я могу подождать."},{"en":"not worth it","ru":"не стоит того","ex":"The long drive is not worth it.","exRu":"Такая долгая поездка того не стоит."},{"en":"notice","ru":"замечать","ex":"Did you notice her new haircut?","exRu":"Ты заметил её новую стрижку?"},{"en":"obsessed with","ru":"одержим","ex":"My kids are obsessed with that game.","exRu":"Мои дети помешаны на этой игре."},{"en":"obstacle","ru":"препятствие","ex":"Cost is the main obstacle for us.","exRu":"Главное препятствие для нас — стоимость."},{"en":"obviously","ru":"очевидно","ex":"He was obviously tired after the flight.","exRu":"После перелёта он явно устал."},{"en":"off season","ru":"несезон","ex":"Hotels are cheaper in the off season.","exRu":"В низкий сезон отели дешевле."},{"en":"ok with","ru":"нормально относиться к","ex":"Are you ok with eating outside?","exRu":"Ты не против поесть на улице?"},{"en":"on purpose","ru":"намеренно","ex":"I didn’t spill it on purpose.","exRu":"Я пролил это не нарочно."},{"en":"on time","ru":"вовремя","ex":"For once, the train arrived on time.","exRu":"Хоть раз поезд пришёл вовремя."},{"en":"once in my life","ru":"однажды в жизни","ex":"Once in my life, I took a real risk.","exRu":"Однажды в жизни я по-настоящему рискнул."},{"en":"open up","ru":"открыться, рассказать о чувствах","ex":"It took time for him to open up.","exRu":"Ему понадобилось время, чтобы раскрыться."},{"en":"open-minded","ru":"открытый новому","ex":"Try to stay open-minded about the idea.","exRu":"Постарайся отнестись к этой идее непредвзято."},{"en":"opportunity","ru":"возможность","ex":"This job is a great opportunity.","exRu":"Эта работа — прекрасная возможность."},{"en":"optimize","ru":"оптимизировать","ex":"We need to optimize our morning routine.","exRu":"Нам нужно оптимизировать свой утренний распорядок."},{"en":"options","ru":"варианты","ex":"Let’s review all our options.","exRu":"Давайте рассмотрим все варианты."},{"en":"organize","ru":"организовывать","ex":"I’ll organize the kitchen this weekend.","exRu":"На выходных я наведу порядок на кухне."},{"en":"outcomes","ru":"результаты","ex":"We discussed the possible outcomes.","exRu":"Мы обсудили возможные результаты."},{"en":"oven","ru":"печь","ex":"The bread is still in the oven.","exRu":"Хлеб всё ещё в духовке."},{"en":"overcome","ru":"преодолеть","ex":"Together, we can overcome this setback.","exRu":"Вместе мы справимся с этой неудачей."},{"en":"overcome / get over","ru":"преодолеть / пережить","ex":"She worked hard to overcome her fear.","exRu":"Она упорно трудилась, чтобы преодолеть свой страх."},{"en":"overcome difficulties","ru":"преодолеть трудности","ex":"Friends help us overcome difficulties.","exRu":"Друзья помогают нам преодолевать трудности."},{"en":"overlapping deadlines","ru":"пересекающиеся сроки","ex":"I’m stressed by overlapping deadlines.","exRu":"Я переживаю из-за совпавших дедлайнов."},{"en":"overloaded","ru":"перегруженный","ex":"The washing machine is overloaded.","exRu":"Стиральная машина перегружена."},{"en":"overwhelmed","ru":"ошеломлённый; заваленный (делами)","ex":"I felt overwhelmed by all the choices.","exRu":"Такой выбор меня ошеломил."},{"en":"own up","ru":"признаться","ex":"It’s time to own up to your mistake.","exRu":"Пора признать свою ошибку."},{"en":"pack up","ru":"собрать вещи","ex":"Let’s pack up and leave before dark.","exRu":"Давай соберёмся и уйдём до темноты."},{"en":"packed","ru":"забитый","ex":"The train was packed after the concert.","exRu":"После концерта поезд был переполнен."},{"en":"packing","ru":"собирать вещи","ex":"I finished packing before dinner.","exRu":"Я закончил собирать вещи до ужина."},{"en":"paid maternity leave","ru":"оплачиваемый декретный отпуск","ex":"Her company offers paid maternity leave.","exRu":"Её компания предоставляет оплачиваемый декрет."},{"en":"paid sick leave","ru":"оплачиваемый больничный","ex":"My new job includes paid sick leave.","exRu":"На новой работе у меня есть оплачиваемый больничный."},{"en":"paid vacation","ru":"оплачиваемый отпуск","ex":"All staff receive paid vacation.","exRu":"Всем сотрудникам дают оплачиваемый отпуск."},{"en":"pain in the ass","ru":"заноза в заднице","ex":"This broken printer is a pain in the ass.","exRu":"Этот сломанный принтер — заноза в заднице."},{"en":"participate","ru":"участвовать","ex":"Everyone is welcome to participate.","exRu":"Участвовать могут все желающие."},{"en":"partly","ru":"частично","ex":"The road is partly blocked.","exRu":"Дорога частично перекрыта."},{"en":"partly cloudy","ru":"переменная облачность","ex":"Tomorrow will be partly cloudy.","exRu":"Завтра будет переменная облачность."},{"en":"partner in crime","ru":"закадычный сообщник; напарник по шалостям","ex":"My sister is my favorite partner in crime.","exRu":"Сестра — моя любимая сообщница."},{"en":"passion fruit","ru":"маракуйя","ex":"This passion fruit tastes sweet.","exRu":"Эта маракуйя сладкая на вкус."},{"en":"passionate","ru":"страстный","ex":"She’s passionate about animal welfare.","exRu":"Она всей душой заботится о благополучии животных."},{"en":"passive voice","ru":"страдательный залог","ex":"Put this sentence in the passive voice.","exRu":"Поставь это предложение в пассивный залог."},{"en":"past perfect","ru":"прошедшее совершённое","ex":"We studied the past perfect today.","exRu":"Сегодня мы изучали прошедшее совершённое время."},{"en":"patience","ru":"терпение","ex":"Learning a language takes patience.","exRu":"Изучение языка требует терпения."},{"en":"patient","ru":"терпеливый; пациент","ex":"Please be patient with the new staff.","exRu":"Пожалуйста, будьте терпеливы с новичками."},{"en":"pay attention to","ru":"обращать внимание","ex":"Please pay attention to the road.","exRu":"Пожалуйста, следи за дорогой."},{"en":"pay extra","ru":"доплатить","ex":"We had to pay extra for breakfast.","exRu":"За завтрак нам пришлось доплатить."},{"en":"pay off","ru":"окупиться; выплатить","ex":"All that practice will pay off.","exRu":"Все эти тренировки окупятся."},{"en":"pay off a loan","ru":"погасить кредит","ex":"It took us years to pay off a loan.","exRu":"Нам понадобились годы, чтобы погасить кредит."},{"en":"pay off twice","ru":"окупиться вдвойне","ex":"This small upgrade could pay off twice.","exRu":"Это небольшое улучшение может окупиться вдвойне."},{"en":"peace and quiet","ru":"тишина и покой","ex":"I need some peace and quiet.","exRu":"Мне нужны тишина и покой."},{"en":"peculiarity","ru":"особенность","ex":"That accent is a local peculiarity.","exRu":"Этот акцент — местная особенность."},{"en":"per month","ru":"в месяц","ex":"The gym costs thirty dollars per month.","exRu":"Спортзал стоит тридцать долларов в месяц."},{"en":"perspective","ru":"перспектива; точка зрения","ex":"Travel gave me a new perspective.","exRu":"Путешествия дали мне новый взгляд на мир."},{"en":"pick up","ru":"забрать; подобрать; подхватить","ex":"Can you pick up some milk?","exRu":"Можешь купить молока?"},{"en":"pills / medication","ru":"таблетки / лекарства","ex":"I take these pills after breakfast.","exRu":"Я принимаю эти таблетки после завтрака."},{"en":"pissed off","ru":"взбешён","ex":"She was pissed off about the delay.","exRu":"Она разозлилась из-за задержки."},{"en":"platform","ru":"платформа","ex":"Wait for me on platform six.","exRu":"Жди меня на шестой платформе."},{"en":"pollution","ru":"загрязнение","ex":"Air pollution is bad today.","exRu":"Сегодня сильное загрязнение воздуха."},{"en":"poor","ru":"бедный","ex":"They grew up very poor.","exRu":"Они выросли очень бедными."},{"en":"pop it","ru":"щёлкнуть (поп-ит)","ex":"Press the bubble and pop it.","exRu":"Нажми на пузырёк и лопни его."},{"en":"pop out","ru":"выскочить","ex":"I’ll pop out for some bread.","exRu":"Я ненадолго схожу за хлебом."},{"en":"pop up","ru":"всплыть","ex":"A warning may pop up on your screen.","exRu":"На экране может появиться предупреждение."},{"en":"position","ru":"должность","ex":"She applied for a senior position.","exRu":"Она подала заявку на руководящую должность."},{"en":"postpone doing","ru":"откладывать","ex":"Let’s postpone doing the repairs.","exRu":"Давай отложим ремонт."},{"en":"practice doing","ru":"практиковать","ex":"I practice doing presentations at home.","exRu":"Я тренируюсь проводить презентации дома."},{"en":"prepare for","ru":"готовиться к","ex":"We need to prepare for the storm.","exRu":"Нам нужно подготовиться к буре."},{"en":"pressure","ru":"давление","ex":"I work badly under too much pressure.","exRu":"Под сильным давлением я работаю плохо."},{"en":"pretend","ru":"притворяться","ex":"Don’t pretend you didn’t hear me.","exRu":"Не притворяйся, что не слышал меня."},{"en":"process","ru":"процесс","ex":"Moving house is a tiring process.","exRu":"Переезд — утомительный процесс."},{"en":"project","ru":"проект","ex":"Our new project starts Monday.","exRu":"Наш новый проект начинается в понедельник."},{"en":"project manager","ru":"руководитель проекта","ex":"The project manager called a meeting.","exRu":"Руководитель проекта созвал встречу."},{"en":"promise","ru":"обещать","ex":"I promise I’ll call tonight.","exRu":"Обещаю позвонить сегодня вечером."},{"en":"pronouns","ru":"местоимения","ex":"Today we practiced English pronouns.","exRu":"Сегодня мы практиковали английские местоимения."},{"en":"proposal","ru":"предложение","ex":"The client accepted our proposal.","exRu":"Клиент принял наше предложение."},{"en":"proudest project","ru":"проект, которым больше всего горжусь","ex":"This garden is my proudest project.","exRu":"Этот сад — проект, которым я горжусь больше всего."},{"en":"purpose","ru":"цель, смысл","ex":"This meeting needs a clear purpose.","exRu":"У этой встречи должна быть чёткая цель."},{"en":"put effort","ru":"приложить усилия","ex":"We put effort into every detail.","exRu":"Мы вкладываем силы в каждую деталь."},{"en":"put on hold","ru":"приостановить, отложить","ex":"The repair was put on hold yesterday.","exRu":"Вчера ремонт приостановили."},{"en":"put on music","ru":"включить музыку","ex":"Let’s put on music while we cook.","exRu":"Давай включим музыку, пока готовим."},{"en":"queue","ru":"очередь","ex":"We waited in a long queue.","exRu":"Мы стояли в длинной очереди."},{"en":"quiet","ru":"тихий","ex":"The house is finally quiet.","exRu":"Наконец-то в доме тихо."},{"en":"quit doing","ru":"бросить","ex":"He decided to quit doing night shifts.","exRu":"Он решил больше не работать по ночам."},{"en":"quite","ru":"довольно","ex":"The exam was quite difficult.","exRu":"Экзамен был довольно сложным."},{"en":"radical acceptance","ru":"радикальное принятие","ex":"Therapy taught me radical acceptance.","exRu":"Терапия научила меня радикальному принятию."},{"en":"raise awareness","ru":"повышать осведомлённость","ex":"The event will raise awareness of hunger.","exRu":"Мероприятие привлечёт внимание к проблеме голода."},{"en":"rapidly","ru":"быстро","ex":"The weather changed rapidly.","exRu":"Погода быстро изменилась."},{"en":"rare","ru":"редкий","ex":"Snow is rare in this city.","exRu":"В этом городе снег — редкость."},{"en":"rather rare","ru":"довольно редко","ex":"Such warm winter days are rather rare.","exRu":"Такие тёплые зимние дни довольно редки."},{"en":"reach a goal","ru":"достигать цели","ex":"Small steps help you reach a goal.","exRu":"Маленькие шаги помогают достичь цели."},{"en":"reason","ru":"причина","ex":"There’s a reason I called you.","exRu":"Я позвонил тебе не просто так."},{"en":"recently","ru":"недавно","ex":"We moved here recently.","exRu":"Мы переехали сюда недавно."},{"en":"recommend doing","ru":"рекомендовать","ex":"I recommend doing the tour early.","exRu":"Советую отправиться на экскурсию пораньше."},{"en":"reconsider","ru":"пересмотреть","ex":"The high price made us reconsider.","exRu":"Высокая цена заставила нас передумать."},{"en":"recount","ru":"пересчитать","ex":"Let’s recount the cash together.","exRu":"Давай вместе пересчитаем деньги."},{"en":"redistribute","ru":"перераспределить","ex":"We need to redistribute the workload.","exRu":"Нам нужно перераспределить нагрузку."},{"en":"reduce stress","ru":"снизить стресс","ex":"Daily exercise can reduce stress.","exRu":"Ежедневные упражнения помогают снизить стресс."},{"en":"refuse","ru":"отказать","ex":"I had to refuse their offer.","exRu":"Мне пришлось отказаться от их предложения."},{"en":"refuse / reject","ru":"отказать / отклонить","ex":"She may refuse the invitation.","exRu":"Она может отказаться от приглашения."},{"en":"regret","ru":"сожалеть","ex":"You won’t regret taking this trip.","exRu":"Ты не пожалеешь, если поедешь."},{"en":"regular job","ru":"постоянная работа","ex":"He left music for a regular job.","exRu":"Он бросил музыку ради обычной работы."},{"en":"reject","ru":"отклонить","ex":"The bank may reject our request.","exRu":"Банк может отклонить наш запрос."},{"en":"relate to","ru":"понимать, соотносить с собой","ex":"Many parents can relate to this story.","exRu":"Многим родителям знакома эта история."},{"en":"relate to it","ru":"это мне близко","ex":"I can really relate to it.","exRu":"Мне это очень близко."},{"en":"relatives","ru":"родственники","ex":"We’re visiting relatives this weekend.","exRu":"На выходных мы едем к родственникам."},{"en":"relevant","ru":"релевантный","ex":"Please include only relevant details.","exRu":"Пожалуйста, укажите только важные подробности."},{"en":"rely on","ru":"полагаться на","ex":"I rely on this bus to get to work.","exRu":"Я рассчитываю на этот автобус, чтобы попасть на работу."},{"en":"rely on me","ru":"положись на меня","ex":"You can rely on me.","exRu":"Ты можешь на меня положиться."},{"en":"request","ru":"запрос; запросить","ex":"The hotel accepted our request.","exRu":"Отель выполнил нашу просьбу."},{"en":"resonate with","ru":"резонировать с","ex":"Her words resonate with many people.","exRu":"Её слова находят отклик у многих людей."},{"en":"responsibility","ru":"ответственность","ex":"The dog is my responsibility.","exRu":"Собака — моя ответственность."},{"en":"rest","ru":"отдыхать","ex":"You need to rest after the journey.","exRu":"Тебе нужно отдохнуть после поездки."},{"en":"resting bitch face","ru":"вечно недовольное лицо","ex":"Her resting bitch face scared the intern.","exRu":"Её вечно недовольное лицо напугало стажёра."},{"en":"retreat","ru":"ретрит; отступление","ex":"She booked a quiet yoga retreat.","exRu":"Она забронировала тихий йога-ретрит."},{"en":"return","ru":"возвращаться","ex":"I need to return these shoes.","exRu":"Мне нужно вернуть эти туфли."},{"en":"rich","ru":"богатый","ex":"His family is quite rich.","exRu":"Его семья довольно богата."},{"en":"risk","ru":"риск","ex":"Leaving now is a risk worth taking.","exRu":"Уехать сейчас — риск, на который стоит пойти."},{"en":"risk doing","ru":"рискнуть","ex":"Don’t risk doing the repair alone.","exRu":"Не рискуй делать ремонт в одиночку."},{"en":"role","ru":"роль","ex":"She’s happy in her new role.","exRu":"Она довольна своей новой должностью."},{"en":"rude","ru":"грубый","ex":"It’s rude to interrupt people.","exRu":"Перебивать людей невежливо."},{"en":"run into","ru":"случайно встретить","ex":"I often run into Sam at the market.","exRu":"Я часто встречаю Сэма на рынке."},{"en":"run out of time","ru":"закончиться (о времени); не хватить времени","ex":"We’ll run out of time if we wait.","exRu":"Если будем ждать, у нас кончится время."},{"en":"safe","ru":"безопасный","ex":"Is this area safe after dark?","exRu":"В этом районе безопасно после наступления темноты?"},{"en":"safety","ru":"безопасность","ex":"Your safety matters more than speed.","exRu":"Твоя безопасность важнее скорости."},{"en":"salary","ru":"зарплата","ex":"The new role offers a higher salary.","exRu":"На новой должности зарплата выше."},{"en":"save money","ru":"копить деньги","ex":"Cooking at home helps us save money.","exRu":"Готовя дома, мы экономим деньги."},{"en":"save up","ru":"откладывать","ex":"I’m trying to save up for a laptop.","exRu":"Я пытаюсь накопить на ноутбук."},{"en":"scared","ru":"испуганный","ex":"My son is scared of the dark.","exRu":"Мой сын боится темноты."},{"en":"scared / afraid of","ru":"бояться","ex":"She felt scared during the storm.","exRu":"Во время грозы ей было страшно."},{"en":"scared to","ru":"бояться сделать","ex":"I was scared to speak in public.","exRu":"Я боялся выступать на публике."},{"en":"scene","ru":"сцена","ex":"That final scene made me cry.","exRu":"На финальной сцене я расплакался."},{"en":"second thoughts","ru":"сомнения; мысли передумать","ex":"I’m having second thoughts about moving.","exRu":"Я уже сомневаюсь, стоит ли переезжать."},{"en":"second-guess","ru":"подвергать сомнению","ex":"Try not to second-guess every choice.","exRu":"Не сомневайся в каждом своём решении."},{"en":"see differently","ru":"видеть иначе","ex":"This book made me see differently.","exRu":"Эта книга заставила меня взглянуть на всё иначе."},{"en":"see off","ru":"провожать","ex":"We went to the station to see off Maya.","exRu":"Мы поехали на вокзал проводить Майю."},{"en":"self-sufficient","ru":"самодостаточный","ex":"She wants to be fully self-sufficient.","exRu":"Она хочет быть полностью самостоятельной."},{"en":"sense","ru":"чувство","ex":"I had a strange sense of calm.","exRu":"Я ощутил странное спокойствие."},{"en":"sense of community","ru":"чувство общности","ex":"The neighborhood has a sense of community.","exRu":"В этом районе чувствуется единство жителей."},{"en":"sense of pride","ru":"чувство гордости","ex":"Finishing gave me a sense of pride.","exRu":"Закончив работу, я почувствовал гордость."},{"en":"sense of relief","ru":"чувство облегчения","ex":"I felt a sense of relief after the call.","exRu":"После звонка я почувствовал облегчение."},{"en":"sensitive","ru":"чувствительный","ex":"My skin is sensitive to strong soap.","exRu":"Моя кожа чувствительна к сильному мылу."},{"en":"separate","ru":"разделять, отделять; отдельный","ex":"Keep wet clothes in a separate bag.","exRu":"Сложи мокрую одежду в отдельную сумку."},{"en":"series of books","ru":"серия книг","ex":"She wrote a popular series of books.","exRu":"Она написала популярную серию книг."},{"en":"service fee","ru":"плата за обслуживание","ex":"The bill includes a small service fee.","exRu":"В счёт включена небольшая плата за обслуживание."},{"en":"set myself free","ru":"освободить себя","ex":"I quit the job to set myself free.","exRu":"Я уволился, чтобы обрести свободу."},{"en":"set out","ru":"отправиться в путь","ex":"We set out before sunrise.","exRu":"Мы отправились в путь до восхода солнца."},{"en":"set out for","ru":"отправиться в","ex":"They set out for the coast at dawn.","exRu":"На рассвете они отправились к побережью."},{"en":"set up","ru":"создавать, организовывать, наладить, внедрять","ex":"Can you help me set up the new printer?","exRu":"Поможешь мне настроить новый принтер?"},{"en":"several","ru":"несколько","ex":"I’ve called her several times.","exRu":"Я звонил ей несколько раз."},{"en":"several times","ru":"несколько раз","ex":"We’ve met several times before.","exRu":"Мы уже встречались несколько раз."},{"en":"shade","ru":"тень","ex":"Let’s sit in the shade.","exRu":"Давай сядем в тени."},{"en":"shadow","ru":"тень (от предмета)","ex":"The tree cast a long shadow.","exRu":"Дерево отбрасывало длинную тень."},{"en":"shock","ru":"шокировать","ex":"The final bill may shock you.","exRu":"Итоговый счёт может тебя шокировать."},{"en":"shocking","ru":"шокирующий","ex":"The sudden price rise was shocking.","exRu":"Резкий рост цен оказался шокирующим."},{"en":"shocking moment","ru":"шокирующий момент","ex":"The crash was a shocking moment.","exRu":"Авария стала потрясением."},{"en":"show off","ru":"выпендриваться","ex":"He loves to show off his new car.","exRu":"Он любит хвастаться своей новой машиной."},{"en":"sick leave","ru":"больничный","ex":"I’m on sick leave until Monday.","exRu":"Я на больничном до понедельника."},{"en":"sick of","ru":"достало","ex":"I’m sick of eating the same lunch.","exRu":"Мне надоело есть одно и то же на обед."},{"en":"since","ru":"с; с тех пор как; поскольку","ex":"I’ve lived here since 2020.","exRu":"Я живу здесь с 2020 года."},{"en":"sleep in","ru":"поспать подольше","ex":"I like to sleep in on Sundays.","exRu":"По воскресеньям я люблю поспать подольше."},{"en":"slightly","ru":"слегка","ex":"The window was slightly open.","exRu":"Окно было слегка приоткрыто."},{"en":"slightly unclear","ru":"слегка неясно","ex":"The last instruction is slightly unclear.","exRu":"Последняя инструкция немного непонятна."},{"en":"smart person","ru":"умный человек","ex":"Ask Lena; she’s a smart person.","exRu":"Спроси Лену, она умный человек."},{"en":"smelly","ru":"вонючий","ex":"Take those smelly shoes outside.","exRu":"Вынеси эти вонючие туфли на улицу."},{"en":"smoothly","ru":"гладко","ex":"The move went smoothly.","exRu":"Переезд прошёл гладко."},{"en":"so far","ru":"до настоящего момента","ex":"So far, everything looks good.","exRu":"Пока всё выглядит хорошо."},{"en":"solution","ru":"решение","ex":"We finally found a solution.","exRu":"Мы наконец нашли решение."},{"en":"solution will pop up","ru":"решение всплывёт","ex":"Relax; a solution will pop up.","exRu":"Расслабься, решение само найдётся."},{"en":"solve","ru":"решать","ex":"We need to solve this today.","exRu":"Нам нужно решить это сегодня."},{"en":"solve a conflict","ru":"решить конфликт","ex":"A calm talk can solve a conflict.","exRu":"Спокойный разговор поможет разрешить конфликт."},{"en":"sophomore","ru":"студент второго курса","ex":"My brother is a college sophomore.","exRu":"Мой брат учится на втором курсе колледжа."},{"en":"speak volumes","ru":"многое говорит","ex":"Her tired eyes speak volumes.","exRu":"Её усталые глаза говорят о многом."},{"en":"specification","ru":"спецификация","ex":"Check the product specification first.","exRu":"Сначала проверь характеристики товара."},{"en":"speed up","ru":"ускориться","ex":"We need to speed up the process.","exRu":"Нам нужно ускорить процесс."},{"en":"spend money","ru":"тратить деньги","ex":"I’d rather spend money on travel.","exRu":"Я предпочитаю тратить деньги на путешествия."},{"en":"squeezed","ru":"сжатый","ex":"The pillows were squeezed into one box.","exRu":"Подушки втиснули в одну коробку."},{"en":"stably / consistently","ru":"стабильно","ex":"The app has run stably all week.","exRu":"Приложение всю неделю работало стабильно."},{"en":"stages","ru":"этапы","ex":"The work happens in three stages.","exRu":"Работа проходит в три этапа."},{"en":"stand up to","ru":"противостоять","ex":"You need to stand up to that bully.","exRu":"Тебе нужно дать отпор этому хулигану."},{"en":"standard","ru":"стандарт","ex":"The room meets our usual standard.","exRu":"Номер соответствует нашим обычным стандартам."},{"en":"start from scratch","ru":"начать с нуля","ex":"We had to start from scratch.","exRu":"Нам пришлось начать с нуля."},{"en":"state","ru":"состояние","ex":"The kitchen was in a terrible state.","exRu":"Кухня была в ужасном состоянии."},{"en":"state of desperation","ru":"состояние отчаяния","ex":"She called me in a state of desperation.","exRu":"Она позвонила мне в полном отчаянии."},{"en":"stay focused","ru":"сохранять концентрацию","ex":"Take short breaks to stay focused.","exRu":"Делай короткие перерывы, чтобы не терять концентрацию."},{"en":"stay up","ru":"не ложиться спать","ex":"I can’t stay up late tonight.","exRu":"Сегодня я не могу ложиться поздно."},{"en":"step away","ru":"отойти, дистанцироваться","ex":"It’s okay to step away for a minute.","exRu":"Можно ненадолго отойти."},{"en":"step by step","ru":"шаг за шагом","ex":"We’ll fix it step by step.","exRu":"Мы исправим всё шаг за шагом."},{"en":"step down","ru":"уйти с должности","ex":"The manager agreed to step down.","exRu":"Руководитель согласился уйти с должности."},{"en":"step outside your role","ru":"выйти за рамки роли","ex":"Sometimes you must step outside your role.","exRu":"Иногда нужно выйти за рамки своей роли."},{"en":"stick to","ru":"придерживаться","ex":"Let’s stick to the original budget.","exRu":"Давайте придерживаться первоначального бюджета."},{"en":"stick to a plan","ru":"придерживаться плана","ex":"It’s easier when you stick to a plan.","exRu":"Придерживаться плана проще."},{"en":"stigmatized","ru":"стигматизированный","ex":"Mental illness is still stigmatized.","exRu":"Психические расстройства всё ещё стигматизируют."},{"en":"stigmatized topics","ru":"стигматизированные темы","ex":"We need to discuss stigmatized topics.","exRu":"Нам нужно обсуждать стигматизированные темы."},{"en":"stomach ache","ru":"боль в животе","ex":"I stayed home with a stomach ache.","exRu":"Я остался дома из-за боли в животе."},{"en":"stop over","ru":"сделать остановку в пути","ex":"We’ll stop over in Bangkok for one night.","exRu":"Мы остановимся на ночь в Бангкоке."},{"en":"stove / cooker","ru":"плита; плитка","ex":"The soup is warming on the stove.","exRu":"Суп греется на плите."},{"en":"strength","ru":"сила","ex":"Her kindness is her greatest strength.","exRu":"Доброта — её главная сильная сторона."},{"en":"strict","ru":"строгий","ex":"My parents were quite strict.","exRu":"Мои родители были довольно строгими."},{"en":"strip","ru":"лишать; снимать (одежду); полоска","ex":"Please strip the old paint from the door.","exRu":"Пожалуйста, сними старую краску с двери."},{"en":"strip power","ru":"лишить власти","ex":"The vote could strip power from the mayor.","exRu":"Голосование может лишить мэра полномочий."},{"en":"submit documents","ru":"подавать документы","ex":"You must submit documents by Friday.","exRu":"Вы должны подать документы до пятницы."},{"en":"succeed in","ru":"преуспеть в","ex":"She’ll succeed in her new role.","exRu":"Она добьётся успеха на новой должности."},{"en":"success","ru":"успех","ex":"The event was a huge success.","exRu":"Мероприятие прошло с огромным успехом."},{"en":"successful","ru":"успешный","ex":"Our first market day was successful.","exRu":"Наш первый день на рынке прошёл успешно."},{"en":"suddenly","ru":"неожиданно","ex":"The lights suddenly went out.","exRu":"Свет внезапно погас."},{"en":"suffer from","ru":"страдать от","ex":"Many travelers suffer from jet lag.","exRu":"Многие путешественники страдают от джетлага."},{"en":"suggest","ru":"предлагать","ex":"I suggest taking an earlier train.","exRu":"Предлагаю сесть на более ранний поезд."},{"en":"suggest doing","ru":"предлагать (что-то делать)","ex":"I suggest doing the easy tasks first.","exRu":"Предлагаю сначала выполнить простые задачи."},{"en":"support","ru":"поддерживать","ex":"My family will support my decision.","exRu":"Моя семья поддержит моё решение."},{"en":"suppose","ru":"предполагать","ex":"I suppose we should leave now.","exRu":"Думаю, нам уже пора уходить."},{"en":"surprise","ru":"удивить","ex":"The gift will surprise her.","exRu":"Подарок её удивит."},{"en":"surprisingly","ru":"удивительно","ex":"The test was surprisingly easy.","exRu":"Тест оказался на удивление лёгким."},{"en":"surround","ru":"окружать","ex":"Tall trees surround the cabin.","exRu":"Хижину окружают высокие деревья."},{"en":"surrounded by","ru":"окружён","ex":"The hotel is surrounded by gardens.","exRu":"Отель окружён садами."},{"en":"surroundings","ru":"окружение","ex":"I felt safe in these surroundings.","exRu":"В этом месте я чувствовал себя безопасно."},{"en":"survive","ru":"выжить","ex":"These plants can survive the winter.","exRu":"Эти растения могут пережить зиму."},{"en":"swap","ru":"обмениваться; обмен","ex":"Can we swap seats?","exRu":"Можем поменяться местами?"},{"en":"switch off","ru":"выключить","ex":"Please switch off the lights.","exRu":"Пожалуйста, выключи свет."},{"en":"switch on","ru":"включать","ex":"Could you switch on the fan?","exRu":"Можешь включить вентилятор?"},{"en":"system","ru":"система","ex":"The booking system is down.","exRu":"Система бронирования не работает."},{"en":"take a break","ru":"сделать перерыв","ex":"Let’s take a break and get some air.","exRu":"Давай сделаем перерыв и выйдем подышать."},{"en":"take a chance","ru":"рискнуть","ex":"I decided to take a chance on the job.","exRu":"Я решил рискнуть и согласиться на эту работу."},{"en":"take action","ru":"принять меры","ex":"We need to take action today.","exRu":"Нам нужно действовать сегодня."},{"en":"take control of","ru":"взять под контроль","ex":"It’s time to take control of your budget.","exRu":"Пора взять свой бюджет под контроль."},{"en":"take into account","ru":"учитывать","ex":"Please take into account the extra cost.","exRu":"Пожалуйста, учти дополнительные расходы."},{"en":"take it easy","ru":"не переживать, относиться спокойно","ex":"You look tired, so take it easy.","exRu":"Ты выглядишь уставшим, так что отдохни."},{"en":"take on","ru":"брать на себя (новую роль/обязанности)","ex":"I can’t take on more work this week.","exRu":"На этой неделе я не могу взять больше работы."},{"en":"take over","ru":"перенимать, возглавлять","ex":"Mia will take over while I’m away.","exRu":"Мия заменит меня, пока меня не будет."},{"en":"take part","ru":"участвовать","ex":"Would you like to take part?","exRu":"Хочешь принять участие?"},{"en":"take pictures","ru":"фотографировать","ex":"We stopped to take pictures.","exRu":"Мы остановились, чтобы сделать фотографии."},{"en":"take place","ru":"проходить / происходить","ex":"The meeting will take place upstairs.","exRu":"Встреча пройдёт наверху."},{"en":"take responsibility","ru":"брать ответственность","ex":"He needs to take responsibility.","exRu":"Ему нужно взять на себя ответственность."},{"en":"take seriously","ru":"воспринимать серьезно","ex":"It’s a warning we must take seriously.","exRu":"К этому предупреждению нужно отнестись серьёзно."},{"en":"take the piss","ru":"стебаться","ex":"Are you trying to take the piss?","exRu":"Ты что, издеваешься?"},{"en":"takes a long time","ru":"занимает много времени","ex":"Getting across town takes a long time.","exRu":"Добираться через весь город очень долго."},{"en":"talk over","ru":"обсудить","ex":"We need to talk over the travel plans.","exRu":"Нам нужно обсудить планы поездки."},{"en":"target audience","ru":"целевая аудитория","ex":"Young parents are our target audience.","exRu":"Наша целевая аудитория — молодые родители."},{"en":"tasteless","ru":"безвкусный","ex":"The soup was watery and tasteless.","exRu":"Суп был водянистым и безвкусным."},{"en":"team","ru":"команда","ex":"Our team works well together.","exRu":"Наша команда отлично работает вместе."},{"en":"tell me about yourself","ru":"расскажите о себе","ex":"Tell me about yourself.","exRu":"Расскажите о себе."},{"en":"tend to","ru":"быть склонным","ex":"I tend to wake up early.","exRu":"Обычно я просыпаюсь рано."},{"en":"tend to think","ru":"склонен думать","ex":"I tend to think before I speak.","exRu":"Обычно я думаю, прежде чем говорить."},{"en":"that's what I need","ru":"вот что мне нужно","ex":"That's what I need.","exRu":"Это именно то, что мне нужно."},{"en":"the globe is round","ru":"земля круглая","ex":"The globe is round, not flat.","exRu":"Земной шар круглый, а не плоский."},{"en":"the other day","ru":"на днях","ex":"I saw Nina at the store the other day.","exRu":"На днях я видел Нину в магазине."},{"en":"the thing is","ru":"дело в том","ex":"The thing is, I’m not ready.","exRu":"Дело в том, что я не готов."},{"en":"the way she was treated","ru":"то, как с ней обращались","ex":"I hated the way she was treated.","exRu":"Мне не понравилось, как с ней обращались."},{"en":"these / those","ru":"эти / те","ex":"These shoes are more comfortable.","exRu":"Эти туфли удобнее."},{"en":"thick paper","ru":"плотная бумага","ex":"Print the card on thick paper.","exRu":"Распечатай открытку на плотной бумаге."},{"en":"this / that","ru":"это / то","ex":"This chair is mine.","exRu":"Этот стул мой."},{"en":"thought escapes me","ru":"мысль ускользает","ex":"The thought escapes me whenever I try.","exRu":"Стоит мне попытаться, и мысль ускользает."},{"en":"throw a party","ru":"устроить вечеринку","ex":"Let’s throw a party for her birthday.","exRu":"Давай устроим вечеринку в честь её дня рождения."},{"en":"throw away","ru":"выбрасывать","ex":"Don’t throw away that receipt.","exRu":"Не выбрасывай тот чек."},{"en":"tired of","ru":"уставший от","ex":"I’m tired of waiting for the bus.","exRu":"Мне надоело ждать автобус."},{"en":"to accept","ru":"принять","ex":"I decided to accept the job.","exRu":"Я решил принять предложение о работе."},{"en":"to adjust","ru":"скорректировать, подогнать, адаптировать","ex":"Give your eyes time to adjust.","exRu":"Дай глазам время привыкнуть."},{"en":"to admit","ru":"признать","ex":"He was too proud to admit his mistake.","exRu":"Он был слишком горд, чтобы признать ошибку."},{"en":"to allow","ru":"позволять","ex":"Open the window to allow fresh air in.","exRu":"Открой окно, чтобы впустить свежий воздух."},{"en":"to amaze","ru":"поражать","ex":"The view never fails to amaze me.","exRu":"Этот вид не перестаёт меня поражать."},{"en":"to backfire","ru":"выйти боком","ex":"Their risky plan is likely to backfire.","exRu":"Их рискованный план, вероятно, обернётся провалом."},{"en":"to be familiar with","ru":"быть знакомым с чем-то","ex":"You need to be familiar with the rules.","exRu":"Тебе нужно хорошо знать правила."},{"en":"to be late","ru":"опоздать","ex":"I hate to be late for meetings.","exRu":"Я терпеть не могу опаздывать на встречи."},{"en":"to bear","ru":"вынашивать; нести","ex":"The pain was too much to bear.","exRu":"Эту боль было невозможно вынести."},{"en":"to boost","ru":"усилить","ex":"I walk at lunch to boost my energy.","exRu":"В обед я гуляю, чтобы зарядиться энергией."},{"en":"to boost workflow","ru":"ускорить рабочий процесс","ex":"We added shortcuts to boost workflow.","exRu":"Мы добавили быстрые команды, чтобы ускорить работу."},{"en":"to carry","ru":"носить","ex":"This box is too heavy to carry.","exRu":"Эта коробка слишком тяжёлая, чтобы её нести."},{"en":"to conclude","ru":"заключить, сделать вывод","ex":"We have enough evidence to conclude.","exRu":"У нас достаточно доказательств, чтобы сделать вывод."},{"en":"to consider","ru":"рассматривать, считать, подумать","ex":"There are several options to consider.","exRu":"Есть несколько вариантов для рассмотрения."},{"en":"to consume","ru":"потреблять","ex":"We try to consume less power at home.","exRu":"Дома мы стараемся потреблять меньше энергии."},{"en":"to end up","ru":"в итоге оказаться","ex":"I don’t want to end up alone.","exRu":"Я не хочу в итоге остаться один."},{"en":"to entertain","ru":"развлекать","ex":"We hired a band to entertain the guests.","exRu":"Мы наняли группу, чтобы развлечь гостей."},{"en":"to excite","ru":"волновать, возбуждать","ex":"The trip is sure to excite the kids.","exRu":"Поездка наверняка приведёт детей в восторг."},{"en":"to exist","ru":"существовать","ex":"Some species cease to exist.","exRu":"Некоторые виды перестают существовать."},{"en":"to expand","ru":"расширять","ex":"The shop plans to expand next year.","exRu":"В следующем году магазин планирует расшириться."},{"en":"to expect","ru":"ожидать","ex":"What are we supposed to expect?","exRu":"Чего нам следует ожидать?"},{"en":"to extend","ru":"удлинить, продлить","ex":"We decided to extend our stay.","exRu":"Мы решили продлить поездку."},{"en":"to force","ru":"заставлять силой","ex":"They tried to force the door open.","exRu":"Они попытались силой открыть дверь."},{"en":"to forgive","ru":"простить","ex":"I’m learning to forgive myself.","exRu":"Я учусь прощать себя."},{"en":"to hurry","ru":"спешить","ex":"There’s no need to hurry.","exRu":"Торопиться некуда."},{"en":"to increase","ru":"повысить","ex":"We need to increase our savings.","exRu":"Нам нужно увеличить свои сбережения."},{"en":"to mature","ru":"взрослеть","ex":"Some cheeses take years to mature.","exRu":"Некоторым сырам нужны годы, чтобы созреть."},{"en":"to mention","ru":"упоминать","ex":"I forgot to mention the meeting.","exRu":"Я забыл упомянуть о встрече."},{"en":"to nag","ru":"пилить, ворчать, доставать","ex":"I don’t mean to nag, but please call her.","exRu":"Не хочу придираться, но, пожалуйста, позвони ей."},{"en":"to pretend","ru":"делать вид","ex":"It’s exhausting to pretend you’re fine.","exRu":"Притворяться, что всё хорошо, утомительно."},{"en":"to promote","ru":"продвигать","ex":"They use social media to promote the café.","exRu":"Они рекламируют кафе в соцсетях."},{"en":"to reschedule","ru":"перенести","ex":"I need to reschedule my appointment.","exRu":"Мне нужно перенести приём."},{"en":"to schedule","ru":"планировать","ex":"Remember to schedule your blood test.","exRu":"Не забудь записаться на анализ крови."},{"en":"to shock","ru":"шокировать","ex":"The news is likely to shock everyone.","exRu":"Эта новость, скорее всего, всех шокирует."},{"en":"to struggle with","ru":"испытывать трудности с","ex":"It’s normal to struggle with change.","exRu":"Трудности с переменами — это нормально."},{"en":"to sweat","ru":"потеть","ex":"You’re going to sweat in that coat.","exRu":"В этом пальто ты вспотеешь."},{"en":"to treat equally","ru":"обращаться одинаково","ex":"The goal is to treat equally both groups.","exRu":"Цель — относиться к обеим группам одинаково."},{"en":"to unwind","ru":"расслабиться","ex":"I read before bed to unwind.","exRu":"Перед сном я читаю, чтобы расслабиться."},{"en":"to value / appreciate","ru":"ценить","ex":"We need to value each person’s time.","exRu":"Нужно ценить время каждого человека."},{"en":"traffic","ru":"дорожное движение","ex":"Morning traffic was unusually light.","exRu":"Сегодня утром на дорогах было непривычно свободно."},{"en":"trainer","ru":"тренер","ex":"My trainer made a new workout plan.","exRu":"Тренер составил мне новую программу тренировок."},{"en":"travel","ru":"путешествовать","ex":"I love to travel by train.","exRu":"Я люблю путешествовать на поезде."},{"en":"treat like a queen","ru":"относиться как к королеве","ex":"They treat like a queen every guest here.","exRu":"Здесь с каждым гостем обращаются по-королевски."},{"en":"treat well","ru":"хорошо относиться","ex":"Guests we treat well often return.","exRu":"Гости, с которыми хорошо обращаются, возвращаются."},{"en":"treatment","ru":"лечение, уход","ex":"The new treatment eased her pain.","exRu":"Новое лечение облегчило её боль."},{"en":"trends won't last","ru":"тренды не продлятся","ex":"Most online trends won't last.","exRu":"Большинство интернет-трендов быстро проходят."},{"en":"triggered","ru":"задетый, триггернутый","ex":"That comment left me feeling triggered.","exRu":"Этот комментарий меня задел."},{"en":"triggered by","ru":"задетый чем-то","ex":"Her anxiety was triggered by the noise.","exRu":"Шум спровоцировал её тревогу."},{"en":"triggering","ru":"триггерящий","ex":"That scene may be triggering for some.","exRu":"Некоторых эта сцена может задеть."},{"en":"trust in anyone","ru":"доверять кому бы то ни было","ex":"She finds it hard to trust in anyone.","exRu":"Ей трудно доверять кому-либо."},{"en":"trust in yourself","ru":"верить в себя","ex":"Learn to trust in yourself.","exRu":"Научись верить в себя."},{"en":"turn down","ru":"отклонять, отказываться","ex":"I had to turn down the offer.","exRu":"Мне пришлось отклонить предложение."},{"en":"turn on","ru":"включать","ex":"Please turn on the kitchen light.","exRu":"Пожалуйста, включи свет на кухне."},{"en":"turn out","ru":"оказаться","ex":"Things may turn out better than expected.","exRu":"Всё может сложиться лучше, чем ожидалось."},{"en":"turn out well","ru":"хорошо обернуться","ex":"I hope everything will turn out well.","exRu":"Надеюсь, всё сложится хорошо."},{"en":"turned out to be","ru":"оказался","ex":"The quiet guest turned out to be funny.","exRu":"Тихий гость оказался весельчаком."},{"en":"twice as much","ru":"в два раза больше","ex":"This hotel costs twice as much.","exRu":"Этот отель стоит вдвое дороже."},{"en":"two ways to act","ru":"два способа действовать","ex":"You have two ways to act now.","exRu":"Сейчас у тебя есть два варианта действий."},{"en":"UFO","ru":"НЛО","ex":"We joked that the light was a UFO.","exRu":"Мы пошутили, что этот свет был НЛО."},{"en":"unclear","ru":"неясный","ex":"The last part of the email is unclear.","exRu":"Последняя часть письма непонятна."},{"en":"unconscious","ru":"бессознательный","ex":"The driver was found unconscious.","exRu":"Водителя нашли без сознания."},{"en":"under pressure","ru":"под давлением","ex":"I make mistakes when I’m under pressure.","exRu":"Под давлением я совершаю ошибки."},{"en":"unfair","ru":"несправедливый","ex":"The new rule seems unfair.","exRu":"Новое правило кажется несправедливым."},{"en":"unflavoured","ru":"без ароматизаторов, натуральный (без вкуса)","ex":"I prefer plain, unflavoured yogurt.","exRu":"Я предпочитаю простой йогурт без добавок."},{"en":"unnecessary","ru":"ненужный","ex":"That extra meeting was unnecessary.","exRu":"Та дополнительная встреча была не нужна."},{"en":"uplifted","ru":"окрылённый","ex":"I felt uplifted after our talk.","exRu":"После нашего разговора я воспрял духом."},{"en":"used to","ru":"раньше (делал)","ex":"I used to walk to school.","exRu":"Раньше я ходил в школу пешком."},{"en":"user","ru":"пользователь","ex":"Each user needs a secure password.","exRu":"Каждому пользователю нужен надёжный пароль."},{"en":"UTC","ru":"часовой пояс UTC","ex":"The call starts at noon UTC.","exRu":"Звонок начнётся в полдень по UTC."},{"en":"vague","ru":"смутный, туманный","ex":"His answer was too vague to help.","exRu":"Его ответ был слишком расплывчатым и не помог."},{"en":"valuable","ru":"ценный","ex":"Your honest feedback is valuable.","exRu":"Твой честный отзыв очень ценен."},{"en":"valuable lesson","ru":"ценный урок","ex":"That mistake taught me a valuable lesson.","exRu":"Эта ошибка преподала мне ценный урок."},{"en":"value / appreciate","ru":"ценить","ex":"I value our time together.","exRu":"Я ценю время, которое мы проводим вместе."},{"en":"value for money","ru":"соотношение цены и качества","ex":"This hotel offers good value for money.","exRu":"Этот отель стоит своих денег."},{"en":"values","ru":"ценности","ex":"We share the same family values.","exRu":"У нас одинаковые семейные ценности."},{"en":"visarun","ru":"визаран","ex":"My next visarun is in September.","exRu":"Мой следующий визаран будет в сентябре."},{"en":"vocation / vacation","ru":"призвание / отпуск","ex":"Teaching has always been her vocation.","exRu":"Преподавание всегда было её призванием."},{"en":"volume","ru":"том; громкость","ex":"Please turn down the volume.","exRu":"Пожалуйста, убавь громкость."},{"en":"volumes","ru":"тома","ex":"The library owns all six volumes.","exRu":"В библиотеке есть все шесть томов."},{"en":"wage","ru":"зарплата, ставка (оплата труда)","ex":"They pay a fair hourly wage.","exRu":"Они платят достойную почасовую ставку."},{"en":"wage / salary / income","ru":"ставка / зарплата / доход","ex":"Her wage increased this year.","exRu":"В этом году её зарплата выросла."},{"en":"want more","ru":"хотеть большего","ex":"It’s natural to want more from life.","exRu":"Желать от жизни большего — естественно."},{"en":"warm up","ru":"разминаться","ex":"Always warm up before lifting weights.","exRu":"Всегда разминайся перед поднятием тяжестей."},{"en":"waste energy","ru":"тратить энергию зря","ex":"Don’t waste energy on petty arguments.","exRu":"Не трать силы на мелкие споры."},{"en":"waste money","ru":"транжирить деньги","ex":"We shouldn’t waste money on fast fashion.","exRu":"Не стоит тратить деньги на быструю моду."},{"en":"waste time","ru":"тратить время зря","ex":"Don’t waste time waiting for perfect.","exRu":"Не трать время в ожидании идеального момента."},{"en":"watch","ru":"смотреть; наблюдать; часы","ex":"We watch a film every Friday.","exRu":"Каждую пятницу мы смотрим фильм."},{"en":"watercolors","ru":"акварель","ex":"She painted the sunset with watercolors.","exRu":"Она нарисовала закат акварелью."},{"en":"we'll see","ru":"посмотрим","ex":"We'll see what happens tomorrow.","exRu":"Посмотрим, что будет завтра."},{"en":"weights","ru":"гантели, веса","ex":"I lift weights twice a week.","exRu":"Я поднимаю тяжести дважды в неделю."},{"en":"what is it like","ru":"каково это","ex":"What is it like to live abroad?","exRu":"Каково это — жить за границей?"},{"en":"where do you see yourself","ru":"где вы видите себя","ex":"Where do you see yourself in five years?","exRu":"Кем вы видите себя через пять лет?"},{"en":"why should we hire you","ru":"почему мы должны вас нанять","ex":"Why should we hire you?","exRu":"Почему мы должны нанять именно вас?"},{"en":"willing to","ru":"готовый","ex":"I’m willing to help this weekend.","exRu":"Я готов помочь в эти выходные."},{"en":"willpower","ru":"сила воли","ex":"Quitting sugar took real willpower.","exRu":"Чтобы отказаться от сахара, нужна сила воли."},{"en":"wise","ru":"мудрый","ex":"Saving some cash was a wise choice.","exRu":"Отложить немного денег было мудрым решением."},{"en":"within","ru":"в течение","ex":"Please reply within three days.","exRu":"Пожалуйста, ответьте в течение трёх дней."},{"en":"within a year","ru":"в течение года","ex":"We hope to move within a year.","exRu":"Мы надеемся переехать в течение года."},{"en":"without a purpose","ru":"без цели","ex":"I felt lost without a purpose.","exRu":"Без цели я чувствовал себя потерянным."},{"en":"won't bring joy","ru":"не принесёт радости","ex":"More stuff won't bring joy.","exRu":"Лишние вещи не принесут радости."},{"en":"word-of-mouth","ru":"сарафанное радио","ex":"The café grew through word-of-mouth.","exRu":"Кафе стало популярным благодаря сарафанному радио."},{"en":"work out","ru":"получиться; сработать; тренироваться","ex":"I hope everything will work out.","exRu":"Надеюсь, всё получится."},{"en":"workflow","ru":"рабочий процесс","ex":"This tool simplified our workflow.","exRu":"Этот инструмент упростил наш рабочий процесс."},{"en":"workload","ru":"загрузка, объём работы","ex":"My workload doubled this month.","exRu":"В этом месяце моя нагрузка удвоилась."},{"en":"workload reduction","ru":"снижение нагрузки","ex":"Automation led to workload reduction.","exRu":"Автоматизация позволила снизить нагрузку."},{"en":"worth it","ru":"стоит того","ex":"The climb was hard but worth it.","exRu":"Подъём был трудным, но того стоил."},{"en":"wrap up","ru":"завершить; упаковать","ex":"Let’s wrap up before lunch.","exRu":"Давайте закончим до обеда."},{"en":"write down","ru":"записать","ex":"Write down the address before you go.","exRu":"Запиши адрес перед уходом."},{"en":"yet","ru":"еще (в вопросах и отрицаниях)","ex":"Have you finished yet?","exRu":"Ты уже закончил?"},{"en":"you will nail it","ru":"у тебя получится","ex":"You will nail it.","exRu":"У тебя всё получится."},{"en":"youth","ru":"молодёжь; юность","ex":"She spent her youth near the sea.","exRu":"Она провела молодость у моря."}];
const RULES = [{"id":"t01","title":"Present Simple","meaning":"Привычка, факт, распорядок — то, что обычно или всегда так.","formula":"V1 / Vs · do/does","tip":"I work from cafés every day."},{"id":"t02","title":"Present Continuous","meaning":"Сейчас или временно в этот период (не обязательно «прямо в эту секунду»).","formula":"am/is/are + Ving","tip":"I'm learning English now. · She's staying with us this week."},{"id":"t03","title":"Pr. Simple vs Continuous","meaning":"Usually = Simple; сейчас / временно = Continuous.","formula":"usually vs now","tip":"I live here. · I'm staying at a hotel."},{"id":"t04","title":"Past Simple","meaning":"Законченное действие в прошлом; время часто известно (yesterday, ago…).","formula":"V2 / did + V1","tip":"We left Russia in 2022."},{"id":"t05","title":"Past Simple ? / −","meaning":"Вопрос и отрицание: did / didn't + начальная форма (не V2).","formula":"Did you V1? · didn't V1","tip":"Did you book the flight? — No, I didn't."},{"id":"t06","title":"Present Perfect","meaning":"Связь прошлого с сейчас: опыт или результат, важный сейчас.","formula":"have/has + V3","tip":"Have you ever tried pho? · I've lost my keys."},{"id":"t07","title":"Present Perfect: when?","meaning":"Когда именно — неважно и обычно не говорим (нет yesterday / in 2020).","formula":"have/has + V3 · без when","tip":"I've already paid the rent. (не: yesterday)"},{"id":"t08","title":"PP vs Past Simple","meaning":"PP — без конкретного when; Past Simple — когда известно.","formula":"PP: no time · PS: when","tip":"I've been to Vietnam. · I went last year."},{"id":"t09","title":"Present Perfect Cont.","meaning":"Длилось до сейчас; часто важен процесс и how long.","formula":"have/has been + Ving","tip":"I've been studying all morning."},{"id":"t10","title":"PP vs PPC","meaning":"PP = уже сделано (итог сейчас); PPC = процесс / как долго.","formula":"have + V3 · have been + Ving","tip":"I've written it. · I've been writing for an hour."},{"id":"s01","title":"PP markers","meaning":"Частые сигналы Present Perfect.","formula":"ever/never · just/already/yet · since/for","tip":"I've lived here since 2022. · Have you ever…?"},{"id":"s02","title":"Past Simple markers","meaning":"Частые сигналы Past Simple — конкретное прошлое время.","formula":"yesterday · last… · ago · in 2020","tip":"I bought tickets yesterday."},{"id":"f01","title":"Future will","meaning":"Решение в момент речи, обещание, мнение/прогноз.","formula":"will + V1","tip":"I'll help you with the form. · It'll be fine."},{"id":"f02","title":"be going to","meaning":"Уже есть план или по ситуации видно, что случится.","formula":"am/is/are going to + V1","tip":"I'm going to move next month. · Look — it's going to rain."},{"id":"f03","title":"Present Cont. = future","meaning":"Личная договорённость / запись в календаре (не просто «хочу»).","formula":"am/is/are + Ving (+ time)","tip":"I'm meeting a friend tomorrow."},{"id":"f04","title":"Present Simple = future","meaning":"Расписание: поезд, рейс, кино — официальный график.","formula":"V1 / Vs (+ time)","tip":"The flight leaves at 9 am."},{"id":"u01","title":"used to","meaning":"Раньше делал / было так — сейчас уже нет.","formula":"used to + V1","tip":"I used to play basketball."},{"id":"u02","title":"didn't use to","meaning":"Раньше обычно не делал. В −/? пишем use, не used.","formula":"didn't use to + V1","tip":"I didn't use to speak up at work."},{"id":"u03","title":"be used to","meaning":"Уже привык к чему-то (это нормально). Не путать с used to.","formula":"be used to + Ving/noun","tip":"I'm used to waking up early."},{"id":"u04","title":"get used to","meaning":"Привыкаю / привыкну — процесс привыкания.","formula":"get used to + Ving/noun","tip":"I'm getting used to the heat."},{"id":"m01","title":"must / have to","meaning":"Надо: must — часто «я считаю»; have to — правило/обстоятельства.","formula":"must · have to + V1","tip":"I have to renew my visa. · You must be careful."},{"id":"m02","title":"should","meaning":"Совет: лучше сделать — не жёсткий приказ.","formula":"should + V1","tip":"You should keep in touch."},{"id":"m03","title":"should have","meaning":"Надо было в прошлом — но не сделал (жаль / упрёк).","formula":"should have + V3","tip":"I should have left earlier."},{"id":"m04","title":"must have","meaning":"Уверенный вывод о прошлом: наверняка так и было.","formula":"must have + V3","tip":"He must have missed the bus."},{"id":"m05","title":"could have","meaning":"Была возможность в прошлом — часто: мог, но не сделал.","formula":"could have + V3","tip":"We could have taken a taxi."},{"id":"m06","title":"would have","meaning":"Сделал бы в прошлом — но условия не было (часто + if).","formula":"would have + V3","tip":"I would have called if I had known."},{"id":"g01","title":"verb + gerund","meaning":"После этих глаголов — Ving (не to).","formula":"enjoy/avoid/keep + Ving","tip":"I enjoy learning new skills."},{"id":"g02","title":"verb + to-inf","meaning":"После этих глаголов — to + V.","formula":"decide/hope/want + to V","tip":"She decided to take a chance."},{"id":"g03","title":"stop doing / to do","meaning":"stop + Ving = перестать это делать; stop + to V = остановиться, чтобы…","formula":"stop + Ving vs to V","tip":"I stopped smoking. · I stopped to buy coffee."},{"id":"g04","title":"forget / remember","meaning":"Ving = помню/забыл сам факт из прошлого; to V = (не) забыть сделать.","formula":"Ving = past fact · to V = to-do","tip":"I remember meeting her. · Remember to call."},{"id":"c00","title":"Zero Conditional","meaning":"Всегда правда: если A, то B (факты, законы).","formula":"if + Present, Present","tip":"If you heat water, it boils."},{"id":"c01","title":"1st Conditional","meaning":"Реальный будущий исход: если случится A → будет B.","formula":"if + Present, will + V1","tip":"If it rains, we'll stay home."},{"id":"c02","title":"2nd Conditional","meaning":"Нереально / маловероятно сейчас или в будущем.","formula":"if + Past, would + V1","tip":"If I had more time, I'd travel more."},{"id":"c03","title":"3rd Conditional","meaning":"Нереально в прошлом: если бы тогда… — был бы другой итог.","formula":"if + Past Perfect, would have + V3","tip":"If I had studied, I would have passed."},{"id":"c04","title":"if vs when","meaning":"if = не уверен, что будет; when = уверен, что будет.","formula":"if = maybe · when = sure","tip":"If I see her… · When I get home, I'll text you."},{"id":"a01","title":"a / an","meaning":"Неопределённый: один / любой, впервые. Смотри на звук, не на букву.","formula":"a + согл. звук · an + гласн. звук","tip":"a visa · a university (ju-) · an hour · an apple"},{"id":"a02","title":"the","meaning":"Конкретное / уже известное или единственное в контексте.","formula":"the = known / unique","tip":"the sun · the job we discussed · Open the door."},{"id":"a03","title":"без a/an/the","meaning":"Общая идея: неисчисляемые и мн.ч. «вообще», без конкретного экземпляра.","formula":"без a/an/the","tip":"Life is hard. · Cats sleep a lot. · I like coffee."},{"id":"r01","title":"who / which / that","meaning":"who — люди; which — вещи; that — и то и другое (в defining).","formula":"who / which / that","tip":"the friend who helped me · the book that I read"},{"id":"r02","title":"where","meaning":"Относительное «где» — про место.","formula":"where = place","tip":"the city where I live"},{"id":"p01","title":"to vs for","meaning":"Цель: to + глагол; for + существительное / Ving.","formula":"to + V · for + noun/Ving","tip":"I came to learn. · a book for learning English"},{"id":"p02","title":"in / on / at (time)","meaning":"at — точное время; on — день/дата; in — месяц/год/часть дня.","formula":"at 5 · on Monday · in July","tip":"at night · in the morning · on Friday"},{"id":"pc1","title":"Past Continuous","meaning":"Был в процессе в тот момент прошлого.","formula":"was/were + Ving","tip":"I was cooking when she called."},{"id":"pc2","title":"PC + Past Simple","meaning":"Длинный фон (was Ving) + короткое событие (V2).","formula":"was Ving when + V2","tip":"I was working when the power went out."}];
const INTERVIEWS = [{"id":"i01","q":"Tell me about yourself. Goal: background + responsibilities + strengths","qRu":"Расскажите о себе.","a":"Hello, my name is Evgenii. I from in Russia, but already more five years I live abroad. I have construction education. I’ve worked in construction about twenty years. In my career was several stage. I’ve started junior engineer in nuclear industry in which I worked about thirteen years, with a break for COVID. Afterwords, I participated in several small project, such as construction of private cottages, the design of clean rooms, the implementation specialized software in organizations. Then, I had a lot of experience as project manager in organization that developed unique software for engineers.At my last job, I’ve worked as an BIM manager in organization specializing in the design of the engendering systems for high-rise buildings. My responsibilities included supporting and bucking up a term of engineers, developing standards of organization, implementation automatization.My strengths a lot of experience in construct industry, good communication,  continuous development and search for new solutions."},{"id":"i02","q":"Tell me about your responsibilities.","qRu":"Расскажите мне о ваших обязанностях.","a":"For me important that routine processes don’t take up working time. I try to automate that can be automated. In my responsibilities include automatization working process, communication cross-functional teams, develop and implementation workflow corporations standards and documantations."},{"id":"i03","q":"Tell me about a successful project.","qRu":"Расскажите об успешном проекте.","a":"One of the projects I'm most proud of was developing an engineering platform that covered the whole design process, from 2D drafting to BIM and construction planning. I took on the role of Product Manager and worked as the link between engineers, software developers, and users. At first, I had no experience working with developers, so I had to quickly gain experience and learn how to communicate with different teams. In the end, we set up a better development process, improved communication, and built a product that was easier for engineers to use."},{"id":"i04","q":"Tell me about a difficult situation","qRu":"Расскажите о сложной ситуации","a":" I was managing several BIM projects with overlapping deadlines. Some engineers had too much work, and project managers wanted everything done as quickly as possible. I had to meet deadlines in a very short time. I decided to recount expenses, reconsider our workflow, empower our  team to boost our workflow. I met with each team, brought up the main problems, redistributed the workload, and backed up engineers who needed help. As a result, we saved time and had time to meet deadlines."},{"id":"i05","q":"What is your biggest weakness?","qRu":"Какой ваш главный недостаток?","a":"I can over-polish details. I now time-box discovery, define a good-enough MVP, and revisit polish after we learn from users."},{"id":"i06","q":"Describe a challenge you faced and how you handled it.","qRu":"Опишите сложность и как вы с ней справились.","a":"Stakeholders pushed conflicting priorities. I mapped impact vs effort, aligned on one north-star metric, and sequenced work into a shared roadmap."},{"id":"i07","q":"How do you prioritize the backlog?","qRu":"Как вы приоритизируете бэклог?","a":"By outcome: user value, business impact, risk, and effort. I use RICE or a simple impact/effort matrix and review priorities with the team weekly."},{"id":"i08","q":"How do you work with engineers and designers?","qRu":"Как вы работаете с инженерами и дизайнерами?","a":"I bring the problem and constraints early, invite trade-offs, and keep acceptance criteria clear so discovery and delivery stay collaborative."},{"id":"i09","q":"How do you handle conflicting stakeholder requests?","qRu":"Как вы решаете конфликтные запросы стейкхолдеров?","a":"I make trade-offs visible: goal, impact, cost of delay. Then we agree what to ship now, what to defer, and what evidence we need next."},{"id":"i10","q":"Tell me about a product you launched.","qRu":"Расскажите о продукте, который вы запускали.","a":"I owned discovery to release: problem framing, MVP scope, rollout, and metrics. We validated assumptions early and iterated after launch."},{"id":"i11","q":"How do you define success for a feature?","qRu":"Как вы определяете успех фичи?","a":"With a clear outcome metric, leading indicators, and guardrails. Before build, we agree what \"good\" looks like and when to pivot or stop."},{"id":"i12","q":"What is the difference between a PO and a PM?","qRu":"Чем PO отличается от PM?","a":"Titles vary. Often the PO owns backlog and delivery with the team; the PM owns strategy and market outcomes. Strong pairs overlap and stay aligned."},{"id":"i13","q":"How do you gather requirements?","qRu":"Как вы собираете требования?","a":"I start from the problem: interviews, data, and support signals. Then I write jobs-to-be-done, constraints, and acceptance criteria — not a feature wishlist."},{"id":"i14","q":"Describe a time you said no.","qRu":"Опишите случай, когда вы сказали нет.","a":"A request looked urgent but low-impact. I showed the opportunity cost, offered a lighter workaround, and parked it until metrics justified the work."},{"id":"i15","q":"How do you handle incomplete information?","qRu":"Как вы действуете при неполной информации?","a":"I ship the smallest experiment that reduces risk: prototype, A/B, or limited rollout. Decisions improve as evidence grows."},{"id":"i16","q":"How do you run refinement or grooming?","qRu":"Как вы проводите refinement?","a":"Ready means clear goal, acceptance criteria, edge cases, and open questions. We estimate together and split anything still too big or vague."},{"id":"i17","q":"Tell me about a failure and what you learned.","qRu":"Расскажите о провале и выводах.","a":"We built a feature users ignored. We had skipped discovery. Now I validate demand first and define kill criteria before a big build."},{"id":"i18","q":"How do you communicate status to leadership?","qRu":"Как вы сообщаете статус руководству?","a":"Short and outcome-based: goal, progress, risks, decisions needed. I avoid task lists and highlight what changed since the last update."},{"id":"i19","q":"What metrics do you track?","qRu":"Какие метрики вы отслеживаете?","a":"North-star plus a few inputs: activation, retention, conversion, or task success. I pick metrics tied to the problem, not vanity numbers."},{"id":"i20","q":"How do you write user stories?","qRu":"Как вы пишете user stories?","a":"As a [user], I want [capability], so that [outcome]. Plus acceptance criteria, notes on analytics, and links to designs or research."},{"id":"i21","q":"How do you deal with technical debt?","qRu":"Как вы относитесь к техническому долгу?","a":"I treat it as product risk. We reserve capacity, tie debt to speed or reliability outcomes, and prioritize the debt that blocks delivery most."},{"id":"i22","q":"Why do you want to work here?","qRu":"Почему вы хотите работать у нас?","a":"Your product solves a real problem I care about. I want to help sharpen priorities, learn from your users, and ship meaningful improvements."},{"id":"i23","q":"How do you handle tight deadlines?","qRu":"Как вы работаете с жёсткими дедлайнами?","a":"I cut scope, not quality: must-have outcomes first, nice-to-haves later. I make risks explicit early and protect a realistic release path."},{"id":"i24","q":"Do you have any questions for us?","qRu":"Есть ли у вас вопросы к нам?","a":"How do you set product strategy? What does success look like in six months for this role? How do PO, design, and engineering decide trade-offs?"}];

const STORE_NAME = "vocab-progress.json";
const SCRIPT_NAME = "WordOfDay";
const ROTATE_SECONDS = 10;
const PASSIVE_MARKER = "PASSIVE_WIDGET_V41";
const RELATED_LIMIT = 2;
const VOCAB_SIZE = 938; // для проверки полной загрузки
const RULES_COUNT = 44;
const INTERVIEWS_COUNT = 24;
const WORD_SETS_PER_RULE = 4; // 4 набора слов → 1 правило
const INTERVIEW_STORE = "interview_qa.json";
const INTERVIEW_URLS = [
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/vocabulary-full-list-f829/projects/vocab-iphone-widget/interview_qa.json",
  "https://cdn.jsdelivr.net/gh/assssdrew/projects_po@cursor/vocabulary-full-list-f829/projects/vocab-iphone-widget/interview_qa.json",
];
let interviewDeck = INTERVIEWS;

function interviewsList() {
  return interviewDeck && interviewDeck.length ? interviewDeck : INTERVIEWS;
}

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
    lastWordSet: [],
    interviewOrder: [],
    interviewPos: 0,
    interview: null,
    interviewShownAt: 0,
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
    if (!Array.isArray(data.lastWordSet)) data.lastWordSet = [];
    if (!Array.isArray(data.order)) data.order = [];
    if (!Array.isArray(data.ruleOrder)) data.ruleOrder = [];
    if (!Array.isArray(data.interviewOrder)) data.interviewOrder = [];
    if (typeof data.pos !== "number") data.pos = 0;
    if (typeof data.pass !== "number") data.pass = 1;
    if (typeof data.rulePos !== "number") data.rulePos = 0;
    if (typeof data.interviewPos !== "number") data.interviewPos = 0;
    if (typeof data.wordsSinceRule !== "number") data.wordsSinceRule = 0;
    if (typeof data.interviewShownAt !== "number") data.interviewShownAt = 0;
    if (data.kind !== "rule" && data.kind !== "words") data.kind = "words";
    if (!data.rule) data.rule = null;
    if (!data.interview) data.interview = null;
    return data;
  } catch (e) {
    return emptyProgress();
  }
}

function saveProgress(data) {
  const fm = FileManager.local();
  fm.writeString(getStorePath(), JSON.stringify(data));
}

function isValidInterviews(data) {
  if (!Array.isArray(data) || data.length < 1) return false;
  for (let i = 0; i < data.length; i++) {
    const c = data[i];
    if (!c || !String(c.q || "").trim() || !String(c.a || "").trim()) return false;
  }
  return true;
}

function interviewStorePath() {
  const fm = FileManager.local();
  return fm.joinPath(fm.documentsDirectory(), INTERVIEW_STORE);
}

function applyInterviewDeck(data) {
  if (!isValidInterviews(data)) return false;
  interviewDeck = data;
  return true;
}

function loadCachedInterviews() {
  const fm = FileManager.local();
  const path = interviewStorePath();
  if (!fm.fileExists(path)) return false;
  try {
    const data = JSON.parse(fm.readString(path));
    return applyInterviewDeck(data);
  } catch (e) {
    return false;
  }
}

async function fetchInterviewDeck() {
  let lastError = null;
  for (let i = 0; i < INTERVIEW_URLS.length; i++) {
    const base = INTERVIEW_URLS[i];
    try {
      const req = new Request(base + (base.indexOf("?") >= 0 ? "&" : "?") + "t=" + Date.now());
      req.timeoutInterval = 30;
      const data = await req.loadJSON();
      if (applyInterviewDeck(data)) {
        const fm = FileManager.local();
        fm.writeString(interviewStorePath(), JSON.stringify(data));
        return true;
      }
      lastError = new Error("Невалидный JSON: " + base);
    } catch (e) {
      lastError = e;
    }
  }
  if (lastError) throw lastError;
  return false;
}

async function refreshInterviewDeck(forceFetch) {
  if (forceFetch) {
    try {
      await fetchInterviewDeck();
      return;
    } catch (e) {}
  }
  loadCachedInterviews();
}

function wordKey(w) {
  return String((w && w.en) || "").toLowerCase().trim();
}

function asSetItem(w, idx) {
  return {
    en: w.en,
    ru: w.ru,
    ex: w.ex || "",
    exRu: w.exRu || "",
    index: idx,
  };
}

function withExample(item) {
  if (!item) return item;
  if (item.ex && item.exRu) return item;
  if (typeof item.index === "number" && WORDS[item.index]) {
    return asSetItem(WORDS[item.index], item.index);
  }
  const key = wordKey(item);
  for (let i = 0; i < WORDS.length; i++) {
    if (wordKey(WORDS[i]) === key) return asSetItem(WORDS[i], i);
  }
  return item;
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

function reshuffleInterviews(progress) {
  progress.interviewOrder = shuffleIndices(interviewsList().length);
  progress.interviewPos = 0;
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

function ensureInterviewOrder(progress) {
  const n = interviewsList().length;
  if (
    Array.isArray(progress.interviewOrder) &&
    progress.interviewOrder.length === n &&
    typeof progress.interviewPos === "number" &&
    progress.interviewPos >= 0 &&
    progress.interviewPos <= n
  ) {
    return;
  }
  reshuffleInterviews(progress);
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
  progress.lastWordSet = set.slice();
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

function nextInterview(progress) {
  ensureInterviewOrder(progress);
  if (progress.interviewPos >= progress.interviewOrder.length) {
    reshuffleInterviews(progress);
  }
  const idx = progress.interviewOrder[progress.interviewPos];
  progress.interviewPos += 1;
  const card = interviewsList()[idx] || interviewsList()[0];
  progress.interview = {
    id: card.id,
    q: card.q,
    qRu: card.qRu || "",
    a: card.a,
  };
  progress.interviewShownAt = nowMs();
  saveProgress(progress);
  return progress;
}

function hasCard(progress) {
  if (progress.kind === "rule") return !!(progress.rule && progress.rule.title);
  return !!(progress.current && progress.set && progress.set.length);
}

function hasInterview(progress) {
  return !!(progress.interview && progress.interview.q);
}

function needsRotate(progress) {
  if (!hasCard(progress)) return true;
  if (!progress.shownAt) return true;
  return nowMs() - progress.shownAt >= rotateMs();
}

function needsInterviewRotate(progress) {
  if (!hasInterview(progress)) return true;
  if (!progress.interviewShownAt) return true;
  return nowMs() - progress.interviewShownAt >= rotateMs();
}

function isLargeFamily(family) {
  const f = family || familyName();
  return f === "large" || f === "extraLarge";
}

/** Подготовка прогресса под размер виджета. */
function ensureCurrentWord(progress, family) {
  const f = family || familyName();
  if (isLargeFamily(f)) {
    ensureInterviewOrder(progress);
    if (needsInterviewRotate(progress)) return nextInterview(progress);
    return progress;
  }
  if (needsRotate(progress)) return nextWord(progress);
  ensureOrder(progress);
  ensureRuleOrder(progress);
  return progress;
}

/** Слова для small: только EN, даже если medium сейчас показывает правило. */
function wordsForSmall(progress) {
  let set = [];
  if (progress.set && progress.set.length) set = progress.set;
  else if (progress.lastWordSet && progress.lastWordSet.length) {
    set = progress.lastWordSet;
  } else if (progress.current) set = [progress.current];
  return set.map(withExample).filter(function (w) {
    return w && w.en;
  });
}

function currentSet(progress, limit) {
  if (progress.kind === "rule") return [];
  const size = typeof limit === "number" ? limit : setSizeForFamily();
  if (progress.set && progress.set.length) {
    return progress.set.slice(0, size).map(withExample);
  }
  if (!progress.current) return [];
  return [withExample(progress.current)];
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

function tapNextUrl(family) {
  const f = family || familyName();
  return (
    "scriptable:///run/" +
    encodeURIComponent(SCRIPT_NAME) +
    "?action=next&family=" +
    encodeURIComponent(f)
  );
}

function tapFamily() {
  try {
    const q = args.queryParameters || {};
    return String(q.family || "").trim();
  } catch (e) {
    return "";
  }
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

/** Высота виджета (pt) — чтобы выделить 3 слота по 3 строки. */
function widgetOuterHeight() {
  const family = familyName();
  let sw = 390;
  let sh = 844;
  try {
    const s = Device.screenSize();
    sw = Math.min(s.width, s.height);
    sh = Math.max(s.width, s.height);
  } catch (e) {}

  let mediumH = 158;
  if (sw >= 428 || sh >= 926) mediumH = 170;
  else if (sw >= 414 || sh >= 896) mediumH = 169;
  else if (sw >= 393 || sh >= 852) mediumH = 159;
  else if (sw >= 390 || sh >= 844) mediumH = 158;
  else if (sw >= 375) mediumH = 148;
  else mediumH = 148;

  if (family === "large" || family === "extraLarge") return mediumH * 2 + 16;
  if (family === "small") return Math.round(widgetOuterWidth());
  if (family === "accessoryRectangular") return 72;
  if (family === "accessoryInline" || family === "accessoryCircular") return 40;
  return mediumH;
}

function contentWidth() {
  const family = familyName();
  if (family === "accessoryInline") return widgetOuterWidth();
  if (family === "accessoryCircular") return widgetOuterWidth() - 8;
  if (family === "accessoryRectangular") return widgetOuterWidth() - 12;
  // горизонтальный padding 12+12
  return widgetOuterWidth() - 24;
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

/**
 * Ширина текста для решения о переносе.
 * Сначала DrawContext (реальная метрика шрифта); грубая оценка — только fallback.
 * Раньше Math.max(exact, approx*0.58) + лимит 86% ширины ломали строку слишком рано.
 */
function measureTextWidth(text, fontSize, bold) {
  const s = String(text || "");
  if (!s) return 0;
  try {
    const ctx = new DrawContext();
    ctx.opaque = false;
    ctx.size = new Size(2000, Math.ceil(fontSize * 2));
    ctx.font = bold ? Font.boldSystemFont(fontSize) : Font.systemFont(fontSize);
    const size = ctx.sizeForText(s);
    if (size && size.width > 0) return size.width;
  } catch (e) {}
  // fallback без DrawContext: умеренный коэффициент (не «с запасом»)
  return s.length * fontSize * (bold ? 0.55 : 0.5);
}

function normalizeApos(s) {
  return String(s || "").replace(/[\u2018\u2019]/g, "'");
}

function needlesFor(en) {
  const raw = String(en || "").trim();
  const cleaned = raw.replace(/\s*\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
  const parts = cleaned
    .split(/\s*\/\s*/)
    .map(function (s) {
      return s.trim();
    })
    .filter(Boolean);
  parts.sort(function (a, b) {
    return b.length - a.length;
  });
  const out = [];
  const seen = {};
  [raw, cleaned].concat(parts).forEach(function (n) {
    const k = normalizeApos(n).toLowerCase();
    if (!n || seen[k]) return;
    seen[k] = 1;
    out.push(n);
  });
  return out;
}

function splitHighlight(sentence, en) {
  const s = String(sentence || "");
  const hay = normalizeApos(s).toLowerCase();
  const needles = needlesFor(en);
  for (let i = 0; i < needles.length; i++) {
    const needle = needles[i];
    const idx = hay.indexOf(normalizeApos(needle).toLowerCase());
    if (idx >= 0) {
      return {
        before: s.slice(0, idx),
        hit: s.slice(idx, idx + needle.length),
        after: s.slice(idx + needle.length),
      };
    }
  }
  return { before: s, hit: "", after: "" };
}

function addHighlightedLine(parent, sentence, phrase, startSize, accessory, maxWidth) {
  const parts = splitHighlight(sentence, phrase);
  const max = typeof maxWidth === "number" ? maxWidth : contentWidth();
  let size = startSize;
  function widthAt(sz) {
    return (
      measureTextWidth(parts.before, sz, false) +
      measureTextWidth(parts.hit || "", sz, true) +
      measureTextWidth(parts.after, sz, false)
    );
  }
  while (size > 11 && widthAt(size) > max * 0.98) size -= 1;

  if (!parts.hit || widthAt(size) > max) {
    const t = leftText(parent.addText(sentence));
    t.font = Font.systemFont(size);
    t.textColor = enColor();
    t.lineLimit = 1;
    t.minimumScaleFactor = 0.85;
    if (!accessory) addShadow(t, 0.45);
    return;
  }

  const row = parent.addStack();
  row.layoutHorizontally();
  row.centerAlignContent();
  try {
    row.spacing = 0;
  } catch (e) {}

  function addPart(text, bold) {
    if (!text) return;
    const t = leftText(row.addText(text));
    t.font = bold ? Font.boldSystemFont(size) : Font.systemFont(size);
    t.textColor = enColor();
    t.lineLimit = 1;
    t.minimumScaleFactor = 1;
    if (!accessory) addShadow(t, bold ? 0.5 : 0.4);
  }
  addPart(parts.before, false);
  addPart(parts.hit, true);
  addPart(parts.after, false);
}

/** Оценка числа строк поля правила при данном кегле. */
function fieldLineCount(text, fontSize, maxW, maxLines) {
  const s = String(text || "").trim();
  if (!s) return 0;
  return Math.max(1, wrapLines(s, fontSize, Math.max(40, maxW - 2), maxLines || 2).length);
}

/**
 * Сколько визуальных строк займёт правило при базовых кеглях.
 * Мало строк → можно увеличить шрифт и раздвинуть блоки.
 */
function estimateRuleLineTotal(rule, titleSize, bodySize, maxW) {
  const meaningSize = Math.max(13, bodySize - 1);
  const tipSize = Math.max(11, bodySize - 2);
  let n = fieldLineCount(rule.title, titleSize, maxW, 2);
  if (rule.meaning) n += fieldLineCount(rule.meaning, meaningSize, maxW, 2);
  n += fieldLineCount(rule.formula, bodySize, maxW, 2);
  if (rule.tip) n += fieldLineCount(rule.tip, tipSize, maxW, 2);
  return n;
}

function addRuleTextLines(w, lines, font, color, shadowAlpha, accessory) {
  for (let i = 0; i < lines.length; i++) {
    const t = leftText(w.addText(lines[i]));
    t.font = font;
    t.textColor = color;
    t.lineLimit = 1;
    t.minimumScaleFactor = 1;
    if (!accessory) addShadow(t, shadowAlpha);
  }
}

function addRuleBlock(w, rule, opts) {
  const accessory = !!opts.accessory;
  const family = opts.family || familyName();
  const maxW = contentWidth();
  let titleSize = opts.titleSize;
  let bodySize = opts.bodySize;

  if (!accessory) {
    const baseLines = estimateRuleLineTotal(rule, titleSize, bodySize, maxW);
    // короткие карточки (как Past Simple ?/−) — крупнее кегль
    if (baseLines <= 5) {
      titleSize += family === "large" ? 6 : family === "small" ? 2 : 4;
      bodySize += family === "large" ? 4 : family === "small" ? 1 : 3;
    } else if (baseLines <= 6) {
      titleSize += family === "large" ? 3 : 2;
      bodySize += family === "large" ? 2 : 1;
    }
  }

  const meaningSize = accessory
    ? Math.max(10, bodySize - 1)
    : Math.max(13, bodySize - 1);
  const tipSize = Math.max(11, bodySize - 2);
  const scale = accessory ? 0.65 : 0.85;

  function linesOf(text, size, maxLines) {
    if (accessory) return String(text || "").trim() ? [String(text)] : [];
    const lines = wrapLines(
      String(text || ""),
      size,
      Math.max(40, maxW - 2),
      maxLines || 2
    );
    return lines.length ? lines : String(text || "").trim() ? [String(text)] : [];
  }

  const titleLines = linesOf(rule.title, titleSize, 2);
  const meaningLines = rule.meaning ? linesOf(rule.meaning, meaningSize, 2) : [];
  const formulaLines = linesOf(rule.formula, bodySize, 2);
  const tipLines = rule.tip ? linesOf(rule.tip, tipSize, 2) : [];

  const totalLines =
    titleLines.length +
    meaningLines.length +
    formulaLines.length +
    tipLines.length;
  // 4 строки — «воздушно», 8+ — плотно
  const sat = accessory
    ? 1
    : Math.max(0, Math.min(1, (totalLines - 4) / 4));
  const spreadFlex = !accessory && sat < 0.4;
  const gap = accessory ? 1 : gapForSaturation(sat, family);

  function between() {
    if (accessory) w.addSpacer(1);
    else if (spreadFlex) w.addSpacer();
    else w.addSpacer(Math.max(gap, 4));
  }

  if (titleLines.length) {
    if (accessory) {
      const title = leftText(w.addText(rule.title));
      title.font = Font.boldSystemFont(titleSize);
      title.textColor = enColor();
      title.lineLimit = 2;
      title.minimumScaleFactor = scale;
    } else {
      for (let i = 0; i < titleLines.length; i++) {
        const title = leftText(w.addText(titleLines[i]));
        title.font = Font.boldSystemFont(titleSize);
        title.textColor = enColor();
        title.lineLimit = 1;
        title.minimumScaleFactor = 1;
        addShadow(title, 0.5);
      }
    }
  }

  if (meaningLines.length) {
    between();
    if (accessory) {
      const meaning = leftText(w.addText(rule.meaning));
      meaning.font = Font.systemFont(meaningSize);
      meaning.textColor = ruColor(0.95);
      meaning.lineLimit = 2;
      meaning.minimumScaleFactor = scale;
    } else {
      addRuleTextLines(
        w,
        meaningLines,
        Font.systemFont(meaningSize),
        ruColor(0.95),
        0.4,
        false
      );
    }
  }

  if (formulaLines.length) {
    between();
    if (accessory) {
      const formula = leftText(w.addText(rule.formula));
      formula.font = Font.systemFont(bodySize);
      formula.textColor = ruColor(0.8);
      formula.lineLimit = 2;
      formula.minimumScaleFactor = scale;
    } else {
      addRuleTextLines(
        w,
        formulaLines,
        Font.systemFont(bodySize),
        ruColor(0.8),
        0.35,
        false
      );
    }
  }

  if (tipLines.length) {
    between();
    if (accessory) {
      const tip = leftText(w.addText(rule.tip));
      tip.font = Font.systemFont(tipSize);
      tip.textColor = ruColor(0.68);
      tip.lineLimit = 2;
      tip.minimumScaleFactor = scale;
    } else {
      addRuleTextLines(
        w,
        tipLines,
        Font.systemFont(tipSize),
        ruColor(0.68),
        0.3,
        false
      );
    }
  }
}

function wrapLines(text, fontSize, maxWidth, maxLines) {
  const words = String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) return [];
  const limit = maxLines || 2;
  const lines = [];
  let i = 0;
  while (i < words.length && lines.length < limit) {
    let cur = words[i];
    i += 1;
    while (i < words.length) {
      const trial = cur + " " + words[i];
      if (measureTextWidth(trial, fontSize, false) <= maxWidth) {
        cur = trial;
        i += 1;
      } else {
        break;
      }
    }
    if (lines.length === limit - 1 && i < words.length) {
      cur = cur + " " + words.slice(i).join(" ");
      i = words.length;
    }
    lines.push(cur);
  }
  return lines;
}

/** Строки перевода для слота (accessory — одной строкой). */
function ruLinesFor(word, ruSize, maxW, accessory) {
  const ruText = (word && word.exRu) || (word && word.ru) || "";
  if (accessory) return ruText ? [ruText] : [];
  let lines = wrapLines(ruText, ruSize, Math.max(40, maxW - 2), 2);
  if (!lines.length && ruText) lines = [ruText];
  return lines;
}

/**
 * Насыщенность 0..1 → зазор между блоками (редко шире, плотно уже).
 */
function gapForSaturation(sat, family) {
  const t = Math.max(0, Math.min(1, sat));
  let loose = 14;
  let tight = 3;
  if (family === "large") {
    loose = 18;
    tight = 6;
  } else if (family === "small") {
    loose = 10;
    tight = 2;
  }
  return Math.round(loose + (tight - loose) * t);
}

/**
 * EN + перевод. Перевод — до двух отдельных Text-строк (не \n),
 * иначе Scriptable часто режет «…» внутри stack.
 */
function addExampleBlock(w, word, opts) {
  const enSize = opts.enSize;
  const ruSize = opts.ruSize;
  const ruAlpha = opts.ruAlpha;
  const accessory = !!opts.accessory;
  const maxW = opts.slotWidth || contentWidth();
  const sentence = (word && word.ex) || (word && word.en) || "";
  const lines =
    opts.ruLines && opts.ruLines.length
      ? opts.ruLines
      : ruLinesFor(word, ruSize, maxW, accessory);

  addHighlightedLine(w, sentence, word.en, enSize, accessory, maxW);

  w.addSpacer(accessory ? 1 : 2);

  for (let i = 0; i < lines.length; i++) {
    const ru = leftText(w.addText(lines[i]));
    ru.font = Font.systemFont(ruSize);
    ru.textColor = ruColor(ruAlpha);
    ru.lineLimit = 1;
    ru.minimumScaleFactor = 1;
    if (!accessory) addShadow(ru, 0.4);
  }
}

function addSmallWordsBlock(w, progress) {
  const words = wordsForSmall(progress).slice(0, 4);
  const n = words.length;
  if (!n) {
    const t = leftText(w.addText("—"));
    t.font = Font.boldSystemFont(16);
    t.textColor = enColor();
    return;
  }
  const size = n <= 2 ? 20 : n === 3 ? 17 : 15;
  for (let i = 0; i < n; i++) {
    if (i > 0) w.addSpacer();
    const t = leftText(w.addText(words[i].en));
    t.font = Font.boldSystemFont(size);
    t.textColor = enColor();
    t.lineLimit = 2;
    t.minimumScaleFactor = 0.75;
    addShadow(t, 0.45);
  }
  w.addSpacer();
}

/** Перенос без лимита строк — ничего не сливаем в «…» на последней строке. */
function wrapAllLines(text, fontSize, maxWidth, bold) {
  const words = String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) return [];
  const maxW = Math.max(40, maxWidth);
  const lines = [];
  let i = 0;
  while (i < words.length) {
    let cur = words[i];
    i += 1;
    while (i < words.length) {
      const trial = cur + " " + words[i];
      if (measureTextWidth(trial, fontSize, !!bold) <= maxW) {
        cur = trial;
        i += 1;
      } else {
        break;
      }
    }
    lines.push(cur);
  }
  return lines;
}

function interviewContentHeight(family) {
  const f = family || familyName();
  let h = widgetOuterHeight();
  if (f === "large" || f === "extraLarge") return Math.max(120, h - 16);
  return Math.max(80, h - 16);
}

function textLineHeight(fontSize) {
  return Math.ceil(fontSize * 1.2);
}

/**
 * Подбирает кегль, чтобы вопрос + перевод + ответ влезли по высоте large-виджета.
 */
function fitInterviewLayout(card, family) {
  const maxW = Math.max(40, contentWidth() - 2);
  const availH = interviewContentHeight(family);
  const q = String((card && card.q) || "");
  const qRu = String((card && card.qRu) || "");
  const a = String((card && card.a) || "");
  const aLen = a.length;

  let qSize = family === "extraLarge" ? 18 : 17;
  let aSize = family === "extraLarge" ? 13 : 12;
  let ruSize = 11;
  if (aLen > 900) {
    qSize = 14;
    aSize = 10;
    ruSize = 10;
  } else if (aLen > 500) {
    qSize = 15;
    aSize = 11;
    ruSize = 10;
  }

  const minQ = 12;
  const minA = 8;
  const minRu = 9;
  let sectionGap = 4;

  let qLines = [];
  let ruLines = [];
  let aLines = [];
  let totalH = 0;

  for (let attempt = 0; attempt < 32; attempt++) {
    qLines = wrapAllLines(q, qSize, maxW, true);
    ruLines = qRu ? wrapAllLines(qRu, ruSize, maxW, false) : [];
    aLines = wrapAllLines(a, aSize, maxW, false);
    if (!qLines.length && q) qLines = [q];
    if (!aLines.length && a) aLines = [a];

    const gaps = ruLines.length ? 2 : 1;
    totalH =
      qLines.length * textLineHeight(qSize) +
      ruLines.length * textLineHeight(ruSize) +
      aLines.length * textLineHeight(aSize) +
      gaps * sectionGap;

    if (totalH <= availH) break;

    if (aSize > minA) aSize -= 1;
    else if (qSize > minQ) qSize -= 1;
    else if (ruSize > minRu) ruSize -= 1;
    else if (sectionGap > 0) sectionGap = 0;
    else break;
  }

  return {
    qLines: qLines,
    ruLines: ruLines,
    aLines: aLines,
    qSize: qSize,
    aSize: aSize,
    ruSize: ruSize,
    sectionGap: sectionGap,
  };
}

function addInterviewTextLine(w, line, fontSize, bold, color, shadowAlpha) {
  const t = leftText(w.addText(line));
  t.font = bold ? Font.boldSystemFont(fontSize) : Font.systemFont(fontSize);
  t.textColor = color;
  t.lineLimit = 1;
  t.minimumScaleFactor = 1;
  addShadow(t, shadowAlpha);
}

function addInterviewBlock(w, card, family) {
  const layout = fitInterviewLayout(card, family);

  function sectionGap() {
    w.addSpacer(layout.sectionGap);
  }

  // flex сверху/между блоками/снизу — равномерно по высоте large-виджета
  w.addSpacer();

  for (let i = 0; i < layout.qLines.length; i++) {
    addInterviewTextLine(
      w,
      layout.qLines[i],
      layout.qSize,
      true,
      enColor(),
      0.5
    );
  }

  if (layout.ruLines.length) {
    w.addSpacer();
    sectionGap();
    for (let i = 0; i < layout.ruLines.length; i++) {
      addInterviewTextLine(
        w,
        layout.ruLines[i],
        layout.ruSize,
        false,
        ruColor(0.75),
        0.35
      );
    }
  }

  w.addSpacer();
  sectionGap();
  for (let i = 0; i < layout.aLines.length; i++) {
    addInterviewTextLine(
      w,
      layout.aLines[i],
      layout.aSize,
      false,
      ruColor(0.92),
      0.4
    );
  }

  w.addSpacer();
}

function createWidget(progress) {
  const w = new ListWidget();
  const family = familyName();
  const accessory = isAccessoryFamily(family);
  const large = isLargeFamily(family);

  const padY = large
    ? 8
    : family === "small" || progress.kind === "rule"
      ? 12
      : 16;
  const padX = family === "small" ? 10 : 12;

  w.backgroundColor = Color.clear();
  if (accessory) {
    try {
      w.addAccessoryWidgetBackground = true;
    } catch (e) {}
    w.setPadding(2, 4, 2, 4);
  } else {
    w.setPadding(padY, padX, padY, padX);
  }
  w.refreshAfterDate = nextRefreshDate();
  w.url = tapNextUrl(family);

  // —— small: только английские слова ——
  if (family === "small") {
    addSmallWordsBlock(w, progress);
    return w;
  }

  // —— large: вопрос / ответ из интервью ——
  if (large) {
    const card = progress.interview;
    if (!card || !card.q) {
      const t = leftText(w.addText("Interview Q&A"));
      t.font = Font.boldSystemFont(18);
      t.textColor = enColor();
    } else {
      addInterviewBlock(w, card, family);
    }
    return w;
  }

  let enSize = progress.kind === "rule" ? 18 : 15;
  let ruSize = progress.kind === "rule" ? 15 : 12;
  let relLimit = RELATED_LIMIT;

  if (family === "accessoryRectangular") {
    enSize = 11;
    ruSize = 10;
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
        family: family,
      });
      return w;
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
      const line = leftText(w.addText(main.ex || main.en + " - " + main.ru));
      line.font = Font.systemFont(enSize);
      line.textColor = enColor();
      line.lineLimit = 1;
      line.minimumScaleFactor = 0.6;
    } else {
      const items = [main].concat(related);
      const n = items.length;
      const slotW = contentWidth();
      const prepared = items.map(function (item) {
        return {
          word: item,
          ruLines: ruLinesFor(item, ruSize, slotW, accessory),
        };
      });
      let sat = 0;
      if (accessory) {
        sat = 1;
      } else if (n) {
        let extra = 0;
        for (let j = 0; j < n; j++) {
          extra += Math.max(0, prepared[j].ruLines.length - 1);
        }
        sat = extra / n;
      }
      const spreadFlex = !accessory && sat < 0.34;
      const gap = accessory ? 2 : gapForSaturation(sat, family);

      for (let i = 0; i < n; i++) {
        if (i > 0) {
          if (spreadFlex) w.addSpacer();
          else w.addSpacer(gap);
        }
        addExampleBlock(w, prepared[i].word, {
          enSize: enSize,
          ruSize: ruSize,
          ruAlpha: i === 0 ? 0.92 : 0.8,
          accessory: accessory,
          slotWidth: slotW,
          ruLines: prepared[i].ruLines,
        });
      }
      if (!accessory) w.addSpacer();
      return w;
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
      .map((w) => (w.ex || w.en) + "\n" + (w.exRu || w.ru))
      .join("\n\n");
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
        : (function () {
            const cur = withExample(progress.current);
            return cur && (cur.ex || cur.en);
          })();
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
  const f = tapFamily() || familyName();
  if (isLargeFamily(f)) {
    progress = nextInterview(progress);
  } else {
    progress = nextWord(progress);
  }
  Script.setWidget(createWidget(progress));
  closeToHome();
}

async function main() {
  const family = familyName();
  if (config.runsInWidget) {
    await refreshInterviewDeck(false);
    const progress = ensureCurrentWord(loadProgress(), family);
    Script.setWidget(createWidget(progress));
    return;
  }

  if (isTapNext()) {
    await refreshInterviewDeck(false);
    await runTapNext();
    return;
  }

  await refreshInterviewDeck(true);
  await runMenu(ensureCurrentWord(loadProgress(), "medium"));
  Script.setWidget(createWidget(ensureCurrentWord(loadProgress(), "medium")));
}

module.exports = {
  main,
  PASSIVE_MARKER,
  VOCAB_SIZE,
  RULES_COUNT,
  INTERVIEWS_COUNT,
};
