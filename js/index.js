const submitButton = document.querySelector('.submit');
const everyMonth = document.querySelector('.month');
const daily = document.querySelector('.day');
const yearly = document.querySelector('.year');
const alert = document.querySelector('.alert');

function calculateAge() {
    const day = parseInt(daily.value);
    const month = parseInt(everyMonth.value);
    const year = parseInt(yearly.value);

    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day); // Note: Month is zero-indexed

    if (birthDate > currentDate) {
        alert.style.display = 'block';
        alert.textContent = 'Must be a valid date.'
        setTimeout(function () {
            alert.style.display = 'none';
        }, 5000);
        return; // Stop further processing
    }
    const ageInMilliseconds = currentDate - birthDate;

    let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageInMonths = currentDate.getMonth() + 1 - birthDate.getMonth();
    let ageInDays = currentDate.getDate() - birthDate.getDate();


    if (ageInDays < 0) {
        ageInMonths -= 1;
        const lastMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        ageInDays += lastMonthDays;
    }if (ageInMonths < 0) {
        ageInYears -= 1;
        ageInMonths += 12;
    }
    document.getElementById("years").textContent = ageInYears;
    document.getElementById("months").textContent = ageInMonths.toString();
    document.getElementById("days").textContent = ageInDays.toString();
}

submitButton.addEventListener('click', function (e) {
    e.preventDefault();

    alert.style.display = 'none'; // Hide any previous alert

    if (everyMonth.value === '' || daily.value === '' || yearly.value === '') {
        alert.style.display = 'block';
        alert.textContent = 'All fields are required.';
        setTimeout(function () {
            alert.style.display = 'none';
        }, 5000);
    } else if (isNaN(Number(everyMonth.value)) || isNaN(Number(daily.value)) || isNaN(Number(yearly.value))) {
        alert.style.display = 'block';
        alert.textContent = 'All fields must be numbers.';
        setTimeout(function () {
            alert.style.display = 'none';
        }, 5000);
    } else {
    
        calculateAge();
        
        setInterval(calculateAge, 1000);
    }
});
