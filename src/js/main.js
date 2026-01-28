(()=>{

const tbody = document.querySelector('tbody');
const form = document.querySelector('form');
const button = document.querySelector('[data-enviar-btn]');



async function excluirTarefa(id) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
        try {
            const response = await fetch(`http://localhost:3000/api/tarefas/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                carregarTarefas(); // Recarrega a lista após deletar
            };
        } catch (error) {
            console.error("Erro ao excluir:", error);
        };
    };
};

async function editarTarefa(tarefa) {
    const novaDescricao = prompt("Edite a descrição da tarefa:", tarefa.descricao);
    
    if (novaDescricao && novaDescricao !== tarefa.descricao) {
        const dadosAtualizados = {
            descricao: novaDescricao,
            concluida: tarefa.concluida, // Mantém o status atual
            prioridade: tarefa.prioridade
        };

        try {
            const response = await fetch(`http://localhost:3000/api/tarefas/${tarefa.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosAtualizados)
            });

            if (response.ok) {
                carregarTarefas(); // Recarrega a lista
            }
        } catch (error) {
            console.error("Erro ao editar:", error);
        };
    };
};

async function alternarStatus(tarefa) {
    try {
        // Inverte o status atual
        const novoStatus = !tarefa.concluida;

        const response = await fetch(`http://localhost:3000/api/tarefas/${tarefa.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ concluida: novoStatus }) // Envia apenas o campo alterado
        });

        if (response.ok) {
            carregarTarefas(); // Atualiza a tabela para mostrar o novo status
        } else {
            alert("Erro ao atualizar o status da tarefa.");
        }
    } catch (error) {
        console.error("Erro na requisição PUT:", error);
    }
}

async function carregarTarefas() {
    try {
        const response = await fetch('http://localhost:3000/api/tarefas');
        const tarefas = await response.json();

        tbody.innerHTML = ''; // Limpa a tabela antes de preencher

        tarefas.forEach(tarefa => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${tarefa.descricao}</td>
                <td data-label="Status">
                    <button class="btn-check" title="Alternar Status">${tarefa.concluida ? 'pendente' : 'concluida'}</button>
                </td>
                <td>
                    <div class="td-acoes">
                        <button class="btn-edit" data-id="${tarefa.id}"><i data-lucide="pencil"></i></button>
                        <button class="btn-delete" data-id="${tarefa.id}"><i data-lucide="trash-2"></i></button>
                    </div>
                </td>
            `;
            tr.querySelector('.btn-check').addEventListener('click', () => alternarStatus(tarefa));
            tr.querySelector('.btn-edit').addEventListener('click', () => editarTarefa(tarefa));
            tr.querySelector('.btn-delete').addEventListener('click', () => excluirTarefa(tarefa.id));

            tbody.appendChild(tr);
        });

        lucide.createIcons();

    } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
    };
};

const criarTarefa = async (evento) => {
    evento.preventDefault();

        const campoDescricao = document.querySelector('input[name="post-task-description"]');
        const campoPrioridade = document.querySelector('select[name="post-task-priority"]');
        const campoData = document.querySelector('input[name="post-task-date"]');

        const novaTarefa = {
            descricao: campoDescricao.value,
            concluida: false,
            prioridade: campoPrioridade.value,
            dataLimite: campoData.value || null
    };

    try {
        const resposta = await fetch('http://localhost:3000/api/tarefas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaTarefa)
        });

        if (resposta.ok) {
            console.log('Tarefa criada com sucesso!');
            form.reset();
            await carregarTarefas();
        
        };
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
    };

};

const inputPesquisa = document.querySelector('.input-search');

inputPesquisa.addEventListener('input', () => {
    const termoBusca = inputPesquisa.value.toLowerCase(); 
    const linhas = tbody.querySelectorAll('tr'); 

    linhas.forEach(linha => {
        const textoTarefa = linha.querySelector('td').textContent.toLowerCase();

        if (textoTarefa.includes(termoBusca)) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }
    });
});

const formBusca = document.querySelector('.form__search');
formBusca.addEventListener('submit', (e) => e.preventDefault());

button.addEventListener('click', criarTarefa);

carregarTarefas();

})();