function selectionSort(arr, order) {
    const a = arr.slice();
    let steps = 0;
    for (let i = 0; i < a.length - 1; i++) {
        let idx = i;
        for (let j = i + 1; j < a.length; j++) {
            steps++;
            if ((order === 'asc' && a[j].localeCompare(a[idx]) < 0) ||
                (order === 'desc' && a[j].localeCompare(a[idx]) > 0)) {
                idx = j;
            }
        }
        if (idx !== i) {
            [a[i], a[idx]] = [a[idx], a[i]];
            steps++;
        }
    }
    return { sorted: a, steps };
}

function bubbleSort(arr, order) {
    const a = arr.slice();
    let steps = 0;
    for (let i = 0; i < a.length - 1; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
            steps++;
            if ((order === 'asc' && a[j].localeCompare(a[j+1]) > 0) ||
                (order === 'desc' && a[j].localeCompare(a[j+1]) < 0)) {
                [a[j], a[j+1]] = [a[j+1], a[j]];
                steps++;
            }
        }
    }
    return { sorted: a, steps };
}


// DOM elements
const bookCountInput = document.getElementById('book-count');
const generateFieldsBtn = document.getElementById('generate-fields');
const bookTitlesDiv = document.getElementById('book-titles');
const sortOptionsDiv = document.getElementById('sort-options');
const sortOrderSelect = document.getElementById('sort-order');
const sortBooksBtn = document.getElementById('sort-books');
const selectionResultPre = document.getElementById('selection-result');
const bubbleResultPre = document.getElementById('bubble-result');
const selectionDuration = document.getElementById('selection-time');

// Generate title fields
generateFieldsBtn.addEventListener('click', () => {
    const count = parseInt(bookCountInput.value);
    if (!count || count < 1) {
        alert('Please enter a valid number of books.');
        return;
    }
    bookTitlesDiv.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const label = document.createElement('label');
        label.textContent = `Book ${i + 1} Title:`;
        label.setAttribute('for', `book-title-${i}`);
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `book-title-${i}`;
        input.required = true;
        input.maxLength = 100;
        input.className = 'book-title-input';
        bookTitlesDiv.appendChild(label);
        bookTitlesDiv.appendChild(input);
    }
    sortOptionsDiv.style.display = 'block';
    selectionResultPre.textContent = '';
    bubbleResultPre.textContent = '';
});

// Sort books
sortBooksBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.book-title-input');
    const titles = [];
    for (let input of inputs) {
        if (input.value.trim() === '') {
            alert('Please fill in all book titles!');
            return;
        }
        titles.push(input.value.trim());
    }
    const order = sortOrderSelect.value;

    // Selection Sort Timing
    const t0Selection = performance.now();
    const selectionResult = selectionSort(titles, order);
    const t1Selection = performance.now();

    // Bubble Sort Timing
    const t0Bubble = performance.now();
    const bubbleResult = bubbleSort(titles, order);
    const t1Bubble = performance.now();

    // Display results
    selectionResultPre.textContent = selectionResult.sorted.join('\n');
    bubbleResultPre.textContent = bubbleResult.sorted.join('\n');

    document.getElementById('selection-time').textContent = (t1Selection - t0Selection).toFixed(3);
    document.getElementById('bubble-time').textContent = (t1Bubble - t0Bubble).toFixed(3);
    document.getElementById('selection-steps').textContent = selectionResult.steps;
    document.getElementById('bubble-steps').textContent = bubbleResult.steps;
});