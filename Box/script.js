document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('toggle-button');
    var redBox = document.querySelector('.red-box');
    var range = document.getElementById('weight-range');
    var value = document.querySelector('.weight-class-picker__value');
    var toggleUnitsButton = document.getElementById('toggle-units');
    var checkWeightClassButton = document.getElementById('check-weight-class');
    var currentUnit = 'kg';

    toggleButton.addEventListener('click', function () {
        // Display the red box
        redBox.style.display = 'block';

        // Reset the content inside the red box
        redBox.innerHTML = '';

        // Get the weight and weight class
        var weight = parseInt(range.value);
        var weightClassIconPath = getWeightClass(weight, currentUnit);

        // Create an <img> element and set its attributes
        var imgElement = document.createElement('img');
        imgElement.src = weightClassIconPath;
        imgElement.alt = 'Weight Class Icon';
        imgElement.style.maxWidth = '100%'; // Adjust the maximum width as needed

        // Append the <img> element to the red box
        redBox.appendChild(imgElement);
    });

    // Adjust slider value on scroll
    window.addEventListener('wheel', function (event) {
        event.preventDefault(); // Prevent the default scroll behavior

        var scrolledValue = parseInt(range.value);
        if (event.deltaY < 0 && scrolledValue < 120) {
            scrolledValue += 1;
        } else if (event.deltaY > 0 && scrolledValue > 50) {
            scrolledValue -= 1;
        }

        range.value = scrolledValue;
        value.innerHTML = scrolledValue + ' ' + currentUnit;
    });

    // Update displayed value on slider input change
    range.addEventListener('input', function () {
        value.innerHTML = this.value + ' ' + currentUnit;
    });

    // Toggle between kg and lb
    toggleUnitsButton.addEventListener('click', function () {
        if (currentUnit === 'kg') {
            currentUnit = 'lb';
            range.setAttribute('max', '264'); // Adjust max value for pounds
            range.value = Math.round(range.value * 2.20462); // Convert current value to pounds
        } else {
            currentUnit = 'kg';
            range.setAttribute('max', '120'); // Reset max value for kilograms
            range.value = Math.round(range.value / 2.20462); // Convert current value to kilograms
        }
        value.innerHTML = range.value + ' ' + currentUnit;
    });

    checkWeightClassButton.addEventListener('click', function () {
        // Display the weight class based on your logic
        var weight = parseInt(range.value);
        var weightClass = getWeightClass(weight, currentUnit);

        // Reset the content inside the red box
        redBox.innerHTML = '';

        // Create a <div> element for the weight class text
        var textElement = document.createElement('div');
        textElement.textContent = 'Your weight class is: ' + weightClass;
        textElement.style.fontSize = '18px'; // Adjust the font size as needed

        // Append the text element to the red box
        redBox.appendChild(textElement);
    });

    function getWeightClass(weight, unit) {
        // Your logic to determine the weight class based on the weight and unit
        // For now, let's assume a simple logic
        if (weight < 60) {
            return 'weight-class-icons/Flyweight.png';
        } else if (weight < 70) {
            return 'weight-class-icons/Bantamweight.png';
        } else if (weight < 80) {
            return 'weight-class-icons/Featherweight.png';
        } else if (weight < 90) {
            return 'weight-class-icons/Lightweight.png';
        } else if (weight < 100) {
            return 'weight-class-icons/Middleweight.png';
        } else {
            return 'weight-class-icons/Heavyweight.png';
        }
    }
});
