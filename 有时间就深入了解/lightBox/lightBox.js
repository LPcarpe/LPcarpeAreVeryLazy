!(function (){

    var LightBox = function (options){
        var self = this;

        this.settings = {
                         speed: 500 
                        }
        $.extend(this.settings, options || {});

        //创建遮罩和弹出框
        this.popupMask = $('<div id="lightBox-mask">');
        this.popupWin = $('<div id="lightBox-popup">')

        //保存到body
        this.bodyNode = $(document.body);

        this.renderDom();
        this.groupName = null;
        this.groupData = [];

        this.lightBox_container = this.popupWin.find("div.lightBox-container");//图片预览区域
        this.popupPic = this.popupWin.find("img.lightBox-image");//图片
        this.img_caption = this.popupWin.find("div.caption");
        this.nextBtn = this.popupWin.find("span.lightBox-btn-next");
        this.prevBtn = this.popupWin.find("span.lightBox-btn-prev");

        this.captionText = this.popupWin.find("p.img-desc");//图片的描述
        this.currentIndex = this.popupWin.find("p.img-index");//图片的索引
        this.closeBtn = this.popupWin.find("span.lightBox-close");//关闭按钮


        //通过事件委托机制为每个图片添加事件
        this.bodyNode.delegate(".js-lightBox,*[data-role=lightBox]", "click", function (e){
            //阻止事件冒泡
            e.stopPropagation();

            var currentGroupName = $(this).attr("data-group");

            if(currentGroupName != self.groupName){
                self.groupName = currentGroupName;
                //根据当前组名获取同组数据

                self.getGroup();
            }
            //初始化弹出
            self.initPopup($(this));
        });

        //关闭功能
        this.popupMask.click(function (){
            $(this).fadeOut();
            self.popupWin.fadeOut();
            self.clear = false;
        });
        this.closeBtn.click(function (){
            self.popupMask.fadeOut();
            self.popupWin.fadeOut();
            self.clear = false;
        });

        // 用于检测动画是否过度完毕
        this.flag = true;

        //上下切换功能
        this.nextBtn.click(function (e){
            if(!$(this).hasClass("disabled") && self.groupData.length >1 && self.flag) {
                this.flag = false;
                e.stopPropagation();
                self.goto("next");  
            };
        });
        this.prevBtn.click(function (e){
            if(!$(this).hasClass("disabled") && self.groupData.length > 1 && self.flag){
                this.flag = false;
                e.stopPropagation();
                self.goto("prev");
            };
        });
       
       //窗口试图调整后图片自适应调整
        var timer = null;
        this.clear = false;
        $(window).resize(function (){
          if(self.clear){
                window.clearTimeout(timer);
                timer = window.setTimeout(function (){
                    self.loadPicSize(self.groupData[self.index].src);
                },500);
          };
        }).keyup(function (e){

            var keyValue = e.which;
            if(keyValue == 37 || keyValue == 38){ 
                self.prevBtn.click();
            }else if(keyValue == 39 || keyValue == 40){
                self.nextBtn.click();
            }
        });


    };
    LightBox.prototype = {
        goto: function (dir){
            if(dir === "next"){
                this.index++;
                if(this.index >= this.groupData.length-1){
                    this.nextBtn.addClass("disabled")
                }else if(this.index != 0){
                    this.prevBtn.removeClass("disabled");
                }
                
                var src = this.groupData[this.index].src;
                this.loadPicSize(src);

            }else if(dir === "prev"){
                this.index--
                if(this.index <= 0){
                    this.prevBtn.addClass("disabled");
                }else if(this.index != this.groupData.length-1){
                    this.nextBtn.removeClass("disabled");
                }
                var src = this.groupData[this.index].src;
                this.loadPicSize(src);
            }else{
                throw console.error("传入的方向参数错误");
                
            }
        },

        showPopMaskAndWin: function (sourceSrc, currentId){;
            var self = this;
            
            this.popupPic.hide();
            this.img_caption.hide();

            this.popupMask.fadeIn();

            var winWidth = $(window).width(),
                winHeight = $(window).height();

            this.lightBox_container.css({
                                         width: winWidth/2,
                                         height: winHeight/2
                                        });

            this.popupWin.fadeIn();
            
            var viewHeight = winHeight/2+10;
            this.popupWin.css({
                              width: winWidth/2+10,
                              height: winHeight/2+10,
                              marginLeft: -(winWidth/2+10)/2,
                              top: -viewHeight
                             }).animate({
                                        top: (winHeight-viewHeight)/2
                                        }, self.settings.speed, function (){
                                            //加载图片
                                            self.loadPicSize(sourceSrc);
                                        });

            this.index = this.getIndexOf(currentId);
            var groupDataLength = this.groupData.length;

            //根据id获取当前图片在数组中的索引，根据索引判断是否显示上下按钮
            if(this.groupData.length > 1){
                
                if(this.index === 0){
                    this.prevBtn.addClass("disabled");
                    this.nextBtn.removeClass("disabled");                  
                }else if(this.index === groupDataLength-1){
                    this.nextBtn.addClass("disabled");
                    this.prevBtn.removeClass("disabled");
                }else{
                    this.nextBtn.removeClass("disabled");
                    this.prevBtn.removeClass("disabled");
                }
            }else{
                this.nextBtn.addClass("disabled");
                this.prevBtn.addClass("disabled");
            }
        },

        loadPicSize: function (sourceSrc){
            var self = this;

            // 初始化图片大小
            self.popupPic.css({
                              width: "auto",
                              height: "auto"
                              }).hide();
            self.img_caption.hide();
            this.preLoadImg(sourceSrc, function(){
                self.popupPic.attr("src",sourceSrc);

                var picWidth = self.popupPic.width(),
                    picHeight = self.popupPic.height();

                self.changePic(picWidth, picHeight);
            });
        },

        changePic: function (width, height){
            var self = this;
            var winWidth = $(window).width(),
                winHeight = $(window).height();

            //算出图片与视口的宽高比,不要让图片溢出。
            //图片加边框？
            var scale = Math.min(winWidth/(width+10), winHeight/(height+10), 1);
            width = width * scale;
            height = height * scale;

            this.lightBox_container.animate({
                                    width: width-10,
                                    height: height-10
                                  }, self.settings.speed);
            this.popupWin.animate({
                                  width: width,
                                  height: height,
                                  marginLeft: -(width/2),
                                  top: (winHeight-height)/2
                                  }, self.settings.speed, function (){
                                      self.popupPic.css({
                                                        width: width-10,
                                                        height: height-10
                                                        }).fadeIn();
                                      self.img_caption.fadeIn();
                                      
                                  });
            this.captionText.text(this.groupData[this.index].caption);
            this.currentIndex.text("当前索引：" + (this.index+1) + " of " + this.groupData.length);
           
            //动画过渡完毕
            self.flag = true;
            self.clear = true;
        },

        preLoadImg: function (src, callback){
            var img = new Image();
            if(!!window.ActiveObject){
                img.onreadystatechange = function (){
                    if(this.readyState == "complete"){
                        callback();
                    }
                };
            }else{
                img.onload = function (){
                    callback();
                };
            }
            img.src = src;
        },

        getIndexOf: function (currentId){
            var index = 0;
            $(this.groupData).each(function(i){
                index = i;
                if(this.id === currentId){
                    return false;
                }
            });

            return index;
        },

        initPopup: function(currentObj){
            var self = this;
            var sourceSrc = currentObj.attr("data-source"),
                currentId = currentObj.attr("data-id");

            this.showPopMaskAndWin(sourceSrc, currentId);
        },

        getGroup: function (){
            var self = this;
            var groupList = this.bodyNode.find("*[data-group="+this.groupName+"]");

            self.groupData.length = 0;
            groupList.each(function (){
                self.groupData.push({
                                    src: $(this).attr("data-source"),
                                    id: $(this).attr("data-id"),
                                    caption: $(this).attr("data-caption")
                                    });
            })
        },

        renderDom: function(){
            var strDom = '<div class="lightBox-container">'+
                              '<span class="lightBox-btn lightBox-btn-prev"></span>'+
                              '<img src="images/2-2.jpg" alt="#" class="lightBox-image">'+
                              '<span class="lightBox-btn lightBox-btn-next"></span>'+
                          '</div>'+
                          '<div class="caption">'+
                              '<p class="img-desc">ffff</p>'+
                              '<p class="img-index">当前索引：0 of 0</p>'+
                              '<span class="lightBox-close"></span>'+
                          '</div>';


            //插入到this.popupWin
            this.popupWin.html(strDom);
            //把遮罩和弹出框插入到body
            this.bodyNode.append(this.popupMask, this.popupWin);
            
        }
    };

    window["LightBox"] = LightBox;
})();