// Paimam įvesties lauką (kur vartotojas įrašo tekstą)
const input = document.querySelector('input[type="text"]');

// Paimam mygtuką "Add"
const addButton = document.querySelector('.add-task__button');

// Paimam sąrašo konteinerį, kur bus įrašomi visi task'ai
const todoList = document.querySelector('.to-do__list');


// Funkcija, kuri sukuria ir atvaizduoja vieną užduotį
function renderTask(task) {
    // Sukuriamas naujas <div> elementas vienai užduočiai
    const newDiv = document.createElement('div');

    // Įrašomas task ID į DOM kaip data-id atributas
    newDiv.dataset.id = task.id;

    // Priskiriama CSS klasė išvaizdai
    newDiv.classList.add('to-do__item');

    // Patikrinimui – galima išsitrinti
    console.log(newDiv);

    // Sukuriamas checkbox (varnelė)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = task.completed; // pažymėtas, jei užduotis jau atlikta

    // Sukuriamas tekstinis blokas užduoties tekstui
    const taskText = document.createElement('div');
    taskText.classList.add('add-task__text');
    taskText.textContent = task.text;

    // Jei užduotis pažymėta kaip completed, pridedam CSS klasę
    if (task.completed) {
        taskText.classList.add('completed');
    }

    // Sukuriamas pašalinimo (x) mygtukas
    const removeButton = document.createElement('button');
    removeButton.classList.add('list__remove-button');
    removeButton.setAttribute('aria-label', 'Remove task');
    removeButton.textContent = '×'; // mygtuko simbolis

    // Pridedami checkbox, tekstas ir mygtukas į naują div'ą
    newDiv.append(checkbox, taskText, removeButton);

    // Visas div'as pridedamas į užduočių sąrašą (HTML'e)
    todoList.append(newDiv);

    // Pašalinimo mygtuko funkcija
    removeButton.addEventListener('click', () => {
        newDiv.remove(); // pašalina iš DOM

        const id = newDiv.dataset.id; // paimam task ID iš DOM

        // Paimam visus taskus iš localStorage
        let tasks = JSON.parse(localStorage.getItem('todoListTasks')) || [];

        // Išfiltruojam – paliekam tik tuos, kurių ID nesutampa (taip ištrinam vieną)
        tasks = tasks.filter(task => task.id !== Number(id));

        // Išsaugom atnaujintą sąrašą atgal į localStorage
        localStorage.setItem('todoListTasks', JSON.stringify(tasks));
    });

    // Checkbox pažymėjimo funkcija
    checkbox.addEventListener('change', () => {
        // Vizualiai pažymim tekstą (perbraukiam)
        taskText.classList.toggle('completed');

        // Paimam visą sąrašą iš localStorage
        let tasks = JSON.parse(localStorage.getItem('todoListTasks')) || [];

        // Atnaujinam būseną: pažymim task kaip completed arba ne
        tasks = tasks.map(t => {
            if (t.id === task.id) {
                t.completed = checkbox.checked;
            }
            return t;
        });

        // Išsaugom atnaujintą sąrašą
        localStorage.setItem('todoListTasks', JSON.stringify(tasks));
    });
}


// Kai užsikrauna puslapis – iškart atvaizduojamos visos užduotys
window.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('todoListTasks')) || [];
    tasks.forEach(task => renderTask(task)); // kiekviena praeina per render
});


// Funkcija, kai spaudžiam mygtuką "Add"
addButton.addEventListener('click', () => {
    const newInput = input.value.trim(); // paimam tekstą iš laukelio
    if (newInput === '') {
        alert('Add Text'); // jei tuščias – rodom įspėjimą
        return;
    }

    // Sukuriamas naujas objektas su ID, tekstu ir pradine būsena (nepažymėtas)
    const task = {
        id: Date.now(), // Unikalus ID
        text: newInput,
        completed: false
    };

    // Išsaugom naują task į localStorage
    const tasks = JSON.parse(localStorage.getItem('todoListTasks')) || [];
    tasks.push(task);
    localStorage.setItem('todoListTasks', JSON.stringify(tasks));

    // Iškart atvaizduojam naują task HTML'e
    renderTask(task);

    // Išvalom įvesties lauką
    input.value = '';
});
