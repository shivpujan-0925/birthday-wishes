# Build Prompt: Personalized Birthday Wish Website

## Project Overview
Build a full-stack, personalized birthday website for a friend. The site is locked behind a simple date-based authentication and reveals an animated, fancy birthday experience once unlocked — wishes/quotes, a personal note, and a photo gallery.

---

## Tech Stack
- **Frontend:** React (Vite) + TailwindCSS + shadcn/ui
- **Animation Libraries:** Framer Motion (transitions/animations), canvas-confetti (celebration burst), embla-carousel or swiper (carousels)
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas (for wishes, notes, photo metadata — NOT raw images)
- **Image Storage:** Cloudinary (image upload + hosting, only URLs saved to MongoDB)
- **Auth:** Simple JWT-based session, unlocked via matching birth date + month (not full login system)
- **Deployment:** Frontend → Vercel | Backend → Render | DB → MongoDB Atlas | Images → Cloudinary

---

## User Flow

### Public / Friend-Facing Side
1. **Lock Screen** – Animated background (balloons/cake/confetti particles), input fields for Date + Month only. On submit, backend validates against `.env` stored `BIRTHDAY_DATE` and `BIRTHDAY_MONTH`.
2. **Unlock Success** – Confetti burst animation (canvas-confetti) plays, then transitions into the main site.
3. **Hero Section** – Large animated welcome message with friend's name, festive typography.
4. **Wishes/Quotes Carousel** – Swipeable/scrollable cards containing multiple birthday quotes and wishes.
5. **Personal Note Section** – A dedicated, styled block for a custom handwritten-style message.
6. **Photo Gallery** – Masonry or grid layout supporting 12–15 images, click-to-expand fullscreen lightbox view, smooth hover/entry animations.
7. **Ambient Animation** – Optional floating balloons/hearts/sparkles subtly animating in the background throughout the site.

### Admin Side (Owner Only)
8. **Admin Login Page** – A separate, hidden route (e.g. `/admin`), NOT linked from the public site. Simple username + password form (or password-only). Independent from the birthday-date auth — this protects content management, not the birthday reveal.
9. **Admin Dashboard** – After login, owner can:
   - Upload new photos (to Cloudinary, metadata saved to MongoDB)
   - Reorder or delete existing photos
   - Add/edit/delete wishes-quotes
   - Edit the personal note text
   - All changes reflect live on the public site

---

## Design Direction
- **Color Palette:** Pastel gradients — pink, purple, gold/yellow (festive, celebratory feel)
- **Typography:** Decorative script font (e.g., "Dancing Script", "Pacifico") for headings; clean readable sans-serif (e.g., "Poppins", "Inter") for body text
- **Overall Vibe:** Fancy, warm, celebratory, mobile-responsive, smooth animated transitions between all sections

---

## Backend Requirements

### API Routes

**Public (birthday-date auth)**
- `POST /api/auth/verify` — accepts `{ date, month }`, validates against env vars, returns a "viewer" JWT on success
- `GET /api/wishes` — returns list of quotes/wishes
- `GET /api/note` — returns the personal note
- `GET /api/photos` — returns list of photo URLs + captions

**Admin (separate owner auth)**
- `POST /api/admin/login` — accepts `{ username, password }`, validates against env vars, returns a separate "admin" JWT on success
- `POST /api/admin/photos` — uploads image to Cloudinary, saves returned URL + metadata to MongoDB (admin JWT required)
- `PUT /api/admin/photos/:id` — reorder/edit a photo (admin JWT required)
- `DELETE /api/admin/photos/:id` — delete a photo (admin JWT required)
- `POST /api/admin/wishes` — add a new wish/quote (admin JWT required)
- `PUT /api/admin/note` — update the personal note (admin JWT required)

### Middleware
- `verifyViewerJWT` — protects public GET routes (`/api/wishes`, `/api/note`, `/api/photos`) so only unlocked friends can fetch content
- `verifyAdminJWT` — protects all `/api/admin/*` routes; completely separate token/secret from the viewer JWT, so a friend who unlocks the birthday lock can never reach admin actions

### MongoDB Schemas
```
Photo: { url: String, caption: String, order: Number }
Wish:  { text: String, author: String }
Note:  { text: String }  // single document
```

### Environment Variables (.env)
```
BIRTHDAY_DATE=25
BIRTHDAY_MONTH=09
JWT_SECRET=your_viewer_secret_here
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
ADMIN_JWT_SECRET=your_admin_secret_here
MONGODB_URI=your_mongodb_atlas_uri
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

---

## Folder Structure
```
/client
  /src
    /components
      LockScreen.jsx
      WishCard.jsx
      QuoteCarousel.jsx
      PhotoGallery.jsx
      NoteSection.jsx
      HeroSection.jsx
      AdminLogin.jsx
      AdminDashboard.jsx
    /pages
      Home.jsx
      Admin.jsx
    App.jsx
    main.jsx

/server
  /routes
    auth.js
    photos.js
    wishes.js
    note.js
    admin.js
  /models
    Photo.js
    Wish.js
    Note.js
  /middleware
    verifyViewerJWT.js
    verifyAdminJWT.js
  /config
    db.js
    cloudinary.js
  server.js
```

---

## Functional Requirements Checklist
- [ ] Date/month-only authentication for viewers (no passwords, no usernames)
- [ ] Separate hidden admin route (`/admin`) with username/password login, own JWT — only the owner can upload/manage content
- [ ] JWT session persisted in localStorage after unlock (both viewer and admin sessions kept separate)
- [ ] At least 12–15 photo upload support via Cloudinary
- [ ] Animated confetti on successful unlock
- [ ] Quote/wish carousel with multiple pre-seeded birthday quotes
- [ ] Editable personal note section
- [ ] Fully responsive design (mobile-first)
- [ ] Smooth Framer Motion transitions across all sections
- [ ] Fancy festive color scheme and fonts as described above

---

## Deployment Notes
- Frontend build deployed on **Vercel**
- Backend Express server deployed on **Render**
- MongoDB Atlas free-tier cluster for database
- Cloudinary free-tier account for image hosting
- Set all environment variables in respective deployment dashboards (not committed to git)

---

## Instruction to AI Agent
Please scaffold this project step by step: first the backend (Express + MongoDB + Cloudinary integration + JWT auth), then the frontend (React + Tailwind + shadcn/ui components), wiring them together with API calls. Prioritize clean, modular code and add comments explaining each section. Follow the design direction closely — this is a warm, personal, celebratory gift website, so the UI polish and animation quality matters as much as functionality.
