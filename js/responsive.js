// javascript

$(function(){
	
	// initial
	$(window).on("load",function(){
		$('.loading').remove();
		
		fnWrapBg(iW_h,iW_w);
	});
	
	$(document).mousewheel(function(ev,delta,deltaX,deltaY){
		ev.cancelBubble=true;
	});

	var iW_h=$(window).height();
	var iW_w=$(window).width();
	
	$('.wrap').css("height",iW_h);
	$(".br_wrap").css("height",function(){return iW_h*5;});
	
    // resize 
	$(window).on("resize",function(){
		
		iW_h=$(window).height();
		iW_w=$(window).width();
		
		$('.wrap').css("height",iW_h);
        $(".br_wrap").css("height",function(){return iW_h*5;});
        
        $(".br_wrap").animate({
        	top:-iW_h*iNavIndex
        });
        
        $('.sight_bg').css({
			"width":iW_w,
			"height":iW_h,
			"top":"50%",
			"left":"50%",
			"transform":"translate(-50%,-50%)"
		});
		
		$('.s_bg_b').css({
			"top":function(){
				return parseInt((iW_h-412)/2)+"px";
			},
			"left":function(){
				return parseInt((iW_w-724)/2)+"px";
			}
		});
        
        fnPersonYuk(iW_h,iW_w);
        
        // wrap1_changeSight 
        if($('.w1_changesight').height()){
        	
        	fnChangeSight(iW_h,iW_w);
        }
        
        
        
	});
	
	// scroll
	var iNavIndex=0;
	var iOldNavIndex=null;

	function fnScroll(){
		
		var aCtrl_nav=$('.ctrl_nav');
		var oBr_wrap=$('.br_wrap').eq(0);
		var bStop=false;
		
		function fnClickScroll(){
			
			$.each(aCtrl_nav,function(index,value){
				
				$(value).on("click",function(){
				      
				      iOldNavIndex=iNavIndex;
				      iNavIndex=index;
				      
				     fnBrMove();
				      
				});
				
				
			});
			
			oBr_wrap.mousewheel(function(ev,delta,deltaX,deltaY){
                if(bStop){
                	return '';
                }
				if(delta<0){
					iOldNavIndex=iNavIndex;
					iNavIndex++;
					if(iNavIndex>4){
						iNavIndex=4;
						return "";
					}
					bStop=true;
					fnBrMove();
				}
				if(delta>0){
					iOldNavIndex=iNavIndex;
					iNavIndex--;
					if(iNavIndex<0){
						iNavIndex=0;
						return "";
					}
					bStop=true;
					fnBrMove();
				}
			});
			
			
			// be in motion
			function fnBrMove(){
				
				oBr_wrap.animate({
						top:-iW_h*iNavIndex
					},function(){
						bStop=false;
					});
				
			      $.each($('.wrap'),function(index,value){
			      	  if(index==iOldNavIndex){
			      	  	// down
			      	  	fnNoBeMotion(index);
			      	  	
			      	  };
			      	  if(index==iNavIndex){
			      	  	// up
			      	  	fnBeMotion(index);
			      	  	
			      	  }
			      });
					
			}
			
			// this is be in motion
			function fnBeMotion(index){
				
				switch(index){
					case 0:;break;
					case 1:
					
					if(bLeading){
						$.each($('.w2_leading'),function(index,value){
							setTimeout(function(){
								$(value).css({
									"transition":"transform 1.5s ease",
									"transform":"translateZ(0px)"
								});
							},index*400);
						});
					}
						
					break;
					case 2:;break;
					case 3:;break;
					case 4:;break;
				}
				
			}
			
			function fnNoBeMotion(index){
				
				switch(index){
					case 0:;break;
					case 1:
					
					if(bLeading){
						$.each($('.w2_leading'),function(index,value){
							setTimeout(function(){
								$(value).css({
									"transition":"transform .5s ease",
									"transform":"translateZ(1000px)"
								});
							},(2-index)*200);	
						});
					}
						
					break;
					case 2:;break;
					case 3:;break;
					case 4:;break;
				};
				
			}
			
		}
		
		return fnClickScroll;
		
	}
	
	var oClickScroll=fnScroll();
	oClickScroll();
	
	
	// wrap1
	
	fnPersonYuk(iW_h,iW_w);
	
	var oW1_sence=$('.w1_sence').get(0);
	
	for(var i=0;i<100;i++){
		var oIco=new CreateIco(oW1_sence);
		
		oIco.fnIcoMove();
	}
	
	fnRadius(iW_h,iW_w);
	
	/*var oAudioPlay=fnAudio()
	oAudioPlay();*/
	
	// wrap 2
    	
    var oLeading=null;
    var bLeading=true;
         		
     $.each($('.w2_leading'),function(index,value){
     	
     	$(value).on("click",function(){
     		if(index==0){
     			oLeading='yuk';	
     		}
     		if(index==1){
     			oLeading='yui';	
     		}
     		if(index==2){
     			oLeading='hach';	
     		}
     		
     		bLeading=fnClickLeading(oLeading,$(this),{'height':iW_h,"width":iW_w},bLeading);
     	});
     	
     });
    	     
     
    // wrap 3 3d magic square
    
    //外接了
    var oMagic=fnW4Magic();
   
    oMagic();
    
    
    // wrap 4
    var oSight=fnW4Sight();
    
    oSight();

	
	// wrap 5
	var oBeMove=fnW5BeMove();
	
	oBeMove();
	
	
});

  // wrap 1
