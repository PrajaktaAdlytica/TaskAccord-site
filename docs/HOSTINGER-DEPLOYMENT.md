# Hostinger static hosting

Repository: https://github.com/PrajaktaAdlytica/TaskAccord-site.git

Connect the **hostinger-deploy** branch to a Custom PHP/HTML website. This branch contains only the compiled public site: index.html, assets, favicons and .htaccess at its root. It requires no Node.js server, install/build commands or environment variables on Hostinger. Source, brand kit, tests and documentation remain on main.

In the website's Dashboard → Advanced → Git, connect this repository and choose hostinger-deploy. Deploy to public_html (leave the install path blank if the legacy form requests it). The initial destination must be empty; back up any existing content before replacing it. Do not deploy main into the public web directory.

Enable automatic deployment if available. In the legacy Git interface, configure the push webhook supplied by Hostinger. Otherwise use Deploy/Redeploy after the deployment branch changes.

The GitHub Actions workflow builds and tests every push to main, then publishes dist/client to hostinger-deploy. It can also run manually from Actions. Only successfully tested builds are published. GitHub Actions must be enabled and repository policy must permit the workflow's contents:write permission. Hostinger must separately pull the updated branch; the workflow itself does not access the hosting account.

The .htaccess file supplies client-side routing, disables directory listings and sets basic response headers. Existing files are served normally; missing assets and API paths do not receive the app shell. This configuration requires Apache-compatible hosting (including Hostinger LiteSpeed) with rewrites and overrides enabled. Vercel ignores this file and keeps using vercel.json.

After Hostinger deploys, verify HTTPS, the intro and replay, and direct visits/reloads of /product/authority, /sign-in, /preview-access and /demo/tasks/M-DEMO-1. Verify the mobile menu, fonts/images and local form status. Keep Vercel available until the hosted checks pass. Assign the domain to this Hostinger website and follow its DNS guidance while preserving email DNS records.

The intro continues to stream the user-supplied CloudFront video; it is not bundled. Forms/authentication remain frontend previews and all demo data remains synthetic. No backend service is introduced by changing hosts.
