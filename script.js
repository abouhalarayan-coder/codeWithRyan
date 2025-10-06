document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  if(!bookingForm) return; // Only run on booking page

  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("time");
  const bookingMessage = document.getElementById("bookingMessage");

  const availableTimes = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];

  dateInput.addEventListener("change", () => {
    timeSelect.innerHTML = '<option value="">Select a time</option>';
    availableTimes.forEach(time => {
      const opt = document.createElement("option");
      opt.value = time;
      opt.textContent = formatTime(time);
      timeSelect.appendChild(opt);
    });
  });

  bookingForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name=document.getElementById("name").value.trim();
    const email=document.getElementById("email").value.trim();
    const phone=document.getElementById("phone").value.trim();
    const date=dateInput.value;
    const time=timeSelect.value;
    const message=document.getElementById("message").value.trim();

    if(!name||!email||!phone||!date||!time){
      showMessage("⚠️ Please fill in all required fields.","red");
      return;
    }

    showMessage(`✅ Thank you ${name}! Your lesson is booked for ${date} at ${formatTime(time)}.`, "green");
    bookingForm.reset();
    timeSelect.innerHTML = '<option value="">Select a time</option>';
  });

  function formatTime(time){
    let [h,m]=time.split(":");
    h=parseInt(h);
    const suffix=h>=12?"PM":"AM";
    h=((h+11)%12)+1;
    return `${h}:${m} ${suffix}`;
  }

  function showMessage(msg,color){
    bookingMessage.textContent=msg;
    bookingMessage.style.color=color;
  }
});
