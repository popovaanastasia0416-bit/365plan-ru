/* Wheel of Life: results report + PDF, in English and Russian. Page sets window.LANG = "en" | "ru" before this file. */
(function () {
  var LANG = window.LANG === "ru" ? "ru" : "en";

  var NAMES = {
    en: {health: "Health", career: "Career", finances: "Finances", hobbies: "Hobbies", growth: "Personal growth", relationships: "Relationships", recreation: "Recreation", spirituality: "Spirituality", family: "Family"},
    ru: {health: "Здоровье", career: "Карьера", finances: "Финансы", hobbies: "Хобби", growth: "Личностный рост", relationships: "Отношения", recreation: "Отдых", spirituality: "Духовность", family: "Семья"}
  };

  var D = {
    en: {
      health: {means: "Energy, sleep, movement and how you eat. When this area is low, every other area gets harder.", actions: ["Go to bed at the same time for 7 nights in a row.", "Add a 20-minute walk to three days this week.", "Plan tomorrow's meals tonight, even roughly."], low: "Start with sleep: it is the cheapest fix with the biggest effect.", mid: "Pick one habit (water, steps, bedtime) and track it daily.", high: "Protect your routine on busy weeks; everything else rests on it."},
      career: {means: "Your work, growth and sense of progress. A low score usually means feeling stuck, not hating the job.", actions: ["Describe what a 10 at work would look like in one paragraph.", "Pick one skill to grow this quarter and book the first hour of learning.", "Have one conversation this week about your next step."], low: "Separate what you can change now from what needs a bigger move.", mid: "Set one 90-day goal with a clear finish line.", high: "Share what you know: mentoring keeps this area strong."},
      finances: {means: "How in control you feel of money: debts, savings, spending. A low score is usually about uncertainty, not income.", actions: ["List every debt with its balance, rate and minimum payment.", "Write a simple monthly budget: income, must-pay bills, what is left.", "Start a tiny emergency fund, even $5 a week."], low: "Clarity first: seeing your exact numbers lowers stress on its own.", mid: "Pick one payoff method and automate one payment.", high: "Grow your cushion to 3 to 6 months of expenses and set a new goal."},
      hobbies: {means: "The things you do just because you love them. They refill the energy the other areas use up.", actions: ["List 5 things you loved doing as a kid.", "Block one hour this week for one of them.", "Try one free class, video or local group."], low: "Treat fun as an appointment, not a reward for later.", mid: "Keep one hobby going weekly so it becomes a habit.", high: "Share it: a hobby with friends counts twice."},
      growth: {means: "Learning, confidence and becoming who you want to be.", actions: ["Choose one book or course and give it 15 minutes a day.", "Write down three things you did well this week.", "Pick one small fear and do it once."], low: "Small daily progress beats big plans you never start.", mid: "Track one learning habit for 30 days.", high: "Set a stretch goal that scares you a little."},
      relationships: {means: "Your partner and friends: how connected and supported you feel.", actions: ["Message two people you miss today.", "Plan one evening together with no phones.", "Ask someone close: what is one thing I could do better for you?"], low: "Reach out first: most people are waiting for someone else to.", mid: "Put regular time with your people in the calendar.", high: "Be the one who brings people together."},
      recreation: {means: "Rest and recovery: time off, trips, real breaks.", actions: ["Put one fully free evening in your calendar this week.", "Plan a day trip or a small treat for this month.", "Turn off work notifications after a set hour."], low: "Rest is not a reward for finishing everything: schedule it first.", mid: "Plan your next real break now, even a short one.", high: "Keep your boundaries when life speeds up."},
      spirituality: {means: "Inner calm, meaning and values, whatever that means for you.", actions: ["Spend 5 quiet minutes each morning: journaling, prayer or breathing.", "Write down your top 3 values and check one decision against them.", "Spend time in nature this week."], low: "Start with five quiet minutes a day: consistency beats length.", mid: "Link a daily practice to something you already do, like morning coffee.", high: "Use this calm as an anchor for the shakier areas."},
      family: {means: "Your relationships with parents, siblings and children.", actions: ["Plan one shared meal or call this week.", "Start a shared family calendar for the busy days.", "Ask each family member what would make home feel easier."], low: "One small ritual, like a Sunday call, rebuilds closeness.", mid: "Plan family time ahead instead of fitting it in.", high: "Share the load so home stays good for everyone."}
    },
    ru: {
      health: {means: "Энергия, сон, движение и питание. Когда здесь проседает, всё остальное даётся тяжелее.", actions: ["Ложитесь спать в одно и то же время 7 дней подряд.", "Добавьте 20-минутную прогулку в три дня этой недели.", "Вечером набросайте меню на завтра, хотя бы примерно."], low: "Начните со сна: это самый простой шаг с самым большим эффектом.", mid: "Выберите одну привычку (вода, шаги, отбой) и отмечайте её каждый день.", high: "Берегите режим в загруженные недели: на нём держится всё остальное."},
      career: {means: "Работа, рост и ощущение движения вперёд. Низкая оценка чаще говорит о чувстве застоя, а не о самой работе.", actions: ["Опишите одним абзацем, как выглядела бы работа на 10 из 10.", "Выберите один навык на этот квартал и запланируйте первый час обучения.", "На этой неделе поговорите о следующем шаге с руководителем, наставником или другом."], low: "Разделите, что можно изменить уже сейчас, а что требует большого шага.", mid: "Поставьте одну цель на 90 дней с понятным финишем.", high: "Делитесь опытом: наставничество держит эту сферу сильной."},
      finances: {means: "Насколько вы управляете деньгами: долги, накопления, траты. Низкая оценка чаще про неопределённость, чем про маленький доход.", actions: ["Выпишите все долги: остаток, ставку и минимальный платёж.", "Составьте простой бюджет на месяц: доходы, обязательные платежи, остаток.", "Начните подушку безопасности, даже по 500 руб. в неделю."], low: "Сначала ясность: когда видишь точные цифры, тревоги становится меньше.", mid: "Выберите метод погашения и настройте автоплатёж.", high: "Доведите подушку до 3–6 месяцев расходов и поставьте новую цель."},
      hobbies: {means: "То, что вы делаете просто ради удовольствия. Хобби восполняет энергию, которую забирают другие сферы.", actions: ["Вспомните 5 занятий, которые вы любили в детстве.", "Выделите на одно из них час на этой неделе.", "Попробуйте один бесплатный урок, видео или встречу по интересам."], low: "Относитесь к радости как к встрече в календаре, а не к награде «потом».", mid: "Оставьте одно хобби раз в неделю, чтобы оно стало привычкой.", high: "Делитесь им: хобби с друзьями радует вдвойне."},
      growth: {means: "Обучение, уверенность в себе и движение к тому, кем вы хотите быть.", actions: ["Выберите одну книгу или курс и уделяйте им 15 минут в день.", "Запишите три вещи, которые у вас получились на этой неделе.", "Выберите один небольшой страх и сделайте это один раз."], low: "Маленький шаг каждый день лучше больших планов, которые не начинаются.", mid: "Отмечайте одну привычку обучения 30 дней подряд.", high: "Поставьте цель на вырост, от которой немного страшно."},
      relationships: {means: "Партнёр и друзья: насколько вы чувствуете близость и поддержку.", actions: ["Напишите сегодня двум людям, по которым скучаете.", "Запланируйте вечер вместе без телефонов.", "Спросите близкого: что я могу делать для тебя лучше?"], low: "Сделайте первый шаг: многие тоже ждут, что напишут им.", mid: "Внесите встречи с близкими в календарь регулярно.", high: "Будьте тем, кто собирает людей вместе."},
      recreation: {means: "Отдых и восстановление: выходные, поездки, настоящие перерывы.", actions: ["Поставьте в календарь один полностью свободный вечер на этой неделе.", "Запланируйте поездку на день или маленькую радость в этом месяце.", "Отключайте рабочие уведомления после определённого часа."], low: "Отдых не награда за то, что всё сделано: ставьте его в план первым.", mid: "Запланируйте следующий настоящий отдых уже сейчас, пусть даже короткий.", high: "Сохраняйте свои границы, даже когда жизнь ускоряется."},
      spirituality: {means: "Внутреннее спокойствие, смысл и ценности, что бы это ни значило для вас.", actions: ["Каждое утро 5 минут тишины: дневник, молитва или дыхание.", "Запишите три главные ценности и сверьте с ними одно решение.", "Проведите время на природе на этой неделе."], low: "Начните с пяти минут тишины в день: важнее регулярность, чем длительность.", mid: "Привяжите практику к тому, что вы и так делаете, например к утреннему кофе.", high: "Опирайтесь на это спокойствие там, где пока шатко."},
      family: {means: "Отношения с родителями, братьями, сёстрами и детьми.", actions: ["Запланируйте общий ужин или звонок на этой неделе.", "Заведите общий семейный календарь для загруженных дней.", "Спросите каждого в семье, что сделало бы дом легче."], low: "Один маленький ритуал, например звонок по воскресеньям, возвращает близость.", mid: "Планируйте семейное время заранее, а не по остаточному принципу.", high: "Делите нагрузку, чтобы дома было хорошо всем."}
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
      offerList: ["a debt list with monthly interest and a filled-in example", "a monthly budget with ready categories", "2 proven debt payoff methods", "a savings tracker that makes your emergency fund fun", "23 pages: plan your next 12 months"],
      offerBtn: "Get the Debt Payoff Planner · $5", offerNote: "Instant PDF download · 23 pages · 3 colors", offerHref: "planners.html#planners",
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
      offerList: ["список долгов с процентами в месяц и примером заполнения", "бюджет на месяц с готовыми статьями", "2 рабочих метода погашения долгов", "трекер подушки безопасности: копить становится игрой", "23 страницы: план на 12 месяцев вперёд"],
      offerBtn: "Получить планер · 390 ₽", offerNote: "PDF сразу после оплаты · 23 страницы · 3 цвета", offerHref: "planners.html#planners",
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
      offK: "Make it easy", offT: "Our planners and checklists will do *half the work*",
      offP: "Change sticks when it is written down. Our printable planners and checklists turn these steps into a simple routine: open, tick, see your progress.",
      offAvail: "Available now: the Debt Payoff Planner", offSoon: "Planners and checklists for the other areas are on the way.",
      offFinWeak: function (s) { return "Finances is one of your areas to grow (" + s + "). This planner was made exactly for that."; }
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
      offK: "Проще вместе с нами", offT: "Наши планеры и чек-листы сделают *половину работы*",
      offP: "Перемены держатся, когда они на бумаге. Планеры и чек-листы для печати превращают эти шаги в простую привычку: открыли, отметили, видите прогресс.",
      offAvail: "Уже доступен: планер «Закройте долги за 12 месяцев»", offSoon: "Планеры и чек-листы для других сфер уже готовятся.",
      offFinWeak: function (s) { return "Финансы — одна из ваших зон роста (" + s + "). Этот планер создан как раз для неё."; }
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
    function em(t) { return esc(t).replace(/\*([^*]+)\*/g, '<em>$1</em>'); }
    function row(i, k) { var a = areas[i]; return '<li style="--d:' + (k * 70) + 'ms">' + esc(a.name) + '</li>'; }
    var circ = 2 * Math.PI * 52, pct = avg / 10;
    var h = '';
    /* 1. table */
    h += '<div class="rp-tbl rp-rv"><div class="rp-tbl-head"><div class="rp-gauge rp-gauge-s"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="11"/>';
    h += '<circle class="rp-arc" cx="60" cy="60" r="52" fill="none" stroke="url(#rpg)" stroke-width="11" style="--len:' + (circ * pct).toFixed(1) + ';--circ:' + circ.toFixed(1) + '" stroke-dasharray="' + (circ * pct).toFixed(1) + ' ' + circ.toFixed(1) + '" transform="rotate(-90 60 60)"/>';
    h += '<defs><linearGradient id="rpg" x1="0" x2="1"><stop offset="0" stop-color="#FF4F9E"/><stop offset=".5" stop-color="#FF7BB5"/><stop offset="1" stop-color="#FFB3D6"/></linearGradient></defs></svg>';
    h += '<div class="rp-gauge-n"><b class="rp-count" data-to="' + avg.toFixed(1) + '">' + num(avg) + '</b></div></div><div><p class="rp-k">' + esc(T.yourResult) + '</p><h2>' + em(U.tableTitle) + '</h2><p class="rp-small">' + esc(U.avg) + ': ' + num(avg) + ' ' + esc(T.of10) + '</p></div></div>';
    h += '<div class="rp-tbl-cols"><div class="rp-col rp-col-s"><p class="rp-col-h">' + esc(U.strongCol) + '</p>' + (strong.length ? '<ul>' + strong.map(row).join('') + '</ul>' : '<p class="rp-empty">' + esc(U.noneStrong) + '</p>') + '</div>';
    h += '<div class="rp-col rp-col-w"><p class="rp-col-h">' + esc(U.weakCol) + '</p>' + (weak.length ? '<ul>' + weak.map(row).join('') + '</ul>' : '<p class="rp-empty">' + esc(U.noneWeak) + '</p>') + '</div></div></div>';
    /* ribbon */
    var rib = areas.map(function (a) { return '<span style="color:' + a.color + '">' + esc(a.name) + '</span><i>✦</i>'; }).join('');
    h += '<div class="rp-ribbon" aria-hidden="true"><div>' + rib + rib + '</div></div>';
    /* 2. praise */
    var praiseSet = strong.length ? strong : byHigh.slice(0, 2);
    var names = praiseSet.slice(0, 3).map(function (i) { return areas[i].name; });
    h += '<div class="rp-sec"><h3 class="rp-h rp-rv">' + em(U.praiseTitle) + '</h3><p class="rp-praise-lead rp-rv">' + esc(strong.length ? U.praiseIntro(joinNames(names)) : U.praiseNone(joinNames(names))) + '</p><div class="rp-sgrid">';
    praiseSet.forEach(function (i, k) { var a = areas[i]; h += '<div class="rp-scard rp-rv" style="--c:' + a.color + ';--d:' + (k % 3) * 90 + 'ms"><span class="rp-big" aria-hidden="true">' + scores[i] + '</span><div class="rp-scard-top"><span>' + esc(a.name) + '</span></div><p>' + esc(PR[a.key]) + '</p></div>'; });
    h += '</div></div>';
    /* 3. balance */
    h += '<div class="rp-sec"><h3 class="rp-h rp-rv">' + em(U.balTitle) + '</h3><p class="rp-praise-lead rp-rv">' + esc(weak.length ? U.balIntro : U.balNone) + '</p>';
    var growSet = weak.length ? weak : [byLow[0]];
    h += '<div class="rp-wlist">';
    growSet.forEach(function (i) { var a = areas[i], d = DL[a.key]; h += '<div class="rp-wcard rp-rv" style="--c:' + a.color + '"><div class="rp-wcard-l"><span class="rp-wscore">' + scores[i] + '</span><h4>' + esc(a.name) + '</h4><p>' + esc(d.means) + '</p></div><div class="rp-wcard-r"><p class="rp-k">' + esc(U.how) + '</p><ul class="rp-check">' + d.actions.map(function (x, n) { return '<li role="checkbox" tabindex="0" aria-checked="false" data-ck="' + a.key + n + '"><span class="rp-box"><svg viewBox="0 0 20 20"><path d="M4 10.5l4 4 8-9"/></svg></span>' + esc(x) + '</li>'; }).join('') + '</ul><p class="rp-tipline">' + esc(d[lvl(scores[i])]) + '</p></div></div>'; });
    h += '</div></div>';
    /* 4. offer */
    var finWeak = weak.some(function (i) { return areas[i].key === "finances"; });
    var fs2 = scores[areas.map(function (a) { return a.key; }).indexOf("finances")];
    h += '<div class="rp-offer rp-rv"><i class="rp-tw rp-tw1">✦</i><i class="rp-tw rp-tw2">✦</i><i class="rp-tw rp-tw3">✦</i><div class="rp-offer-img"><img src="img/cover-cherry.jpg" alt=""></div><div class="rp-offer-t">';
    h += '<p class="rp-k">' + esc(U.offK) + '</p><h3>' + em(U.offT) + '</h3><p class="rp-offer-p">' + esc(U.offP) + '</p>';
    h += '<p class="rp-offer-av">' + esc(U.offAvail) + '</p>' + (finWeak ? '<p class="rp-offer-p">' + esc(U.offFinWeak(fs2)) + '</p>' : '');
    h += '<ul>' + T.offerList.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    h += '<a class="rp-buy" href="' + T.offerHref + '"><span>' + esc(T.offerBtn) + '</span></a><p class="rp-small">' + esc(T.offerNote) + ' · ' + esc(U.offSoon) + '</p></div></div>';
    /* gift */
    h += '<div class="rp-gift rp-rv"><div><p class="rp-k">' + esc(T.giftKicker) + '</p><h3>' + esc(T.giftTitle) + '</h3><p>' + esc(T.giftText) + '</p></div><div class="rp-gift-b"><button type="button" class="rp-dl wq-pdf">' + esc(T.download) + '</button><button type="button" class="wq-reset rp-reset">' + esc(T.startOver) + '</button></div></div>';
    h += '<p class="rp-note">' + esc(T.disclaimer) + '</p>';
    box.innerHTML = h; box.hidden = false; window.syncWheelBand(); rpAnimate(box);
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
    img.onload = function () { var c = document.createElement("canvas"); c.width = 1240; c.height = 1240; var ctx = c.getContext("2d"); ctx.fillStyle = "#FAF7FF"; ctx.fillRect(0, 0, 1240, 1240); ctx.drawImage(img, 0, 0, 1240, 1240); cb(c.toDataURL("image/jpeg", 0.88)); };
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
      var f = W.areas[W.focus], d = W.D[f.key], fc = hex(f.color);
      var date = new Date().toLocaleDateString(T.locale, {year: "numeric", month: "long", day: "numeric"});
      /* page 1 */
      band(150);
      txt(T.pTitle, M, 74, 30, "h", INK); txt(T.pSub, M, 98, 12, "hi", [110, 80, 110]); txt(date, M, 120, 9, "n", MUTED);
      card(PW - M - 140, 44, 140, 76, [255, 255, 255]); kicker(T.balance, PW - M - 126, 64, PLUM);
      txt(num(W.avg), PW - M - 126, 104, 30, "h", PLUM); txt("/ 10", PW - M - 60, 104, 12, "n", MUTED);
      card(M, 168, CW, 296, [250, 247, 255]); if (png) doc.addImage(png, "JPEG", M + 14, 182, 268, 268);
      var lx = M + 304, lw = CW - 304 - 18, ly = 196; kicker(T.pScores, lx, ly - 2); ly += 20;
      W.areas.forEach(function (a, i) { var c = hex(a.color); doc.setFillColor.apply(doc, c); doc.circle(lx + 4, ly - 3.5, 3.6, "F"); txt(a.name, lx + 14, ly, 10, "n", INK); txt(String(W.scores[i]), lx + lw, ly, 10.5, "b", INK, null, "right"); doc.setFillColor(236, 232, 242); doc.rect(lx + 14, ly + 5, lw - 14, 5, "F"); doc.setFillColor.apply(doc, c); doc.rect(lx + 14, ly + 5, (lw - 14) * W.scores[i] / 10, 5, "F"); ly += 27; });
      var y = 486, shTitle = W.arch[0], shText = W.arch[1];
      var shH = hgt(shText, 11.5, "hi", CW - 40) + 62;
      card(M, y, CW, shH, [253, 238, 245]); kicker(T.pSays, M + 20, y + 20, PLUM);
      txt(shTitle, M + 20, y + 44, 17, "h", INK); txt(shText, M + 20, y + 62, 11.5, "hi", [70, 50, 70], CW - 40); y += shH + 14;
      var s1 = W.areas[W.strengths[0]], s2 = W.areas[W.strengths[1]], colW = (CW - 14) / 2;
      var stT = T.pStrengthsText(s1.name + " (" + W.scores[W.strengths[0]] + ")", s2.name + " (" + W.scores[W.strengths[1]] + ")");
      var bh = Math.max(hgt(stT, 10, "n", colW - 40), hgt(d.means, 10, "n", colW - 40)) + 70, gC = [125, 203, 52];
      card(M, y, colW, bh, mix(gC, .86)); doc.setFillColor.apply(doc, gC); doc.rect(M, y, 6, bh, "F");
      kicker(T.strengths, M + 22, y + 22, [70, 120, 30]); txt(s1.name + " & " + s2.name, M + 22, y + 44, 15, "h", INK, colW - 40); txt(stT, M + 22, y + 62, 10, "n", [60, 60, 66], colW - 40);
      var x2 = M + colW + 14; card(x2, y, colW, bh, mix(fc, .84)); doc.setFillColor.apply(doc, fc); doc.rect(x2, y, 6, bh, "F");
      kicker(T.startWith, x2 + 22, y + 22, dark(fc)); txt(f.name + " (" + W.scores[W.focus] + ")", x2 + 22, y + 44, 15, "h", INK, colW - 40); txt(d.means, x2 + 22, y + 62, 10, "n", [60, 60, 66], colW - 40);
      footer(1);
      /* page 2 */
      doc.addPage(); band(10); kicker(T.pFocusKicker, M, 52, PLUM); txt(T.pPlanFor + (LANG === "ru" ? "«" + f.name + "»" : f.name), M, 84, 24, "h", INK); txt(T.pSmall, M, 106, 12, "hi", [110, 80, 110]);
      y = 136; var stepH = 0; d.actions.forEach(function (a) { stepH += Math.max(hgt(a, 10.5, "n", CW - 90), 22) + 12; });
      card(M, y, CW, stepH + 48, mix(fc, .88)); kicker(T.pSteps, M + 20, y + 24, dark(fc));
      var sy = y + 52; d.actions.forEach(function (a, i) { doc.setFillColor.apply(doc, fc); doc.circle(M + 34, sy - 4, 11, "F"); txt(String(i + 1), M + 34, sy + 0.5, 11, "b", [255, 255, 255], null, "center"); var e = txt(a, M + 56, sy, 10.5, "n", INK, CW - 90); sy = Math.max(e, sy + 22) + 12; });
      y += stepH + 48 + 18;
      if (W.others.length) {
        y = section(T.alsoTitle, y + 6, [255, 148, 24]); var n = W.others.length, ow = (CW - 14 * (n - 1)) / n, oh = 0;
        W.others.forEach(function (i) { var a = W.areas[i], dd = W.D[a.key]; oh = Math.max(oh, hgt(dd[W.lvl(W.scores[i])] + T.pStep + dd.actions[0], 9.5, "n", ow - 36)); }); oh += 58;
        W.others.forEach(function (i, k) { var a = W.areas[i], dd = W.D[a.key], c = hex(a.color), ox = M + k * (ow + 14); card(ox, y, ow, oh, mix(c, .87)); doc.setFillColor.apply(doc, c); doc.rect(ox, y, ow, 6, "F"); txt(a.name + " · " + W.scores[i], ox + 18, y + 30, 14, "h", INK); txt(dd[W.lvl(W.scores[i])] + T.pStep + dd.actions[0], ox + 18, y + 48, 9.5, "n", [60, 60, 66], ow - 36); });
        y += oh + 22;
      }
      y = section(T.growTitle, y + 6, [43, 127, 242]); txt(T.pGrowSub, M + 15, y + 2, 10, "hi", MUTED); y += 16;
      var gw = (CW - 14) / 2, gh = Math.min(140, (PH - 60 - y - 14) / 2);
      W.questions.forEach(function (q, i) { var gx = M + (i % 2) * (gw + 14), gy = y + Math.floor(i / 2) * (gh + 14); card(gx, gy, gw, gh, [255, 255, 255], LINE); doc.setFillColor(243, 233, 255); doc.circle(gx + 26, gy + 26, 13, "F"); txt(q[0].charAt(0), gx + 26, gy + 32, 16, "h", [90, 50, 150], null, "center"); txt(q[0], gx + 46, gy + 24, 9, "b", [90, 50, 150]); var qe = txt(q[1], gx + 46, gy + 38, 9.5, "n", INK, gw - 62); doc.setDrawColor(214, 206, 224); doc.setLineWidth(0.6); for (var l = Math.max(qe + 14, gy + 62); l < gy + gh - 8; l += 20) doc.line(gx + 18, l, gx + gw - 18, l); });
      footer(2);
      /* page 3 */
      doc.addPage(); band(10); kicker(T.pKeep, M, 52, PLUM); txt(T.planTitle, M, 84, 24, "h", INK); y = 106;
      var tw = (CW - 30) / 4, th = 0; W.plan.forEach(function (p) { th = Math.max(th, hgt(p[1], 9.5, "n", tw - 28)); }); th += 74;
      var tc = [[253, 226, 238], [243, 233, 255], [228, 242, 255], [232, 247, 225]];
      W.plan.forEach(function (p, i) { var tx = M + i * (tw + 10); card(tx, y, tw, th, tc[i]); txt(p[0], tx + 14, y + 30, 16, "h", INK); txt(p[1], tx + 14, y + 50, 9.5, "n", [60, 60, 66], tw - 28); doc.setDrawColor(120, 110, 130); doc.setLineWidth(0.9); doc.rect(tx + tw - 26, y + 14, 13, 13, "S"); });
      y += th + 30; y = section(T.allTitle, y, [255, 90, 78]) + 4;
      var aw = (CW - 20) / 3, ah = 0; W.areas.forEach(function (a, i) { ah = Math.max(ah, hgt(W.D[a.key][W.lvl(W.scores[i])], 8.8, "n", aw - 28)); }); ah += 46;
      W.areas.forEach(function (a, i) { var c = hex(a.color), ax = M + (i % 3) * (aw + 10), ay = y + Math.floor(i / 3) * (ah + 10); card(ax, ay, aw, ah, mix(c, .9)); doc.setFillColor.apply(doc, c); doc.rect(ax, ay, aw, 5, "F"); txt(a.name, ax + 14, ay + 24, 10, "b", INK); txt(String(W.scores[i]), ax + aw - 14, ay + 26, 18, "h", dark(c), null, "right"); txt(W.D[a.key][W.lvl(W.scores[i])], ax + 14, ay + 40, 8.8, "n", [70, 70, 76], aw - 28); });
      y += 3 * (ah + 10) + 14; font("n"); doc.setFontSize(7.5); var dExtra = (doc.splitTextToSize(T.disclaimer, CW).length - 1) * 10; var nh = PH - 60 - dExtra - y;
      if (nh > 70) { card(M, y, CW, nh, [252, 250, 255], LINE); kicker(T.pNotes, M + 18, y + 22); doc.setDrawColor(222, 214, 232); doc.setLineWidth(0.6); for (var nl = y + 46; nl < y + nh - 10; nl += 22) doc.line(M + 18, nl, PW - M - 18, nl); }
      txt(T.disclaimer, PW / 2, PH - 48 - dExtra, 7.5, "n", MUTED, CW, "center");
      footer(3); doc.save(T.file);
    }); });
  }
  document.addEventListener("click", function (e) { if (e.target.closest(".wq-pdf")) { e.preventDefault(); make(); } });
})();
