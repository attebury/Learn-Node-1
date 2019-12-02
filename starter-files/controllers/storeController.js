const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.homePage = (req, res) => {
    console.log(req.name);
    res.render('index')
}

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' })
}

exports.createStore = async (req, res) => {
    const store = await (new Store(req.body)).save()
    req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`)
    console.log('It worked!')
    res.redirect(`/store/${store.slug}`)
}

exports.getStores = async (req, res) => {
    // 1. Query database for a list of all stores
    const stores = await Store.find()
    console.log(stores)
    res.render('stores', { title: 'Stores', stores })
}

exports.editStore = async (req, res) => {
    // 1. Find the store given the id
    const store = await Store.findOne({ _id: req.params.id })
    // 2. Confirm they're the owner of the store
    // 3. Render out the edit form so the user can update their store
    res.render('editStore', { title: `Edit ${store.name}`, store})

}

exports.updateStore = async (req, res) => {
    // 1. Find and update the store
    // findOneAndUpdate(q, data, options)
    // new: true returns the new store instead of the old one
    // 
    const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true}).exec()
    req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`)
    res.redirect(`/stores/${store._id}/edit`)
    // 2. Redirect to the store and tell them it worked

}