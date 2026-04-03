function switchTab(id, btn) {

  document.querySelectorAll('.content').forEach(c => {
    c.classList.add('hidden');
  });

  document.getElementById(id).classList.remove('hidden');

  document.querySelectorAll('.tab').forEach(t => {
    t.classList.remove('active');
  });

  btn.classList.add('active');
}
function logout() {
  window.location.href = 'login.html';
}

const newBtn = document.getElementById("btnNew");      
const modal = document.getElementById("guestModal");    
const cancelBtn = document.getElementById("cancelBtn");
const form = document.getElementById("guestForm");   
const tableBody = document.getElementById("guestsBody");

const fullName = document.getElementById("fullName");
const contact = document.getElementById("contact");
const room = document.getElementById("room");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

let editingRow = null;

// Open the modal to add a new guest
newBtn.onclick = function openNewForm() {
  editingRow = null;       
  form.reset();         
  modal.style.display = "flex"; 
  document.getElementById('modalTitle').textContent = 'Guest Check-In';
}
cancelBtn.onclick = function() {
    modal.style.display = "none";
  }

function openEditForm(row) {
  document.getElementById('modalTitle').textContent = 'Edit Guest';
  editingRow = row; 
  fullName.value = row.cells[0].innerText;
  contact.value = row.cells[1].innerText;
  room.value = row.cells[2].innerText;
  checkin.value = row.cells[3].innerText; 
  checkout.value = row.cells[4].innerText;  
  modal.style.display = "flex"; 
}


form.onsubmit = function saveGuest(event) {
  event.preventDefault(); 

  if (editingRow != null) {
    editingRow.cells[0].innerText = fullName.value;
    editingRow.cells[1].innerText = contact.value;
    editingRow.cells[2].innerText = room.value;
    editingRow.cells[3].innerText = checkin.value;
    editingRow.cells[4].innerText = checkout.value;
  } else {
    const row = tableBody.insertRow();
    row.insertCell(0).innerText = fullName.value;
    row.insertCell(1).innerText = contact.value;
    row.insertCell(2).innerText = room.value;
    row.insertCell(3).innerText = checkin.value;
    row.insertCell(4).innerText = checkout.value;
    row.insertCell(5).innerHTML =
      '<span class="badge ready">READY FOR-CHECKOUT</span>';
    row.insertCell(6).innerHTML =
      '<button class="btn-sm edit" onclick="openEditForm(this.parentElement.parentElement)">Edit</button> <span class="fake-btn">Checkout</span>';
  }

  modal.style.display = "none";
}


// Hussien------------------------------------------------------------------------

const btnAddRoom = document.getElementById("btnAddRoom");
const roomModal = document.getElementById("roomModal");
const cancelRoomBtn = document.getElementById("cancelRoomBtn");
const roomForm = document.getElementById("roomForm");
const roomBody = document.getElementById("roomBody");

let editingRoomRow = null;

