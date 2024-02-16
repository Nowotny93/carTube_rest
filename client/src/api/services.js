async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        //alert(err.message);
        throw err;
    }
}

export async function register(username, password) {
    // const token = sessionStorage.getItem('authToken');

    const userData = {
        username,
        password,
    }

    const result = await request('http://localhost:5000/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });

    sessionStorage.setItem('username', result.username)
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);

    return result;
}

export async function login(username, password) {

    const userData = {
        username,
        password
    }

    const result = await request('http://localhost:5000/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    sessionStorage.setItem('username', result.username)
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);

    return result;
}

export async function logout() {
    const token = sessionStorage.getItem('authToken');
    const result = await request('http://localhost:5000/users/logout', {
        method: 'get',
        headers: { 'X-Authorization': token },
    });

    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');

    return result;
}

export async function getListings() {
    return await request('http://localhost:5000/data/cars')
}

export async function getCarById(id) {
    return await request('http://localhost:5000/data/cars/' + id);
}

export async function getUserListings(id) {
    return await request('http://localhost:5000/data/cars/userListings/' + id)
}

export async function search(brand, model, year, color, fuel, region, transmission, category, maxPrice){
    return await request(`http://localhost:5000/data/cars/search/${brand}/${model}/${year}/${color}/${fuel}/${region}/${transmission}/${category}/${maxPrice}/`)
}

export async function average(brand, model, year){
    return await request(`http://localhost:5000/data/cars/average/${brand}/${model}/${year}/`)
}

export async function create(listingData){
    const token = sessionStorage.getItem('authToken');

    const result = await request('http://localhost:5000/data/cars', {
        method: 'post',
        headers: { 'X-Authorization': token },
        body: listingData
    })

    return result
}

export async function edit(carId, brand, model, description, year, price, color, mileage, fuel, transmission, category, seller, telephone, region) {
    const token = sessionStorage.getItem('authToken');
    const carData = {
        brand,
        model,
        description,
        year,
        price,
        color,
        mileage,
        fuel,
        transmission,
        category,
        seller,
        telephone,
        region
    }

    const result = await request('http://localhost:5000/data/cars/' + carId, {
        method: 'put',
        headers: { 'X-Authorization': token, 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
    })

    return result
}

export async function deleteListing(id, photos) {
    const token = sessionStorage.getItem('authToken');
    await request('http://localhost:5000/data/cars/' + id, {
        method: 'delete',
        headers: { 'X-Authorization': token, 'Content-Type': 'application/json' },
        body: JSON.stringify(photos)
    });
}