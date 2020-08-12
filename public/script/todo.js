async function refresh() {
    try {
        const response = await fetch('/api/todo');
        const data = await response.json();
        if(data.status !== 0) throw new Error(`Todo fetching failed. Status : ${data.status}`);
        render(data.result);
        alert('Refresh completed');
        return true;
    } catch(e) {
        console.error(`Refresh failed. ${e}`);
        alert('Refresh failed');
        return false;
    }
}

function toggleFinish(element) {
    return async function() {
        try {
            const payload = {
                type: 'toggle',
                id: parseInt(element.parentElement.parentElement.getAttribute('data-id'))
            };
            const response = await fetch('/api/todo', {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.status === 0) {
                element.checked = !!data.result;
                return true;
            }
            throw new Error(`Todo patch failed. Status : ${data.status}`);
        } catch (e) {
            console.error(e);
            element.checked = !element.checked;
            return false;
        }
    };
}

function editContent(element) {
    return async function() {
        try {
            const payload = {
                type: 'content',
                id: parseInt(element.parentElement.parentElement.getAttribute('data-id')),
                content: prompt('Input todo value')
            };
            const response = await fetch('/api/todo', {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.status === 0) {
                element.parentElement.querySelector('p').innerText = data.result;
                return true;
            }
            throw new Error(`Todo patch failed. Status : ${data.status}`);
        } catch (e) {
            console.error(e);
            element.checked = !element.checked;
            return false;
        }
    };
}

function render(todos) {
    function createItem(data) {
        const base = document.createElement('li');
        base.setAttribute('data-id', data.id);
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.addEventListener('click', toggleFinish(input));
        const edit = document.createElement('button');
        edit.textContent = 'Edit';
        edit.addEventListener('click', editContent(edit));
        if (data.finished)
            input.setAttribute('checked', 'true');
        const p = document.createElement('p');
        p.innerText = data.content;
        label.append(input, edit, p);
        base.append(label);
        return base;
    }

    const list = document.querySelector('#todo > .list');
    list.innerHTML = '';
    for (let todo of todos) {
        let element = createItem(todo);
        list.append(element);
    }
}

document.querySelector('#todo > .refresh')
    .addEventListener('click', refresh);

document.querySelectorAll('#todo > .list > li input')
    .forEach(element => {
        element.addEventListener('click', toggleFinish(element));
    })
;

document.querySelectorAll('#todo > .list > li button')
    .forEach(element => {
        element.addEventListener('click', editContent(element));
    })
;
