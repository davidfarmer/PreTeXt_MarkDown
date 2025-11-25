export const alert = function(...args) {
    //  console.log("alert", ...args);
    if (typeof window !== "undefined" && window.alert) {
        window.alert(...args);
    } else {
        console.log("alert", ...args);
    }
};
