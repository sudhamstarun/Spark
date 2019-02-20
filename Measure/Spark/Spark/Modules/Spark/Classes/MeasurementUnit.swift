//
//  MeasurementUnit.swift
//  Spark
//
//  Created by Tarun Sudhams on 20/2/2019.
//  Copyright © 2019 Tarun Sudhams. All rights reserved.
//

import UIKit

struct MeasurementUnit{
    enum Unit:String{
        static let all: [Unit] = [.inch, .foot, .centimeter, .meter]
        case inch = "inch"
        case foot = "foot"
        case centimeter = "centimeter"
        case meter = "meter"
        func next() -> Unit {
            switch self {
            case .inch:
                return .foot
            case .foot:
                return .centimeter
            case .centimeter:
                return .meter
            case .meter:
                return .inch
            }
        }
        
        func meterScale(isArea: Bool = false) -> Float {
            let scale: Float = isArea ? 2 : 1
            switch self {
            case .meter: return pow(1, scale)
            case .centimeter: return pow(100, scale)
            case .inch: return pow(39.370, scale)
            case .foot: return pow(3.2808399, scale)
            }
        }
        
        func unitStr(isArea: Bool = false) -> String {
            switch self {
            case .meter:
                return isArea ? "m^2" : "m"
            case .centimeter:
                return isArea ? "cm^2" : "cm"
            case .inch:
                return isArea ? "in^2" : "in"
            case .foot:
                return isArea ? "ft^2" : "ft"
            }
        }
    }
        
        
    }
}
