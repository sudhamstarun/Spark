//
//  PlaneDetector.h
//  Spark
//
//  Created by Tarun Sudhams on 20/2/2019.
//  Copyright © 2019 Tarun Sudhams. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <SceneKit/SceneKit.h>

@interface PlaneDetector : NSObject
    
+ (SCNVector4)detectPlaneWithPoints:(NSArray <NSValue* >*)points;
    
    @end
