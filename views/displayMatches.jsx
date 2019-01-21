var React = require('react');
var DefaultLayout = require('./layouts/defaultLayout');

class DisplayMatches extends React.Component {
    render() {


        const listOfMatches = this.props.matches.map( match => {

            return (
                <div className="container">
                    <div className="row border bg-light my-3 py-3">

                        <div className="col">
                            <img src={match.product_swatch_link} style={{maxHeight: '180px'}}/>
                            <li>Product Brand: {match.product_brand}</li>
                            <li>Product Shade Name: {match.product_shade_name}</li>
                            <li>Product Type: {match.product_type}</li>
                            <li>Product Price: ${match.product_price}</li>
                        </div>


                        <div className="col">
                            <img src={match.dupe_swatch_link} style={{maxHeight: '180px'}}/>
                            <li>Dupe Brand: {match.dupe_brand}</li>
                            <li>Dupe Shade Name: {match.dupe_shade_name}</li>
                            <li>Dupe Type: {match.dupe_type}</li>
                            <li>Dupe Price: ${match.dupe_price}</li>
                        </div>

                        <div className="col">
                            <p>Similarity: {match.similarity}%</p>
                        </div>

                    </div>

                </div>
                )
        })

        return (
                    <DefaultLayout>

                    <div>
                        <ul>{listOfMatches}</ul>
                    </div>

                    </DefaultLayout>
            )
    }
}

module.exports = DisplayMatches;