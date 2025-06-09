# Breakeout‑Phaser 🎮

:contentReference[oaicite:1]{index=1}

## 🚀 Demo
:contentReference[oaicite:2]{index=2}  
:contentReference[oaicite:3]{index=3}

## ⚙️ Thiết lập & Chạy

1. Clone repo:
   ```bash
   git clone https://github.com/nguyenanhhung403/Breakeout-Phaser.git
   cd Breakeout-Phaser
Cài đặt dependencies:

bash
Sao chép
Chỉnh sửa
npm install
Chạy dev server:

bash
Sao chép
Chỉnh sửa
npm start
Mở trình duyệt đến: http://localhost:8080/

🎮 Cách chơi
Di chuyển paddle dùng phím ← và →, hoặc A (trái) / D (phải) 
michaelbragg-20879.medium.com
+6
github.com
+6
github.com
+6
phaser.io
+1
github.com
+1
github.com
+3
phaser.io
+3
github.com
+3
.

Mục tiêu là đập bóng để phá hết các viên gạch mà vẫn giữ bóng trong cuộc chơi.

🧩 Cấu trúc dự án
src/ – chứa mã nguồn JavaScript chính (game logic, scene setup).

public/ – chứa các tài nguyên tĩnh: hình ảnh, âm thanh, HTML.

Cấu hình build được xử lý bằng webpack.

🌟 Tính năng
Di chuyển paddle và phản hồi vật lý của bóng.

Hệ thống brick/destroy logic.

Tăng điểm và quản lý số mạng (lives).

Mở rộng dễ dàng để thêm cấp độ, power‑ups, âm thanh,...

🛠️ Phát triển & tùy chỉnh
Tạo cấp độ mới: chỉnh logic brick spawning trong src/…scene.

Thêm âm thanh/hiệu ứng: thêm file vào public/ và load trong preload().

Power‑ups: xử lý logic trong scene update khi brick bị phá.

📚 Tài nguyên tham khảo
Dự án “breakout‑phaser” của Simon Prickett cung cấp gốc setup tương tự 
github.com
github.com
.

Tutorials từ Phaser và MDN giúp bạn hiểu sâu hơn về game logic 
ourcade.co
+6
phaser.io
+6
michaelbragg-20879.medium.com
+6
.

📄 Giấy phép
Bản quyền © bạn – sử dụng theo giấy phép MIT (nếu bạn thêm LICENSE).

✅ Ý tưởng nâng cao
Power‑ups: như bóng lớn, mạngBonus, paddle dài/rộng, chậm bóng.

Cấp độ đa dạng: thiết lập cấu hình brick pattern và độ khó.

Leaderboards: lưu điểm cao bằng localStorage hoặc backend.

Responsive design: chơi tốt trên thiết bị di động.

Âm thanh: thêm SFX khi bóng chạm paddle/gạch.