function fnWrapBg(iW_h,iW_w){
	
	$('.sight_bg').animate({
		"top":-(2160-iW_h)/2,
		"left":-(3840-iW_w)/2
	},"slow",function(){
		$('.sight_bg').css({
			"width":iW_w,
			"height":iW_h,
			"top":"50%",
			"left":"50%",
			"transform":"translate(-50%,-50%)"
		});
	}).queue(function(next){
		$('.s_bg_b').css({
			"top":function(){
				return parseInt((iW_h-412)/2)+"px";
			},
			"left":function(){
				return parseInt((iW_w-724)/2)+"px";
			}
		}).animate({
			"height":"412",
			"width":"724"
		});
	});
	
}

function fnPersonYuk(iW_h,iW_w){
	
	$('.w1_sence').css({
		"height":function(){return iW_h-120+"px";}
	});
	
	$('.img_yuk').css({
		"left":function(){return parseInt((iW_w-240)/2)+"px";}
	});
	
	$('.changesight_bg').css({
		"height":iW_h,
		"width":iW_w
	});
	
}

function fnRadius(iW_h,iW_w){
	$('.wrap').eq(0).one("click",function(){
		$('.w1_radius').queue(function(next){
			$(this).css({
				"transition":"all 1.2s ease",
		        "height":iW_w*1.5,
		        "width":iW_w*1.5,
		        "border-radius":function(){
		        	return "0 0 0 "+iW_w*1.5+"px/ 0 0 0 "+iW_w*0.75+"px";
		        }
			})
			
			next();
		});/*.delay(1500).queue(function(next){
			$(this).css({
				"transition":"none",
				"height":"0",
				"width":"0",
				"border-radius":"0 0 0 0/0 0 0 0"
			});
		});*/
		
		$('.w1_header').css({
			"transition":"background 1.2s ease",
			"background":"rgba(255,255,255,0.2)"
		});
		
		$('.w1_nav_h').css({
			"transition":"color 1.2s ease",
			"color":"#000"
		});
		
		$('.w1_changesight').css({
			"transition":"all 1.2s ease",
			"height":iW_w*1.5,
			"width":iW_w*1.5,
			"border-radius":function(){
				return "0 0 "+iW_w*1.5+"px 0";
			}
		}).delay(1500).queue(function(next){
			$(this).css({
				'transition':"none",
				"border-radius":"0 0 0 0"
			});
			
			fnChangeSight(iW_h,iW_w);
			
			// clean_YUK
			$('.w1_radius').remove();
			$('.sight_bg').remove();
			$('.w1_sence').remove();
			
		});
	});
	
}
function fnChangeSight(iW_h,iW_w){
	$('.w1_changesight').css({
		"height":iW_h,
		"width":iW_w
	});
}

