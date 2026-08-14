// WordOfDayCore — v22: примеры в предложении, слово жирным
const WORDS = [{"en":"a bunch of","ru":"куча","ex":"I bought a bunch of fresh bananas."},{"en":"a lot","ru":"много","ex":"We laughed a lot on the way home."},{"en":"abandoned","ru":"заброшенный","ex":"We found an abandoned house nearby."},{"en":"about to","ru":"вот-вот, собираюсь","ex":"The train is about to leave."},{"en":"about to end","ru":"вот-вот закончится","ex":"Our meeting is about to end."},{"en":"accept","ru":"принять","ex":"She chose to accept the new role."},{"en":"accident","ru":"несчастный случай; авария","ex":"Nobody was hurt in the accident."},{"en":"accidentally","ru":"случайно","ex":"I accidentally deleted the email."},{"en":"accompanied by","ru":"в сопровождении","ex":"The meal was accompanied by salad."},{"en":"accompanied by an adult","ru":"в сопровождении взрослого","ex":"Children must be accompanied by an adult."},{"en":"achieve success","ru":"добиться успеха","ex":"Patience can help you achieve success."},{"en":"across the world","ru":"по всему миру","ex":"They have friends across the world."},{"en":"acrylic markers","ru":"акриловые маркеры","ex":"These acrylic markers dry quickly."},{"en":"acted like that","ru":"повёл себя так","ex":"I’m sorry I acted like that."},{"en":"activity","ru":"занятие, деятельность; активность","ex":"Walking is my favorite activity."},{"en":"adapt","ru":"адаптироваться","ex":"It took me time to adapt to city life."},{"en":"addiction","ru":"зависимость","ex":"Phone addiction can affect sleep."},{"en":"adjust my feed","ru":"настроить ленту","ex":"I need to adjust my feed again."},{"en":"adjustments / corrections","ru":"правки / исправления","ex":"We made a few adjustments today."},{"en":"admit","ru":"признать","ex":"He refused to admit his mistake."},{"en":"admit doing","ru":"признать, что делал(а)","ex":"He wouldn’t admit doing anything wrong."},{"en":"adopt","ru":"усыновить / принять","ex":"They hope to adopt a child someday."},{"en":"affected by","ru":"подверженный влиянию","ex":"Our plans were affected by the rain."},{"en":"affected by trends","ru":"под влиянием трендов","ex":"Young shoppers are affected by trends."},{"en":"afford","ru":"позволить себе","ex":"We can’t afford a bigger apartment."},{"en":"afraid","ru":"боящийся","ex":"She felt afraid walking home alone."},{"en":"afraid of","ru":"бояться","ex":"My dog is afraid of thunderstorms."},{"en":"afraid of losing","ru":"бояться потерять","ex":"He is afraid of losing his job."},{"en":"aftertaste","ru":"послевкусие","ex":"This tea has a bitter aftertaste."},{"en":"agreement","ru":"соглашение","ex":"We finally reached an agreement."},{"en":"algorithm","ru":"алгоритм","ex":"The algorithm suggests new songs."},{"en":"alien","ru":"инопланетянин; чужой","ex":"The movie is about a friendly alien."},{"en":"alien / foreigner / expat","ru":"иностранец, экспат","ex":"As an expat, she misses her family."},{"en":"align with","ru":"соответствовать","ex":"This schedule must align with our goals."},{"en":"already","ru":"уже","ex":"I’ve already washed the dishes."},{"en":"already happened","ru":"уже случилось","ex":"It already happened, so let it go."},{"en":"alumni","ru":"выпускники","ex":"The college invited its alumni back."},{"en":"amaze","ru":"поразить","ex":"Her calm response will amaze you."},{"en":"among","ru":"среди","ex":"I found my keys among the papers."},{"en":"annoyed","ru":"раздражённый","ex":"She looked annoyed by the delay."},{"en":"annoyed by","ru":"раздражён","ex":"I’m annoyed by the loud music."},{"en":"annual income","ru":"годовой доход","ex":"They asked about my annual income."},{"en":"anxiety","ru":"тревога","ex":"A short walk helps ease my anxiety."},{"en":"anxious","ru":"тревожный","ex":"I felt anxious before the interview."},{"en":"anyway","ru":"в любом случае","ex":"It was raining, but we went anyway."},{"en":"appearance","ru":"внешний вид; появление","ex":"Don’t judge anyone by appearance."},{"en":"apply for","ru":"подавать заявку","ex":"I’m going to apply for that job."},{"en":"appointment","ru":"запись, встреча","ex":"My dentist appointment is at three."},{"en":"appreciate","ru":"ценить","ex":"I really appreciate your help."},{"en":"as always","ru":"как всегда","ex":"Dad arrived early, as always."},{"en":"as cool as a cucumber","ru":"спокойный как удав","ex":"She stayed as cool as a cucumber."},{"en":"as usual","ru":"как обычно","ex":"The bus was late, as usual."},{"en":"ashamed","ru":"стыдно","ex":"I felt ashamed of my rude reply."},{"en":"ass is on fire","ru":"срочность / «горят сроки»","ex":"My ass is on fire; this is urgent."},{"en":"assume","ru":"полагать","ex":"Don’t assume everyone agrees."},{"en":"assumed to be","ru":"предполагается (что кто-то/что-то является)","ex":"The old bridge is assumed to be safe."},{"en":"assumption","ru":"предположение","ex":"That assumption turned out to be wrong."},{"en":"at a time","ru":"за раз","ex":"Please answer one question at a time."},{"en":"at least","ru":"хотя бы, минимум","ex":"Call me at least once a week."},{"en":"at the age of","ru":"в возрасте","ex":"She moved abroad at the age of twenty."},{"en":"attempt","ru":"попытка","ex":"My first attempt ended in a mess."},{"en":"attempts","ru":"попытки","ex":"After three attempts, the lock opened."},{"en":"attitude","ru":"отношение","ex":"Her positive attitude lifts the team."},{"en":"attitude to","ru":"отношение к","ex":"His attitude to work has changed."},{"en":"attract attention","ru":"привлекать внимание","ex":"Bright colors attract attention."},{"en":"attractive","ru":"привлекательный","ex":"It’s an attractive offer."},{"en":"automate","ru":"автоматизировать","ex":"We should automate this daily task."},{"en":"automatically","ru":"автоматически","ex":"The lights turn on automatically."},{"en":"automation","ru":"автоматизация","ex":"Automation saves us several hours."},{"en":"avoid a situation","ru":"избегать ситуации","ex":"A call can avoid a situation like this."},{"en":"avoid distractions","ru":"избегать отвлечений","ex":"I mute my phone to avoid distractions."},{"en":"avoid doing","ru":"избегать","ex":"I avoid doing chores late at night."},{"en":"awkward","ru":"неловкий","ex":"Our first date was a little awkward."},{"en":"awkward silence","ru":"неловкая тишина","ex":"An awkward silence filled the room."},{"en":"babysit","ru":"сидеть с детьми","ex":"Can you babysit on Friday night?"},{"en":"babysit / kittensitting","ru":"сидеть с детьми / котятами","ex":"I’ll babysit my niece this weekend."},{"en":"bachelor","ru":"холостяк; бакалавр","ex":"My brother is still a bachelor."},{"en":"back down","ru":"отступить","ex":"She refused to back down."},{"en":"back in town","ru":"снова в городе","ex":"Call me when you’re back in town."},{"en":"back then","ru":"тогда, в то время","ex":"We didn’t have smartphones back then."},{"en":"back up","ru":"поддерживать; делать резервную копию","ex":"Remember to back up your photos."},{"en":"backfire","ru":"выйти боком","ex":"His plan could backfire badly."},{"en":"base form","ru":"начальная форма глагола","ex":"Write each verb in its base form."},{"en":"be exposed to","ru":"быть подверженным; сталкиваться с","ex":"Kids shouldn’t be exposed to that smoke."},{"en":"be into","ru":"увлекаться, любить","ex":"You must be into jazz too."},{"en":"be involved in","ru":"быть вовлечённым","ex":"I’d like to be involved in the project."},{"en":"be judged by","ru":"быть оцениваемым по","ex":"Nobody wants to be judged by looks."},{"en":"be responsible for","ru":"быть ответственным за","ex":"I’ll be responsible for the budget."},{"en":"be surrounded by","ru":"быть окружённым","ex":"I want to be surrounded by good friends."},{"en":"be used to","ru":"быть привыкшим","ex":"You’ll soon be used to the noise."},{"en":"bear a child","ru":"родить ребёнка","ex":"She chose to bear a child on her own."},{"en":"bear weight","ru":"нести тяжесть","ex":"This old shelf can’t bear weight."},{"en":"become aware of","ru":"осознать","ex":"Travel helps us become aware of bias."},{"en":"bedsheets","ru":"постельное бельё","ex":"I changed the bedsheets this morning."},{"en":"behave","ru":"вести себя","ex":"Please behave at Grandma’s house."},{"en":"being constructed","ru":"строится","ex":"A new hotel is being constructed."},{"en":"belief","ru":"убеждение","ex":"Her belief in me kept me going."},{"en":"besides","ru":"помимо","ex":"Besides, we can always go tomorrow."},{"en":"besides it","ru":"помимо этого","ex":"Besides it, there is one more option."},{"en":"binge-watching","ru":"марафон сериалов","ex":"We spent Sunday binge-watching dramas."},{"en":"blood test","ru":"анализ крови","ex":"My doctor ordered a blood test."},{"en":"bond","ru":"связь","ex":"Travel created a strong bond between us."},{"en":"boring","ru":"скучный","ex":"The lecture was surprisingly boring."},{"en":"boring / rude / cruel","ru":"скучный / грубый / жестокий","ex":"The movie was boring, so we left."},{"en":"bother","ru":"беспокоить","ex":"Does the street noise bother you?"},{"en":"bottle up","ru":"держать в себе","ex":"Don’t bottle up your feelings."},{"en":"bottled up","ru":"держал в себе","ex":"Years of bottled up anger came out."},{"en":"brand","ru":"бренд","ex":"This brand makes sturdy backpacks."},{"en":"breadwinner","ru":"кормилец; кормилец семьи","ex":"Her mother is the family breadwinner."},{"en":"break down","ru":"сорваться эмоционально; срыв","ex":"I tend to break down when I’m exhausted."},{"en":"break it down","ru":"разобрать, объяснить","ex":"Could you break it down for me?"},{"en":"brew coffee","ru":"заваривать кофе","ex":"I brew coffee every morning."},{"en":"brief","ru":"краткий; брифинг, инструктаж","ex":"Let’s keep the meeting brief."},{"en":"bring people together","ru":"объединять людей","ex":"Good food can bring people together."},{"en":"bring someone down","ru":"подавлять, расстраивать кого-то","ex":"Harsh comments can bring someone down."},{"en":"bring success","ru":"приносить успех","ex":"Hard work alone may not bring success."},{"en":"bring up","ru":"поднимать тему","ex":"I didn’t want to bring up money."},{"en":"broaden imagination","ru":"расширять воображение","ex":"Stories can broaden imagination."},{"en":"brochure","ru":"брошюра","ex":"I picked up a travel brochure."},{"en":"build","ru":"строить; создавать","ex":"We plan to build a small cabin."},{"en":"build trust","ru":"строить доверие","ex":"Honest talks help build trust."},{"en":"build up","ru":"наращивать, укреплять","ex":"Small wins build up your confidence."},{"en":"busy with work","ru":"занят работой","ex":"I’ve been busy with work all week."},{"en":"busy working","ru":"занят работой","ex":"She’s busy working on the report."},{"en":"by / until","ru":"к / до","ex":"Please send the form by Friday."},{"en":"by the time","ru":"к тому времени как","ex":"Dinner was cold by the time I arrived."},{"en":"calm down","ru":"успокоиться","ex":"Take a breath and calm down."},{"en":"can't help doing","ru":"не мочь удержаться от того, чтобы; невольно делать","ex":"I can't help doing her chores for her."},{"en":"can't stand doing","ru":"терпеть не могу","ex":"I can't stand doing paperwork."},{"en":"canned food","ru":"консервы","ex":"We keep canned food for emergencies."},{"en":"car accident","ru":"автоавария","ex":"He was shaken after the car accident."},{"en":"career","ru":"карьера","ex":"She wants a career in design."},{"en":"carry a bag","ru":"нести сумку","ex":"I carry a bag to work every day."},{"en":"carry out","ru":"выполнять, осуществлять, реализовывать","ex":"The team will carry out the plan."},{"en":"carry out a survey","ru":"провести опрос","ex":"We need to carry out a survey."},{"en":"carry-on","ru":"ручная кладь","ex":"My carry-on fits under the seat."},{"en":"carry-on bag","ru":"ручная кладь","ex":"Your carry-on bag is too heavy."},{"en":"catch","ru":"ловить; уловить смысл","ex":"Did you catch what she said?"},{"en":"catch meaning","ru":"уловить смысл","ex":"Context helps us catch meaning quickly."},{"en":"catch up on","ru":"наверстать","ex":"I need to catch up on my emails."},{"en":"catch up on sleep","ru":"отоспаться","ex":"I need the weekend to catch up on sleep."},{"en":"catch up with","ru":"наверстать; встретиться","ex":"Let’s meet and catch up with each other."},{"en":"catch up with husband","ru":"встретиться с мужем","ex":"My note says: catch up with husband."},{"en":"catch up with you","ru":"настигнуть тебя; встретиться / поболтать","ex":"I’d love to catch up with you soon."},{"en":"caught up on","ru":"наверстал","ex":"I finally caught up on my emails."},{"en":"ceiling","ru":"потолок","ex":"There’s a crack in the ceiling."},{"en":"challenge","ru":"вызов, сложность","ex":"Starting over was a real challenge."},{"en":"challenge stereotypes","ru":"бросать вызов стереотипам","ex":"These stories challenge stereotypes."},{"en":"change your mind","ru":"передумать","ex":"You can still change your mind."},{"en":"change your perspective","ru":"изменить взгляд","ex":"Travel can change your perspective."},{"en":"cheapskate","ru":"скряга","ex":"Don’t be a cheapskate; leave a tip."},{"en":"check out","ru":"посмотреть, изучить","ex":"You should check out this new café."},{"en":"chill out","ru":"расслабиться","ex":"Let’s stay home and chill out."},{"en":"circumstances","ru":"обстоятельства","ex":"Plans change when circumstances shift."},{"en":"citizenship","ru":"гражданство","ex":"She applied for citizenship last year."},{"en":"clue","ru":"улика; подсказка; ключ к разгадке","ex":"I don’t have a clue where he went."},{"en":"coincidence","ru":"совпадение","ex":"Meeting there was a funny coincidence."},{"en":"collaboration","ru":"сотрудничество","ex":"The launch was a team collaboration."},{"en":"come across","ru":"случайно наткнуться","ex":"I often come across old photos."},{"en":"come across a book","ru":"наткнуться на книгу","ex":"I happened to come across a book there."},{"en":"come back","ru":"вернуться","ex":"Please come back before dark."},{"en":"come up with","ru":"придумать","ex":"Can we come up with a better plan?"},{"en":"come up with an idea","ru":"придумать идею","ex":"Let’s come up with an idea together."},{"en":"comfortable","ru":"удобный (комфортный)","ex":"These shoes are really comfortable."},{"en":"commercial product","ru":"коммерческий продукт","ex":"It’s ready to become a commercial product."},{"en":"commitment","ru":"обязательство","ex":"A pet is a long-term commitment."},{"en":"communication","ru":"коммуникация, общение","ex":"Clear communication prevents mistakes."},{"en":"compared to","ru":"по сравнению с","ex":"Rent is low compared to London."},{"en":"complain about","ru":"жаловаться","ex":"He likes to complain about traffic."},{"en":"concerns","ru":"опасения","ex":"Please share your concerns with me."},{"en":"conclude","ru":"сделать вывод","ex":"We can conclude the meeting now."},{"en":"confusion","ru":"путаница","ex":"The new schedule caused confusion."},{"en":"conscious","ru":"в сознании; осознающий","ex":"He was conscious after the fall."},{"en":"consciousness","ru":"сознание","ex":"She briefly lost consciousness."},{"en":"consider doing","ru":"рассматривать","ex":"You should consider doing yoga."},{"en":"considered","ru":"считается","ex":"This area is considered safe."},{"en":"constantly","ru":"постоянно","ex":"My phone is constantly buzzing."},{"en":"construct","ru":"строить","ex":"They plan to construct a new bridge."},{"en":"construction planning","ru":"планирование строительства","ex":"She works in construction planning."},{"en":"contribute","ru":"вносить вклад","ex":"Everyone can contribute an idea."},{"en":"convenient","ru":"удобный (время/место)","ex":"Is six o’clock convenient for you?"},{"en":"coordinate","ru":"координировать","ex":"I’ll coordinate the travel plans."},{"en":"count on","ru":"рассчитывать на","ex":"You can always count on your sister."},{"en":"count on / rely on","ru":"рассчитывать / полагаться","ex":"You can count on me."},{"en":"cozy","ru":"уютный","ex":"This little café feels cozy."},{"en":"create","ru":"создавать","ex":"Let’s create a shared calendar."},{"en":"cross-functional","ru":"кросс-функциональный","ex":"We formed a cross-functional team."},{"en":"crowded","ru":"людный","ex":"The train was crowded this morning."},{"en":"crowded / packed","ru":"многолюдно / битком","ex":"The beach gets crowded at noon."},{"en":"cruel","ru":"жестокий","ex":"It was cruel to leave the dog outside."},{"en":"current tasks","ru":"текущие задачи","ex":"Let’s review our current tasks."},{"en":"currently","ru":"в настоящее время","ex":"She is currently working from home."},{"en":"customer","ru":"заказчик, клиент","ex":"The customer asked for a refund."},{"en":"cut back on","ru":"сократить потребление","ex":"I’m trying to cut back on sugar."},{"en":"day off","ru":"выходной","ex":"I’m taking a day off tomorrow."},{"en":"deadline","ru":"срок, дедлайн","ex":"The deadline is next Monday."},{"en":"deadline approaching","ru":"срок приближается","ex":"With the deadline approaching, we focused."},{"en":"deal with","ru":"справляться с, заниматься","ex":"I’ll deal with the broken sink."},{"en":"deal with a problem","ru":"решать проблему","ex":"We must deal with a problem at work."},{"en":"deal with uncertainty","ru":"справляться с неопределенностью","ex":"It’s hard to deal with uncertainty."},{"en":"dealing with problem","ru":"решение проблемы","ex":"We discussed dealing with problem debt."},{"en":"debts","ru":"долги","ex":"He finally paid off his debts."},{"en":"debts catch up","ru":"долги настигнут","ex":"Ignore bills, and your debts catch up."},{"en":"decision","ru":"решение","ex":"Moving abroad was a big decision."},{"en":"decisive","ru":"решительный","ex":"We need a decisive leader today."},{"en":"delay","ru":"задержка","ex":"Fog caused a two-hour delay."},{"en":"delay doing","ru":"откладывать","ex":"Don’t delay doing the laundry."},{"en":"delegate","ru":"делегировать","ex":"A good manager knows when to delegate."},{"en":"delicious","ru":"вкусный","ex":"This homemade soup is delicious."},{"en":"deny doing","ru":"отрицать","ex":"She can’t deny doing it herself."},{"en":"depend on","ru":"зависеть от","ex":"You can depend on me."},{"en":"depends on","ru":"зависеть от","ex":"The price depends on the season."},{"en":"depressive","ru":"депрессивный","ex":"He was in a depressive state."},{"en":"designer","ru":"проектировщик, дизайнер","ex":"We hired a designer for the kitchen."},{"en":"desire","ru":"желание","ex":"I have no desire to argue."},{"en":"desperate","ru":"отчаянный","ex":"I was desperate for a quiet night."},{"en":"desperation","ru":"отчаяние","ex":"He called me in desperation."},{"en":"develop","ru":"разрабатывать, развивать","ex":"I want to develop better habits."},{"en":"developer","ru":"разработчик","ex":"My cousin works as a developer."},{"en":"development","ru":"развитие","ex":"The app is still in development."},{"en":"didn't last long","ru":"длилось недолго","ex":"Our sunny weather didn't last long."},{"en":"direction","ru":"направление","ex":"Could you point me in the right direction?"},{"en":"discount","ru":"скидка","ex":"Students get a ten percent discount."},{"en":"disgusting","ru":"отвратительный","ex":"The milk smells disgusting."},{"en":"dishwasher","ru":"посудомойка","ex":"Please load the dishwasher tonight."},{"en":"distract","ru":"отвлекать","ex":"Loud calls distract me from work."},{"en":"distracting","ru":"отвлекающий","ex":"That flashing light is distracting."},{"en":"disturbing","ru":"тревожащий","ex":"We heard some disturbing news."},{"en":"disturbing state","ru":"тревожное состояние","ex":"He returned home in a disturbing state."},{"en":"dive into","ru":"погрузиться","ex":"Let’s dive into the first topic."},{"en":"do for a living","ru":"зарабатывать на жизнь","ex":"What do you do for a living?"},{"en":"do makeup","ru":"делать макияж","ex":"I usually do makeup by the window."},{"en":"documents","ru":"документы","ex":"Keep your travel documents safe."},{"en":"don't bother","ru":"не беспокой","ex":"Please don't bother; I can manage."},{"en":"don't bother him","ru":"не беспокой его","ex":"Please don't bother him while he works."},{"en":"don’t get me wrong","ru":"не пойми меня неправильно","ex":"Don’t get me wrong, I love this place."},{"en":"doubt","ru":"сомнение","ex":"I have no doubt she’ll succeed."},{"en":"drafting","ru":"черчение","ex":"He does drafting for an architecture firm."},{"en":"drained","ru":"выжатый","ex":"After the meeting, I felt drained."},{"en":"draw attention","ru":"привлекать внимание","ex":"That bright sign will draw attention."},{"en":"draw conclusions","ru":"делать выводы","ex":"Don’t draw conclusions too quickly."},{"en":"drop by","ru":"заглянуть","ex":"Feel free to drop by after work."},{"en":"dull","ru":"скучный, унылый","ex":"The sky looked grey and dull."},{"en":"earn","ru":"зарабатывать","ex":"She works weekends to earn extra cash."},{"en":"earn credibility","ru":"завоёвывать доверие/авторитет","ex":"Honest work helps you earn credibility."},{"en":"earn money","ru":"зарабатывать","ex":"He repairs bikes to earn money."},{"en":"ease","ru":"облегчать","ex":"A warm bath can ease tired muscles."},{"en":"ease pain","ru":"облегчить боль","ex":"This medicine should ease pain."},{"en":"easy on me","ru":"помягче со мной","ex":"Please go easy on me today."},{"en":"eat up","ru":"съесть всё","ex":"Eat up before your food gets cold."},{"en":"efficiently","ru":"эффективно","ex":"We finished the task efficiently."},{"en":"either","ru":"тоже (в отриц.); либо","ex":"I don’t want either option."},{"en":"either way","ru":"так или иначе","ex":"Either way, I’ll support you."},{"en":"elaborate on","ru":"подробнее объяснить","ex":"Could you elaborate on that point?"},{"en":"emotional rollercoaster","ru":"эмоциональные американские горки","ex":"The trip was an emotional rollercoaster."},{"en":"empower","ru":"наделять полномочиями","ex":"Good leaders empower their teams."},{"en":"encourage","ru":"поощрять, воодушевлять","ex":"Her words encourage me to keep going."},{"en":"encourage to","ru":"побуждать","ex":"We use encourage to mean give support."},{"en":"end up","ru":"в итоге оказаться","ex":"We may end up staying home."},{"en":"end up in hell","ru":"попасть в ад","ex":"He joked that we’d end up in hell."},{"en":"ended up being","ru":"в итоге стал","ex":"The trip ended up being wonderful."},{"en":"endurance","ru":"выносливость","ex":"Cycling uphill builds endurance."},{"en":"engineer","ru":"инженер","ex":"An engineer checked the old bridge."},{"en":"enjoy doing","ru":"получать удовольствие от","ex":"I enjoy doing puzzles after dinner."},{"en":"enough","ru":"достаточно","ex":"We have enough food for everyone."},{"en":"entertainment","ru":"развлечение","ex":"The hotel offers evening entertainment."},{"en":"environment","ru":"окружающая среда","ex":"We all need to protect the environment."},{"en":"errands","ru":"поручения","ex":"I have a few errands to run."},{"en":"even though","ru":"хотя","ex":"I went out even though I was tired."},{"en":"even worse","ru":"ещё хуже","ex":"The traffic was even worse today."},{"en":"eventually","ru":"в конце концов","ex":"We eventually found the right address."},{"en":"ever","ru":"когда-либо","ex":"Have you ever traveled alone?"},{"en":"exact","ru":"точный","ex":"Tell me the exact time you arrived."},{"en":"exactly this point","ru":"именно этот момент","ex":"I meant exactly this point."},{"en":"excellent","ru":"отличный","ex":"You did an excellent job today."},{"en":"except","ru":"кроме","ex":"Everyone came except Mark."},{"en":"except / but","ru":"кроме","ex":"Everyone except Lena was ready."},{"en":"exceptional","ru":"исключительный","ex":"Her service was truly exceptional."},{"en":"excite","ru":"волновать","ex":"New places always excite me."},{"en":"excited","ru":"в восторге","ex":"The kids are excited about the trip."},{"en":"excuse","ru":"оправдание; извинение","ex":"That sounds like a weak excuse."},{"en":"exhausted","ru":"измотанный, выдохшийся","ex":"I was exhausted after the long flight."},{"en":"exist","ru":"существовать","ex":"Some old traditions still exist."},{"en":"existence","ru":"существование","ex":"I forgot about the file’s existence."},{"en":"expand vocabulary","ru":"расширять словарь","ex":"Reading daily can expand vocabulary."},{"en":"expansion","ru":"расширение","ex":"The store is closed for expansion."},{"en":"expect","ru":"ожидать","ex":"I expect the package tomorrow."},{"en":"expensive enough","ru":"достаточно дорого","ex":"Rent is expensive enough already."},{"en":"experience feelings","ru":"переживать чувства","ex":"It’s normal to experience feelings deeply."},{"en":"expose","ru":"подвергать / разоблачать","ex":"Don’t expose the plants to cold air."},{"en":"express your opinion","ru":"выражать свое мнение","ex":"It’s safe to express your opinion here."},{"en":"extend","ru":"продлить","ex":"Can we extend our stay by one night?"},{"en":"extraordinary","ru":"необычный","ex":"We had an extraordinary view."},{"en":"face a challenge","ru":"столкнуться с трудностью","ex":"Every new team will face a challenge."},{"en":"failure","ru":"провал","ex":"One failure doesn’t define you."},{"en":"fair","ru":"справедливый; честный","ex":"That doesn’t seem fair to me."},{"en":"fair price","ru":"справедливая цена","ex":"We paid a fair price for the table."},{"en":"fairytale","ru":"сказка","ex":"The village looked like a fairytale."},{"en":"fairytales","ru":"сказки","ex":"My grandmother told wonderful fairytales."},{"en":"fall out","ru":"поссориться","ex":"Good friends sometimes fall out."},{"en":"far enough","ru":"достаточно далеко","ex":"We haven’t walked far enough yet."},{"en":"farewell party","ru":"прощальная вечеринка","ex":"We planned a farewell party for Mia."},{"en":"fasteners","ru":"крепёж","ex":"Check the fasteners on the shelf."},{"en":"fear","ru":"страх","ex":"Her greatest fear is flying."},{"en":"fed","ru":"кормил (feed)","ex":"I fed the cat before leaving."},{"en":"fed up with","ru":"сыт по горло","ex":"I’m fed up with these delays."},{"en":"feedback","ru":"обратная связь","ex":"Thanks for your honest feedback."},{"en":"feel dizzy","ru":"чувствовать головокружение","ex":"Sit down if you feel dizzy."},{"en":"feel hot","ru":"чувствовать жару","ex":"I feel hot in this heavy coat."},{"en":"feel proud of","ru":"гордиться","ex":"You should feel proud of your progress."},{"en":"feel sick","ru":"чувствовать себя плохо","ex":"I feel sick after that boat ride."},{"en":"feel under pressure","ru":"чувствовать давление","ex":"Many people feel under pressure at work."},{"en":"figure","ru":"понять; разобраться","ex":"I figure we can leave after lunch."},{"en":"figure out","ru":"разобраться","ex":"We’ll figure out a solution."},{"en":"find a solution","ru":"находить решение","ex":"Let’s work together to find a solution."},{"en":"find an excuse","ru":"найти оправдание","ex":"He can always find an excuse to leave."},{"en":"find out","ru":"узнать","ex":"I called to find out the price."},{"en":"finish doing","ru":"закончить","ex":"Let me finish doing the dishes first."},{"en":"flexible","ru":"гибкий","ex":"My work schedule is quite flexible."},{"en":"focus on","ru":"сосредоточиться на","ex":"Today I need to focus on one task."},{"en":"foggy","ru":"туманный","ex":"It was too foggy to drive safely."},{"en":"folks","ru":"народ, люди","ex":"The folks next door are friendly."},{"en":"follow this path","ru":"идти этим путём","ex":"Follow this path to reach the lake."},{"en":"for","ru":"в течение","ex":"I’ve lived here for a year."},{"en":"for instance","ru":"например","ex":"For instance, Mia works remotely."},{"en":"for some reason","ru":"по какой-то причине","ex":"For some reason, the door won’t open."},{"en":"for the past month","ru":"за последний месяц","ex":"I’ve worked from home for the past month."},{"en":"force","ru":"заставлять","ex":"Don’t force yourself to stay awake."},{"en":"force majeure","ru":"форс-мажор","ex":"The delay was due to force majeure."},{"en":"force yourself","ru":"заставлять себя","ex":"You can’t force yourself to feel happy."},{"en":"forgive","ru":"прощать","ex":"I hope you can forgive me."},{"en":"form first impressions","ru":"формировать первое впечатление","ex":"People quickly form first impressions."},{"en":"freak out","ru":"паниковать","ex":"Try not to freak out over one mistake."},{"en":"free will","ru":"свобода воли","ex":"Everyone deserves to have free will."},{"en":"full","ru":"сытый; полный","ex":"The bus was full by eight."},{"en":"future in the past","ru":"будущее в прошедшем","ex":"Today we studied future in the past."},{"en":"future perfect","ru":"будущее совершенное","ex":"We practiced the future perfect today."},{"en":"gain confidence","ru":"обрести уверенность","ex":"Small wins help you gain confidence."},{"en":"gain experience","ru":"получать опыт","ex":"Volunteering helps you gain experience."},{"en":"gain popularity","ru":"набирать популярность","ex":"The café began to gain popularity."},{"en":"gather issues","ru":"собрать замечания / вопросы","ex":"Let’s gather issues before the meeting."},{"en":"get / become","ru":"стать, становиться","ex":"Things will get easier soon."},{"en":"get a good deal","ru":"заключить выгодную сделку","ex":"Shop around to get a good deal."},{"en":"get better","ru":"становиться лучше","ex":"Your English will get better soon."},{"en":"get by","ru":"сводить концы с концами","ex":"We can get by on one salary."},{"en":"get distracted","ru":"отвлечься","ex":"I get distracted when my phone buzzes."},{"en":"get dressed","ru":"одеться","ex":"I need ten minutes to get dressed."},{"en":"get injured","ru":"получить травму","ex":"Warm up so you don’t get injured."},{"en":"get involved in","ru":"включиться в","ex":"I want to get involved in local events."},{"en":"get lost","ru":"потеряться","ex":"Save the map so we don’t get lost."},{"en":"get lucky","ru":"повезти","ex":"Sometimes you just get lucky."},{"en":"get me wrong","ru":"неправильно понять","ex":"Please don’t get me wrong."},{"en":"get over","ru":"пережить","ex":"She struggled to get over the breakup."},{"en":"get rejected","ru":"получить отказ","ex":"Don’t be afraid to get rejected."},{"en":"get stuck","ru":"застрять","ex":"Call me if you get stuck."},{"en":"get tangled","ru":"запутаться","ex":"Earphone wires always get tangled."},{"en":"get tired","ru":"уставать","ex":"I get tired after long meetings."},{"en":"get used to","ru":"привыкать","ex":"It takes time to get used to the heat."},{"en":"getting used to","ru":"привыкание","ex":"I’m still getting used to my new job."},{"en":"girly","ru":"девчачий","ex":"She loves bright, girly colors."},{"en":"girly thing","ru":"девчачья штука","ex":"Pink isn’t only a girly thing."},{"en":"give a chance","ru":"дать шанс","ex":"Please give a chance to the new intern."},{"en":"give a lift","ru":"подвезти","ex":"Could you give a lift to Maya?"},{"en":"give an explanation","ru":"давать объяснение","ex":"You need to give an explanation."},{"en":"give up","ru":"бросить, сдаться","ex":"Don’t give up after one bad day."},{"en":"go bananas","ru":"сходить с ума","ex":"The kids go bananas over ice cream."},{"en":"go bananas / nuts / crazy","ru":"сходить с ума","ex":"The crowd will go bananas."},{"en":"go beyond responsibilities","ru":"выйти за рамки обязанностей","ex":"Teams can go beyond responsibilities."},{"en":"go crazy","ru":"сходить с ума","ex":"I’ll go crazy if this noise continues."},{"en":"go crazy / bananas","ru":"сходить с ума","ex":"The fans will go crazy tonight."},{"en":"go nuts","ru":"сходить с ума","ex":"Try not to go nuts over the delay."},{"en":"go on vacation","ru":"отправиться в отпуск","ex":"We hope to go on vacation in June."},{"en":"go through a difficult time","ru":"переживать сложный период","ex":"We all go through a difficult time."},{"en":"go through life with","ru":"прожить жизнь с; идти по жизни вместе с","ex":"I want to go through life with curiosity."},{"en":"god is watching","ru":"бог видит","ex":"Be kind; God is watching."},{"en":"going to","ru":"собираться","ex":"We’re going to cook at home tonight."},{"en":"gonna","ru":"собираюсь (разг. от going to)","ex":"I’m gonna call her after work."},{"en":"good at","ru":"хорош в","ex":"My sister is good at fixing things."},{"en":"good enough","ru":"достаточно хорошо","ex":"Your first draft is good enough."},{"en":"good for you","ru":"молодец","ex":"You finished the course—good for you."},{"en":"gotta","ru":"надо (разг. от have got to)","ex":"I gotta leave before the traffic starts."},{"en":"gradually","ru":"постепенно","ex":"The pain gradually disappeared."},{"en":"graduate","ru":"окончить университет","ex":"I hope to graduate next spring."},{"en":"grey and dull","ru":"серый и унылый","ex":"The whole city looked grey and dull."},{"en":"gross","ru":"противный","ex":"This old sponge smells gross."},{"en":"grow apart","ru":"отдалиться","ex":"Friends sometimes grow apart."},{"en":"grow up","ru":"вырасти","ex":"I want my kids to grow up near nature."},{"en":"guess","ru":"гадать, полагать","ex":"Can you guess what I bought?"},{"en":"guilty","ru":"виновный","ex":"I felt guilty about missing her party."},{"en":"hand in","ru":"сдавать","ex":"Please hand in your form by Friday."},{"en":"hand over","ru":"передать","ex":"You must hand over your passport."},{"en":"handle","ru":"справляться","ex":"She can handle difficult customers."},{"en":"hang out","ru":"проводить время вместе","ex":"We often hang out after work."},{"en":"hard for him","ru":"ему было тяжело","ex":"Moving away was hard for him."},{"en":"hard on yourself","ru":"строг к себе","ex":"Don’t be so hard on yourself."},{"en":"hardly","ru":"едва, почти не","ex":"I could hardly hear her."},{"en":"hardly notice","ru":"едва заметить","ex":"You’ll hardly notice the small scar."},{"en":"have a desire","ru":"иметь желание","ex":"I have a desire to see the world."},{"en":"have a discussion","ru":"проводить обсуждение","ex":"Let’s have a discussion after lunch."},{"en":"have a point","ru":"быть правым, иметь смысл","ex":"You have a point about the cost."},{"en":"have an influence on","ru":"влиять на","ex":"Friends have an influence on our choices."},{"en":"have some rest","ru":"отдохнуть","ex":"You look tired; go have some rest."},{"en":"have you ever","ru":"ты когда-нибудь…?","ex":"Have you ever missed a flight?"},{"en":"head back","ru":"вернуться","ex":"We should head back before dark."},{"en":"head out","ru":"отправиться","ex":"Let’s head out after breakfast."},{"en":"height","ru":"высота","ex":"I’m scared of that height."},{"en":"help yourself","ru":"угощайся","ex":"Please help yourself to some cake."},{"en":"hilarious","ru":"уморительный","ex":"That video was absolutely hilarious."},{"en":"hire","ru":"нанимать","ex":"We need to hire another designer."},{"en":"hit it off","ru":"сразу поладить","ex":"We really hit it off at the party."},{"en":"hold back","ru":"сдерживать","ex":"Don’t let fear hold back your career."},{"en":"homemade","ru":"домашний","ex":"I brought some homemade cookies."},{"en":"horrible","ru":"ужасный","ex":"I had a horrible headache yesterday."},{"en":"horrible things","ru":"ужасные вещи","ex":"Nobody should say such horrible things."},{"en":"horror / horrible","ru":"ужас / ужасный","ex":"We watched a horror movie last night."},{"en":"hot","ru":"горячий; жаркий; сексуально привлекательный","ex":"Be careful—the soup is hot."},{"en":"how come","ru":"как так?","ex":"How come you’re home so early?"},{"en":"huge fan","ru":"большой фанат","ex":"I’m a huge fan of this little café."},{"en":"I am ok with this","ru":"меня это устраивает","ex":"I am ok with this."},{"en":"I can relate","ru":"я понимаю / мне знакомо","ex":"I can relate to that feeling."},{"en":"I don't like it either","ru":"мне тоже не нравится","ex":"I don't like it either."},{"en":"I doubt that","ru":"сомневаюсь","ex":"I doubt that."},{"en":"I hope so","ru":"надеюсь","ex":"I hope so."},{"en":"I know, right?","ru":"вот именно!; да уж!","ex":"I know, right?"},{"en":"I like it too","ru":"мне тоже нравится","ex":"I like it too."},{"en":"I think so","ru":"я так думаю","ex":"I think so."},{"en":"I'd like not to","ru":"я бы не хотел","ex":"I'd like not to discuss it today."},{"en":"I'd rather","ru":"я бы предпочёл","ex":"I'd rather stay home tonight."},{"en":"I'm fed up","ru":"мне надоело","ex":"I'm fed up with this traffic."},{"en":"I'm full","ru":"я сыт","ex":"I'm full, thank you."},{"en":"ill","ru":"больной","ex":"She became ill during the trip."},{"en":"imagine doing","ru":"представлять","ex":"Imagine doing this job without a laptop."},{"en":"immediately","ru":"немедленно","ex":"Please call me immediately."},{"en":"impede","ru":"препятствовать","ex":"Heavy traffic may impede our progress."},{"en":"implement","ru":"внедрять","ex":"We’ll implement the new plan tomorrow."},{"en":"implementation","ru":"внедрение","ex":"The implementation went smoothly."},{"en":"impression","ru":"впечатление","ex":"Her kindness made a strong impression."},{"en":"improve","ru":"улучшать","ex":"Daily walks can improve your mood."},{"en":"improvement","ru":"улучшение","ex":"I can see a real improvement."},{"en":"in advance","ru":"заранее","ex":"Book your tickets in advance."},{"en":"in fact","ru":"на самом деле","ex":"In fact, I’ve already finished."},{"en":"in good shape","ru":"в хорошей форме","ex":"This old bike is still in good shape."},{"en":"in my circle","ru":"в моём кругу","ex":"Remote work is common in my circle."},{"en":"in order to","ru":"чтобы; для того чтобы","ex":"I left early in order to catch the bus."},{"en":"in order to / to","ru":"чтобы","ex":"I called in order to confirm the time."},{"en":"in the age of","ru":"в эпоху","ex":"We work online in the age of apps."},{"en":"in the morning","ru":"утром","ex":"I’ll call you in the morning."},{"en":"in the shadow","ru":"в тени","ex":"We rested in the shadow of a tree."},{"en":"in time","ru":"вовремя (к сроку)","ex":"We arrived in time for dinner."},{"en":"independent","ru":"независимый","ex":"She became independent at eighteen."},{"en":"independently","ru":"независимо","ex":"He completed the task independently."},{"en":"informed decision","ru":"взвешенное решение","ex":"Facts help us make an informed decision."},{"en":"initially","ru":"изначально","ex":"Initially, I found the job difficult."},{"en":"insects","ru":"насекомые","ex":"Keep the window shut to stop insects."},{"en":"instant coffee","ru":"растворимый кофе","ex":"I made instant coffee at the hotel."},{"en":"instead","ru":"вместо","ex":"Let’s walk instead."},{"en":"instead of","ru":"вместо","ex":"We cooked instead of ordering food."},{"en":"intention","ru":"намерение","ex":"I had no intention of staying late."},{"en":"interested in","ru":"интересоваться","ex":"She’s interested in modern art."},{"en":"into art","ru":"увлекаюсь искусством","ex":"My youngest daughter is really into art."},{"en":"invariably","ru":"неизменно","ex":"He invariably arrives five minutes late."},{"en":"issue","ru":"проблема, вопрос","ex":"We need to discuss one small issue."},{"en":"it doesn't matter","ru":"неважно","ex":"It doesn't matter."},{"en":"it seems","ru":"кажется","ex":"It seems we took the wrong turn."},{"en":"it took me","ru":"у меня ушло","ex":"It took me an hour to get home."},{"en":"it was a pleasure","ru":"это было приятно; рад был помочь","ex":"It was a pleasure to meet you."},{"en":"it's pleasant","ru":"приятно","ex":"It's pleasant to sit outside at dusk."},{"en":"i’d rather (think)","ru":"я бы скорее","ex":"I’d rather think before I answer."},{"en":"jealous","ru":"ревнивый","ex":"I felt jealous of her long vacation."},{"en":"job interview","ru":"собеседование","ex":"My job interview starts at ten."},{"en":"journaling","ru":"ведение дневника","ex":"Journaling helps me clear my mind."},{"en":"joy","ru":"радость","ex":"Her visit brought us so much joy."},{"en":"just in time","ru":"как раз вовремя","ex":"We reached the gate just in time."},{"en":"keep a promise","ru":"сдержать обещание","ex":"It’s important to keep a promise."},{"en":"keep doing","ru":"продолжать","ex":"Keep doing what works for you."},{"en":"keep in touch","ru":"поддерживать связь","ex":"Let’s keep in touch after the trip."},{"en":"keep it with you","ru":"держать при себе","ex":"Take your passport and keep it with you."},{"en":"keep silent","ru":"молчать","ex":"I chose to keep silent in the meeting."},{"en":"keep up with","ru":"идти в ногу с","ex":"I can’t keep up with all these messages."},{"en":"keep up with trends","ru":"следовать трендам","ex":"Brands try to keep up with trends."},{"en":"keeps silent","ru":"молчит","ex":"He keeps silent when he feels hurt."},{"en":"killjoy","ru":"человек, портящий настроение","ex":"Don’t be a killjoy; join the game."},{"en":"kinda","ru":"вроде как","ex":"I’m kinda tired today."},{"en":"lack","ru":"нехватка; не хватать","ex":"A lack of sleep affects my mood."},{"en":"lack time","ru":"не хватает времени","ex":"Busy parents often lack time to rest."},{"en":"lacks choices","ru":"не хватает выбора","ex":"This menu lacks choices for vegans."},{"en":"lash extension","ru":"наращивание ресниц","ex":"I booked a lash extension for Friday."},{"en":"lately","ru":"в последнее время","ex":"I’ve been sleeping badly lately."},{"en":"lead","ru":"руководить","ex":"Maya will lead today’s meeting."},{"en":"lead to","ru":"приводить к","ex":"Small errors can lead to big delays."},{"en":"learn / find out","ru":"узнать","ex":"I hope to learn the truth today."},{"en":"learn from mistakes","ru":"учиться на ошибках","ex":"Good leaders learn from mistakes."},{"en":"leave Da Nang for HCMC","ru":"уезжать из Дананга в Хошимин","ex":"We leave Da Nang for HCMC tomorrow."},{"en":"leave for","ru":"уезжать в","ex":"I need to leave for work by eight."},{"en":"leave Vietnam","ru":"уехать из Вьетнама","ex":"They plan to leave Vietnam in May."},{"en":"let go of","ru":"отпустить","ex":"It’s time to let go of that anger."},{"en":"let someone down","ru":"подвести кого-то","ex":"I never want to let someone down."},{"en":"likely","ru":"вероятно","ex":"Rain is likely this afternoon."},{"en":"likely to happen","ru":"вероятно случится","ex":"Another delay is likely to happen."},{"en":"likely to move","ru":"скорее всего перееду","ex":"We’re likely to move next year."},{"en":"link between","ru":"связующее звено между","ex":"We see a link between sleep and mood."},{"en":"little by little","ru":"мало-помалу","ex":"Little by little, the room felt like home."},{"en":"long-lasting","ru":"длительный, долговечный","ex":"We built a long-lasting friendship."},{"en":"long-lasting impression","ru":"неизгладимое впечатление","ex":"Her speech left a long-lasting impression."},{"en":"look around","ru":"осматривать","ex":"Take some time to look around."},{"en":"look at","ru":"смотреть на","ex":"Let’s look at the map again."},{"en":"look forward to","ru":"с нетерпением ждать","ex":"I look forward to our weekend away."},{"en":"look up","ru":"искать (в словаре/справочнике); поднять взгляд","ex":"I’ll look up the address online."},{"en":"lucky","ru":"везучий","ex":"We were lucky to catch the last train."},{"en":"luxurious","ru":"роскошный","ex":"The hotel room felt luxurious."},{"en":"make a commitment","ru":"взять обязательство","ex":"I’m ready to make a commitment."},{"en":"make a decision","ru":"принять решение","ex":"We need to make a decision today."},{"en":"make a judgement","ru":"выносить суждение","ex":"Don’t make a judgement too quickly."},{"en":"make a request","ru":"сделать запрос","ex":"You can make a request at reception."},{"en":"make a suggestion","ru":"делать предложение","ex":"May I make a suggestion?"},{"en":"make an effort","ru":"прилагать усилия","ex":"Please make an effort to arrive early."},{"en":"make an excuse","ru":"оправдаться","ex":"Don’t make an excuse; tell the truth."},{"en":"make assumptions","ru":"делать предположения","ex":"It’s risky to make assumptions."},{"en":"make conclusions","ru":"делать выводы","ex":"We need more facts to make conclusions."},{"en":"make ends meet","ru":"сводить концы с концами","ex":"They work two jobs to make ends meet."},{"en":"make it","ru":"справиться, добиться","ex":"Hurry, or we won’t make it."},{"en":"make it / survive","ru":"справиться / выжить","ex":"I know you can make it."},{"en":"make it clear","ru":"ясно объяснить","ex":"Let me make it clear: I support you."},{"en":"make money","ru":"зарабатывать деньги","ex":"She sells art online to make money."},{"en":"make preserves","ru":"делать заготовки","ex":"We make preserves every autumn."},{"en":"make progress","ru":"добиваться прогресса","ex":"A daily routine helps me make progress."},{"en":"make the most of","ru":"максимально использовать","ex":"Let’s make the most of our day off."},{"en":"make up","ru":"макияж; мириться","ex":"They argued but soon chose to make up."},{"en":"manage to","ru":"суметь, успешно сделать","ex":"Did you manage to catch the bus?"},{"en":"management","ru":"управление","ex":"Good time management reduces stress."},{"en":"manager","ru":"менеджер","ex":"My manager approved my day off."},{"en":"manually","ru":"вручную","ex":"I entered every address manually."},{"en":"married","ru":"женатый / замужняя","ex":"They’ve been married for ten years."},{"en":"match","ru":"совпадать; подходить","ex":"These curtains match the sofa."},{"en":"maternity leave","ru":"декретный отпуск","ex":"She is on maternity leave until June."},{"en":"mature","ru":"зрелый; взрослеть","ex":"He’s mature enough to decide for himself."},{"en":"meet commitments","ru":"выполнять договорённости","ex":"Good planning helps us meet commitments."},{"en":"meet deadlines","ru":"укладываться в сроки","ex":"This calendar helps me meet deadlines."},{"en":"meet expectations","ru":"соответствовать ожиданиям","ex":"The hotel didn’t meet expectations."},{"en":"meet society's expectations","ru":"соответствовать ожиданиям общества","ex":"We try to meet society's expectations."},{"en":"meet up","ru":"встретиться","ex":"Let’s meet up for coffee tomorrow."},{"en":"mention","ru":"упомянуть","ex":"Did she mention the new deadline?"},{"en":"mess up","ru":"напортачить","ex":"I’m afraid I’ll mess up the presentation."},{"en":"message is sent","ru":"сообщение отправлено","ex":"A check appears when the message is sent."},{"en":"mind doing","ru":"быть не против","ex":"Would you mind doing the dishes?"},{"en":"mind-blowing","ru":"сногсшибательный","ex":"The view from the top was mind-blowing."},{"en":"miss doing","ru":"скучать по","ex":"I miss doing yoga with my friends."},{"en":"mistake","ru":"ошибка","ex":"Everyone makes a mistake sometimes."},{"en":"misunderstanding","ru":"недопонимание","ex":"A text caused the misunderstanding."},{"en":"mixed feelings","ru":"смешанные чувства","ex":"I have mixed feelings about moving."},{"en":"money is being earned","ru":"деньги зарабатываются","ex":"Money is being earned online."},{"en":"monitor","ru":"контролировать","ex":"We monitor the budget each week."},{"en":"mood swings","ru":"перепады настроения","ex":"Lack of sleep causes my mood swings."},{"en":"most of","ru":"большая часть","ex":"I spent most of Sunday reading."},{"en":"mould","ru":"плесень","ex":"There’s mould around the bathroom window."},{"en":"move in","ru":"въехать","ex":"We can move in next Saturday."},{"en":"move out","ru":"съехать","ex":"Our neighbors plan to move out."},{"en":"move up","ru":"продвигаться по карьерной лестнице","ex":"She hopes to move up at work."},{"en":"movement","ru":"движение","ex":"The camera detected movement outside."},{"en":"my pleasure","ru":"пожалуйста / «моё удовольствие»","ex":"It was my pleasure to help."},{"en":"my state","ru":"моё состояние","ex":"A short walk improved my state of mind."},{"en":"mysterious","ru":"загадочный","ex":"A mysterious package arrived today."},{"en":"nail","ru":"ноготь","ex":"I broke a nail while opening the box."},{"en":"nail (finger)","ru":"ноготь","ex":"I painted each nail bright red."},{"en":"nail (metal)","ru":"гвоздь","ex":"Use a nail to hang the picture."},{"en":"nail it","ru":"сделать на отлично","ex":"Practice once more, and you’ll nail it."},{"en":"negative attitude","ru":"негативное отношение","ex":"His negative attitude affects the team."},{"en":"neighborhood","ru":"район, соседство","ex":"Our neighborhood is quiet at night."},{"en":"nervous","ru":"нервный","ex":"I always get nervous before flying."},{"en":"never","ru":"никогда","ex":"I’ve never seen snow."},{"en":"never thought I would","ru":"никогда не думал, что","ex":"I never thought I would enjoy running."},{"en":"no doubt","ru":"без сомнения","ex":"There’s no doubt she earned the role."},{"en":"no excuses","ru":"без оправданий","ex":"The coach said, no excuses today."},{"en":"no idea / no clue","ru":"понятия не имею","ex":"I have no idea where my keys are."},{"en":"no strength","ru":"нет сил","ex":"After the flu, I had no strength."},{"en":"no worries","ru":"не переживай","ex":"No worries, I can wait."},{"en":"not worth it","ru":"не стоит того","ex":"The long drive is not worth it."},{"en":"notice","ru":"замечать","ex":"Did you notice her new haircut?"},{"en":"obsessed with","ru":"одержим","ex":"My kids are obsessed with that game."},{"en":"obstacle","ru":"препятствие","ex":"Cost is the main obstacle for us."},{"en":"obviously","ru":"очевидно","ex":"He was obviously tired after the flight."},{"en":"off season","ru":"несезон","ex":"Hotels are cheaper in the off season."},{"en":"ok with","ru":"нормально относиться к","ex":"Are you ok with eating outside?"},{"en":"on purpose","ru":"намеренно","ex":"I didn’t spill it on purpose."},{"en":"on time","ru":"вовремя","ex":"For once, the train arrived on time."},{"en":"once in my life","ru":"однажды в жизни","ex":"Once in my life, I took a real risk."},{"en":"open up","ru":"открыться, рассказать о чувствах","ex":"It took time for him to open up."},{"en":"open-minded","ru":"открытый новому","ex":"Try to stay open-minded about the idea."},{"en":"opportunity","ru":"возможность","ex":"This job is a great opportunity."},{"en":"optimize","ru":"оптимизировать","ex":"We need to optimize our morning routine."},{"en":"options","ru":"варианты","ex":"Let’s review all our options."},{"en":"organize","ru":"организовывать","ex":"I’ll organize the kitchen this weekend."},{"en":"outcomes","ru":"результаты","ex":"We discussed the possible outcomes."},{"en":"oven","ru":"печь","ex":"The bread is still in the oven."},{"en":"overcome","ru":"преодолеть","ex":"Together, we can overcome this setback."},{"en":"overcome / get over","ru":"преодолеть / пережить","ex":"She worked hard to overcome her fear."},{"en":"overcome difficulties","ru":"преодолеть трудности","ex":"Friends help us overcome difficulties."},{"en":"overlapping deadlines","ru":"пересекающиеся сроки","ex":"I’m stressed by overlapping deadlines."},{"en":"overloaded","ru":"перегруженный","ex":"The washing machine is overloaded."},{"en":"overwhelmed","ru":"ошеломлённый; заваленный (делами)","ex":"I felt overwhelmed by all the choices."},{"en":"own up","ru":"признаться","ex":"It’s time to own up to your mistake."},{"en":"pack up","ru":"собрать вещи","ex":"Let’s pack up and leave before dark."},{"en":"packed","ru":"забитый","ex":"The train was packed after the concert."},{"en":"packing","ru":"собирать вещи","ex":"I finished packing before dinner."},{"en":"paid maternity leave","ru":"оплачиваемый декретный отпуск","ex":"Her company offers paid maternity leave."},{"en":"paid sick leave","ru":"оплачиваемый больничный","ex":"My new job includes paid sick leave."},{"en":"paid vacation","ru":"оплачиваемый отпуск","ex":"All staff receive paid vacation."},{"en":"pain in the ass","ru":"заноза в заднице","ex":"This broken printer is a pain in the ass."},{"en":"participate","ru":"участвовать","ex":"Everyone is welcome to participate."},{"en":"partly","ru":"частично","ex":"The road is partly blocked."},{"en":"partly cloudy","ru":"переменная облачность","ex":"Tomorrow will be partly cloudy."},{"en":"partner in crime","ru":"закадычный сообщник; напарник по шалостям","ex":"My sister is my favorite partner in crime."},{"en":"passion fruit","ru":"маракуйя","ex":"This passion fruit tastes sweet."},{"en":"passionate","ru":"страстный","ex":"She’s passionate about animal welfare."},{"en":"passive voice","ru":"страдательный залог","ex":"Put this sentence in the passive voice."},{"en":"past perfect","ru":"прошедшее совершённое","ex":"We studied the past perfect today."},{"en":"patience","ru":"терпение","ex":"Learning a language takes patience."},{"en":"patient","ru":"терпеливый; пациент","ex":"Please be patient with the new staff."},{"en":"pay attention to","ru":"обращать внимание","ex":"Please pay attention to the road."},{"en":"pay extra","ru":"доплатить","ex":"We had to pay extra for breakfast."},{"en":"pay off","ru":"окупиться; выплатить","ex":"All that practice will pay off."},{"en":"pay off a loan","ru":"погасить кредит","ex":"It took us years to pay off a loan."},{"en":"pay off twice","ru":"окупиться вдвойне","ex":"This small upgrade could pay off twice."},{"en":"peace and quiet","ru":"тишина и покой","ex":"I need some peace and quiet."},{"en":"peculiarity","ru":"особенность","ex":"That accent is a local peculiarity."},{"en":"per month","ru":"в месяц","ex":"The gym costs thirty dollars per month."},{"en":"perspective","ru":"перспектива; точка зрения","ex":"Travel gave me a new perspective."},{"en":"pick up","ru":"забрать; подобрать; подхватить","ex":"Can you pick up some milk?"},{"en":"pills / medication","ru":"таблетки / лекарства","ex":"I take these pills after breakfast."},{"en":"pissed off","ru":"взбешён","ex":"She was pissed off about the delay."},{"en":"platform","ru":"платформа","ex":"Wait for me on platform six."},{"en":"pollution","ru":"загрязнение","ex":"Air pollution is bad today."},{"en":"poor","ru":"бедный","ex":"They grew up very poor."},{"en":"pop it","ru":"щёлкнуть (поп-ит)","ex":"Press the bubble and pop it."},{"en":"pop out","ru":"выскочить","ex":"I’ll pop out for some bread."},{"en":"pop up","ru":"всплыть","ex":"A warning may pop up on your screen."},{"en":"position","ru":"должность","ex":"She applied for a senior position."},{"en":"postpone doing","ru":"откладывать","ex":"Let’s postpone doing the repairs."},{"en":"practice doing","ru":"практиковать","ex":"I practice doing presentations at home."},{"en":"prepare for","ru":"готовиться к","ex":"We need to prepare for the storm."},{"en":"pressure","ru":"давление","ex":"I work badly under too much pressure."},{"en":"pretend","ru":"притворяться","ex":"Don’t pretend you didn’t hear me."},{"en":"process","ru":"процесс","ex":"Moving house is a tiring process."},{"en":"project","ru":"проект","ex":"Our new project starts Monday."},{"en":"project manager","ru":"руководитель проекта","ex":"The project manager called a meeting."},{"en":"promise","ru":"обещать","ex":"I promise I’ll call tonight."},{"en":"pronouns","ru":"местоимения","ex":"Today we practiced English pronouns."},{"en":"proposal","ru":"предложение","ex":"The client accepted our proposal."},{"en":"proudest project","ru":"проект, которым больше всего горжусь","ex":"This garden is my proudest project."},{"en":"purpose","ru":"цель, смысл","ex":"This meeting needs a clear purpose."},{"en":"put effort","ru":"приложить усилия","ex":"We put effort into every detail."},{"en":"put on hold","ru":"приостановить, отложить","ex":"The repair was put on hold yesterday."},{"en":"put on music","ru":"включить музыку","ex":"Let’s put on music while we cook."},{"en":"queue","ru":"очередь","ex":"We waited in a long queue."},{"en":"quiet","ru":"тихий","ex":"The house is finally quiet."},{"en":"quit doing","ru":"бросить","ex":"He decided to quit doing night shifts."},{"en":"quite","ru":"довольно","ex":"The exam was quite difficult."},{"en":"radical acceptance","ru":"радикальное принятие","ex":"Therapy taught me radical acceptance."},{"en":"raise awareness","ru":"повышать осведомлённость","ex":"The event will raise awareness of hunger."},{"en":"rapidly","ru":"быстро","ex":"The weather changed rapidly."},{"en":"rare","ru":"редкий","ex":"Snow is rare in this city."},{"en":"rather rare","ru":"довольно редко","ex":"Such warm winter days are rather rare."},{"en":"reach a goal","ru":"достигать цели","ex":"Small steps help you reach a goal."},{"en":"reason","ru":"причина","ex":"There’s a reason I called you."},{"en":"recently","ru":"недавно","ex":"We moved here recently."},{"en":"recommend doing","ru":"рекомендовать","ex":"I recommend doing the tour early."},{"en":"reconsider","ru":"пересмотреть","ex":"The high price made us reconsider."},{"en":"recount","ru":"пересчитать","ex":"Let’s recount the cash together."},{"en":"redistribute","ru":"перераспределить","ex":"We need to redistribute the workload."},{"en":"reduce stress","ru":"снизить стресс","ex":"Daily exercise can reduce stress."},{"en":"refuse","ru":"отказать","ex":"I had to refuse their offer."},{"en":"refuse / reject","ru":"отказать / отклонить","ex":"She may refuse the invitation."},{"en":"regret","ru":"сожалеть","ex":"You won’t regret taking this trip."},{"en":"regular job","ru":"постоянная работа","ex":"He left music for a regular job."},{"en":"reject","ru":"отклонить","ex":"The bank may reject our request."},{"en":"relate to","ru":"понимать, соотносить с собой","ex":"Many parents can relate to this story."},{"en":"relate to it","ru":"это мне близко","ex":"I can really relate to it."},{"en":"relatives","ru":"родственники","ex":"We’re visiting relatives this weekend."},{"en":"relevant","ru":"релевантный","ex":"Please include only relevant details."},{"en":"rely on","ru":"полагаться на","ex":"I rely on this bus to get to work."},{"en":"rely on me","ru":"положись на меня","ex":"You can rely on me."},{"en":"request","ru":"запрос; запросить","ex":"The hotel accepted our request."},{"en":"resonate with","ru":"резонировать с","ex":"Her words resonate with many people."},{"en":"responsibility","ru":"ответственность","ex":"The dog is my responsibility."},{"en":"rest","ru":"отдыхать","ex":"You need to rest after the journey."},{"en":"resting bitch face","ru":"вечно недовольное лицо","ex":"Her resting bitch face scared the intern."},{"en":"retreat","ru":"ретрит; отступление","ex":"She booked a quiet yoga retreat."},{"en":"return","ru":"возвращаться","ex":"I need to return these shoes."},{"en":"rich","ru":"богатый","ex":"His family is quite rich."},{"en":"risk","ru":"риск","ex":"Leaving now is a risk worth taking."},{"en":"risk doing","ru":"рискнуть","ex":"Don’t risk doing the repair alone."},{"en":"role","ru":"роль","ex":"She’s happy in her new role."},{"en":"rude","ru":"грубый","ex":"It’s rude to interrupt people."},{"en":"run into","ru":"случайно встретить","ex":"I often run into Sam at the market."},{"en":"run out of time","ru":"закончиться (о времени); не хватить времени","ex":"We’ll run out of time if we wait."},{"en":"safe","ru":"безопасный","ex":"Is this area safe after dark?"},{"en":"safety","ru":"безопасность","ex":"Your safety matters more than speed."},{"en":"salary","ru":"зарплата","ex":"The new role offers a higher salary."},{"en":"save money","ru":"копить деньги","ex":"Cooking at home helps us save money."},{"en":"save up","ru":"откладывать","ex":"I’m trying to save up for a laptop."},{"en":"scared","ru":"испуганный","ex":"My son is scared of the dark."},{"en":"scared / afraid of","ru":"бояться","ex":"She felt scared during the storm."},{"en":"scared to","ru":"бояться сделать","ex":"I was scared to speak in public."},{"en":"scene","ru":"сцена","ex":"That final scene made me cry."},{"en":"second thoughts","ru":"сомнения; мысли передумать","ex":"I’m having second thoughts about moving."},{"en":"second-guess","ru":"подвергать сомнению","ex":"Try not to second-guess every choice."},{"en":"see differently","ru":"видеть иначе","ex":"This book made me see differently."},{"en":"see off","ru":"провожать","ex":"We went to the station to see off Maya."},{"en":"self-sufficient","ru":"самодостаточный","ex":"She wants to be fully self-sufficient."},{"en":"sense","ru":"чувство","ex":"I had a strange sense of calm."},{"en":"sense of community","ru":"чувство общности","ex":"The neighborhood has a sense of community."},{"en":"sense of pride","ru":"чувство гордости","ex":"Finishing gave me a sense of pride."},{"en":"sense of relief","ru":"чувство облегчения","ex":"I felt a sense of relief after the call."},{"en":"sensitive","ru":"чувствительный","ex":"My skin is sensitive to strong soap."},{"en":"separate","ru":"разделять, отделять; отдельный","ex":"Keep wet clothes in a separate bag."},{"en":"series of books","ru":"серия книг","ex":"She wrote a popular series of books."},{"en":"service fee","ru":"плата за обслуживание","ex":"The bill includes a small service fee."},{"en":"set myself free","ru":"освободить себя","ex":"I quit the job to set myself free."},{"en":"set out","ru":"отправиться в путь","ex":"We set out before sunrise."},{"en":"set out for","ru":"отправиться в","ex":"They set out for the coast at dawn."},{"en":"set up","ru":"создавать, организовывать, наладить, внедрять","ex":"Can you help me set up the new printer?"},{"en":"several","ru":"несколько","ex":"I’ve called her several times."},{"en":"several times","ru":"несколько раз","ex":"We’ve met several times before."},{"en":"shade","ru":"тень","ex":"Let’s sit in the shade."},{"en":"shadow","ru":"тень (от предмета)","ex":"The tree cast a long shadow."},{"en":"shock","ru":"шокировать","ex":"The final bill may shock you."},{"en":"shocking","ru":"шокирующий","ex":"The sudden price rise was shocking."},{"en":"shocking moment","ru":"шокирующий момент","ex":"The crash was a shocking moment."},{"en":"show off","ru":"выпендриваться","ex":"He loves to show off his new car."},{"en":"sick leave","ru":"больничный","ex":"I’m on sick leave until Monday."},{"en":"sick of","ru":"достало","ex":"I’m sick of eating the same lunch."},{"en":"since","ru":"с; с тех пор как; поскольку","ex":"I’ve lived here since 2020."},{"en":"sleep in","ru":"поспать подольше","ex":"I like to sleep in on Sundays."},{"en":"slightly","ru":"слегка","ex":"The window was slightly open."},{"en":"slightly unclear","ru":"слегка неясно","ex":"The last instruction is slightly unclear."},{"en":"smart person","ru":"умный человек","ex":"Ask Lena; she’s a smart person."},{"en":"smelly","ru":"вонючий","ex":"Take those smelly shoes outside."},{"en":"smoothly","ru":"гладко","ex":"The move went smoothly."},{"en":"so far","ru":"до настоящего момента","ex":"So far, everything looks good."},{"en":"solution","ru":"решение","ex":"We finally found a solution."},{"en":"solution will pop up","ru":"решение всплывёт","ex":"Relax; a solution will pop up."},{"en":"solve","ru":"решать","ex":"We need to solve this today."},{"en":"solve a conflict","ru":"решить конфликт","ex":"A calm talk can solve a conflict."},{"en":"sophomore","ru":"студент второго курса","ex":"My brother is a college sophomore."},{"en":"speak volumes","ru":"многое говорит","ex":"Her tired eyes speak volumes."},{"en":"specification","ru":"спецификация","ex":"Check the product specification first."},{"en":"speed up","ru":"ускориться","ex":"We need to speed up the process."},{"en":"spend money","ru":"тратить деньги","ex":"I’d rather spend money on travel."},{"en":"squeezed","ru":"сжатый","ex":"The pillows were squeezed into one box."},{"en":"stably / consistently","ru":"стабильно","ex":"The app has run stably all week."},{"en":"stages","ru":"этапы","ex":"The work happens in three stages."},{"en":"stand up to","ru":"противостоять","ex":"You need to stand up to that bully."},{"en":"standard","ru":"стандарт","ex":"The room meets our usual standard."},{"en":"start from scratch","ru":"начать с нуля","ex":"We had to start from scratch."},{"en":"state","ru":"состояние","ex":"The kitchen was in a terrible state."},{"en":"state of desperation","ru":"состояние отчаяния","ex":"She called me in a state of desperation."},{"en":"stay focused","ru":"сохранять концентрацию","ex":"Take short breaks to stay focused."},{"en":"stay up","ru":"не ложиться спать","ex":"I can’t stay up late tonight."},{"en":"step away","ru":"отойти, дистанцироваться","ex":"It’s okay to step away for a minute."},{"en":"step by step","ru":"шаг за шагом","ex":"We’ll fix it step by step."},{"en":"step down","ru":"уйти с должности","ex":"The manager agreed to step down."},{"en":"step outside your role","ru":"выйти за рамки роли","ex":"Sometimes you must step outside your role."},{"en":"stick to","ru":"придерживаться","ex":"Let’s stick to the original budget."},{"en":"stick to a plan","ru":"придерживаться плана","ex":"It’s easier when you stick to a plan."},{"en":"stigmatized","ru":"стигматизированный","ex":"Mental illness is still stigmatized."},{"en":"stigmatized topics","ru":"стигматизированные темы","ex":"We need to discuss stigmatized topics."},{"en":"stomach ache","ru":"боль в животе","ex":"I stayed home with a stomach ache."},{"en":"stop over","ru":"сделать остановку в пути","ex":"We’ll stop over in Bangkok for one night."},{"en":"stove / cooker","ru":"плита; плитка","ex":"The soup is warming on the stove."},{"en":"strength","ru":"сила","ex":"Her kindness is her greatest strength."},{"en":"strict","ru":"строгий","ex":"My parents were quite strict."},{"en":"strip","ru":"лишать; снимать (одежду); полоска","ex":"Please strip the old paint from the door."},{"en":"strip power","ru":"лишить власти","ex":"The vote could strip power from the mayor."},{"en":"submit documents","ru":"подавать документы","ex":"You must submit documents by Friday."},{"en":"succeed in","ru":"преуспеть в","ex":"She’ll succeed in her new role."},{"en":"success","ru":"успех","ex":"The event was a huge success."},{"en":"successful","ru":"успешный","ex":"Our first market day was successful."},{"en":"suddenly","ru":"неожиданно","ex":"The lights suddenly went out."},{"en":"suffer from","ru":"страдать от","ex":"Many travelers suffer from jet lag."},{"en":"suggest","ru":"предлагать","ex":"I suggest taking an earlier train."},{"en":"suggest doing","ru":"предлагать (что-то делать)","ex":"I suggest doing the easy tasks first."},{"en":"support","ru":"поддерживать","ex":"My family will support my decision."},{"en":"suppose","ru":"предполагать","ex":"I suppose we should leave now."},{"en":"surprise","ru":"удивить","ex":"The gift will surprise her."},{"en":"surprisingly","ru":"удивительно","ex":"The test was surprisingly easy."},{"en":"surround","ru":"окружать","ex":"Tall trees surround the cabin."},{"en":"surrounded by","ru":"окружён","ex":"The hotel is surrounded by gardens."},{"en":"surroundings","ru":"окружение","ex":"I felt safe in these surroundings."},{"en":"survive","ru":"выжить","ex":"These plants can survive the winter."},{"en":"swap","ru":"обмениваться; обмен","ex":"Can we swap seats?"},{"en":"switch off","ru":"выключить","ex":"Please switch off the lights."},{"en":"switch on","ru":"включать","ex":"Could you switch on the fan?"},{"en":"system","ru":"система","ex":"The booking system is down."},{"en":"take a break","ru":"сделать перерыв","ex":"Let’s take a break and get some air."},{"en":"take a chance","ru":"рискнуть","ex":"I decided to take a chance on the job."},{"en":"take action","ru":"принять меры","ex":"We need to take action today."},{"en":"take control of","ru":"взять под контроль","ex":"It’s time to take control of your budget."},{"en":"take into account","ru":"учитывать","ex":"Please take into account the extra cost."},{"en":"take it easy","ru":"не переживать, относиться спокойно","ex":"You look tired, so take it easy."},{"en":"take on","ru":"брать на себя (новую роль/обязанности)","ex":"I can’t take on more work this week."},{"en":"take over","ru":"перенимать, возглавлять","ex":"Mia will take over while I’m away."},{"en":"take part","ru":"участвовать","ex":"Would you like to take part?"},{"en":"take pictures","ru":"фотографировать","ex":"We stopped to take pictures."},{"en":"take place","ru":"проходить / происходить","ex":"The meeting will take place upstairs."},{"en":"take responsibility","ru":"брать ответственность","ex":"He needs to take responsibility."},{"en":"take seriously","ru":"воспринимать серьезно","ex":"It’s a warning we must take seriously."},{"en":"take the piss","ru":"стебаться","ex":"Are you trying to take the piss?"},{"en":"takes a long time","ru":"занимает много времени","ex":"Getting across town takes a long time."},{"en":"talk over","ru":"обсудить","ex":"We need to talk over the travel plans."},{"en":"target audience","ru":"целевая аудитория","ex":"Young parents are our target audience."},{"en":"tasteless","ru":"безвкусный","ex":"The soup was watery and tasteless."},{"en":"team","ru":"команда","ex":"Our team works well together."},{"en":"tell me about yourself","ru":"расскажите о себе","ex":"Tell me about yourself."},{"en":"tend to","ru":"быть склонным","ex":"I tend to wake up early."},{"en":"tend to think","ru":"склонен думать","ex":"I tend to think before I speak."},{"en":"that's what I need","ru":"вот что мне нужно","ex":"That's what I need."},{"en":"the globe is round","ru":"земля круглая","ex":"The globe is round, not flat."},{"en":"the other day","ru":"на днях","ex":"I saw Nina at the store the other day."},{"en":"the thing is","ru":"дело в том","ex":"The thing is, I’m not ready."},{"en":"the way she was treated","ru":"то, как с ней обращались","ex":"I hated the way she was treated."},{"en":"these / those","ru":"эти / те","ex":"These shoes are more comfortable."},{"en":"thick paper","ru":"плотная бумага","ex":"Print the card on thick paper."},{"en":"this / that","ru":"это / то","ex":"This chair is mine."},{"en":"thought escapes me","ru":"мысль ускользает","ex":"The thought escapes me whenever I try."},{"en":"throw a party","ru":"устроить вечеринку","ex":"Let’s throw a party for her birthday."},{"en":"throw away","ru":"выбрасывать","ex":"Don’t throw away that receipt."},{"en":"tired of","ru":"уставший от","ex":"I’m tired of waiting for the bus."},{"en":"to accept","ru":"принять","ex":"I decided to accept the job."},{"en":"to adjust","ru":"скорректировать, подогнать, адаптировать","ex":"Give your eyes time to adjust."},{"en":"to admit","ru":"признать","ex":"He was too proud to admit his mistake."},{"en":"to allow","ru":"позволять","ex":"Open the window to allow fresh air in."},{"en":"to amaze","ru":"поражать","ex":"The view never fails to amaze me."},{"en":"to backfire","ru":"выйти боком","ex":"Their risky plan is likely to backfire."},{"en":"to be familiar with","ru":"быть знакомым с чем-то","ex":"You need to be familiar with the rules."},{"en":"to be late","ru":"опоздать","ex":"I hate to be late for meetings."},{"en":"to bear","ru":"вынашивать; нести","ex":"The pain was too much to bear."},{"en":"to boost","ru":"усилить","ex":"I walk at lunch to boost my energy."},{"en":"to boost workflow","ru":"ускорить рабочий процесс","ex":"We added shortcuts to boost workflow."},{"en":"to carry","ru":"носить","ex":"This box is too heavy to carry."},{"en":"to conclude","ru":"заключить, сделать вывод","ex":"We have enough evidence to conclude."},{"en":"to consider","ru":"рассматривать, считать, подумать","ex":"There are several options to consider."},{"en":"to consume","ru":"потреблять","ex":"We try to consume less power at home."},{"en":"to end up","ru":"в итоге оказаться","ex":"I don’t want to end up alone."},{"en":"to entertain","ru":"развлекать","ex":"We hired a band to entertain the guests."},{"en":"to excite","ru":"волновать, возбуждать","ex":"The trip is sure to excite the kids."},{"en":"to exist","ru":"существовать","ex":"Some species cease to exist."},{"en":"to expand","ru":"расширять","ex":"The shop plans to expand next year."},{"en":"to expect","ru":"ожидать","ex":"What are we supposed to expect?"},{"en":"to extend","ru":"удлинить, продлить","ex":"We decided to extend our stay."},{"en":"to force","ru":"заставлять силой","ex":"They tried to force the door open."},{"en":"to forgive","ru":"простить","ex":"I’m learning to forgive myself."},{"en":"to hurry","ru":"спешить","ex":"There’s no need to hurry."},{"en":"to increase","ru":"повысить","ex":"We need to increase our savings."},{"en":"to mature","ru":"взрослеть","ex":"Some cheeses take years to mature."},{"en":"to mention","ru":"упоминать","ex":"I forgot to mention the meeting."},{"en":"to nag","ru":"пилить, ворчать, доставать","ex":"I don’t mean to nag, but please call her."},{"en":"to pretend","ru":"делать вид","ex":"It’s exhausting to pretend you’re fine."},{"en":"to promote","ru":"продвигать","ex":"They use social media to promote the café."},{"en":"to reschedule","ru":"перенести","ex":"I need to reschedule my appointment."},{"en":"to schedule","ru":"планировать","ex":"Remember to schedule your blood test."},{"en":"to shock","ru":"шокировать","ex":"The news is likely to shock everyone."},{"en":"to struggle with","ru":"испытывать трудности с","ex":"It’s normal to struggle with change."},{"en":"to sweat","ru":"потеть","ex":"You’re going to sweat in that coat."},{"en":"to treat equally","ru":"обращаться одинаково","ex":"The goal is to treat equally both groups."},{"en":"to unwind","ru":"расслабиться","ex":"I read before bed to unwind."},{"en":"to value / appreciate","ru":"ценить","ex":"We need to value each person’s time."},{"en":"traffic","ru":"дорожное движение","ex":"Morning traffic was unusually light."},{"en":"trainer","ru":"тренер","ex":"My trainer made a new workout plan."},{"en":"travel","ru":"путешествовать","ex":"I love to travel by train."},{"en":"treat like a queen","ru":"относиться как к королеве","ex":"They treat like a queen every guest here."},{"en":"treat well","ru":"хорошо относиться","ex":"Guests we treat well often return."},{"en":"treatment","ru":"лечение, уход","ex":"The new treatment eased her pain."},{"en":"trends won't last","ru":"тренды не продлятся","ex":"Most online trends won't last."},{"en":"triggered","ru":"задетый, триггернутый","ex":"That comment left me feeling triggered."},{"en":"triggered by","ru":"задетый чем-то","ex":"Her anxiety was triggered by the noise."},{"en":"triggering","ru":"триггерящий","ex":"That scene may be triggering for some."},{"en":"trust in anyone","ru":"доверять кому бы то ни было","ex":"She finds it hard to trust in anyone."},{"en":"trust in yourself","ru":"верить в себя","ex":"Learn to trust in yourself."},{"en":"turn down","ru":"отклонять, отказываться","ex":"I had to turn down the offer."},{"en":"turn on","ru":"включать","ex":"Please turn on the kitchen light."},{"en":"turn out","ru":"оказаться","ex":"Things may turn out better than expected."},{"en":"turn out well","ru":"хорошо обернуться","ex":"I hope everything will turn out well."},{"en":"turned out to be","ru":"оказался","ex":"The quiet guest turned out to be funny."},{"en":"twice as much","ru":"в два раза больше","ex":"This hotel costs twice as much."},{"en":"two ways to act","ru":"два способа действовать","ex":"You have two ways to act now."},{"en":"UFO","ru":"НЛО","ex":"We joked that the light was a UFO."},{"en":"unclear","ru":"неясный","ex":"The last part of the email is unclear."},{"en":"unconscious","ru":"бессознательный","ex":"The driver was found unconscious."},{"en":"under pressure","ru":"под давлением","ex":"I make mistakes when I’m under pressure."},{"en":"unfair","ru":"несправедливый","ex":"The new rule seems unfair."},{"en":"unflavoured","ru":"без ароматизаторов, натуральный (без вкуса)","ex":"I prefer plain, unflavoured yogurt."},{"en":"unnecessary","ru":"ненужный","ex":"That extra meeting was unnecessary."},{"en":"uplifted","ru":"окрылённый","ex":"I felt uplifted after our talk."},{"en":"used to","ru":"раньше (делал)","ex":"I used to walk to school."},{"en":"user","ru":"пользователь","ex":"Each user needs a secure password."},{"en":"UTC","ru":"часовой пояс UTC","ex":"The call starts at noon UTC."},{"en":"vague","ru":"смутный, туманный","ex":"His answer was too vague to help."},{"en":"valuable","ru":"ценный","ex":"Your honest feedback is valuable."},{"en":"valuable lesson","ru":"ценный урок","ex":"That mistake taught me a valuable lesson."},{"en":"value / appreciate","ru":"ценить","ex":"I value our time together."},{"en":"value for money","ru":"соотношение цены и качества","ex":"This hotel offers good value for money."},{"en":"values","ru":"ценности","ex":"We share the same family values."},{"en":"visarun","ru":"визаран","ex":"My next visarun is in September."},{"en":"vocation / vacation","ru":"призвание / отпуск","ex":"Teaching has always been her vocation."},{"en":"volume","ru":"том; громкость","ex":"Please turn down the volume."},{"en":"volumes","ru":"тома","ex":"The library owns all six volumes."},{"en":"wage","ru":"зарплата, ставка (оплата труда)","ex":"They pay a fair hourly wage."},{"en":"wage / salary / income","ru":"ставка / зарплата / доход","ex":"Her wage increased this year."},{"en":"want more","ru":"хотеть большего","ex":"It’s natural to want more from life."},{"en":"warm up","ru":"разминаться","ex":"Always warm up before lifting weights."},{"en":"waste energy","ru":"тратить энергию зря","ex":"Don’t waste energy on petty arguments."},{"en":"waste money","ru":"транжирить деньги","ex":"We shouldn’t waste money on fast fashion."},{"en":"waste time","ru":"тратить время зря","ex":"Don’t waste time waiting for perfect."},{"en":"watch","ru":"смотреть; наблюдать; часы","ex":"We watch a film every Friday."},{"en":"watercolors","ru":"акварель","ex":"She painted the sunset with watercolors."},{"en":"we'll see","ru":"посмотрим","ex":"We'll see what happens tomorrow."},{"en":"weights","ru":"гантели, веса","ex":"I lift weights twice a week."},{"en":"what is it like","ru":"каково это","ex":"What is it like to live abroad?"},{"en":"where do you see yourself","ru":"где вы видите себя","ex":"Where do you see yourself in five years?"},{"en":"why should we hire you","ru":"почему мы должны вас нанять","ex":"Why should we hire you?"},{"en":"willing to","ru":"готовый","ex":"I’m willing to help this weekend."},{"en":"willpower","ru":"сила воли","ex":"Quitting sugar took real willpower."},{"en":"wise","ru":"мудрый","ex":"Saving some cash was a wise choice."},{"en":"within","ru":"в течение","ex":"Please reply within three days."},{"en":"within a year","ru":"в течение года","ex":"We hope to move within a year."},{"en":"without a purpose","ru":"без цели","ex":"I felt lost without a purpose."},{"en":"won't bring joy","ru":"не принесёт радости","ex":"More stuff won't bring joy."},{"en":"word-of-mouth","ru":"сарафанное радио","ex":"The café grew through word-of-mouth."},{"en":"work out","ru":"получиться; сработать; тренироваться","ex":"I hope everything will work out."},{"en":"workflow","ru":"рабочий процесс","ex":"This tool simplified our workflow."},{"en":"workload","ru":"загрузка, объём работы","ex":"My workload doubled this month."},{"en":"workload reduction","ru":"снижение нагрузки","ex":"Automation led to workload reduction."},{"en":"worth it","ru":"стоит того","ex":"The climb was hard but worth it."},{"en":"wrap up","ru":"завершить; упаковать","ex":"Let’s wrap up before lunch."},{"en":"write down","ru":"записать","ex":"Write down the address before you go."},{"en":"yet","ru":"еще (в вопросах и отрицаниях)","ex":"Have you finished yet?"},{"en":"you will nail it","ru":"у тебя получится","ex":"You will nail it."},{"en":"youth","ru":"молодёжь; юность","ex":"She spent her youth near the sea."}];
const RULES = [{"id":"t01","title":"Present Simple","meaning":"Привычка, факт, распорядок — то, что обычно или всегда так.","formula":"V1 / Vs · do/does","tip":"I work from cafés every day."},{"id":"t02","title":"Present Continuous","meaning":"Сейчас или временно в этот период (не обязательно «прямо в эту секунду»).","formula":"am/is/are + Ving","tip":"I'm learning English now. · She's staying with us this week."},{"id":"t03","title":"Pr. Simple vs Continuous","meaning":"Usually = Simple; сейчас / временно = Continuous.","formula":"usually vs now","tip":"I live here. · I'm staying at a hotel."},{"id":"t04","title":"Past Simple","meaning":"Законченное действие в прошлом; время часто известно (yesterday, ago…).","formula":"V2 / did + V1","tip":"We left Russia in 2022."},{"id":"t05","title":"Past Simple ? / −","meaning":"Вопрос и отрицание: did / didn't + начальная форма (не V2).","formula":"Did you V1? · didn't V1","tip":"Did you book the flight? — No, I didn't."},{"id":"t06","title":"Present Perfect","meaning":"Связь прошлого с сейчас: опыт или результат, важный сейчас.","formula":"have/has + V3","tip":"Have you ever tried pho? · I've lost my keys."},{"id":"t07","title":"Present Perfect: when?","meaning":"Когда именно — неважно и обычно не говорим (нет yesterday / in 2020).","formula":"have/has + V3 · без when","tip":"I've already paid the rent. (не: yesterday)"},{"id":"t08","title":"PP vs Past Simple","meaning":"PP — без конкретного when; Past Simple — когда известно.","formula":"PP: no time · PS: when","tip":"I've been to Vietnam. · I went last year."},{"id":"t09","title":"Present Perfect Cont.","meaning":"Длилось до сейчас; часто важен процесс и how long.","formula":"have/has been + Ving","tip":"I've been studying all morning."},{"id":"t10","title":"PP vs PPC","meaning":"PP = уже сделано (итог сейчас); PPC = процесс / как долго.","formula":"have + V3 · have been + Ving","tip":"I've written it. · I've been writing for an hour."},{"id":"s01","title":"PP markers","meaning":"Частые сигналы Present Perfect.","formula":"ever/never · just/already/yet · since/for","tip":"I've lived here since 2022. · Have you ever…?"},{"id":"s02","title":"Past Simple markers","meaning":"Частые сигналы Past Simple — конкретное прошлое время.","formula":"yesterday · last… · ago · in 2020","tip":"I bought tickets yesterday."},{"id":"f01","title":"Future will","meaning":"Решение в момент речи, обещание, мнение/прогноз.","formula":"will + V1","tip":"I'll help you with the form. · It'll be fine."},{"id":"f02","title":"be going to","meaning":"Уже есть план или по ситуации видно, что случится.","formula":"am/is/are going to + V1","tip":"I'm going to move next month. · Look — it's going to rain."},{"id":"f03","title":"Present Cont. = future","meaning":"Личная договорённость / запись в календаре (не просто «хочу»).","formula":"am/is/are + Ving (+ time)","tip":"I'm meeting a friend tomorrow."},{"id":"f04","title":"Present Simple = future","meaning":"Расписание: поезд, рейс, кино — официальный график.","formula":"V1 / Vs (+ time)","tip":"The flight leaves at 9 am."},{"id":"u01","title":"used to","meaning":"Раньше делал / было так — сейчас уже нет.","formula":"used to + V1","tip":"I used to play basketball."},{"id":"u02","title":"didn't use to","meaning":"Раньше обычно не делал. В −/? пишем use, не used.","formula":"didn't use to + V1","tip":"I didn't use to speak up at work."},{"id":"u03","title":"be used to","meaning":"Уже привык к чему-то (это нормально). Не путать с used to.","formula":"be used to + Ving/noun","tip":"I'm used to waking up early."},{"id":"u04","title":"get used to","meaning":"Привыкаю / привыкну — процесс привыкания.","formula":"get used to + Ving/noun","tip":"I'm getting used to the heat."},{"id":"m01","title":"must / have to","meaning":"Надо: must — часто «я считаю»; have to — правило/обстоятельства.","formula":"must · have to + V1","tip":"I have to renew my visa. · You must be careful."},{"id":"m02","title":"should","meaning":"Совет: лучше сделать — не жёсткий приказ.","formula":"should + V1","tip":"You should keep in touch."},{"id":"m03","title":"should have","meaning":"Надо было в прошлом — но не сделал (жаль / упрёк).","formula":"should have + V3","tip":"I should have left earlier."},{"id":"m04","title":"must have","meaning":"Уверенный вывод о прошлом: наверняка так и было.","formula":"must have + V3","tip":"He must have missed the bus."},{"id":"m05","title":"could have","meaning":"Была возможность в прошлом — часто: мог, но не сделал.","formula":"could have + V3","tip":"We could have taken a taxi."},{"id":"m06","title":"would have","meaning":"Сделал бы в прошлом — но условия не было (часто + if).","formula":"would have + V3","tip":"I would have called if I had known."},{"id":"g01","title":"verb + gerund","meaning":"После этих глаголов — Ving (не to).","formula":"enjoy/avoid/keep + Ving","tip":"I enjoy learning new skills."},{"id":"g02","title":"verb + to-inf","meaning":"После этих глаголов — to + V.","formula":"decide/hope/want + to V","tip":"She decided to take a chance."},{"id":"g03","title":"stop doing / to do","meaning":"stop + Ving = перестать это делать; stop + to V = остановиться, чтобы…","formula":"stop + Ving vs to V","tip":"I stopped smoking. · I stopped to buy coffee."},{"id":"g04","title":"forget / remember","meaning":"Ving = помню/забыл сам факт из прошлого; to V = (не) забыть сделать.","formula":"Ving = past fact · to V = to-do","tip":"I remember meeting her. · Remember to call."},{"id":"c00","title":"Zero Conditional","meaning":"Всегда правда: если A, то B (факты, законы).","formula":"if + Present, Present","tip":"If you heat water, it boils."},{"id":"c01","title":"1st Conditional","meaning":"Реальный будущий исход: если случится A → будет B.","formula":"if + Present, will + V1","tip":"If it rains, we'll stay home."},{"id":"c02","title":"2nd Conditional","meaning":"Нереально / маловероятно сейчас или в будущем.","formula":"if + Past, would + V1","tip":"If I had more time, I'd travel more."},{"id":"c03","title":"3rd Conditional","meaning":"Нереально в прошлом: если бы тогда… — был бы другой итог.","formula":"if + Past Perfect, would have + V3","tip":"If I had studied, I would have passed."},{"id":"c04","title":"if vs when","meaning":"if = не уверен, что будет; when = уверен, что будет.","formula":"if = maybe · when = sure","tip":"If I see her… · When I get home, I'll text you."},{"id":"a01","title":"a / an","meaning":"Неопределённый: один / любой, впервые. Смотри на звук, не на букву.","formula":"a + согл. звук · an + гласн. звук","tip":"a visa · a university (ju-) · an hour · an apple"},{"id":"a02","title":"the","meaning":"Конкретное / уже известное или единственное в контексте.","formula":"the = known / unique","tip":"the sun · the job we discussed · Open the door."},{"id":"a03","title":"без a/an/the","meaning":"Общая идея: неисчисляемые и мн.ч. «вообще», без конкретного экземпляра.","formula":"без a/an/the","tip":"Life is hard. · Cats sleep a lot. · I like coffee."},{"id":"r01","title":"who / which / that","meaning":"who — люди; which — вещи; that — и то и другое (в defining).","formula":"who / which / that","tip":"the friend who helped me · the book that I read"},{"id":"r02","title":"where","meaning":"Относительное «где» — про место.","formula":"where = place","tip":"the city where I live"},{"id":"p01","title":"to vs for","meaning":"Цель: to + глагол; for + существительное / Ving.","formula":"to + V · for + noun/Ving","tip":"I came to learn. · a book for learning English"},{"id":"p02","title":"in / on / at (time)","meaning":"at — точное время; on — день/дата; in — месяц/год/часть дня.","formula":"at 5 · on Monday · in July","tip":"at night · in the morning · on Friday"},{"id":"pc1","title":"Past Continuous","meaning":"Был в процессе в тот момент прошлого.","formula":"was/were + Ving","tip":"I was cooking when she called."},{"id":"pc2","title":"PC + Past Simple","meaning":"Длинный фон (was Ving) + короткое событие (V2).","formula":"was Ving when + V2","tip":"I was working when the power went out."}];

