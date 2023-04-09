#include "Element.h"
#include <iostream>

Element::StaticElement::StaticElement() {
    _pos.x = 0;
    _pos.y = 0;
    state = false;
}

Element::StaticElement::StaticElement(int x, int y) {
    _pos.x = x;
    _pos.y = y;
    state = false;
}

Position Element::StaticElement::get_position() {
    return _pos;
}

void Element::StaticElement::print_info() const {
    std::cout << "Destination -" << type << std::endl;
    std::cout << "Position - " << _pos.x << ", " << _pos.y << std::endl;
    std::cout << "State - " << state << std::endl << std::endl;
}

Element::BranchingPoint::BranchingPoint() : StaticElement() {
    state = STRAIGHT;
    type = "branching point";
}

Element::BranchingPoint::BranchingPoint(int x, int y) : StaticElement(x, y) {
    state = STRAIGHT;
    type = "branching point";
}

Element::Signal::Signal() : StaticElement() {
    state = OFF;
    type = "signal";
}

Element::Signal::Signal(int x, int y) : StaticElement() {
    state = OFF;
    type = "signal";
}
