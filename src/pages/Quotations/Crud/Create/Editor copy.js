import React, { Component } from "react"
// Form Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"


class FormEditors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }

    render() {
        return (
            <React.Fragment>
                <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                />
            </React.Fragment>
        )
    }
}

export default FormEditors
