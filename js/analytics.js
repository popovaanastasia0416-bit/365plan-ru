/* Microsoft Clarity, loaded only after the visitor accepts. Choice is kept in localStorage "my365-consent". */
(function () {
  var RU = (document.documentElement.lang || "").indexOf("ru") === 0;
  var ID = RU ? "zkmlujlwp0" : "zkmli54dg0";
  var KEY = "my365-consent";
  var T = RU
    ? { text: "Мы хотим понять, как пользуются сайтом. С вашего согласия Microsoft Clarity запишет клики и прокрутку и сохранит cookie.", yes: "Принять", no: "Отклонить", more: "Подробнее", page: "cookies.html" }
    : { text: "We want to see how the site is used. If you agree, Microsoft Clarity records clicks and scrolling and sets cookies.", yes: "Accept", no: "Decline", more: "Learn more", page: "privacy.html" };

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function live() { return /(^|\.)my365plan\.com$/.test(location.hostname); }

  function start() {
    if (window.clarity || !live()) return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", ID);
    window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
  }
  function ev(name) { if (window.clarity) window.clarity("event", name); }

  /* named events, so the important clicks can be filtered in Clarity */
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a, button") : null; if (!a) return;
    if (a.hasAttribute("download")) ev("download_free_kit");
    else if (a.matches("[data-buy], .rp-buy")) ev("buy_planner_click");
    else if (a.matches(".wq-pdf")) ev("download_wheel_pdf");
  }, true);
  var report = document.getElementById("wq-report");
  if (report && window.MutationObserver) {
    var sent = false;
    new MutationObserver(function () { if (!sent && !report.hidden) { sent = true; ev("wheel_completed"); } }).observe(report, { attributes: true, attributeFilter: ["hidden"] });
  }

  function banner() {
    var css = ".cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:1000;max-width:760px;margin:0 auto;background:#fff;border:1.5px solid #422B26;box-shadow:0 18px 40px -18px rgba(66,43,38,.45);padding:16px 18px;display:flex;flex-wrap:wrap;gap:12px 18px;align-items:center;font:500 15px/1.45 Jost,Arial,sans-serif;color:#422B26}" +
      ".cc p{margin:0;flex:1 1 320px}.cc a{color:#C42A79}.cc div{display:flex;gap:10px}" +
      ".cc button{font:700 15px Jost,Arial,sans-serif;padding:11px 22px;border:1.5px solid #422B26;background:#fff;color:#422B26;cursor:pointer}.cc button.y{background:#422B26;color:#fff}";
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var box = document.createElement("div"); box.className = "cc"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", T.more);
    box.innerHTML = "<p>" + T.text + ' <a href="' + T.page + '">' + T.more + '</a></p><div><button type="button" class="n">' + T.no + '</button><button type="button" class="y">' + T.yes + "</button></div>";
    box.querySelector(".y").addEventListener("click", function () { write("yes"); box.remove(); start(); });
    box.querySelector(".n").addEventListener("click", function () { write("no"); box.remove(); });
    document.body.appendChild(box);
  }

  /* "change my choice" button on the privacy page */
  var reset = document.getElementById("cc-reset");
  if (reset) reset.addEventListener("click", function () {
    write(""); if (window.clarity) window.clarity("consent", false);
    if (!document.querySelector(".cc")) banner();
  });

  var choice = read();
  if (choice === "yes") start(); else if (choice !== "no") banner();
})();
