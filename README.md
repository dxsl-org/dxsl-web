# DXSL Organization Website

Trang web tĩnh chính thức của **DXSL** — Tổ chức phi lợi nhuận nghiên cứu công nghệ, chuyển đổi số và phát triển phần mềm nguồn mở tự do.

---

## 📁 Cấu trúc thư mục

```text
dxsl-web/
├── _headers                    # Cấu hình bảo mật và bộ nhớ đệm (Cache) cho Cloudflare Pages
├── _redirects                  # Cấu hình chuyển hướng trang (/vi, /en, /kofi, /donate)
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

## ☁️ Hướng dẫn tải lên Cloudflare Pages (Cực nhanh & Đơn giản)

Cloudflare Pages hỗ trợ đưa trang web lên chỉ trong 1 phút bằng một trong hai cách dưới đây:

### Cách 1: Tải trực tiếp bằng Kéo & Thả (Direct Upload - Nhanh nhất)
1. Đăng nhập [Cloudflare Dashboard](https://dash.cloudflare.com/) ➜ Chọn **Workers & Pages** ở cột trái.
2. Nhấn **Create application** ➜ Chọn tab **Pages** ➜ Nhấn **Upload assets**.
3. Đặt tên dự án (ví dụ: `dxsl-web`) ➜ Nhấn **Create project**.
4. Kéo thả toàn bộ thư mục `dxsl-web` (hoặc nén thành file `.zip` rồi kéo vào) ➜ Nhấn **Deploy site**.
5. Trang web của anh sẽ hoạt động ngay lập tức tại địa chỉ dạng: `https://dxsl-web.pages.dev`!

### Cách 2: Kết nối tự động qua GitHub (Không cần Action/Token)
1. Trong Cloudflare Pages ➜ Chọn tab **Pages** ➜ Nhấn **Connect to Git**.
2. Chọn kho lưu trữ **`dxsl-org/dxsl-web`**.
3. Cấu hình triển khai:
   - **Framework preset**: `None`
   - **Build command**: *Để trống*
   - **Build output directory**: *Để trống* (hoặc gõ `.`)
4. Nhấn **Save and Deploy**. Cloudflare sẽ tự động cập nhật web mỗi khi anh push code mới lên GitHub mà không cần cấu hình bất kỳ API token nào.

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
