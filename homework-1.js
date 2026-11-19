const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ticketPrice(category) {
    switch (Number(category)) {
        case 1:
            return 300;
        case 2:
            return 500;
        case 3:
            return 900;
        default:
            return 0;
    }
}

function maxTickets(budget, price) {
    let i = 0;

    while (price > 0 && budget >= price) {
        i++;
        budget -= price;
    }

    return i;
}

function printTicketResult(category, budget) {
    if (!['1', '2', '3'].includes(category)) {
        console.log("неизвестная категория");
        return;
    }

    const price = ticketPrice(category);

    console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${maxTickets(budget, price)} шт.`);
}

function deliveryPrice(distance, total) {
    if (total >= 3000 || distance <= 3) {
        return 0;
    }
    else if (distance <= 10) {
        return 200;
    }
    else {
        return 200 + (distance - 10) * 25;
    }
}

function printDelivery(distance, total) {
    const price = deliveryPrice(distance, total);

    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

function printSteps(height) {
    let count = 0;

    for (let i = 1; i <= height; i++) {
        if (i === 4) {
            continue;
        }

        console.log(`Ступень ${i}`);
        count++;

        if (i === 10) {
            console.log("Дальше лестница не построена");
            break;
        }
    }

    console.log(`Всего построено: ${count}`);
}

function main() {
    console.log("Выберите задачу:");
    console.log("1 — билетная касса");
    console.log("2 — доставка заказа");
    console.log("3 — лестница");

    rl.question("Ваш выбор: ", (choice) => {
        switch (choice) {
            case '1':
                rl.question("Категория билета: ", (category) => {
                    rl.question("Бюджет: ", (budget) => {
                        printTicketResult(category, Number(budget));
                        rl.close();
                    });
                });
                break;

            case '2':
                rl.question("Расстояние: ", (distance) => {
                    rl.question("Сумма заказа: ", (total) => {
                        printDelivery(Number(distance), Number(total));
                        rl.close();
                    });
                });
                break;

            case '3':
                rl.question("Высота лестницы: ", (height) => {
                    printSteps(Number(height));
                    rl.close();
                });
                break;

            default:
                console.log("такой задачи нет");
                rl.close();
        }
    });
}

main();
