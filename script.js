const player = document.querySelector('.jsb-player');

window.addEventListener('mousemove', (e) => {
    player.style.left = e.clientX + 'px';
    player.style.top = e.clientY + 'px';
});

window.addEventListener('click', () => {
    player.classList.add('dash-effect');

    setTimeout(() => {
        player.classList.remove('dash-effect');
    }, 200);
});

const caixas = document.querySelectorAll('.main-content');

caixas.forEach(caixa => {
    caixa.addEventListener('mouseenter', () => {
        caixa.style.transform = 'scale(1.05) rotate(2deg)';
        caixa.style.borderColor = '#ffffff';
    });

    caixa.addEventListener('mouseleave', () => {
        caixa.style.transform = 'scale(1) rotate(0deg)';
        caixa.style.borderColor = '#ff5e97';
    });
});


window.addEventListener('scroll', () => {
  const footer = document.querySelector('footer');
  
  const alturaTotal = document.documentElement.scrollHeight;
  const posicaoAtual = window.innerHeight + window.scrollY;

  if (posicaoAtual >= alturaTotal - 10) {
    footer.classList.add('show-footer');
  } else {
    footer.classList.remove('show-footer'); 
  }
});


let musicaInit = false;
const musica = new Audio('jsabmenu.mp3');
musica.crossOrigin = "anonymous";
musica.loop = true;

let audioContext, analist, dataArray;

window.addEventListener('click', () => {
  if (!musicaInit) 
    musica.play();
    musicaIniciada = true;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(musica);
    analist = audioContext.createAnalyser();
    
    source.connect(analist);
    analist.connect(audioContext.destination);
    
    analist.fftSize = 64; 
    const bufferLength = analist.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    atualizarPulso();
});

function atualizarPulso() {
  requestAnimationFrame(atualizarPulso);

  if (!musicaIniciada) return;

  analist.getByteFrequencyData(dataArray);

  let batida = dataArray[1]; 

  let escala = 1 + (batida / 255) * 0.3;
  let intensidadeBrilho = (batida / 255) * 25;

  const botoesHeader = document.querySelectorAll('header a');

  botoesHeader.forEach(botao => {
    botao.style.transform = `scale(${escala})`;
    
    botao.style.boxShadow = `0 0 ${intensidadeBrilho}px rgba(0, 240, 255, 0.8)`;
  });
}