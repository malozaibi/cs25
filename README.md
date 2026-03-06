## Aden Developers

A simple, static site showcasing web development projects by students of the Faculty of Computer & IT, University of Aden.

### Site

- URL: https://aden-developers.org

### Features

- Project grid rendered from `projects.json`
- Light/Dark theme toggle (persists per browser)
- Responsive layout (Bootstrap 5 RTL)
- Image gallery modal with carousel for screenshots

### Project Structure

- `index.html`: Main page markup
- `assets/css/styles.css`: Custom styles
- `assets/js/main.js`: Rendering logic, theme handling, modal/gallery
- `projects.json`: Projects data (title, links, images)
- `subdomians/`: Project screenshots grouped by project

### Usage (Local Development)

No build required; it is a static site.

1. Open `index.html` directly in a browser, or
2. Serve the folder with any static server (recommended for correct paths):

```bash
cd /Users/fahmigaleb/Developer/personal/real/www/aden-developers
python3 -m http.server 8080
# then visit http://localhost:8080
```

### Updating Projects

- Add/edit entries in `projects.json`
- Place screenshots under `subdomians/<project>/` in `desktop/`, `mobile/`, and (if any) `admin/`
- Ensure image filenames referenced in `projects.json` match the actual files

### Tech

- Bootstrap 5.3 (RTL build via CDN)
- Vanilla JavaScript

### Contributors

- Maintainers listed in the footer of `index.html`
  - Instructor: Mohammed Al-Ozaibi — LinkedIn in the site footer
  - Developer: Abdullah Al-Zahrani — LinkedIn in the site footer

### Contact

- Email: contact [at] aden-developers [dot] org

### License

- All rights reserved unless otherwise noted in individual files.
