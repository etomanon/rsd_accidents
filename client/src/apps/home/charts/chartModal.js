import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import PieGraph from "./pieGraph";
import LineGraph from "./lineGraph";
// import { TABLES } from './utils';

function getModalStyle() {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    width: 'auto',
    height: '90%',
    overflow: 'auto',
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class ChartModal extends React.Component {
  render() {
    const { classes, showModal, modalToggle, chart } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={showModal}
        onClose={modalToggle}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <div className="text-center">
            <div className="small">Počet nehod je relativizovaný podle počtu dní (víkend - 2 dny, pracovní týden - 5 dní)</div>
            <div className="small mb-10">Typy komunikací jsou tříděny podle <a href="https://wiki.openstreetmap.org/wiki/Key:highway" rel="noopener noreferrer" target="_blank" >OpenStreetMap kategorií</a></div>
          </div>
          {
            chart.pie && chart.pie.map(chart => {
              const { title, data } = chart;
              return <PieGraph
                key={title}
                title={title}
                data={data}
              />
            })
          }
          {
            chart.line && <LineGraph
              title="Průběh nehodovosti během dne"
              data={chart.line}
            />
          }
        </div>
      </Modal>
    );
  }
}

const ChartModalWrapper = withStyles(styles)(ChartModal);

export default ChartModalWrapper;