// 可能存在的优化   谷歌播放时 突然资源为空.
function fnAudio(){

    var iMouse=1;
    var oW1_audio=document.getElementsByClassName('w1_audio')[0];

	function fnAudioPlay(){
		
		$('.sight_audio').on("click",function(){
			if($('.w1_audio').get(0).paused){
				$('.w1_audio').get(0).play();
				$('.audio_img').addClass('audio_img_ani');
			}else{
				$('.w1_audio').get(0).pause();
				$('.audio_img').removeClass('audio_img_ani');
			}
		});
		
		oW1_audio.onended=function(){
			
			++iMouse;
			
			if(iMouse>3){
				iMouse=1;
			}
			
			if(oW1_audio.canPlayType("audio/mpeg")){
				oW1_audio.setAttribute("src","source/"+iMouse+".mp3");
			}else{
				oW1_audio.setAttribute("src","source/"+iMouse+".ogg");
			}
	
			oW1_audio.play();
		}
		
	}
	
	return fnAudioPlay;
	
}


function CreateIco(oParent){
	
	this.ico=document.createElement('li');
	this.ico.className='ico';
	oParent.appendChild(this.ico);
	
}

CreateIco.prototype.fnIcoMove=function(){
	
	var oIco=this.ico;
	var iW_h=$(oIco).parent().height();
	var iW_w=$(oIco).parent().width();
	
	oIco.top=iW_h*Math.random();
	fnInitialIco(oIco.top);

	var y,x;
	
	y=iW_h;
	
	oIco.regX=Math.PI*2*Math.random();
	x=oIco.left+Math.sin(oIco.regX)*200;
	
	oIco.time=(y-$(oIco).position().top)*30;
	// 可能的优化 ： 根据用户设备分辨率 生成 个数 以及 实际 的 x 与 y
	$(oIco).animate({
		"top":y,
		"left":x

	},oIco.time,function(){
		oIco.top=-50;
		fnInitialIco(oIco.top);
		
		x=oIco.left+Math.cos(oIco.regX)*200;
		y=iW_h;
		
		oIco.time=(y+10)*30;
		$(this).delay(1000).animate({
			"top":y,
			"left":x
		},oIco.time,arguments.callee);
	});
	
	
	function fnInitialIco(top){
		iW_w=$(oIco).parent().width();
		iW_h=$(oIco).parent().height();
		oIco.height=oIco.width=Math.random()*20+5;
		if(oIco.height>20){
			oIco.zIndex=6;
		}else{
			oIco.zIndex=0;
		}
		
		oIco.left=iW_w*Math.random();
		$(oIco).css({
			"left":oIco.left,
			"top":top,
			"height":oIco.height,
			"width":oIco.width,
			"z-index":oIco.zIndex
		});
	}
	
}

// wrap 2
    function fnClickLeading(oL,obj,json,bL){
     	
     	var oLeadRole={};
     	var oLeading_present=obj.children('section[data-title=leading_present]');
     	
     	 switch(oL){
         	case "yuk" : 
         	     oLeadRole.top="50%";
         	     oLeadRole.left="20%";
         	break;
         	case "yui" : 
         	     oLeadRole.top="65%";
         	     oLeadRole.left="50%";
         	break;
         	case "hach" : 
         	     oLeadRole.top="85%";
         	     oLeadRole.left="75%";
         	break;
         };
         
     	
     	if(bL){
     		obj.children('p').fadeOut('fast');
	     	obj.animate({
	     		"height":json.height,
	     		"width":json.width,
	     		"top":"0",
	     		"left":"0",
	     	}).addClass('z100');
	     	
	     	oLeading_present.show(function(){
	     		obj.find('.leading_png').animate({
	     			"left":0,
	     		});
	     		obj.find(".leading_written").animate({
	     			"left":500
	     		});
	     	});
	     	
	     	bL=false;
     	}else{
     		obj.animate({
	     		"height":"32",
	     		"width":"240",
	     		"top":oLeadRole.top,
	     		"left":oLeadRole.left,
	     	}).removeClass('z100');
	     	obj.children('p').delay(300).fadeIn('fast');
	     	
	     	oLeading_present.hide(function(){
	     		obj.find('.leading_png').css('left',"-500px");
	     		obj.find(".leading_written").css("left","1000px")
	     	});
	     	
	     	bL=true;
     	}
     	
     	return bL;
     	
     }
   
