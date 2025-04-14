# Connected Sinks: A 2D Water Flow Puzzle Solver & Visualizer 🌊

[![View Demo](https://img.shields.io/badge/View%20Demo-Live%20App-brightgreen)](https://praveenm09081999.github.io/Connected-Sinks-Vitejs/)

Visually build and solve complex 2D pipe networks to determine which sinks (drains) are reachable from a single source. This project provides an interactive web application built with Vite.js and JavaScript.

![Screenshot Placeholder](https://github.com/user-attachments/assets/07fb1d44-8997-426a-994c-5ccc5339b1ca)

---

## Table of Contents

* [About The Project](#about-the-project)
* [The Puzzle](#the-puzzle)
* [Features](#features)
* [Demo](#demo)
* [How It Works (Algorithm)](#how-it-works-algorithm)
* [Technology Stack](#technology-stack)
* [Getting Started (Local Development)](#getting-started-local-development)
* [Usage](#usage)
* [Future Ideas](#future-ideas)
* [License](#license)
* [Contact](#contact)

---

## About The Project

This project brings a fascinating grid-based puzzle to life in your browser. Originally conceived as a Python programming challenge, this application provides a visual and interactive way to design and analyze water flow networks.

Users can dynamically create grids of varying sizes, place network components like sources, sinks, and various pipe structures, and then instantly solve the network to see which sinks are connected to the water source.

The core logic, once implemented in Python, has been ported to JavaScript to run efficiently in a web environment using Vite.js for a fast development and build process.

---

## The Puzzle

Imagine a network of interconnected water paths laid out on a 2D grid. The network consists of:

* **Source (✳️):** The single starting point where water enters the network.
* **Sinks/Drains (A, B, C...):** The endpoints where water can potentially flow out. Each sink is uniquely identified by an uppercase letter.
* **Pipes (═, ║, ╔, ╗, ╚, ╝, ╠, ╣, ╦, ╩):** Channels that direct the flow of water. Each pipe character defines which directions water can flow *into* or *out of* that grid cell. For example:
    * `═`: Connects Left <-> Right
    * `║`: Connects Top <-> Bottom
    * `╔`: Connects Right <-> Bottom
    * `╦`: Connects Left <-> Right <-> Bottom
    * ...and so on for all pipe types.

**The Goal:** Given a specific network layout, determine which sinks (A, B, C...) can be reached by water flowing from the source (✳️) through the connected pipes.

---

## Features ✨

* **Dynamic Grid Creation:** Specify the desired `N x N` grid size.
* **Interactive Network Builder:** Click on grid cells to place or cycle through:
    * Source (✳️)
    * Sinks (A-Z)
    * Various Pipe Types (═, ║, ╔, ╗, ╚, ╝, ╠, ╣, ╦, ╩)
    * Empty Cells
* **Sample Network Generation:** Instantly populate the grid with a pre-defined sample network for quick testing.
* **Network Solver:** Click the "Solve" button to analyze the current grid layout.
* **Visual Feedback:** The application visually highlights the connected sinks (or provides a textual result).
* **Efficient Solving:** Uses a recursive (Depth-First Search) approach with sets to efficiently track visited paths and connected sinks.
* **Web-Based & Interactive:** Built entirely in JavaScript for a smooth in-browser experience.

---

## Demo 🚀

Experience the application live:

**[➡️ Live Demo Link](https://praveenm09081999.github.io/Connected-Sinks-Vitejs/)**

---

## How It Works (Algorithm) 🧠

The core solving logic determines connectivity from the source (✳️) to any reachable sinks (A-Z).

1.  **Initialization:**
    * Locate the source (✳️) on the grid.
    * Initialize an empty set to store the letters of connected sinks.
    * Initialize an empty set to keep track of visited `(row, col)` coordinates to prevent infinite loops in cyclic paths.

2.  **Recursive Search (Depth-First Search - DFS):**
    * A recursive function is called, starting from the source's position.
    * The function takes the current `(row, col)` as input.
    * **Base Cases:**
        * If the current cell is outside the grid boundaries, stop.
        * If the current cell has already been visited, stop.
        * If the current cell is empty, stop.
    * **Marking:** Mark the current cell as visited.
    * **Sink Check:** If the current cell contains a sink (A-Z), add its letter to the set of connected sinks.
    * **Pipe Traversal:**
        * Determine the type of pipe (or source) in the current cell.
        * Based on the pipe type, identify the valid neighboring cells water can flow *to*. For example, if the current cell has `╔` (connects Right and Bottom):
            * Check if the cell to the **Right** exists and has a pipe that accepts flow from the **Left** (e.g., `═`, `╗`, `╝`, `╣`, `╦`, `╩`). If so, recursively call the function for the right neighbor.
            * Check if the cell **Below** exists and has a pipe that accepts flow from the **Top** (e.g., `║`, `╚`, `╝`, `╠`, `╣`, `╩`). If so, recursively call the function for the neighbor below.
        * The source (✳️) is treated as being able to flow into *any* adjacent connecting pipe.

3.  **Result:**
    * Once the recursion completes (all reachable paths from the source have been explored), the set of connected sinks contains all the letters of the reachable sinks.
    * The application then formats these letters into an alphabetically sorted string (e.g., "ACE").

This approach efficiently explores all possible paths from the source without getting stuck in loops, correctly identifying all connected sinks according to the pipe connection rules.

---

## Technology Stack 🛠️

* **Vite:** Next-generation frontend tooling for fast development and optimized builds.
* **JavaScript:** Core programming language for the application logic.
* **HTML5:** Structure of the web application.
* **CSS3:** Styling for the grid and interface elements.
* **Tailwind CSS:** Styling for the grid and interface elements.

*Inspired by an original problem solved using Python.*

---

## Getting Started (Local Development)

To run this project locally:

1.  **Prerequisites:** Ensure you have Node.js and npm (or yarn) installed.
2.  **Clone the repository:**
    ```bash
    git clone [https://github.com/praveenm09081999/Connected-Sinks-Vitejs.git](https://github.com/praveenm09081999/Connected-Sinks-Vitejs.git)
    cd Connected-Sinks-Vitejs
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will typically start the app on `http://localhost:5173` (or another port).

5.  **Build for production:**
    ```bash
    npm run build
    # or
    yarn build
    ```
    This creates an optimized `dist` folder for deployment.

---

## Usage (Live Demo)

1.  Navigate to the [Live Demo](https://praveenm09081999.github.io/Connected-Sinks-Vitejs/).
2.  **(Optional)** Adjust the grid size using the input controls if available.
3.  **Build your network:**
    * Click on grid cells to place the Source (✳️), Sinks (A, B, C...), and Pipe segments (═, ║, etc.). Each click might cycle through available elements.
    * **OR** click the "Generate Sample Grid" button to load a predefined network.
4.  **Solve:** Click the "Solve" button.
5.  **View Results:** The application will indicate which sinks are connected to the source, typically by displaying an alphabetically sorted string of sink letters.

---

## Future Ideas 🚀

* Implement highlighting of the actual connected path(s).
* Allow multiple sources.
* Add more complex pipe types or elements (e.g., one-way pipes, valves).
* Performance optimizations for extremely large grids.
* Add unit and integration tests.
* Improve UI/UX and accessibility.

---

## License 📄

Distributed under the MIT License. See `LICENSE` file for more information.

---

## Contact 📧

Praveen M - [praveenmurugan743@gmail.com]()

Project Link: [https://github.com/praveenm09081999/Connected-Sinks-Vitejs](https://github.com/praveenm09081999/Connected-Sinks-Vitejs)
