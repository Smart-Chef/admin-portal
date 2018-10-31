import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props) {
  const { classes, name, data } = props;

  if (Object.keys(data).length === 0)
    return;

  return (
    <Paper className={classes.root}>
    <Typography variant="h6" color="inherit">
        {name}
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell numeric>ID</TableCell>
            <TableCell>Subscriber</TableCell>
            <TableCell>Action Key</TableCell>
            <TableCell>Action Params</TableCell>
            <TableCell>Trigger Keys</TableCell>
            <TableCell>Trigger Params</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data.items).map(key => {
            const row = data.items[key];
            return (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.subscriber}</TableCell>
                <TableCell>{row.action_key}</TableCell>
                <TableCell>{row.action_params}</TableCell>
                <TableCell>{row.trigger_keys.toString()}</TableCell>
                <TableCell>{row.trigger_params.toString()}</TableCell>
                <TableCell>{row.created_at}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
