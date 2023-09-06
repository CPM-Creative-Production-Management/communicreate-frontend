import React, { useEffect, useState } from 'react'
import ProfileBg from '../../assets/profile-bg.jpg'
import './pages.css'
import { Button, Card, Divider, Grid, Icon, Image, Input, Label, Message } from 'semantic-ui-react'
import { useApiRequest } from '../api/useApiRequest'
import { base_s3_url, base_url } from '../..'
import { Stack } from '@mui/material'
import s3 from '../../config/s3'
import { regularApiRequest } from '../api/regularApiRequest'
import { showToast } from '../../App'

const ProfilePage = () => {
    const nameRef = React.useRef('')
    const emailRef = React.useRef('')
    const phoneRef = React.useRef('')
    const addressRef = React.useRef('')
    const passwordRef = React.useRef('')
    const confirmPasswordRef = React.useRef('')

    const AssociationEmailRef = React.useRef('')
    const AssociationPhoneRef = React.useRef('')
    const AssociationDescriptionRef = React.useRef('')
    const AssociationAddressRef = React.useRef('')
    const AssociationWebsiteRef = React.useRef('')

    const imageRef = React.useRef('')

    const [imageSrc, setImageSrc] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const { data, dataLoading, error } = useApiRequest({
        url: base_url + 'account/profile',
        method: 'GET'
    })

    const autoFill = () => {
        nameRef.current.inputRef.current.value = data.name
        emailRef.current.inputRef.current.value = data.email
        phoneRef.current.inputRef.current.value = data.phone
        addressRef.current.inputRef.current.value = data.address

        AssociationEmailRef.current.inputRef.current.value = data.association.email
        AssociationPhoneRef.current.inputRef.current.value = data.association.phone
        AssociationDescriptionRef.current.inputRef.current.value = data.association.description
        AssociationAddressRef.current.inputRef.current.value = data.association.address
        AssociationWebsiteRef.current.inputRef.current.value = data.association.website
    }

    useEffect(() => {
        console.log(data)
        if (data)
            autoFill()
    }, [dataLoading])


    const handleSaveChanges = async () => {
        const name = nameRef.current.inputRef.current.value
        const email = emailRef.current.inputRef.current.value
        const phone = phoneRef.current.inputRef.current.value
        const address = addressRef.current.inputRef.current.value

        const AssociationEmail = AssociationEmailRef.current.inputRef.current.value
        const AssociationPhone = AssociationPhoneRef.current.inputRef.current.value
        const AssociationDescription = AssociationDescriptionRef.current.inputRef.current.value
        const AssociationAddress = AssociationAddressRef.current.inputRef.current.value
        const AssociationWebsite = AssociationWebsiteRef.current.inputRef.current.value

        const file = imageRef.current.inputRef.current.files[0]

        const fileName = 'profile_pictures/users/' + data.id + '.jpg'

        try {
            const params = {
                Bucket: 'cpm-backend',
                Key: fileName,
                Body: file
            }

            console.log('before s3 ', params)

            s3.putObject(params, function (err, data) {
                if (err) console.log(err); // an error occurred
            });

            console.log('after s3 ', params)

        } catch (err) {
            console.log(err)
        }


        const reqBody = {
            "name": name,
            "phone": phone,
            "email": email,
            "address": address,
            "profile_picture": base_s3_url +  '/' +  fileName,
            // "password": password,

            "association": {

                "description": AssociationDescription,
                "address": AssociationAddress,
                "email": AssociationEmail,
                "website": AssociationWebsite,
                "phone": AssociationPhone

            }
        }

        console.log(reqBody)

        const response = await regularApiRequest({
            url: base_url + 'account/profile',
            method: 'PUT',
            reqBody: reqBody
        })

        if (response.status === 200) {
            showToast('Profile updated successfully', 'success')
            window.location.reload()

        } else {
            showToast('Error updating profile', 'error')
        }

    }




    return (
        <div>
            <img alt='cover' className='cover-img' src={ProfileBg} />

            {data &&

                <div className='profile-cards'>

                    <Grid columns={2}>

                        <Grid.Column width={4}>
                            <div className='profile-card'>
                                <center>
                                    <Image circular style={{ maxWidth: '100%', maxHeight: '100%', width: '100px', height: '100px' }} alt='profile' className='profile-img'
                                        src={data.profile_picture ? data.profile_picture : 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'} />

                                    <div className='profile-card-content mt-3'>
                                        <h3>{data.name}</h3>
                                        {/* {data.associatedId === 1 &&

                                            <Label fluid basic color='blue'>
                                                <Icon name='briefcase' /> Association Client
                                            </Label>
                                        }
                                        {data.associatedId === 2 &&

                                            <Label color='blue'>
                                                <Icon name='briefcase' /> Agency Manager
                                            </Label>
                                        } <br /> */}

                                        {data.association.name} <br />

                                        <Message>{data.association.description}</Message>


                                    </div>


                                </center>
                                <Divider />

                                <div className='profile-card-content'>

                                    <Icon name='mail' /> {data.email}
                                    <p>{data.phone}</p>
                                    <p>{data.address}</p>

                                </div>

                            </div>
                            <br />
                            <br />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <div className='profile-card'>
                                <div className='profile-card-content'>
                                    <h3>Edit Profile</h3>
                                    <p>Change your profile picture, name, email, and more.</p>
                                    <Divider />


                                    <h4>Personal Details</h4>
                                    Change your profile picture
                                    <center>
                                        {imageSrc && (
                                            <Image circular className='profile-img'
                                                src={imageSrc}
                                                alt="Selected Image"
                                                style={{ width: '150px', height: '150px' }}
                                            />
                                        )}
                                    </center>
                                    <br />



                                    <Input fluid type="file" onChange={handleFileChange} ref={imageRef} />

                                    <br />




                                    <Stack direction="column" spacing={2}>
                                        <Grid columns={2}>
                                            <Grid.Column>

                                                <Input fluid icon='user' iconPosition='left' placeholder='Name' ref={nameRef} />
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Input disabled ref={emailRef} fluid icon='mail' iconPosition='left' placeholder='Email' />
                                            </Grid.Column>
                                        </Grid>
                                        <Input ref={phoneRef} fluid icon='phone' iconPosition='left' placeholder='Phone' />
                                        <Input ref={addressRef} fluid icon='map marker alternate' iconPosition='left' placeholder='Address' />
                                        {/* <Input ref={passwordRef} fluid icon='lock' iconPosition='left' placeholder='Password' />
                                        <Input ref={confirmPasswordRef} fluid icon='lock' iconPosition='left' placeholder='Confirm Password' /> */}

                                        <Divider />

                                        <h4>Association Details</h4>
                                        <br />

                                        <Grid columns={2}>
                                            <Grid.Column>
                                                <Input ref={AssociationEmailRef} fluid icon='mail' iconPosition='left' placeholder='Association Email' />
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Input ref={AssociationPhoneRef} fluid icon='phone' iconPosition='left' placeholder='Association Phone' />
                                            </Grid.Column>
                                        </Grid>

                                        <Input ref={AssociationDescriptionRef} fluid icon='edit' iconPosition='left' placeholder='Association Description' />
                                        <Input ref={AssociationAddressRef} fluid icon='map marker alternate' iconPosition='left' placeholder='Association Address' />
                                        <Input ref={AssociationWebsiteRef} fluid icon='globe' iconPosition='left' placeholder='Association Website' />

                                        <Button onClick={handleSaveChanges} color='blue' className='mt-3'>Save Changes</Button>

                                    </Stack>



                                </div>

                            </div>

                        </Grid.Column>
                    </Grid>




                </div>
            }
        </div>
    )
}

export default ProfilePage