//declaração de variáveis
const perguntas = document.querySelectorAll('.pergunta');
const opcoes = document.querySelectorAll('.opcao');
const responder = document.querySelector('#responder');
const resultado = document.querySelector('#resultado');
let respondido = false;

//o botão "Responder" pode ser clicado quando todas as perguntas tiverem tido uma opção marcada
function atualizarBotao() {
    const todas = [...perguntas].every(p => p.querySelector('.opcao.active'));
    responder.disabled = !todas;
}

//aplica a todas as opções
opcoes.forEach(op => {

    //botão cresce quando o mouse passa por cima
    op.addEventListener('mouseenter', () => {
        if (respondido) return;
        op.style.transform = 'scale(1.05)';
        op.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
    });

    //botão diminui quando o mouse sai de cima
    op.addEventListener('mouseleave', () => {
        if (respondido) return;
        op.style.transform = 'scale(1)';
        op.style.boxShadow = '0 8px 10px rgba(0, 0, 0, 0.1)';
    });

    //botão ativa quando clicado e não permite dois botões marcados em uma questão
    op.addEventListener('click', () => {
        if (respondido) return;
        const pergunta = op.closest('.pergunta');
        pergunta.querySelectorAll('.opcao').forEach(o => o.classList.remove('active'));
        op.classList.add('active');
        atualizarBotao();
    });
});

//percebe se o botão "Responder" foi clicado
responder.addEventListener('click', () => {
    if (respondido || responder.disabled) return;
    respondido = true;

    //marca os acertos
    let acertos = 0;

    //aplica a todas questões
    perguntas.forEach(p => {
        const escolhida = p.querySelector('.opcao.active');
        escolhida.classList.remove('active');

        //tira a cor do botão desselecionado, acumula os acertos e diz se a resposta está certa, acerto = botão verde, erro = botão vermelho
        if (escolhida.dataset.certo === 'true') {
            acertos++;
            escolhida.innerText = 'Resposta correta';
            escolhida.style.backgroundColor = 'green';
        } else {
            escolhida.innerText = 'Resposta incorreta';
            escolhida.style.backgroundColor = 'red';
        }
        escolhida.style.color = 'white';
        escolhida.style.borderColor = escolhida.style.backgroundColor;
    });

    //desativa o botão "Responder" e escreve quantas do total foram certas
    opcoes.forEach(op => {
        op.style.transform = 'scale(1)';
        op.style.pointerEvents = 'none';
    });
    responder.disabled = true;
    resultado.innerText = `Você acertou ${acertos} de ${perguntas.length} perguntas.`;
});
