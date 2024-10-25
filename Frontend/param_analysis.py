import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import plotly.express as px
import pandas as pd

# Load dataset
df = px.data.iris()

# Initialize the app
app = dash.Dash(__name__)

# Define colors for each species
species_colors = {
    'setosa': '#FF5733',
    'versicolor': '#33FF57',
    'virginica': '#3357FF'
}

# Parameter options
parameter_options = [
    {'label': 'Sepal Length', 'value': 'sepal_length'},
    {'label': 'Sepal Width', 'value': 'sepal_width'},
    {'label': 'Petal Length', 'value': 'petal_length'},
    {'label': 'Petal Width', 'value': 'petal_width'}
]

# App layout
app.layout = html.Div([  # Define 'layout' here
    html.H1("Species Comparison Scatter Plot", style={'text-align': 'center', 'color': 'black'}),
    html.Div([
        html.H3("Choose Two Parameters", style={'text-align': 'center', 'color': 'black'}),
        dcc.Dropdown(
            id='param-one-dropdown',
            options=parameter_options,
            value='sepal_length',
            clearable=False,
            style={'color': 'black', 'width': '300px', 'margin': '10px auto'}
        ),
        dcc.Dropdown(
            id='param-two-dropdown',
            options=parameter_options,
            value='sepal_width',
            clearable=False,
            style={'color': 'black', 'width': '300px', 'margin': '10px auto'}
        ),
    ], style={'text-align': 'center'}),
    dcc.Graph(id='scatter-plot-custom', style={'margin': '20px'}),
], style={'padding': '10px'})


def update_scatter_layout(fig):
    """Update layout for scatter plots with black background and enhanced visibility."""
    fig.update_layout(
        plot_bgcolor='black',
        paper_bgcolor='black',
        title_font=dict(color='white'),
        xaxis_title_font=dict(color='white', size=14),
        yaxis_title_font=dict(color='white', size=14),
        legend=dict(font=dict(color='white'))
    )

    # Update axis properties to hide grid lines and enhance marker visibility
    fig.update_xaxes(
        showgrid=False,
        zeroline=False,
        tickfont=dict(color='white', size=12)
    )

    fig.update_yaxes(
        showgrid=False,
        zeroline=False,
        tickfont=dict(color='white', size=12)
    )

    return fig


# Callbacks for updating graphs based on dropdown selections
@app.callback(
    Output('scatter-plot-custom', 'figure'),
    [Input('param-one-dropdown', 'value'),
     Input('param-two-dropdown', 'value')]
)
def update_graphs(param_one, param_two):
    # Scatter plot for custom selected parameters for all species
    scatter_fig = px.scatter(
        df,
        x=param_one,
        y=param_two,
        title=f"{param_one.capitalize()} vs {param_two.capitalize()} for all species",
        color='species',
        color_discrete_map=species_colors
    )

    # Update layout for the scatter plot
    scatter_fig = update_scatter_layout(scatter_fig)

    return scatter_fig


# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
