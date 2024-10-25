import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import plotly.express as px
import pandas as pd

# Load dataset
df = px.data.iris()

# Initialize the app
app = dash.Dash(__name__)

# Define species colors
species_colors = {
    'setosa': '#FF5733',
    'versicolor': '#33FF57',
    'virginica': '#3357FF'
}

# App layout
app.layout = html.Div([
    html.H1("Single Species Analysis", style={'text-align': 'center', 'color': 'black'}),
    
    # Dropdown for selecting species
    dcc.Dropdown(
        id='species-dropdown',
        options=[{'label': species, 'value': species} for species in df['species'].unique()],
        value='setosa',
        placeholder="Choose a species",
        clearable=False,
        style={'color': 'black', 'width': '300px', 'margin': '20px auto'}
    ),
    
    # Divs to hold the histograms and scatter plots
    html.Div([
        dcc.Graph(id='histogram1'),
        dcc.Graph(id='histogram2'),
        dcc.Graph(id='histogram3'),
        dcc.Graph(id='histogram4'),
        dcc.Graph(id='scatter-plot-sepal'),
        dcc.Graph(id='scatter-plot-petal')
    ], style={'display': 'flex', 'flex-wrap': 'wrap', 'justify-content': 'center'}),
    
    # Custom parameter dropdowns (added here after the histograms and two static scatter plots)
    html.Div([
        html.H4("Select Custom Parameters for Scatter Plot", style={'text-align': 'center', 'color': 'black'}),
        dcc.Dropdown(
            id='param-one-dropdown',
            options=[{'label': col, 'value': col} for col in df.columns if col != 'species' and col != 'species_id'],
            value='sepal_length',
            placeholder="Select first parameter",
            clearable=False,
            style={'color': 'black', 'width': '300px', 'margin': '20px auto'}
        ),
        dcc.Dropdown(
            id='param-two-dropdown',
            options=[{'label': col, 'value': col} for col in df.columns if col != 'species' and col != 'species_id'],
            value='sepal_width',
            placeholder="Select second parameter",
            clearable=False,
            style={'color': 'black', 'width': '300px', 'margin': '20px auto'}
        )
    ], style={'text-align': 'center', 'margin': '20px 0'}),

    # Custom scatter plot
    html.Div([
        dcc.Graph(id='scatter-plot-custom')
    ])
], style={'padding': '10px'})


# Function to update scatter plot layouts
def update_scatter_layout(fig):
    fig.update_layout(
        plot_bgcolor='black',
        paper_bgcolor='black',
        title_font=dict(color='white'),
        xaxis_title_font=dict(color='white', size=14),
        yaxis_title_font=dict(color='white', size=14),
        legend=dict(font=dict(color='white'))
    )
    fig.update_xaxes(showgrid=False, zeroline=False, tickfont=dict(color='white', size=12))
    fig.update_yaxes(showgrid=False, zeroline=False, tickfont=dict(color='white', size=12))
    return fig


# Callbacks for updating graphs based on dropdown selections
@app.callback(
    [Output('histogram1', 'figure'),
     Output('histogram2', 'figure'),
     Output('histogram3', 'figure'),
     Output('histogram4', 'figure'),
     Output('scatter-plot-sepal', 'figure'),
     Output('scatter-plot-petal', 'figure'),
     Output('scatter-plot-custom', 'figure')],
    [Input('species-dropdown', 'value'),
     Input('param-one-dropdown', 'value'),
     Input('param-two-dropdown', 'value')]
)
def update_graphs(selected_species, param_one, param_two):
    filtered_df = df[df['species'] == selected_species]

    hist_fig_1 = px.histogram(filtered_df, x='sepal_length', title=f"Sepal Length Distribution for {selected_species}",
                              color='species', color_discrete_map=species_colors)
    hist_fig_2 = px.histogram(filtered_df, x='sepal_width', title=f"Sepal Width Distribution for {selected_species}",
                              color='species', color_discrete_map=species_colors)
    hist_fig_3 = px.histogram(filtered_df, x='petal_length', title=f"Petal Length Distribution for {selected_species}",
                              color='species', color_discrete_map=species_colors)
    hist_fig_4 = px.histogram(filtered_df, x='petal_width', title=f"Petal Width Distribution for {selected_species}",
                              color='species', color_discrete_map=species_colors)

    scatter_fig_1 = px.scatter(filtered_df, x='sepal_length', y='sepal_width',
                               title=f"Sepal Dimensions for {selected_species}",
                               color='species', color_discrete_map=species_colors)
    scatter_fig_2 = px.scatter(filtered_df, x='petal_length', y='petal_width',
                               title=f"Petal Dimensions for {selected_species}",
                               color='species', color_discrete_map=species_colors)
    scatter_fig_3 = px.scatter(filtered_df, x=param_one, y=param_two,
                               title=f"{param_one.capitalize()} vs {param_two.capitalize()} for {selected_species}",
                               color='species', color_discrete_map=species_colors)

    scatter_fig_1 = update_scatter_layout(scatter_fig_1)
    scatter_fig_2 = update_scatter_layout(scatter_fig_2)
    scatter_fig_3 = update_scatter_layout(scatter_fig_3)

    return hist_fig_1, hist_fig_2, hist_fig_3, hist_fig_4, scatter_fig_1, scatter_fig_2, scatter_fig_3


# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
