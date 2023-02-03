export const ValidoRegistro = ({ nombre, apellido, correo, clave, rclave }) => {
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const e = {};
    let valido = true;

    if (nombre.toString().trim().length === 0) {
        e.nombre = 'El Nombre esta Vacio';
        valido = false;
    } else if (nombre.length > 30) {
        e.nombre = 'El Nombre no puede tener mas de 30 Caracteres';
        valido = false;
    }

    if (apellido.toString().trim().length === 0) {
        e.apellido = 'El Apellido esta Vacio';
        valido = false;
    } else if (apellido.length > 40) {
        e.apellido = 'El Apellido no puede tener mas de 40 Caracteres';
        valido = false;
    }

    if (correo.toString().trim().length === 0) {
        e.correo = 'El Correo esta Vacio';
        valido = false;
    } else if (correo.length > 40) {
        e.correo = 'El Correo no puede tener mas de 40 Caracteres';
        valido = false;
    } else if (!regexEmail.test(correo)) {
        e.correo = 'El Correo ingresado no es Valido';
        valido = false;
    }

    if (clave.toString().trim().length === 0) {
        e.clave = 'La Contraseña esta Vacia';
        valido = false;
    } else if (clave.length < 6 || clave.length > 40) {
        e.clave = 'La Contraseña solo tiene que tener entre 6 a 40 caracteres';
        valido = false;
    } else if (clave !== rclave) {
        e.clave = 'Las Conctraseñas no coinsiden';
        valido = false;
    }

    if (rclave.toString().trim().length === 0) {
        e.rclave = 'Repetir Contraseña esta Vacia';
        valido = false;
    } else if (rclave.length < 6 || rclave.length > 40) {
        e.rclave = 'Repetir Contraseña solo tiene que tener entre 6 a 40 caracteres';
        valido = false;
    } else if (rclave !== clave) {
        e.rclave = 'Las Contraseñas no coinsiden';
        valido = false;
    }

    return { ...e, valido };
};

export const ValidoEditarU = ({ nombre, apellido, descripcion }) => {
    const e = {};
    let valido = true;

    if (nombre.toString().trim().length === 0) {
        e.nombre = 'El Nombre esta Vacio';
        valido = false;
    } else if (nombre.length > 30) {
        e.nombre = 'El Nombre no puede tener mas de 30 Caracteres';
        valido = false;
    }

    if (apellido.toString().trim().length === 0) {
        e.apellido = 'El Apellido esta Vacio';
        valido = false;
    } else if (apellido.length > 40) {
        e.apellido = 'El Apellido no puede tener mas de 40 Caracteres';
        valido = false;
    }
    if (descripcion.toString().trim().length === 0) {
        e.descripcion = 'La descripción está vacia';
        valido = false;
    } else if (descripcion.length > 200) {
        e.descripcion = 'La descripción no puede tener más de 200 Caracteres';
        valido = false;
    }

    return { ...e, valido };
};

export const ValidoKey = ({ id, nombre }) => {
    const e = {};
    let valido = true;

    if (id.toString().trim().length === 0) {
        e.id = 'El ID esta Vacio';
        valido = false;
    } else if (typeof altura === 'number'){
        e.id = 'El ID tiene que ser un Numero';
        valido = false;
    } else if (id.includes('.')) {
        e.id = 'El ID tiene que ser un Numero Entero';
        valido = false;
    } else if (parseInt(id) < 1 || parseInt(id) > 1000) {
        e.id = 'El ID debe estar entre 1 al 1000';
        valido = false;
    }

    if (nombre.toString().trim().length === 0) {
        e.nombre = 'El Nombre esta Vacio';
        valido = false;
    } else if (nombre.length > 20) {
        e.nombre = 'El Nombre no puede tener mas de 20 Caracteres';
        valido = false;
    }

    return { ...e, valido };
};

