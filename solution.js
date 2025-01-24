const fs = require('fs');

// Load data from JSON file
function loadData(filePath) {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
}

const data = loadData('students_practice_dataset.json');

// Assignment 1: Basic Data Retrieval
function displayUserNamesAndEmails(data) {
    const users = data.users || [];
    users.slice(0, 10).forEach(user => {
        console.log(`Name: ${user.name}, Email: ${user.email}`);
    });
}

function listHighRatedProducts(data) {
    const products = data.products || [];
    const highRated = products.filter(product => product.rating > 4.0);
    highRated.forEach(product => {
        console.log(`Product: ${product.name}, Rating: ${product.rating}`);
    });
}

// Assignment 2: Data Filtering and Searching
function findProductsByCategory(data, category) {
    const products = data.products || [];
    return products.filter(product => product.category === category);
}

function filterEventsByDate(data, dateStr) {
    const events = data.events || [];
    const specificDate = new Date(dateStr);
    return events.filter(event => new Date(event.date) > specificDate);
}

// Assignment 3: Data Aggregation
function calculateAverageAge(data) {
    const users = data.users || [];
    const ages = users.map(user => user.age).filter(age => age !== undefined);
    const totalAge = ages.reduce((sum, age) => sum + age, 0);
    return ages.length ? totalAge / ages.length : 0;
}

function averagePriceByCategory(data) {
    const products = data.products || [];
    const categoryPrices = {};

    products.forEach(product => {
        const { category, price } = product;
        if (!categoryPrices[category]) {
            categoryPrices[category] = [];
        }
        categoryPrices[category].push(price);
    });

    const averages = {};
    for (const category in categoryPrices) {
        const prices = categoryPrices[category];
        averages[category] = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    }

    return averages;
}

// Assignment 4: Complex Data Manipulation
function countCommentsPerPost(data) {
    const posts = data.posts || [];
    return posts.reduce((result, post) => {
        result[post.id] = post.comments ? post.comments.length : 0;
        return result;
    }, {});
}

function postsWithMoreThanThreeComments(data) {
    const posts = data.posts || [];
    return posts.filter(post => (post.comments || []).length > 3);
}

// Assignment 5: Sorting and Organizing Data
function sortUsersByAge(data) {
    const users = data.users || [];
    return users.sort((a, b) => a.age - b.age);
}

function sortProductsByPriceDescending(data) {
    const products = data.products || [];
    return products.sort((a, b) => b.price - a.price);
}

// Testing the functions
console.log("Assignment 1 Results:");
displayUserNamesAndEmails(data);
listHighRatedProducts(data);

console.log("\nAssignment 2 Results:");
console.log("Products in 'Books' category:", findProductsByCategory(data, 'Books'));
console.log("Events after 2023-01-01:", filterEventsByDate(data, '2023-01-01'));

console.log("\nAssignment 3 Results:");
console.log("Average Age:", calculateAverageAge(data));
console.log("Average Price by Category:", averagePriceByCategory(data));

console.log("\nAssignment 4 Results:");
console.log("Comments per Post:", countCommentsPerPost(data));
console.log("Posts with more than 3 comments:", postsWithMoreThanThreeComments(data));

console.log("\nAssignment 5 Results:");
console.log("Users sorted by age:", sortUsersByAge(data));
console.log("Products sorted by price descending:", sortProductsByPriceDescending(data));
