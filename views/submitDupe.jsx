var React = require('react');
var DefaultLayout = require('./layouts/defaultLayout');

class SubmitDupe extends React.Component {
    render() {


        return (

            <DefaultLayout>
                <h2>Please <a href="/login">log in</a> to submit a dupe.</h2>
            </DefaultLayout>

            )
    }
}

module.exports = SubmitDupe;