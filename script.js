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
    { line1: "Happy Valentine's Day ❤️", line2: "Chúc Mỹ Ý một ngày Valentine thiệt là Hạnh Phúc", image: "line11.gif" },
    { line1: "Gửi bạn của tôi 👑", line2: "Sẽ đạt được những gì mình mong muốn nhé", image: "line2.gif" },
    { line1: "Niềm vui nhiều hơn🌹", line2: "Chúc Ý mau giàu cho mình mượn tiền mua ÔTô nhé", image: "line3.gif" },
    { line1: "Nhắc nhở", line2: "Tự nhiên thèm mỳ cay", image: "line4.gif" },
    { line1: "Chúc Bạn", line2: "Đạt được số KG mong muốn", image: "line55.gif" },
    { line1: "Chúc Bạn", line2: "Gặp được tổng tài của đời mình kaka", image: "line6.gif" },
    { line1: "Hết rồi", line2: "Chỉ biết chúc dị thôi kaka ", image: "line7.gif" }, 
    { 
        line1: "Giờ thì", 
        line2: "pipi nhé Ngủ Ngoan nha Mảy", 
        image: "bubu-bubu-dudu.gif" // Đã sửa Image -> image
    },
];

let currentWishIndex = 0;

// Hàm cập nhật hiển thị nút
function updateButtonDisplay() {
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
    
    updateButtonDisplay();

    if (song) {
        song.play().catch(error => {
            console.log("Trình duyệt chặn tự động phát.");
        });
    }
});

// 2. Logic khi bấm nút Xem tiếp (Dùng Duy Nhất 1 Cách Này)
nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentWishIndex++;

    letter.style.opacity = 0;
    
    setTimeout(() => {
        // Kiểm tra đúng tên thuộc tính 'image' viết thường
        let imageHtml = "";
        if (wishes[currentWishIndex].image) {
            imageHtml = `<img src="${wishes[currentWishIndex].image}" alt="Valentine" style="width:150px; border-radius:10px; margin: 10px auto; display:block;">`;
        }

        letter.innerHTML = `
            <p>${wishes[currentWishIndex].line1}</p>
            <p>${wishes[currentWishIndex].line2}</p>
            ${imageHtml}
        `;
        
        letter.style.opacity = 1;
        updateButtonDisplay(); // Đã sửa tên hàm cho khớp ở trên
    }, 300);
});

// 3. Logic nút Close
closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("open");
    closeBtn.style.display = "none";
    nextBtn.style.display = "none";
    openBtn.style.display = "inline-block";

    currentWishIndex = 0;
    setTimeout(() => {
        letter.innerHTML = `
            <p>${wishes[0].line1}</p>
            <p>${wishes[0].line2}</p>
        `;
        letter.style.opacity = 1;
    }, 500);
});

// 4. Hàm bật/tắt nhạc
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
