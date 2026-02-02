// ===========================
// Booking/Reservation System
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    initBookingForm();
    initDateTimePickers();
    loadTableOptions();
});

// ===========================
// Initialize Booking Form
// ===========================
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (!bookingForm) return;
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateBookingForm()) {
            submitBooking();
        }
    });
}

// ===========================
// Validate Booking Form
// ===========================
function validateBookingForm() {
    const form = document.getElementById('bookingForm');
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Get form values
    const name = form.querySelector('#name')?.value.trim();
    const phone = form.querySelector('#phone')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const date = form.querySelector('#date')?.value;
    const time = form.querySelector('#time')?.value;
    const guests = form.querySelector('#guests')?.value;
    const tableType = form.querySelector('#tableType')?.value;
    
    // Validate name
    if (!name || name.length < 2) {
        showError('name', 'Vui lòng nhập tên hợp lệ');
        isValid = false;
    }
    
    // Validate phone
    if (!phone || !validatePhone(phone)) {
        showError('phone', 'Vui lòng nhập số điện thoại hợp lệ (10 số)');
        isValid = false;
    }
    
    // Validate email
    if (!email || !validateEmail(email)) {
        showError('email', 'Vui lòng nhập email hợp lệ');
        isValid = false;
    }
    
    // Validate date
    if (!date) {
        showError('date', 'Vui lòng chọn ngày');
        isValid = false;
    } else {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError('date', 'Không thể đặt bàn cho ngày trong quá khứ');
            isValid = false;
        }
    }
    
    // Validate time
    if (!time) {
        showError('time', 'Vui lòng chọn giờ');
        isValid = false;
    } else {
        if (!isValidBookingTime(time)) {
            showError('time', 'Giờ đặt bàn phải từ 20:00 đến 02:00');
            isValid = false;
        }
    }
    
    // Validate guests
    if (!guests || guests < 1 || guests > 20) {
        showError('guests', 'Số lượng khách từ 1 đến 20 người');
        isValid = false;
    }
    
    // Validate table type
    if (!tableType) {
        showError('tableType', 'Vui lòng chọn loại bàn');
        isValid = false;
    }
    
    return isValid;
}

// ===========================
// Show Error Message
// ===========================
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.classList.add('error');
    field.parentNode.appendChild(errorDiv);
}

// ===========================
// Clear All Errors
// ===========================
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

// ===========================
// Validate Booking Time
// ===========================
function isValidBookingTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    
    // Valid times: 20:00 - 23:59 or 00:00 - 02:00
    return (hours >= 20 && hours <= 23) || (hours >= 0 && hours <= 2);
}

// ===========================
// Submit Booking
// ===========================
async function submitBooking() {
    const form = document.getElementById('bookingForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Get form data
    const formData = {
        name: form.querySelector('#name').value.trim(),
        phone: form.querySelector('#phone').value.trim(),
        email: form.querySelector('#email').value.trim(),
        date: form.querySelector('#date').value,
        time: form.querySelector('#time').value,
        guests: parseInt(form.querySelector('#guests').value),
        tableType: form.querySelector('#tableType').value,
        specialRequests: form.querySelector('#specialRequests')?.value.trim() || '',
        timestamp: new Date().toISOString()
    };
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang xử lý...';
    
    try {
        // Simulate API call (replace with actual API endpoint)
        await simulateBookingAPI(formData);
        
        // Show success message
        showSuccessMessage();
        
        // Save to local storage
        saveBookingToStorage(formData);
        
        // Reset form
        form.reset();
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'confirmation.html?booking=' + formData.timestamp;
        }, 2000);
        
    } catch (error) {
        console.error('Booking error:', error);
        showErrorMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Đặt Bàn';
    }
}

// ===========================
// Simulate API Call
// ===========================
function simulateBookingAPI(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (90% success rate)
            if (Math.random() > 0.1) {
                resolve({ success: true, bookingId: Date.now() });
            } else {
                reject(new Error('Booking failed'));
            }
        }, 1500);
    });
}

