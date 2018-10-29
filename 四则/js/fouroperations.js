var arry = ['+', '-', '×', '÷']
var countArry = new Array()
//随机函数，获得min到max范围内的随机数包括min和max
function getRandomNum(min, max) {
  var range = max - min
  return Math.round(Math.random() * range + min)
}
//随机生成问题集合
function randomQus(qusNum, maxNum) {
  var countArry = [qusNum]
  var charArry = []
  var correctAnswer = [qusNum]
  for (var k = 0; k < qusNum; k++) {
    countArry[k] = ''
  }
  for (var j = 0; j < qusNum; j++) {
    var n = getRandomNum(1, 3) //随机获得运算符的个数
    var numberOfCount = new Array(n + 1)
    var CountStr
    for (var i = 0; i <= n; i++) {
      var IsInt = getRandomNum(0, 1) //随机判断生成整数运算还是分数运算
      var molecule = getRandomNum(1, maxNum)
      var denominator = getRandomNum(1, maxNum)
      if (IsInt) numberOfCount[i] = getRandomNum(1, maxNum)
      //随机获得整数数组
      else numberOfCount[i] = TrueFract(molecule, denominator) //随机获得分数数组
    }
    for (var i = 0; i < n; i++) {
      var m = getRandomNum(0, 3) //随机选择运算符
      countArry[j] += numberOfCount[i] + arry[m] //随机数字和随机运算符拼接
    }
    countArry[j] += numberOfCount[n]
    //计算式子，若小于0，则把存放该式子的位置清空，重新生成式子
    var molecule = getMolecule(countIt(countArry[j]))
    var denominator = getDenominator(countIt(countArry[j]))
    var sum = eval(molecule / denominator)
    if (sum < 0) {
      countArry[j] = ''
      j--
    } else {
      var num = countIt(countArry[j])
      correctAnswer[j] = num
      console.log(num)
    }
  }
  var info = {
    question: countArry,
    answer: correctAnswer
  }
  return info
  console.log(info)
}
//计算式子
function countIt(params) {
  //console.log(eval(params));
  var num = params.split(/[\+\-\×\÷]/)
  var operator = params.match(/[\+\-\×\÷]/g)
  //先计算乘法除法
  for (var i = 0; i < operator.length; i++) {
    //console.log(operator[i]);
    //获取运算符
    var char = operator[i]
    if (char == '×' || char == '÷') {
      operator.splice(i, 1)
      //获取运算符左右的数字
      var numL = num[i]
      num.splice(i, 1)
      var numR = num[i]
      num.splice(i, 1)
      var sum = playCount(numL, numR, char)
      num.splice(i, 0, sum)
      i--
    }
  }
  //再计算加减法
  while (operator != false) {
    //获取运算符
    var char = operator[0]
    operator.splice(0, 1)
    //获取运算符左右的数字
    var numL = num[0]
    num.splice(0, 1)
    var numR = num[0]
    num.splice(0, 1)
    var sum = playCount(numL, numR, char)
    num.splice(0, 0, sum)
  }
  return sum
}
//求最大公约数
function getGCD(a, b) {
  var temp
  while (b != 0) {
    temp = a % b
    a = b
    b = temp
  }
  return a
}
//把分数转化为真分数或整数
function TrueFract(molecule, denominator) {
  if (molecule % denominator != 0) {
    var gcd = getGCD(molecule, denominator)
    if (gcd == 1) {
      if (molecule > denominator) {
        //带分数
        //最大公约数为1且分子大于分母，用真分数形式表示
        var n = parseInt(molecule / denominator)
        molecule = molecule % denominator
        var sum = n + "'" + molecule + '/' + denominator
      } else {
        //分子小于分母的分数
        var sum = molecule + '/' + denominator
      }
    }else {
      //约分
      molecule = molecule / gcd
      denominator = denominator / gcd
      var sum = TrueFract(molecule, denominator)
    }
  } else {
    //可整除，结果为整数
    var sum = parseInt(molecule / denominator)
  }
  return sum
}

