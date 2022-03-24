import React, { Fragment, useEffect, useState } from 'react'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import PropTypes from "prop-types"

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const FormEditors = ({ content, setContent }) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setContent(currentContentAsHTML)
    }

    useEffect(() => {
        setEditorState(() => EditorState.createWithContent(convertFromHTML(content)))
    }, [])


    return (
        <Fragment>
            <div className="db__column">
                <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    value={content ? content : ""}
                />
            </div>

        </Fragment>
    );
};

export default FormEditors;

FormEditors.propTypes = {
    content: PropTypes.string,
    setContent: PropTypes.func
}
