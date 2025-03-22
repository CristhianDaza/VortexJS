# VortexJS - Reactive State Management System

VortexJS is a minimalist reactive state management system developed to efficiently manage global and local states in JavaScript applications. This project serves as the initial core of a framework designed to handle state and notifications between components using proxies and subscription patterns.

---

## 📌 Key Features
- 📦 Global State Management using Proxies.
- 🔒 Local State Creation using `WeakMap` to prevent memory leaks.
- 📢 Subscriptions to specific properties with automatic notification upon changes.
- ✂️ Unsubscription system (`unsubscribe()`) to remove unnecessary subscriptions.

---

## 📂 Project Structure
```
/VortexJS
│
├── /src
│   └── /core
│       └── StateManager.js     (Main state management file)
│
├── /examples
│   ├── index.html              (HTML file for testing the system)
│   └── main.js                 (JavaScript file for testing)
│
├── README.md                   (This documentation file)
├── package.json                (npm configuration file)
└── .gitignore                  (Files to be ignored by git)
```

---

## 📖 Installation
1. Clone the repository:
```
git clone https://github.com/CristhianDaza/VortexJS.git
```
2. Navigate to the project directory:
```
cd VortexJS
```

---

## 📌 Available Scripts
- `npm run dev`: Starts the project in development mode (if you set up a bundler).

---

## 📌 License
VortexJS is an open-source project under the MIT License.

