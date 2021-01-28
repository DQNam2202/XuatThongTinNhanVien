const chucVu = document.getElementById("chucVu");
const btnTinhLuong = document.getElementById("btnTinhLuong");
const content = document.getElementById("content");
// Check ngay từ đầu giá trị
document.getElementById("heSoLuong").value = chucVu.value;

chucVu.addEventListener("change", (e) => {
  const value = e.target.value;
  // Để thay đổi và gán gái trị mới cho input truy cập vào thuộc tính value
  document.getElementById("heSoLuong").value = value;
});
btnTinhLuong.onclick = (e) => {
  //Để không bị load lại trang
  e.preventDefault();

  let sum = 0;
  let arrInput = document.querySelectorAll(
    ".form-input input, .form-input select"
  );
  let nhanVien = {};
  for (let i = 0; i < arrInput.length; i++) {
    //duyệt lấy ra 1 tag Input
    let tagInput = arrInput[i];
    //Lấy ra id và value của tagInput
    let id = tagInput.id;
    let value = tagInput.value;

    if (id === "luongCB") {
      sum = formatCurrency(chucVu.value * value, ".") + "VND";
      nhanVien = { ...nhanVien, tong: sum };
    } else {
      nhanVien = { ...nhanVien, [id]: value };
    }
  }
  //ADD content
  let contentTrBody = "<h2>Thông tin nhân viên</h2>";
  for (let thuocTinh in nhanVien) {
    if(thuocTinh === 'tong'){
      contentTrBody += `<p>Tổng tiền: ${nhanVien[thuocTinh]}</p>`;
    }else{
      var title = document.getElementById(thuocTinh).title
      if (thuocTinh != "heSoLuong" && thuocTinh != "luongCB") {
        contentTrBody += `<p>${title}: ${nhanVien[thuocTinh]}</p>`;
      }
    }
    
  }
  // Chuyển đổi text sang HTML
  content.innerHTML = contentTrBody;
};

function formatCurrency(n, separate = ".") {
  var s = n.toString();
  var regex = /\B(?=(\d{3})+(?!\d))/g;
  var ret = s.replace(regex, separate);
  return ret;
}
