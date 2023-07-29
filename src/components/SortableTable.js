import _ from 'lodash'
import React from 'react'
import {Button, Table, Image, Header} from 'semantic-ui-react'
import {Stack} from "@mui/material";

function employeeReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_SORT':
            if (state.column === action.column) {
                return {
                    ...state,
                    data: state.data.slice().reverse(),
                    direction:
                        state.direction === 'ascending' ? 'descending' : 'ascending',
                }
            }

            return {
                column: action.column,
                data: _.sortBy(state.data, [action.column]),
                direction: 'ascending',
            }
        default:
            throw new Error()
    }
}

function SortableTable({tableData}) {
    const [state, dispatch] = React.useReducer(employeeReducer, {
        column: null,
        data: tableData,
        direction: null,
    })
    const {column, data, direction} = state

    const removeEmployeeFromTask = (index) => {
        console.log(index)

    }

    return (
        <Table sortable celled padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                    >
                        Remove
                    </Table.HeaderCell>

                    <Table.HeaderCell
                        sorted={column === 'assignee' ? direction : null}
                        onClick={() => dispatch({type: 'CHANGE_SORT', column: 'assignee'})}
                    >
                        Assignee
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'rating' ? direction : null}
                        onClick={() => dispatch({type: 'CHANGE_SORT', column: 'rating'})}
                    >
                        Rating
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'cost' ? direction : null}
                        onClick={() => dispatch({type: 'CHANGE_SORT', column: 'cost'})}
                    >
                        Cost
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((currItem, index) => (
                    <Table.Row key={currItem.id}>
                        <Table.Cell width={1}>
                            <Button negative onClick={() => {
                                removeEmployeeFromTask(index)
                            }} size={"tiny"} circular icon='close'/>

                        </Table.Cell>

                        {/*<Table.Cell textAlign={'center'} width={6}>*/}
                        {/*    <Stack direction="row" spacing={1}>*/}
                        {/*        <Image src={currItem.assigneeImgUrl} size='mini'*/}
                        {/*               circular/> &nbsp;&nbsp;&nbsp;<div className={'mt-2'}> {currItem.assignee}</div>*/}
                        {/*    </Stack>*/}
                        {/*</Table.Cell>*/}

                        <Table.Cell>
                            <Header as='h4' image>
                                <Image src={currItem.assigneeImgUrl} size='mini'
                                       circular/><Header.Content>
                                {currItem.assignee}
                                    <Header.Subheader>Graphic Design</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>

                        <Table.Cell singleLine width={3}>{currItem.rating}</Table.Cell>
                        <Table.Cell singleLine width={3}>{currItem.cost} ৳</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default SortableTable