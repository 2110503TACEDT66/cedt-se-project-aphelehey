const Menu = require('../models/Menu');
const Restaurant = require('../models/Restaurant');


exports.getMenus = async (req, res, next) => {
    let query;
    query = Menu.find()

    try {
        const menus = await query;

        res.status(200).json(menus)
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Cannot find Menu'
        })
    }
}

// exports.addMenu = async (req, res, next) => {

//     try {
//         req.body.restaurant = req.params.restaurantId;

//         const restaurant = await Restaurant.findById(req.params.restaurantId);

//         if (!restaurant) {
//             return res.status(404).json({ success: false, message: `No restaurant with the id of ${req.params.restaurantId}` });
//         }
//         console.log(req.body)

//         req.body.user = req.user.id;

//         const menu = await Menu.create(req.body);
//         res.status(201).json({
//             success: true,
//             data: menu
//         })
//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({ success: false, message: 'Cannot create Menu' });
//     }

// };

// exports.updateMenu = async (req, res, next) => {

//     try {

//         let menu = await Menu.findById(req.params.id)

//         if (!menu) {
//             res.status(404).json({ success: false, message: `No menu with the id of ${req.params.id}` });
//         }

//         if (req.user.role !== 'admin') {
//             return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to update this menu` });
//         }

//         menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         });


//         res.status(200).json({ success: true, data: menu });
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).json({ success: false, message: 'Cannot update menu' });
//     }

// };

// exports.deleteMenu = async (req, res, next) => {


//     try {
//         const menu = await Menu.findById(req.params.id);

//         if (!menu) {
//             return res.status(404).json({ success: false, message: `No menu with the id of ${req.params.id}` });
//         }

//         await menu.deleteOne();
//         res.status(200).json({ success: true, data: {} });
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).json({ success: false, message: 'Cannot delete Menu' });
//     }
// };



