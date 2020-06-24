import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute'
import { Callback } from './components/Callback';
import { UserProfile } from './components/UserProfile'
import { CustomerChat } from './components/CustomerChat';
import { Products } from './components/Products';
import { Reviewer } from "./components/Reviewer";
import { CreateReview } from "./components/CreateReview";
import { ReviewForm } from './components/ReviewForm'
import Navigation from 'components/Navigation'
import Footer from 'custom_components/Footer/Footer'
import { ProductReviewerList } from 'components/ProductReviewerList1';
import { PendingChatRequests } from 'components/PendingChatRequests'
import { ReviewerChat } from 'components/ReviewerChat'
import { LandingPage } from 'components/LandingPage'
import { Customer } from 'components/Customer';
import { CustomerProductReviewerList } from 'components/CustomerProductReviewerList';

class App extends Component {
  render() {
    return (
        <div style={{ backgroundColor: "#D7FDEC" }}>
            <Navigation />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/customers/:path?" component={Customer} />
            <Route exact path="/customers/products/:productId" component={CustomerProductReviewerList} />
            <Route exact path="/user-profile" component={UserProfile} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/:productId" component={ProductReviewerList} />
            <Route exact path="/callback" component={Callback} />
            <Route exact path="/customer-chat" component={CustomerChat} />
            <ProtectedRoute exact path="/reviewer">
              <Reviewer/>
            </ProtectedRoute>
            <ProtectedRoute exact path="/reviewer/create-review">
              <CreateReview />
            </ProtectedRoute>
            <ProtectedRoute exact path="/reviewer/create-review/checkout">
              <ReviewForm />
            </ProtectedRoute>
            <ProtectedRoute exact path="/reviewer/pending-chat-requests">
              <PendingChatRequests />
            </ProtectedRoute>
            <ProtectedRoute path="/reviewer/chat/:customerId?/:reviewId?">
              <ReviewerChat />
            </ProtectedRoute>
            <ProtectedRoute path="/customer/chat">
              <CustomerChat />
            </ProtectedRoute>
            <Footer whiteFont/>
        </div>  
        
      
    );
  }
}

export default App;