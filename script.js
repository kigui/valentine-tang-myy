onload = () => {
    document.body.classList.remove("container");
};

const wrapper = document.querySelector(".wrapper");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById('nextBtn');
const letter = document.querySelector('.letter');
const song = document.getElementById("myAudio");

const wishes = [
    { line1: "Happy Valentine's Day ❤️", line2: "Chúc Mỹ Ý một ngày Valentine thiệt là Hạnh Phúc" },
    { line1: "Gửi bạn của tôi 👑", line2: "Sẽ đạt được những gì mình mong muốn nhé" },
    { line1: "Niềm vui nhiều hơn🌹", line2: "Chúc Ý mau giàu cho mình mượn tiền mua ÔTô nhé" },
    { line1: "Nhắc nhở", line2: "Tự nhiên thèm mỳ cay" },
    { line1: "Chúc Bạn", line2: "Đạt được số KG mong muốn" },
    { line1: "Chúc Bạn", line2: "Gặp được tổng tài của đời mình kaka" },
    { line1: "Hết rồi", line2: "Chỉ biết chúc dị thôi kaka " }, 
    { line1: "Giờ thì", line2: "pipi nhé Ngủ Ngoan nha Mảy" }, // Câu cuối cùng
];

let currentWishIndex = 0;

// Hàm cập nhật hiển thị nút
function updateButtonDisplay() {
    // Nếu đang ở câu cuối cùng (index bằng độ dài mảng - 1)
    if (currentWishIndex >= wishes.length - 1) {
        nextBtn.style.display = "none";
    } else {
        nextBtn.style.display = "inline-block";
    }
}

// 1. Logic khi bấm nút Open
openBtn.addEventListener("click", () => {
    wrapper.classList.add("open");
    openBtn.style.display = "none";
    closeBtn.style.display = "inline-block";
    
    // Kiểm tra xem có cần hiện nút "Xem tiếp" không (đề phòng trường hợp chỉ có 1 câu)
    updateButtonDisplay();

    // Phát nhạc
    if (song) {
        song.play().catch(error => {
            console.log("Trình duyệt chặn tự động phát, cần tương tác người dùng.");
        });
    }
});

// 2. Logic khi bấm nút Xem tiếp
nextBtn.addEventListener('click', () => {
    currentWishIndex++;

    // Hiệu ứng mờ dần khi đổi chữ
    letter.style.opacity = 0;
    
    setTimeout(() => {
        letter.innerHTML = `
            <p>${wishes[currentWishIndex].line1}</p>
            <p>${wishes[currentWishIndex].line2}</p>
        `;
        letter.style.opacity = 1;
        
        // Sau khi đổi chữ, kiểm tra xem đã đến câu cuối chưa để ẩn nút
        updateButtonDisplay();
    }, 300);
});

// 3. Logic nút Close
closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("open");
    closeBtn.style.display = "none";
    nextBtn.style.display = "none";
    openBtn.style.display = "inline-block";

    // Reset về lời chúc đầu tiên khi đóng để lần sau mở lại sẽ bắt đầu từ đầu
    currentWishIndex = 0;
    setTimeout(() => {
        letter.innerHTML = `
            <p>${wishes[0].line1}</p>
            <p>${wishes[0].line2}</p>
        `;
    }, 500);
});

// 4. Hàm bật/tắt nhạc khi nhấn vào icon nốt nhạc
function toggleMusic() {
    const icon = document.getElementById("music-icon");
    if (song.paused) {
        song.play();
        icon.innerText = "🎵";
    } else {
        song.pause();
        icon.innerText = "🔇";
    }
}