//获取真分数中的分子
function getMolecule(n) {
  var str = String(n)
  if (str.search('/') == -1) {
    //整数
    var molecule = n
  } else if (str.search("'") == -1) {
    //分子小于分母的分数
    var molecule = str.split('/')[0]
  } else {
    //带分数
    var integer = parseInt(str.split("'")[0])
    var fraction = str.split("'")[1]
    var denominator = parseInt(fraction.split('/')[1])
    var molecule = parseInt(fraction.split('/')[0])
    var molecule = integer * denominator + molecule
  }
  return parseInt(molecule)
}
//获取真分数中的分母
function getDenominator(n) {
  var str = String(n)
  if (str.search('/') == -1) {
    //整数
    var denominator = 1
  } else {
    //分数
    var denominator = parseInt(str.split('/')[1])
  }
  return denominator
}
//进行一个运算符的运算
function playCount(a, b, operator) {
  //题目有可能是分数或整数，都当成分数来运算
  var moleculeA = getMolecule(a)
  var denominatorA = getDenominator(a)
  var moleculeB = getMolecule(b)
  var denominatorB = getDenominator(b)
  //匹配运算符
  switch (operator) {
    case '+': {
      var molecule = moleculeA * denominatorB + moleculeB * denominatorA
      var denominator = denominatorA * denominatorB
      var sum = TrueFract(molecule, denominator) //化为真分数或整数
      return sum
      break
    }
    case '-': {
      var molecule = moleculeA * denominatorB - moleculeB * denominatorA
      //如果分子运算结果是0，则结果为0
      if (molecule == 0) {
        var sum = 0
      } else {
        var denominator = denominatorA * denominatorB
        var sum = TrueFract(molecule, denominator)
      }
      return sum
      break
    }
    case '×': {
      var molecule = moleculeA * moleculeB
      var denominator = denominatorA * denominatorB
      var sum = TrueFract(molecule, denominator)
      return sum
      break
    }
    case '÷': {
      var molecule = moleculeA * denominatorB
      var denominator = denominatorA * moleculeB
      var sum = TrueFract(molecule, denominator)
      return sum
      break
    }
    default:
      break
  }
}
	var text1 = document.getElementById('questionNum1');
	text1.onkeyup = function(){
	this.value=this.value.replace(/\D/g,'');
	if(text1.value>5){
	  text1.value = 5;
		}
	}
	var text2 = document.getElementById('maxNum1');
	text2.onkeyup = function(){
	this.value=this.value.replace(/\D/g,'');
	if(text2.value>100){
	  text2.value = 100;
		}
	}
function playAll() {
	//将页面清空
	if(text1.value == "")
	{
		alert("请输入题目个数！！");
	}else{
		document.getElementById('myQus').innerHTML = ''
	document.getElementById('comment').innerHTML = ''
	//题目数目
	var questionNum = text1.value;
	//运算范围，最大运算数字
	var maxNum = text2.value;
	var myquanstions = randomQus(questionNum, maxNum)
	console.log(myquanstions)
	for(i = 0; i < questionNum; i++) {
		document.getElementById('myQus').innerHTML +=
			'<br>' +
			"<span class='qus'>" +
			'第' +
			(i + 1) +
			'题：' +
			myquanstions['question'][i] +
			'=' +
			'</span>' +
			"<input type='text' class='myAnswer' />" +
			"<span class='correctAnswer'>" +
			myquanstions['answer'][i] +
			'</span>'
		document.getElementById('myQus').innerHTML = ''
		document.getElementById('comment').innerHTML = ''
		//题目数目
		var questionNum = text1.value;
		//运算范围，最大运算数字
		var maxNum = text2.value;
		var myquanstions = randomQus(questionNum, maxNum)
		console.log(myquanstions)
		for(i = 0; i < questionNum; i++) {
			document.getElementById('myQus').innerHTML +=
				'<br>' +
				"<span class='qus'>" +
				'第' +
				(i + 1) +
				'题：' +
				myquanstions['question'][i] +
				'=' +
				'</span>' +
				"<input type='text' class='myAnswer' />" +
				"<span class='correctAnswer'>" +
				myquanstions['answer'][i] +
				'</span>'
		}
	}
	}
	
}
//计算填入答案的对错个数
document.getElementById('completedBtn').onclick = function() {
	if(text1.value == "")
	{
		alert("请输入题目个数！！");
	}else{
		document.getElementById('comment').innerHTML = ''
		var trueNum = 0
		var falseNum = 0
		var myAnswer = document.getElementsByClassName('myAnswer')
		var correctAnswer = document.getElementsByClassName('correctAnswer')
		for(i = 0; i < correctAnswer.length; i++) {
			if(myAnswer[i].value == correctAnswer[i].innerHTML) {
				trueNum++
			} else {
				falseNum++
			}
			correctAnswer[i].style.display = 'inline-block'
		}
		document.getElementById('comment').innerHTML +=
			'你答对的个数为:' + trueNum + '<br>' + '你答错的个数为: ' + falseNum
	}
}
//换背景
		function getstyle(obj , attr){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];//通过三木运算符来获取当前style的属性
	}
 
	function color(){
		var div = document.getElementsByTagName('div')[0];
		if (div.className.indexOf('wrap1') >= 0) { //如果wrap1.存在  
			div.className = 'wrap2';//相互转换，indexOf 返回字符串中第一次出现字符的位置，返回值为int，该表示为如果存在test1
		}else{
				div.className = 'wrap1';
		}
	}
//倒计时
		var minute,second;//时 分 秒
    minute=second=0;//初始化
    var millisecond=0;//毫秒
    var int;
    function Reset()//重置
    {
      window.clearInterval(int);
      millisecond=minute=second=0;
      document.getElementById('timetext').value='00分00秒000毫秒';
    }
  
    function start()//开始
    {
			if(text1.value == "") {
				alert("请输入题目个数！！");
			} else {
				int = setInterval(timer, 50);
			}
  	}
    function timer()//计时
    {
      millisecond=millisecond+50;
      if(millisecond>=1000)
      {
        millisecond=0;
        second=second+1;
      }
      if(second>=60)
      {
        second=0;
        minute=minute+1;
      }
  
      document.getElementById('timetext').value=minute+'分'+second+'秒'+millisecond+'毫秒';
  
    }
  
    function stop()//暂停
    {
      window.clearInterval(int);
    }









