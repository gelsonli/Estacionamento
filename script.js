document.addEventListener("DOMContentLoaded", () => {
    const parkingForm = document.getElementById("parkingForm");
    const parkingSpots = document.getElementById("parkingSpots");
    const printReceiptButton = document.getElementById("printReceipt");
    const searchButton = document.getElementById("searchButton");
    const searchPlateInput = document.getElementById("searchPlate");

    // Array para armazenar veículos registrados
    const vehicles = [];

    // Vagas disponíveis para cada tipo de veículo
    const spots = {
        moto: 25,
        carro: 20,
        van: 15,
        "carrinho-de-lanche": 15
    };

    // Função para adicionar veículo
    function addVehicle(plate, type, details) {
        // Verifica se há vagas disponíveis para o tipo de veículo
        if (spots[type] > 0) {
            // Gera um número de vaga aleatório e único
            const spotNumber = getSpotNumber(type);

            const vehicle = {
                plate,
                type,
                details,
                checkIn: new Date(),
                spotNumber
            };

            vehicles.push(vehicle);
            spots[type]--; // Decrementa o número de vagas disponíveis
            displayVehicles();
        } else {
            alert("Não há vagas disponíveis para este tipo de veículo.");
        }
    }

    // Função para obter um número de vaga aleatório e único
    function getSpotNumber(type) {
        const typeOffsets = {
            moto: 0,
            carro: 25,
            van: 45,
            "carrinho-de-lanche": 45
        };

        const offset = typeOffsets[type];
        const maxSpots = offset + spots[type];

        let spotNumber;
        do {
            spotNumber = Math.floor(Math.random() * maxSpots) + 1;
        } while (vehicles.some(v => v.spotNumber === spotNumber));

        return spotNumber;
    }

    // Função para exibir veículos na tela
    function displayVehicles() {
        parkingSpots.innerHTML = vehicles.map(vehicle => {
            return `<div>
                        <strong>Placa:</strong> ${vehicle.plate}<br>
                        <strong>Tipo:</strong> ${vehicle.type}<br>
                        <strong>Entrada:</strong> ${vehicle.checkIn.toLocaleString()}<br>
                        <strong>Vaga:</strong> ${vehicle.spotNumber}<br>
                        <strong>Detalhes:</strong> ${vehicle.details || "Nenhum"}<br>
                    </div>`;
        }).join('');

        // Mostrar botão de impressão se houver veículos
        printReceiptButton.style.display = vehicles.length > 0 ? 'block' : 'none';
    }

    // Evento de submissão do formulário
    parkingForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const plate = parkingForm.plate.value;
        const type = parkingForm.type.value;
        const details = parkingForm.details.value;
        addVehicle(plate, type, details);
        parkingForm.reset();
    });

    // Evento para imprimir cupom
    printReceiptButton.addEventListener("click", () => {
        if (vehicles.length > 0) {
            const vehicle = vehicles[vehicles.length - 1]; // Último veículo registrado
            printReceipt(vehicle);
        } else {
            alert("Nenhum veículo registrado.");
        }
    });

    // Função para calcular o tempo estacionado
    function calculateTimeParked
