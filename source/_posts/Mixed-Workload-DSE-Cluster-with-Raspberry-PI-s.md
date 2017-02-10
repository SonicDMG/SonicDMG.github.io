---
title: Mixed Workload DSE Cluster with Raspberry PI's
date: 2017-02-07 13:52:11
categories:
    - Technical
tags:
    - raspberry PI
    - cluster
    - killrvideo
---
Alrighty, as I mentioned in my previous [post](/2017/02/07/I-m-Sure-You-Weren-t-Looking) I have a mixed-workload cluster (Cassandra, DSE search, DSE graph) using a combination of 4 Raspberry PI's and my laptop.  I had multiple things in mind when I started into this.

1. Low cost for learning

1. Something I can break and not cry about

1. How low can one really go when setting up a cluster?

1. Get some DSE OpsCenter knowledge

1. These are Raspberry PI's, they are just damn cool, so why not setup a cluster?!

<!-- more -->

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


## The setup
4 [RaspberryPI's][raspberrypi] (wired ethernet)
NOTE:  These are designed to be "built up" so you will need to purchase microSD cards and the outer shells separately

One `2.6GHz 8 core` MacBook with `16GB RAM` (wired ethernet)

[DataStax Enterprise Opscenter 6.0.7][opscenter] using [tarball installation][opscentertarball]

[DataStax Agent 6.0.7][agent] using [tarball installation][agenttarball]

[DataStax Enterprise 5.0.5][dse], again, using the [tarball installation][dsetarball]

[RAVPower 6 port USB charger][rav] with a set of USB `Male A` to `Micro B` cables.  I also purchased a `4x1 HDMI` switch, but you can easily run these headless if you know your way around a Linux shell.

Just a quick note about the tarball installations.  DSE generally supports using installers across most major platforms and for each of the various installs, but since we are using RaspberryPI's in this case and since I used the [NOOBS][noobs] install to get up and going as fast as I could it just so happens that combination **only works with tarball installs**.  Please, learn from me and don't spend the many, many hours I did eventually figuring this out.   

You can, in fact, install other operating systems on RaspberryPI's which may allow the installers to work, but you'll have to come back and tell me about it if you give it a go.

Aaaaaaand for the reveal dun dunn dunnnnnnnnn! (Yes, those are shiny, lighted cables)
{% asset_img myPIs.gif "My Raspberry PI Cluster" %}

## I may have cheated just a little bit
So, I mentioned above "mixed workload cluster with Raspberry PI's".  This is 100% true, but also notice there is a laptop in the mix.  I ended up using the laptop to house OpsCenter and my search/graph datacenter and I'm using the PI's for my core Cassandra cluster.  In my experience I don't usually install operations tools and the like directly on production devices facing the public because they have a tendency to cause unpredicatable load.  The limited RAM on the PI's (1GB) is also a factor which I will address here in a moment.  As far as the search/graph datacenter portion I simply used the laptop out of convienence because I already had a 4-node core Cassandra cluster running on the PI's at the time and I wanted to observe the interaction between my search/graph and Cassandra datacenters in a "pure" fashion.

## Get this working on PI's
Raspberry PI's are special snowflakes when it comes to making this all work.  I will detail all this below, but here, for you, is the summarized list of what is needed.

1. [Disable swap][swap]
`sudo swapoff -a` is your friend.  It is also the quick and dirty way, not permanent on reboot.  Take a look at the "Disable swapping" section of [this post][disableswap] if you would like a more permanent solution.

1. Go Headless
This is quite easy to do using `sudo raspi-config` while ssh'd into your PI and it will help free up enough memory to make things stable.  Just make sure you already know your PI's IP address or know how to find it if things go sour.

1. Decrease RAM allocated to datastax-agent from `128MB to 64MB` 
Edit `datastax-agent-env.sh` located in [your datastax-agent install dir]/conf/datastax-agent-env.sh
```bash
From:
JVM_OPTS="$JVM_OPTS -Xmx128M -Djclouds.mpu.parts.magnitude=100000 -Djclouds.mpu.parts.size=16777216"

To:
JVM_OPTS="$JVM_OPTS -Xmx64M -Djclouds.mpu.parts.magnitude=100000 -Djclouds.mpu.parts.size=16777216"
```

1. Explicitly set Java HEAP settings for Cassandra node
Edit `cassandra-env.sh` located in [your DSE install dir]/resources/cassandra/conf/cassandra-env.sh.  Search for "HEAP" to find and edit the lines.  Notice mine are already set to the working values.  These are commented out by default which will allow the script to calculate values for you, but for our PI case we cannot use the calculated values.
```bash
MAX_HEAP_SIZE="200M"
HEAP_NEWSIZE="50M"
```

1. [Store collection data on a separate cluster][storecollection]
Remember that part about "cheating" with my [OpsCenter][opscenter] laptop?  Yup, this is part of it.  I'll give more details down below.

## Let's talk about OpsCenter, agents, memory, disk speed, and mucho frustrationo 
That's kind of a long list now that I see it all typed out, but there's a lot to consider.

We have nodes with `1GB of RAM`, a `32 bit` os, `4 cores`, and a `32GB microSD` drive acting as a hard disk.  This is way below the recommended values of `16-32GB of RAM`, `500GB-1TB` of fast disk, and `64bit` with `8 cores` for running Cassandra nodes, or really any database for that matter.  I wasn't really sure how well this would work, if at all, given memory contraints alone not to mention the speed of microSD's for a database that is known to need very fast disk.

### OpsCenter
I decided right off the bat I wanted OpsCenter in the mix.  Part of this whole project was to learn and what better way than to go whole hog and see what it could do.  If you use OpsCenter you must install [DataStax agents][agent] on each of your nodes in order for magic to happen.  That magic comes at a memory cost, not a huge one, but one that matters when only dealing with `1GB of RAM`.  In order to leave enough room for the Cassandra node itself to run I effectively cut this requirement in half.  So far, after months of running, I have not seen an issue running agents at `64MB of RAM`.
{% asset_img opscenter_cluster.png "Laptop + PI Mixed-Workload Cluster" %}

### Cassandra memory
The default auto caluclated memory configuration for DSE managed Cassandra nodes works well enough even on the PI's, but there's a catch.  Remember those agents we need for [OpsCenter][opscenter]?  Well, turns out the agents need just enough extra memory to push things over the edge and on a system with no swap file this means **page fault** which is exactly what happened.  I tried to quash every little process I could to free up enough RAM for my nodes to remain stable and I even made them headless, but to remain stable I had to explicitly configure the HEAP settings for my Cassandra nodes.  The end result is listed up above.

### Headless
So, before I went headless things were working...uhh...well enough.  Not well enough that I could leave it alone really and any time the system was put under stress **!BAM!** I would lose a node.  This ended up being **the clincher**.  I noticed the Raspbian UI itself was eating up just enough RAM to prevent my nodes from allocating more in times of need.  I chopped off their heads and since then along with the other changes I made my nodes have been rock solid on the memory front.

### Memory is good how about disk?
We already talked about the swap file.  Not only is it [strongly recommended][swap] to disable swap on nodes running Cassandra, but even more so on PI's running on microSD's.  Before I did so it was clear my nodes were struggling as even small tasks kept driving load up and upon some inspection it was obvious I/O was mostly to blame.  However, something else was lurking even after I disabled swap.  At times I would see my nodes shoot up from a load of `<1 upwards to 10+`.  At this point they would usually become unresponsive and either crash or eventually come back to reality, but always, always under heavy load.

### Colllleccccctionnnnnn Daaaaatttttaaaaa
Sorry, couldn't help myself.  As stated above move collection data storage off the PI's onto a [separate cluster][storecollection].  They simply cannot handle all of the I/O associated with collecting, storing, and repairing the collection data from the rollup\* tables.  Compaction was happening way too fast for the nodes to keep up most likely a result of having very little memory to work with, the PI's could not keep up with the amount of collection data itself, and read repair on the rollup\* tables was a constant, never ending stream of repair.  Once I made the switch my PI nodes all quieted down to a normal `load around 1`, things have stabilized, and   I no longer have gaps in my analytics data (except for when I **HULK SMASH** nodes myself for fun).

## Finally, the mixed workload part
Yup, right there in the title and all and I haven't really mentioned it.  Part of the reason I went and did all of this aside from learning and seeing what could be done was to extend [Luke Tillman's **\*cough\*....shame...less..plug \*cooouugh\***][luke] freaking awesome [KillrVideo][killrvideo] reference app to hook up to clusters outside of its [Dockerized][docker] container.  This forced me to extend my existing Cassandra cluster into a mixed workload scenario with [DSE Search][dsesearch].  Right, I could have simply put search within the same cluster, but I was looking to emulate what I would do in a production scenario.  I have an upcoming post on this very topic coming here in the future.  I also had need to extend into [DSE graph][dsegraph] as well for some of my own projects so I took the opportunity to go ahead and just do it all.  The end result is a fully functional Cassandra/Search/Graph DSE managed mixed workload cluster being served up mostly on Raspberry PI's with a little help from a laptop all hooked up to [KillrVideo][killrvideo].

