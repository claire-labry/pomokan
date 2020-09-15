const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//  @route   GET api/profile/me
//  @desc    Get current users profile
//  @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: '~there is no profile for this user~' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('~server error~');
  }
});

//  @route   POST api/profile
//  @desc    Create or update user profile
//  @access  Private
router.post('/', [
  auth,
[
    check('status', '~status is required~').not().isEmpty(),
    check('skills', '~skills is required~').not().isEmpty()

    ],
],
async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        company, 
        website, 
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // build profile object
    const profileFillIn = {};
    profileFillIn.user = req.user.id;
    if(company) profileFillIn.company = company;
    if(website) profileFillIn.website = website;
    if(location) profileFillIn.location = location;
    if(bio) profileFillIn.bio = bio;
    if(status) profileFillIn.status = status;
    if(githubusername) profileFillIn.githubusername = githubusername;
    if(skills) {
        profileFillIn.skills = skills.split(',').map(skill => skill.trim());
    }
    profileFillIn.social ={};
    if(youtube) profileFillIn.youtube = youtube;
    if(facebook) profileFillIn.facebook = facebook;
    if(twitter) profileFillIn.twitter = twitter;
    if(instagram) profileFillIn.instagram = instagram;
    if(linkedin) profileFillIn.linkedin = linkedin;

    try {
        let profile = await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFillIn },
            {new: true, upsert: true}
        );
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('~server error~')
    }
}
);

module.exports = router;