const usuarioGogle = {
    "user": {
        "uid": "W6rZmnbVQlZNytnNqk3WFsOLFVx1",
        "email": "baratops.soporte@gmail.com",
        "emailVerified": true,
        "displayName": "LLancamil Aguilera",
        "isAnonymous": false,
        "photoURL": "https://lh3.googleusercontent.com/a/AEdFTp5xjEAaaElFCkfwbm9E9IXV5o7rThvAV6iwtup6=s96-c",
        "providerData": [
            {
                "providerId": "google.com",
                "uid": "100959429156677474385",
                "displayName": "LLancamil Aguilera",
                "email": "baratops.soporte@gmail.com",
                "phoneNumber": null,
                "photoURL": "https://lh3.googleusercontent.com/a/AEdFTp5xjEAaaElFCkfwbm9E9IXV5o7rThvAV6iwtup6=s96-c"
            }
        ],
        "stsTokenManager": {
            "refreshToken": "APJWN8fNs_QV04omtSJiavdM8IIK0CFuhXF8GaKmF5NIPZwuqWr-iBgHIKAsDbR7o0QzZM6tziuePo6sRhvubQSGejh5M6Il2bx9PaLRF8tHOGlAfmjC_5ejruj_X3_Ut_J3vJnYgfAoOXCAQ9gxJsH4R9Iks9s5gGlrBshZqZIMkccjrX-1J5q82iuCLO9dmGE_C_9A-39s7CQaz7D82DnyTCODHo-Xl5x4CmntplNJLygdHXwyYAJ4-xxg-8Q_TBQCCMiF6yUn2g4rlXNcesG09bLsQKLboxyAfedVIZgEY1fsyYJhjNY-LltfGElon7a9sXKwAVOpRchuKqjp-RWwxYTSXbFLBnBPtkJTHNcRQyo95VS9oH92Po7XAJV2pwCn3HwACyjgpo6Gwcg26ldurxcMtJUd7SDr3CIwD5hibUrXR5mquC4",
            "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwNWI0MDljNmYyMmM0MDNlMWY5MWY5ODY3YWM0OTJhOTA2MTk1NTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTExhbmNhbWlsIEFndWlsZXJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDV4akVBYWFFbEZDa2Z3Ym05RTlJWFY1bzdyVGh2QVY2aXd0dXA2PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL29yaW9uLXByb3llY3QiLCJhdWQiOiJvcmlvbi1wcm95ZWN0IiwiYXV0aF90aW1lIjoxNjc0OTY5Mjc1LCJ1c2VyX2lkIjoiVzZyWm1uYlZRbFpOeXRuTnFrM1dGc09MRlZ4MSIsInN1YiI6Ilc2clptbmJWUWxaTnl0bk5xazNXRnNPTEZWeDEiLCJpYXQiOjE2NzQ5NjkyNzUsImV4cCI6MTY3NDk3Mjg3NSwiZW1haWwiOiJiYXJhdG9wcy5zb3BvcnRlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAwOTU5NDI5MTU2Njc3NDc0Mzg1Il0sImVtYWlsIjpbImJhcmF0b3BzLnNvcG9ydGVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.mPI2QcxmNjE_fMakWvhRfy50fW2XfnEK3C6urUyP5JPyUFP7BV8UEKSXHchFIXP4gVAq0i-uaDib46hz3GG_KGSjAebfERXLcAjwCIWQwtn4PdnLFxmRbsZiwJOq59TP0jSRsxKPVhK3JKXZWcJoOR6P_vAADsLLM0-fjegMrwF6eHybpP8Vs9Bv4_Aovd9lRw7IlnIoSpwPTFw4l5IbW7cYGsT2skVm0bP1Omg7uGkdD-kNGEf7KrLSIXYR8VDpjPch4atbE1R9tJDpg9pZuZSMMHl7pVPqlRr8Shjzt0Q3YF5tX0oSIbCNmDxShFfsRSm1PnyeZzPyEbPvlD140Q",
            "expirationTime": 1674972875937
        },
        "createdAt": "1674969275279",
        "lastLoginAt": "1674969275280",
        "apiKey": "AIzaSyCGZ-gN4lQDU5rVulmSIzjQAfYckyw99rI",
        "appName": "[DEFAULT]"
    },
    "providerId": "google.com",
    "_tokenResponse": {
        "federatedId": "https://accounts.google.com/100959429156677474385",
        "providerId": "google.com",
        "email": "baratops.soporte@gmail.com",
        "emailVerified": true,
        "firstName": "LLancamil",
        "fullName": "LLancamil Aguilera",
        "lastName": "Aguilera",
        "photoUrl": "https://lh3.googleusercontent.com/a/AEdFTp5xjEAaaElFCkfwbm9E9IXV5o7rThvAV6iwtup6=s96-c",
        "localId": "W6rZmnbVQlZNytnNqk3WFsOLFVx1",
        "displayName": "LLancamil Aguilera",
        "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwNWI0MDljNmYyMmM0MDNlMWY5MWY5ODY3YWM0OTJhOTA2MTk1NTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTExhbmNhbWlsIEFndWlsZXJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDV4akVBYWFFbEZDa2Z3Ym05RTlJWFY1bzdyVGh2QVY2aXd0dXA2PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL29yaW9uLXByb3llY3QiLCJhdWQiOiJvcmlvbi1wcm95ZWN0IiwiYXV0aF90aW1lIjoxNjc0OTY5Mjc1LCJ1c2VyX2lkIjoiVzZyWm1uYlZRbFpOeXRuTnFrM1dGc09MRlZ4MSIsInN1YiI6Ilc2clptbmJWUWxaTnl0bk5xazNXRnNPTEZWeDEiLCJpYXQiOjE2NzQ5NjkyNzUsImV4cCI6MTY3NDk3Mjg3NSwiZW1haWwiOiJiYXJhdG9wcy5zb3BvcnRlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAwOTU5NDI5MTU2Njc3NDc0Mzg1Il0sImVtYWlsIjpbImJhcmF0b3BzLnNvcG9ydGVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.mPI2QcxmNjE_fMakWvhRfy50fW2XfnEK3C6urUyP5JPyUFP7BV8UEKSXHchFIXP4gVAq0i-uaDib46hz3GG_KGSjAebfERXLcAjwCIWQwtn4PdnLFxmRbsZiwJOq59TP0jSRsxKPVhK3JKXZWcJoOR6P_vAADsLLM0-fjegMrwF6eHybpP8Vs9Bv4_Aovd9lRw7IlnIoSpwPTFw4l5IbW7cYGsT2skVm0bP1Omg7uGkdD-kNGEf7KrLSIXYR8VDpjPch4atbE1R9tJDpg9pZuZSMMHl7pVPqlRr8Shjzt0Q3YF5tX0oSIbCNmDxShFfsRSm1PnyeZzPyEbPvlD140Q",
        "context": "",
        "oauthAccessToken": "ya29.a0AVvZVsqpjSPm4whW6JT7kty4_4FIZUgbAHbBcLEupTu_8R5Wdrbb1FZLlWlR2fnoumehQ1M7I_WxKsx16BF-6xtWeBiQ96d3fiCUkP2uR4e1ay4BvWyztpawa-j1qvuimKm7odh0I8Syt6g20E9cEzL1-DmKaCgYKAUISARISFQGbdwaIoLr4T11knR_P_H_jy_Li9w0163",
        "oauthExpireIn": 3598,
        "refreshToken": "APJWN8fNs_QV04omtSJiavdM8IIK0CFuhXF8GaKmF5NIPZwuqWr-iBgHIKAsDbR7o0QzZM6tziuePo6sRhvubQSGejh5M6Il2bx9PaLRF8tHOGlAfmjC_5ejruj_X3_Ut_J3vJnYgfAoOXCAQ9gxJsH4R9Iks9s5gGlrBshZqZIMkccjrX-1J5q82iuCLO9dmGE_C_9A-39s7CQaz7D82DnyTCODHo-Xl5x4CmntplNJLygdHXwyYAJ4-xxg-8Q_TBQCCMiF6yUn2g4rlXNcesG09bLsQKLboxyAfedVIZgEY1fsyYJhjNY-LltfGElon7a9sXKwAVOpRchuKqjp-RWwxYTSXbFLBnBPtkJTHNcRQyo95VS9oH92Po7XAJV2pwCn3HwACyjgpo6Gwcg26ldurxcMtJUd7SDr3CIwD5hibUrXR5mquC4",
        "expiresIn": "3600",
        "oauthIdToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3NDA1MmEyYjY0NDg3NDU3NjRlNzJjMzU5MDk3MWQ5MGNmYjU4NWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDYzODIwODk3NDI0LXNxdGtnZm9zNGNvOGY3MGU1bjMxdmIwMjFuYWpnbmE3LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDYzODIwODk3NDI0LXNxdGtnZm9zNGNvOGY3MGU1bjMxdmIwMjFuYWpnbmE3LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwOTU5NDI5MTU2Njc3NDc0Mzg1IiwiZW1haWwiOiJiYXJhdG9wcy5zb3BvcnRlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoidFBmUVJaYnZhRS0xUVR6MlMxVnZEQSIsImlhdCI6MTY3NDk2OTI3NSwiZXhwIjoxNjc0OTcyODc1fQ.fM21nNtWXMUqC_FAdczUbIxwzgZTU2YAsc857NBNul1RdH2aRyBimiM3P82u5ViY2T_Kp4h7fbrQhn5WoOlS33yCwfB1OQSfjJBOQ_gpwxtGLqYjK4GH8RPHia0h5AqqSk2M5mrLbocVimxwOZzyCv7U8TGLOuTO1AfEOohUPwkHfxtarPvzbBkdnqRMR9rvMNH1VR8FJBmlgoD2Ik0b--LzANjptkqoXJTvYAyCfFYk_I-HbUeoqRCxKuQ88f6bKQCjOsepZ4x7uQ8rVpDvOAtDkd4ahxunq0U8HUC2EO-VlGLhdxO_GMQ1NRZw33cOVdFlYCb-_JmmuzlgnKiOsw",
        "rawUserInfo": "{\"name\":\"LLancamil Aguilera\",\"granted_scopes\":\"https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email\",\"id\":\"100959429156677474385\",\"verified_email\":true,\"given_name\":\"LLancamil\",\"locale\":\"es\",\"family_name\":\"Aguilera\",\"email\":\"baratops.soporte@gmail.com\",\"picture\":\"https://lh3.googleusercontent.com/a/AEdFTp5xjEAaaElFCkfwbm9E9IXV5o7rThvAV6iwtup6=s96-c\"}",
        "isNewUser": true,
        "kind": "identitytoolkit#VerifyAssertionResponse"
    },
    "operationType": "signIn"
};

