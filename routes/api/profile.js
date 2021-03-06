const express = require('express');
const request = require('request');
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

    profileFillIn.social = {};
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

//  @route   GET api/profile
//  @desc    Get all profiles
//  @access  Public

router.get('/', async (req,res)=>{
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('~server error~')
    }
});

//  @route   GET api/profile/user/:user_id
//  @desc    Profile by user ID
//  @access  Public

router.get('/user/:user_id', async (req,res)=>{
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', 
        ['name', 'avatar']);
        
        if(!profile) return res.status(400).json({ msg:'~profile not found~' })

        res.json(profile)
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(400).json({ msg:'~profile not found~' })
        }
        res.status(500).send('~server error~')
    }
});

//  @route   DELETE api/profile
//  @desc    Delete profile, user, & posts
//  @access  Private

router.delete('/', auth, async (req,res)=>{
    try {
        // @todo - remove user posts

        // remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        
        // remove user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: '~user deleted~'})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('~server error~')
    }
});

//  @route   PUT api/profile/experience
//  @desc    Add profile experience
//  @access  Private


router.put('/experience', 
[
    auth,
    [
        check('title', '~title is required~').not().isEmpty(),
        check('company', '~company is required~').not().isEmpty(),
        check('from', '~from date is required~').not().isEmpty(),
    ]
], 
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp ={
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('~server error~')
        
    }
});

//  @route   DELETE api/profile/experience
//  @desc    Delete experience from profile
//  @access  Private

router.delete('/experience/:exp_id', auth, async(req,res)=>{
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id });

        foundProfile.experience = foundProfile.experience.filter(exp => exp._id.toString() !== req.params.exp_id);

        await foundProfile.save();
        return res.status(200).json(foundProfile);
    } catch (err) {
        console.error(error);
        return res.status(500).json({msg: '~server error~'})
    }
})
//  @route   PUT api/profile/education
//  @desc    Add profile education
//  @access  Private


router.put('/education', 
[
    auth,
    [
        check('school', '~school is required~').not().isEmpty(),
        check('degree', '~degree is required~').not().isEmpty(),
        check('fieldofstudy', '~fiel of study is required~').not().isEmpty(),
        check('from', '~from date is required~').not().isEmpty(),
    ]
], 
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu ={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('~server error~')
        
    }
});

//  @route   DELETE api/profile/education
//  @desc    Delete education from profile
//  @access  Private

router.delete('/education/:edu_id', auth, async(req,res)=>{
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        
        // remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
      
        profile.education.splice(removeIndex, 1);
            await profile.save();

            return res.status(200).json(profile);

    } catch (err) {
        console.error(err);
        return res.status(500).json({msg: '~server error~'})
    }
});

//  @route   GET api/profile/github/:username
//  @desc    Get user repos from Github
//  @access  Public

router.get('/github/:username',(req,res)=>{
    try {
        const options ={
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method:'GET',
            headers: { 'user-agent':'node.js' }
        };
        request(options, (error, response, body) =>{
            if(error) console.error(error);

            if(response.statusCode !== 200){
               return res.status(404).json({msg: '~no github profile found~'})
            }
            res.json(JSON.parse(body))
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({msg: '~server error~'})
    }
})

module.exports = router;
