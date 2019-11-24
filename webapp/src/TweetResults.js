import React, { Component } from 'react';
import TableFilter from 'react-table-filter';
class TweetResults extends Component {
    constructor(props) {
        super(props)
        const data = this.props.data.tweets.map(function(item) {
            return {
                poi_name : item.poi_name,
                tweet_date : item.tweet_date,
                tweet_text : item.tweet_text,
                country : item.country,
                verified : (item.verified ? "true" :"false")
            }
        });
        this.state = {"data" : data}
        this._filterUpdated = this._filterUpdated.bind(this);
    }
    _filterUpdated(newData, filtersObject) {
        this.setState({
          'data': newData,
        });
      }
    render() {
        var output;
        if(this.props.data.tweets.length > 0) {
        var data = this.state.data
        const elementsHtml = data.map((item, index) => {
            return (
              <tr key={'row_'+index}>
                <td className="cell">
                  { item.tweet_date }
                </td>
                <td className="cell">
                  { item.poi_name }
                </td>
                <td className="cell">
                  { item.country }
                </td>
                <td className="cell">
                  { item.verified }
                </td>
                <td className="cell">
                  { item.tweet_text }
                </td>
              </tr>
            );
          });
        output = (<table className="basic-table">
        <thead>
          <TableFilter
            rows={data}
            onFilterUpdate={this._filterUpdated}>
            <th key="tweet_date" filterkey="tweet_date" className="cell">
              Date
            </th>
            <th key="poi_name" filterkey="poi_name" className="cell">
              POI Name
            </th>
            <th key="country" filterkey="country" className="cell">
              Country
            </th>
            <th key="verified" filterkey="verified" className="cell">
              Verified
            </th>
            <th key="tweet_text" filterkey="tweet_text" className="cell">
              Tweet Text
            </th>
     
          </TableFilter>
        </thead>
        <tbody>
          { elementsHtml }
        </tbody>
      </table>)
        } else {
            output = (<h3>Nothing to display</h3>)
        }
        return (
            <div className = "TweetResults container">
                    {output}
            </div>
        )
    }
}
export default TweetResults;