const STORE_NAME = "vocab-progress.json";
const SCRIPT_NAME = "WordOfDay";
const ROTATE_SECONDS = 10;
const PASSIVE_MARKER = "PASSIVE_WIDGET_V22";
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
  return { en: w.en, ru: w.ru, ex: w.ex || "", index: idx };
}

function withExample(item) {
  if (!item) return item;
  if (item.ex) return item;
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

function addHighlightedLine(parent, sentence, phrase, startSize, accessory) {
  const parts = splitHighlight(sentence, phrase);
  const max = contentWidth();
  let size = startSize;
  function widthAt(sz) {
    return (
      measureTextWidth(parts.before, sz, false) +
      measureTextWidth(parts.hit || "", sz, true) +
      measureTextWidth(parts.after, sz, false)
    );
  }
  while (size > 11 && widthAt(size) > max * 0.94) size -= 1;

  if (!parts.hit || widthAt(size) > max * 0.98) {
    const t = leftText(parent.addText(sentence));
    t.font = Font.systemFont(size);
    t.textColor = enColor();
    t.lineLimit = accessory ? 2 : 2;
    t.minimumScaleFactor = 0.75;
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
 * Предложение с выделенным словом + перевод снизу.
 */
function addExampleBlock(w, word, opts) {
  const enSize = opts.enSize;
  const ruSize = opts.ruSize;
  const ruAlpha = opts.ruAlpha;
  const accessory = !!opts.accessory;
  const ruScale = accessory ? 0.7 : 0.85;
  const sentence = (word && word.ex) || (word && word.en) || "";

  addHighlightedLine(w, sentence, word.en, enSize, accessory);

  w.addSpacer(accessory ? 1 : 2);
  const ru = leftText(w.addText(word.ru || ""));
  ru.font = Font.systemFont(ruSize);
  ru.textColor = ruColor(ruAlpha);
  ru.lineLimit = accessory ? 2 : 2;
  ru.minimumScaleFactor = ruScale;
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
    // 3 предложения + 3 перевода
    w.setPadding(8, 14, 8, 14);
  }
  w.refreshAfterDate = nextRefreshDate();
  // тап → Scriptable меняет набор и закрывается обратно на экран
  w.url = tapNextUrl();

  let enSize = progress.kind === "rule" ? 18 : 15;
  let ruSize = progress.kind === "rule" ? 15 : 12;
  let blockGap = progress.kind === "rule" ? 14 : 7;
  let relLimit = RELATED_LIMIT;

  if (family === "large") {
    enSize = progress.kind === "rule" ? 24 : 18;
    ruSize = progress.kind === "rule" ? 20 : 14;
    blockGap = 10;
  } else if (family === "small") {
    enSize = progress.kind === "rule" ? 16 : 13;
    ruSize = progress.kind === "rule" ? 14 : 11;
    blockGap = 6;
    relLimit = 1;
  } else if (family === "accessoryRectangular") {
    enSize = 11;
    ruSize = 10;
    blockGap = 2;
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
      const line = leftText(w.addText(main.ex || main.en + " - " + main.ru));
      line.font = Font.systemFont(enSize);
      line.textColor = enColor();
      line.lineLimit = 1;
      line.minimumScaleFactor = 0.6;
    } else {
      addExampleBlock(w, main, {
        enSize: enSize,
        ruSize: ruSize,
        ruAlpha: 0.92,
        accessory: accessory,
      });

      for (const r of related) {
        w.addSpacer(blockGap);
        addExampleBlock(w, r, {
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
      .map((w) => (w.ex || w.en) + "\n" + w.ru)
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