// wrap 4

function fnW4Sight(){
	
	var oSightPerson=$('.sight_person').eq(0);
	var aCell_a = $('.cell_a');
	var iCell_h=aCell_a.eq(0).height()/2;
	var iCell_w=aCell_a.eq(0).width();
	var iCell=0;
	
	var person=[{
		"alt":"比企谷八幡","src":"img/w4_ac10.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"由比滨结衣","src":'img/w4_ac2.jpg',"sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"雪之下雪乃","src":"img/w4_ac9.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":'雪之下阳乃',"src":"img/w4_ac5.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"比企谷小町","src":"img/w4_ac4.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"叶山隼人","src":"img/w4_ac6.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"三浦优美子","src":"img/w4_ac7.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"一色彩羽","src":"img/w4_ac15.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"海老名菜姬","src":"img/w4_ac14.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"平冢静","src":"img/w4_ac1.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"户冢彩加","src":"img/w4_ac3.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"材木座义辉","src":"img/w4_ac13.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"户部翔","src":"img/w4_ac11.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"川崎莎希","src":"img/w4_ac8.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	},{
		"alt":"城徊巡","src":"img/w4_ac12.jpg","sex":"略","age":"略","birthday":"略","love":"略","want":"略","Constellation":"略"
	}];
	
	// 优化 将动态创建改为 html 本身存在 修改内容   person 太多加载太慢，进网页直接点会出现空白.
	function fnSight(){
		
		oSightPerson.on({'mouseenter':function(e){
			
			    var x,y,disX,disY,mY;
			    x=e.clientX-$(this).offset().left;
			    y=e.clientY-$(this).offset().top;
			    
			    disX=Math.floor(x/iCell_w);
			    disY=Math.floor(y/iCell_h);

		    	var oDiv=$('<div><div>');
				oDiv.addClass('movecell');
				oDiv.css({
					"top":disY*iCell_h,
					"left":disX*iCell_w
				});
				oDiv.appendTo(oSightPerson);
                
                // new zero
				iCell=disX+disY*5;
				
				$.each(aCell_a,function(index,value){
					
					$(value).on('mouseenter',function (){
						
						if($('.movecell').hasClass('z100')){
							return '';
						}
						
						iCell=index;
						 if(index<5){
						 	mY=0;
						 }else if(index>=5 && index<=9){
						 	mY=1;
						 }else{
						 	mY=2;
						 }
						 	 
					      $('.movecell').stop().animate({
					      	"left":index%5*iCell_w,
					      	"top":mY*iCell_h
					      });
					});

					$(value).on('click',function(){
						var oTxt=$(this).children('li:eq(1)').text();
						
						$('.movecell').animate({
							"height":"500",
							'width':"1000",
							'left':0,
							"top":0
						}).addClass('z100');
						
                        $('.movecell').html('<img class="person_img" /><div class="person_info"><h1></h1><li><span>名字:</span><span data-title="name"></span></li><li><span>年龄:</span><span data-title="age"></span></li><li><span>性别:</span><span data-title="sex"></span></li><li><span>生日:</span><span data-title="birthday"></span></li><li><span>兴趣:</span><span data-title="love"></span></li><li><span>理想:</span><span data-title="want"></span></li><li><span>星座:</span><span data-title="Constellation"></span></li></div>');
						$('.movecell').find('img').attr('src',person[iCell].src);
						$('.movecell').find('h1').text(oTxt);
						$('span[data-title=name]').text(person[iCell].alt);
						$('span[data-title=age]').text(person[iCell].age);
						$('span[data-title=sex]').text(person[iCell].sex);
						$('span[data-title=birthday]').text(person[iCell].birthday);
						$('span[data-title=love]').text(person[iCell].love);
						$('span[data-title=want]').text(person[iCell].want);
						$('span[data-title=Constellation]').text(person[iCell].Constellation);
						
						var aLi=$('.movecell').find("li");
						$.each(aLi,function(index,value){
							setTimeout(function(){
								$(value).css({
									"transition":"margin-left 1s ease",
									"margin-left":"0"
								});
							},index*100);
						});
						
					});
					
				});
				
				$('.movecell').on('click',function(e){
                    
                    $(this).remove();
					
				});
					
			},"mouseleave":function(){
				$('.movecell').remove();
			}
		});
		
	}
	
	return fnSight;
	
}

