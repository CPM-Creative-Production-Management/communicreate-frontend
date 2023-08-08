import React from "react";
import "./card.css"
import {Card, Icon} from "semantic-ui-react";
import {showToast} from "../../App";
// import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

export const DashboardCard = ({iconName, colorName, cardHeader, cardDesc, count}) => {

    return (
        <div>

            {/*<Card sx={{ maxWidth: 345 }}>*/}
            {/*    <CardActionArea>*/}
            {/*        <CardMedia*/}
            {/*            component="img"*/}
            {/*            height="140"*/}
            {/*            image="/static/images/cards/contemplative-reptile.jpg"*/}
            {/*            alt="green iguana"*/}
            {/*        />*/}
            {/*        <CardContent>*/}
            {/*            <Typography gutterBottom variant="h5" component="div">*/}
            {/*                {cardHeader}*/}
            {/*            </Typography>*/}
            {/*            <Typography variant="body2" color="text.secondary">*/}
            {/*                {cardDesc}*/}
            {/*            </Typography>*/}
            {/*        </CardContent>*/}
            {/*    </CardActionArea>*/}
            {/*</Card>*/}

            <Card link fluid>
                <Card.Content>


                    {/*<div className='icon-bg'>*/}
                    {/*    <Icon size={"large"} color={colorName} name={iconName}/>*/}

                    {/*</div>*/}

                    <Icon circular inverted size={'large'} color={colorName} name={iconName}/>

                    <br/>
                    <br/>


                    <Card.Header>{cardHeader}</Card.Header>

                    {/*<Card.Meta>*/}
                    {/*    {cardDesc}*/}
                    {/*</Card.Meta>*/}
                </Card.Content>

                <Card.Content onClick={() => {
                    showToast(`${count} Estimations`, "success");
                }}>
                    <a>
                        <Icon name='calculator'/>
                        {count} Estimations


                        {/*<Icon style={{ 'text-align': 'end'}} name={'arrow right'}/>*/}
                    </a>

                </Card.Content>

            </Card>


        </div>
    );
}