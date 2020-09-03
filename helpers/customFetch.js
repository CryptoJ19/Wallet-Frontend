const apiUrl = process.env.BASE_URL;

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

const customFetchFormdata = (url, method, header = null, data = null) => {
  if (data !== null) {
    return fetch(url, {
      method,
      headers: {
        ...header,
      },
      body: data,
    });
  }
  return fetch(url, {
    method,
    headers: {
      ...header,
    },
  });
};

const customFetch = (url, method, header = null, data = null) => {
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
    },
  });
};

const customFetchToken = async (ctx, callback) => {
  const res = await callback();
  if (res.code === 401001) {
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
      `${apiUrl}/auth/refresh-token`,
      'POST',
      header,
    );
    const contentResresh = await rawResponseRefresh.json();
    if (contentResresh.code === 401001 || contentResresh.code === 401000) {
      document.location.replace(`http://${window.location.host}/app/authorization`);
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
  customFetchFormdata,
};
