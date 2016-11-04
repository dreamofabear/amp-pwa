import { TweenLite } from 'gsap';
import React from 'react';
import './transition-wrapper.css';

/**
 * Wraps content to be displayed when navigating from `Home` to access React transition hooks.
 */
export default class TransitionWrapper extends React.Component {
  constructor(props) {
    super(props);
    
    /** @private @type {!Element} */
    this.container_ = null;
  }

  componentWillEnter(callback) {
    // Don't perform transition for non-click navigations (e.g. browser back/forward).
    if (this.props.isTransitioning) {
      // Matches the "leave" animation duration of the `Home` component to avoid overlapping.
      const leaveAnimationDuration = 350;
      const duration = 0.25;

      // The `in-transition` class hides and overlays the wrapper contents on top of `Home`.
      this.container_.classList.add('in-transition');
      setTimeout(() => {
        // Once the "leave" animation of `Home` completes, fade in the wrapper contents.
        TweenLite.fromTo(this.container_,
            duration,
            {opacity: 0},
            {opacity: 1, force3D: true, onComplete: () => {
          this.container_.classList.remove('in-transition');
          callback();
        }});
      }, leaveAnimationDuration);
    } else {
      callback();
    }
  }

  render() {
    return (<div ref={ref => this.container_ = ref}>{this.props.contents}</div>);
  }
}
TransitionWrapper.propTypes = {
  contents: React.PropTypes.node,
  isTransitioning: React.PropTypes.bool
};
