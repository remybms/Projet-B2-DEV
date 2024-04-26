import jwt from 'jsonwebtoken';

export const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('token', token);
};

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
};

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, username: user.username, name: user.name, surname: user.surname }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Durée de validité du token
    });
};

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
    location.reload()
}

export const getUserFromToken = (token) => {
    const decodedToken = jwt.decode(token);
    return decodedToken;
};