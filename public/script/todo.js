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

function render(todos) {
    function createItem(data) {
        const base = document.createElement('li');
        base.setAttribute('data-id', data.id);
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        if (data.finished)
            input.setAttribute('checked', 'true');
        const p = document.createElement('p');
        p.innerText = data.content;
        label.append(input, p);
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
    .addEventListener('click', refresh)
