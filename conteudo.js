const opcoes = document.querySelectorAll('label.btn');
const radios = document.querySelectorAll('input[name="grupo"]');
const certo = document.querySelector('#certo');
const responder = document.querySelector('#responder');
let respondido = false;

opcoes.forEach(op => {
    op.addEventListener('mouseenter', () => {
        if (respondido) return;
        op.style.transform = 'scale(1.05)';
        op.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
    });

    op.addEventListener('mouseleave', () => {
        if (respondido) return;
        op.style.transform = 'scale(1)';
        op.style.boxShadow = '0 8px 10px rgba(0, 0, 0, 0.1)';
    });
});

radios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (respondido) return;
        opcoes.forEach(op => op.classList.remove('active'));
        document.querySelector(`label[for="${radio.id}"]`).classList.add('active');
        responder.disabled = false;
    });
});

responder.addEventListener('click', () => {
    if (respondido) return;

    const marcado = document.querySelector('input[name="grupo"]:checked');
    if (!marcado) return;

    respondido = true;

    const escolhida = document.querySelector(`label[for="${marcado.id}"]`);

    escolhida.classList.remove('active');
    if (escolhida === certo) {
        escolhida.innerText = 'Resposta correta';
        escolhida.style.backgroundColor = 'green';

    } else {

        escolhida.innerText = 'Resposta incorreta';
        escolhida.style.backgroundColor = 'red';
    }
    escolhida.style.color = 'white';
    escolhida.style.borderColor = escolhida.style.backgroundColor;

    opcoes.forEach(op => {
        op.style.pointerEvents = 'none';
        op.style.transform = 'scale(1)';
    });
    
    radios.forEach(r => r.disabled = true);
    responder.disabled = true;

});