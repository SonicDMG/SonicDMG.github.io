---
title: Mixed Workload DSE Cluster with Raspberry PI's
date: 2017-02-07 13:52:11
categories:
    - Technical
tags:
    - raspberry PI
    - cluster
---
Alrighty, as I mentioned in my previous [post](2017/02/07/I-m-Sure-You-Weren-t-Looking) I have a mixed-workload cluster (C*, search, graph) using a combination of 4 Raspberry PI's and my laptop.  I had multiple things in mind when I started into this.

1. Low cost for learning

1. Something I can break and not cry about

1. How low can one really go when setting up a cluster?

1. Get some DSE OpsCenter knowledge

1. These are Raspberry PI's, they are just damn cool, so why not setup a cluster?!

## PIE?  Raspberries? 3.14? PI?
{% raw %}
<div class="responsive-container" style="height:160px">
    <div class="dummy"></div>
    <div class="img-container">
        <div class="centerer"></div>
          <img src="/2017/02/07/Mixed-Workload-DSE-Cluster-with-Raspberry-PI-s/pie-pi.jpg" title="pie" width="25%" height="auto">
          <span><strong>+</strong></span>
          <img src="/2017/02/07/Mixed-Workload-DSE-Cluster-with-Raspberry-PI-s/raspberry.jpg" title="raspberries" width="25%" height="auto">
          <span><strong>=</strong></span>
          <img src="/2017/02/07/Mixed-Workload-DSE-Cluster-with-Raspberry-PI-s/raspberrypi.jpg" title="raspberrypi" width="25%" height="auto">
    </div>
</div>
{% endraw %}

If you are not already familiar with RaspberryPI's [go take a look][raspberrypi].  These are cool little machines for very little cost.

[Here are the specs for the model 3][model3], but just to summarize each node in our cluster only has 1GB of RAM and a 1.2GHz quad-core processor.  This is clearly not a setup to use in your production environment.  This is, however, a great way to learn and experiment.





[raspberrypi]: https://www.raspberrypi.org/ 
[model3]: https://www.raspberrypi.org/products/raspberry-pi-3-model-b/ 