// checks user role
const role_check = (roles) => {
    return function (req, res, next) {
        try {
            // get role
            let ROLE = req.user.user_role

            // checking variable
            let hasRole = false;

            // if user role in allowed list, it's ok
            for (let i = 0; i < roles.length; i++) {
                if (ROLE === roles[i]) {
                    hasRole = true;
                }
            }

            // if role denied, send error
            if (!hasRole) {
                return res.status(403).json({message: "User have not access"})
            }

            // go next if ok
            next();
        } catch (error){
            return res.status(403).json({message: error.message})
        }
    }
};

export {role_check};