One last thing before I go.  I find that tailing the agent.log, opscenterd.log, and system.log files from all of the nodes is quite insightful especially when watching the interaction between the nodes when performing regular CQL, search, and graph queries.  I'm also the type of person who can watch a defrag for hours and find every little box color change useful information.  

Not sure what that says about me.  


[raspberrypi]: https://www.raspberrypi.org/ 
[model3]: https://www.raspberrypi.org/products/raspberry-pi-3-model-b/ 
[opscenter]: http://docs.datastax.com/en/latest-opscenter/opsc/about_c.html
[opscentertarball]: https://docs.datastax.com/en/latest-opscenter/opsc/install/opscInstallTar_t.html
[agent]: http://docs.datastax.com/en/latest-opscenter/opsc/install/installDSagents.html
[agenttarball]: http://docs.datastax.com/en/latest-opscenter/opsc/install/opsc-agentInstallManual_t.html
[dse]: http://docs.datastax.com/en/latest-dse/
[dsetarball]: http://docs.datastax.com/en/latest-dse/datastax_enterprise/install/installTARdse.html
[dsesearch]: http://docs.datastax.com/en/datastax_enterprise/5.0/datastax_enterprise/srch/searchOverview.html
[dsegraph]: http://www.datastax.com/products/datastax-enterprise-graph
[noobs]: https://www.raspberrypi.org/downloads/noobs/
[rav]: https://www.ravpower.com/6-port-usb-wall-charger-black-.html
[recommendedsettings]: https://docs.datastax.com/en/landing_page/doc/landing_page/recommendedSettingsLinux.html
[swap]: https://docs.datastax.com/en/landing_page/doc/landing_page/recommendedSettingsLinux.html#recommendedSettingsLinux__disable-swap
[disableswap]: http://ideaheap.com/2013/07/stopping-sd-card-corruption-on-a-raspberry-pi/
[storecollection]: https://docs.datastax.com/en/opscenter/6.0/opsc/configure/opscStoringCollectionDataDifferentCluster_t.html
[killrvideo]: https://killrvideo.github.io/
[luke]: http://www.luketillman.com/
[docker]: https://www.docker.com/