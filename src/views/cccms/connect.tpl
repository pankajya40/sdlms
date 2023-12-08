<style>
.card {
    padding-top: 20px;
    margin: 10px 0 20px 0;
    background-color: rgba(214, 224, 226, 0.2);
    border-top-width: 0;
    border-bottom-width: 2px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: rgb(14 30 37 / 12%) 0px 2px 4px 0px, rgb(14 30 37 / 32%) 0px 2px 16px 0px;
}

.card .card-heading {
    padding: 0 20px;
    margin: 0;
}

.card .card-heading.simple {
    font-size: 20px;
    font-weight: 300;
    color: #777;
    border-bottom: 1px solid #e5e5e5;
}

.card .card-heading.image img {
    display: inline-block;
    width: 46px;
    height: 46px;
    margin-right: 15px;
    vertical-align: top;
    border: 0;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}

.card .card-heading.image .card-heading-header {
    display: inline-block;
    vertical-align: top;
}

.card .card-heading.image .card-heading-header h3 {
    margin: 0;
    font-size: 14px;
    line-height: 16px;
    color: #262626;
}

.card .card-heading.image .card-heading-header span {
    font-size: 12px;
    color: #999999;
}

.card .card-body {
    padding: 0 20px;
    margin-top: 20px;
}

.card .card-media {
    padding: 0 20px;
    margin: 0 -14px;
}

.card .card-media img {
    max-width: 100%;
    max-height: 100%;
}

.card .card-actions {
    min-height: 30px;
    padding: 0 20px 20px 20px;
    margin: 20px 0 0 0;
}

.card .card-comments {
    padding: 20px;
    margin: 0;
    background-color: #f8f8f8;
}

.card .card-comments .comments-collapse-toggle {
    padding: 0;
    margin: 0 20px 12px 20px;
}

