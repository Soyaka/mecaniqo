//Pages/Ziggy.js

const Ziggy = {
    url: "http://localhost:8000",
    port: 8000,
    defaults: {},
    routes: {
        "sanctum.csrf-cookie": {
            uri: "sanctum/csrf-cookie",
            methods: ["GET", "HEAD"],
        },
        dashboard: { uri: "dashboard", methods: ["GET", "HEAD"] },
        "profile.edit": { uri: "profile", methods: ["GET", "HEAD"] },
        "profile.update": { uri: "profile", methods: ["PATCH"] },
        "profile.destroy.confirm": { uri: "profile/confirm-password", methods: ["GET", "HEAD"] },
        "profile": { uri: "profile", methods: ["GET", "HEAD"] },
        "profile.destroy": { uri: "profile", methods: ["DELETE"] },
        "users.index": { uri: "users", methods: ["GET", "HEAD"] },
        "users.create": { uri: "users/create", methods: ["GET", "HEAD"] },
        "users.store": { uri: "users", methods: ["POST"] },
        "users.show": {
            uri: "users/{user}",
            methods: ["GET", "HEAD"],
            parameters: ["user"],
        },
        "users.edit": {
            uri: "users/{user}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["user"],
        },
        "users.update": {
            uri: "users/{user}",
            methods: ["PUT", "PATCH"],
            parameters: ["user"],
        },
        "users.destroy": {
            uri: "users/{user}",
            methods: ["DELETE"],
            parameters: ["user"],
        },
        "appointments.index": { uri: "appointments", methods: ["GET", "HEAD"] },
        "appointments.create": {
            uri: "appointments/create",
            methods: ["GET", "HEAD"],
        },
        "appointments.store": { uri: "appointments", methods: ["POST"] },
        "appointments.show": {
            uri: "appointments/{appointment}",
            methods: ["GET", "HEAD"],
            parameters: ["appointment"],
        },
        "appointments.edit": {
            uri: "appointments/{appointment}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["appointment"],
        },
        "appointments.update": {
            uri: "appointments/{appointment}",
            methods: ["PUT", "PATCH"],
            parameters: ["appointment"],
        },
        "appointments.destroy": {
            uri: "appointments/{appointment}",
            methods: ["DELETE"],
            parameters: ["appointment"],
        },
        "repair-requests.index": {
            uri: "repair-requests",
            methods: ["GET", "HEAD"],
        },
        "repair-requests.create": {
            uri: "repair-requests/create",
            methods: ["GET", "HEAD"],
        },
        "repair-requests.store": { uri: "repair-requests", methods: ["POST"] },
        "repair-requests.show": {
            uri: "repair-requests/{repair_request}",
            methods: ["GET", "HEAD"],
            parameters: ["repair_request"],
        },
        "repair-requests.edit": {
            uri: "repair-requests/{repair_request}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["repair_request"],
        },
        "repair-requests.update": {
            uri: "repair-requests/{repair_request}",
            methods: ["PUT", "PATCH"],
            parameters: ["repair_request"],
        },
        "repair-requests.destroy": {
            uri: "repair-requests/{repair_request}",
            methods: ["DELETE"],
            parameters: ["repair_request"],
        },
        "invoices.index": { uri: "invoices", methods: ["GET", "HEAD"] },
        "invoices.create": { uri: "invoices/create", methods: ["GET", "HEAD"] },
        "invoices.store": { uri: "invoices", methods: ["POST"] },
        "invoices.show": {
            uri: "invoices/{invoice}",
            methods: ["GET", "HEAD"],
            parameters: ["invoice"],
        },
        "invoices.edit": {
            uri: "invoices/{invoice}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["invoice"],
        },
        "invoices.update": {
            uri: "invoices/{invoice}",
            methods: ["PUT", "PATCH"],
            parameters: ["invoice"],
        },
        "invoices.destroy": {
            uri: "invoices/{invoice}",
            methods: ["DELETE"],
            parameters: ["invoice"],
        },
        "cars.index": { uri: "cars", methods: ["GET", "HEAD"] },
        "cars.create": { uri: "cars/create", methods: ["GET", "HEAD"] },
        "cars.store": { uri: "cars", methods: ["POST"] },
        "cars.show": {
            uri: "cars/{car}",
            methods: ["GET", "HEAD"],
            parameters: ["car"],
        },
        "cars.edit": {
            uri: "cars/{car}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["car"],
        },
        "cars.update": {
            uri: "cars/{car}",
            methods: ["PUT", "PATCH"],
            parameters: ["car"],
        },
        "cars.destroy": {
            uri: "cars/{car}",
            methods: ["DELETE"],
            parameters: ["car"],
        },
        "repair-requests.update-status": {
            uri: "repair-requests/{id}/update-status",
            methods: ["POST"],
            parameters: ["id"],
        },
        register: { uri: "register", methods: ["GET", "HEAD"] },
        login: { uri: "login", methods: ["GET", "HEAD"] },
        "password.request": {
            uri: "forgot-password",
            methods: ["GET", "HEAD"],
        },
        "password.email": { uri: "forgot-password", methods: ["POST"] },
        "password.reset": {
            uri: "reset-password/{token}",
            methods: ["GET", "HEAD"],
            parameters: ["token"],
        },
        "password.store": { uri: "reset-password", methods: ["POST"] },
        "verification.notice": {
            uri: "verify-email",
            methods: ["GET", "HEAD"],
        },
        "verification.verify": {
            uri: "verify-email/{id}/{hash}",
            methods: ["GET", "HEAD"],
            parameters: ["id", "hash"],
        },
        "verification.send": {
            uri: "email/verification-notification",
            methods: ["POST"],
        },
        "password.confirm": {
            uri: "confirm-password",
            methods: ["GET", "HEAD"],
        },
        "password.update": { uri: "password", methods: ["PUT"] },
        logout: { uri: "logout", methods: ["POST"] },
    },
};
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
