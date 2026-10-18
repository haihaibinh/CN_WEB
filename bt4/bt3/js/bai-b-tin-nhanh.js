/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// Các phần tử DOM cần dùng
const oTimKiem = document.getElementById("o-tim-kiem");
const list = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// F1 + F2 + F3: Hàm lọc tin và cập nhật bộ đếm, thông báo không tìm thấy
function locTin() {
	const tuKhoa = oTimKiem.value.toLowerCase();
	const cacMuc = Array.from(list.querySelectorAll("li"));
	let soKhop = 0;

	cacMuc.forEach((muc) => {
		const h3 = muc.querySelector("h3");
		const p = muc.querySelector("p");
		const tieuDe = h3 ? h3.textContent : "";
		const noiDung = p ? p.textContent : "";
		const vanBan = (tieuDe + " " + noiDung).toLowerCase();

		if (tuKhoa === "" || vanBan.includes(tuKhoa)) {
			muc.classList.remove("an");
			soKhop++;
		} else {
			muc.classList.add("an");
		}
	});

	if (soKhop === 0) {
		khongThay.classList.remove("an");
		khongThay.textContent = `Không tìm thấy tin nào cho "${oTimKiem.value}"`;
	} else {
		khongThay.classList.add("an");
	}

	boDem.textContent = `Đang hiển thị ${soKhop}/${cacMuc.length} tin`;
}

// Bắt sự kiện keyup trên #o-tim-kiem
oTimKiem.addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list
list.addEventListener("click", (e) => {
	if (!e.target.matches("button.more")) {
		return;
	}
	const nut = e.target;
	const li = nut.closest("li");
	if (!li) return;
	const p = li.querySelector("p");
	if (!p) return;

	if (p.classList.contains("day-du")) {
		p.classList.remove("day-du");
		nut.textContent = "Read more >>";
	} else {
		p.classList.add("day-du");
		nut.textContent = "Thu gọn <<";
	}
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value.trim();
	const noiDung = oNoiDung.value.trim();

	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	// Tạo <li> mới với cấu trúc chuẩn
	const liMoi = document.createElement("li");

	const spanTime = document.createElement("span");
	spanTime.className = "time";
	spanTime.textContent = homNay();

	const h3 = document.createElement("h3");
	h3.textContent = tieuDe;

	const p = document.createElement("p");
	p.textContent = noiDung;

	const btnMore = document.createElement("button");
	btnMore.type = "button";
	btnMore.className = "more";
	btnMore.textContent = "Read more >>";

	liMoi.append(spanTime, h3, p, btnMore);

	// Chèn vào đầu danh sách #list
	list.prepend(liMoi);

	// Xóa trắng form và thông báo lỗi
	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";

	// Cập nhật lại bộ lọc và bộ đếm
	locTin();
});

// Khởi tạo trạng thái ban đầu khi tải trang
locTin();