const login = {
    "user": {
        "uid": "W6rZmnbVQlZNytnNqk3WFsOLFVx1",
        "email": "baratops.soporte@gmail.com",
        "emailVerified": true,
        "displayName": "LLancamil Aguilera",
        "isAnonymous": false,
        "photoURL": "https://lh3.googleusercontent.com/a/AEdFTp5xjEAaaElFCkfwbm9E9IXV5o7rThvAV6iwtup6=s96-c",
        "providerData": [
            {
                "providerId": "google.com",
                "uid": "100959429156677474385",
                "displayName": "LLancamil Aguilera",
                "email": "baratops.soporte@gmail.com",
                "phoneNumber": null,
                "photoURL": "https://lh3.googleusercontent.com/a/AEdFTp5xjEAaaElFCkfwbm9E9IXV5o7rThvAV6iwtup6=s96-c"
            }
        ],
        "stsTokenManager": {
            "refreshToken": "APJWN8d6gfCxDhSbkA7uubdoQKuYpPsMaYlTiAm6WaCxsqYh91zaCl8ip8pFwnfS5vfgvdUhbB-pBOt3x2Y9ma3rYq6zkBlmLpYCQVnh0_hhEm2keQyKmmS7Fca4xc9EuM1lWUor1m9jlAUfBBhlhY6yS9wtrRYI-guY68N255pOJnH4v6PrfcjyLVjUKhc0P7-LUrsqm1GNB75LxMEuUmoimAGUUOkgZqYgT15SOarnuqlIvgn7xWWlni1n6dGhrq2aXJxOz80lPX_2ZZaf_PeJq-3pdbEYmtgcf4V4d0cFSd_59Uh-mVaq-OAIbbWEf9Dnyr-Ep4uV4CPbga3RmmIf072qwRSCbVk4U47gBWal62bUF178PPW88YcB0Sa158Y4zksbfVQqzuTKGj4a2nFmQMi_v1blKCHtFzhWAERHftl_zPnTjOg",
            "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwNWI0MDljNmYyMmM0MDNlMWY5MWY5ODY3YWM0OTJhOTA2MTk1NTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTExhbmNhbWlsIEFndWlsZXJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDV4akVBYWFFbEZDa2Z3Ym05RTlJWFY1bzdyVGh2QVY2aXd0dXA2PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL29yaW9uLXByb3llY3QiLCJhdWQiOiJvcmlvbi1wcm95ZWN0IiwiYXV0aF90aW1lIjoxNjc0OTcwMjE3LCJ1c2VyX2lkIjoiVzZyWm1uYlZRbFpOeXRuTnFrM1dGc09MRlZ4MSIsInN1YiI6Ilc2clptbmJWUWxaTnl0bk5xazNXRnNPTEZWeDEiLCJpYXQiOjE2NzQ5NzAyMTcsImV4cCI6MTY3NDk3MzgxNywiZW1haWwiOiJiYXJhdG9wcy5zb3BvcnRlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAwOTU5NDI5MTU2Njc3NDc0Mzg1Il0sImVtYWlsIjpbImJhcmF0b3BzLnNvcG9ydGVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.mGicZ3DX7Jbr_ZLyt1L6gZGGA0cXoKYPyOPTWye6EBEXHjiL26TkzWLv5hGMwB6CxjxXBZSekf1TDGN_ieZinmziwjw3qEE9f7b2_QWp5iT3Jw4HmZtpKPGI4P71_kUnYPllXlcJi5V10TbOgyN-lI89db8MC0-lvHPrO8mD5DT8yzTWZLyerIGWBiaqGooBU8g1C2CQpttMobLg2Et8IKuc_A5tsRLDouRwWMq4peziOw-oBiIKrS6CN3pezKfkImXVbV7xReZzk38WjQigbwkVg6KsUsquwdY_KpHsA1MCuk0g0dqYR76nDE3_DY6D94Bmqzxz2Mm6rKoZmkOhIg",
            "expirationTime": 1674973818236
        },
        "createdAt": "1674969275279",
        "lastLoginAt": "1674970217687",
        "apiKey": "AIzaSyCGZ-gN4lQDU5rVulmSIzjQAfYckyw99rI",
        "appName": "[DEFAULT]"
    },
    "providerId": "google.com",
    "_tokenResponse": {
        "federatedId": "https://accounts.google.com/100959429156677474385",
        "providerId": "google.com",
        "email": "baratops.soporte@gmail.com",
        "emailVerified": true,
        "firstName": "LLancamil",
        "fullName": "LLancamil Aguilera",
        "lastName": "Aguilera",
        "photoUrl": "https://lh3.googleusercontent.com/a/AEdFTp5xjEAaaElFCkfwbm9E9IXV5o7rThvAV6iwtup6=s96-c",
        "localId": "W6rZmnbVQlZNytnNqk3WFsOLFVx1",
        "displayName": "LLancamil Aguilera",
        "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwNWI0MDljNmYyMmM0MDNlMWY5MWY5ODY3YWM0OTJhOTA2MTk1NTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTExhbmNhbWlsIEFndWlsZXJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDV4akVBYWFFbEZDa2Z3Ym05RTlJWFY1bzdyVGh2QVY2aXd0dXA2PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL29yaW9uLXByb3llY3QiLCJhdWQiOiJvcmlvbi1wcm95ZWN0IiwiYXV0aF90aW1lIjoxNjc0OTcwMjE3LCJ1c2VyX2lkIjoiVzZyWm1uYlZRbFpOeXRuTnFrM1dGc09MRlZ4MSIsInN1YiI6Ilc2clptbmJWUWxaTnl0bk5xazNXRnNPTEZWeDEiLCJpYXQiOjE2NzQ5NzAyMTcsImV4cCI6MTY3NDk3MzgxNywiZW1haWwiOiJiYXJhdG9wcy5zb3BvcnRlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAwOTU5NDI5MTU2Njc3NDc0Mzg1Il0sImVtYWlsIjpbImJhcmF0b3BzLnNvcG9ydGVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.mGicZ3DX7Jbr_ZLyt1L6gZGGA0cXoKYPyOPTWye6EBEXHjiL26TkzWLv5hGMwB6CxjxXBZSekf1TDGN_ieZinmziwjw3qEE9f7b2_QWp5iT3Jw4HmZtpKPGI4P71_kUnYPllXlcJi5V10TbOgyN-lI89db8MC0-lvHPrO8mD5DT8yzTWZLyerIGWBiaqGooBU8g1C2CQpttMobLg2Et8IKuc_A5tsRLDouRwWMq4peziOw-oBiIKrS6CN3pezKfkImXVbV7xReZzk38WjQigbwkVg6KsUsquwdY_KpHsA1MCuk0g0dqYR76nDE3_DY6D94Bmqzxz2Mm6rKoZmkOhIg",
        "context": "",
        "oauthAccessToken": "ya29.a0AVvZVsoziQLVJfLvp-BNH3kvCveIaU8KkgjIBW_wZ3_x2g5ECokrrVIHdq3oJDafAyKCI_3PXcvYlWXlME9e0qBwXgTbW-1AjXEB8kLCdXj-VXr3A-TDXjwI5qKdDTOVdi-vuOp-Wz5RRSCb1JEMN3sov88waCgYKAc8SARISFQGbdwaIQKQBdxKVEjzYCTez_W_uiA0163",
        "oauthExpireIn": 3599,
        "refreshToken": "APJWN8d6gfCxDhSbkA7uubdoQKuYpPsMaYlTiAm6WaCxsqYh91zaCl8ip8pFwnfS5vfgvdUhbB-pBOt3x2Y9ma3rYq6zkBlmLpYCQVnh0_hhEm2keQyKmmS7Fca4xc9EuM1lWUor1m9jlAUfBBhlhY6yS9wtrRYI-guY68N255pOJnH4v6PrfcjyLVjUKhc0P7-LUrsqm1GNB75LxMEuUmoimAGUUOkgZqYgT15SOarnuqlIvgn7xWWlni1n6dGhrq2aXJxOz80lPX_2ZZaf_PeJq-3pdbEYmtgcf4V4d0cFSd_59Uh-mVaq-OAIbbWEf9Dnyr-Ep4uV4CPbga3RmmIf072qwRSCbVk4U47gBWal62bUF178PPW88YcB0Sa158Y4zksbfVQqzuTKGj4a2nFmQMi_v1blKCHtFzhWAERHftl_zPnTjOg",
        "expiresIn": "3600",
        "oauthIdToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3NDA1MmEyYjY0NDg3NDU3NjRlNzJjMzU5MDk3MWQ5MGNmYjU4NWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDYzODIwODk3NDI0LXNxdGtnZm9zNGNvOGY3MGU1bjMxdmIwMjFuYWpnbmE3LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDYzODIwODk3NDI0LXNxdGtnZm9zNGNvOGY3MGU1bjMxdmIwMjFuYWpnbmE3LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwOTU5NDI5MTU2Njc3NDc0Mzg1IiwiZW1haWwiOiJiYXJhdG9wcy5zb3BvcnRlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTnM2VGdUVFNGNDJUbm50Wmk0NC1MQSIsImlhdCI6MTY3NDk3MDIxNywiZXhwIjoxNjc0OTczODE3fQ.MtSm9pSMtSo72qt52D28so4ihNT4KYo-LGRMSlszevU27loIi04Qh9GJLvvWfYz-4727aTvxXDn1QebvZ5QLJ084DUzEtjt1zA6XJ-xONpK30eP233Qg4MNKDLRg8IDXvPTXz7_MEA4vZJb9RIkcIJu_yQHXBFSshinrlzvEEpuMhrVDorABqkID3NlspYbswguGGm9wV8-NRj6pnitMkIXiC0tcwGq-RXBRKowcoZPZDNXdTeSTzbW0Yp9iDNm0l9f40TS2-D5CUIPzTjWFeGjo8F6sSDHHHLY1HKkdyj32YOlfAI4Oio1ssdk6XehjMD6_PBAsq6S3iW3Ynw7cXQ",
        "rawUserInfo": "{\"name\":\"LLancamil Aguilera\",\"granted_scopes\":\"openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile\",\"id\":\"100959429156677474385\",\"verified_email\":true,\"given_name\":\"LLancamil\",\"locale\":\"es\",\"family_name\":\"Aguilera\",\"email\":\"baratops.soporte@gmail.com\",\"picture\":\"https://lh3.googleusercontent.com/a/AEdFTp5xjEAaaElFCkfwbm9E9IXV5o7rThvAV6iwtup6=s96-c\"}",
        "kind": "identitytoolkit#VerifyAssertionResponse"
    },
    "operationType": "signIn"
};