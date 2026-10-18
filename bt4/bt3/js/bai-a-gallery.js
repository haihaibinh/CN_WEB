/* BÀI A — ĐIỀN VÀO CHỖ TRỐNG: Thư viện ảnh tương tác (index.html)
   Thay mỗi ___(n)___ bằng đáp án của bạn.
   - Chỗ trống nằm trong CODE: điền tên phương thức / thuộc tính / từ khoá / toán tử còn thiếu.
   - Chỗ trống nằm trong CHÚ THÍCH ("in ra: ..."): điền kết quả bạn DỰ ĐOÁN, chưa chạy vội.
   Hãy mở index.html trong trình soạn thảo để xem cấu trúc HTML thật trước khi điền.
   File chỉ chạy được khi mọi chỗ trống trong code đã được điền. */

// ---------- Phần 1: Tìm phần tử ----------
// Phần tử ĐẦU TIÊN khớp bộ chọn CSS:
const anhLon = document.___(1)___("#gallery > div > img");
// TẤT CẢ phần tử khớp bộ chọn CSS:
const dsAnhNho = document.___(2)___("#gallery ul li img");
const khungAnhNho = document.querySelector("#gallery ul");
// Tìm theo id:
const oTimKiem = document.___(3)___("o-tim-kiem");

console.log(dsAnhNho.length);                     // in ra: ___(4)___

// ---------- Phần 2: Đi lại trên cây DOM ----------
console.log(khungAnhNho.firstChild.nodeType);     // in ra: ___(5)___
console.log(khungAnhNho.childNodes.length);       // in ra: ___(6)___
// Đi từ <img> lên phần tử cha của nó:
console.log(dsAnhNho[0].___(7)___.nodeName);      // in ra: LI

// ---------- Phần 3: Tạo và chèn phần tử ----------
const chuThich = document.___(8)___("p");
chuThich.id = "chu-thich";
// (9) Gán nội dung dạng VĂN BẢN THUẦN (trình duyệt không được diễn giải thẻ HTML nếu có):
chuThich.___(9)___ = "Bấm vào ảnh nhỏ để đổi ảnh lớn.";
// (10) Chèn vào CUỐI thẻ <div> đang chứa ảnh lớn:
anhLon.parentNode.___(10)___(chuThich);

// ---------- Phần 4: MỘT trình lắng nghe cho cả 6 ảnh nhỏ ----------
function doiAnh(e) {
	// Người dùng có thể bấm trúng khoảng trống của <ul> hoặc mép <li>: khi đó không làm gì cả.
	if (e.target.nodeName ___(11)___ "IMG") {
		___(12)___;
	}

	// Thuộc tính alt của ảnh nhỏ lưu tên file ảnh lớn tương ứng.
	anhLon.src = `images/${e.target.alt}.jpg`;
	chuThich.textContent = `Đang xem: ${e.___(13)___.alt}.jpg`;

	// Bỏ lớp "dang-chon" ở mọi <li>, rồi gán cho <li> chứa ảnh vừa bấm.
	for (const anh ___(14)___ dsAnhNho) {
		anh.parentNode.className = "";
	}
	e.target.parentNode.___(15)___ = "dang-chon";
}

khungAnhNho.___(16)___("click", ___(17)___);

// Nếu viết  khungAnhNho.addEventListener("click", doiAnh());  thì:
//   (A) chạy giống hệt   (B) báo TypeError ngay khi tải trang   (C) chạy đúng nhưng chỉ một lần
//   → ___(18)___

// ---------- Phần 5: Thay inline JS của ô tìm kiếm ----------
// Mã nguồn gốc viết thẳng trong HTML:  onFocus="javascript:if(this.value==this.defaultValue){this.value='';}"
const GOI_Y = "Enter search query";
oTimKiem.addEventListener("___(19)___", () => {       // khi ô được chọn để gõ
	if (oTimKiem.value === GOI_Y) {
		oTimKiem.value = "";
	}
});
oTimKiem.addEventListener("blur", () => {              // khi rời khỏi ô
	if (oTimKiem.value === "") {
		oTimKiem.value = GOI_Y;
	}
});

// ---------- Phần 6: Gỡ trình lắng nghe ----------
const nutKhoa = document.getElementById("nut-khoa");
nutKhoa.addEventListener("click", (e) => {
	khungAnhNho.___(20)___("click", ___(21)___);
	chuThich.textContent = "Thư viện ảnh đã khoá.";
	console.log(e.type);                           // in ra: ___(22)___
	console.log(e.target.id);                      // in ra: ___(23)___
});
// Giả sử ở Phần 4 đăng ký bằng hàm mũi tên vô danh:   addEventListener("click", (e) => doiAnh(e))
// thì  removeEventListener("click", (e) => doiAnh(e))  có gỡ được không? (có / không)  → ___(24)___

// ---------- Phần 7: Thêm một mục vào cột bên phải ----------
const dsBaiViet = document.querySelector("#posts ul");
const mucMoi = document.createElement("li");
const tieuDe = document.createElement("h5");
tieuDe.textContent = "Khuyến mãi <b>thiệp cưới</b>";
mucMoi.append(tieuDe);
// (25) Chèn vào ĐẦU danh sách:
dsBaiViet.___(25)___(mucMoi);

// Trên trang, hai chữ "thiệp cưới" hiện IN ĐẬM hay hiện NGUYÊN cả cặp thẻ <b>…</b>?  → ___(26)___
console.log(dsBaiViet.querySelectorAll("li").length);     // in ra: ___(27)___
