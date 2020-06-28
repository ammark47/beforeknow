import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute'
import Navigation from 'components/Navigation'
import Footer from 'custom_components/Footer/Footer'
import { LandingPage } from 'components/LandingPage'
import { Customer } from 'components/Customer';
import { CustomerProductReviewerList } from 'components/CustomerProductReviewerList';
import { Reviewer } from 'components/Reviewer';
import { Grid } from '@material-ui/core';
import { ReviewerCreateReview } from 'components/ReviewerCreateReview';
import { Callback } from 'components/Callback';

class App extends Component {
  render() {
    return (
        <Grid container style={{ backgroundColor: "#D7FDEC" }}>
          <Grid item xs={12}  style={{ minHeight: '100%' }}>
            <Navigation />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/customers/:path?" component={Customer} />
            <Route exact path="/customers/products/:productId" component={CustomerProductReviewerList} />
            <Route exact path="/reviewers/:path?" component={Reviewer} />
            <Route exact path="/reviewers/products/review" component={ReviewerCreateReview} />
            <Route exact path="/callback" component={Callback} /> 
          </Grid>
          <Grid item md={12}  style={{ marginTop: '3em' }}>
            <Footer whiteFont/>
          </Grid>
        </Grid>  
        
      
    );
  }
}

export default App;