import React, { Component } from 'react';
import { connect } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';

class CodeMirrors extends Component {
  render() {
    const { fileContent } = this.props;
    return (
      <CodeMirror
        theme={oneDark}
        value={fileContent}
        height='1000px'
        options={{
          matchBrackets: true,
          tabSize: 2,
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fileContent: state.fileContent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CodeMirrors);
