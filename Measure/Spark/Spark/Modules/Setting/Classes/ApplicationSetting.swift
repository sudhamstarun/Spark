//
//  ApplicationSetting.swift
//  Spark
//
//  Created by Tarun Sudhams on 20/2/2019.
//  Copyright © 2019 Tarun Sudhams. All rights reserved.
//

import UIKit

class ApplicationSetting {
    struct config {
        static let defaultUnit = "com.spark.defaultUnit"
        static let displayFocus = "com.spark.displayFocus"
    }
    
    struct Status {
        static var defaultUnit: MeasurementUnit.Unit = {
            guard let str = UserDefaults.standard.string(forKey: Config.defaultUnit) else {
                return MeasurementUnit.Unit.centimeter
            }
            return MeasurementUnit.Unit(rawValue: str) ?? MeasurementUnit.Unit.centimeter
            }() {
            didSet {
                UserDefaults.standard.setValue(defaultUnit.rawValue, forKey: Config.defaultUnit)
            }
        }
    
    }
    
    
    
    
    
    
    
    
    
}
