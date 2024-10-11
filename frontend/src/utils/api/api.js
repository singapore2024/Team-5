import axiosInstance from "./axios";

/**
 * Fetches all menu items from the server
 * 
 * @returns {Promise} Promise object represents the response from the server
 * 
 *  The response is an array of menu items, where each menu item has the following structure:
 * [
 *     {
 *         "name": "Dish Name",
 *         "ingredients": [
 *             {
 *                 "quantity": "Quantity",
 *                 "name": "Ingredient Name",
 *                 "id": Ingredient ID
 *             },
 *             ...
 *         ],
 *         "id": Menu Item ID
 *     },
 *     ...
 * ]
 */
export const getAllMenu = async () => {
    return axiosInstance.get('/menu/all');
}

export const getAllSchedules = async () => {
    return axiosInstance.get('/schedule');
}

export const createSchedule = async (schedule) => {
    return axiosInstance.post('/schedule', schedule);
}