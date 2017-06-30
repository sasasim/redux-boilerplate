export const OK = 'ok';
export const ERR = 'err';

const callApi = async path => {
  try {
    const response = await fetch(`/api/v1${path}`);
    const data = await response.json();

    return { status: OK, data };
  } catch (ex) {
    console.error(ex);
    return { status: ERR, data: ex };
  }
}

export const fetchUser = () => callApi('/user');
