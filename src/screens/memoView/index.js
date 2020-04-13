import React, { Component } from 'react';
import { StyleSheet, Clipboard, Alert, Share } from 'react-native';
//import {Icon} from 'react-native-vector-icons';
import { observer, inject } from 'mobx-react';
import {
  Button,
  Content,
  Container,
  Text,
  List,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Header,
  Icon,
  Title,
} from 'native-base';
//import ShareAction from './ShareAction';

class MemoView extends Component {
  render() {
    const { memoStore } = this.props.store;
    const index = this.props.navigation.getParam('otherParam', 1);
    const result2 = memoStore.memoArray[index].content.slice();
    return (
      <Container style={styles.container}>
        <Content>
          <Header style={{ backgroundColor: 'white' }} androidStatusBarColor="grey">
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon type="Ionicons" name="ios-arrow-back" style={{ color: 'black' }} size={35} />
              </Button>
            </Left>
            <Body style={{ alignContent: 'center', marginLeft: 50 }}>
              <Title style={styles.headerText}>{memoStore.memoArray[index].name}</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.contentHandler.bind(this, result2)}>
                <Icon type="MaterialIcons" name="content-copy" style={{ color: 'black' }} size={35} />
              </Button>
            </Right>
            <Right />
            <Left />
          </Header>
          <Text>{memoStore.memoArray.content}</Text>
          <List dataArray={memoStore.memoArray[index].content.slice()} renderRow={this.renderItem} />
        </Content>
      </Container>
    );
  }
  renderItem = memo => {
    console.log('In render', memo);
    return (
      <Content>
        <Text>{memo}</Text>
      </Content>
    );
  };
  contentHandler(result) {
    Share.share({
      message: JSON.stringify(result),
    }).then(({ action, activityType }) => {
      if (action === Share.sharedAction) console.log('Share was successful');
      else console.log('Share was dismissed');
    });
  }
  // () => this.props.navigation.navigate('ShareAction',{result:result2})
}
export default inject('store')(observer(MemoView));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginLeft: 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006fa4',
  },
});
