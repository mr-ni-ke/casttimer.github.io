const ALLOWED = {
  "lookasjarutis8@gmail.com": { lang: "RU", name: "_MRNiKe_" },
  "timothe.junca@helian.team": { language: "FR", name: "ThePommespanzer" },
  "archangel37390@gmail.com": { language: "FR", name: "Archangel" },
  "marvingrimm04@gmail.com": { language: "DE", name: "M4RV_1N" },
  "tomgama15@gmail.com": { language: "EN", name: "Tom" },
  "Jere.44240@gmail.com": { language: "FR", name: "Windsurfer2105" },
  "mykhailookolodko@gmail.com": { language: "RU", name: "MAPuHA" },
  "mrthroner@googlemail.com": { language: "DE", name: "Chukase" },
  "jaktastic.forever@gmail.com": { language: "EN", name: "Derriere" },
  "buryburson@gmail.com": { language: "PL", name: "Burson" },
  "seymur993@yandex.ru": { language: "EN", name: "JeanClodVanshot" },
  "tamowcy@gmail.com": { language: "PL", name: "_JimmyJazz" },
  "zetsuubouwarthunder@gmail.com": { language: "DE", name: "Zetsuubou" },
  "theaceswarthunder@gmail.com": { language: "RU", name: "Omero" },
  "bpajonwt@gmail.com": { language: "EN", name: "BPA_Jon" },
  "jodobusinesss@gmail.com": { language: "EN", name: "Jodo" },
  "melke1619@gmail.com": { language: "FR", name: "Nexooos" },
  "zeligowski1915@gmail.com": { language: "PL", name: "Jeyahoo" },
  "kiros.france.twitch@gmail.com": { language: "FR", name: "Kiros" },
  "oddbaw01@gmail.com": { language: "EN", name: "OddBawZ" },
  "minetontlp@gmail.com": { language: "DE", name: "Minetont" },
  "viste.gael@gmail.com": { language: "FR", name: "xoblub_27" },
  "cavenub@hotmail.se": { language: "EN", name: "cavenub" },
  "nicolas.berthelemy@helian.team": { language: "FR", name: "BOSS" },
  "ya.shifr@gmail.com": { language: "RU", name: "Kagero" },
  "itsjeffafa@gmail.com": { language: "EN", name: "ImJeffafa" },
};

let startTime, interval;

function handleCredentialResponse(response) {
  const id_token = response.credential;
  fetch('https://script.google.com/macros/s/AKfycbwYEOZevDPfUdKgx2bLUEZ5PtLqtg-fMdcJ0jgfmnFUHE2jLpkbTkQA7OLQVe4tRjJntA/exec', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id_token})
  })
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      alert('Access denied');
      return;
    }
    const ud = data.userData;
    document.getElementById('userName').textContent = ud.name;
    document.getElementById('userLang').textContent = ud.lang;
    document.getElementById('app').style.display = '';
    initTimer(ud);
  });
}

function initTimer({lang, name}) {
  const timerEl = document.getElementById('timer');
  const savedEl = document.getElementById('savedTime');
  document.getElementById('startBtn').onclick = () => {
    startTime = Date.now();
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
    timerEl.classList.add('active');
    savedEl.textContent = '';
    interval = setInterval(() => {
      const diff = Date.now() - startTime;
      timerEl.textContent = new Date(diff).toISOString().substr(11, 8);
    }, 1000);
  };
  document.getElementById('stopBtn').onclick = () => {
    clearInterval(interval);
    const stopTime = Date.now();
    const duration = ((stopTime - startTime) / 1000).toFixed(2);

    fetch('https://script.google.com/macros/s/AKfycbwYEOZevDPfUdKgx2bLUEZ5PtLqtg-fMdcJ0jgfmnFUHE2jLpkbTkQA7OLQVe4tRjJntA/exec', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        action: 'save',
        start: new Date(startTime).toISOString(),
        stop: new Date(stopTime).toISOString(),
        lang, name,
        duration: parseFloat(duration),
        mode: document.getElementById('modeSelect').value
      })
    });

    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    timerEl.textContent = '00:00:00';
    timerEl.classList.remove('active');
    savedEl.textContent = `Saved: ${new Date(stopTime - startTime).toISOString().substr(11,8)}`;
  };
}