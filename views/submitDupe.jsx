var React = require('react');
var DefaultLayout = require('./layouts/defaultLayout');

class SubmitDupe extends React.Component {
    render() {


        return (

            <DefaultLayout>
                <p className="font-weight-normal" style={{fontSize: '24px'}}>Please log in to submit a dupe.</p>
            </DefaultLayout>

            )
    }
}

module.exports = SubmitDupe;