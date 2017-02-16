export const required = (val) => val && val.length;
export const maxLength = (len) => (val) => val.length <= len;
export const minLength = (len) => (val) => val.length >= len;
export const isNumber = (val) => !isNaN(Number(val));
export const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
export const minAge = (val) => val >= 18
export const passwordsMatch = ({ password, password_confirm}) => {
    if (password_confirm) {
        return password === password_confirm;
    }
    return true
}