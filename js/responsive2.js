// javascript magic square
$(function(){
	
	var iW_h=$(window).height();
	var iW_w=$(window).width();
    
    fnMagicSquare(iW_h,iW_w);
	
});

	
function fnMagicSquare(iW_h,iW_w){
	
	var aStageSquare=$('.stage_square');
	var aStageSquareJs=$('.stage_square').get();
	var oMagicStage=$('.magic_stage').eq(0);
	var iMag_x=330;
	var iMag_y=405;
	var time=null;
	var speedX,speedY;
	var bBeMove=false;
	
	var aLi=aStageSquare.find('li');
	var aResults=null;
	
	for(var i=0;i<aStageSquareJs.length;i++){
		
		if(i<16){
			aStageSquareJs[i].Z=187.5;
			aStageSquareJs[i].X=i%16%4;
		}else if(i>=16 && i<32){
			aStageSquareJs[i].Z=62.5;
			aStageSquareJs[i].X=i%16%4;
		}else if(i>=32 && i<48){
			aStageSquareJs[i].Z=-62.5;
			aStageSquareJs[i].X=i%16%4;
		}else if(i>=48 && i<64){
			aStageSquareJs[i].Z=-187.5;
			aStageSquareJs[i].X=i%16%4;
		}
		
		if(i%16<4){
			aStageSquareJs[i].Y=0;
		}else if(i%16>=4 && i%16<8){
			aStageSquareJs[i].Y=1;
		}else if(i%16>=8 && i%16<12){
			aStageSquareJs[i].Y=2;
		}else if(i%16>=8 && i%16<16){
			aStageSquareJs[i].Y=3;
		}
		
	}
	
	// magic square initialize
	$.each(aStageSquare,function(index,value){
		
		if(index==21 || index==22 || index==25 || index==26 || index==37 ||index==38 || index==41 || index==42){
			$(this).css({
				"transform":"translateZ("+$(this).get(0).Z+"px)",
				"left":$(this).get(0).X*125+"px",
				"top":$(this).get(0).Y*125+"px"
			});
		}else if(index>=32){
			$(this).css({
				"transform":" rotateX("+parseInt(Math.random()*360)+"deg) rotateY("+parseInt(Math.random()*360)+"deg) translateZ("+(-parseInt(Math.random()*1000)-1000)+"px)",
			    "left":parseInt(iW_w*Math.random()-iW_w/2)+"px",
			    "top":parseInt(iW_h*Math.random()-iW_h/2)+"px",
			});
		}else{
			$(this).css({
				"transform":" rotateX("+parseInt(Math.random()*360)+"deg) rotateY("+parseInt(Math.random()*360)+"deg) translateZ("+parseInt(Math.random()*1000+1000)+"px)",
			    "left":parseInt(iW_w*Math.random()-iW_w/2)+"px",
			    "top":parseInt(iW_h*Math.random()-iW_h/2)+"px",
			});
			
		}

	});
	
	// 刷位置 position dom
	function fnNewDom(){
		
		aStageSquareJs=$('.stage_square').get();
		for(var i=0;i<aStageSquareJs.length;i++){
			
			if(i<16){
				aStageSquareJs[i].Z=187.5;
				aStageSquareJs[i].X=i%16%4;
			}else if(i>=16 && i<32){
				aStageSquareJs[i].Z=62.5;
				aStageSquareJs[i].X=i%16%4;
			}else if(i>=32 && i<48){
				aStageSquareJs[i].Z=-62.5;
				aStageSquareJs[i].X=i%16%4;
			}else if(i>=48 && i<64){
				aStageSquareJs[i].Z=-187.5;
				aStageSquareJs[i].X=i%16%4;
			}
			
			if(i%16<4){
				aStageSquareJs[i].Y=0;
			}else if(i%16>=4 && i%16<8){
				aStageSquareJs[i].Y=1;
			}else if(i%16>=8 && i%16<12){
				aStageSquareJs[i].Y=2;
			}else if(i%16>=8 && i%16<16){
				aStageSquareJs[i].Y=3;
			}
				
		}
		
	}
	
	(function(){
		
		oMagicStage.queue(function(next){
			$(this).css({
				"transition":"transform 10s linear",
				"transform":"rotateX("+iMag_x+"deg) rotateY("+iMag_y+"deg)",
			});
			next();
		}).delay(8000).queue(function(next){
			
			// 图片显示
			aLi.show();
			
			aStageSquare.children('div:parent').css({
				"background":"none",
				"border":"none"
			});
			
			next();
		}).delay(1000).queue(function(next){
			
			// 建立外包
			aResults=$.grep(aStageSquare,function(element,index){
				return index%16%4==0;
			});
			
			var oDiv=$('<div></div>');
			oDiv.addClass('interim');
			
			$(aResults).wrapAll(oDiv);
			
			next();
		}).delay(1000).queue(function(next){
			
			// 运行外包
			aStageSquare.css('transition',"none");
			oMagicStage.css('transition',"none");
			
			aStageSquare.children('div:parent').css({
				"background":"rgba(96,200,245,0.2)",
				"border":"1px rgba(96,200,245,0.6) solid"
			});
			
			$('.interim').css({
				"transition":"transform 4s ease",
				"transform":"rotateX(180deg)"
			});
			
			next();
			
		}).delay(4000).queue(function(next){
			
			// 基于已知情况下
			//console.log($('.interim').css('transform'));
			$(aResults).unwrap();
			$(aResults).detach();
			/*var aResult=$(aResults).get();
			var oMagicStage=$('.magic_stage').get(0);*/
			
			aStageSquareJs=$('.stage_square').get();
			
			/*for(var i=0;i<aResult.length;i++){
				
				if(i<4){
					oMagicStage.insertBefore(aResult[i],aStageSquareJs[48+i%4*4]);
				}
				if(i>=4 && i<8){
					oMagicStage.insertBefore(aResult[i],aStageSquareJs[32+i%4*4]);
				}
				if(i>=8 && i<12){
					oMagicStage.insertBefore(aResult[i],aStageSquareJs[16+i%4*4]);
				}
				if(i>=12 && i<16){
					oMagicStage.insertBefore(aResult[i],aStageSquareJs[0+i%4*4]);
				}
				
				aStageSquareJs=$('.stage_square').get();
				
				// 被wrap包裹在解除包裹后，位于最前端.
				
			}*/
			
			/*$.each(aResults,function(index,value){
				if(index<4){
					$(this).insertAfter(aStageSquare.eq(47+index%4*4));
				}else if(index>=4 && index<8){
					$(this).insertAfter(aStageSquare.eq(31+index%4*4));
				}else if(index>=8 && index<12){
					$(this).insertAfter(aStageSquare.eq(15+index%4*4));
				}else if(index>=12 && index<16){
					$(this).insertBefore(aStageSquare.eq(0+index%4*4));
				}
				
			});*/
			
			
			/*fnNewDom();
			
			$.each(aStageSquare,function(index,value){
				
				$(value).css({
					"transform":function(){
						return "translateZ("+$(this).get(0).Z+"px)";
					},
					"left":$(this).get(0).X*125+"px",
					"top":$(this).get(0).Y*125+"px"
				});
				
			});*/
			
			/*$.each(aResults,function(index,value){
				
				$(value).css('transform',function(){
					return "rotateX(180deg) translateZ("+$(this).get(0).Z+"px)";
				});
				
			});*/
			
			next();
			
		}).delay(1000).queue(function(){
			bBeMove=true;
			//alert('还未完成');
		});
		
		setTimeout(function(){
		
			$.each(aStageSquare,function(index,value){
				
				$(this).css({
					"transition":"all "+(Math.random()*5+3).toFixed(1)+"s ease",
					"transform":"rotateX(0deg) rotateY(0deg) translateZ("+$(this).get(0).Z+"px)",
					"left":$(this).get(0).X*125+"px",
					"top":$(this).get(0).Y*125+"px"
				});
				
			});
			
		},1000);
		
	})();
	
	
	
	$(document).on("mousedown",function(e){
		
		if(!bBeMove){
			return '';
		}
		
		var x,y,disX,disY,startX,startY,endX,endY;
		
		x=e.clientX;
		y=e.clientY;
		
		startX=iMag_x;
		startY=iMag_y;
		
		endX=x;
		endY=y;
		
		document.onmousemove=function(e){
			var oEvent=e || event;
			
			disX=parseInt((oEvent.clientX-x)/5);
			disY=parseInt((oEvent.clientY-y)/5);
			
			speedX=(oEvent.clientX-endX)/5;
			speedY=(oEvent.clientY-endY)/5;
			
			iMag_x=startX-disY;
			iMag_y=startY+disX;
			
			fnFailMove();
			
			endX=oEvent.clientX;
			endY=oEvent.clientY;
				
		}
		
		document.onmouseup=function(){
			
			fnStart();
			
			document.onmousemove=null;
			document.onmouseup=null;
			
		}
		
		fnStop();
		return false;
		
	});
	
	function fnStart(){
			
		clearInterval(time);
		time=setInterval(function(){
			
			iMag_x-=speedY;
			iMag_y+=speedX;
			
			speedX=speedX*0.93;
			speedY=speedY*0.93;
			
			if(Math.abs(speedX) < 0.1 && Math.abs(speedY) < 0.1){
				fnStop();
			}
			
			fnFailMove();
			
		},30);
		
	}
	
	function fnStop(){
		clearInterval(time);
		time=null;
	}

	function fnFailMove(){
	
		oMagicStage.css({
			"transform":"rotateX("+iMag_x+"deg) rotateY("+iMag_y+"deg)",
		});
		
	}
		
	
}
	















