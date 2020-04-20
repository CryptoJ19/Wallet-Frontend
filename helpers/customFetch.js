import baseUrl from '../config';

const customFetch = (url, method, data, header = null) => fetch(url, {
  method,
  headers: {
    ...header,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

const customFetchToken = async (ctx, callback) => {
  const res = await callback();
  if (res.code === 401001) {
    console.log('токен истек');
    let token;
    if (localStorage.getItem('refreshToken') !== null) {
      token = localStorage.getItem('refreshToken');
    } else {
      token = sessionStorage.getItem('refreshToken');
    }
    const header = {
      Authorization: `Bearer ${token}`,
    };
    const rawResponseRefresh = await customFetch(
      'https://cashflash.hedpay.com/api/auth/refresh-token',
      'POST',
      null,
      header,
    );
    const contentResresh = await rawResponseRefresh.json();
    if (contentResresh.code === 401001) {
      document.location.replace(`${baseUrl}/authorization`);
      return false;
    }
    ctx.commit('updateAccess', contentResresh.result.access);
    ctx.commit('updateRefresh', contentResresh.result.refresh);
    const resSecond = await callback();
    return resSecond;
  }
  return res;
};

export { customFetch, customFetchToken };
