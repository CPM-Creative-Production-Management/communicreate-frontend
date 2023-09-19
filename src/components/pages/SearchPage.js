import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';

import { Divider, Grid, Icon, Checkbox, Input, Button } from 'semantic-ui-react'
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

        // construct the url based on the selected resources and tags  and search text
        const url = `${base_url}search?keyword=${searchText}&filter=${resources.join('&filter=')}&tag=${selectedTags.join('&tag=')}`

        console.log('search url', url)

        const response = await regularApiRequest({
            url: url,
            method: 'GET',
        })

        if (response.status === 200) {
            setSearchData(response.data)
            console.log(response.data)
        } else {
            showToast('something went wrong', 'error')
        }
    }

    const [tags, setTags] = useState([])

    const getTags = async () => {
        const response = await regularApiRequest({
            url: base_url + 'tag',
            method: 'GET',
        })

        if (response.status === 200) {
            setTags(response.data)
        } else {
            showToast('error loading tags', 'error')
        }

    }

    useEffect(() => {

        getTags()

    }, [])

    const [resources, setResources] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);


    const handleResourceChange = (e, { name, checked }) => {
        // console.log(checked);
        // make the name lower case
        name = name.toLowerCase();

        if (checked) {
            setResources([...resources, name]);
        } else {
            setResources(resources.filter((resource) => resource !== name));
        }

        console.log(resources);
    };

    const handleTagChange = (id) => {
        if (selectedTags.includes(id)) {
            setSelectedTags(selectedTags.filter((tag) => tag !== id));
        } else {
            setSelectedTags([...selectedTags, id]);
        }
    };

    useEffect(() => {
        console.log(resources);
        console.log(selectedTags);
    }, [resources, selectedTags]);


    return (
        <div className='ms-3'>



            <Grid columns={2} >


                <Grid.Row>
                    <Grid.Column width={3}>
                        <h3> <Icon name='filter' /> Filters</h3>
                        <Divider />

                        <Input onChange={handleTextChange} fluid loading={false} placeholder='Search...' />


                        <Button onClick={filteredSearch} fluid className='mt-3'>Search</Button>


                        <h4> Resources</h4>

                        <Stack spacing={2}>

                            <Checkbox onChange={handleResourceChange} label='Agency' name='Agency' />
                            <Checkbox onChange={handleResourceChange} label='Ongoing Project' name='Estimation' />
                            <Checkbox onChange={handleResourceChange} label='Request' name='Request' />
                            <Checkbox onChange={handleResourceChange} label='Employee' name='Employee' />

                        </Stack>


                        <h4> Tags</h4>

                        <Stack spacing={2}>
                            {tags.tags?.map((tag) => {
                                return (
                                    <Checkbox onChange={() => {
                                        handleTagChange(tag.id)
                                    }} label={tag.tag} />
                                )
                            })}
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