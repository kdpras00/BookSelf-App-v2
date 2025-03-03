// Fungsi untuk mengambil data dari localStorage
function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

// Fungsi untuk menyimpan data ke localStorage
function saveBooks(books) {
    localStorage.setItem("books", JSON.stringify(books));
}

// Fungsi untuk menampilkan buku ke rak
function renderBooks(books = getBooks()) {
    const incompleteBookList = document.getElementById("incompleteBookList");
    const completeBookList = document.getElementById("completeBookList");

    // Kosongkan rak sebelum merender ulang
    incompleteBookList.innerHTML = "";
    completeBookList.innerHTML = "";

    books.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.setAttribute("data-bookid", book.id); // Atribut data-bookid
        bookItem.className = "bg-white bg-opacity-10 p-4 rounded-lg shadow-md";

        bookItem.innerHTML = `
            <h3 class="text-xl font-semibold">${book.title}</h3>
            <p class="text-gray-300">Penulis: ${book.author}</p>
            <p class="text-gray-300">Tahun: ${book.year}</p>
            <div class="mt-4 flex gap-2">
                <button onclick="toggleComplete(${book.id})" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    ${book.isComplete ? "Belum Selesai" : "Selesai"}
                </button>
                <button onclick="editBook(${book.id})" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
                    Edit
                </button>
                <button onclick="deleteBook(${book.id})" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                    Hapus
                </button>
            </div>
        `;

        // Tambahkan buku ke rak yang sesuai
        if (book.isComplete) {
            completeBookList.appendChild(bookItem);
        } else {
            incompleteBookList.appendChild(bookItem);
        }
    });
}

// Fungsi untuk menambahkan buku
function addBook(event) {
    event.preventDefault();

    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = document.getElementById("bookFormYear").value;
    const isComplete = document.getElementById("bookFormIsComplete").checked;

    if (title && author && year) {
        const newBook = {
            id: +new Date(), // ID unik berdasarkan timestamp
            title, // Judul buku (string)
            author, // Penulis buku (string)
            year: parseInt(year), // Tahun terbit (number)
            isComplete, // Status buku (boolean)
        };

        const books = getBooks();
        books.push(newBook);
        saveBooks(books);
        renderBooks();

        // Reset form
        document.getElementById("bookForm").reset();

        // Tampilkan SweetAlert2
        Swal.fire({
            title: "Berhasil!",
            text: `Buku "${title}" berhasil ditambahkan.`,
            icon: "success",
            confirmButtonColor: "#3b82f6",
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Harap isi semua field!",
            icon: "error",
            confirmButtonColor: "#ef4444",
        });
    }
}

// Fungsi untuk memindahkan buku antar rak
function toggleComplete(bookId) {
    const books = getBooks();
    const bookIndex = books.findIndex((book) => book.id === bookId);
    books[bookIndex].isComplete = !books[bookIndex].isComplete;
    saveBooks(books);
    renderBooks();
}

// Fungsi untuk mengedit buku
// Fungsi untuk mengedit buku dengan SweetAlert2
function editBook(bookId) {
  const books = getBooks();
  const book = books.find((book) => book.id === bookId);

  Swal.fire({
      title: "Edit Buku",
      html:
          `<input id="swalEditTitle" class="swal2-input" placeholder="Judul" value="${book.title}">` +
          `<input id="swalEditAuthor" class="swal2-input" placeholder="Penulis" value="${book.author}">` +
          `<input id="swalEditYear" class="swal2-input" placeholder="Tahun" type="number" value="${book.year}">` +
          `<div class="flex items-center mt-4">
              <input id="swalEditIsComplete" type="checkbox" class="w-5 h-5 mr-2" ${book.isComplete ? "checked" : ""}>
              <label for="swalEditIsComplete" class="text-gray-700">Selesai dibaca</label>
          </div>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      preConfirm: () => {
          const title = document.getElementById("swalEditTitle").value;
          const author = document.getElementById("swalEditAuthor").value;
          const year = document.getElementById("swalEditYear").value;
          const isComplete = document.getElementById("swalEditIsComplete").checked;

          if (!title || !author || !year) {
              Swal.showValidationMessage("Harap isi semua field!");
              return false;
          }

          return { title, author, year: parseInt(year), isComplete };
      },
  }).then((result) => {
      if (result.isConfirmed) {
          const updatedBook = result.value; // Data yang diisi di form SweetAlert2
          const bookIndex = books.findIndex((book) => book.id === bookId);

          if (bookIndex !== -1) {
              books[bookIndex] = { ...books[bookIndex], ...updatedBook }; // Perbarui data buku
              saveBooks(books); // Simpan ke localStorage
              renderBooks(); // Render ulang daftar buku

              // Tampilkan SweetAlert2 sukses
              Swal.fire({
                  title: "Berhasil!",
                  text: `Buku "${updatedBook.title}" berhasil diperbarui.`,
                  icon: "success",
                  confirmButtonColor: "#3b82f6",
              });
          }
      }
  });
}

// Fungsi untuk menyimpan perubahan buku
function saveEditBook(event) {
    event.preventDefault();

    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = document.getElementById("bookFormYear").value;
    const isComplete = document.getElementById("bookFormIsComplete").checked;
    const bookId = document.getElementById("bookForm").dataset.bookId;

    if (title && author && year) {
        const books = getBooks();
        const bookIndex = books.findIndex((book) => book.id === parseInt(bookId));
        books[bookIndex] = { ...books[bookIndex], title, author, year: parseInt(year), isComplete };
        saveBooks(books);
        renderBooks();

        // Reset form
        document.getElementById("bookForm").reset();
        document.getElementById("bookFormSubmit").textContent = "Tambahkan Buku";
        delete document.getElementById("bookForm").dataset.bookId;

        // Tampilkan SweetAlert2
        Swal.fire({
            title: "Berhasil!",
            text: `Buku "${title}" berhasil diperbarui.`,
            icon: "success",
            confirmButtonColor: "#3b82f6",
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Harap isi semua field!",
            icon: "error",
            confirmButtonColor: "#ef4444",
        });
    }
}

// Fungsi untuk menghapus buku
function deleteBook(bookId) {
    Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Buku ini akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3b82f6",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Ya, hapus!",
    }).then((result) => {
        if (result.isConfirmed) {
            const books = getBooks();
            const updatedBooks = books.filter((book) => book.id !== bookId);
            saveBooks(updatedBooks);
            renderBooks();

            Swal.fire({
                title: "Dihapus!",
                text: "Buku telah dihapus.",
                icon: "success",
                confirmButtonColor: "#3b82f6",
            });
        }
    });
}

// Event listener untuk form tambah/edit buku
document.getElementById("bookForm").addEventListener("submit", function (event) {
    if (document.getElementById("bookForm").dataset.bookId) {
        saveEditBook(event);
    } else {
        addBook(event);
    }
});

// Event listener untuk form pencarian buku
document.getElementById("searchBook").addEventListener("submit", function (event) {
    event.preventDefault();

    const searchQuery = document.getElementById("searchBookTitle").value.toLowerCase();
    const books = getBooks();
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery)
    );

    renderBooks(filteredBooks);
});

// Render buku saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
    const books = getBooks();
    renderBooks(books);
});