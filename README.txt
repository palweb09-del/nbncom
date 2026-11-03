NABBAN BHAI ZARI WALA - WEBSITE SETUP & ADMIN GUIDE

WHAT IS EDITABLE?
- Products tab: add/edit product name, category, description, sale type, price, MRP, stock, sizes, image filenames/URLs, Amazon product URL, featured and active status.
- Settings tab: shop name, homepage tagline, announcement, shipping fee, free-shipping threshold, delivery estimate, return window, cancellation window, WhatsApp number, UPI ID, email, phone and address.
- Home page featured products are controlled by Products > featured = yes. Set active = no to hide a product.
- For products sold on this website, set sale_type = website. Enter price, MRP, stock and sizes.
- For Nabban Bhai's own products sold through its Amazon listings, set sale_type = amazon and paste the exact Amazon product URL in amazon_link. The product page will show a View on Amazon button. These are brand-owned listings, not affiliate recommendations.

GOOGLE SHEETS + APPS SCRIPT SETUP
1. Create/open the Google Sheet that will manage the website.
2. Open Extensions > Apps Script. Replace the editor code with this ZIP's Code.gs and Save.
3. Run setup() once and approve the requested Google permissions. It creates/updates Products, Orders, Contact and Settings tabs. It preserves existing rows and adds any missing columns.
4. Fill the Products tab with your real products. Do not leave demo/sample product rows active. Use unique IDs such as NB001, NB002, etc.
5. For product images, upload image files to the website's images/ folder and enter only the filename in image1/image2/image3 (example: red-suit-front.webp), OR enter a complete https image URL.
6. In Settings, update whatsapp_number with country code and digits only (India example: 91XXXXXXXXXX), your UPI ID, email, phone, address and delivery/policy timings.
7. In Apps Script click Deploy > New deployment > Select type: Web app. Set Execute as: Me and Who has access: Anyone. Deploy and copy the Web app URL ending in /exec.
8. Open assets/app.js and replace PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE with the copied URL. Save and upload the updated website files to GitHub Pages.
9. If you change Code.gs later, use Deploy > Manage deployments > Edit > New version > Deploy. Keep the same deployment URL where possible.

IMPORTANT ADMIN NOTES
- Sheet changes are fetched fresh when a visitor loads/reloads the page. Use a hard refresh (Ctrl + F5) after publishing code changes. If you update Apps Script code, deploy a new version.
- Do not rename the sheet tabs or the column headers. Add product rows below the header row.
- Product sale_type must be website or amazon. Amazon product links should point to the specific Nabban Bhai product listing, not the Amazon home page.
- To show a product on the home page set featured=yes. To hide any product without deleting its row set active=no.
- For sizes, separate values with commas, e.g. Free size or S,M,L,XL. For unstitched suit material, describe included fabric lengths and work details in description/fabric/work_details.
- Manual payment only: UPI payment is verified by the store team. COD is subject to confirmation. No payment gateway or automatic card payment is installed.
- If the Apps Script URL has not been added yet, checkout/contact will offer a WhatsApp request fallback when a WhatsApp number is configured. It will not save the order to the Google Sheet until the Web App is connected.

POLICIES
The website currently displays an estimated delivery time of 5–8 working days, eligible return request window of 7 days, and cancellation before dispatch. Update the matching Settings values and review the policy page against your actual business operations before launch. Amazon purchases are governed by the order-specific Amazon policies shown at checkout on Amazon.
