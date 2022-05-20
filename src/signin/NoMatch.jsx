import {Link} from "react-router-dom";
import {Component} from "react";

class NoMatch extends Component {
    // constructor(props) {
    //     super(props);
    // }

    // componentDidMount() {
    //     fetch("http://localhost:8550/hack/logendpoint")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 console.log("called endpoint");
    //             },
    //             // Note: it's important to handle errors here
    //             // instead of a catch() block so that we don't swallow
    //             // exceptions from actual bugs in components.
    //             (error) => {
    //                 console.log("some error has been encountered " + JSON.stringify(error));
    //             }
    //         )
    // }

    render() {
        return (
            <div style={
                {
                    // backgroundImage: `url(${background})`,
                    // backgroundRepeat: 'round',
                    // flexGrow: 1,
                    // minHeight: '100vh',
                    // minWidth: '100vw',
                    textAlign: 'center'
                }
            }>
                <h2>Sometimes things just don't go as planned.</h2>
                <p>
                    Please try the <Link to="/">home page</Link> or select one of the links above.
                </p>
            </div>
        );
    }
}

export { NoMatch };
