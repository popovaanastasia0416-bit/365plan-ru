/* Wheel of Life: results report + PDF, in English and Russian. Page sets window.LANG = "en" | "ru" before this file. */
(function () {
  var LANG = window.LANG === "ru" ? "ru" : "en";

  var NAMES = {
    en: {health: "Health", career: "Career", finances: "Finances", hobbies: "Hobbies", growth: "Personal growth", relationships: "Relationships", recreation: "Recreation", spirituality: "Spirituality", family: "Family"},
    ru: {health: "Здоровье", career: "Карьера", finances: "Финансы", hobbies: "Хобби", growth: "Личностный рост", relationships: "Отношения", recreation: "Отдых", spirituality: "Духовность", family: "Семья"}
  };

  var D = {
    en: {
      health: {means: "Energy, sleep, movement and how you eat. When this area is low, every other area gets harder.", actions: ["Go to bed at the same time for 7 nights.", "Add a 20-minute walk three days this week.", "Plan tomorrow's meals tonight."], low: "Start with sleep: it is the cheapest fix with the biggest effect.", mid: "Pick one habit (water, steps, bedtime) and track it daily.", high: "Protect your routine on busy weeks; everything else rests on it."},
      career: {means: "Your work, growth and sense of progress. A low score usually means feeling stuck, not hating the job.", actions: ["Describe your work at 10/10 in one paragraph.", "Pick one skill to grow this quarter.", "Talk to someone about your next step."], low: "Separate what you can change now from what needs a bigger move.", mid: "Set one 90-day goal with a clear finish line.", high: "Share what you know: mentoring keeps this area strong."},
      finances: {means: "How in control you feel of money: debts, savings, spending. A low score is usually about uncertainty, not income.", actions: ["List every debt: balance, rate, minimum.", "Write a simple monthly budget.", "Start a tiny emergency fund, even $5 a week."], low: "Clarity first: seeing your exact numbers lowers stress on its own.", mid: "Pick one payoff method and automate one payment.", high: "Grow your cushion to 3 to 6 months of expenses and set a new goal."},
      hobbies: {means: "The things you do just because you love them. They refill the energy the other areas use up.", actions: ["List 5 things you loved doing as a kid.", "Block one hour this week for one of them.", "Try one free class, video or local group."], low: "Treat fun as an appointment, not a reward for later.", mid: "Keep one hobby going weekly so it becomes a habit.", high: "Share it: a hobby with friends counts twice."},
      growth: {means: "Learning, confidence and becoming who you want to be.", actions: ["Give a book or course 15 minutes a day.", "Write down 3 things you did well this week.", "Pick one small fear and do it once."], low: "Small daily progress beats big plans you never start.", mid: "Track one learning habit for 30 days.", high: "Set a stretch goal that scares you a little."},
      relationships: {means: "Your partner and friends: how connected and supported you feel.", actions: ["Message two people you miss today.", "Plan one evening together with no phones.", "Ask someone close how you can do better."], low: "Reach out first: most people are waiting for someone else to.", mid: "Put regular time with your people in the calendar.", high: "Be the one who brings people together."},
      recreation: {means: "Rest and recovery: time off, trips, real breaks.", actions: ["Keep one fully free evening this week.", "Plan a day trip or small treat this month.", "Turn off work notifications after a set hour."], low: "Rest is not a reward for finishing everything: schedule it first.", mid: "Plan your next real break now, even a short one.", high: "Keep your boundaries when life speeds up."},
      spirituality: {means: "Inner calm, meaning and values, whatever that means for you.", actions: ["Take 5 quiet minutes each morning.", "Write your top 3 values and test one choice.", "Spend time in nature this week."], low: "Start with five quiet minutes a day: consistency beats length.", mid: "Link a daily practice to something you already do, like morning coffee.", high: "Use this calm as an anchor for the shakier areas."},
      family: {means: "Your relationships with parents, siblings and children.", actions: ["Plan one shared meal or call this week.", "Start a shared family calendar.", "Ask what would make living together nicer."], low: "One small ritual, like a Sunday call, rebuilds closeness.", mid: "Plan family time ahead instead of fitting it in.", high: "Share the load so home stays good for everyone."}
    },
    ru: {
      health: {means: "Энергия, сон, движение и питание. Когда здесь проседает, всё остальное даётся тяжелее.", actions: ["Ложитесь спать в одно время 7 дней подряд.", "Гуляйте по 20 минут три дня на этой неделе.", "Вечером набросайте меню на завтра."], low: "Начните со сна: это самый простой шаг с самым большим эффектом.", mid: "Выберите одну привычку (вода, шаги, отбой) и отмечайте её каждый день.", high: "Берегите режим в загруженные недели: на нём держится всё остальное."},
      career: {means: "Работа, рост и ощущение движения вперёд. Низкая оценка чаще говорит о чувстве застоя, а не о самой работе.", actions: ["Опишите одним абзацем работу на 10 из 10.", "Выберите один навык на этот квартал.", "Обсудите свой следующий шаг с наставником."], low: "Разделите, что можно изменить уже сейчас, а что требует большого шага.", mid: "Поставьте одну цель на 90 дней с понятным финишем.", high: "Делитесь опытом: наставничество держит эту сферу сильной."},
      finances: {means: "Насколько вы управляете деньгами: долги, накопления, траты. Низкая оценка чаще про неопределённость, чем про маленький доход.", actions: ["Выпишите долги: остаток, ставку, платёж.", "Составьте простой бюджет на месяц.", "Отложите на подушку хотя бы 500 руб. в неделю."], low: "Сначала ясность: когда видишь точные цифры, тревоги становится меньше.", mid: "Выберите метод погашения и настройте автоплатёж.", high: "Доведите подушку до 3–6 месяцев расходов и поставьте новую цель."},
      hobbies: {means: "То, что вы делаете просто ради удовольствия. Хобби восполняет энергию, которую забирают другие сферы.", actions: ["Вспомните 5 любимых занятий из детства.", "Выделите на одно из них час на этой неделе.", "Попробуйте бесплатный урок или встречу."], low: "Относитесь к радости как к встрече в календаре, а не к награде «потом».", mid: "Оставьте одно хобби раз в неделю, чтобы оно стало привычкой.", high: "Делитесь им: хобби с друзьями радует вдвойне."},
      growth: {means: "Обучение, уверенность в себе и движение к тому, кем вы хотите быть.", actions: ["Уделяйте книге или курсу 15 минут в день.", "Запишите 3 вещи, которые получились за неделю.", "Сделайте один раз то, чего слегка боитесь."], low: "Маленький шаг каждый день лучше больших планов, которые не начинаются.", mid: "Отмечайте одну привычку обучения 30 дней подряд.", high: "Поставьте цель на вырост, от которой немного страшно."},
      relationships: {means: "Партнёр и друзья: насколько вы чувствуете близость и поддержку.", actions: ["Напишите двум людям, по которым скучаете.", "Запланируйте вечер вместе без телефонов.", "Спросите близкого, что можно делать лучше."], low: "Сделайте первый шаг: многие тоже ждут, что напишут им.", mid: "Внесите встречи с близкими в календарь регулярно.", high: "Будьте тем, кто собирает людей вместе."},
      recreation: {means: "Отдых и восстановление: выходные, поездки, настоящие перерывы.", actions: ["Выделите один свободный вечер на неделе.", "Запланируйте поездку на день или радость.", "Отключайте рабочие уведомления вечером."], low: "Отдых не награда за то, что всё сделано: ставьте его в план первым.", mid: "Запланируйте следующий настоящий отдых уже сейчас, пусть даже короткий.", high: "Сохраняйте свои границы, даже когда жизнь ускоряется."},
      spirituality: {means: "Внутреннее спокойствие, смысл и ценности, что бы это ни значило для вас.", actions: ["Каждое утро 5 минут тишины.", "Запишите 3 главные ценности и сверьте решение.", "Проведите время на природе на этой неделе."], low: "Начните с пяти минут тишины в день: важнее регулярность, чем длительность.", mid: "Привяжите практику к тому, что вы и так делаете, например к утреннему кофе.", high: "Опирайтесь на это спокойствие там, где пока шатко."},
      family: {means: "Отношения с родителями, братьями, сёстрами и детьми.", actions: ["Запланируйте общий ужин или звонок.", "Заведите общий семейный календарь.", "Спросите родных, как сделать жизнь вместе приятнее."], low: "Один маленький ритуал, например звонок по воскресеньям, возвращает близость.", mid: "Планируйте семейное время заранее, а не по остаточному принципу.", high: "Делите нагрузку, чтобы дома было хорошо всем."}
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
      planTitle: "Your 30-day plan", plan: [["Week 1", "Answer the four questions and take the first small step."], ["Week 2", "Turn the step into a habit: same day, same time."], ["Week 3", "Add the second step and keep the first one going."], ["Week 4", "Retake the wheel and compare. Even +1 is real progress."]],
      allTitle: "All your areas",
      offerKicker: "Made for your focus area",
      offerFin: function (s) { return "Turn your " + s + " in Finances into a clear plan"; },
      offerOther: function (n) { return "A planner for " + n + " is on its way"; },
      offerOtherText: "Meanwhile, most people start with money: money stress touches every area of the wheel.",
      offerList: ["A debt table: see every debt, its interest and what to pay each month", "A monthly budget: know where your money goes and what you can save", "Two proven ways to pay debt off, so you can pick the one that feels right", "A rainy-day fund tracker: colour in squares as you save, like a game", "A filled-in example and a 12-month plan, so you never wonder what to do next"],
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
      planTitle: "План на 30 дней", plan: [["Неделя 1", "Ответьте на четыре вопроса и сделайте первый маленький шаг."], ["Неделя 2", "Превратите шаг в привычку: тот же день, то же время."], ["Неделя 3", "Добавьте второй шаг и не бросайте первый."], ["Неделя 4", "Пройдите колесо заново и сравните. Даже +1 — это настоящий прогресс."]],
      allTitle: "Все ваши сферы",
      offerKicker: "Создано для вашей сферы фокуса",
      offerFin: function (s) { return "Превратите свои " + s + " " + plural(s, "балл", "балла", "баллов") + " в «Финансах» в понятный план"; },
      offerOther: function (n) { return "Планер для сферы «" + n + "» уже в работе"; },
      offerOtherText: "А пока многие начинают с денег: финансовая тревога влияет на каждую сферу колеса.",
      offerList: ["Таблица долгов: вы увидите все долги, проценты и сколько платить каждый месяц", "Бюджет на месяц: понятно, куда уходят деньги и сколько можно отложить", "Два проверенных способа гасить долги: выберите тот, что вам ближе", "Копилка на чёрный день: закрашивайте клеточки, когда откладываете, как в игре", "Пример заполнения и план на 12 месяцев, чтобы не гадать, что делать дальше"],
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
      balTitle: "Теперь — к *балансу*",
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
      function heading(t, kick) { ensure(60); if (kick) { kicker(kick, M, y, ACCD); y += 16; } y = txt(plain(t), M, y + 6, 18, "h", INK, CW) + 4; }
      var date = new Date().toLocaleDateString(T.locale, {year: "numeric", month: "long", day: "numeric"});
      var strong = W.strong, weak = W.weak, praiseSet = strong.length ? strong : W.areas.map(function (a, i) { return i; }).sort(function (p, q) { return W.scores[q] - W.scores[p]; }).slice(0, 2);
      /* page 1 */
      paintBg(); y = TOP;
      txt(T.pTitle, M, 66, 30, "h", INK); txt(T.pSub, M, 90, 12, "hi", MUTED); txt(date, M, 108, 9, "n", MUTED);
      card(PW - M - 124, 40, 124, 70, SURF); kicker(T.balance, PW - M - 110, 60, ACCD); txt(num(W.avg), PW - M - 110, 98, 30, "h", INK); txt("/ 10", PW - M - 52, 98, 11, "n", MUTED);
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
        pair.forEach(function (i, k) { var a = W.areas[i], c = hex(a.color), cx = M + k * (cw2 + 14); card(cx, y, cw2, rh, SURF2); doc.setFillColor.apply(doc, c); doc.rect(cx, y, cw2, 4, "F"); txt(a.name, cx + 15, y + 26, 11, "h", INK); txt(PR[a.key], cx + 15, y + 42, 9.5, "n", MUTED, cw2 - 30); });
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
        card(M, y, CW, h, WHITE, LINE); doc.setFillColor.apply(doc, c); doc.rect(M, y, 5, h, "F");
        flowers(M + 20, y + 18, 13, W.scores[i], c);
        txt(a.name, M + 20, y + 50, 12, "h", INK, lw2); txt(d.means, M + 20, y + 66, 9.5, "n", MUTED, lw2);
        kicker(U.how, rx, y + 24, ACCD); var sy = y + 40;
        d.actions.forEach(function (x) { doc.setDrawColor.apply(doc, c); doc.setLineWidth(1.3); doc.rect(rx, sy - 8, 10, 10, "S"); var e = txt(x, rx + 18, sy, 9.5, "n", INK, rw - 20); sy = Math.max(e, sy + 16) + 3; });
        txt(tipT, rx, sy + 4, 8.5, "n", MUTED, rw);
        y += h + 12;
      });
      /* GROW */
      var f = W.areas[growSet[0]];
      y += 8; ensure(60 + 104 + 24); heading(T.growTitle); y = txt(T.pGrowSub, M, y + 4, 10, "hi", MUTED, CW) + 10;
      var gw = (CW - 14) / 2, gh = 104;
      for (var gr = 0; gr < 4; gr += 2) {
        ensure(gh + 14);
        [0, 1].forEach(function (k) { var q = W.questions[gr + k], gx = M + k * (gw + 14); card(gx, y, gw, gh, WHITE, LINE); doc.setFillColor.apply(doc, SURF); doc.rect(gx, y, 28, 28, "F"); txt(q[0].charAt(0), gx + 14, y + 20, 14, "h", INK, null, "center"); txt(q[0].toUpperCase(), gx + 38, y + 17, 8, "b", ACCD); var qe = txt(q[1], gx + 38, y + 30, 9.5, "n", INK, gw - 52); doc.setDrawColor(222, 196, 208); doc.setLineWidth(.6); for (var l = Math.max(qe + 10, y + 62); l < y + gh - 6; l += 18) doc.line(gx + 14, l, gx + gw - 14, l); });
        y += gh + 14;
      }
      /* 30 days */
      y += 6; ensure(60 + 100); heading(T.planTitle);
      var tw = (CW - 30) / 4, th = 0; W.plan.forEach(function (p) { th = Math.max(th, hgt(p[1], 9, "n", tw - 24)); }); th += 62; ensure(th + 12);
      var tcols = [SURF2, SURF, SURF2, SURF];
      W.plan.forEach(function (p, i) { var tx = M + i * (tw + 10); card(tx, y, tw, th, tcols[i]); txt(p[0], tx + 12, y + 26, 12, "h", INK); txt(p[1], tx + 12, y + 44, 9, "n", INK, tw - 24); doc.setDrawColor.apply(doc, INK); doc.setLineWidth(1); doc.rect(tx + tw - 24, y + 12, 11, 11, "S"); });
      y += th + 18;
      /* offer */
      var ot = plain(U.offT), bl = T.offerList.map(function (x) { return "• " + x; }), blH = 0;
      bl.forEach(function (x) { blH += hgt(x, 9.5, "n", CW - 44) + 3; });
      var oh2 = 28 + hgt(ot, 13, "h", CW - 44) + hgt(U.offP, 9.5, "n", CW - 44) + 18 + blH + 14;
      ensure(oh2 + 10);
      card(M, y, CW, oh2, INK); kicker(U.offK, M + 22, y + 22, SURF);
      var oy = txt(ot, M + 22, y + 42, 13, "h", WHITE, CW - 44);
      oy = txt(U.offP, M + 22, oy + 2, 9.5, "n", [243, 213, 225], CW - 44);
      oy = txt(U.offAvail, M + 22, oy + 8, 9.5, "b", SURF, CW - 44);
      bl.forEach(function (x) { oy = txt(x, M + 22, oy + 3, 9.5, "n", [243, 213, 225], CW - 44); });
      y += oh2 + 14;
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
