import { Grid } from '@material-ui/core';
import { Callback } from 'components/Callback';
import { Customer } from 'components/Customer';
import { CustomerProductReviewerList } from 'components/CustomerProductReviewerList';
import { LandingPage } from 'components/LandingPage';
import Navigation from 'components/Navigation';
import { Reviewer } from 'components/Reviewer';
import { ReviewerCreateReview } from 'components/ReviewerCreateReview';
import Footer from 'custom_components/Footer/Footer';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { LogIn } from 'components/LogIn';

class App extends Component {
  render() {
    return (
        <Grid container style={{ backgroundColor: "#D7FDEC" }}>
          <Grid item xs={12}  style={{ minHeight: '100%' }}>
            <Navigation />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LogIn} />
            <ProtectedRoute exact path="/customers/:path?">
              <Customer />
            </ProtectedRoute>
            <ProtectedRoute exact path="/reviewers/:path?">
              <Reviewer />
            </ProtectedRoute>
            <ProtectedRoute exact path="/customers/products/:productId">
              <CustomerProductReviewerList />
            </ProtectedRoute>
            <ProtectedRoute exact path="/reviewers/products/review">
              <ReviewerCreateReview />
            </ProtectedRoute>
            <Route path="/callback" component={Callback} /> 
          </Grid>
          <Grid item md={12}  style={{ marginTop: '3em' }}>
            <Footer whiteFont/>
          </Grid>
        </Grid>  
        
      
    );
  }
}

export default App;