function openEditRoom(row) {
  editingRoomRow = row;
  document.getElementById('roomModalTitle').textContent = 'Edit Room';
  document.getElementById('r_label').value = row.cells[0].innerText;
  document.getElementById('r_location').value = row.cells[1].innerText;
  document.getElementById('r_type').value = row.cells[2].innerText;
  document.getElementById('r_status').value = row.cells[3].innerText;
  document.getElementById('r_capacity').value = row.cells[4].innerText;
  document.getElementById('r_beds').value = row.cells[5].innerText;
  document.getElementById('r_area').value = row.cells[6].innerText;
  
  document.getElementById('submitRoomBtn').innerText=`Edit Room`;
  roomModal.style.display = "flex";
  roomModal.classList.remove('hidden');
}

  roomBody.querySelectorAll('button.edit').forEach(btn => {
    btn.onclick = function () { openEditRoom(this.closest('tr')); }; 
  });

  btnAddRoom.onclick = function () {
    editingRoomRow = null;
    roomForm.reset();
    document.getElementById('roomModalTitle').textContent = 'Add New Room';
    document.getElementById('submitRoomBtn').innerText=`Add Room`;
    roomModal.style.display = "flex";
    roomModal.classList.remove('hidden');
  };

  cancelRoomBtn.onclick = function () {
    roomModal.style.display = "none";
    roomModal.classList.add('hidden');
    editingRoomRow = null;
  };

  roomForm.onsubmit = function (e) {
    e.preventDefault();
    const loc = document.getElementById('r_location').value;
    const type = document.getElementById('r_type').value;
    const label = document.getElementById('r_label').value;
    const status = document.getElementById('r_status').value;
    const capacity = document.getElementById('r_capacity').value;
    const beds = document.getElementById('r_beds').value;
    const area = document.getElementById('r_area').value;
   
    if (editingRoomRow) {
      // update row
      editingRoomRow.cells[0].innerText = label;
      editingRoomRow.cells[1].innerHTML = `<svg style="margin-right: 6px;" xmlns="http://www.w3.org/2000/svg" width="10.5" height="10.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-3 h-3" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>${loc}`;
      editingRoomRow.cells[2].innerText = type;
      if(status === 'Available')
        editingRoomRow.cells[3].innerHTML = '<div class="btn-sm black-background extra-small-padding">Available</div>';
      else if (status === 'Occupied')
        editingRoomRow.cells[3].innerHTML = '<div class="btn-sm red-background extra-small-padding">Occupied</div>';
      else
        editingRoomRow.cells[3].innerHTML = '<div class="btn-sm grey-background extra-small-padding">Maintenance</div>';

      editingRoomRow.cells[4].innerText = capacity;
      editingRoomRow.cells[5].innerText = beds;
      editingRoomRow.cells[6].innerText = area;
      const amenCell = editingRoomRow.cells[7];
      amenCell.innerHTML = '';
      amenities.forEach(a => {
        const d = document.createElement('div');
        d.className = "overview-card small-card-padding";
        d.innerHTML = `<span class="small-card-title">${a}</span>`;
        amenCell.appendChild(d);
      });
      editingRoomRow = null;
    } else {
      // insert new row
      const row = roomBody.insertRow();
      row.insertCell(0).innerText = label;
      row.insertCell(1).innerHTML = `<svg style="margin-right: 6px;" xmlns="http://www.w3.org/2000/svg" width="10.5" height="10.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-3 h-3" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>${loc}`;
      row.insertCell(2).innerText = type;
      if(status === 'Available')
        row.insertCell(3).innerHTML = '<div class="btn-sm black-background extra-small-padding">Available</div>';
      else if (status === 'Occupied')
        row.insertCell(3).innerHTML = '<div class="btn-sm red-background extra-small-padding">Occupied</div>';
      else
        row.insertCell(3).innerHTML = '<div class="btn-sm grey-background extra-small-padding">Maintenance</div>';

      row.insertCell(4).innerText = capacity;
      row.insertCell(5).innerText = beds;
      row.insertCell(6).innerText = area;

      const amenCell = row.insertCell(7);
      amenCell.className = "flex-row-container flex-justify-start wrap gap-0";
      amenities.forEach(a => {
        const d = document.createElement('div');
        d.className = "overview-card small-card-padding";
        d.innerHTML = `<span class="small-card-title">${a}</span>`;
        amenCell.appendChild(d);
      });

      const actionsCell = row.insertCell(8);
      actionsCell.innerHTML = '<button class="btn-sm gray-hover small-side-padding edit"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen w-3 h-3" aria-hidden="true"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg></button>';
      const newEditBtn = actionsCell.querySelector('button.edit');
     newEditBtn.onclick = function () { openEditRoom(this.closest('tr')); };
    }

    roomModal.style.display = "none";
    roomModal.classList.add('hidden');
    roomForm.reset();
  };



const pricingmodal = document.getElementById("pricingmodal");
const priceaddnewbtn = document.getElementById("priceaddnewbtn");
const cancelpricingBtn = document.getElementById("cancelpricingBtn");
const pricingmodaltitle = document.getElementById("pricingmodaltitle");
const priceform = document.getElementById("pricingform");
const pricebody = document.getElementById("pricebody");
let editpricerow = null;

  cancelpricingBtn.onclick = function () {
    pricingmodal.classList.add('hidden');
    pricingmodal.style.display = 'none';
    editpricerow = null;
  };

  priceaddnewbtn.onclick = function () {
    editpricerow = null;
    priceform.reset();
    pricingmodaltitle.textContent = 'Add New Pricing Rule';
    pricingmodal.classList.remove('hidden'); pricingmodal.style.display = 'flex';
  };

