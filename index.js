// index.js

/**
 * Required External Modules
 */
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv')

const auth = require('./lib/auth/authentication.js');
dotenv.config()
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

app.use(auth);

/**
 *  App Configuration
 */
var _templates = process.env.NODE_PATH ? process.env.NODE_PATH + '/templates' : 'templates';
nunjucks.configure(_templates, {
  autoescape: true,
  cache: false,
  express: app
});



app.engine('html', nunjucks.render);

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */
app.get('/', (req, res) => { res.render('index') });
app.get('/view-prototype1', (req, res) => { res.render('view-prototype1') });
app.get('/view-prototype1-prev-version', (req, res) => { res.render('view-prototype1-audit-trail-previous-version') });
app.get('/view-prototype1-first-version', (req, res) => { res.render('view-prototype1-audit-trail-first-version') });
app.get('/view-prototype2', (req, res) => { res.render('view-prototype2') });
app.get('/view-prototype2-prev-version', (req, res) => { res.render('view-prototype2-audit-trail-previous-version') });
app.get('/view-prototype2-first-version', (req, res) => { res.render('view-prototype2-audit-trail-first-version') });
app.get('/view-prototype3', (req, res) => { res.render('view-prototype3') });
app.get('/view-prototype-final1', (req, res) => { res.render('view-prototype-final1') });
app.get('/view-prototype-final1-prev-version', (req, res) => { res.render('view-prototype-final1-audit-trail-previous-version') });
app.get('/view-prototype-final1-first-version', (req, res) => { res.render('view-prototype-final1-audit-trail-first-version') });
app.get('/view-prototype-final2', (req, res) => { res.render('view-prototype-final2') });
app.get('/view-prototype-final2a', (req, res) => { res.render('view-prototype-final2a') });

app.get('/view-prototype-final2a-h0', (req, res) => { res.render('view-prototype-final2a-h0') });
app.get('/view-prototype-final2a-h1', (req, res) => { res.render('view-prototype-final2a-h1') });
app.get('/view-prototype-final2a-h2', (req, res) => { res.render('view-prototype-final2a-h2') });
app.get('/view-prototype-final2a-h3', (req, res) => { res.render('view-prototype-final2a-h3') });
app.get('/view-prototype-final2a-h4', (req, res) => { res.render('view-prototype-final2a-h4') });
app.get('/edit-prototype1', (req, res) => { res.render('edit-prototype1') });
app.get('/view-prototype-with-links', (req, res) => { res.render('view-prototype-with-links1') });
app.get('/view-prototype-with-links2', (req, res) => { res.render('view-prototype-with-links2') });

app.get('/edit-prototype-product-info', (req, res) => { res.render('edit-prototype-product-info') });
app.get('/edit-prototype-NAS', (req, res) => { res.render('edit-prototype-NAS') });
app.get('/edit-prototype-temp-price', (req, res) => { res.render('edit-prototype-temp-price') });
app.get('/edit-prototype-HCP', (req, res) => { res.render('edit-prototype-HCP') });
app.get('/edit-prototype-other-info', (req, res) => { res.render('edit-prototype-other-info') });
app.get('/register-prototype-product-info', (req, res) => { res.render('register-prototype-product-info') });
app.get('/register-prototype-NAS', (req, res) => { res.render('register-prototype-NAS') });
app.get('/register-prototype-temp-price', (req, res) => { res.render('register-prototype-temp-price') });
app.get('/register-prototype-HCP', (req, res) => { res.render('register-prototype-HCP') });
app.get('/register-prototype-other-info', (req, res) => { res.render('register-prototype-other-info') });

// Shaun's pages
app.get('/prototype-with-links-sc0', (req, res) => { res.render('prototype-with-links-sc0') });
app.get('/prototype-with-links-sc', (req, res) => { res.render('prototype-with-links-sc') });
app.get('/prototype-with-links-sc1', (req, res) => { res.render('prototype-with-links-sc1') });

// edit pages
app.get('/register-product-sc', (req, res) => { res.render('register-product-sc') });
app.get('/edit-prototype-NAS-sc', (req, res) => { res.render('edit-prototype-NAS-sc') });
app.get('/edit-prototype-temp-price-sc', (req, res) => { res.render('edit-prototype-temp-price-sc') });
app.get('/edit-prototype-HCP-sc', (req, res) => { res.render('edit-prototype-HCP-sc') });
app.get('/edit-prototype-other-info-sc', (req, res) => { res.render('edit-prototype-other-info-sc') });
app.get('/accessibleerrors', (req, res) => { res.render('errors') });

app.get('/confirmation-page', (req, res) => { res.render('confirmation-page') });
app.get('/view-product-register-journey', (req, res) => { res.render('prototype-view-product-register-journey') });

// Presentation level sales report view
app.get('/presentation-level-report-view', (req, res) => { res.render('presentation-level-report-view') });

// Presentation level report form
app.get('/presentation-level-report-form', (req, res) => { res.render('presentation-level-report-form')});

// Presentation level report done
app.get('/presentation-level-report-done', (req, res) => { res.render('presentation-level-report-done')});

// Presentation level report all
app.get('/presentation-level-report-view-all', (req, res) => { res.render('presentation-level-report-view-all')});

// Zero returns
app.get('/zeroreturns', (req, res) => { res.render('zeroreturns')});

// Tabbed dashboard
app.get('/sales-dashboard-tabs', (req, res) => { res.render('sales-dashboard-tabs')});


app.get('/sales-dashboard', (req, res) => { res.render('sales-dashboard') });

app.get('/annual-submissions', (req, res) => { res.render('annual-submissions') });

app.get('/product-level-returns-submission', (req, res) => { res.render('product-level-returns-submission') });


// Multiple annual submissions

app.get('/multiple-annual-submissions', (req, res) => { res.render('multiple-annual-submissions') });

app.get('/company-submission', (req, res) => { res.render('product-level-returns-company-submission') });


// Suggested link product journey
app.get('/link-journey-multiple-products', (req, res) => { res.render('product-org-search') });
app.get('/product-search', (req, res) => { res.render('product-search-link') });
app.get('/product-search-results', (req, res) => { res.render('product-add-search-result') });
app.get('/registration-choice', (req, res) => { res.render('registration-choice') });
app.get('/link-product-confirmation-page', (req, res) => { res.render('link-product-confirmation-page') });
app.get('/link-another-product-choice', (req, res) => { res.render('link-another-product-choice') });


/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
