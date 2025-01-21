<img src="https://github.com/user-attachments/assets/bb514772-084e-439f-997a-badfe089be76" width="300">

# FarmInsight Dashboard Frontend

## 🔎 **Overview**
The **FarmInsight Dashboard Frontend** is a user interface for managing and monitoring Food Production Facilities (FPFs). It serves as the frontend for a corresponding backend, which is also hosted in the ETCE-Labs GitHub repository.

The dashboard provides:
- A detailed overview of FPFs.
- Features for creating and editing organizations.
- Assignment of FPFs to organizations.
- User management.
- Management and editing of FPFs:
  - Adding sensors and cameras.
  - Graphical representation and analysis of sensor data.

## ⚙️ **Technologies**
- **Programming Language:** TypeScript 5.7.2
- **Framework:** [Mantine](https://mantine.dev/)
- **Hardware:** Raspberry Pis for sensor integration (GPIO pins or REST, depending on configuration).

## 🔬 **Main Features**
### Organizations
- Creation and editing of organizations.
- Assignment of FPFs to organizations.

### Food Production Facilities (FPFs)
- Creation, management, and editing of FPFs.
- Adding sensors and cameras.
- Displaying and graphically analyzing sensor data in an intuitive UI.

### User Management
- Creating, editing, and assigning users to organizations and FPFs.

## 🔧 **Installation**
### System Requirements
- Node.js (recommended: LTS version)
- TypeScript 5.7.2

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

## 💡 **Usage**
### Access
After starting the frontend, you can log in with a user account created via the backend.

### Features
- **Manage Organizations:**
  - Create new organizations.
  - Edit existing organizations.
- **Manage FPFs:**
  - Add sensors and cameras to FPFs.
  - Monitor sensor data in real-time.
- **User Roles:**
  - Create users and assign them to organizations or FPFs.

## 🎨 **Screenshots and UI Design**
*Please insert screenshots or mockups here.*

## ⚖️ **License**
This project is licensed under the [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html) license.

## 🔄 **Contributing**
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push the branch: `git push origin feature/your-feature`
5. Create a pull request.

## 🔗 **References**
- **Backend Repository:** [FarmInsight Backend](https://github.com/ETCE-LAB/FarmInsight-Dashboard-Backend)
- **Mantine Framework:** [https://mantine.dev/](https://mantine.dev/)
- **Node.js Download:** [https://nodejs.org/](https://nodejs.org/)

---
For more information or questions, please contact the ETCE-Lab team.
