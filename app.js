let tasks = [];

// Ambil data dari localStorage saat halaman dimuat
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  renderTasks();
}

// Event Listener untuk menambah tugas
document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("task-input");
  const value = input.value.trim();
  if (value === "") {
    alert("Tugas tidak boleh kosong!");
    return;
  }
  // Buat objek tugas baru
  const task = { text: value, date: new Date().toLocaleString(), done: false };
  tasks.push(task);
  input.value = "";
  saveTasks();
  renderTasks();
});

// Fungsi untuk menampilkan list tugas
function renderTasks(filter = "") {
  const listPending = document.getElementById("task-list-pending");
  const listDone = document.getElementById("task-list-done");
  listPending.innerHTML = "";
  listDone.innerHTML = "";

  tasks.forEach((task, index) => {
    if (task.text.toLowerCase().includes(filter.toLowerCase())) {
      const div = document.createElement("div");
      div.className = "task-text";
      div.style = task.done ? "text-decoration: line-through; color: gray;" : "";
      div.innerHTML = `
        <div>${task.text}</div>
        <small class="task-date">${task.date}</small>
        <div class="btn-group">
          <button class="edit" onclick="editTask(${index})">Edit</button>
          <button class="delete" onclick="deleteTask(${index})">Hapus</button>
          <button class="done" onclick="doneTask(${index})">${task.done ? "Kembalikan" : "Selesai"}</button>
        </div>
      `;
      if (task.done) {
        listDone.appendChild(div);
      } else {
        listPending.appendChild(div);
      }
    }
  });
}

// Fungsi untuk menghapus tugas
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Fungsi untuk mengedit tugas
function editTask(index) {
  const newText = prompt("Edit tugas:", tasks[index].text);
  if (newText && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  } else {
    alert("Tugas tidak boleh kosong!");
  }
}

// Fungsi untuk tandai selesai / belum selesai
function doneTask(index) {
  tasks[index].done = !tasks[index].done; // toggle status
  saveTasks();
  renderTasks();
}

// Fungsi untuk menyimpan tugas ke localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Fungsi untuk pencarian tugas
function searchTasks() {
  const searchValue = document.getElementById("search-box").value;
  renderTasks(searchValue);
}
