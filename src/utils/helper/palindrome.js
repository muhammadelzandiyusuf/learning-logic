export default function palindrome(value) {
    let isPalindrome = false;
    const palindrome = value.split("").reverse().join("");

    if (value.toLocaleLowerCase() === palindrome.toLocaleLowerCase()) isPalindrome = true;

    return isPalindrome;
}
