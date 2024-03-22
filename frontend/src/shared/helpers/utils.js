import Cookies from "js-cookie";

const getItemFromCookie = (key) => Cookies.get(key);

const setItemInCookie = (key, value) => Cookies.set(key, value);

export const removeItemInCookie = (key) => Cookies.remove(key);

export { getItemFromCookie, setItemInCookie };

export const capitalizeWords = (sentence) => {
    const englishPattern = /^[A-Za-z\s]+$/;

    const isValidString = englishPattern.test(sentence);

    const wordStartWith = /^[a-zA-Z]/;
    const validWord = wordStartWith.test(sentence);
    if (!isValidString || !sentence) {
        if (
            /\s/.test(sentence) === false &&
            validWord &&
            sentence !== undefined
        ) {
            return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        } else if (/\s/.test(sentence) === true && sentence !== undefined) {
            const capitalizeWord = sentence.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
            });
            return capitalizeWord;
        }

        return sentence;
    }

    const capitalizeWord = sentence.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    });
    return capitalizeWord;
};
