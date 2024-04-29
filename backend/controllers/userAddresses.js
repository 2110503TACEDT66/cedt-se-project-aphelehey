const UserAddress = require("../models/UserAddress");

exports.getAddresses = async (req, res, next) => {
    let query
    if (req.user.role == "admin") {
        try {

            query = await UserAddress.find();

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Finding UserAddress Error (admin)' });
        }

        if (query.length == 0) {
            return res.status(404).json({ success: true, message: "System doesn't have any address (admin)" })
        }

        return res.status(200).json(query);
    } else {
        //non-admin will only see their own address
        try {

            query = await UserAddress.findOne({ user: req.user.id });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Finding UserAddress Error' });
        }

        if (query === null) {
            return res.status(404).json({ success: true, message: "User doesn't have any address" })
        }

        return res.status(200).json(query);

    }
}

exports.postAddress = async (req, res, next) => {
    let query
    let newAddresses;
    const userId = (req.user.role == "admin") ? req.body.user : req.user.id //if adder is admin get userID from body

    try {
        query = await UserAddress.findOne({ user: userId });
    } catch (error) {
        return res.status(500).json("Finding UserAddress Error")
    }



    if (query) {
        //if user already has address

        newAddress = query.addresses
        newAddress.push(req.body.address)

        newAddresses = await UserAddress.findOneAndUpdate({ user: userId }, { addresses: newAddress }, {
            new: true,
            runValidators: true,
        });

    } else {
        //if user dont have any address
        newAddresses = await UserAddress.create({ user: userId, addresses: [req.body.address] });
    }

    return res.status(200).json(newAddresses);

}

exports.updateAddress = async (req, res, next) => {
    let query
    let newAddresses;
    const userId = (req.user.role == "admin") ? req.body.user : req.user.id //if adder is admin get userID from body

    try {
        query = await UserAddress.findOne({ user: userId });
    } catch (error) {
        return res.status(500).json("Finding UserAddress Error")
    }



    if (!query) {
        return res.status(404).json("UserAddress Not Found")
    } else {
        //if user already has address
        newAddress = query.addresses;
        try {
            newAddress[req.body.index] = req.body.address
        } catch (error) {
            return res.status(400).json("Index out of bound")
        }

        newAddresses = await UserAddress.findOneAndUpdate({ user: userId }, { addresses: newAddress }, {
            new: true,
            runValidators: true,
        });
    }

    return res.status(200).json(newAddresses);

}

exports.deleteAddress = async (req, res, next) => {
    let query
    let newAddresses;
    const userId = (req.user.role == "admin") ? req.body.user : req.user.id //if adder is admin get userID from body

    try {
        query = await UserAddress.findOne({ user: userId });
    } catch (error) {
        return res.status(500).json("Finding UserAddress Error")
    }

    if (!query) {
        return res.status(404).json("UserAddress Not Found")
    } else {
        //if user already has address
        newAddress = query.addresses;
        try {
            //remove element at index
            const firstHalf = newAddress.slice(0, req.body.index);
            const delIndex = 1 + req.body.index;
            const lastHalf = newAddress.slice(delIndex);
            newAddress = firstHalf.concat(lastHalf)
            console.log(firstHalf)
            console.log(lastHalf)
            console.log(newAddress)
        } catch (error) {
            return res.status(400).json("Index out of bound");
        }

        newAddresses = await UserAddress.findOneAndUpdate({ user: userId }, { addresses: newAddress }, {
            new: true,
            runValidators: true,
        });
    }

    return res.status(200).json(newAddresses);

}

