import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
type Props = {
  title: string;
  data: any[];
};
export function TaskInfoCard({ title, data }: Props) {
  return (
    <Card
      variant="elevation"
      sx={{
        minWidth: 178,
        maxWidth: 250,
        ml: 2,
        mr: 2,
      }}
    >
      <CardContent>
        <Typography textAlign="center" variant="subtitle1">
          Task statistics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">Completed</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="span" variant="body1" color="green">
              300 tasks
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Uncompleted</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="span" variant="body1" color="red">
              300 tasks
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Deadline</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="span" variant="body1" color="orange">
              300 tasks
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
