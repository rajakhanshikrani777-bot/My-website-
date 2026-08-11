function sendMessage() {
    let name = document.getElementById("name").value;

    if (name === "") {
        document.getElementById("contactResult").innerText =
            "براہ کرم اپنا نام لکھیں۔";
        return;
    }

    document.getElementById("contactResult").innerText =
        "شکریہ " + name + "! آپ کا پیغام موصول ہوگیا۔";
}