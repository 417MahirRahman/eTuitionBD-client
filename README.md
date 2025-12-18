# 🎓 eTuitionBD – Online Tuition Management System

eTuitionBD is a full-stack web application that connects **students**, **tutors**, and **admins** on a single platform.  
It allows students to post tuition requests, tutors to apply for tuitions, and admins to manage users, applications, and platform activities.

---

## 🚀 Live Demo
[https://etuition-bd.netlify.app/](https://etuition-bd.netlify.app/)
 

---

## 🧩 Features

### 👨‍🎓 Student
- Create and manage tuition posts
- View tutor applications
- Secure authentication using Firebase
- Profile management

### 👨‍🏫 Tutor
- Apply for tuition posts
- Manage tutor applications
- Update profile and qualifications
- Track application status (Pending / Approved / Rejected)

### 👨‍💼 Admin
- User management (Student / Tutor / Admin)
- Update user roles
- Manage tutor applications
- Secure admin-only routes

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **React Hook Form**
- **Tailwind CSS**
- **DaisyUI**
- **Axios**
- **SweetAlert2**
- **TanStack Query (React Query)**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT Authentication**
- **Stripe Payment Integration**

### Authentication
- **Firebase Authentication**
  - Email/Password Login

---

## Project Structure
```bash
client/
├── src/
│   ├── layout          # Main-layout, Dashboard-layout
│   ├── firebase        # Authentication
│   ├── pages/          # Home, All-Tuition, Tuition-Details, Tutor, Profile, Dashboard etc.
│   ├── components/     # Navbar, Footer
│   ├── hooks/          # useAxiosSecure etc
│   ├── Provider/       # AuthProvider & AuthContext
│   └── utilities/      # Loader, Dropdown, Validity
server/
├── index.js            # Express server
```

---

## Clone the repository:
```bash
git clone https://github.com/417MahirRahman/eTuitionBD-client.git

```
---

## Install dependencies and start the development server:
```bash
npm install
npm run dev

