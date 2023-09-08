import React from 'react'
import Stack from '@mui/material/Stack';

import { Divider, Grid, Segment, Icon, Checkbox, Input, Button } from 'semantic-ui-react'
import SearchTabs from '../tabs/SearchTabs';
import { regularApiRequest } from '../api/regularApiRequest';
import { base_url } from '../..';
import { showToast } from '../../App';

const SearchPage = () => {
    const [searchData, setSearchData] = React.useState(null)
    const [searchText, setSearchText] = React.useState('')

    const handleTextChange = (e) => {
        setSearchText(e.target.value)
    }


    const filteredSearch = async () => {
        const response = await regularApiRequest({
            url: `${base_url}search?keyword=${searchText}`,
            method: 'GET',
        })

        if (response.status === 200) {
            setSearchData(response.data)
            console.log(response.data)
        } else {
            showToast('something went wrong', 'error')
        }
    }


    return (
        <div className='ms-3'>



            <Grid columns={2} >


                <Grid.Row>
                    <Grid.Column width={3}>
                        <h3> <Icon name='filter' /> Filters</h3>
                        <Divider />

                        <Input onChange={handleTextChange} fluid loading={false} placeholder='Search...' />


                        <Button onClick={filteredSearch} fluid className='mt-3' >Search</Button>


                        <h4> Resources</h4>

                        <Stack spacing={2}>
                            <Checkbox label='Agency' />
                            <Checkbox label='Company' />
                            <Checkbox label='Estimation' />
                            <Checkbox label='Request' />
                            <Checkbox label='Employee' />
                            <Checkbox label='User' />
                        </Stack>


                        <h4> Tags</h4>

                        <Stack spacing={2}>
                            map ehre
                        </Stack>








                    </Grid.Column>


                    <Grid.Column width={13}>
                        {searchData &&
                            <SearchTabs searchData={searchData} />
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>


        </div>
    )
}

export default SearchPage