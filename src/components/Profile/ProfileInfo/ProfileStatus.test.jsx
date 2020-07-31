//npm i react-test-renderer@16.13.1 --save-dev
//нужно устанавливать той же версии что и react в package.json "react": "^16.13.1",
import React from 'react';
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status should be in state", () => {
        const component = create(<ProfileStatus status="gala test ProfileStatus" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("gala test ProfileStatus");
    });

    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatus status="gala test ProfileStatus" />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation span with correct status should be displayed", () => {
        const component = create(<ProfileStatus status="gala test ProfileStatus" />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe("gala test ProfileStatus");
    });

    test("after creation input shouldn`t be displayed", () => {
        const component = create(<ProfileStatus status="gala test ProfileStatus" />);
        const root = component.root;
        expect(() => {
            root.findByType("input")
        }).toThrow();
    });

    test("input should be displayed in edit mode insted of span", () => {
        const component = create(<ProfileStatus status="gala test ProfileStatus" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input")
        expect(input.props.value).toBe("gala test ProfileStatus");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="gala test ProfileStatus" updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});