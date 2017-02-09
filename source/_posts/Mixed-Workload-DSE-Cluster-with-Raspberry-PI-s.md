---
title: Mixed Workload DSE Cluster with Raspberry PI's
date: 2017-02-07 13:52:11
categories:
    - Technical
tags:
    - raspberry PI
    - cluster
---
Alrighty, as I mentioned in my previous [post](2017/02/07/I-m-Sure-You-Weren-t-Looking) I have a mixed-workload cluster (Cassandra, DSE search, DSE graph) using a combination of 4 Raspberry PI's and my laptop.  I had multiple things in mind when I started into this.

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


## The Setup
4 [RaspberryPI's][raspberrypi] (wired ethernet)
NOTE:  These are designed to be "built up" so you will need to purchase microSD cards and the outer shells separately

One 2.6GHz 8 core MacBook with 16GB RAM (wired ethernet)

[DataStax Enterprise Opscenter 6.0.7][opscenter] using [tarball installation][opscentertarball]

[DataStax Agent 6.0.7][agent] using [tarball installation][agenttarball]

[DataStax Enterprise 5.0.5][dse], again, using the [tarball installation][dsetarball]

[RAVPower 6 port USB charger][rav] with a set of USB Male A to Micro B cables.  I also purchased a 4x1 HDMI switch, but you can easily run these headless if you know your way around a Linux shell.

Just a quick note about the tarball installations.  DSE generally supports using installers across most major platforms and for each of the various installs, but since we are using RaspberryPI's in this case and since I used the [NOOBS][noobs] install to get up and going as fast as I could it just so happens that combination **only works with tarball installs**.  Please, learn from me and don't spend the many, many hours I did eventually figuring this out.   

You can, in fact, install other operating systems on RaspberryPI's which may allow the installers to work, but you'll have to come back and tell me about it if you give it a whorl.

Aaaaaaand for the reveal dun dunn dunnnnnnnnn! (Yes, those are shiny, lighted cables)
{% asset_img myPIs.gif "My Raspberry PI Cluster" %}

## I May Have Cheated Just A Little Bit
So, I mentioned above "mixed workload cluster with Raspberry PI's".  This is 100% true, but also notice there is a laptop in the mix.  I ended up using the laptop to house OpsCenter and my Search/Graph datacenter.  I'm using the PI's for my core Cassandra cluster.



[raspberrypi]: https://www.raspberrypi.org/ 
[model3]: https://www.raspberrypi.org/products/raspberry-pi-3-model-b/ 
[opscenter]: http://docs.datastax.com/en/latest-opscenter/opsc/about_c.html
[opscentertarball]: https://docs.datastax.com/en/latest-opscenter/opsc/install/opscInstallTar_t.html
[agent]: http://docs.datastax.com/en/latest-opscenter/opsc/install/installDSagents.html
[agenttarball]: http://docs.datastax.com/en/latest-opscenter/opsc/install/opsc-agentInstallManual_t.html
[dse]: http://docs.datastax.com/en/latest-dse/
[dsetarball]: http://docs.datastax.com/en/latest-dse/datastax_enterprise/install/installTARdse.html
[noobs]: https://www.raspberrypi.org/downloads/noobs/
[rav]: https://www.ravpower.com/6-port-usb-wall-charger-black-.html