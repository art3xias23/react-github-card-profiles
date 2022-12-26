import React from "react";
class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(error){
        //Update the state so the next render will show the fallback UI.
        return {hasError:true};
    }

    componentDidCatch(error, errorInfo){
        //Usually logs to a an error reporting service
        //logs the error to the console
        console.log(error, errorInfo)
    }

    render(){
        if(this.state.hasError){
            //Any custom UI could be rendered here
            return <h1>Caught a child rendering error in the console</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary