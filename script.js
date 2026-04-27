let arr = [];
let steps = [];
let currentStep = 0;
let speed = 30;
let isPlaying = false;

// Init
window.onload = function () {
  document.getElementById("speed").oninput = function () {
    speed = this.value;
  };
  generateArray();
};

// Generate array
function generateArray() {
  arr = [];
  for (let i = 0; i < 15; i++) {
    arr.push(Math.floor(Math.random() * 50) + 10);
  }
  steps = [];
  currentStep = 0;
  render(arr);
}

// Render bars with numbers
function render(array) {
  const container = document.getElementById("array-container");
  container.innerHTML = "";

  array.forEach(val => {
    const bar = document.createElement("div");
    bar.classList.add("bar");

    bar.style.height = val * 5 + "px";
    bar.innerText = val; // 👈 NUMBER DISPLAY

    container.appendChild(bar);
  });
}

// ---------------- SORTING ----------------

// Bubble Sort (FULL STEP TRACKING)
function bubbleSort(a) {
  let temp = [...a];
  steps.push([...temp]);

  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < temp.length - i - 1; j++) {

      if (temp[j] > temp[j + 1]) {
        [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
      }

      steps.push([...temp]); // 👈 EVERY STEP
    }
  }
}

// Selection Sort
function selectionSort(a) {
  let temp = [...a];
  steps.push([...temp]);

  for (let i = 0; i < temp.length; i++) {
    let min = i;

    for (let j = i + 1; j < temp.length; j++) {
      if (temp[j] < temp[min]) min = j;
    }

    [temp[i], temp[min]] = [temp[min], temp[i]];
    steps.push([...temp]);
  }
}

// Insertion Sort
function insertionSort(a) {
  let temp = [...a];
  steps.push([...temp]);

  for (let i = 1; i < temp.length; i++) {
    let key = temp[i];
    let j = i - 1;

    while (j >= 0 && temp[j] > key) {
      temp[j + 1] = temp[j];
      j--;
      steps.push([...temp]);
    }

    temp[j + 1] = key;
    steps.push([...temp]);
  }
}

// ---------------- CONTROLS ----------------

// Start
function startSort() {
  steps = [];
  currentStep = 0;
  isPlaying = true;

  let algo = document.getElementById("algo").value;

  if (algo === "bubble") {
    bubbleSort(arr);
    document.getElementById("info").innerText = "Bubble Sort - O(n²)";
  } else if (algo === "selection") {
    selectionSort(arr);
    document.getElementById("info").innerText = "Selection Sort - O(n²)";
  } else {
    insertionSort(arr);
    document.getElementById("info").innerText = "Insertion Sort - O(n²)";
  }

  render(steps[0]);
  play();
}

// Auto play
function play() {
  if (!isPlaying) return;

  if (currentStep < steps.length - 1) {
    setTimeout(() => {
      currentStep++;
      render(steps[currentStep]);
      play();
    }, 1000 / speed);
  } else {
    isPlaying = false;
  }
}

// Next
function nextStep() {
  isPlaying = false;

  if (currentStep < steps.length - 1) {
    currentStep++;
    render(steps[currentStep]);
  }
}

// Prev
function prevStep() {
  isPlaying = false;

  if (currentStep > 0) {
    currentStep--;
    render(steps[currentStep]);
  }
}