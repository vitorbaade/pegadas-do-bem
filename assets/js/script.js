document.getElementById('menuToggle').addEventListener('click',()=>{
    document.getElementById('navLinks').classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click',()=>document.getElementById('navLinks').classList.remove('open'));
  });
  
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('in'); revealObserver.unobserve(entry.target); }
    });
  },{threshold:.15});
  revealEls.forEach(el=>revealObserver.observe(el));
  
  const thermoSection = document.querySelector('.thermo');
  let thermoAnimated = false;
  const thermoObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && !thermoAnimated){
        thermoAnimated = true;
        document.querySelectorAll('.bar-fill').forEach(bar=>{
          bar.style.width = bar.dataset.width;
        });
        document.querySelectorAll('.stat-num').forEach(numEl=>{
          const target = parseInt(numEl.dataset.target,10);
          const suffix = numEl.dataset.suffix || '';
          let cur = 0;
          const step = Math.max(1, Math.round(target/40));
          const timer = setInterval(()=>{
            cur += step;
            if(cur >= target){ cur = target; clearInterval(timer); }
            numEl.textContent = cur + suffix;
          },30);
        });
      }
    });
  },{threshold:.3});
  if(thermoSection) thermoObserver.observe(thermoSection);