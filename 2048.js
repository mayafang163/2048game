var game={
	data:null,RN:4,CN:4,//保存游戏的二维数组、总行数、总列数
  score:0,//保存得分
  state:1,//保存游戏状态：1表示运行中，0表示结束
  RUNNING:1,//专门表示运行中状态
  GAMEOVER:0,//专门表示游戏结束状态
//每个属性和方法之间必须用逗号分割
//对象自己的方法要使用自己的属性，必须this.
  //=================================================================//
  start(){ //游戏启动
    this.state=this.RUNNING;//重置游戏状态为运行中
    this.score=0;//分数清零
    this.data=[]; //新建空数组保存在data中   
    // r从0开始，到<RN结束  
    for(var r=0;r<this.RN;r++){   
      this.data[r]=[];  // 新建空数组保存到data中r行
      //c从0开始，到<CN结束
      for(var c=0;c<this.CN;c++){  
        this.data[r][c]=0; // 设置data中r行c列的值为0
      }
    }  // (遍历结束)
    this.randomNum();
    this.randomNum();
    this.updateView();
    //事件：内容/设备状态的改变
    //事件处理函数：在事件发生时自动执行的操作
    document.onkeydown=function(e){
      //this->.前的document->game
      switch(e.keyCode){
        case 37: //左移
          this.moveLeft();
          break;
        case 38: //上移
          this.moveUp();
          break;
        case 39: //右移
          this.moveRight();
          break;
        case 40: //下移
          this.moveDown();
          break;
      }
    }.bind(this);
  },
  //=================================================================//
  moveLeft(){ //左移所有行
    //为数组拍照保存在before中
    var before=String(this.data);
    //遍历data中每一行  r
    for(var r=0;r<this.RN;r++){
      this.moveLeftInRow(r);//左移第r行
    }//(遍历结束)
    //为数组拍照保存在after中
    var after=String(this.data);
    //如果before不等于after
    if(before!=after){
      this.randomNum();//随机生成一个新数
      if(this.isGameOver()) //如果游戏结束
        this.state=this.GAMEOVER;//修改游戏状态
      this.updateView();//更新页面
    }
  },
  //=================================================================//
  isGameOver(){ //判断游戏是否结束
    //遍历data
    for(var r=0;r<this.RN;r++){
      for(var c=0;c<this.CN;c++){
        if(this.data[r][c]==0) return false;//如果当前元素是0，返回false
        else{//否则
          //如果c<CN-1且当前元素等于右侧元素,返回false
          if(c<this.CN-1&&this.data[r][c]==this.data[r][c+1]) return false;
          else{ //否则
            //如果r<RN-1且当前元素等于下方元素,返回false
            if(r<this.RN-1&&this.data[r][c]==this.data[r+1][c]) return false;
          }
        }
      }
    }//(遍历结束)
    return true;//true
  },
  //=================================================================//
  moveLeftInRow(r){//左移第r行
    //c从0开始，到<CN-1结束，遍历r行中每个格
    for(var c=0;c<this.CN-1;c++){
      //找r行c列右侧下一个不为0的位置nextc
      var nextc=this.getNextInRow(r,c);
      //如果nextc为-1,就退出循环
      if(nextc==-1) break;
      else //否则
        //如果c列的值是0
        if(this.data[r][c]==0){
          //将nextc列的值赋值给c列
          this.data[r][c]=this.data[r][nextc];
          //将nextc列的值置为0
          this.data[r][nextc]=0;
          c--;//c留在原地
        }else if(this.data[r][c]==this.data[r][nextc]){
        //否则 如果c列的值等于nextc列的值
          //将c列的值*2
          this.data[r][c]*=2;
          this.score+=this.data[r][c];
          //将nextc列置为0
          this.data[r][nextc]=0;
        }
    }
  },
  //=================================================================//
  getNextInRow(r,c){ //找r行c列右侧下一个不为0的位置
    //i从c+1开始，到<CN结束
    for(var i=c+1;i<this.CN;i++){
      //如果data中r行i列位置处的值不为0，就返回i
      if(this.data[r][i]!=0) return i;//返回i
    }//(遍历结束)
    return -1;//返回-1
  },
  //=================================================================//
  moveRight(){ //右移所有行
    //为数组拍照保存在before中
    var before=String(this.data);
    //遍历data中的每一行
    for(var r=0;r<this.RN;r++){
      this.moveRightInRow(r);//右移第r行
    }//(遍历结束)
    //为数组拍照保存在after中
    var after=String(this.data);
    //如果before不等于after
    if(before!=after){
      this.randomNum();//随机生成一个新数
      if(this.isGameOver()) //如果游戏结束
        this.state=this.GAMEOVER;//修改游戏状态
      this.updateView();//更新页面
    }
  },
  //=================================================================//
  moveRightInRow(r){ //右移第r行
    //c从CN-1开始，到>0结束，c-- 
    for(var c=this.CN-1;c>0;c--){
      //找r行c列前侧上一个不为0的位置prevc
      var prevc=this.getPrevInRow(r,c);
      //如果prevc为-1,就退出循环
      if(prevc==-1) break;
      else{//否则
        //如果c位置的值为0
        if(this.data[r][c]==0){
          //将prevc位置的值赋值给c位置
          this.data[r][c]=this.data[r][prevc];
          //将prevc位置的值置为0
          this.data[r][prevc]=0;
          c++;//c留在原地
        }else if(this.data[r][c]==this.data[r][prevc]){
        //否则，如果c位置的值等于prevc位置的值
          //将c位置的值*2
          this.data[r][c]*=2;
          this.score+=this.data[r][c];
          //将prevc列置为0
          this.data[r][prevc]=0;
        }
      }
    }
  },
  //=================================================================//
  getPrevInRow(r,c){  //找r行c列左侧前一个不为0的位置
    //i从c-1开始，到>=0结束，每次-1
    for(var i=c-1;i>=0;i--){
      //如果data中r行i列位置处的值不为0，就返回i
      if(this.data[r][i]!=0) return i;//返回i
    }//(遍历结束)
    return -1;//返回-1
  },
  //=================================================================//
  moveUp(){  //上移所有列
    //为数组拍照保存在before中
    var before=String(this.data);
    //遍历data中每一列
    for(var c=0;c<this.CN;c++){
      this.moveUpInCol(c);//右移第c列
    }//(遍历结束)
    //为数组拍照保存在after中
    var after=String(this.data);
    //如果before不等于after
    if(before!=after){
      this.randomNum();//随机生成一个新数
      if(this.isGameOver()) //如果游戏结束
        this.state=this.GAMEOVER;//修改游戏状态
      this.updateView();//更新页面
    }
  },
  //=================================================================//
  moveUpInCol(c){  //上移第r列
    //r从0开始,到<RN-1开始,遍历c中每个格
    for(var r=0;r<this.RN-1;r++){
      //找c列r行下方下一个不为0的位置nextr
      var nextr=this.getNextInCol(r,c);
      //如果nextr为-1,就退出循环
      if(nextr==-1) break;
      else{ // 否则
        //如果r行的值是0
        if(this.data[r][c]==0){
          //将nextr列的值赋值给r行
          this.data[r][c]=this.data[nextr][c];
          //将nextc列的值置为0
          this.data[nextr][c]=0;
          r--;//r留在原地
        }else if(this.data[r][c]==this.data[nextr][c]){ 
        //否则 如果c列的值等于nextc列的值
          this.data[r][c]*=2;
          this.score+=this.data[r][c];
          //将nextr列置为0
          this.data[nextr][c]=0;
        }
      }
    }
  },
  //=================================================================//
  getNextInCol(r,c){  //找c列r行下方下一个不为0的位置
    //i从r+1开始，到<RN结束
    for(var i=r+1;i<this.RN;i++){
      //如果data中c列i行位置处的值不为0，就返回i  
      if(this.data[i][c]!=0) return i;//返回i
    }//(遍历结束)
    return -1;//返回-1
  },
  //=================================================================//
  moveDown(){ //下移所有列
    //为数组拍照保存在before中
    var before=String(this.data);
    //遍历data中每一列c
    for(var c=0;c<this.CN;c++){
      this.moveDownInCol(c);//下移第几列
    }//(遍历结束)
    //为数组拍照保存在after中    
    var after=String(this.data);
    //如果before不等于after
    if(before!=after){
      this.randomNum();//随机生成一个新数
      if(this.isGameOver()) //如果游戏结束
        this.state=this.GAMEOVER;//修改游戏状态
      this.updateView();//更新页面
    }
  },
  //=================================================================//
  moveDownInCol(c){  //下移第r列
    //r从RN-1开始，到>0结束，遍历c列中每个格
    for(var r=this.RN-1;r>0;r--){
      //找c列r行上方上一个不为0的位置prver
      var prevr=this.getPrevInCol(r,c);
      //如果prver为-1,就退出循环
      if (prevr==-1) break;
      else{  //否则
        //如果r行的值是0
        if(this.data[r][c]==0){
        //将nextr行的值赋值给r行
        this.data[r][c]=this.data[prevr][c];
        //将prevr行的值置为0
        this.data[prevr][c]=0;
        r++;//c留在原地
        }else if(this.data[r][c]==this.data[prevr][c]){
        //否则 如果r行的值等于prevr行的值
          //将r行的值*2
          this.data[r][c]*=2;
          this.score+=this.data[r][c];
          //将prver行置为0
          this.data[prevr][c]=0;
        }
      }
    }
  },
  //=================================================================//
  getPrevInCol(r,c){ //找c列r行上方上一个不为0的位置prver
    //i从r+1开始，到>=0结束
    for(var i=r-1;i>=0;i--){
      //如果data中i行c列位置处的值不为0，就返回i
      if(this.data[i][c]!=0) return i; //返回i
    }//(遍历结束)
    return -1;//返回-1
  },
  //=================================================================//
  updateView(){ //将data中的数据更新到每个div中
    //遍历二维数组  
    for(var r=0;r<this.RN;r++){
      for(var c=0;c<this.CN;c++){
        var n=this.data[r][c];
        //找到id为crc的div
        var div=document.getElementById("c"+r+c);
        if(n!=0){//如果n不是0
          div.innerHTML=n;//设置div的内容为n
          div.className="cell n"+n;//设置div的class为cell n+n
        }else{
          div.innerHTML="";//清除div的内容
          div.className="cell";//恢复div的class为cell
        }
      }
    }
    //找到id为score的span,设置其内容为score属性
    document.getElementById("score").innerHTML=this.score;
    //找到id为gameOver的div
    var div=document.getElementById("gameOver");
    //如果游戏状态为GAMEOVER,就设置div显示
    if(this.state==this.GAMEOVER){
      div.style.display="block";
      //找到id为score的span,设置其内容为score
      document.getElementById("final").innerHTML=this.score;
    }else{//否则，就设置div隐藏
      div.style.display="none";
    }
  },
  //=================================================================//
  randomNum(){ //在一个随机位置生成2或4
    while(true){//  反复：
      //在0~RN-1之间生成随机数r
      var r=Math.floor(Math.random()*this.RN);
      //在0~CN-1之间生成随机数c
      var c=Math.floor(Math.random()*this.CN);
      //如果data中r行c列的值为0
      if(this.data[r][c]==0){
        //将data中r行c列赋值为2或4：    
        var n=Math.random();
        //随机生成一个小数，如果<0.5,就取2，否则就取4     
        this.data[r][c]=Math.random()<0.5?2:4;
        break;// 退出循环 
      }
    }
  },
}
game.start();
