---
title: 'Embedding Interactive Bokeh Plots in Static Sites'  
lang: 'en-uk'  
tags:
  - visualisation
  - jupyter notebooks
  - python
  - bokeh
---

# Embedding Interactive Bokeh Plots in Static Sites

Bokeh is a great tool in the python data science stack that gives you the capability to create modern interactive plots and dashboards, but without the need to write any javascript. Even from the comfort of a jupyter notebook.  

But how do we get these plots out of our notebooks and into the hands of users and colleagues?

If your plot is static like the majority of bokeh plots (i.e. it doesn't need to make calls to bokeh server for updates) then Bokeh has some built in functions for generating stand alone html & html files that make this very easy. There are two main options depending on your use

## Static Bokeh - as a static file

For the first use case we'll use the excellent example plot of the periodic table from the [bokeh gallery](https://docs.bokeh.org/en/latest/docs/gallery/periodic.html) and embed this as a static file in our site. All we have to have to do is run the provided script which saves all of the elements needed to create the plot in a browser (data, links to css & javscript etc.) to a file called `"periodic.html"`  in the current directory.




```python
from bokeh.io import output_file, show
from bokeh.plotting import figure
from bokeh.sampledata.periodic_table import elements
from bokeh.transform import dodge, factor_cmap

output_file("periodic.html")

periods = ["I", "II", "III", "IV", "V", "VI", "VII"]
groups = [str(x) for x in range(1, 19)]

df = elements.copy()
df["atomic mass"] = df["atomic mass"].astype(str)
df["group"] = df["group"].astype(str)
df["period"] = [periods[x-1] for x in df.period]
df = df[df.group != "-"]
df = df[df.symbol != "Lr"]
df = df[df.symbol != "Lu"]

cmap = {
    "alkali metal"         : "#a6cee3",
    "alkaline earth metal" : "#1f78b4",
    "metal"                : "#d93b43",
    "halogen"              : "#999d9a",
    "metalloid"            : "#e08d49",
    "noble gas"            : "#eaeaea",
    "nonmetal"             : "#f1d4Af",
    "transition metal"     : "#599d7A",
}

TOOLTIPS = [
    ("Name", "@name"),
    ("Atomic number", "@{atomic number}"),
    ("Atomic mass", "@{atomic mass}"),
    ("Type", "@metal"),
    ("CPK color", "$color[hex, swatch]:CPK"),
    ("Electronic configuration", "@{electronic configuration}"),
]

p = figure(title="Periodic Table (omitting LA and AC Series)", plot_width=1000, plot_height=450,
           x_range=groups, y_range=list(reversed(periods)),
           tools="hover", toolbar_location=None, tooltips=TOOLTIPS)

r = p.rect("group", "period", 0.95, 0.95, source=df, fill_alpha=0.6, legend_field="metal",
           color=factor_cmap('metal', palette=list(cmap.values()), factors=list(cmap.keys())))

text_props = {"source": df, "text_align": "left", "text_baseline": "middle"}

x = dodge("group", -0.4, range=p.x_range)

p.text(x=x, y="period", text="symbol", text_font_style="bold", **text_props)

p.text(x=x, y=dodge("period", 0.3, range=p.y_range), text="atomic number",
       text_font_size="11px", **text_props)

p.text(x=x, y=dodge("period", -0.35, range=p.y_range), text="name",
       text_font_size="7px", **text_props)

p.text(x=x, y=dodge("period", -0.2, range=p.y_range), text="atomic mass",
       text_font_size="7px", **text_props)

p.text(x=["3", "3"], y=["VI", "VII"], text=["LA", "AC"], text_align="center", text_baseline="middle")

p.outline_line_color = None
p.grid.grid_line_color = None
p.axis.axis_line_color = None
p.axis.major_tick_line_color = None
p.axis.major_label_standoff = 0
p.legend.orientation = "horizontal"
p.legend.location ="top_center"
p.hover.renderers = [r] # only hover element boxes

show(p)
```








<div class="bk-root" id="a2754783-4528-4c06-96b2-80c3a23e5217" data-root-id="5025"></div>





We can then copy this html file to a directory that our front end can find (usually somewhere inside the `/public`  folder for static websites). And inside our webpage, add an embed element with a path to the file.

for example:

```md 
<embed 
       type="text/html" 
       src="/bokeh/periodic.html"
       width="1100"
       height="600"
       >
</embed>
```

The width and height need to be defined as the element will not autosize for the content.

<embed 
       type="text/html" 
       src="/bokeh/periodic.html"
       width="1100"
       height="600"
       >
</embed>


## Static Bokeh - as an API response

Another use case is if you have an API or a Flask website and want to return a Bokeh plot as part of a response. This gives the option of incorporating the latest data or having some filtering, basically allowing you to create the bokeh plot on the fly.

The function to use in this case is ```file_html()``` from bokeh.embed . This accepts a bokeh plot as an argument and returns all the html needed to make that plot as a string. More details in the [Bokeh docs](https://docs.bokeh.org/en/latest/docs/reference/embed.html#bokeh.embed.file_html).

The other required argument is resources which specify the css and javascript files to use for the plot. The convenient way to include this is by the CDN object which lists all of the latest links to Bokeh's content delivery network.

So assuming we have the code above to generate the plot `p` ...


```python
from bokeh.resources import CDN
from bokeh.embed import file_html
```


```python
title = "periodic table"
p_html_str = file_html(p, CDN, title)
```


```python
# As we can see have the text for a standalone html file
print(p_html_str[:350])
```

    
    
    
    
    <!DOCTYPE html>
    <html lang="en">
      
      <head>
        
          <meta charset="utf-8">
          <title>periodic table</title>
          
          
            
              
            
            
              
            <script type="text/javascript" src="https://cdn.bokeh.org/bokeh/release/bokeh-2.1.1.min.js" integrity="sha384-kLr4fYcqcSpbuI95brIH3vnnYCquzzSxHPU6XGQCIkQRGJwhg0


Then you just have to include this string in the response object.  
Getting the data out of the database and into the hands of the people who want it. 

Hope this helps you build something cool.

