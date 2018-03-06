import { Animated } from 'react-native';

import { Metrics } from './Types';

type Size = {
  x: number,
  y: number
}

export default class TransitionItem {
  constructor(
    name: string, route: string, reactElement: Object,
    shared: boolean, appear: boolean, delay: boolean, metrics: Metrics,
    visibility: Animated.Value, progress: Animated.Value
  ) {
    this.name = name;
    this.route = route;
    this.reactElement = reactElement;
    this.shared = shared;
    this.appear = appear;
    this.delay = delay;
    this.metrics = metrics;
    this.visibility = visibility ? visibility : new Animated.Value(1);
    this.progress = progress
  }

  name: string
  route: string
  reactElement: Object
  metrics: Metrics
  shared: boolean
  appear: boolean
  delay: boolean
  layoutReady: boolean
  visibility: Animated.Value
  progress: Animated.Value

  scaleRelativeTo(other: TransitionItem): Size {
    const validate = i => {
      if (!i.metrics) {
        throw new Error(`No metrics in ${i.name}:${i.containerRouteName}`);
      }
    };
    validate(this);
    validate(other);
    return {
      x: this.metrics.width / other.metrics.width,
      y: this.metrics.height / other.metrics.height,
    };
  }
}
