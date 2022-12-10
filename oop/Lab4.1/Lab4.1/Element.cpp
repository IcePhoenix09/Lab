#include "Element.h"
#include <iostream>

StaticElement::StaticElement() {
    _pos.x = 0;
    _pos.y = 0;
    state = false;
}

StaticElement::StaticElement(int x, int y) {
    _pos.x = x;
    _pos.y = y;
    state = false;
}

Position StaticElement::get_position() {
    return _pos;
}

void StaticElement::print_info() const {
    std::cout << "Destination -" << type << std::endl;
    std::cout << "Position - " << _pos.x << ", " << _pos.y << std::endl;
    std::cout << "State - " << state << std::endl << std::endl;
}

BranchingPoint::BranchingPoint() : StaticElement() {
    state = STRAIGHT;
    type = "branching point";
}

BranchingPoint::BranchingPoint(int x, int y) : StaticElement(x, y) {
    state = STRAIGHT;
    type = "branching point";
}

Signal::Signal() : StaticElement() {
    state = OFF;
    type = "signal";
}

Signal::Signal(int x, int y) : StaticElement() {
    state = OFF;
    type = "signal";
}
