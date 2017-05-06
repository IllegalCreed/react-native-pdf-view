'use strict';
import React,{ Component, PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

class PDFView extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  _onChange(event:Event) {
    this.props.onLoadComplete && this.props.onLoadComplete(Number(event.nativeEvent.message));
  }

  _onSelect(event) {
    this.props.onPageChange && this.props.onPageChange(Number(event.nativeEvent.message));
  }

  render() {
    return <PDFCustomView ref={component => this._root = component} {...this.props} onChange={this._onChange} onSelect={this._onSelect}/>;
  }
}

PDFView.propTypes = {
  ...View.propTypes,
    asset: PropTypes.string,
    src: PropTypes.string,
    pageNumber: PropTypes.number,
    path: PropTypes.string,
    zoom: PropTypes.number,
    onLoadComplete: PropTypes.func,
    onPageChange: PropTypes.func
};

var PDFCustomView = requireNativeComponent('RCTPDFViewAndroid', PDFView, {
  nativeOnly: {onChange: true}
});

export default PDFView;
