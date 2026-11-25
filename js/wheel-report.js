/* Wheel of Life: results report + PDF, in English and Russian. Page sets window.LANG = "en" | "ru" before this file. */
(function () {
  var LANG = window.LANG === "ru" ? "ru" : "en";

  var NAMES = {
    en: {health: "Health", career: "Career", finances: "Finances", hobbies: "Hobbies", growth: "Personal growth", relationships: "Relationships", recreation: "Recreation", spirituality: "Spirituality", family: "Family"},
    ru: {health: "Здоровье", career: "Карьера", finances: "Финансы", hobbies: "Хобби", growth: "Личностный рост", relationships: "Отношения", recreation: "Отдых", spirituality: "Духовность", family: "Семья"}
  };

  var D = {
    en: {
      health: {means: "Energy, sleep, movement and food. When this area dips, every other area takes more effort.", actions: ["Get up at the same time for 7 days, weekends too.", "Get 10 minutes of daylight within an hour of waking.", "Walk for 10 minutes after your biggest meal."], low: "Fix your wake-up time first, not your bedtime: a steady morning pulls your evenings into place in about a week.", mid: "Keep a minimum version for bad days: 10 minutes of walking still counts and keeps the habit alive.", high: "Book your workouts like meetings before a busy week: a slot in the calendar outlasts good intentions."},
      career: {means: "Your work, income and growth. A low score usually means feeling stuck, not a bad job: you have lost sight of where you are growing.", actions: ["List the skills from 3 job ads you would love to land.", "For a week, mark each task: gives energy or drains it.", "Update your CV, even if you are not job hunting."], low: "Tell tiredness from a dead end: if work feels good again after a holiday, you need rest, not a new job.", mid: "Pick one skill from those job ads and one 90-day goal you can show: a project, a course, a new line on your CV.", high: "Write results down as they happen: in six months, when you ask for a raise, you will not remember them."},
      finances: {means: "How in control you feel of money. A low score is often about avoiding the numbers, not about income: a sum you have not looked at feels bigger than the real one.", actions: ["List every debt: balance, rate, minimum.", "Track one week of spending without changing anything.", "Set an automatic $10 transfer to savings on payday."], low: "Name the number: worry without a figure always feels bigger than it is.", mid: "Use the 48-hour rule: wait two days before any non-essential buy over $50. If you still want it, it is a real want.", high: "Give your money its next job: a cushion of 3 to 6 months of expenses, then one long-term goal."},
      hobbies: {means: "The things you do just because you enjoy them. They refill the energy that work and duties use up.", actions: ["List 5 things you loved doing at age 10.", "Book one hour this week for one of them.", "Play a video tutorial for one and follow along."], low: "Treat fun as an appointment, not a reward for later: 'when everything is done' never comes.", mid: "Join a class or a group: a hobby shared with people survives busy weeks much better.", high: "Give it a small finish line: a finished piece, a show, a race. A project keeps a hobby exciting."},
      growth: {means: "Learning, confidence and becoming who you want to be.", actions: ["Read 10 pages a day: that is about 12 books a year.", "Pick one skill and take a free first lesson this week.", "Do one thing this week that scares you a little."], low: "Start so small you cannot say no: one page, one lesson, two minutes. Showing up matters more than the amount.", mid: "Learn out loud: once a week, tell someone what you learned. Explaining it is what makes it stick.", high: "Pick a stretch goal and find someone who is already there to ask for advice."},
      relationships: {means: "Your partner and friends: how connected and supported you feel.", actions: ["Text two people you miss: 'Thought of you today.'", "Plan one evening together, phones in another room.", "Ask: 'What would make your week easier?'"], low: "Reach out first: studies show people value a simple 'thinking of you' message far more than the sender expects.", mid: "Notice small bids for attention: a 'look at this', a sigh, a question. Turning toward them keeps people close more than big gestures do.", high: "Be the one who gathers people: one simple dinner or walk a month keeps a circle alive."},
      recreation: {means: "Rest and recovery: evenings off, weekends, trips, real breaks.", actions: ["Keep one evening this week completely free.", "Plan a small trip: the waiting itself lifts your mood.", "End work by listing tomorrow's top 3 tasks."], low: "Put rest in the calendar first and fit tasks around it: rest is what makes the work possible.", mid: "Real rest is a change, not just a stop: if you sit all day, move; if you talk all day, be quiet.", high: "Guard your boundaries when life speeds up: that is exactly when rest gets cut first."},
      spirituality: {means: "Inner calm, meaning and values, whatever that means for you.", actions: ["Drink your morning coffee in quiet, with no phone.", "Name your top 3 values and test one choice on them.", "Take a 15-minute walk looking for something beautiful."], low: "Five quiet minutes a day beat one long retreat a year: it is the regularity that calms you.", mid: "Before bed, write three good things from the day and why they happened. A week is enough to feel the difference.", high: "Use this calm as an anchor: before a hard decision, ask what the calm version of you would do."},
      family: {means: "Your relationships with parents, siblings and children.", actions: ["Have one meal together, phones in a basket.", "Play a board game together one evening.", "Call your parents just to chat, no reason needed."], low: "One small ritual, like a Sunday call, rebuilds closeness faster than one big gesture.", mid: "Try a 15-minute family meeting once a week: plans, one problem, one thank-you from each person.", high: "Share the invisible work too: remembering and planning are tasks, not just the doing."}
    },
    ru: {
      health: {means: "Энергия, сон, движение и питание. Когда здесь проседает, всё остальное даётся тяжелее.", actions: ["Вставайте в одно время 7 дней, в выходные тоже.", "10 минут дневного света в первый час после подъёма.", "Гуляйте 10 минут после самой плотной еды за день."], low: "Начните со времени подъёма, а не отбоя: ровное утро само подтянет вечер примерно за неделю.", mid: "Заведите «минимальную версию» на плохие дни: 10 минут ходьбы тоже засчитываются и сохраняют привычку.", high: "Перед загруженной неделей ставьте тренировки в календарь, как встречи: так они держатся лучше, чем на одном желании."},
      career: {means: "Работа, доход и рост. Низкая оценка чаще значит застой, а не плохую работу: вы перестали видеть, куда растёте.", actions: ["Выпишите навыки из 3 вакансий, которые вам нравятся.", "Неделю отмечайте задачи: заряжает или выжимает.", "Обновите резюме, даже если не ищете работу."], low: "Отличите усталость от тупика: если после отпуска работа снова в радость, нужен отдых, а не новая работа.", mid: "Возьмите один навык из тех вакансий и цель на 90 дней, которую можно показать: проект, курс, новая строка в резюме.", high: "Записывайте результаты сразу: через полгода, когда пойдёте просить повышение, вы их уже не вспомните."},
      finances: {means: "Насколько вы управляете деньгами. Низкая оценка чаще про то, что страшно смотреть на цифры, а не про доход: сумма, которую вы не видели, кажется больше настоящей.", actions: ["Выпишите долги: остаток, ставку, платёж.", "Неделю записывайте траты, ничего не меняя.", "Автоперевод 500 руб. в копилку в день зарплаты."], low: "Назовите сумму: тревога без цифры всегда кажется больше, чем она есть.", mid: "Правило 48 часов: любую необязательную покупку дороже 3 000 руб. отложите на два дня. Если желание осталось, оно настоящее.", high: "Дайте деньгам следующую задачу: подушка на 3–6 месяцев расходов, потом одна большая цель."},
      hobbies: {means: "То, что вы делаете просто ради удовольствия. Хобби восполняет энергию, которую забирают работа и обязанности.", actions: ["Вспомните 5 любимых занятий из детства.", "Выделите час на одно из них на этой неделе.", "Включите видеоурок по одному из них и повторяйте."], low: "Относитесь к радости как к встрече в календаре: «когда всё сделаю» не наступает никогда.", mid: "Найдите курс или группу: хобби с людьми гораздо лучше переживает загруженные недели.", high: "Дайте хобби маленький финиш: законченная работа, выступление, забег. Проект держит интерес."},
      growth: {means: "Обучение, уверенность в себе и движение к тому, кем вы хотите быть.", actions: ["Читайте 10 страниц в день: это около 12 книг в год.", "Выберите один навык и пройдите первый бесплатный урок.", "Сделайте одно дело, от которого немного страшно."], low: "Начните так мало, что невозможно отказаться: одна страница, один урок, две минуты. Важнее прийти, чем сколько сделать.", mid: "Учитесь вслух: раз в неделю рассказывайте кому-то, что узнали. Объясняя, вы запоминаете.", high: "Поставьте цель на вырост и найдите человека, который уже там, чтобы спросить совета."},
      relationships: {means: "Партнёр и друзья: насколько вы чувствуете близость и поддержку.", actions: ["Напишите двум людям: «Вспоминаю тебя, как ты?»", "Вечер вдвоём, телефоны в другой комнате.", "Спросите: «Что сделает твою неделю легче?»"], low: "Сделайте первый шаг: исследования показывают, что простое «думаю о тебе» радует человека намного сильнее, чем ожидает тот, кто пишет.", mid: "Замечайте маленькие «заявки» на внимание: «смотри!», вздох, вопрос. Ответ на них сближает сильнее больших жестов.", high: "Будьте тем, кто собирает людей: простой ужин или прогулка раз в месяц сохраняют круг."},
      recreation: {means: "Отдых и восстановление: свободные вечера, выходные, поездки, настоящие перерывы.", actions: ["Оставьте один вечер на неделе полностью свободным.", "Запланируйте поездку: само ожидание радует.", "В конце дня запишите 3 дела на завтра — и всё."], low: "Ставьте отдых в план первым, а дела вокруг него: именно отдых делает работу возможной.", mid: "Настоящий отдых — это смена, а не остановка: сидели весь день — двигайтесь, говорили весь день — помолчите.", high: "Берегите границы, когда жизнь ускоряется: именно тогда отдых урезают первым."},
      spirituality: {means: "Внутреннее спокойствие, смысл и ценности, что бы это ни значило для вас.", actions: ["Пейте утренний кофе в тишине, без телефона.", "Назовите 3 главные ценности и сверьте с ними решение.", "Прогулка 15 минут: ищите вокруг что-то красивое."], low: "Пять минут тишины каждый день лучше одного ретрита в год: успокаивает именно регулярность.", mid: "Перед сном запишите три хорошие вещи за день и почему они случились. Недели хватит, чтобы заметить разницу.", high: "Используйте это спокойствие как опору: перед трудным решением спросите себя, что сделала бы спокойная версия вас."},
      family: {means: "Отношения с родителями, братьями, сёстрами и детьми.", actions: ["Общий ужин, телефоны в корзинке.", "Сыграйте всей семьёй в настольную игру вечером.", "Позвоните родителям просто так, без повода."], low: "Один маленький ритуал, например звонок по воскресеньям, возвращает близость быстрее большого жеста.", mid: "Попробуйте семейную встречу раз в неделю на 15 минут: планы, одна проблема, одно «спасибо» от каждого.", high: "Делите и невидимую работу: помнить и планировать — тоже задачи, а не только делать."}
    }
  };

  var S = {
    en: {
      archetypes: {
        balancedHigh: ["The Balanced Achiever", "Your life is in good shape across the board. Your next step is not fixing, it is growing: take one area from good to great."],
        blindSpot: ["Strong, with One Blind Spot", "You do great in most areas, but one is quietly pulling you back. Give it a little attention and the whole wheel will feel lighter."],
        lift: ["Ready for a Lift", "Your wheel is even, just not as full as you would like yet. Small, steady habits will lift every area at once."],
        reset: ["Time for a Reset", "Some areas are strong, others are running on empty. That is very common, and the fix is simpler than it feels: start with your lowest area."]
      },
      yourResult: "Your result", balance: "Balance score", of10: "out of 10",
      strongest: "Strongest", focusChip: "Focus", gap: "Balance gap", gapText: function (g) { return g + " points between your highest and lowest area"; },
      strengths: "Your strengths", strengthsText: "Lean on these: what already works can lift your focus area. If Relationships is strong, ask a friend to keep you accountable.",
      startWith: "Start with", tieNote: function (n) { return "Several areas share this score. " + n + " comes first because progress here tends to lift the others."; },
      firstWeek: "Your first week", firstWeekSub: "Three small steps. Small is the point: they are easy to start and hard to drop.",
      alsoTitle: "Also worth attention", alsoNote: "Coaches recommend one area at a time. Come back to these once your first step is a habit.", oneStep: "One step: ",
      growTitle: "Questions coaches ask", growSub: "The GROW model: Goal, Reality, Options, Will. Answer them in your head or on paper.",
      questions: function (n, s, nx) { return [["Goal", "What would a 10 in " + n + " look like for you? One sentence."], ["Reality", "Why is it a " + s + " and not lower? What is already working?"], ["Options", "What would move it from " + s + " to " + nx + "? List three ideas, even small ones."], ["Will", "Which one will you do this week, and when exactly?"]]; },
      planTitle: "Your 30-day plan", plan: [["Week 1", "Answer the four questions above. Pick one step and decide exactly when you will do it. For example: 'Every evening before bed, I write down what I spent today.'"], ["Week 2", "Repeat that step on the same day and at the same time. Missed it once? No problem, just do not miss it twice in a row."], ["Week 3", "Add a second step from the list and keep doing the first one."], ["Week 4", "Take the wheel quiz on our website again and compare your scores. Even +1 point is a real result."]], pMore: "Planners and spreadsheets for money, budgeting, health, habits, study and relationships are on our website in the Planners section. Pick something for yourself, and let's be productive together!",
      allTitle: "All your areas",
      offerKicker: "Made for your focus area",
      offerFin: function (s) { return "Turn your " + s + " in Finances into a clear plan"; },
      offerOther: function (n) { return "A planner for " + n + " is on its way"; },
      offerOtherText: "Meanwhile, most people start with money: money stress touches every area of the wheel.",
      offerList: ["A debt list that shows what each debt costs you every month", "A monthly budget: planned vs actual, with optional spending highlighted", "Snowball or avalanche: pick a method and your payoff order on one page", "A $1,000 emergency fund: 112 boxes to cross off as you save", "12 monthly pages, each with a small money challenge"],
      offerBtn: "Get the Debt Payoff Planner · $8", offerNote: "The PDF arrives right after payment · 23 pages · 3 colours to choose from", offerHref: "planners.html#planners",
      giftKicker: "Free for you", giftTitle: "Your wheel, ready to print", giftText: "3 beautiful pages: your wheel, your plan for the month and a 30-day tracker.",
      download: "Download my wheel (PDF)", startOver: "Start over",
      disclaimer: "Based on the classic Wheel of Life coaching exercise and the GROW coaching model. General guidance, not professional advice.",
      /* pdf */
      pTitle: "My Wheel of Life", pSub: "A snapshot of your life, area by area", pScores: "Your scores", pSays: "What your wheel says", pFocusKicker: "Your focus area", pPlanFor: "Your plan for ", pSmall: "Small steps, one area at a time.", pSteps: "3 small steps for this week",
      pStep: " Step: ", pGrowSub: "The GROW coaching model. Write your answers on the lines.", pKeep: "Keep going", pNotes: "My notes", pFooter: "my365plan  ·  My Wheel of Life",
      pStrengthsText: function (a, b) { return a + " and " + b + ". Lean on what already works to lift your focus area."; },
      file: "my-wheel-of-life.pdf", locale: "en-US", rateFirst: "Please rate all 9 areas first.",
      bodyFont: ["fonts/jost-500.ttf", "fonts/jost-700.ttf"]
    },
    ru: {
      archetypes: {
        balancedHigh: ["Гармония", "Почти все сферы вашей жизни в хорошей форме. Следующий шаг не исправлять, а расти: выберите одну сферу и сделайте её из хорошей отличной."],
        blindSpot: ["Сильная, но с одним слабым звеном", "Почти во всём у вас получается, но одна сфера тихо тянет назад. Немного внимания к ней, и всё колесо станет легче."],
        lift: ["Готовы к подъёму", "Колесо ровное, но пока не такое наполненное, как хочется. Маленькие регулярные привычки поднимут все сферы сразу."],
        reset: ["Время перезагрузки", "Одни сферы сильные, другие на нуле. Так бывает почти у всех, и решение проще, чем кажется: начните с самой слабой сферы."]
      },
      yourResult: "Ваш результат", balance: "Баланс жизни", of10: "из 10",
      strongest: "Сильнее всего", focusChip: "Фокус", gap: "Разрыв", gapText: function (g) { return g + " " + plural(g, "балл", "балла", "баллов") + " между самой сильной и самой слабой сферой"; },
      strengths: "Ваши опоры", strengthsText: "Опирайтесь на то, что уже работает: это поможет подтянуть слабую сферу. Например, если сильны отношения, попросите подругу поддерживать вас.",
      startWith: "Начните с", tieNote: function (n) { return "У нескольких сфер одинаковая оценка. Мы поставили первой «" + n + "»: изменения здесь обычно подтягивают и остальное."; },
      firstWeek: "Ваша первая неделя", firstWeekSub: "Три маленьких шага. Маленьких специально: их легко начать и сложно бросить.",
      alsoTitle: "Тоже стоит внимания", alsoNote: "Коучи советуют работать с одной сферой за раз. Вернитесь к этим, когда первый шаг станет привычкой.", oneStep: "Один шаг: ",
      growTitle: "Вопросы, которые задают коучи", growSub: "Модель GROW: цель, реальность, варианты, действие. Ответьте мысленно или на бумаге.",
      questions: function (n, s, nx) { return [["Цель", "Какой была бы сфера «" + n + "» на 10 из 10? Одним предложением."], ["Реальность", "Почему сейчас " + s + ", а не меньше? Что уже работает?"], ["Варианты", "Что поднимет оценку с " + s + " до " + nx + "? Запишите три идеи, даже маленькие."], ["Действие", "Что из этого вы сделаете на этой неделе и когда именно?"]]; },
      planTitle: "План на 30 дней", plan: [["Неделя 1", "Ответьте на четыре вопроса выше. Выберите один шаг и решите, когда точно его сделаете. Например: «Каждый вечер перед сном записываю траты за день»."], ["Неделя 2", "Повторяйте этот шаг в тот же день и в то же время. Пропустили один раз — ничего страшного, главное не пропускать два раза подряд."], ["Неделя 3", "Добавьте второй шаг из списка и продолжайте делать первый."], ["Неделя 4", "Пройдите колесо на нашем сайте ещё раз и сравните оценки. Даже +1 балл — это уже результат."]], pMore: "Планеры и таблицы для финансов, бюджета, здоровья, привычек, учёбы и отношений есть на нашем сайте в разделе «Планеры». Подберите что-то для себя, и давайте будем продуктивными вместе!",
      allTitle: "Все ваши сферы",
      offerKicker: "Создано для вашей сферы фокуса",
      offerFin: function (s) { return "Превратите свои " + s + " " + plural(s, "балл", "балла", "баллов") + " в «Финансах» в понятный план"; },
      offerOther: function (n) { return "Планер для сферы «" + n + "» уже в работе"; },
      offerOtherText: "А пока многие начинают с денег: финансовая тревога влияет на каждую сферу колеса.",
      offerList: ["Таблица долгов: сколько каждый долг стоит вам каждый месяц", "Бюджет на месяц: план и факт, необязательные траты выделены цветом", "Снежный ком или лавина: метод и порядок выплат на одной странице", "Подушка 50 000 руб.: 112 клеток, которые вы зачёркиваете, когда откладываете", "12 страниц на месяцы, в каждой — небольшое денежное задание"],
      offerBtn: "Получить планер · 390 ₽", offerNote: "Файл придёт сразу после оплаты · 23 страницы · 3 цвета на выбор", offerHref: "planners.html#planners",
      giftKicker: "Подарок для вас", giftTitle: "Ваше колесо, готовое к печати", giftText: "3 красивые страницы: ваше колесо, план на месяц и трекер на 30 дней.",
      download: "Скачать моё колесо (PDF)", startOver: "Пройти заново",
      disclaimer: "По мотивам классического коучингового упражнения «Колесо баланса» и модели GROW. Общие рекомендации, не профессиональная консультация.",
      pTitle: "Моё колесо баланса", pSub: "Ваша жизнь сферу за сферой", pScores: "Ваши оценки", pSays: "Что говорит ваше колесо", pFocusKicker: "Ваша сфера фокуса", pPlanFor: "План для сферы ", pSmall: "Маленькие шаги, одна сфера за раз.", pSteps: "3 маленьких шага на эту неделю",
      pStep: " Шаг: ", pGrowSub: "Модель GROW. Запишите ответы на линиях.", pKeep: "Продолжайте", pNotes: "Мои заметки", pFooter: "my365plan  ·  Моё колесо баланса",
      pStrengthsText: function (a, b) { return a + " и " + b + ". Опирайтесь на то, что уже работает, чтобы подтянуть сферу фокуса."; },
      file: "moe-koleso-balansa.pdf", locale: "ru-RU", rateFirst: "Сначала оцените все 9 сфер.",
      bodyFont: ["fonts/jost-500.ttf", "fonts/jost-700.ttf"]
    }
  };
  function plural(n, one, few, many) { n = Math.abs(n) % 100; var n1 = n % 10; if (n > 10 && n < 20) return many; if (n1 > 1 && n1 < 5) return few; if (n1 === 1) return one; return many; }
  var T = S[LANG], DL = D[LANG];
  /* Strengths (6-10) and areas to grow (1-5): praise texts and report strings. */
  var PRAISE = {
    en: {health: "You take care of yourself, so your body has the energy to carry everything else.", career: "You are growing at work and know your worth. That takes focus and courage.", finances: "You are in control of your money. That gives you a freedom and calm many people dream of.", hobbies: "You know how to enjoy life and make time for what you love.", growth: "You keep learning and becoming a better version of yourself.", relationships: "People feel warm around you. You know how to love and how to be there.", recreation: "You know how to rest, and in today's busy world that is a real skill.", spirituality: "You have an inner anchor: values and calm that hold you on hard days.", family: "Your family is a place of support, and you put real care into it."},
    ru: {health: "Вы заботитесь о себе, и у тела есть силы, чтобы вытянуть всё остальное.", career: "Вы растёте в работе и знаете себе цену. Для этого нужны фокус и смелость.", finances: "Вы управляете деньгами, а не они вами. Это свобода и спокойствие, о которых многие мечтают.", hobbies: "Вы умеете радоваться жизни и находите время на любимое.", growth: "Вы постоянно учитесь и становитесь лучшей версией себя.", relationships: "Рядом с вами людям тепло. Вы умеете любить и быть рядом.", recreation: "Вы умеете отдыхать, а в нашем ритме это настоящий навык.", spirituality: "У вас есть внутренняя опора: ценности и спокойствие, которые держат в трудные дни.", family: "Семья для вас — место силы, и вы вкладываете в неё много тепла."}
  };
  var R2 = {
    en: {
      tableTitle: "Your wheel *at a glance*", avg: "Average score",
      strongCol: "Your strengths", weakCol: "Where to turn your attention",
      noneStrong: "No area above 5 yet, and that is okay: this is your starting point.", noneWeak: "No weak areas at all. Impressive!",
      praiseTitle: "You are doing *great*",
      praiseIntro: function (l) { return "Your strong foundation is " + l + ". That does not happen by chance: it is the result of your choices, effort and care. Take a moment to be proud of yourself."; },
      praiseNone: function (l) { return "You looked at your life honestly, and that is the bravest first step. Your strongest areas right now are " + l + ": they are your resources to build on."; },
      balTitle: "Now let's bring *balance*",
      balIntro: "A wheel rolls smoothly only when it is round. These areas are not failures: they are where your biggest growth is waiting. Even +1 or +2 points here will make your whole life feel lighter.",
      balNone: "All your areas are above 5. To keep the balance, pick the lowest one and take it one point higher this month.",
      how: "How to start", and: " and ",
      offK: "So it does not stay in your head", offT: "Get your money in order, *one small step* at a time",
      offP: "When your debts and spending are on paper, the worry gets smaller. The planner shows you where to start and lets you watch your debt shrink every month.",
      offAvail: "What you get", colors: ["Fuchsia & Alabaster", "Cherry & Pistachio", "Black & White"], prev: "Previous colour", next: "Next colour", join: "Join a life without debt", offSoon: "Planners for the other areas are coming soon.",
      offFinWeak: function (s) { return "Your Finances score is " + s + " out of 10 right now. This planner helps most right there."; }
    },
    ru: {
      tableTitle: "Ваше колесо *с первого взгляда*", avg: "Средний балл",
      strongCol: "Твои сильные стороны", weakCol: "Куда тебе нужно обратить своё внимание",
      noneStrong: "Пока ни одной сферы выше 5, и это нормально: это ваша точка старта.", noneWeak: "Слабых сфер нет. Впечатляет!",
      praiseTitle: "Вы *молодец*, и вот почему",
      praiseIntro: function (l) { return "Ваш крепкий фундамент — " + l + ". Это не случайность, а результат ваших решений, усилий и заботы. Остановитесь на минуту и похвалите себя."; },
      praiseNone: function (l) { return "Вы честно посмотрели на свою жизнь, а это самый смелый первый шаг. Ваши самые сильные сферы сейчас — " + l + ": на них можно опираться."; },
      balTitle: "Теперь к *балансу*",
      balIntro: "Колесо едет ровно, только когда оно круглое. Эти сферы — не провал, а место, где вас ждёт самый большой рост. Даже +1–2 балла здесь сделают всю жизнь легче.",
      balNone: "Все сферы выше 5. Чтобы сохранить баланс, выберите самую низкую и поднимите её на балл в этом месяце.",
      how: "С чего начать", and: " и ",
      offK: "Чтобы не держать всё в голове", offT: "Наведите порядок в деньгах: *шаг за шагом*",
      offP: "Когда долги и траты записаны на бумаге, тревоги становится меньше. Планер подскажет, с чего начать, и вы увидите, как долг уменьшается с каждым месяцем.",
      offAvail: "Что вы получите", colors: ["Фуксия и алебастр", "Вишня и фисташка", "Чёрно-белый"], prev: "Предыдущий цвет", next: "Следующий цвет", join: "Присоединяйся к жизни без долгов", offSoon: "Планеры для других сфер уже готовим.",
      offFinWeak: function (s) { return "Финансы у вас сейчас на " + s + " из 10. Именно с ними планер поможет лучше всего."; }
    }
  };
  var U = R2[LANG], PR = PRAISE[LANG];
  function joinNames(arr) { var q = arr.map(function (n) { return LANG === "ru" ? "«" + n + "»" : n; }); return q.length < 2 ? q.join("") : q.slice(0, -1).join(", ") + U.and + q[q.length - 1]; }

  window.WL = {names: NAMES[LANG], lang: LANG};

  function lvl(s) { return s <= 4 ? "low" : s <= 7 ? "mid" : "high"; }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]; }); }
  function num(x) { var s = x.toFixed(1); return LANG === "ru" ? s.replace(".", ",") : s; }
  var KEY = ["finances", "health", "relationships", "career", "family", "growth", "recreation", "spirituality", "hobbies"];

  window.buildWheelReport = function (areas, scores) {
    var box = document.getElementById("wq-report"); if (!box) return;
    areas.forEach(function (a) { a.name = NAMES[LANG][a.key] || a.name; });
    var idx = areas.map(function (a, i) { return i; });
    function rank(i) { return KEY.indexOf(areas[i].key); }
    var byLow = idx.slice().sort(function (x, y) { return scores[x] - scores[y] || rank(x) - rank(y); });
    var byHigh = idx.slice().sort(function (x, y) { return scores[y] - scores[x] || rank(x) - rank(y); });
    var avg = scores.reduce(function (s, v) { return s + v; }, 0) / scores.length;
    var spread = scores[byHigh[0]] - scores[byLow[0]];
    var arch = avg >= 7 ? (spread <= 3 ? "balancedHigh" : "blindSpot") : (spread <= 3 ? "lift" : "reset");
    var A = T.archetypes[arch];
    var fi = byLow[0], focus = areas[fi], fs = scores[fi], fd = DL[focus.key];
    var tie = byLow.filter(function (i) { return scores[i] === fs; }).length > 1;
    var others = byLow.slice(1).filter(function (i) { return scores[i] <= 4; }).slice(0, 2);
    if (!others.length && scores[byLow[1]] < scores[byHigh[0]]) others = [byLow[1]];
    var s1 = areas[byHigh[0]], s2 = areas[byHigh[1]];
    var nx = Math.min(10, fs + 1);
    var questions = T.questions(focus.name, fs, nx);
    window.__wheelData = {areas: areas, scores: scores.slice(), avg: avg, shape: A[0] + ". " + A[1], arch: A, focus: fi, others: others,
      strengths: [byHigh[0], byHigh[1]], tie: tie, D: DL, lvl: lvl, questions: questions, plan: T.plan};

    var strong = byHigh.filter(function (i) { return scores[i] > 5; });
    var weak = byLow.filter(function (i) { return scores[i] <= 5; });
    window.__wheelData.strong = strong; window.__wheelData.weak = weak; window.__wheelData.PR = PR; window.__wheelData.U = U;
    function em(t) { return esc(t).replace(/\*([^*]+)\*/g, '<em>$1</em>'); }
    function row(i, k) { var a = areas[i]; return '<li style="--d:' + (k * 70) + 'ms">' + esc(a.name) + '</li>'; }
    var circ = 2 * Math.PI * 52, pct = avg / 10;
    var h = '';
    /* 1. table */
    h += '<div class="rp-tbl rp-rv"><div class="rp-tbl-head"><div class="rp-gauge rp-gauge-s"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="11"/>';
    h += '<circle class="rp-arc" cx="60" cy="60" r="52" fill="none" stroke="#FFC1DC" stroke-width="11" style="--len:' + (circ * pct).toFixed(1) + ';--circ:' + circ.toFixed(1) + '" stroke-dasharray="' + (circ * pct).toFixed(1) + ' ' + circ.toFixed(1) + '" transform="rotate(-90 60 60)"/>';
    h += '<defs><linearGradient id="rpg" x1="0" x2="1"><stop offset="0" stop-color="#FF4F9E"/><stop offset=".5" stop-color="#FF7BB5"/><stop offset="1" stop-color="#FFB3D6"/></linearGradient></defs></svg>';
    h += '<div class="rp-gauge-n"><b class="rp-count" data-to="' + avg.toFixed(1) + '">' + num(avg) + '</b></div></div><div><p class="rp-k">' + esc(T.yourResult) + '</p><h2>' + em(U.tableTitle) + '</h2><p class="rp-small">' + esc(U.avg) + ': ' + num(avg) + ' ' + esc(T.of10) + '</p></div></div>';
    h += '<div class="rp-tbl-cols"><div class="rp-col rp-col-s"><p class="rp-col-h">' + esc(U.strongCol) + '</p>' + (strong.length ? '<ul>' + strong.map(row).join('') + '</ul>' : '<p class="rp-empty">' + esc(U.noneStrong) + '</p>') + '</div>';
    h += '<div class="rp-col rp-col-w"><p class="rp-col-h">' + esc(U.weakCol) + '</p>' + (weak.length ? '<ul>' + weak.map(row).join('') + '</ul>' : '<p class="rp-empty">' + esc(U.noneWeak) + '</p>') + '</div></div></div>';
    /* 2. praise */
    var praiseSet = strong.length ? strong : byHigh.slice(0, 2);
    var names = praiseSet.slice(0, 3).map(function (i) { return areas[i].name; });
    h += '<div class="rp-sec"><h3 class="rp-h rp-rv">' + em(U.praiseTitle) + '</h3><p class="rp-praise-lead rp-rv">' + esc(strong.length ? U.praiseIntro(joinNames(names)) : U.praiseNone(joinNames(names))) + '</p><div class="rp-sgrid">';
    praiseSet.forEach(function (i, k) { var a = areas[i]; h += '<div class="rp-scard rp-rv" style="--c:' + a.color + ';--d:' + (k % 3) * 90 + 'ms"><div class="rp-scard-top"><span>' + esc(a.name) + '</span></div><p>' + esc(PR[a.key]) + '</p></div>'; });
    h += '</div></div>';
    /* 3. balance */
    h += '<div class="rp-sec"><h3 class="rp-h rp-rv">' + em(U.balTitle) + '</h3><p class="rp-praise-lead rp-rv">' + esc(weak.length ? U.balIntro : U.balNone) + '</p>';
    var growSet = weak.length ? weak : [byLow[0]];
    h += '<div class="rp-wlist">';
    growSet.forEach(function (i) { var a = areas[i], d = DL[a.key]; h += '<div class="rp-wcard rp-rv" style="--c:' + a.color + '"><div class="rp-wcard-l"><span class="rp-bar" role="img" aria-label="' + scores[i] + ' / 10">' + bar(scores[i]) + '</span><h4>' + esc(a.name) + '</h4><p>' + esc(d.means) + '</p></div><div class="rp-wcard-r"><p class="rp-k">' + esc(U.how) + '</p><ul class="rp-check">' + d.actions.map(function (x, n) { return '<li role="checkbox" tabindex="0" aria-checked="false" data-ck="' + a.key + n + '"><span class="rp-box"><svg viewBox="0 0 20 20"><path d="M4 10.5l4 4 8-9"/></svg></span>' + esc(x) + '</li>'; }).join('') + '</ul><p class="rp-tipline">' + esc(d[lvl(scores[i])]) + '</p></div></div>'; });
    h += '</div></div>';
    /* 4. offer */
    var finWeak = weak.some(function (i) { return areas[i].key === "finances"; });
    var fs2 = scores[areas.map(function (a) { return a.key; }).indexOf("finances")];
    h += '<div class="rp-offer rp-rv"><div class="rp-offer-img"><div class="rp-stage"><a class="rp-book" href="' + T.offerHref + '" aria-label="' + esc(T.offerBtn) + '"><img id="rp-cover" src="img/cover-cherry.jpg" alt=""></a></div><div class="rp-sw" role="radiogroup"><button type="button" class="on" role="radio" aria-checked="true" data-i="0" title="' + esc(U.colors[0]) + '" style="--a:#890149;--b:#F3F3E7"></button><button type="button" role="radio" aria-checked="false" data-i="1" title="' + esc(U.colors[1]) + '" style="--a:#690627;--b:#BDD999"></button><button type="button" role="radio" aria-checked="false" data-i="2" title="' + esc(U.colors[2]) + '" style="--a:#111;--b:#fff"></button></div></div><div class="rp-offer-t">';
    h += '<p class="rp-k">' + esc(U.offK) + '</p><h3>' + em(U.offT) + '</h3><p class="rp-offer-p">' + esc(U.offP) + '</p>';
    h += (finWeak ? '<p class="rp-offer-p rp-offer-fin">' + esc(U.offFinWeak(fs2)) + '</p>' : '') + '<p class="rp-offer-av">' + esc(U.offAvail) + '</p>';
    h += '<ul>' + T.offerList.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    h += '<a class="rp-buy rp-buy-main" href="' + T.offerHref + '"><span>' + esc(T.offerBtn) + '</span></a><p class="rp-small">' + esc(T.offerNote) + ' · ' + esc(U.offSoon) + '</p></div></div>';
    /* gift */
    h += '<div class="rp-gift rp-rv"><div><p class="rp-k">' + esc(T.giftKicker) + '</p><h3>' + esc(T.giftTitle) + '</h3><p>' + esc(T.giftText) + '</p></div><div class="rp-gift-b"><button type="button" class="rp-dl wq-pdf">' + esc(T.download) + '</button><button type="button" class="wq-reset rp-reset">' + esc(T.startOver) + '</button></div></div>';
    h += '<p class="rp-note">' + esc(T.disclaimer) + '</p>';
    box.innerHTML = h; box.hidden = false; window.syncWheelBand(); initOffer(box); rpAnimate(box);
  };



  /* the band behind the wheel is extended down to the bottom of the first report block */
  window.syncWheelBand = function () {
    var wq = document.querySelector(".wq"), box = document.getElementById("wq-report"); if (!wq) return;
    var tb = box && !box.hidden ? box.querySelector(".rp-tbl") : null;
    if (!tb) { wq.style.setProperty("--ext", "0px"); return; }
    var ext = box.offsetTop + tb.offsetTop + tb.offsetHeight - (wq.offsetTop + wq.offsetHeight) + 44;
    wq.style.setProperty("--ext", Math.max(0, ext) + "px");
  };
  window.addEventListener("resize", function () { window.syncWheelBand(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { window.syncWheelBand(); });

  /* ---------------- motion ---------------- */
  var PET = ''; (function () { for (var q = 0; q < 6; q++) PET += '<ellipse cx="12" cy="5.6" rx="3" ry="3.9" transform="rotate(' + (q * 60) + ' 12 12)"/>'; })();
  function bar(n) { var o = ''; for (var k = 1; k <= 10; k++) o += '<i' + (k <= n ? ' class="on"' : '') + '></i>'; return o; }
  function meter(n) { var o = ''; for (var k = 1; k <= 10; k++) o += '<i' + (k <= n ? ' class="on"' : '') + '><svg viewBox="0 0 24 24" aria-hidden="true"><g>' + PET + '</g><circle cx="12" cy="12" r="3.3" class="ct"/></svg></i>'; return o; }
  var CK_KEY = "my365-checks";
  function ckLoad() { try { return JSON.parse(localStorage.getItem(CK_KEY) || "{}"); } catch (e) { return {}; } }
  function ckSave(o) { try { localStorage.setItem(CK_KEY, JSON.stringify(o)); } catch (e) {} }
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var partyDone = false;
  function confetti(x, y) {
    if (still) return;
    var cols = ["#FF5A4E", "#FF9418", "#F2BE1A", "#7DCB34", "#1FC9BC", "#2B7FF2", "#7A47CF", "#A65CEB", "#FF4F9E"];
    var cv = document.createElement("canvas"); cv.className = "rp-confetti"; document.body.appendChild(cv);
    var W = cv.width = innerWidth, H = cv.height = innerHeight, ctx = cv.getContext("2d"), P = [];
    for (var i = 0; i < 130; i++) { var ang = Math.random() * Math.PI * 2, sp = 4 + Math.random() * 9; P.push({x: x, y: y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 6, s: 5 + Math.random() * 7, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[i % cols.length], sq: Math.random() < .6}); }
    var t0 = performance.now();
    (function tick(t) {
      var k = (t - t0) / 1000; ctx.clearRect(0, 0, W, H);
      P.forEach(function (p) { p.vy += .32; p.vx *= .985; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = Math.max(0, 1 - k / 2.6); ctx.fillStyle = p.c; if (p.sq) ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); else { ctx.font = (p.s * 2.2) + "px serif"; ctx.fillText("✦", -p.s, p.s); } ctx.restore(); });
      if (k < 2.6) requestAnimationFrame(tick); else cv.remove();
    })(t0);
  }
  function countUp(el) {
    var to = parseFloat(el.dataset.to), t0 = performance.now(), D = 1300;
    (function step(t) { var k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 3); el.textContent = num(to * e); if (k < 1) requestAnimationFrame(step); })(t0);
  }

  /* colour switcher inside the offer block */
  var THEMES = ["cherry", "lime", "bw"];
  var PAYHIP = {en: ["https://payhip.com/b/rEA5v", "https://payhip.com/b/3M9JS", "https://payhip.com/b/dE1Yx"], ru: []};
  function initOffer(box) {
    var img = box.querySelector("#rp-cover"); if (!img) return;
    var cur = 0, buy = box.querySelector(".rp-buy-main"), sws = box.querySelectorAll(".rp-sw button");
    THEMES.forEach(function (k) { var p = new Image(); p.src = "img/cover-" + k + ".jpg"; });
    function go(i) {
      cur = (i + 3) % 3; img.classList.add("sw-out");
      setTimeout(function () { img.src = "img/cover-" + THEMES[cur] + ".jpg"; img.classList.remove("sw-out"); }, 140);
      sws.forEach(function (b, k) { b.classList.toggle("on", k === cur); b.setAttribute("aria-checked", k === cur ? "true" : "false"); });
      var u = (PAYHIP[LANG] || [])[cur]; if (buy && u) { buy.href = u; buy.target = "_blank"; buy.rel = "noopener"; }
    }
    sws.forEach(function (b, k) { b.addEventListener("click", function () { go(k); }); });
    go(0);
  }
  function rpAnimate(box) {
    var ck = ckLoad();
    box.querySelectorAll(".rp-check li").forEach(function (li) {
      if (ck[li.dataset.ck]) { li.classList.add("done"); li.setAttribute("aria-checked", "true"); }
      function tog() {
        var on = !li.classList.contains("done"); li.classList.toggle("done", on); li.setAttribute("aria-checked", on ? "true" : "false");
        var o = ckLoad(); if (on) o[li.dataset.ck] = 1; else delete o[li.dataset.ck]; ckSave(o);
        if (on) { li.classList.remove("pop"); void li.offsetWidth; li.classList.add("pop"); }
      }
      li.addEventListener("click", tog);
      li.addEventListener("keydown", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); tog(); } });
    });
    if (still || !("IntersectionObserver" in window)) return;
    box.classList.add("rp-anim");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return; var el = en.target; el.classList.add("in"); io.unobserve(el);
        if (el.classList.contains("rp-tbl")) {
          var c = el.querySelector(".rp-count"); if (c) countUp(c);
          if (!partyDone) { partyDone = true; var g = el.querySelector(".rp-gauge").getBoundingClientRect(); setTimeout(function () { confetti(g.left + g.width / 2, g.top + g.height / 2); }, 500); }
        }
      });
    }, {threshold: .18});
    box.querySelectorAll(".rp-rv").forEach(function (el) { io.observe(el); });
  }

  /* ---------------- PDF ---------------- */
  function wheelImage(cb) {
    var src = document.getElementById("wq-svg"); var clone = src.cloneNode(true);
    clone.removeAttribute("class"); clone.setAttribute("xmlns", "http://www.w3.org/2000/svg"); clone.setAttribute("width", "620"); clone.setAttribute("height", "620");
    clone.querySelectorAll(".wq-band").forEach(function (b) { b.style.opacity = 1; });
    var img = new Image();
    img.onload = function () { var c = document.createElement("canvas"); c.width = 1240; c.height = 1240; var ctx = c.getContext("2d"); ctx.fillStyle = "#FFF6F9"; ctx.fillRect(0, 0, 1240, 1240); ctx.drawImage(img, 0, 0, 1240, 1240); cb(c.toDataURL("image/jpeg", 0.88)); };
    img.onerror = function () { cb(null); };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(clone));
  }
  var FONTS = null;
  function loadFonts(cb) {
    if (FONTS !== null) return cb(FONTS);
    var files = {corm: "fonts/unbounded-700.ttf", cormi: "fonts/jost-500.ttf", body: T.bodyFont[0], bodyb: T.bodyFont[1]}, out = {};
    Promise.all(Object.keys(files).map(function (k) {
      return fetch(files[k]).then(function (r) { if (!r.ok) throw 0; return r.arrayBuffer(); }).then(function (b) {
        var u = new Uint8Array(b), s = ""; for (var i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); out[k] = btoa(s);
      });
    })).then(function () { FONTS = out; cb(out); }, function () { FONTS = false; cb(false); });
  }
  function hex(h) { h = h.replace("#", ""); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
  function make() {
    var W = window.__wheelData; if (!W || !window.jspdf) { alert(T.rateFirst); return; }
    loadFonts(function (F) { wheelImage(function (png) {
      var doc = new window.jspdf.jsPDF({unit: "pt", format: "letter"});
      if (F) {
        doc.addFileToVFS("corm.ttf", F.corm); doc.addFont("corm.ttf", "Corm", "normal");
        doc.addFileToVFS("cormi.ttf", F.cormi); doc.addFont("cormi.ttf", "CormI", "normal");
        doc.addFileToVFS("body.ttf", F.body); doc.addFont("body.ttf", "Body", "normal");
        doc.addFileToVFS("bodyb.ttf", F.bodyb); doc.addFont("bodyb.ttf", "Body", "bold");
      }
      var PW = 612, PH = 792, M = 44, CW = PW - 2 * M, INK = [43, 40, 48], MUTED = [118, 112, 128], PLUM = [137, 1, 73], LINE = [228, 220, 236];
      function mix(c, t) { return [c[0] + (255 - c[0]) * t, c[1] + (255 - c[1]) * t, c[2] + (255 - c[2]) * t]; }
      function dark(c) { return c.map(function (v) { return v * .6; }); }
      function font(kind) {
        if (!F) { doc.setFont("helvetica", kind === "b" || kind === "h" ? "bold" : "normal"); return 1; }
        if (kind === "h") { doc.setFont("Corm", "normal"); return 0.74; }
        if (kind === "hi") { doc.setFont("CormI", "normal"); return 1; }
        doc.setFont("Body", kind === "b" ? "bold" : "normal"); return 1;
      }
      function hgt(t, size, kind, w) { var k = font(kind); doc.setFontSize(size * k); return doc.splitTextToSize(t, w).length * size * k * 1.35; }
      function txt(t, x, y, size, kind, color, w, align) { var k = font(kind); doc.setFontSize(size * k); doc.setTextColor.apply(doc, color || INK); var L = w ? doc.splitTextToSize(t, w) : [t]; doc.text(L, x, y, {align: align || "left", lineHeightFactor: 1.35}); return y + L.length * size * k * 1.35; }
      function card(x, y, w, h, fill, stroke) { doc.setFillColor.apply(doc, fill); if (stroke) { doc.setDrawColor.apply(doc, stroke); doc.setLineWidth(0.8); doc.rect(x, y, w, h, "FD"); } else doc.rect(x, y, w, h, "F"); }
      function band(h) { var g0 = [253, 226, 238], g1 = [243, 233, 255], g2 = [228, 242, 255]; for (var gx = 0; gx < PW; gx += 4) { var t = gx / PW, a = t < .5 ? g0 : g1, b = t < .5 ? g1 : g2, u = t < .5 ? t * 2 : (t - .5) * 2; doc.setFillColor(a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u); doc.rect(gx, 0, 4.5, h, "F"); } }
      function kicker(t, x, y, color) { doc.setCharSpace(1.2); txt(t.toUpperCase(), x, y, 7.5, "b", color || MUTED); doc.setCharSpace(0); }
      function section(t, y, color) { doc.setFillColor.apply(doc, color); doc.circle(M + 4, y - 5, 3.5, "F"); return txt(t, M + 15, y, 17, "h", INK) + 4; }
      function footer(n) { doc.setDrawColor.apply(doc, LINE); doc.setLineWidth(0.6); doc.line(M, PH - 38, PW - M, PH - 38); txt(T.pFooter, M, PH - 22, 8.5, "n", MUTED); txt(n + " / 3", PW - M, PH - 22, 8.5, "n", MUTED, null, "right"); }
      var BG = [255, 246, 249], SURF = [255, 193, 220], SURF2 = [255, 227, 239], ACC = [255, 79, 158], ACCD = [196, 42, 121], WHITE = [255, 255, 255];
      INK = [66, 43, 38]; MUTED = [107, 74, 66]; LINE = [243, 220, 230];
      var U = W.U, PR = W.PR, y = 0, TOP = 56, BOT = PH - 50;
      function plain(t) { return String(t).replace(/\*/g, ""); }
      function paintBg() { doc.setFillColor(BG[0], BG[1], BG[2]); doc.rect(0, 0, PW, PH, "F"); }
      function newPage() { doc.addPage(); paintBg(); y = TOP; }
      function ensure(h) { if (y + h > BOT) newPage(); }
      function lines(t, size, kind, w) { return Math.round(hgt(t, size, kind, w) / (size * (kind === "h" ? .74 : 1) * 1.35)); }
      function flowers(x, fy, size, n, color) {
        for (var k = 0; k < 10; k++) {
          var on = k < n, cx = x + k * (size + 3) + size / 2, cy = fy + size / 2, orb = size * .29, pr = size * .21;
          doc.setLineWidth(.8);
          for (var q = 0; q < 6; q++) {
            var ang = q * Math.PI / 3, px = cx + orb * Math.cos(ang), py = cy + orb * Math.sin(ang);
            if (on) { doc.setFillColor.apply(doc, color); doc.circle(px, py, pr, "F"); } else { doc.setDrawColor.apply(doc, color); doc.circle(px, py, pr, "S"); }
          }
          if (on) { doc.setFillColor.apply(doc, SURF); doc.circle(cx, cy, size * .15, "F"); }
          else { doc.setFillColor.apply(doc, WHITE); doc.setDrawColor.apply(doc, color); doc.circle(cx, cy, size * .17, "FD"); }
        }
      }
      function segbar(x, by, n) {
        var sw = 16, sh = 6, gap = 3;
        for (var k = 0; k < 10; k++) {
          var sx = x + k * (sw + gap);
          if (k < n) { doc.setFillColor.apply(doc, INK); doc.rect(sx, by, sw, sh, "F"); }
          else { doc.setDrawColor.apply(doc, INK); doc.setLineWidth(1.2); doc.rect(sx + .6, by + .6, sw - 1.2, sh - 1.2, "S"); }
        }
      }
      function heading(t, kick) { ensure(60); if (kick) { kicker(kick, M, y, ACCD); y += 16; } y = txt(plain(t), M, y + 6, 18, "h", INK, CW) + 4; }
      var date = new Date().toLocaleDateString(T.locale, {year: "numeric", month: "long", day: "numeric"});
      var strong = W.strong, weak = W.weak, praiseSet = strong.length ? strong : W.areas.map(function (a, i) { return i; }).sort(function (p, q) { return W.scores[q] - W.scores[p]; }).slice(0, 2);
      /* page 1 */
      paintBg(); y = TOP;
      txt(T.pTitle, M, 66, 30, "h", INK); txt(T.pSub, M, 90, 12, "hi", MUTED); txt(date, M, 108, 9, "n", MUTED);
      var bx = PW - M - 140; card(bx, 40, 140, 74, WHITE, LINE); doc.setFillColor.apply(doc, INK); doc.rect(bx, 40, 140, 2.5, "F");
      kicker(T.balance, bx + 16, 62, INK);
      var nk = font("h"); doc.setFontSize(30 * nk); var nw = doc.getTextWidth(num(W.avg));
      txt(num(W.avg), bx + 16, 100, 30, "h", INK); txt("/ 10", bx + 16 + nw + 6, 100, 11, "b", MUTED);
      if (png) doc.addImage(png, "JPEG", M, 134, 252, 252);
      var px = M + 270, pw = CW - 270, py = 134;
      function listPanel(title, idx, fill, tc) {
        var hl = lines(title.toUpperCase(), 8.5, "b", pw - 28), h = 26 + hl * 12 + 8 + idx.length * 19 + 8;
        card(px, py, pw, h, fill);
        txt(title.toUpperCase(), px + pw / 2, py + 22, 8.5, "b", tc, pw - 28, "center");
        var ly = py + 22 + hl * 12 + 14; idx.forEach(function (i) { txt(W.areas[i].name, px + pw / 2, ly, 11, "b", INK, pw - 20, "center"); ly += 19; });
        py += h + 12;
      }
      var sIdx = strong.slice(), wIdx = weak.slice();
      if (sIdx.length) listPanel(U.strongCol, sIdx, SURF, INK);
      if (wIdx.length) listPanel(U.weakCol, wIdx, SURF, INK);
      y = Math.max(py, 134 + 252) + 24;
      /* praise */
      heading(U.praiseTitle);
      var lead = strong.length ? U.praiseIntro(W.areas && praiseSet.slice(0, 3).map(function (i) { return LANG === "ru" ? "«" + W.areas[i].name + "»" : W.areas[i].name; }).join(", ")) : U.praiseNone(praiseSet.slice(0, 3).map(function (i) { return W.areas[i].name; }).join(", "));
      y = txt(lead, M, y + 4, 10.5, "n", INK, CW) + 8;
      var cw2 = (CW - 14) / 2, shown = praiseSet.slice(0, 4);
      for (var r = 0; r < shown.length; r += 2) {
        var pair = shown.slice(r, r + 2), rh = 0;
        pair.forEach(function (i) { rh = Math.max(rh, hgt(PR[W.areas[i].key], 9.5, "n", cw2 - 30)); }); rh += 46;
        ensure(rh + 12);
        pair.forEach(function (i, k) { var a = W.areas[i], c = hex(a.color), cx = M + k * (cw2 + 14); card(cx, y, cw2, rh, WHITE, LINE); doc.setFillColor.apply(doc, INK); doc.rect(cx, y, cw2, 2.5, "F"); txt(a.name, cx + 15, y + 26, 11, "h", INK); txt(PR[a.key], cx + 15, y + 42, 9.5, "n", MUTED, cw2 - 30); });
        y += rh + 12;
      }
      /* balance */
      y += 10; ensure(60 + 40 + 130); heading(U.balTitle);
      y = txt(weak.length ? U.balIntro : U.balNone, M, y + 4, 10.5, "n", INK, CW) + 10;
      var growSet = weak.length ? weak : [W.focus];
      growSet.forEach(function (i) {
        var a = W.areas[i], d = W.D[a.key], c = hex(a.color), lw2 = 186, rx = M + lw2 + 34, rw = CW - lw2 - 34 - 18;
        var leftH = 66 + hgt(d.means, 9.5, "n", lw2), rightH = 40;
        d.actions.forEach(function (x) { rightH += Math.max(hgt(x, 9.5, "n", rw - 20), 16) + 3; });
        var tipT = d[W.lvl(W.scores[i])]; rightH += 4 + hgt(tipT, 8.5, "n", rw);
        var h = Math.max(leftH, rightH) + 12; ensure(h + 12);
        card(M, y, CW, h, WHITE, LINE);
        segbar(M + 20, y + 20, W.scores[i]);
        txt(a.name, M + 20, y + 50, 12, "h", INK, lw2); txt(d.means, M + 20, y + 66, 9.5, "n", MUTED, lw2);
        var hk = font("h"); doc.setFontSize(8.5 * hk); doc.setCharSpace(0.6); doc.setTextColor.apply(doc, INK); doc.text(U.how.toUpperCase(), rx, y + 24); doc.setCharSpace(0); var sy = y + 40;
        d.actions.forEach(function (x) { doc.setDrawColor.apply(doc, INK); doc.setLineWidth(1.1); doc.rect(rx, sy - 8, 10, 10, "S"); var e = txt(x, rx + 18, sy, 9.5, "n", INK, rw - 20); sy = Math.max(e, sy + 16) + 3; });
        txt(tipT, rx, sy + 4, 8.5, "n", MUTED, rw);
        y += h + 12;
      });
      /* GROW */
      var f = W.areas[growSet[0]];
      y += 8; ensure(60 + 104 + 24); heading(T.growTitle); y = txt(T.pGrowSub, M, y + 4, 10, "hi", MUTED, CW) + 10;
      var gw = (CW - 14) / 2, gh = 104;
      for (var gr = 0; gr < 4; gr += 2) {
        ensure(gh + 14);
        [0, 1].forEach(function (k) { var q = W.questions[gr + k], gx = M + k * (gw + 14); card(gx, y, gw, gh, WHITE, LINE); doc.setFillColor.apply(doc, SURF); doc.rect(gx, y, 28, 28, "F"); txt(q[0].charAt(0), gx + 14, y + 20, 14, "h", INK, null, "center"); txt(q[0].toUpperCase(), gx + 38, y + 17, 8, "b", INK); var qe = txt(q[1], gx + 38, y + 30, 9.5, "n", INK, gw - 52); doc.setDrawColor(222, 196, 208); doc.setLineWidth(.6); for (var l = Math.max(qe + 10, y + 62); l < y + gh - 6; l += 18) doc.line(gx + 14, l, gx + gw - 14, l); });
        y += gh + 14;
      }
      /* 30 days */
      y += 6; ensure(60 + 100); heading(T.planTitle);
      var tw = (CW - 30) / 4, th = 0; W.plan.forEach(function (p) { th = Math.max(th, hgt(p[1], 9, "n", tw - 24)); }); th += 62; ensure(th + 12);
      var tcols = [SURF2, SURF, SURF2, SURF];
      W.plan.forEach(function (p, i) { var tx = M + i * (tw + 10); card(tx, y, tw, th, tcols[i]); txt(p[0], tx + 12, y + 26, 12, "h", INK); txt(p[1], tx + 12, y + 44, 9, "n", INK, tw - 24); doc.setDrawColor.apply(doc, INK); doc.setLineWidth(1); doc.rect(tx + tw - 24, y + 12, 11, 11, "S"); });
      y += th + 18;
      /* more planners */
      var mh2 = hgt(T.pMore, 11, "b", CW); ensure(mh2 + 20);
      y = txt(T.pMore, M, y + 4, 11, "b", INK, CW) + 18;
      /* notes + disclaimer */
      font("n"); doc.setFontSize(7.5); var dExtra = (doc.splitTextToSize(T.disclaimer, CW).length - 1) * 10;
      var nh = BOT - 22 - dExtra - y;
      if (nh > 80) { card(M, y, CW, nh, WHITE, LINE); kicker(T.pNotes, M + 18, y + 22, ACCD); doc.setDrawColor(222, 196, 208); doc.setLineWidth(.6); for (var nl = y + 46; nl < y + nh - 10; nl += 22) doc.line(M + 18, nl, PW - M - 18, nl); }
      txt(T.disclaimer, PW / 2, PH - 58 - dExtra + 6, 7.5, "n", MUTED, CW, "center");
      /* footers on every page */
      var NP = doc.getNumberOfPages();
      for (var pg = 1; pg <= NP; pg++) { doc.setPage(pg); doc.setDrawColor.apply(doc, LINE); doc.setLineWidth(.6); doc.line(M, PH - 38, PW - M, PH - 38); txt(T.pFooter, M, PH - 22, 8.5, "n", MUTED); txt(pg + " / " + NP, PW - M, PH - 22, 8.5, "n", MUTED, null, "right"); }
      doc.save(T.file);
    }); });
  }
  document.addEventListener("click", function (e) { if (e.target.closest(".wq-pdf")) { e.preventDefault(); make(); } });
})();
