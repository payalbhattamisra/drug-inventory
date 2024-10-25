from dash import html
import dash_bootstrap_components as dbc

# Layout for the home page
layout = html.Div([
    html.Header(
        style={'text-align': 'center', 'margin': '20px'},
        children=[
            html.H1("Welcome to Species Analysis Dashboard", style={'color': '#2274A5'}),
            html.H2("Explore the wonders of flora!", style={'color': '#1F271B'}),
        ]
    ),
    html.Div(
        style={'display': 'flex', 'justify-content': 'center', 'flex-direction': 'column', 'align-items': 'center'},
        children=[
            dbc.Button("Species Analysis", href='/param_analysis', style={'margin': '10px', 'width': '300px'}),
            dbc.Button("Parmeter Analysis", href='/species_analysis', style={'margin': '10px', 'width': '300px'}),
        ]
    )
])
