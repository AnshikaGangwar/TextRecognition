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

class MemoView extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    msg: '',
  };
  onShare = async () => {
    //console.log({ memo });
    const data = this.state.msg;
    //alert({ data });
    try {
      const result = await Share.share({
        message: { data },
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          console.log('shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    const { memoStore } = this.props.store;
    const index = this.props.navigation.getParam('otherParam', 1);
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
              <Button
                transparent
                onPress={() => {
                  const memo = memoStore.memoArray[index].content;
                  this.setState({ msg: memo });
                  this.onShare();
                }}
              >
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
