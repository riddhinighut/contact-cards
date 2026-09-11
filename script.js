const { useState } = React;

function ContactForm({ onAddContact }) {
  const [form, setForm] = useState({
    name: "",
    jobTitle: "",
    company: "",
    phone: "",
    email: "",
    bio: "",
    avatar: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      alert("Please enter name and email.");
      return;
    }

    onAddContact({
      ...form,
      id: Date.now()
    });

    setForm({
      name: "",
      jobTitle: "",
      company: "",
      phone: "",
      email: "",
      bio: "",
      avatar: ""
    });
  }

  return React.createElement(
    "section",
    { className: "form-card" },

    React.createElement(
      "div",
      { className: "form-heading" },
      React.createElement("div", { className: "form-icon" }, "+"),
      React.createElement(
        "div",
        null,
        React.createElement("h2", null, "Add New Contact"),
        React.createElement("p", null, "Create a new digital contact card")
      )
    ),

    React.createElement(
      "form",
      { onSubmit: handleSubmit },

      React.createElement(
        "div",
        { className: "form-grid" },

        inputField(
          "Full Name *",
          "name",
          "John Doe",
          form.name,
          handleChange,
          "text"
        ),

        inputField(
          "Job Title",
          "jobTitle",
          "Software Developer",
          form.jobTitle,
          handleChange,
          "text"
        ),

        inputField(
          "Company",
          "company",
          "ABC Technologies",
          form.company,
          handleChange,
          "text"
        ),

        inputField(
          "Phone",
          "phone",
          "+91 98765 43210",
          form.phone,
          handleChange,
          "tel"
        ),

        inputField(
          "Email *",
          "email",
          "john@example.com",
          form.email,
          handleChange,
          "email"
        ),

        inputField(
          "Avatar URL",
          "avatar",
          "https://example.com/photo.jpg",
          form.avatar,
          handleChange,
          "url"
        ),

        React.createElement(
          "div",
          { className: "input-group full-width" },
          React.createElement("label", null, "Short Bio"),
          React.createElement("textarea", {
            name: "bio",
            placeholder: "Tell something about this person...",
            value: form.bio,
            onChange: handleChange,
            rows: 3
          })
        )
      ),

      React.createElement(
        "button",
        {
          className: "submit-btn",
          type: "submit"
        },
        "+ Add Contact"
      )
    )
  );
}

function inputField(label, name, placeholder, value, onChange, type) {
  return React.createElement(
    "div",
    { className: "input-group", key: name },

    React.createElement("label", null, label),

    React.createElement("input", {
      type: type,
      name: name,
      placeholder: placeholder,
      value: value,
      onChange: onChange
    })
  );
}

function ContactCard({ contact }) {
  const initials = contact.name.
  split(" ").
  map((word) => word[0]).
  join("").
  slice(0, 2).
  toUpperCase();

  return React.createElement(
    "article",
    { className: "contact-card" },

    React.createElement(
      "div",
      { className: "card-top" },

      contact.avatar ?
      React.createElement("img", {
        className: "avatar",
        src: contact.avatar,
        alt: contact.name
      }) :
      React.createElement(
        "div",
        { className: "avatar placeholder" },
        initials
      ),

      React.createElement(
        "div",
        { className: "person-info" },

        React.createElement("h3", null, contact.name),

        React.createElement(
          "p",
          { className: "job" },
          contact.jobTitle || "Professional"
        ),

        contact.company &&
        React.createElement(
          "p",
          { className: "company" },
          "🏢 ",
          contact.company
        )
      )
    ),

    React.createElement(
      "div",
      { className: "contact-details" },

      contact.phone &&
      React.createElement(
        "a",
        { href: `tel:${contact.phone}` },
        "📞 ",
        contact.phone
      ),

      contact.email &&
      React.createElement(
        "a",
        { href: `mailto:${contact.email}` },
        "✉️ ",
        contact.email
      )
    ),

    contact.bio && React.createElement("p", { className: "bio" }, contact.bio)
  );
}

function ContactList({ contacts }) {
  if (contacts.length === 0) {
    return React.createElement(
      "div",
      { className: "empty-state" },

      React.createElement("div", { className: "empty-icon" }, "📇"),

      React.createElement("h3", null, "No contacts found"),

      React.createElement("p", null, "Try another search or add a new contact.")
    );
  }

  return React.createElement(
    "div",
    { className: "contact-grid" },

    contacts.map((contact) =>
    React.createElement(ContactCard, {
      key: contact.id,
      contact: contact
    })
    )
  );
}

function App() {
  const [contacts, setContacts] = useState([
  {
    id: 1,
    name: "Riddhi Nighut",
    jobTitle: "Frontend Developer",
    company: "Tech Solutions",
    phone: "+91 98765 43210",
    email: "riddhi@example.com",
    bio: "Passionate frontend developer who loves building clean and interactive web experiences.",
    avatar: ""
  },

  {
    id: 2,
    name: "Aditi Sharma",
    jobTitle: "UI/UX Designer",
    company: "Creative Studio",
    phone: "+91 91234 56789",
    email: "aditi@example.com",
    bio: "Designer focused on creating simple, beautiful and user-friendly digital products.",
    avatar: ""
  }]
  );

  const [search, setSearch] = useState("");

  function addContact(contact) {
    setContacts((prev) => [...prev, contact]);
  }

  const filteredContacts = contacts.filter((contact) => {
    const text = search.toLowerCase();

    return (
      contact.name.toLowerCase().includes(text) ||
      contact.company.toLowerCase().includes(text));

  });

  return React.createElement(
    "div",
    { className: "app" },

    React.createElement(
      "header",
      { className: "header" },

      React.createElement(
        "div",
        null,

        React.createElement("h1", null, "Contact Cards"),

        React.createElement("p", null, "Manage your professional contacts")
      ),

      React.createElement(
        "div",
        { className: "contact-count" },
        contacts.length,
        contacts.length === 1 ? " Contact" : " Contacts"
      )
    ),

    React.createElement(
      "main",
      { className: "container" },

      React.createElement(ContactForm, {
        onAddContact: addContact
      }),

      React.createElement(
        "section",
        { className: "contacts-section" },

        React.createElement(
          "div",
          { className: "section-header" },

          React.createElement(
            "div",
            null,

            React.createElement("h2", null, "Your Contacts"),

            React.createElement(
              "p",
              null,
              "Search and manage your contact cards"
            )
          ),

          React.createElement(
            "div",
            { className: "search-box" },

            React.createElement("span", null, "🔍"),

            React.createElement("input", {
              type: "text",
              placeholder: "Search name or company...",
              value: search,
              onChange: (e) => setSearch(e.target.value)
            })
          )
        ),

        React.createElement(ContactList, {
          contacts: filteredContacts
        })
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(React.createElement(App));
