
const keysAccess = [
  'accessToken1',
  'accessToken2',
  'accessToken3',
  'accessToken4',
];
const keysRefresh = [
  'refreshToken1',
  'refreshToken2',
  'refreshToken3',
  'refreshToken4',
];

const sortTokens = () => {
  // localStorage.clear();
  // sessionStorage.clear();

  localStorage.setItem('accessToken1', 'accessToken1 value');
  localStorage.setItem('refreshToken1', 'refreshToken1 value');

  localStorage.setItem('accessToken3', 'accessToken3 value');
  localStorage.setItem('refreshToken3', 'refreshToken3 value');

  sessionStorage.setItem('accessToken4', 'accessToken4 value');
  sessionStorage.setItem('refreshToken4', 'accessToken4 value');


  const tokens = [];

  keysAccess.forEach((key, i) => {
    if (localStorage.getItem(key) !== null) {
      console.log(localStorage.getItem(key), 'local');
    } else if (sessionStorage.getItem(key) !== null) {
      console.log(sessionStorage.getItem(key), 'session');
    } else {
      console.log(key, '0');
    }
    if (localStorage.getItem(key) !== null) {
      tokens.push({
        access: localStorage.getItem(key),
        resfresh: localStorage.getItem(keysRefresh[i]),
      });
    } else if (sessionStorage.getItem(key) !== null) {
      tokens.push({
        access: sessionStorage.getItem(key),
        resfresh: sessionStorage.getItem(keysRefresh[i]),
        session: true,
      });
    }
    sessionStorage.removeItem(keysAccess[i]);
    sessionStorage.removeItem(keysRefresh[i]);
    localStorage.removeItem(keysAccess[i]);
    localStorage.removeItem(keysRefresh[i]);
  });

  tokens.forEach((key, i) => {
    console.log(key, i);
    if (key.session === true) {
      sessionStorage.setItem(keysAccess[i], key.access);
      sessionStorage.setItem(keysRefresh[i], key.resfresh);
    } else {
      localStorage.setItem(keysAccess[i], key.access);
      localStorage.setItem(keysRefresh[i], key.resfresh);
    }
  });
  keysAccess.forEach((key) => {
    if (localStorage.getItem(key) !== null) {
      console.log(localStorage.getItem(key), 'local');
    } else if (sessionStorage.getItem(key) !== null) {
      console.log(sessionStorage.getItem(key), 'session');
    } else {
      console.log(key, '0');
    }
  });
};

const getAccessTokens = () => {
  localStorage.clear();
  sessionStorage.clear();

  localStorage.setItem('accessToken1', 'accessToken1 value');
  localStorage.setItem('refreshToken1', 'refreshToken1 value');

  localStorage.setItem('accessToken3', 'accessToken3 value');
  localStorage.setItem('refreshToken3', 'refreshToken3 value');

  sessionStorage.setItem('accessToken4', 'accessToken4 value');
  sessionStorage.setItem('refreshToken4', 'accessToken4 value');


  const tokens = [];

  keysAccess.forEach((key, i) => {
    if (localStorage.getItem(key) !== null) {
      console.log(localStorage.getItem(key), 'local');
    } else if (sessionStorage.getItem(key) !== null) {
      console.log(sessionStorage.getItem(key), 'session');
    } else {
      console.log(key, '0');
    }
    if (localStorage.getItem(key) !== null) {
      tokens.push({
        access: localStorage.getItem(key),
        resfresh: localStorage.getItem(keysRefresh[i]),
      });
    } else if (sessionStorage.getItem(key) !== null) {
      tokens.push({
        access: sessionStorage.getItem(key),
        resfresh: sessionStorage.getItem(keysRefresh[i]),
        session: true,
      });
    }
    sessionStorage.removeItem(keysAccess[i]);
    sessionStorage.removeItem(keysRefresh[i]);
    localStorage.removeItem(keysAccess[i]);
    localStorage.removeItem(keysRefresh[i]);
  });

  tokens.forEach((key, i) => {
    console.log(key, i);
    if (key.session === true) {
      sessionStorage.setItem(keysAccess[i], key.access);
      sessionStorage.setItem(keysRefresh[i], key.resfresh);
    } else {
      localStorage.setItem(keysAccess[i], key.access);
      localStorage.setItem(keysRefresh[i], key.resfresh);
    }
  });
  keysAccess.forEach((key) => {
    if (localStorage.getItem(key) !== null) {
      console.log(localStorage.getItem(key), 'local');
    } else if (sessionStorage.getItem(key) !== null) {
      console.log(sessionStorage.getItem(key), 'session');
    } else {
      console.log(key, '0');
    }
  });
  if (tokens.length === 0) {
    return false;
  }
  return tokens;
};

const getAccessToken = () => {
  if (localStorage.getItem('accessToken') !== null) {
    return localStorage.getItem('accessToken');
  } if (sessionStorage.getItem('accessToken') !== null) {
    return sessionStorage.getItem('accessToken');
  }
  return false;
};

const getHeaderWithToken = () => {
  const token = getAccessToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

const customFetch = (url, method, header = null, data = null) => {
  console.log(data);
  if (data !== null) {
    return fetch(url, {
      method,
      headers: {
        ...header,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  return fetch(url, {
    method,
    headers: {
      ...header,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

const customFetchToken = async (ctx, callback) => {
  const res = await callback();
  if (res.code === 401001) {
    console.log('токен истек');
    let token;
    let session = false;
    if (localStorage.getItem('refreshToken') !== null) {
      token = localStorage.getItem('refreshToken');
    } else {
      session = true;
      token = sessionStorage.getItem('refreshToken');
    }
    const header = {
      Authorization: `Bearer ${token}`,
    };
    const rawResponseRefresh = await customFetch(
      'https://cashflash.hedpay.com/api/auth/refresh-token',
      'POST',
      header,
    );
    const contentResresh = await rawResponseRefresh.json();
    if (contentResresh.code === 401001) {
      // document.location.replace(`${baseUrl}/authorization`);
      ctx.commit('logout');
      return false;
    }
    if (session) {
      ctx.commit('temporaryAccess', contentResresh.result.access);
      ctx.commit('temporaryRefresh', contentResresh.result.refresh);
    } else {
      ctx.commit('updateAccess', contentResresh.result.access);
      ctx.commit('updateRefresh', contentResresh.result.refresh);
    }

    const resSecond = await callback();
    return resSecond;
  }
  return res;
};

export {
  customFetch,
  customFetchToken,
  getAccessToken,
  getHeaderWithToken,
  getAccessTokens,
  sortTokens,
};