// wrap 5 
function fnW5BeMove(){
	
	var oSightCircle=$('.sight_circle');
	
	function fnBeMove(){
		
		$.each(oSightCircle,function(index,value){
			
			$(value).hover(function(){

				$(this).find('.c_bg_move').addClass('c_bg_clip');
				$(this).find('.s_sence').css("transform","rotateY(180deg)");
				
			},function(){
				
				$(this).find('.c_bg_move').removeClass('c_bg_clip');
				$(this).find('.s_sence').css("transform","rotateY(0deg)");
				
			});
			
		});
		
	}
	
	return fnBeMove;
	
}

// wrap3 3d magic square


// 内存跑不动  ,  外接了
function fnW4Magic(){
	
	var aMagic=$('.w4_magic');
	var oW4_sight=$('.w4_sight').eq(0);
	
	function fnMagic(){
	
		oW4_sight.on({
			"mouseenter":function(e){
				
				var x,y,disX,disY;
				
				var iW4_h=oW4_sight.height();
				var iW4_w=oW4_sight.width();
				var iW4_l=oW4_sight.offset().left;
				var iW4_t=oW4_sight.offset().top;
				
				$(this).on('mousemove',function(e){
					x=e.clientX;
					y=e.clientY;
					
					disX=(x-iW4_l)/iW4_w*100;
					disY=(y-iW4_t)/iW4_h*100;
					
					oW4_sight.css({
						"transition":"none",
						"perspective-origin":disX+"% "+disY+"%"
					});
					
				});
				
			},
			"mouseleave":function(){
				
				oW4_sight.css({
					"transition":"all 1s linear",
					"perspective-origin":"center center"
				});
			}
		});
	
	}
	
	return fnMagic;
	
}



//    fn-store  

function fnGetStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,null)[name];
	}
}

function fnStartMove(obj,json,fnEnd){
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;
		
		for(var name in json){
			var cure=0;
			if(name=="opaicty"){
				cure=Math.round(fnGetStyle(obj,name)*100);
			}else{
				cure=parseInt(fnGetStyle(obj,name));
			}
			
			var speed=0;
			speed=Math.abs((json[name]-cure)/100);
		    
		    if(cure!=json[name]){
		    	bStop=false;
		    }
		    
		    if(name=="opacity"){
		    	if(Math.abs(json[name]-cure)<Math.abs(speed)){
		    		obj.style[name]=json[name];
		    		obj.style.filter="alpha(opacity:"+json[name]+")";
		    	}else{
		    		obj.style[name]=(cure+speed)/100;
		    		obj.style.filter="alpha(opacity:"+(cure+speed)+")";
		    	}
		    	
		    }else{
		    	if(Math.abs(json[name]-cure)<Math.abs(speed)){
		    		obj.style[name]=json[name]+"px";
		    	}else{
		    		obj.style[name]=cure+speed+"px";
		    	}
		    	
		    }
		    	
		}
		
		if(bStop){
			clearInterval(obj.timer);
			if(fnEnd){
				fnEnd();
			}
		}
		
	},30);
	
}




