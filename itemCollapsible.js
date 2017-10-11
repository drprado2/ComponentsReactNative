import React from 'react'
import {Image, LayoutAnimation, NativeModules, Text, TouchableWithoutFeedback, View,} from 'react-native'

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true)

const customLayoutLinear = {
    duration: 250,
    create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
    },
    update: {
        type: LayoutAnimation.Types.linear,
    },
}

export default class ItemCollapsible extends React.Component {
    state = {
        isOpen: false
    }

    childrensHeight: 0

    componentWillUpdate(nextProps){
        let totalHeight = nextProps.childrensList.map(children => children.height).reduce((accumulator, currentValue) => accumulator + currentValue)
        this.childrensHeight = totalHeight
    }

    _toggleCollapsible = () => {
        LayoutAnimation.configureNext(customLayoutLinear)

        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }))

        if(this.props.toggleCollapsible !== undefined)
            this.props.toggleCollapsible();
    }

    _calculateComponentHeight = () => {
        const {itemsHeight} = this.props;
        return (
            this.state.isOpen ? itemsHeight + this.childrensHeight : itemsHeight
        )
    }

    _generateChildrensPresentation = () => {
        const {borderColor, childrensList} = this.props;
        return (
            childrensList !== undefined
                ? childrensList.map((children, index) =>
                    <View style={{
                        height: children.height,
                        borderColor: borderColor,
                        flex: 0,
                        justifyContent: 'flex-start',
                        borderBottomWidth: 1,
                    }}
                          key={index}
                    >
                        {children.component}
                    </View>
                )
                : null
        )
    }

    _renderLeftIcon = () => {
        return this.props.leftIcon !== undefined ? this.props.leftIcon : null
    }

    render() {
        const {itemsHeight, openIcon, closeIcon, title, backgroundColor, borderColor, fontColor} = this.props;
        const {isOpen} = this.state;
        const icon = isOpen ? openIcon : closeIcon;

        return (
            <View
                style={{
                    height: this._calculateComponentHeight(),
                    width: '100%',
                    flex: 0
                }}>
                <View >
                    <TouchableWithoutFeedback onPress={this._toggleCollapsible}
                                              style={{
                                                  height: '100%',
                                              }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            backgroundColor: backgroundColor,
                            borderColor: borderColor,
                            borderBottomWidth: 2,
                            alignItems: 'center',
                            opacity: isOpen ? 1 : 0.7
                        }}>
                            {this._renderLeftIcon()}
                            <Text style={{
                                paddingLeft: 10,
                                color: fontColor,
                                fontWeight: 'bold',
                                fontSize: 15,
                                flex: 1
                            }}>
                                {title}
                            </Text>
                            <Image
                                source={icon}
                                style={{width: itemsHeight - 3, height: itemsHeight - 3}}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    {this._generateChildrensPresentation()}
                </View>
            </View>
        )
    }
}