function attachPriceRowHandlers(actionsCell) {
  const editBtn = actionsCell.querySelector('.price-edit-btn, .price-edit');
  editBtn.onclick = function () { openEditPrice(this.closest('tr')); };
  const cancelBtn = actionsCell.querySelector('.cancel-price-btn');
  cancelBtn.onclick = function () { pricebody.removeChild(this.closest('tr')); };
}

  pricebody.querySelectorAll('.price-edit-btn, .price-edit').forEach(btn => btn.onclick = function () { openEditPrice(this.closest('tr')); });
  pricebody.querySelectorAll('.cancel-price-btn').forEach(btn => btn.onclick = function () { pricebody.removeChild(this.closest('tr')); });

function openEditPrice(row) {
  editpricerow = row;
 pricingmodaltitle.textContent = 'Edit Pricing Rule';

  const periodText =  row.cells[0].innerText.trim();
  //chatgpt
  const parts = periodText.split(/\s+/); // split by whitespace
  const year =  parts[parts.length - 1];
  const month = parts[0];

  document.getElementById('p_month').value = month;
  document.getElementById('p_year').value = year;
  document.getElementById('p_season').value = row.cells[1].innerText.trim();
  document.getElementById('p_roomtype').value = row.cells[2].innerText.trim();
  document.getElementById('p_package').value = row.cells[3].innerText.trim();

    const occCellText = row.cells[4].innerText.trim();
    const occValue = occCellText === '1' ? 'Single' : occCellText === '2' ? 'Double' : occCellText;
    document.getElementById('p_occupancy').value = occValue;

  document.getElementById('p_citizen_price').value = row.cells[5].innerText.replace(/[^0-9.-]/g, ''); // remove $ sign
  document.getElementById('p_non_citizen_price').value = row.cells[6].innerText.replace(/[^0-9.-]/g, '');

  document.getElementById('submitpricingBtn').innerText = 'Edit Pricing Rule';
  pricingmodal.classList.remove('hidden'); 
  pricingmodal.style.display = 'flex';
}

  priceform.onsubmit = function (e) {
    e.preventDefault(); 
    const month = document.getElementById('p_month').value;
    const year = document.getElementById('p_year').value;
    const season = document.getElementById('p_season').value;
    const roomtype = document.getElementById('p_roomtype').value;
    const packagee = document.getElementById('p_package').value;
    const occupancy = document.getElementById('p_occupancy').value;
    const citizen_price = document.getElementById('p_citizen_price').value;
    const non_citizen_price = document.getElementById('p_non_citizen_price').value;

    const periodHTML = `<svg style="margin-right: 6px;" xmlns="http://www.w3.org/2000/svg" width="10.5" height="10.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-3 h-3" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>${month} ${year}`;
    const seasonHTML = `<div class="btn-sm ${season.toLowerCase() === 'peak' ? 'red-background' : 'grey-background'} no-padding"><small>${season}</small></div>`;
    const actionsHTML = `
      <button class="price-edit-btn price-edit btn-sm gray-hover small-side-padding edit"><svg xmlns="http://www.w3.org/2000/svg"
        width="14" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen w-3 h-3"
        aria-hidden="true"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg></button>
      <button class="btn-sm gray-hover small-side-padding edit cancel-price-btn"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x w-3 h-3" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>
    `;

    if (editpricerow) {
      editpricerow.cells[0].innerHTML = periodHTML;
      editpricerow.cells[1].innerHTML = seasonHTML;
      editpricerow.cells[2].innerText = roomtype;
      editpricerow.cells[3].innerText = packagee;
      editpricerow.cells[4].innerText = (occupancy.toLowerCase() === 'single' ? '1' : '2');
      editpricerow.cells[5].innerText = `$${citizen_price}`;
      editpricerow.cells[6].innerText = `$${non_citizen_price}`;
      editpricerow.cells[7].innerHTML = actionsHTML;
      attachPriceRowHandlers(editpricerow.cells[7]);
      editpricerow = null;
    } else {
      const row = pricebody.insertRow();
      row.insertCell(0).innerHTML = periodHTML;
      row.insertCell(1).innerHTML = seasonHTML;
      row.insertCell(2).innerText = roomtype;
      row.insertCell(3).innerText = packagee;
      row.insertCell(4).innerText = (occupancy.toLowerCase() === 'single' ? '1' : '2');
      row.insertCell(5).innerText = `$${citizen_price}`;
      row.insertCell(6).innerText = `$${non_citizen_price}`;
      const actionsCell = row.insertCell(7);
      actionsCell.innerHTML = actionsHTML;
      attachPriceRowHandlers(actionsCell);
    }

    pricingmodal.classList.add('hidden'); pricingmodal.style.display = 'none';
    priceform.reset();
    editpricerow = null;
  };

