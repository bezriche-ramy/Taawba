# Ramadan Web Site

## Deployment Instructions

### Local Development
```bash
npm install
npm run dev
```

### Deployment Options

#### Option 1: Netlify
1. Push your code to a GitHub repository
2. Log in to Netlify and click "New site from Git"
3. Select your repository and configure as follows:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy site

#### Option 2: Render
1. Push your code to a GitHub repository
2. Log in to Render and connect your repository
3. The `render.yaml` file will configure your deployment

#### Option 3: GitHub Pages
1. Push your code to a GitHub repository
2. Run `npm install gh-pages --save-dev` (already included in package.json)
3. Set `homepage` in package.json to your GitHub Pages URL
4. Run `npm run deploy`

#### Option 4: Vercel
1. Push your code to a GitHub repository
2. Import your project in Vercel dashboard
3. Configure build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy
