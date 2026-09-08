# Quantum Classes

## Local development

1. Copy `.env.example` to `.env`.
2. Add the rotated Google service-account private key to `.env`. Keep the key server-side; never put it in `VITE_*` variables or client code.
3. In Google Drive, share the root folder `Quantum Classes Gallery` and every new subfolder with `quantum-gallery@liquid-idiom-499819-k0.iam.gserviceaccount.com` as **Viewer**. The root folder ID is `1j3R1sr9iODqdISm9jAC9R2Lkgpamtwm1`.
4. Start the frontend and local gallery API with `npm run dev`.

The site is available at `http://localhost:5173`. Vite proxies `/api/gallery` to the local Express server on port `8787`.

## Vercel deployment

Vercel deploys the Vite frontend and the server-side gallery functions automatically:

- `api/gallery/index.js` serves `GET /api/gallery`.
- `api/gallery/image/[fileId].js` serves `GET /api/gallery/image/:fileId`.
- `api/_gallery.mjs` contains the shared Google Drive authentication, 15-minute cache, folder discovery, image filtering, and image proxy logic.

In the Vercel project settings, add these exact Production environment variables:

- `GOOGLE_DRIVE_FOLDER_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

The private key must remain a Vercel server-side secret. Literal `\\n` characters are converted to newlines before the Google JWT is created. No Google credential is returned by either API endpoint or bundled into the frontend.

After deployment, verify `https://YOUR_DOMAIN/api/gallery`, then take an image `id` from the JSON and verify `https://YOUR_DOMAIN/api/gallery/image/FILE_ID`. Open `https://YOUR_DOMAIN/gallery` and confirm the categories and images render. Adding an image to a shared Drive subfolder is reflected after the 15-minute cache expires; no GitHub commit or Vercel redeploy is required.

## Drive gallery

The `/gallery` page reads every direct subfolder of the configured root folder as a category. Category names come from Drive folder names, so adding a folder such as `Annual Day 2027` requires no code change. JPG, JPEG, PNG, WebP, HEIC, and HEIF files are included; PDFs and other file types are ignored. HEIC/HEIF files use Google Drive's authenticated browser-compatible thumbnail instead of sending the original HEIC bytes to the browser.

The API caches the category and file listing for 15 minutes. New uploads appear after the cache expires or after the server is restarted. JPG, JPEG, PNG, and WebP files are buffered and returned with their binary bytes and correct `Content-Type`; HEIC/HEIF files are fetched from Drive's authenticated `thumbnailLink` and returned as a browser-compatible preview. Drive credentials and private file URLs are never exposed to the browser.

For production, build the frontend with `npm run build`, configure `GOOGLE_DRIVE_FOLDER_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_PRIVATE_KEY` in the hosting provider, then run `npm start`. Restrict the service account to Viewer access on this one Drive folder only.

## Credentials and rotation

- `.env` and other environment files are ignored by Git; `.env.example` contains placeholders only.
- The private key supplied during planning was exposed outside a secrets manager. Rotate/revoke it in Google Cloud IAM before production use, create a replacement key, and update `GOOGLE_PRIVATE_KEY` in the hosting provider.
- After rotation, verify `/api/gallery` and `/gallery`, then delete the old key from the service account.
- Do not commit a JSON key file, private key, image URL, or filename as a credential or source of truth.
