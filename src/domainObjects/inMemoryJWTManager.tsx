const inMemoryJWTManager = () => {
    let inMemoryJWT: any = null;

    const getToken = () => inMemoryJWT;

    const setToken = (token: any) => {
        inMemoryJWT = token;
        return true;
    };

    const deleteToken = () => {
        inMemoryJWT = null;
        return true;
    };

    return {
        getToken,
        setToken,
        deleteToken
    };
};

export default inMemoryJWTManager();