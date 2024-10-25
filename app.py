import dash
from dash import dcc, html
import dash_bootstrap_components as dbc
from dash.dependencies import Input, Output
from param_analysis import layout as param_analysis_layout
from home import layout as home_layout# Ensure this is correct
from species_analysis import layout as species_analysis_layout  # Ensure this is correct

# Initialize the app
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# App layout
app.layout = html.Div([
    dcc.Location(id='url', refresh=False),
    html.Div(id='page-content')
])

# Define callback to update page layout based on URL
@app.callback(
    Output('page-content', 'children'),
    [Input('url', 'pathname')]
)
def display_page(pathname):
    if pathname == '/' or pathname == '/home':
        return home_layout  # Default home page
    elif pathname == '/param_analysis':
        return param_analysis_layout
    elif pathname == '/species_analysis':
        return species_analysis_layout
    else:
        return "404 Page Not Found"
# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
