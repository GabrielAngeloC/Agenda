📅 AgendaVue — Projeto Didático com Vue 3, Pinia e JSON-Server
Um projeto didático desenvolvido para estudar Vue 3 (Composition API), Pinia, componentização, controle de estado global, comunicação entre componentes, emissão de eventos, modais, computed properties, reactividade, calendário e CRUD de tarefas utilizando um backend fake com JSON-Server.

O objetivo é demonstrar, de forma limpa e organizada, como montar uma aplicação moderna usando boas práticas de Vue.

🚀 Funcionalidades
✔ Agenda diária
Renderização automática dos dias do mês.
Destaque para o dia atual.
Destaque para dias que possuem tarefas.
✔ Lista de tarefas por dia
Ao clicar em um dia no calendário, a lista de tarefas é filtrada automaticamente.
Totalmente reativo via Pinia.
✔ CRUD completo de tarefas
Criar novas tarefas.
Editar tarefas existentes.
Excluir tarefas.
Todas as operações refletem automaticamente no calendário e na lista.
✔ Modal para criação/edição
FormTask é aberto como modal.
Controlado pelo componente pai (padrão correto para UI).
Populate automático do formulário quando um item é editado.
✔ Store global com Pinia
Armazena tarefas.
Controla o dia selecionado.
Controla a tarefa selecionada para edição.
Possui actions: fetchTasks, createTask, updateTask, deleteTask.
✔ Backend fake com JSON-Server
Simula persistência real de dados.
Endpoints REST completos.
🧰 Tecnologias utilizadas
Vue 3 (Composition API)
Pinia (gestão de estado)
Vite (se for o caso, altero para Vue CLI)
Axios
JSON-Server
CSS puro (estilização própria)
JavaScript ES2023

