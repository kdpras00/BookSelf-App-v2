class NoteItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.render();
    }
  
    static get observedAttributes() {
      return ["title", "body"];
    }
  
    attributeChangedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 group">
          <h2 class="text-2xl font-bold text-pink-600 mb-2 group-hover:text-pink-500 transition">${this.getAttribute("title")}</h2>
          <p class="text-gray-500 text-base leading-relaxed">${this.getAttribute("body")}</p>
        </div>
      `;
    }
  }
  
  customElements.define("note-item", NoteItem);
  
  const notesData = [
    { id: "notes-jT-jjsyz61J8XKiI", title: "Welcome to Notes, Dimas!", body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.", createdAt: "2022-07-28T10:03:12.594Z", archived: false },
    { id: "notes-aB-cdefg12345", title: "Meeting Agenda", body: "Discuss project updates and assign tasks for the upcoming week.", createdAt: "2022-08-05T15:30:00.000Z", archived: false },
    { id: "notes-XyZ-789012345", title: "Shopping List", body: "Milk, eggs, bread, fruits, and vegetables.", createdAt: "2022-08-10T08:45:23.120Z", archived: false },
    { id: "notes-1a-2b3c4d5e6f", title: "Personal Goals", body: "Read two books per month, exercise three times a week, learn a new language.", createdAt: "2022-08-15T18:12:55.789Z", archived: false },
    { id: "notes-LMN-456789", title: "Recipe: Spaghetti Bolognese", body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...", createdAt: "2022-08-20T12:30:40.200Z", archived: false },
    { id: "notes-QwErTyUiOp", title: "Workout Routine", body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.", createdAt: "2022-08-25T09:15:17.890Z", archived: false },
    { id: "notes-abcdef-987654", title: "Book Recommendations", body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee", createdAt: "2022-09-01T14:20:05.321Z", archived: false },
    { id: "notes-zyxwv-54321", title: "Daily Reflections", body: "Write down three positive things that happened today and one thing to improve tomorrow.", createdAt: "2022-09-07T20:40:30.150Z", archived: false },
    { id: "notes-poiuyt-987654", title: "Travel Bucket List", body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA", createdAt: "2022-09-15T11:55:44.678Z", archived: false },
    { id: "notes-asdfgh-123456", title: "Coding Projects", body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project", createdAt: "2022-09-20T17:10:12.987Z", archived: false },
  ];
  
  function renderNotes() {
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";
    notesData.forEach((note) => {
      const noteElement = document.createElement("note-item");
      noteElement.setAttribute("title", note.title);
      noteElement.setAttribute("body", note.body);
      container.appendChild(noteElement);
    });
  }
  
  document.getElementById("noteForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    notesData.push({
      id: `notes-${Date.now()}`,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false
    });
    renderNotes();
    this.reset();
    Swal.fire({
      title: "Success!",
      text: "Your note has been added.",
      icon: "success",
      confirmButtonText: "OK",
    });
  });
  
  renderNotes();
  