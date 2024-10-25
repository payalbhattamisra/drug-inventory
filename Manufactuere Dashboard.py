import dash
import dash_html_components as html
import dash_core_components as dcc
from dash.dependencies import Input, Output
import plotly.express as px
import pymongo
import pandas as pd

# MongoDB connection
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["manufacturer_dashboard"]
orders_collection = db["orders"]
complaints_collection = db["complaints"]

# Create a Dash app
app = dash.Dash(__name__)

# Function to retrieve data from MongoDB collections
def get_orders_data():
    orders_data = pd.DataFrame(list(orders_collection.find()))
    return orders_data

def get_complaints_data():
    complaints_data = pd.DataFrame(list(complaints_collection.find()))
    return complaints_data

# Layout of the dashboard
app.layout = html.Div([
    html.H1("Manufacturer Dashboard"),

    # Inputs for user
    html.Div([
        dcc.Input(id='manufacturer-input', type='text', placeholder='Enter Manufacturer Name', debounce=True),
        dcc.DatePickerRange(id='date-range-picker', start_date_placeholder_text='Start Date', end_date_placeholder_text='End Date')
    ]),

    # Line Graph for Consumption Pattern
    html.Div([dcc.Graph(id='line-graph-consumption')])
])

# Callback for updating charts based on user input
@app.callback(
    Output('line-graph-consumption', 'figure'),
    [Input('manufacturer-input', 'value'),
     Input('date-range-picker', 'start_date'),
     Input('date-range-picker', 'end_date')]
)
def update_charts(manufacturer_name, start_date, end_date):
    # Retrieve orders data from MongoDB
    orders_data = get_orders_data()

    # Filter based on manufacturer name
    if manufacturer_name:
        orders_data = orders_data[orders_data['manufacturer_id'] == manufacturer_name]
    
    # Filter based on date range
    if start_date and end_date:
        orders_data = orders_data[(orders_data['order_date'] >= start_date) & (orders_data['order_date'] <= end_date)]

    # Handle case where no data is available after filtering
    if orders_data.empty:
        return px.line(title="No Data Available")

    # Line Graph for Consumption Pattern
    line_graph_consumption = px.line(
        orders_data,
        x="order_date",
        y="quantity_sold",
        title="Consumption Pattern over Time",
        color="product_id"
    )

    return line_graph_consumption

# Run the Dash app
if __name__ == '__main__':
    app.run_server(debug=True)
