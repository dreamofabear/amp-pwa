import { Link } from 'react-router';
import { Power1, TimelineLite, TweenLite } from 'gsap';
import Article from './article';
import React from 'react';
import './home.css';

/**
 * The app's home page, modulo the navigation bar.
 * Displays a list of `Article`s.
 */
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isTransitioning: false};

    /** @private @type {!Element} */
    this.articles_ = null;

    /** @private @type {!Element} */
    this.categories_ = null;

    /** @private @type {!TimelineLite} */
    this.timeline_ = null;
  }

  componentWillEnter(callback) {
    // If `timeline_` is not null, then the transition animation was interrupted.
    // Revert the transition by restoring the timeline's t=0 state.
    if (this.timeline_) {
      this.timeline_.pause(0, true);
      this.timeline_.remove();
      callback();
    } else {
      // If this is a non-interrupted navigation, perform a small animation for the categories bar.
      TweenLite.fromTo(this.categories_, 0.5, {y: -100}, {y: 0, onComplete:callback});
    }
  }

  componentWillLeave(callback) {
    // Only trigger the transition animation on click navigations.
    if (this.selectedArticle_) {
      // Matches the "enter" animation duration in `TransitionWrapper` to avoid overlapping.
      const enterAnimationDuration = 250;
      const duration = 0.35;
      const ease = Power1.easeOut;

      const navBarHeight = 50;
      const bounds = this.selectedArticle_.getBoundingClientRect();
      const toY = -bounds.top + navBarHeight;
      this.selectedArticle_.classList.add('selected');

      // Fade out all articles other than the one that was clicked on, as well as the selected
      // article's children (text and scrims).
      const otherArticles = this.articles_.querySelectorAll('.article:not(.selected)');
      const selectedArticleChildren = this.selectedArticle_.getElementsByTagName('*');
      const elementsToFadeOut =
          Array.from(selectedArticleChildren).concat(Array.from(otherArticles));

      this.timeline_ = new TimelineLite();
      this.timeline_.to(this.selectedArticle_, duration, {y: toY, ease: ease, onComplete:() => {
            // Reset window scroll so top of article is displayed.
            const previousScrollY = window.scrollY;
            window.scrollTo(0, 0);

            // Offset the article hero image by the window scroll amount we just changed to keep it
            // in the same position.
            TweenLite.set(this.selectedArticle_, {y: toY - previousScrollY});

            // Wait for `TransitionWrapper` animation before letting this component detach from DOM.
            setTimeout(callback, enterAnimationDuration);

            // Transition is now over; notify parent.
            this.props.transitionStateDidChange(false);
          }})
          .to(elementsToFadeOut, duration * 0.67, {opacity: 0, ease: ease}, 0);
    } else {
      callback();
    }
  }

  /** @private */
  onClickArticleLink_(event) {
    const articles = event.currentTarget.getElementsByClassName('article');
    this.selectedArticle_ = articles.length ? articles[0] : null;

    // Let parent know that an article was clicked so the transition animation can be coordinated
    // with `TransitionWrapper`.
    if (this.selectedArticle_) {
      this.props.transitionStateDidChange(true);
    }
  }

  render() {
    return (
      <div>
        <div className='categories' ref={ref => this.categories_ = ref}>
          <ul>
            <a href="#"><li><span className='active'>Recent</span></li></a>
            <a href="#"><li><span>Trending</span></li></a>
          </ul>
        </div>
        <div className='articles' ref={ref => this.articles_ = ref}>
          {this.props.documents.map(doc =>
            <Link to={doc.url} key={doc.url} onClick={this.onClickArticleLink_.bind(this)}>
              <Article
                  title={doc.title}
                  subtitle={'By ' + doc.author + ', ' + doc.date}
                  image={doc.image}
                  src={doc.url} />
            </Link>
          )}
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  documents: React.PropTypes.arrayOf(React.PropTypes.object),
  transitionStateDidChange: React.PropTypes.func
};
