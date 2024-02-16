module.exports = {
    isAuth: () => (req,res,next) => {
 
        if (req.user) {
            next();
        } else {
            res.status(401).json({message: 'Please login'})
        }
    },
    isGuest: () => (req,res,next) => {
        if (req.user) {
            res.status(400).json({message: 'You are already signed in'})
        } else {
            next()
        }
    },
    isOwner: ()  => (req,res,next) => {
        const listing = req.data

        if (req.user._id != listing._ownerId) {
            res.status(403).json({ message: 'You cannot modify this record.' })
        } else {
            next();
        }
    }
}