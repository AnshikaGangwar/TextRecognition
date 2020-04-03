import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import {
  Button,
  Content,
  Container,
  Text,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Header,
  Icon,
  Title,
  List,
  FlatList,
  Form,
  Input,
  Item,
} from 'native-base';
import { Overlay } from 'react-native-elements';

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    editName: '',
    viewList: false,
  };
  handleChange = name => {
    this.setState({ editName: name });
  };
  handleViewListChange = () => {
    let currentView = !this.state.viewList;
    this.setState({ viewList: currentView });
  };

  render() {
    const { memoStore } = this.props.store;
    {
      console.log('memo', memoStore.memoArray.slice());
    }
    if (this.state.viewList === true) {
      return (
        <Container style={styles.container}>
          <Content>
            <Header style={{ backgroundColor: 'white' }} androidStatusBarColor="white">
              <Body>
                <Title style={styles.headerText}>TEXT RECOGNITION</Title>
              </Body>
            </Header>
            <View style={{ flexDirection: 'row', flex: 1, alignContent: 'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
                <Icon
                  type="Entypo"
                  name="camera"
                  style={styles.iconImage}
                  //onPress={() => this.props.navigation.navigate('Camera')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleViewListChange}>
                <Icon
                  type="Entypo"
                  name="documents"
                  style={styles.iconImage}
                  //onPress={() => this.props.navigation.navigate('Camera')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => memoStore.clear()}>
                <Icon type="AntDesign" name="delete" style={styles.iconImage} />
              </TouchableOpacity>
            </View>
            <List dataArray={toJS(memoStore.memoArray)} renderRow={this.renderItem} />
            <Overlay
              isVisible={memoStore.overlayVisible}
              overlayBackgroundColor="white"
              width="80%"
              height="60%"
              onBackdropPress={() => memoStore.overlayFalse()}
            >
              <Form>
                <Item>
                  <Input placeholder="Title" onChangeText={this.handleChange} />
                </Item>
                <Button style={{ backgroundColor: '#006fa4' }} onPress={() => memoStore.editName(this.state.editName)}>
                  <Text>Ok</Text>
                </Button>
              </Form>
            </Overlay>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container style={styles.container}>
          <Content>
            <Header style={{ backgroundColor: 'white' }} androidStatusBarColor="grey">
              <Body>
                <Title style={styles.headerText}>Text Recognition</Title>
              </Body>
            </Header>
            <View style={{ flexDirection: 'row', flex: 1, alignContent: 'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
                <Icon
                  type="Entypo"
                  name="camera"
                  style={styles.iconImage}
                  //onPress={() => this.props.navigation.navigate('Camera')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleViewListChange}>
                <Icon
                  type="Entypo"
                  name="documents"
                  style={styles.iconImage}
                  //onPress={() => this.props.navigation.navigate('Camera')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => memoStore.clear()}>
                <Icon type="AntDesign" name="delete" style={styles.iconImage} />
              </TouchableOpacity>
            </View>
            <View>
              <Image
                source={require('../../../images/text-message-chat.jpg')}
                style={styles.textImage}
                resizeMode="contain"
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ ...styles.headerText, alignContent: 'center', marginTop: 90, fontSize: 40 }}>
                Text From Image
              </Text>
            </View>
          </Content>
        </Container>
      );
    }
  }

  renderItem = (memo, x, index, z) => {
    const { memoStore } = this.props.store;
    return (
      <Card style={{ flex: 0, borderRadius: 3, marginLeft: 10, marginRight: 10 }}>
        <CardItem
          button
          style={{ margin: 4 }}
          onPress={() =>
            this.props.navigation.navigate('MemoView', {
              otherParam: index,
            })
          }
        >
          <Left>
            <Button onPress={() => memoStore.overlayTrue(index)} style={{ color: '#006fa4' }} size={32}>
              <Icon active type="FontAwesome5" name="pen-square" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.text}>{memo.name}</Text>
          </Body>
          <Right>
            <Button onPress={() => memoStore.delete(index)} style={{ color: '#006fa4' }}>
              <Icon active name="trash" />
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  };
}
export default inject('store')(observer(Welcome));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#9b009b',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  iconImage: {
    flex: 0,
    fontSize: 40,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    color: '#006fa4',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006fa4',
  },
  textImage: {
    height: 300,
    width: 352,
    marginHorizontal: 2,
    borderRadius: 4,
  },
});
