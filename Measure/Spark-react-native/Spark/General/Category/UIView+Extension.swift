//
//  UIView+Extension.swift
//  Spark
//
//  Created by Tarun Sudhams on 21/2/2019.
//  Copyright © 2019 Tarun Sudhams. All rights reserved.
//


import UIKit

enum InsideLayout {
    static let `default`: [InsideLayout] = [.top, .bottom, .left, .right]
    case top
    case bottom
    case left
    case right
}

public protocol Then {}
extension Then where Self: AnyObject {
    public func then(_ block: (Self) -> Void) -> Self {
        block(self)
        return self
    }
}

extension NSObject: Then {}

extension UIView {
    func layoutInside(view: UIView, inset: UIEdgeInsets, options: [InsideLayout] = InsideLayout.default) {
        if options.contains(.top) {
            self.topAnchor.constraint(equalToSystemSpacingBelow: view.topAnchor, multiplier: inset.top)
        }
        if options.contains(.bottom) {
            self.bottomAnchor.constraint(equalToSystemSpacingBelow: view.bottomAnchor, multiplier: inset.bottom)
        }
        if options.contains(.left) {
            self.leftAnchor.constraint(equalToSystemSpacingAfter: view.leftAnchor, multiplier: inset.left)
        }
        if options.contains(.right) {
            self.rightAnchor.constraint(equalToSystemSpacingAfter: view.rightAnchor, multiplier: inset.right)
        }
    }
}
