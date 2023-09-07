import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { base_url, base_s3_url } from '../../..'
import ProfileBg from '../../../assets/profile-bg.jpg'
import { useApiRequest } from '../../api/useApiRequest'
import { Grid, Image, Divider, Icon,Message, Input, Button } from 'semantic-ui-react'
import Stack from '@mui/material/Stack'
import s3 from '../../../config/s3'
import { regularApiRequest } from '../../api/regularApiRequest'
import { showToast } from '../../../App'
import { Rating } from 'react-simple-star-rating'

const EmployeePage = () => {
    const { id } = useParams()

    const imageRef = React.useRef('')
    const nameRef = React.useRef('')
    const emailRef = React.useRef('')
    const phoneRef = React.useRef('')
    const addressRef = React.useRef('')
    const salaryRef = React.useRef('')
    const ratingRef = React.useRef('')


    const {data, dataLoading, error} = useApiRequest({
        url: base_url + 'employee/' + id,
        method: 'GET'
    })

    const autoFill = () => {
        nameRef.current.inputRef.current.value = data.name
        emailRef.current.inputRef.current.value = data.email
        phoneRef.current.inputRef.current.value = data.phone
        addressRef.current.inputRef.current.value = data.address
        salaryRef.current.inputRef.current.value = data.salary
        ratingRef.current.inputRef.current.value = data.rating
    }

    const handleSaveChanges = async () => {
        console.log('print')
        const name = nameRef.current.inputRef.current.value
        const email = emailRef.current.inputRef.current.value
        const phone = phoneRef.current.inputRef.current.value
        const address = addressRef.current.inputRef.current.value
        const salary = salaryRef.current.inputRef.current.value
        const rating = ratingRef.current.inputRef.current.value
        const file = imageRef.current.inputRef.current.files[0]
        const fileName = 'profile_pictures/employees/' + data.id + '.jpg'

        if (file) {
            try {
                const params = {
                    Bucket: 'cpm-backend',
                    Key: fileName,
                    Body: file,
                }
    
                setUploadingImg(true)
                s3.putObject(params).promise().then((res) => {
                    console.log('file uploaded', res)
                    setUploadingImg(false)
                    // window.location.reload()
                }).catch((err) => {
                    console.log('something wrong')
                    console.log(err)
                    setUploadingImg(false)
                })
            } catch (err) {
                console.log(err)
            }
        }

        const reqBody = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            salary: salary,
            rating: rating,
            profile_picture: base_s3_url + '/' + fileName
        }

        console.log(reqBody)

        try {
            const response = await regularApiRequest({
                url: base_url + 'employee/' + id,
                method: 'PUT',
                reqBody: reqBody
            })
            setSaveChanges(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (data) {
            autoFill()
        }
    }, [dataLoading])

    const [imageSrc, setImageSrc] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [saveChanges, setSaveChanges] = useState(false);

    useEffect(() => {
        if (saveChanges && !uploadingImg) {
            window.location.reload()
        }
    }, [saveChanges, uploadingImg])

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




  return (
    <div>
        <img alt='cover' className='cover-img' src={ProfileBg} /> 
        { data &&
            <div className='profile-cards'>
                <Grid columns={2}>
                    <Grid.Column width={4}>
                        <div className='profile-card'>
                        <center>
                            <Image circular style={{width: '100px', height: '100px' }} alt='profile' className='profile-img'
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

                                {data.Agency.name} <br />
                                {
                                    data.status === 0 &&
                                    <Message negative>
                                        <Message.Header>Newbie</Message.Header>
                                        <Message.Content>Has worked for less than 6 months</Message.Content>
                                    </Message>
                                }
                                {
                                    data.status === 1 &&
                                    <Message color='blue'>
                                        <Message.Header>Intermediate</Message.Header>
                                        <Message.Content>Has worked for over 6 months</Message.Content>
                                    </Message>
                                }
                                {
                                    data.status === 2 &&
                                    <Message positive>
                                        <Message.Header>Expert</Message.Header>
                                        <Message.Content>Has worked for over a year</Message.Content>
                                    </Message>
                                }
                            </div>


                        </center>
                        <Divider />

                        <div className='profile-card-content'>
                            <Stack direction="column" spacing={2}>
                                <Stack direction="row" spacing={2}>
                                    <Icon name='mail' />
                                    <p>{data.email}</p>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Icon name='phone' />
                                    <p>{data.phone}</p>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Icon name='map marker alternate' />
                                    <p>{data.address}</p>
                                </Stack>
                            </Stack>
                        </div>
                        </div>
                        <br />
                        <br />
                    </Grid.Column>

                    <Grid.Column width={11}>
                        <div className='profile-card'>
                            <div className='profile-card-content'>
                                <h3>Edit Profile</h3>
                                <p>Change the employee profile picture, name, email, and more.</p>
                            </div>

                            <Divider />

                            <h4>Personal Details</h4>
                            Change Profile Picture 
                            <center>
                                {imageSrc && (
                                    <Image circular className='profile-img'
                                        src={imageSrc}
                                        alt="Selected Image"
                                        style={{ width: '150px', height: '150px' }}
                                    />
                                )}
                            </center>
                            <br/>

                            <Input fluid type="file" onChange={handleFileChange} ref={imageRef}/>

                            <br />

                            <Stack direction="column" spacing={2}>
                                <Grid columns={2}>
                                    <Grid.Column>
                                        <Input fluid icon='user' iconPosition='left' placeholder='Name' ref={nameRef} />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Input ref={emailRef} fluid icon='mail' iconPosition='left' placeholder='Email' />
                                    </Grid.Column>
                                </Grid>
                                <Input ref={phoneRef} fluid icon='phone' iconPosition='left' placeholder='Phone' />
                                <Input ref={addressRef} fluid icon='map marker alternate' iconPosition='left' placeholder='Address' />
                                
                                <br/>
                                <Grid columns={2}>
                                    <Grid.Column>
                                        <Input ref={salaryRef} type='number' fluid icon='dollar sign' iconPosition='left' placeholder='Salary' />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Input ref={ratingRef} type='number' min='1' max='5' fluid icon='star' iconPosition='left' placeholder='Rating' />
                                    </Grid.Column>
                                </Grid>
                                <Button loading={uploadingImg} onClick={handleSaveChanges} color='blue' className='mt-3'>Save Changes</Button>
                            </Stack>
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
        }
        
    </div>
  )
}

export default EmployeePage