import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
} from 'reactstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import StarRatings from 'react-star-ratings';
import { Loader } from 'components'
import { tableOptions } from 'constants/tableoptions'
import ReactTimeAgo from 'react-time-ago'
import ReactStarsRating from 'react-awesome-stars-rating';

import {getFeedbacks} from './actions'
import './style.scss'

const user = window.localStorage.getItem('userId')


const mapStateToProps = (state) => {
  return ({
    feedbacks: state.feedbacks.feedbacks
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators({ getFeedbacks }, dispatch),
  })
}

const MockFeedBack = [
  {id: "1",
  uniqid: "testing-uniqid",
  invoice_id: "testing-orderid",
  product_id: "testing-productid",
  user_id: "1",
  message: "feedback message",
  reply: "this is a reply",
  feedback: "neutral",
  date: "1583314021"}
]

class Feedbacks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }

    // this.initializeData = this.initializeData.bind(this)
    this.replyToFeedback = this.replyToFeedback.bind(this)
    this.renderOption = this.renderOption.bind(this)
  }

  componentDidMount () {
    this.props.actions.getFeedbacks()
  }

  

  renderThumb = (row) => {
    const item = this.props.feedbacks.filter(x => x.id == row)[0]
  
    return <ReactStarsRating isEdit={false} value={item.score || 5} isHalf={false} className="transparent-bg"/>
  }

  renderFeedback = (cell, row) => {
    return (
      <div className="d-flex flex-row align-items-center">
        <div>
          <p>{row.feedback}</p>
        </div>
      </div>
    )  
  }

  replyToFeedback(e, id) {
    this.props.history.push({
      pathname: `/dashboard/${user}/feedback/reply/${id}`
    })
  }

  renderOption (cell, row) {
    return (
      <Button color="default" onClick={(e) => this.replyToFeedback(e, row.uniqid)}>Reply</Button>
    )
  }

  renderTime(cell, row) {

    const formatDate = (timestamp) => {
      return <ReactTimeAgo date={timestamp*1000/1} locale="en"/>
    }
    if (
      row.created_at
    ) {
      
      return (
        <div>
          <p>{formatDate(row.created_at)}</p>
          {row.updated_at && row.updated_at !== row.created_at && <p>
            (updated {formatDate(row.updated_at)})
          </p>}
        </div>
      )
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  render() {
    const { loading } = this.state
    return (
      <div className="product-screen mt-2">
        <div className="animated fadeIn">
          <Card className="grey">
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={4}>
                  <h1>Feedback</h1>
                </Col>
                <Col md={8}>
                  
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="p-0">
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                :
                  <Row>
                    <Col lg={12}>
                      <div>
                        <BootstrapTable
                          options={ tableOptions() }
                          data={this.props.feedbacks}
                          version="4"
                          pagination
                          // totalSize={product_list ? product_list.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="title"
                            dataSort
                            width="20%"
                            dataFormat={this.renderFeedback}
                          >
                            Feedback
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="message"
                            dataSort
                            width = "30%"
                          >
                            Message
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="id"
                            dataSort
                            width="10%"
                            dataAlign="center"
                            dataFormat={this.renderThumb}
                          >
                            Rating
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="id"
                            dataSort
                            dataFormat={this.renderOption}
                          >
                            Option
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="time"
                            dataFormat={this.renderTime}
                            dataAlign="right"
                            dataSort
                          >
                            Time posted
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </Col>
                  </Row>
              }
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedbacks)
