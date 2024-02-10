class Pendaftar {
    constructor(nama, umur, uangSangu) {
        this.nama = nama;
        this.umur = umur;
        this.uangSangu = uangSangu;
    }
}

let pendaftarList = [];

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function submitForm(event) {
    event.preventDefault();
    const nama = document.getElementById('nama').value;
    const umur = parseInt(document.getElementById('umur').value);
    const uangSangu = parseInt(document.getElementById('uangSangu').value);

    if (nama.length < 10 || umur < 25 || uangSangu < 100000 || uangSangu > 1000000) {
        alert("Mohon isi form dengan benar!");
        return;
    }

    const newPendaftar = new Pendaftar(nama, umur, uangSangu);
    pendaftarList.push(newPendaftar);

    updateTable();
    calculateAverage();
}

function updateTable() {
    const tbody = document.getElementById('pendaftarBody');
    tbody.innerHTML = '';
    pendaftarList.forEach(pendaftar => {
        const row = `<tr><td>${pendaftar.nama}</td><td>${pendaftar.umur}</td><td>${pendaftar.uangSangu}</td></tr>`;
        tbody.innerHTML += row;
    });
}

function calculateAverage() {
    const totalUangSangu = pendaftarList.reduce((acc, pendaftar) => acc + pendaftar.uangSangu, 0);
    const totalUmur = pendaftarList.reduce((acc, pendaftar) => acc + pendaftar.umur, 0);
    const averageUangSangu = totalUangSangu / pendaftarList.length;
    const averageUmur = totalUmur / pendaftarList.length;
    const resume = document.getElementById('resume');
    resume.textContent = `Rata-rata pendaftar memiliki uang sangu sebesar Rp${averageUangSangu.toFixed(2)} dengan rata-rata umur ${averageUmur.toFixed(2)}`;
}

// Initial call to calculate average when the page loads
calculateAverage();