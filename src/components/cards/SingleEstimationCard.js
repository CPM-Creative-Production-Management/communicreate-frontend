import React, { useEffect } from 'react'
import { Button, Card, Divider, Icon, Image, Label, List, Progress } from "semantic-ui-react";
import { Dialog, DialogContent, DialogTitle, SwipeableDrawer } from "@mui/material";
import { regularApiRequest } from '../api/regularApiRequest';
import { base_url } from '../..';
import { globalLoading, showToast } from '../../App';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateEstimation } from "../../actions";
import WriteReviewModal from '../modals/WriteReviewModal';
import SeeReviewModal from '../modals/SeeReviewModal';
import { ProgressBar } from 'react-bootstrap';

export const SingleEstimationCard = ({ estimationData, isRejected, isOngoing, isArchived, isAgencyArchive, isClientView }) => {
    const [showDetails, setShowDetails] = React.useState(false)
    const [showWriteReviewModal, setShowWriteReviewModal] = React.useState(false)
    const [showSeeReviewModal, setShowSeeReviewModal] = React.useState(false)
    const [reviewData, setReviewData] = React.useState({})
    const [writeReviewModalData, setWriteReviewModalData] = React.useState({})
    const navigate = useNavigate()

    const acceptReq = async (reqId) => {
        // await regularApiRequest({
        //     url: `${base_url}request/${reqId}/accept`,
        //     method: 'POST'
        // })
        // showToast('Request accepted', 'success')
        // window.location.reload()
    }

    function getStatus(status) {
        if (status === 0) {
            return (
                <Label as='a' basic color='red' pointing>
                    Pending
                </Label>
            );
        } else if (status === 1) {
            return (
                <Label as='a' basic color='blue' pointing>
                    Pending Approval
                </Label>
            );
        } else if (status === 2) {
            return (
                <Label as='a' basic color='green' pointing>
                    Approved
                </Label>
            );
        }
        return null;
    }

    const [currProgress, setCurrProgress] = React.useState(0)

    useEffect(() => {
        if (estimationData.Estimation) {
            // set the progress percentage based on the tasks
            const tasks = estimationData.Estimation.Tasks
            let completed = 0
            tasks.forEach(task => {
                if (task.status === 2) {
                    completed += 1
                }
            })
            setCurrProgress((completed / tasks.length) * 100)
        }
    }, [estimationData]);




    return (
        <div>
            <Card fluid>
                <Card.Content>


                    {/*<Button onClick={() => {*/}
                    {/*    setShowDetails(true)*/}
                    {/*}} icon labelPosition='left' floated='right' primary>*/}
                    {/*    <Icon name='list alternate outline'/>*/}
                    {/*    View Details*/}
                    {/*</Button>*/}

                    {(isOngoing || isAgencyArchive) && estimationData.estimationExists && !isClientView &&
                        <Button positive onClick={() => {
                            navigate(`/edit-estimation/${estimationData.Request.id}`)
                        }} primary icon labelPosition='left' floated='right'>
                            <Icon name='edit' />
                            View Estimation
                        </Button>}

                    {((isArchived && !isAgencyArchive) || isClientView) &&
                        <Button positive onClick={() => {
                            navigate(`/request/${estimationData.Request.id}/agency/${estimationData.AgencyId}/estimation`)
                        }} primary icon labelPosition='left' floated='right'>
                            <Icon name='edit' />
                            View Estimation
                        </Button>}

                    {isArchived && !isOngoing && !isAgencyArchive && !estimationData.Review &&
                        <Button positive onClick={() => {
                            const data = {
                                requestId: estimationData.Request.id,
                                agencyId: estimationData.AgencyId
                            }
                            setWriteReviewModalData(data)
                            setShowWriteReviewModal(true)

                        }} primary icon labelPosition='left' floated='right'>
                            <Icon name='edit' />
                            Write Review
                        </Button>}

                    {estimationData.Review &&
                        <Button positive onClick={() => {
                            const review = estimationData.Review
                            const company = estimationData.Company
                            const reviewData = { review, company }
                            console.log('here')
                            console.log(reviewData)
                            setReviewData(reviewData)
                            setShowSeeReviewModal(true)
                        }} primary icon labelPosition='left' floated='right'>
                            <Icon name='edit' />
                            See Review
                        </Button>}


                    <Card.Header>{estimationData.Request.name}</Card.Header>
                    <Card.Meta>{estimationData.Company.name}</Card.Meta>
                    <Card.Description>
                        {estimationData.Request.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Label>
                        <Icon name='clock outline' /> Deadline
                        <Label.Detail>{estimationData.Request.comp_deadline}</Label.Detail>
                    </Label>

                    {isArchived &&
                        <Label>
                            <Icon name='money bill alternate outline' /> Cost
                            <Label.Detail>{estimationData.Estimation.cost}</Label.Detail>
                        </Label>}


                </Card.Content>

                <div className='ms-3 me-3'>
                {currProgress}% Completed

                <ProgressBar variant="success" animated  className='mt-2' now={currProgress} /> 

                </div>
                {!isArchived && !isClientView && <Card.Content extra>
                    <List.Icon name='list alternate outline' size='large' verticalAlign='middle' />
                    Task List
                    <List divided animated relaxed>

                        {estimationData?.Estimation?.Tasks?.map((task, index) => {
                            return (
                                <List.Item>
                                    <List.Content>
                                        <List.Header>{index + 1}. {task.name}</List.Header>
                                        <List.Description>{task.description}</List.Description>
                                        <List.Description> {getStatus(task.status)}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        })

                        }


                    </List>

                </Card.Content>}




            </Card>

            <WriteReviewModal show={showWriteReviewModal} setShow={setShowWriteReviewModal} data={writeReviewModalData} />
            <SeeReviewModal show={showSeeReviewModal} setShow={setShowSeeReviewModal} data={reviewData} />
        </div>
    )
}

