<img src="https://github.com/user-attachments/assets/bb514772-084e-439f-997a-badfe089be76" width="300">

# FarmInsight Dashboard Frontend

## Table of Contents
- [The FarmInsight Project](#the-farminsight-project)
  - [Core vision](#core-vision)
- [Overview](#-overview)
  - [Built with](#built-with)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Screenshots and UI Design](#-screenshots-and-ui-design)
- [Contributing](#-contributing)
- [License](#-license)


## The FarmInsight Project
Welcome to the FarmInsight Project by ETCE!

The FarmInsight platform brings together advanced monitoring of "Food Production Facilities" (FPF), enabling users to 
document, track, and optimize every stage of food production seamlessly.

All FarmInsight Repositories:
* <a href="https://github.com/ETCE-LAB/FarmInsight-Dashboard-Frontend">Dashboard-Frontend</a>
* <a href="https://github.com/ETCE-LAB/FarmInsight-Dashboard-Backend">Dashboard-Backend</a>
* <a href="https://github.com/ETCE-LAB/FarmInsight-FPF-Backend">FPF-Backend</a>

### Core vision

<img src="/.documentation/FarmInsightOverview.jpg">

FarmInsight empowers users to manage food production facilities with precision and ease. 

Key features include:

* User Management: Set up organizations with role-based access control for secure and personalized use.
* FPF Management: Configure and manage Food Production Facilities (FPFs), each equipped with sensors and cameras.
* Sensor & Camera Integration: Collect sensor data and capture images or livestreams at configurable intervals, all 
accessible through the web application.
* Harvest Documentation: Log and track harvests for each plant directly from the frontend interface.
* Data Visualization: Visualize sensor data with intuitive graphs and charts.
* Media Display: View and manage captured images and livestreams for real-time monitoring.

## 🔎 Overview
The **FarmInsight Dashboard Frontend** is a user interface for managing and monitoring Food Production Facilities (FPFs). It serves as the frontend for a corresponding backend, which is also hosted in the ETCE-Labs GitHub repository.

The dashboard provides:
- A detailed overview of FPFs.
- Features for creating and editing organizations.
- Assignment of FPFs to organizations.
- User management.
- Management and editing of FPFs:
  - Adding sensors and cameras.
  - Graphical representation and analysis of sensor data.

### Built with

[![NPM][NPM-img]][NPM-url] <br>
[![React][React-img]][React-url] <br>
[![Redux][Redux-img]][Redux-url] <br>
[![Mantine][Mantine-img]][Mantine-url] <br>
[![Typescript][Typescript-img]][Typescript-url] 


## 🔬 Features

### Organizations
- Creation and editing of organizations.
- Assignment of existing users to organizations.
- Promoting or removing users of an organization.

### Food Production Facilities (FPFs)
- Creation, management, and editing of FPFs.
- Adding and editing of sensors and cameras.
- Displaying and graphically analyzing sensor data in an intuitive UI.
- Adding, editing, deleting Growing Cycles.

## 🔧 Installation
### System Requirements
- Node.js (recommended: LTS version)

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ETCE-LAB/FarmInsight-Dashboard-Frontend.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The development server will run by default at [http://localhost:3000](http://localhost:3000).


4. **Set up the backend:**

   Please follow the instructions in the [Backend Repository](https://github.com/ETCE-LAB/FarmInsight-Dashboard-Backend) to set up the API.

## 💡 Usage
### Access
After starting the frontend, you can either create or log in with a user account in order
to create your own organizations and FPFs or manage existing ones.


## 🎨 Screenshots and UI Design
*Please insert screenshots or mockups here.*

## ⚖️ License
This project is licensed under the [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html) license.

## 🔄 Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push the branch: `git push origin feature/your-feature`
5. Create a pull request.

---
For more information or questions, please contact the ETCE-Lab team.

<!-- MARKDOWN LINKS & IMAGES -->
[React-img]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[NPM-img]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com/
[Redux-img]: https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[Mantine-img]: https://img.shields.io/badge/Mantine-ffffff?style=for-the-badge&logo=Mantine&logoColor=339af0
[Mantine-url]: https://mantine.dev/
[Typescript-img]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/


