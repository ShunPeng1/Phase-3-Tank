interface IUiClickable {

    isClicked: boolean;
    enterPressDownState(): void;
    enterPressUpState(): void;
}

export default IUiClickable;