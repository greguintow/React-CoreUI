import React, {Component} from 'react'
import { Line } from 'react-chartjs-2'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import {
  Card,
  CardBody
} from 'reactstrap'
import moment from 'moment'

import './style.scss'

const backOption = {
  maintainAspectRatio: false,
  // tooltips: {
  //   enabled: false,
  //   custom: CustomTooltips
  // },
  legend: {
    display: false,
    position: 'bottom'
  },
  elements: {
    line: {
      tension: 0, // disables bezier curves,
    }
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: false,
        borderDash: [2,3,4],
      },
      ticks: {
      }
    }]
  },
  layout: {
    padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
  }
}


class DashBoardChart extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }


  componentDidMount(){
    // this.props.DashboardActions.getBankAccountTypes().then(firstAccount => {
    //   this.getBankAccountGraphData(firstAccount, 12)
    // })
  }

  getBankAccountGraphData(account, dateRange){
    // this.props.DashboardActions.getBankAccountGraphData(account, dateRange)
  }

  render() {
    const line = {
      labels:  ['19.Jan', '20.Jan', '21.Jan', '22.Jan', '23.Jan', '24.Jan', '25.Jan', '26.Jan', '27.Jan', '28.Jan', '29.Jan', '30.Jan', '31.Jan'],
      datasets: [
        {
          label: [],
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'white',
          borderColor: '#613BEA',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'white',
          pointBackgroundColor: '#613BEA',
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#613BEA',
          pointHoverBorderColor: 'white',
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 20,
          data: [12, 19, 3, 5, 2, 3, 0, 0, 0, 0, 0, 0, 0],
        }
      ]
    }

    return (
      <div className="animated fadeIn">
        <Card className="bank-card">
          <CardBody className="tab-card">
            <div className="flex-wrapper">
              <div className="chart-wrapper" style={{width: '100%', height: this.props.height}}>
                <Line data={line} options={backOption} datasetKeyProvider={() => {return Math.random()}}/>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default DashBoardChart