.card .card-comments .comments-collapse-toggle a,
.card .card-comments .comments-collapse-toggle span {
    padding-right: 5px;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-comments .media-heading {
    font-size: 13px;
    font-weight: bold;
}

.card.people {
    position: relative;
    display: inline-block;
    width: 170px;
    height: 300px;
    padding-top: 0;
    margin-left: 20px;
    overflow: hidden;
    vertical-align: top;
}

.card.people:first-child {
    margin-left: 0;
}

.card.people .card-top {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 170px;
    height: 150px;
    background-color: #ffffff;
}

.card.people .card-top.green {
    background-color: #53a93f;
}

.card.people .card-top.blue {
    background-color: #427fed;
}

.card.people .card-info {
    position: absolute;
    top: 150px;
    display: inline-block;
    width: 100%;
    height: 101px;
    overflow: hidden;
    background: #ffffff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.card.people .card-info .title {
    display: block;
    margin: 8px 14px 0 14px;
    overflow: hidden;
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    color: #404040;
}

.card.people .card-info .desc {
    display: block;
    margin: 8px 14px 0 14px;
    overflow: hidden;
    font-size: 12px;
    line-height: 16px;
    color: #737373;
    text-overflow: ellipsis;
}

.card.people .card-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    padding: 10px 20px;
    line-height: 29px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.card.hovercard {
    position: relative;
    padding-top: 0;
    overflow: hidden;
    text-align: center;
    background-color: rgba(214, 224, 226, 0.2);
     width: 22.5%;;
     margin: 27px 25px 30px 0px;
}

.card.hovercard .cardheader {
   background: url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMVEhUXFRUXFhUVFRgSFRUVFRUWFhYVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGC0dHR0tLS0rLS0tLS0rLS0tLSsrLS0tKy0rLS0tLS0tLS0tKy0tLS0rLSstLS0rKysrLS0rLf/AABEIAIoBbAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAADBAECAAcIBQb/xABKEAABAwIDAwYNAQUFBgcAAAABAAIDBBESITEFQVEGE2FxgZEHFBYiMlJUk6GxwdHS8BdigpLhM0JEovEjJDVyc8IVNlN1g7TE/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAECAwUEBv/EAC8RAAICAAUEAQMDAwUAAAAAAAABAhEDBBQhURIxQWEFE3GhIjLBkdHwBnKBseH/2gAMAwEAAhEDEQA/ANbU7QRmN6MIm8Ak2OTUDsl7B5RYxN4BDOHgiTOsEsgDiNvAKHxCxy3KICmJQMJ6j8kAhC25zTzYW8BkEpSel2FPNfqgA820bgVIYwjQBVkcSQP0VDxbMCyFKTRAC4CijaCcxfL6hFmddp6kGj1PV9QgGnQt4BSIG8AsJVwVAK4BwCLHE0j0Qqv1RmKgrzDfVCHgHAdyOShKMgPCOA7lgZ0DuV1MeqFSKFnQO5WDBwHcplVQUDIlaLHIacFWGMWFwFkhy7D8lMHohaj3Bfmm8Ap5pvAKboQNz0KtELc23gFBhbwCxuRsiIkUGIW3GQ1HzTXizPVHclxqP+YfNOOKy0AfizPVb3LPFWeo3uVy5KTS3cRewCgGPFWeo3uWeKs9Rvcq001xY5238QiNk6EoHn10TQ7IAZDd1oAYOATW0PT7B8ylwrSFlMA4BTzY4BWJV2Z5K0iNgcA4DuUYBwHcjujVCE6UE2MR07LDzRoNyh0LAbYG9wR4R5o6h8kGT0lqlwZt2Y+nZb0W9wVI42HVre4K506lELewLLSXgqbLGlZ6je4LPFmeo3uCKAiCJWo8Dc8to6LokTyNyvTR3vmR1JkUY9ZyyUXe4kWsl7r0RTD1nIUlIBvPwQoFj7K8hNj1fRX8VbbU/BS9lmnM6FAK01wb9CbfLwHw1SzWu4q2B/H4oQqScVwpmf2LOZdx+Kx8TjqhQhH+zPQg0xz7PspDXZjcVaOLPXcfogDY1DnrObPrFUdfiVLBcFExqjIwTqfgrcz0/JAC50q7XZILmlU54j9FAGe7Lf3IDHEG5upMpP8Aqfuox/q5+6pCZZL7lkcllUu6B8VGLoHx+6FCmS4t0H5FXhOQS+Lo+aZhidhFgEQLOKHC9WdE7gFjad18rd6rdgrI/MIl1Hir+jvVmwP4DvRMEDUdY+adNuKTdE7K43jei4TwCjYD5dCSqyA7IjPXosiSRuOlkE0Tv3R3qED0liNxN/gmGsASHiTuI70zTh4yOfbmgFtoen2D5lLtCbqmEuuANN/ahcy71WqpgGLXV7Z6q3Mu9Vqjxd3Ad6eSgnhQSjOhcRa3xVDTu/RVsg7H6LeofJKynziqtnsLWVDL0DuSyUNxt80/rRDiAzChrXW9HLjopZE7hw38QoyoYgIumF5njPQbhM+Ojew3QC9G6103KSdEjC6w0vmmo5Ljh15qFCRpSdxLiNLJq6UlPncUsUXZe9r3uER4OE34FDiIvluRJTkepEDMOf64o3N9aC42Ov6urGccUBEqqxmYzUvkCrG4AjcgCPjsewodsx1H5hFe7PsQ2Auc1rQXE3AABJJJFgAMyehUFku7VbH5P+CqpmAdUvFM0/3bc5KR0i+FnaSehfZ0Xgo2cwee2WY8Xyub8I8K4SzEI+b+x2WDN+jRDXJqIrfg8HOy/ZG+8lP/AHq7fB7s0f4Vv88v5rGqhwzWnlyc5nVAOq6R/Zzsz2RvvJfzUfs42X7I33kv5qrNQ4Y08uUc4NCuxl10Z+zjZfsjfeS/mrfs72Z7I3+eX801cOGR5aXKOdX05CC5ll0i7wfbNOtK33kv5qP2c7M9kb7yX81dXDhk00+Uc2kJuB3mhdCnwcbL9kb7yX81YeDvZnsjfeS/msvNRfhm1l5Lg58LlZ0wbbebLoL9nmzPZW+8l/NVPg62Z7I33kv5qLNR4YeXkznzx/oTUUgcLhb5/Zxsv2RvvJfzV2eD7Zo0pWj+OX81dVHhmdNLlGg5tO0Ki6APIDZp/wAK3+eX81nkBs32Vv8APL+aaqHDGmlyjQIVwt9+QGzfZW/zy/ms8gdneyt/nk/NXVQ4Y08uUaEWLfLfB7s0aUrfeS/mr+QOzvZW/wA8n5pqo8MaaXKOe3OuclIXQA8HuzPZW/zy/mp/Z/s32Vv88v5qaqPDGmlyjn9AkkJNgbLoY+D7Zvso95KP+9eVX+CbZ7x/s+dgPFsheO0SX+aqzUPY08vRpCF9+xXcvstv+C+rpryQkVUYGeAFso64s8X8JJ6F8Y5dozjJXF2cZRcXTPODbo74BhuNRqr0pFun4lXDw29x0LZktSSjDZx6M0WocA0235Lz7qMXTdCkwNub62zXoc6EnTuFlJHQhBdr7brojZrbggKwRIpd8t+hUurYVPNq9JLKh9lfn8iOKoWqpCMDEbi42AF/srmnd+6qbP8AT7CvRIUKeaITfd3ojoHHh3/0Vg65J0z3ozDcIBdsD7gAYiSAGjMkk2AAtmSSt/eD7kSyijbJK0OqnN852vNA6xx8Ok7+pa58FOz2zbRYXC4iY+a27E3CxvcZAetoW+l8WaxHfSv+T6svBfuMWveXPhFbSkwU7WyzDJ7nZxxn1bD0ndGQHwX1fKzaZpqOeYekxhwX9d1ms/zOC5vp4XzPs1r5HuJJDQZHuOrjYXJOpK9b4L4zDzPVjY28Y7V4b7u/SX9b322bM4zhUY92e5Vct9ovOM1MrQSbYbRty1AwgA2Xr7E8JlbA4c//ALxGbEh4DH4TvY8AfEG682k5T1joGUcDGvbEXuaBA2Z9rkuxBwcLAuOYaDxKX21tmo2i5rnsDnRRWtDGcmDMveBe2uuQHAL9NLJ4U/0YmBDp37d0vD2imr/3bez4+uS3Unf+ezfuw9sxVcLZoXYmuyIOTmuGrXDcQvQWkfA1tZ0dWYL+ZMw5bucjBc0j+EPHdwW7l+I+UyOjzDw07i919n/Z2j0cHE+pCyVi+H2jJVz7VkpYq2SlijpIpbMihku98j2m5kYToArv2lV0E8DKuZtZTVEohbPzbYZoZng822QM8x7HWIuACPn5x1PtVC+BhfW1W09oQMrpKaKm8VwMjhgf/bQlzrmRhOrb670zyulq6ampImVbzLLXQQPqDHFjLJnuB8zDguARbL+6gPtlC8TY2yamKTFNXy1TcJHNvihjAJIs68bAbixFtM18pySi2jW0gqRtOSN7nzAMNPTviHNzPY0O8wOIs0XzvmgNjrF89yF266toYah7Wte7G14Zmwuje6MuZ+6S24618py+m2nSCSpZWAQmUNZE1jS5odewu5menFfVlMq8zirCUlFvtd7vhUmYnPoV0bMWLX2zBtJlHNVz1jZWmikliaGgOY8xiRjz5gBsARbTNen4N9tSVFE2SplD5DJICXYWmwOQsAAumNkJYWHLEU4yUWour7u+YrjckcRNpVVn1yxa25FcrZS3aMtVK6VlOWOYLNBALphhbhAuTgYM0rsyq2ztJpqIJoqWK7hGzQOwm2XmOLrHIuNswbBdpfE4kJzU5xioUupt03JJpLa7p8GfrJpUm78G01i+B5HcrKiR89HWANqoWPcHAAYw0WNwPNxC7SCMiDplmfwU7Znq6aR9RIZHCbCCQ1tm4GG2QG8lcsb47Gwo4kpVUOnzdqV04+GnXo1HFjKq83+D7dYtc8kuVMpl2k6pkc+OnuWtwtGFrXy5NsBckNaM0hs2v2ztIOnp5Y6aHEQxpsAbagHA5zraEmwvoF1fxWJGU1OcYxhVybdXJJpLa7p8E+stqTd+PsbVWL4rk3tLaHM1DK6Exvjje6OYBoD7NORwm2IEAggAEbss6+C/bslTSvfUy43iYtBdgacOBhtYAbyVwxMjOEMTEcotYbSbTtO+zTSqvvRViJtLn+D7dYtbcn9rVlVU7SgbUYSxz2wOLW4Y7TOaDk3zvNFs7ryZazazdoNoPHm43NxY+bZg/s3P0wX0bZfTH4ibnODxIJxXU/3ftpSv9vDMvGVXT4/g2+teeEvkO2oY6qpm2qGjE9rRlO0DPL/1ANDvtY7iPsdgU08cDGVMgmmGLFIMg673FuQA0aWjTcvSXm28Ob6XdPuuz/8AGdHFSVM5HY0kXuLW45qjyvpuXmzG0+0qqJrbNxiRo4CVrZCBnkAXOA6l4hiHD9d69OMupJnnSXS2hQHJUTjYQdL9wRW0QIvc9wWiCMb7J3nR0LHUPT8lSSnF9AgE1ZoWNtvurskA4qpkIcUZjyG2t8EBxF75q2PpRB7kOf1KhKm19FnNO9U9xRsF6WTC6/QnDVhJCL913cqdd1ANtkCMx43JJpHTfgobiGgPcoitmwvBLXNj2i0ONudjkiH/ADHDIO/m7dq3uuUGVDm2cwlr2lrmuAN2uaQQRlqCAuguQXLGPaEIxWZUMA52LS9sucYDqw/C9jxPx5uDtSPqy01XSH8I1IZdnVLW6hok7I3tefg0rRHJ/bMtJMJYHBj7Fty0OGF2oIPUO5dNvaCLEXByIOYIO4rQ/L7kLLSPdLC0vpySQ4DEYr/3H8ANztOOevvf6ezeE4TymLX6navs7STX4Vc9vvjNQlanHwF2Vyq2nC+OpkdNLTueQSWXZI0O88MIFg7I2I3jrSM09VsqonEbiznGuDXuYCJYnElkjbjX5G4K8uDlTWMhZCyoljjYSWtY4xkXuSMTbOIzORNllTW1m0JY2vMlRIG4GANBdhv+6B2uPaV+g0lSfVCCg0+ql3Sdxb/Sltvfjf0fN9S0qbvx/J7PgopC/aURGkbZJHdXNuZ83tW/l8h4PeSHiEJMhDp5bc4RmGAejG077XJJ3nqC+vX4z5vOwzWacobxiqT57tv7W9j78vhuEKfc+GFdFFtyoMskcQNBAAZHtYCeekyBcRdA5V7Tj2hNTUNG9s5bUwz1EkZD44IYXF3nSDIPcQAB1r66u2HSzOxzU0EzrAYpIWSOsL2GJwJtmculNUlJHE3BExkbfVY0Mb3NFl5B3NZR7Popts7V8ck5vD4jg/3l9Le8Bxeg9uPRut7X6U/4QIKbxKgjY8Gm/wDEKRheJi4c3jcHnn8WLLPzsVxbXJfZVWwKSVxfLS08rza73wxvcbCwu5zbnIAdiu7Y1MYhCaeExA3ERiYYwbk3DLYQcznbeUB5nJmgoIZHeKSh73N84eNvqThBGYa+R1syMxxXyHg75JRVGz2PkmqwHyVIdEyqlihIFRK23NtIABAz43K2DQbEpYXY4aaCF9i3FHEyN2EkEtxNANrgZdATVJSsjaGRsbG0EkNY0MaC4kkhoyzJJ7UBFBRRwxsiiYI42NDWMbkGgbl8d4Y/+H//ADRfJy+6S9VSRytwysZI298L2h7bjQ2cLXX05PHWXx8PFavpd0YxI9UXHk+en/4K7/20/wD1l8X4PeQlJV0jZpxIXmR7fNfhFgbDKy2sadmDm8DcGHDgwjBhtbDh0w2ysopaVkbcMbGRtuThY0Mbc6mwFl9cPlJ4eDiQwm4ylPqtPxwZeEnJN70qNO8htjGan2tTRanmmsudSx85aCenCBfpXq8i+XUFJSilrGyRSwlzbc2TcFxdYjVrhe2fQb8NlU1BFEXGKKOMutiLGNYXWvbEWjPU68SqVuyqeUh0sEUrhoZI2PI6i4FfRj/K4OYliRxoNwk4yVNKSaio96pppGI4MopdL3X9DXPIiGSt2hU7QwGOFzXsZi/vFzWsAvobNbc2yBNl5/g/5UQ7NZUU1YJI5Gyk2DC7MNDS3o9G4JyIOq3DHGAAAAAMgALADgAlazZcEpDpYIpSNDJGx5HUXArD+Uw8Trw8bDf05KKST3ioXW7W/fey/Rapxe6v8mreRWyJKun2nI1uBtTcRYsg54c+QC/AFzWk9J4JbYu36YUX/h9eailfDI44omkPPnOdhNgS03cRmLEWzW5Y2AAAAADIACwA4AJWt2XBKQZYIpSNDJGx5HUXAro/mFiTm8WDUXJSj0veLjHpW7TT272vZPoNJU9+2/m9zVnIamfJJWVETp/FBTyxxmZ5c55LRw80kYXE20uAheDbkTS1tM+WcPxCUsGF+EYQxjtLcXFbhETcOHCMNrYbDDbhbS3QhUlFHEMMUbImk3IY1rATpezQM8h3KYvzmLJYnRcJS6aafZRvu/Ld8BZdJq96v8mtPBVStir6+JnoxlzG3zOFkzmtueNgEas/8yxf9P8A/PIth01BExznRxRsc/Nzmsa1ziTclxtc5knNSaCLnOdMUfODSTA3nALW9O19Mlzl8pGWPi4zi/14bh38uKV/i/7F+j+mMb7O/wA2NLFi+B8J3LptFE6CBwdVvbYAZ8w0j+0fwNvRG856BeQlbpHZutzV3L3aAn2pVPabta8RA/8ASa2N3+Zr14FUdAlqRpGt+1Hl+O5epBdKSPOm7bYZruhWidmeH1QmPubKXA6rZkO+QBJz1Av2Kb7kKWPNAWp4wRmETmm8Ah0x83vRrrokCOabwCjmm8AqF1zbcsbYHrUISYm8FUxj4j5oyq76j5hVlGfFm+qo8XZ6oRHFQXLBCni7PVCzxdnqhBqJSXYQbC3xV6abUE3toeKFL+Ls9UJeWV0MjJIXOie3Nr2EtcDxBCaEguk9pajq+qBOjY3JzwxysAZXQ88BlzsNmSfxRnzXHpBb1L7mg8J2y5f8SIjvbMx8Vv4iMJ7CudwFDgF88srB9tjvHMyXfc6Cqa7YEhxOk2c5x1OKJpPXYi/avQoeU2x4RhiqqGIcI5ImA9djmub2Rg5WWOpxwSWDiTj0vEbXDuv+y6hJ/tOmPLfZvt9L79n3U+W+zfb6X37PuuYjEE7TwjCP1vWFk/ZXmvR0h5bbN9vpffs+6zy32b7fS+/Z91zVNEMWizmhbRNGuRqvR0r5b7N9vpffs+6zy32b7fS+/Z91zPFCCUxzAUWUV1ZdTtdHSHlts32+l9+z7rPLbZvt9L79n3XNtTTAMJtw+apDEMIyR5RchZn0dK+W2zfb6X37Pus8ttm+30vv2fdc28yOCG8NG5NL7Gp9HS3lts32+l9+z7rPLbZvt9L79n3XNLGtO5X5oJpfY1Po6T8ttm+30vv2fdZ5bbN9vpffs+65pkiGXX9CqgDgmk9jU+jpjy22b7fS+/Z91Hlvs32+l9+z7rmrmxwQHsBOiaT2NT6OnPLfZvt9L79n3WeW+zfb6X37PuuYuaHBV5sKaT2NT6On/LfZvt9L79n3U+W2zfb6X37PuuYWxhMQMF7WTS+y6j0dKnlvs32+m98w/VeXtHwo7MivaczO9WGN77/xkBnxXP1QADYBRA/OxVWVXlkeY9GxOUvhcqpgWUUXizTlzjyHzW/dHos/zHpC1+Wudic/E57iSXOOIknUuJNyelMaLHEcCu8MKMVscJ4kpdwAjOlh3lTzfQO9GvmVAOi6HOgLRfQfNGYDuQY3OsBkEalvnc3RNoso2WN+CXkab7kzLolBClslUZTnzUQlUgjJbk0HXepMTvVHf/VaspSJ+amV+YUindfIfEKTTP4fEKAtdY76j5hY2F/D4hS+J1tOG8cVqwOOCywS9jwCiSNx0AWLIUrbAgi1z+rolJY3vY/ZLuo3HgO0qfE39HehR8MCS2lqOr6o1OHj0sx15odY0kiw3b+tWyCbQrZXROad6o7/AOqwQu9Ud/8AVVsEYc1R6JzDuHxWGJ1rW+IUTDAkp+D0B+t6SNO7h8VZkwAta6qDRef0kWFlwepKOl32CNGHEZNy46fVLFGRDNMQkXQGRu3DdfUKpqANb3ClF8DVf6B7PmloT5oU1NUC3DYg5dSEx2QzCED3S79SrOcPW+CpYet8ChSWaorSlwiscgLSbuv6FQFD3aZ7/oVhd0hCEu0Q2K5cOPwQ9N90KHcLiyUTmLLsSiAsxMxel3pdnXZFbJY6jTgVKKRUDzj2KYo7kZoc77m6tTyhpzREPQVX6KjJgdCsc8W1WQRfMq4A3qoA/V1WR3+litIFJ8upRTv1Uu6v1dQG65blaQsJJMEISuUx7rjsTBY1Y7FYvTO80dqI5xVKVvmjtRCABcpRq1QQyhtt/R3IRrhwShfcql1s5nrwyhwuFabTtHzCQo5bG3HVPy6do+YUYBqQoUhyoLhSoSsN7g9OeaFG0B5zRXk5WS9vOd+twUZC4UqAscVQClkN7DvWRP3HVBYb3UxO87sUKMFeeW3J6yvQKBTEZ8blUhTmBhy1HyRqKXKxOn1UtcG6jRKk/NCnpSkNaSOH+i8uNtzx4qQ+2/LgiUzgiIFq3As7rKCPNb1BCqNERx81vUEKDR4bb/kl0eJQIZbY7h3K2EcB3IEOqPdALVrRYdf0KTATdf6I6/oUkCqRhWMubBMPo8txQadjibjcmXg5XdnvQqEiENybNOdQQlXBCDdIMu36BMNaOAQKPTt+gTIUKBqDu0UU7xe39VlU3QoMeutk7geeANw7kCoIwnLdwQi794qZicJyUoWCp9U4AEpTDNOtbn0LRCC0LCEo65z7k3A+4v3oAVQMikin6r0T2fNIFANUr7N3aneryOvllv3rwRM71j3lWEzvWPeVjqNtHpCM9Heow3SXOHie9YHnie9OovSPUzbuHWvTn07vmF8/DM71j3lXdO64852o3lW7M9J6/OHh8VXGb/1S91VTrIGqZScvkbobTlY3VEQJ1+gEjsCDa2t1dzs79CE0peoecsz3q9VsJDmM8PihyyHSw70qHHiqqplaoK02VQc0NYqQ9FjrhLYCfjvz1Q2uPFZdCGPPFY05WVSoCFMVo3WVFKEG5pAWd3zVSchkdAlij7h1IwWY3oKZawWySsWqcj0UKRG0hS8qyFJogKVmYHX9Clo4ySBn3ItR6I6/oVlNvVAeSQBthcBA50kaLJN6pEowGYTZLyN4ojdR1IkuhWvBCKSQDXimZaiwyBK8xHn1HUFCkyzE6jLqQ2usouoCUAxlvuRHu8zsSqN/c7FGAcY6Cm4nW4paHVHdoqCmIF1tExGLBJN9IdYTqAUkd6Q6fqgp2o9E9iSQh//Z");
    /* background-size: cover; */
    height: 130px;
    background-size: 243px 115px;
    background-repeat: no-repeat;
    margin-left: 2px;
    width: 200%;
}

.card.hovercard .avatar {
    position: relative;
    top: -50px;
    margin-bottom: -50px;
}

.card.hovercard .avatar img {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 5px solid rgba(255,255,255,0.5);
}

.card.hovercard .info {
    padding: 4px 8px 10px;
}

.card.hovercard .info .title {
    margin-bottom: 4px;
    font-size: 24px;
    line-height: 1;
    color: #262626;
    vertical-align: middle;
}

.card.hovercard .info .desc {
    overflow: hidden;
    font-size: 12px;
    line-height: 20px;
    color: #737373;
    text-overflow: ellipsis;
}

.card.hovercard .bottom {
    padding: 0 20px;
    margin-bottom: 17px;
}

.btn{ border-radius: 50%; width:32px; height:32px; line-height:18px;  }

.connect{
    width: 96%;
    background-color: #0029ff;
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
    text-overflow: ellipsis;
    border: none;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;

}
#sidebar-title{
  display : none
}

#sidebar-wrapper{
  width: 6%
}
#sidebar-wrapper .icons {
  margin-left:12px;
  font-size: 20px
}
.sdlms-container{
   margin-left:0px;
   padding:0px 
}
</style>

<!-- IMPORT partials/sidebar.tpl -->

    <div>
        <div>
            <div style="display: flex; justify-content: flex-start;flex-wrap: wrap;flex-direction: row;width:93%;margin-left: 50px;margin-top: 12px;" id="total-cards">
    
               
        
            </div>
    
        </div>
    </div>

<!-- IMPORT partials/footer.tpl -->
