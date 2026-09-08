# Quantum Classes

## Local development

1. Copy `.env.example` to `.env`.
2. Add the rotated Google service-account private key to `.env`. Keep the key server-side; never put it in `VITE_*` variables or client code.
3. In Google Drive, share the root folder `Quantum Classes Gallery` and every new subfolder with `quantum-gallery@liquid-idiom-499819-k0.iam.gserviceaccount.com` as **Viewer**. The root folder ID is `1j3R1sr9iODqdISm9jAC9R2Lkgpamtwm1`.
4. Start the frontend and gallery API with `npm run dev`.

The site is available at `http://localhost:5173`. Vite proxies `/api/gallery` to the server on port `8787`.

## Drive gallery

The `/gallery` page reads every direct subfolder of the configured root folder as a category. Category names come from Drive folder names, so adding a folder such as `Annual Day 2027` requires no code change. JPG, JPEG, PNG, and WebP files are included; PDFs and other file types are ignored.

The API caches the category and file listing for 15 minutes. New uploads appear after the cache expires or after the server is restarted. Images are streamed through the server using the service account, so Drive credentials and private file URLs are never exposed to the browser.

For production, build the frontend with `npm run build`, configure `GOOGLE_DRIVE_FOLDER_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_PRIVATE_KEY` in the hosting provider, then run `npm start`. Restrict the service account to Viewer access on this one Drive folder only.

## Credentials and rotation

- `.env` and other environment files are ignored by Git; `.env.example` contains placeholders only.
- The private key supplied during planning was exposed outside a secrets manager. Rotate/revoke it in Google Cloud IAM before production use, create a replacement key, and update `GOOGLE_PRIVATE_KEY` in the hosting provider.
- After rotation, verify `/api/gallery` and `/gallery`, then delete the old key from the service account.
- Do not commit a JSON key file, private key, image URL, or filename as a credential or source of truth.
