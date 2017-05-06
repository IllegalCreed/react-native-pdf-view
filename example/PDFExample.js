/**
 * Created by Kevin on 16/3/9.
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';

const pdfDownloadURL = 'http://image.tianjimedia.com/imagelist/2009/190/caq4z56jadof.pdf';

export default class PDFExample extends React.Component {
  state = {
    isPdfDownload: false,
  };

  constructor(props) {
    super(props);
    this.pdfView = null;
    this.pdfPath = RNFS.DocumentDirectoryPath + '/test.pdf';
    this.state = {
      currentPage: 0,
      pageCount: 0
    }
  }

  componentDidMount() {
    const options = {
      fromUrl: pdfDownloadURL,
      toFile: this.pdfPath
    };
    RNFS.downloadFile(options).promise.then(res => {
      this.setState({ isPdfDownload: true });
    }).catch(err => {
      console.log(err);
    });
  }

  zoom(val = 2.1) {
    this.pdfView && setTimeout(() => {
      this.pdfView.setNativeProps({ zoom: val });
    }, 3000);
  }

  render() {
    if (!this.state.isPdfDownload) {
      return (
        <View style={styles.container}>
          <Text>Downloading</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <PDFView ref={(pdf) => { this.pdfView = pdf; }}
          key="sop"
          path={this.pdfPath}
          onPageChange={currentPage => this.setState({ currentPage })}
          onLoadComplete={(pageCount) => {
            console.log(`total page count: ${pageCount}`);
            this.setState({ pageCount })
            this.zoom();
          }}
          style={styles.pdf} />
        <Text style={{
          position: 'absolute',
          top: 35,
          left: 20
        }}>
          {this.state.currentPage + '/' + this.state.pageCount}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pdf: {
    flex: 1
  }
});
