# DXSL Organization Website

Trang web tĩnh chính thức của **DXSL** — Tổ chức phi lợi nhuận nghiên cứu công nghệ, chuyển đổi số và phát triển phần mềm nguồn mở tự do.

---

## 📁 Cấu trúc thư mục

```text
dxsl-web/
├── .github/
│   └── workflows/
│       └── deploy-cloudflare.yml # GitHub Actions tự động build & deploy lên Cloudflare Pages
├── _headers                    # Cấu hình bảo mật và bộ nhớ đệm (Cache) cho Cloudflare Pages
├── _redirects                  # Cấu hình chuyển hướng trang (/vi, /en, /kofi)
├── index.html                  # Trang chủ Gateway: Logo DXSL, hiệu ứng Canvas công nghệ & chọn ngôn ngữ
├── assets/
│   ├── css/
│   │   └── style.css           # Toàn bộ Design System (Cyberpunk/Dark Obsidian, responsive, animations)
│   ├── js/
│   │   ├── tech-canvas.js      # Hiệu ứng mạng lưới hạt và luồng dữ liệu tương tác 60fps
│   │   └── main.js             # Xử lý menu di động, cuộn mượt, lưu tùy chọn ngôn ngữ
│   └── images/
│       └── logo-placeholder.svg # Logo mẫu DXSL dạng vector (có thể thay thế dễ dàng)
├── vi/
│   ├── index.html              # Trang chủ tiếng Việt đầy đủ (Cellos, Buttre, Haily, Nghiên cứu, FOSS)
│   └── donate.html             # Trang kêu gọi tài trợ & tuyên ngôn minh bạch tiếng Việt
└── en/
    ├── index.html              # English Homepage (Full content)
    └── donate.html             # English Support & Financial Transparency Page
```

---

## ☁️ Cấu hình GitHub Actions tự động tải lên Cloudflare Pages

Quy trình tự động đã được thiết lập sẵn trong file `.github/workflows/deploy-cloudflare.yml`. Khi anh `git push` lên nhánh `main`, hệ thống sẽ tự động xác thực và tải website lên Cloudflare Pages.

### Các bước thiết lập trên GitHub và Cloudflare:

#### Bước 1: Tạo dự án trên Cloudflare Pages
1. Đăng nhập vào trang quản trị [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Chọn **Workers & Pages** ở menu bên trái ➜ Nhấn **Create application** ➜ Chọn tab **Pages** ➜ Nhấn **Upload assets**.
3. Đặt tên dự án (Project name), ví dụ: `dxsl-web` ➜ Nhấn **Create project**.

#### Bước 2: Lấy Cloudflare Account ID & API Token
1. **Lấy Account ID:**
   - Trong giao diện Cloudflare, nhìn thanh địa chỉ URL hoặc xem ở thanh bên phải của trang tổng quan (Overview), bạn sẽ thấy chuỗi ký tự **Account ID** (dạng hex dài 32 ký tự).
2. **Tạo API Token:**
   - Vào [User API Tokens](https://dash.cloudflare.com/profile/api-tokens).
   - Nhấn **Create Token** ➜ Tìm dòng **Cloudflare Pages** ➜ Nhấn **Use template**.
   - Mục **Account Resources**: Chọn đúng tài khoản của anh.
   - Nhấn **Continue to summary** ➜ **Create Token**.
   - Sao chép mã token vừa tạo (chuỗi này chỉ hiển thị một lần).

#### Bước 3: Thêm Secrets vào GitHub Repository
1. Vào kho mã nguồn trên GitHub của anh ➜ Mở tab **Settings**.
2. Ở thanh bên trái, chọn **Secrets and variables** ➜ chọn **Actions**.
3. Tại mục **Repository secrets**, nhấn **New repository secret** và thêm 2 secret sau:
   - Tên: `CLOUDFLARE_API_TOKEN` | Giá trị: Dán mã API Token đã tạo ở Bước 2.
   - Tên: `CLOUDFLARE_ACCOUNT_ID` | Giá trị: Dán Account ID đã lấy ở Bước 2.
4. *(Tùy chọn)* Nếu anh đặt tên dự án Cloudflare khác `dxsl-web`, thêm biến vào mục **Variables** (hoặc Secret):
   - Tên: `CLOUDFLARE_PROJECT_NAME` | Giá trị: Tên dự án Cloudflare Pages của anh.

#### Bước 4: Đẩy mã nguồn lên GitHub
```bash
git init
git add .
git commit -m "feat: init DXSL website with cloudflare pages CI/CD"
git branch -M main
git remote add origin https://github.com/<tai-khoan>/<repo-dxsl>.git
git push -u origin main
```
Sau khi push, vào tab **Actions** trên GitHub để theo dõi quá trình tự động tải web lên Cloudflare Pages.

---

## 🎨 Hướng dẫn thay Logo chính thức

Khi có file ảnh logo chính thức (ví dụ `logo.png` hoặc `logo.svg`):
1. Chép file ảnh logo vào thư mục `assets/images/` (ví dụ `assets/images/dxsl-logo.png`).
2. Mở các file sau và thay đổi đường dẫn ở thẻ `<img ... id="dxsl-logo">`:
   - `index.html`: `src="assets/images/logo-placeholder.svg"` ➜ `src="assets/images/dxsl-logo.png"`
   - `vi/index.html` & `vi/donate.html`: `src="../assets/images/logo-placeholder.svg"` ➜ `src="../assets/images/dxsl-logo.png"`
   - `en/index.html` & `en/donate.html`: `src="../assets/images/logo-placeholder.svg"` ➜ `src="../assets/images/dxsl-logo.png"`

---

## 🚀 Chạy thử nghiệm trên máy tính cục bộ

- Mở trực tiếp file `index.html` bằng trình duyệt web.
- Hoặc dùng Python / Node.js HTTP server:
  ```bash
  # Python
  python -m http.server 3000

  # Node.js
  npx serve .
  ```
