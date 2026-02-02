Empire Club Bar Website
Website chính thức của Empire Club Bar - Nơi đẳng cấp hội tụ.
📋 Giới Thiệu
Empire Club Bar là một website hiện đại, sang trọng giới thiệu về club bar cao cấp. Website bao gồm:

🏠 Trang chủ với hero video đẹp mắt
ℹ️ Trang giới thiệu về club
🎉 Trang sự kiện với danh sách events
🍸 Menu đồ uống đa dạng
🖼️ Thư viện hình ảnh
📅 Hệ thống đặt bàn online
📞 Trang liên hệ

🚀 Công Nghệ Sử Dụng

HTML5
CSS3 (với CSS Variables)
Vanilla JavaScript (ES6+)
Swiper.js (slider/carousel)
Font Awesome Icons
JSON data storage

📁 Cấu Trúc Thư Mục
club-bar-website/
│
├── index.html              # Trang chủ
│
├── assets/
│   ├── css/
│   │   ├── style.css       # CSS chính
│   │   ├── header.css      # Header & menu
│   │   ├── hero.css        # Hero section
│   │   └── responsive.css  # Mobile/tablet responsive
│   │
│   ├── js/
│   │   ├── main.js         # JavaScript chính
│   │   ├── slider.js       # Gallery/slider
│   │   └── booking.js      # Đặt bàn
│   │
│   ├── images/             # Hình ảnh
│   ├── videos/             # Video nền
│   └── fonts/              # Custom fonts
│
├── pages/                  # Các trang phụ
├── components/             # Components tái sử dụng
├── data/                   # Dữ liệu JSON
└── vendor/                 # Thư viện bên thứ 3
⚙️ Cài Đặt & Chạy
1. Clone hoặc tải project
bashgit clone [repository-url]
cd club-bar-website
2. Cài đặt dependencies
Website này sử dụng CDN cho các thư viện nên không cần cài đặt npm packages. Tuy nhiên, bạn có thể cài đặt Swiper locally:
bash# Download Swiper
# Đặt files vào vendor/swiper/
3. Chạy website
Có nhiều cách để chạy website:
Cách 1: Live Server (VS Code)

Cài extension "Live Server"
Right click vào index.html → "Open with Live Server"

Cách 2: Python HTTP Server
bashpython -m http.server 8000
# Mở http://localhost:8000
Cách 3: Node.js HTTP Server
bashnpx http-server
🎨 Tùy Chỉnh
Màu Sắc
Thay đổi màu sắc trong file assets/css/style.css:
css:root {
    --primary-color: #d4af37;     /* Màu vàng chính */
    --secondary-color: #1a1a2e;   /* Màu nền tối */
    --accent-color: #16213e;      /* Màu nhấn */
}
Logo
Thay thế logo trong thư mục assets/images/logo/
Nội Dung

Sự kiện: Chỉnh sửa file data/events.json
Menu: Chỉnh sửa file data/menu.json

📱 Responsive Design
Website được tối ưu cho:

✅ Desktop (1920px+)
✅ Laptop (1366px - 1920px)
✅ Tablet (768px - 1024px)
✅ Mobile (320px - 768px)

🔧 Tính Năng
Header

Sticky header với hiệu ứng scroll
Mobile menu hamburger
Active link highlighting

Hero Section

Video background tự động phát
Overlay gradient
CTA buttons
Scroll indicator

Events

Load từ JSON
Event cards với hover effects
Filter/sort (có thể thêm)

Gallery

Swiper slider responsive
Lightbox cho ảnh
Autoplay với pause on hover

Booking Form

Validation đầy đủ
Date/time picker
Success/error messages
Local storage lưu đặt bàn

🌐 Browser Support

✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
⚠️ IE11 (limited support)

📝 To-Do List

 Thêm backend API
 Payment gateway integration
 Email confirmation
 Admin panel
 Multi-language support
 Dark/Light theme toggle
 Analytics integration
 SEO optimization

🤝 Đóng Góp
Mọi đóng góp đều được chào đón! Vui lòng:

Fork project
Tạo branch mới (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add some AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Tạo Pull Request

📄 License
Copyright © 2024 Empire Club Bar. All rights reserved.
📞 Liên Hệ

Website: empireclub.vn
Email: info@empireclub.vn
Phone: 0123 456 789
Address: 123 Đường ABC, Quận 1, TP.HCM


Made with ❤️ by Empire Team