// ===========================
// Show Success Message
// ===========================
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'booking-message success';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Đặt Bàn Thành Công!</h3>
        <p>Chúng tôi đã gửi xác nhận đến email của bạn.</p>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// ===========================
// Show Error Message
// ===========================
function showErrorMessage(text) {
    const message = document.createElement('div');
    message.className = 'booking-message error';
    message.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <h3>Đặt Bàn Thất Bại</h3>
        <p>${text}</p>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// ===========================
// Save Booking to Local Storage
// ===========================
function saveBookingToStorage(data) {
    try {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(data);
        localStorage.setItem('bookings', JSON.stringify(bookings));
    } catch (e) {
        console.error('Error saving booking:', e);
    }
}

// ===========================
// Initialize Date/Time Pickers
// ===========================
function initDateTimePickers() {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Set maximum date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }
    
    if (timeInput) {
        // Disable times outside operating hours
        timeInput.addEventListener('change', function() {
            if (!isValidBookingTime(this.value)) {
                alert('Giờ mở cửa: 20:00 - 02:00');
                this.value = '';
            }
        });
    }
}

// ===========================
// Load Table Options
// ===========================
function loadTableOptions() {
    const tableTypeSelect = document.getElementById('tableType');
    
    if (!tableTypeSelect) return;
    
    const tableTypes = [
        { value: 'standard', label: 'Bàn Thường (2-4 người)', price: 'Free' },
        { value: 'vip', label: 'Bàn VIP (4-6 người)', price: '500.000đ' },
        { value: 'sofa', label: 'Bàn Sofa (6-8 người)', price: '1.000.000đ' },
        { value: 'private', label: 'Phòng Riêng (8-12 người)', price: '2.000.000đ' }
    ];
    
    tableTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.value;
        option.textContent = `${type.label} - ${type.price}`;
        tableTypeSelect.appendChild(option);
    });
}

// ===========================
// Update Guests Based on Table Type
// ===========================
function updateGuestsRecommendation() {
    const tableType = document.getElementById('tableType')?.value;
    const guestsInput = document.getElementById('guests');
    
    if (!tableType || !guestsInput) return;
    
    const recommendations = {
        'standard': { min: 2, max: 4 },
        'vip': { min: 4, max: 6 },
        'sofa': { min: 6, max: 8 },
        'private': { min: 8, max: 12 }
    };
    
    const rec = recommendations[tableType];
    if (rec) {
        guestsInput.setAttribute('min', rec.min);
        guestsInput.setAttribute('max', rec.max);
        guestsInput.setAttribute('placeholder', `${rec.min}-${rec.max} người`);
    }
}

// Listen for table type changes
document.addEventListener('DOMContentLoaded', function() {
    const tableTypeSelect = document.getElementById('tableType');
    if (tableTypeSelect) {
        tableTypeSelect.addEventListener('change', updateGuestsRecommendation);
    }
});

// ===========================
// Message Styles (injected)
// ===========================
const messageStyles = `
    .booking-message {
        position: fixed;
        top: 100px;
        right: -400px;
        background: white;
        color: #1a1a2e;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        max-width: 350px;
        z-index: 10000;
        transition: right 0.3s ease;
    }
    
    .booking-message.show {
        right: 20px;
    }
    
    .booking-message.success {
        border-left: 4px solid #4caf50;
    }
    
    .booking-message.error {
        border-left: 4px solid #f44336;
    }
    
    .booking-message i {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .booking-message.success i {
        color: #4caf50;
    }
    
    .booking-message.error i {
        color: #f44336;
    }
    
    .booking-message h3 {
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
    }
    
    .booking-message p {
        margin: 0;
        color: #666;
    }
    
    .error-message {
        color: #f44336;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .error {
        border-color: #f44336 !important;
    }
`;

const styleEl = document.createElement('style');
styleEl.textContent = messageStyles;
document.head.appendChild(styleEl);
