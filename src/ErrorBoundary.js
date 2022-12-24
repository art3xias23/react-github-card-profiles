import React from "react";

//Only class components, in this case App
//can have an ErrorBoundary
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
            return <h1>Ooops, something went wrong</h1>;
        }
        //Usually render children, in this case App
        return this.props.children;
    }
}

export default ErrorBoundary