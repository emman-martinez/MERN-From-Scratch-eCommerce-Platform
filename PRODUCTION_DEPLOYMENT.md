# ProShop production deployment

This guide is specific to this repository. The proposed production topology is:

```text
GitHub monorepo
    ├── frontend/  -> Vercel (React + Vite static site)
    └── backend/   -> Render (Node.js + Express web service)

MongoDB Atlas <- Render backend
PayPal        <- Render backend -> Vercel frontend
```

The frontend must call the Render API URL. The backend must connect to Atlas and
allow requests from the deployed frontend URL.

## Can this project be deployed today?

Yes, after the prerequisites below are available and the placeholder values in
this guide are replaced with real values. This file is an executable runbook;
it cannot create third-party accounts, approve payment credentials, or choose a
MongoDB password on your behalf.

### Required before pressing Deploy

- [ ] The repository is pushed to GitHub and you can access it.
- [ ] A Vercel account is connected to GitHub.
- [ ] A Render account is connected to GitHub.
- [ ] A MongoDB Atlas cluster and database user exist.
- [ ] The Atlas connection string is available.
- [ ] A strong production `JWT_SECRET` has been generated.
- [ ] A PayPal client ID is available. Use the live ID for real payments; use
      the sandbox ID only for a test deployment.
- [ ] A Cloudinary account and API credentials are available for image uploads.

### Exact deployment order

Follow the sections in this order:

1. Complete the required source fixes in **Production-readiness review**.
2. Create and configure MongoDB Atlas.
3. Create the Render backend, add its environment variables, and deploy it.
4. Confirm `https://YOUR-RENDER-SERVICE.onrender.com/api/health` returns
   `{"status":"ok"}`.
5. Configure Cloudinary credentials in Render.
6. Create the Vercel frontend, set `VITE_API_URL` to the Render URL, and deploy.
7. Set Render's `CLIENT_URL` to the final Vercel or custom frontend URL and
   redeploy the backend.
8. Complete the final production checklist and test login, admin, uploads,
   checkout, and orders from the public frontend.

If any required checkbox is incomplete, the application may deploy but is not
ready for real production traffic.

## 1. Production-readiness review

The repository is not ready for a first production deploy without addressing
the items below.

### Required before deployment

1. **Use the Render API URL in the Vite production build.**

   `frontend/src/const/index.ts` now reads `VITE_API_URL` in both development
   and production. This is required because a Vercel production build must
   send requests to Render instead of its own origin:

   ```ts
   export const BASE_URL = import.meta.env.VITE_API_URL ?? "";
   ```

   Keep the API route constants relative (`api/products`, `api/users`, etc.).
   In Vercel, set `VITE_API_URL` to the complete Render URL, such as
   `https://proshop-api.onrender.com`.

2. **Keep the frontend build clean.**

   The React 19-compatible native document metadata API is now used instead of
   `react-helmet-async`, and the `keyword` prop in `Paginate` is optional with a
   default value. A clean install should now include all declared dependencies.

   Verify with:

   ```powershell
   npm ci
   npm run build
   ```

3. **Configure Cloudinary for uploaded images.**

   The backend now uploads administrator product images directly to Cloudinary
   using a memory stream and stores the returned permanent `secure_url` in the
   product record. Render does not need a disk for uploads.

   In Cloudinary, open **Console → Settings → API Keys** and copy the cloud
   name, API key, and API secret. Add these variables to the Render backend:

   ```text
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

   Keep `CLOUDINARY_API_SECRET` only in Render/backend secrets. Never add it to
   Vercel or frontend code. The current upload endpoint accepts JPEG, JPG, and
   PNG files up to 5 MB, stores them in the `proshop/products` Cloudinary
   folder, and requires an authenticated administrator.

   Cloudinary's official Node.js SDK documentation is available at
   https://cloudinary.com/documentation/node_integration.

   Existing seed images under `/images/products/...` are frontend static assets
   and are separate from administrator-uploaded images.

4. **Make the authentication cookie compatible with the chosen domains.**

   The backend now uses `sameSite: 'none'` with `secure: true` in production,
   so the default Vercel and Render domains can exchange the JWT cookie. Custom
   subdomains under the same parent domain are still recommended, for example:

   ```text
   Frontend: https://app.example.com
   Backend:  https://api.example.com
   ```

   Verify login/logout in a real browser after deployment.

5. **Fix the frontend SPA fallback.**

   React Router uses browser routes such as `/product/:id` and `/admin/...`.
   Add `frontend/vercel.json` with this rewrite so refreshing a deep link loads
   the Vite application instead of returning a 404:

   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

### Verification performed

- The backend and frontend production builds pass when run with normal process
  permissions. Vite may report `EPERM` in restricted Windows shells.
- The frontend build blockers were fixed: metadata now uses React 19-native
  elements, pagination accepts an optional keyword, and the dependency lockfile
  is synchronized.
- The frontend workspace now includes a `typecheck` script.
- Lint and typecheck pass for both workspaces.
- Frontend tests pass with a single worker using:
  `npm run test --workspace frontend -- --run --pool=threads --maxWorkers=1`.

### Dependency security audit

The repository currently reports six high-severity npm advisories. Review them
from the repository root before production deployment:

```powershell
npm audit
npm audit fix --dry-run
```

If the proposed changes are acceptable, apply the non-breaking fixes:

```powershell
npm audit fix
```

Then rerun `npm ci`, `npm run build`, `npm run lint`, `npm run typecheck`, and
the frontend tests. Do not use `npm audit fix --force` without reviewing every
package upgrade because it can introduce breaking dependency changes.

## 2. Accounts and pages to create

Create or use these accounts:

1. **GitHub** — repository and deployment source.
2. **Vercel** — frontend project.
3. **Render** — backend web service.
4. **MongoDB Atlas** — production MongoDB cluster.
5. **PayPal Developer** — production/live client ID when payments are enabled.
6. **Domain/DNS provider** — optional, but recommended for reliable cookies.

MongoDB Atlas is the database service; do not run the local Docker MongoDB
container in production.

## 3. Prepare MongoDB Atlas

1. Open MongoDB Atlas and create a project named `proshop-production`.
2. Create a production cluster in a region close to the Render service.
3. Create a database user with a strong, unique password. Do not reuse the
   local `admin` credentials from Docker.
4. In **Database > Connect > Drivers**, copy the Node.js connection string.
5. Replace the username, password, and database name in the URI. A typical
   value is:

   ```text
   mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/proshop?retryWrites=true&w=majority&appName=proshop
   ```

6. In **Network Access**, allow the Render service to connect. Do not leave
   `0.0.0.0/0` enabled for production unless there is no safer provider option
   and the database user is tightly restricted.
7. Enable backups and monitoring appropriate for the production plan.

The backend uses both `MONGO_URI` and `MONGO_DB_NAME`; keep the database name
consistent with the URI.

## 4. Deploy the backend to Render

Create a **Web Service** from the GitHub repository.

Use these settings for this monorepo:

| Render field      | Value                                   |
| ----------------- | --------------------------------------- |
| Root Directory    | `backend`                               |
| Runtime           | Node                                    |
| Build Command     | `npm ci && npm run build`               |
| Start Command     | `npm start`                             |
| Health Check Path | `/api/health`                           |
| Branch            | your production branch, normally `main` |

The backend package already provides `build` and `start` scripts. Render should
provide the `PORT` environment variable; the application must listen on it.
If the service configuration does not provide one, set `PORT=10000`.

Add these Render environment variables under **Environment**:

```text
NODE_ENV=production
CLIENT_URL=https://app.example.com
MONGO_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/proshop?retryWrites=true&w=majority&appName=proshop
MONGO_DB_NAME=proshop
JWT_SECRET=<long-random-production-secret>
PAYPAL_CLIENT_ID=<PayPal-live-client-id>
CLOUDINARY_CLOUD_NAME=<Cloudinary cloud name>
CLOUDINARY_API_KEY=<Cloudinary API key>
CLOUDINARY_API_SECRET=<Cloudinary API secret>
```

Do not upload `.env` or place secrets in GitHub. Render environment variables
replace the local root `.env` values at runtime.

After the first deploy, open:

```text
https://YOUR-RENDER-SERVICE.onrender.com/api/health
```

The expected response is:

```json
{ "status": "ok" }
```

Do not run the destructive seed command against a production database. If
initial data is required, take a backup first and run the seed only against a
new, empty Atlas database after confirming the target URI.

## 5. Deploy the frontend to Vercel

Create a Vercel project from the same GitHub repository.

Use these settings:

| Vercel field      | Value                          |
| ----------------- | ------------------------------ |
| Root Directory    | `frontend`                     |
| Framework preset  | Vite (or auto-detected)        |
| Install Command   | `npm ci`                       |
| Build Command     | `npm run build`                |
| Output Directory  | `dist`                         |
| Production Branch | the same branch used by Render |

Add this Vercel environment variable for the **Production** environment:

```text
VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com
```

If a custom domain is configured, use the final API domain instead, for
example `https://api.example.com`. Redeploy after changing this variable;
Vite embeds it during the build.

After deployment, open the Vercel URL and verify that the browser's network
requests go to the Render hostname, not to the Vercel hostname.

## 6. Connect the two services

1. Copy the final Vercel URL, such as `https://app.example.com`.
2. Set that exact origin as Render's `CLIENT_URL`.
3. Set Vercel's `VITE_API_URL` to the final Render API URL.
4. Redeploy Render, then redeploy Vercel.
5. Confirm that CORS requests include credentials and that the JWT cookie is
   created after login.
6. Test these flows from the deployed frontend:
   - register, login, and logout
   - product list and product details
   - admin authentication
   - image upload and image display
   - create order and PayPal client configuration
   - order payment and delivery status

The backend already enables `credentials: true` in CORS and the frontend Axios
client uses `withCredentials: true`; the URL and cookie settings must match.

## 7. Optional custom domains

Recommended DNS layout:

```text
app.example.com -> Vercel
api.example.com -> Render
```

Add `app.example.com` to Vercel's **Domains** page and `api.example.com` to
Render's **Custom Domains** page. Follow the DNS records shown by each
provider. Then update `CLIENT_URL` and `VITE_API_URL` to these final HTTPS
URLs and redeploy both services.

## 8. Final production checklist

- [ ] `npm ci` and `npm run build` succeed from a clean checkout.
- [ ] Frontend production API base URL points to Render.
- [ ] Vercel SPA rewrite is present and direct route refreshes work.
- [ ] Render health check returns HTTP 200 at `/api/health`.
- [ ] Atlas database user, database name, backups, and network access are set.
- [ ] Production JWT secret and PayPal live client ID are configured only as
      service secrets.
- [ ] CORS `CLIENT_URL` exactly matches the frontend origin.
- [ ] Cookie behavior is verified with the selected domain arrangement.
- [ ] Cloudinary credentials are configured only on the backend/Render service.
- [ ] No production seed/destroy command is run without a backup and an
      explicitly confirmed target database.
- [ ] Login, admin pages, checkout, uploads, and order flows are tested from
      the public frontend URL.
