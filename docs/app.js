(function(){
  "use strict";
  var DATA = window.STUDY_DATA || {subjects:[], examDate:null};
  var PROGRESS_KEY = "dataprev:progress:v1";
  var STUDYDAYS_KEY = "dataprev:studydays:v1";
  var STATUS_LABEL = {entendi:"Entendi", chutei:"Chutei", errei:"Errei"};

  function pad(n){ return n<10 ? "0"+n : ""+n; }
  function fmt(d){ return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate()); }
  function todayStr(){ return fmt(new Date()); }

  function loadProgress(){
    try{ var raw = localStorage.getItem(PROGRESS_KEY); return raw ? JSON.parse(raw) : {}; }
    catch(e){ return {}; }
  }
  function saveProgress(p){ try{ localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); }catch(e){} }
  function loadStudyDays(){
    try{ var raw = localStorage.getItem(STUDYDAYS_KEY); return raw ? JSON.parse(raw) : []; }
    catch(e){ return []; }
  }
  function saveStudyDays(arr){ try{ localStorage.setItem(STUDYDAYS_KEY, JSON.stringify(arr)); }catch(e){} }
  function markStudyToday(){
    var days = loadStudyDays(); var t = todayStr();
    if(days.indexOf(t) === -1){ days.push(t); saveStudyDays(days); }
  }

  function setStatus(subjectId, n, status){
    var p = loadProgress();
    var key = subjectId+":"+n;
    if(p[key] && p[key].status === status){
      delete p[key]; // clicar de novo no mesmo status desmarca
    } else {
      p[key] = {status: status, ts: new Date().toISOString()};
      markStudyToday();
    }
    saveProgress(p);
  }
  function getEntry(subjectId, n){
    var p = loadProgress();
    return p[subjectId+":"+n] || null;
  }

  function findSubject(id){
    for(var i=0;i<DATA.subjects.length;i++){ if(DATA.subjects[i].id===id) return DATA.subjects[i]; }
    return null;
  }
  function cardIndex(subject, n){
    for(var i=0;i<subject.cards.length;i++){ if(subject.cards[i].n===n) return i; }
    return -1;
  }

  function escapeHtml(s){
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }
  function mdLite(text){
    if(!text) return "";
    var paras = text.split(/\n\s*\n/);
    return paras.map(function(p){
      var esc = escapeHtml(p.trim());
      esc = esc.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      esc = esc.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(m, txt, url){
        return '<a href="'+escapeHtml(url)+'" target="_blank" rel="noopener">'+txt+"</a>";
      });
      esc = esc.replace(/\n/g, "<br>");
      return "<p>"+esc+"</p>";
    }).join("");
  }

  function subjectStats(subject){
    var total = subject.cards.length;
    var counts = {entendi:0, chutei:0, errei:0};
    subject.cards.forEach(function(c){
      var e = getEntry(subject.id, c.n);
      if(e && counts.hasOwnProperty(e.status)) counts[e.status]++;
    });
    var done = counts.entendi+counts.chutei+counts.errei;
    return {total:total, done:done, counts:counts};
  }
  function overallStats(){
    var total=0, done=0, counts={entendi:0,chutei:0,errei:0};
    DATA.subjects.forEach(function(s){
      var st = subjectStats(s);
      total+=st.total; done+=st.done;
      counts.entendi+=st.counts.entendi; counts.chutei+=st.counts.chutei; counts.errei+=st.counts.errei;
    });
    return {total:total, done:done, counts:counts};
  }
  function currentStreak(){
    var days = loadStudyDays();
    var set = {}; days.forEach(function(d){ set[d]=true; });
    var d = new Date();
    if(!set[fmt(d)]){ d.setDate(d.getDate()-1); }
    var streak = 0;
    while(set[fmt(d)]){ streak++; d.setDate(d.getDate()-1); }
    return streak;
  }
  function reviewQueue(){
    var items = [];
    DATA.subjects.forEach(function(s){
      s.cards.forEach(function(c){
        var e = getEntry(s.id, c.n);
        if(e && (e.status==="chutei" || e.status==="errei")){
          items.push({subject:s, card:c, entry:e});
        }
      });
    });
    items.sort(function(a,b){ return (b.entry.ts||"").localeCompare(a.entry.ts||""); });
    return items;
  }

  function statusDotClass(status){
    if(status==="entendi") return "ok";
    if(status==="chutei") return "warn";
    if(status==="errei") return "bad";
    return "";
  }
  function statusBadgeClass(status){ return statusDotClass(status) || "neutral"; }

  // --- routing ---
  function parseRoute(){
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    if(parts.length===0) return {view:"dashboard"};
    if(parts[0]==="subject" && parts[1]){
      if(parts[2]==="card" && parts[3]){
        return {view:"card", subjectId:decodeURIComponent(parts[1]), n:parseInt(parts[3],10)};
      }
      return {view:"subject", subjectId:decodeURIComponent(parts[1])};
    }
    return {view:"dashboard"};
  }

  function renderNav(activeId){
    var nav = document.getElementById("subjectNav");
    var html = DATA.subjects.map(function(s){
      var cls = (s.id===activeId) ? "active" : "";
      return '<a class="'+cls+'" href="#/subject/'+s.id+'">'+escapeHtml(s.name)+"</a>";
    }).join("");
    nav.innerHTML = html;
  }

  function renderDashboard(){
    renderNav(null);
    var app = document.getElementById("app");
    var overall = overallStats();
    var streak = currentStreak();
    var countdownHtml = "";
    if(DATA.examDate){
      var examDate = new Date(DATA.examDate+"T13:00:00");
      var diffDays = Math.ceil((examDate - new Date())/86400000);
      var label = diffDays >= 0 ? diffDays+" dias até a prova" : "prova já passou";
      countdownHtml =
        '<div class="hero">'+
          '<div><h1>Seu painel de estudos</h1><div class="muted small">DATAPREV · Desenvolvimento de Software</div></div>'+
          '<div style="text-align:right"><div class="countdown">'+Math.max(diffDays,0)+'</div><div class="countdown-label">'+label+'</div></div>'+
        '</div>';
    }
    var statChips =
      '<div class="stat-row">'+
        statChip(overall.done+"/"+overall.total, "cartões feitos")+
        statChip(overall.counts.entendi, "entendi")+
        statChip(overall.counts.chutei, "chutei")+
        statChip(overall.counts.errei, "errei")+
        statChip(streak, streak===1 ? "dia seguido" : "dias seguidos")+
      "</div>";

    var subjectCards = DATA.subjects.map(function(s){
      var st = subjectStats(s);
      var pct = st.total ? Math.round(100*st.done/st.total) : 0;
      return (
        '<a class="card subject-card" href="#/subject/'+s.id+'">'+
          '<div class="row"><span class="name">'+escapeHtml(s.name)+'</span><span class="muted small">'+st.done+'/'+st.total+'</span></div>'+
          '<div class="progress-bar"><span style="width:'+pct+'%"></span></div>'+
          '<div class="badge-row">'+
            badgeIf(st.counts.entendi, "ok", "entendi")+
            badgeIf(st.counts.chutei, "warn", "chutei")+
            badgeIf(st.counts.errei, "bad", "errei")+
          '</div>'+
        '</a>'
      );
    }).join("");

    var review = reviewQueue();
    var reviewHtml;
    if(review.length===0){
      reviewHtml = '<div class="empty-state">Nada marcado como chutei/errei ainda — vai aparecer aqui assim que você responder um cartão.</div>';
    } else {
      reviewHtml = '<div class="review-list">'+ review.slice(0,12).map(function(it){
        return (
          '<a class="review-item" href="#/subject/'+it.subject.id+'/card/'+it.card.n+'">'+
            '<span><span class="rtitle">'+escapeHtml(it.card.title)+'</span><br><span class="rsub">'+escapeHtml(it.subject.name)+'</span></span>'+
            '<span class="badge '+statusBadgeClass(it.entry.status)+'">'+STATUS_LABEL[it.entry.status]+'</span>'+
          '</a>'
        );
      }).join("") + '</div>';
    }

    app.innerHTML =
      countdownHtml + statChips +
      '<h2>Matérias</h2>' + subjectCards +
      '<h2 style="margin-top:22px">O que falta revisar</h2>' + reviewHtml;
  }
  function statChip(num, lbl){
    return '<div class="stat-chip"><div class="num">'+num+'</div><div class="lbl">'+lbl+'</div></div>';
  }
  function badgeIf(n, cls, label){
    if(!n) return "";
    return '<span class="badge '+cls+'">'+n+' '+label+'</span>';
  }

  function renderSubject(subjectId){
    renderNav(subjectId);
    var app = document.getElementById("app");
    var subject = findSubject(subjectId);
    if(!subject){
      app.innerHTML = '<a class="back-link" href="#/">&larr; painel</a><div class="empty-state">Matéria não encontrada.</div>';
      return;
    }
    var st = subjectStats(subject);
    var sessions = {};
    subject.cards.forEach(function(c){
      var sess = Math.ceil(c.n/2);
      if(!sessions[sess]) sessions[sess] = [];
      sessions[sess].push(c);
    });
    var sessionNums = Object.keys(sessions).map(Number).sort(function(a,b){return a-b;});
    var sessionsHtml = sessionNums.map(function(sn){
      var cardsHtml = sessions[sn].map(function(c){
        var e = getEntry(subject.id, c.n);
        var dot = e ? statusDotClass(e.status) : "";
        return (
          '<a class="card-row" href="#/subject/'+subject.id+'/card/'+c.n+'">'+
            '<span class="ctitle">'+pad(c.n)+' · '+escapeHtml(c.title)+'</span>'+
            '<span class="status-dot '+dot+'"></span>'+
          '</a>'
        );
      }).join("");
      return '<div class="session-group"><div class="session-title">Sessão '+sn+'</div>'+cardsHtml+'</div>';
    }).join("");

    app.innerHTML =
      '<a class="back-link" href="#/">&larr; painel</a>'+
      '<h1>'+escapeHtml(subject.name)+'</h1>'+
      '<div class="muted small" style="margin-bottom:16px">'+st.done+' de '+st.total+' cartões feitos</div>'+
      sessionsHtml;
  }

  function renderCard(subjectId, n){
    renderNav(subjectId);
    var app = document.getElementById("app");
    var subject = findSubject(subjectId);
    if(!subject){
      app.innerHTML = '<a class="back-link" href="#/">&larr; painel</a><div class="empty-state">Matéria não encontrada.</div>';
      return;
    }
    var idx = cardIndex(subject, n);
    if(idx===-1){
      app.innerHTML = '<a class="back-link" href="#/subject/'+subject.id+'">&larr; '+escapeHtml(subject.name)+'</a><div class="empty-state">Cartão não encontrado.</div>';
      return;
    }
    var card = subject.cards[idx];
    var sess = Math.ceil(card.n/2);
    var entry = getEntry(subject.id, card.n);
    var prev = idx>0 ? subject.cards[idx-1] : null;
    var next = idx<subject.cards.length-1 ? subject.cards[idx+1] : null;

    app.innerHTML =
      '<a class="back-link" href="#/subject/'+subject.id+'">&larr; '+escapeHtml(subject.name)+'</a>'+
      '<div class="card-view">'+
        '<div class="kicker">Sessão '+sess+' · cartão '+card.n+' de '+subject.cards.length+'</div>'+
        '<h1>'+escapeHtml(card.title)+'</h1>'+
        '<div class="card-body">'+mdLite(card.guia)+'</div>'+
        '<div class="gabarito-box hidden" id="gabaritoBox">'+
          '<button class="reveal-btn" id="revealBtn">Mostrar gabarito</button>'+
          '<div class="gabarito-content card-body" style="margin-top:12px">'+mdLite(card.gabarito)+'</div>'+
        '</div>'+
        '<div class="status-buttons">'+
          statusButton("entendi", entry)+
          statusButton("chutei", entry)+
          statusButton("errei", entry)+
        '</div>'+
        '<div class="nav-buttons">'+
          (prev ? '<a href="#/subject/'+subject.id+'/card/'+prev.n+'">&larr; anterior</a>' : '<span class="disabled">&larr; anterior</span>')+
          (next ? '<a href="#/subject/'+subject.id+'/card/'+next.n+'">próximo &rarr;</a>' : '<a href="#/subject/'+subject.id+'">voltar à matéria</a>')+
        '</div>'+
      '</div>';

    var revealBtn = document.getElementById("revealBtn");
    revealBtn.addEventListener("click", function(){
      var box = document.getElementById("gabaritoBox");
      var hidden = box.classList.toggle("hidden");
      revealBtn.textContent = hidden ? "Mostrar gabarito" : "Esconder gabarito";
    });
    // gabarito starts visible-toggle: reconcile initial button label
    revealBtn.textContent = "Mostrar gabarito";

    Array.prototype.forEach.call(document.querySelectorAll(".status-btn"), function(btn){
      btn.addEventListener("click", function(){
        setStatus(subject.id, card.n, btn.dataset.status);
        renderCard(subjectId, n);
      });
    });
  }
  function statusButton(status, entry){
    var active = entry && entry.status===status ? " active" : "";
    return '<button class="status-btn '+status+active+'" data-status="'+status+'">'+STATUS_LABEL[status]+'</button>';
  }

  function render(){
    var route = parseRoute();
    if(route.view==="dashboard") renderDashboard();
    else if(route.view==="subject") renderSubject(route.subjectId);
    else if(route.view==="card") renderCard(route.subjectId, route.n);
  }

  window.addEventListener("hashchange", render);
  document.addEventListener("DOMContentLoaded", function(){
    render();

    var exportBtn = document.getElementById("exportBtn");
    var importInput = document.getElementById("importInput");
    if(exportBtn){
      exportBtn.addEventListener("click", function(){
        var payload = {
          progress: loadProgress(),
          studyDays: loadStudyDays(),
          exportedAt: new Date().toISOString()
        };
        var blob = new Blob([JSON.stringify(payload, null, 1)], {type:"application/json"});
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "dataprev-progresso-"+todayStr()+".json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
    if(importInput){
      importInput.addEventListener("change", function(){
        var file = importInput.files[0];
        if(!file) return;
        var reader = new FileReader();
        reader.onload = function(){
          try{
            var payload = JSON.parse(reader.result);
            if(payload.progress){
              if(window.confirm("Importar vai substituir o progresso salvo neste navegador. Continuar?")){
                saveProgress(payload.progress);
                saveStudyDays(payload.studyDays || []);
                render();
              }
            } else {
              window.alert("Arquivo não parece um export válido deste site.");
            }
          }catch(e){
            window.alert("Não consegui ler esse arquivo como JSON.");
          }
          importInput.value = "";
        };
        reader.readAsText(file);
      });
    }
  });
})();
