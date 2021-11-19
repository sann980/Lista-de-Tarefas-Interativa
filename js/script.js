//Temos que referenciar o input
let input = document.querySelector('input[name=tarefa]');

//Temos que referenciar o button
let btn = document.querySelector('#botao');

//Temos que referenciar a lista
let lista = document.querySelector('#lista');

//Card
let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas(){
    //Limpar a listagem de itens antes de renderizar novamente a tela
    lista.innerHTML = '';

    for(tarefa of tarefas){
        //Criar o item list
        let itemLista = document.createElement('li');

        //Adicionar classes no item da lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        //Adicionar evento no item lista
        itemLista.onclick = function(){
            deletarTarefa(this);
        }

        //Criar um texto
        let itemTexto = document.createTextNode(tarefa);

        //Adicinar o texto no item da lista
        itemLista.appendChild(itemTexto);

        //Adicionar o item da lista na lista
        lista.appendChild(itemLista);
    }
}

//Executando a função para renderizar as tarefas
renderizarTarefas();

//1 - Precisamos "escutar" o evento de clique no botão
btn.onclick = function(){
    //2 - Precisamos capturar o valor digitado pelo cliente
    let novaTarefa = input.value;

    if(novaTarefa !== ''){
        //3 - Precisamos atualizar a nova tarefa na lista (array) de tarefas e rederizar a tela
        tarefas.push(novaTarefa);

        //Executando a função para renderizar as tarefas
        renderizarTarefas();

        //Limpar input
        input.value = '';

        //Limpar mensagens de erro (spans)
        removerSpans();

         //Salva os novos dados no banco de dados
        salvarDadosNoStorage();
    }else{
        //Limpar mensagens de erro (spans)
        removerSpans();

        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Você precisa informar uma tarefa!');

        span.appendChild(msg);

        card.appendChild(span);
    }
};

function removerSpans(){
    let spans = document.querySelectorAll('span');

    for(let i = 0; i < spans.length; i++){
        card.removeChild(spans[i]);
    }
}

function deletarTarefa(tar){
    //console.log(tarefas.indexOf(tar.textContent));

    //Remover do array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    //Renderizar novamente a tela
    renderizarTarefas();

    //Salva os novos dados no banco de dados
    salvarDadosNoStorage();
}

function salvarDadosNoStorage(){
    //Todo navegador web possui essa capacidade
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

//console.log(tarefas)
//console.log(JSON.stringify(tarefas));
//novo

/*
<li class="list-group-item list-group-item-action">Jogar GTA5</li>
<li class="list-group-item list-group-item-action">Estudar Python</li>
<li class="list-group-item list-group-item-action">Estudar JavaScrip</li>
<li class="list-group-item list-group-item-action">Ver um filme</li>
<li class="list-group-item list-group-item-action">Ler um livro</li>
*/