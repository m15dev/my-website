const botoes = document.querySelectorAll('.menu-pannel-button');
botoes.forEach(botao => {
            botao.addEventListener('click', () => {

                // 1. Removes the "Selected" class from all buttons
                botoes.forEach(b => b.classList.remove('selected'));
                
                // 2. Adds the "Selected" from the selected button
                botao.classList.add('selected');
            });
        });