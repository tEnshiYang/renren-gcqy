var filecount=1;
var attachname = "file";

function addInput(){
	console.log("i="+filecount);
	if(filecount>0&&filecount<=5){
		console.log("add");
	var attach = attachname + filecount ;
	$("#file"+filecount+"").show();

	filecount=filecount+1;
	
	}
}
function deleteInput(){
	if(filecount>1){
		console.log("remove");
		filecount=filecount-1;
	//	var obj=document.getElementById("#file"+filecount+"");
		$("#file"+filecount+"").val('');
		$("#file"+filecount+"").hide();


		
	}
}
function Download(rows){
	console.log("download");
	console.log(rows);

	var pathName=window.document.location.pathname;
	//截取，得到项目名称
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	var strs= new Array(); //定义一数组 
	strs=rows.split("&"); //字符分割 
	strs.splice(strs.length-1,1);
	$('#downModal').modal('show');
	var names=new Array();
	
	for (i=0;i<strs.length ;i++ ) 
	{ 
		var a=strs[i].split("/");
		strs[i]=projectName+strs[i].substr(2,strs[i].length-1);

		names[i]=a[a.length-1];
		
		$('#downlist').append("<a href="+strs[i]+" download="+names[i]+">"+names[i]+"</a><br>");
	} 

}

function doUpload(){	
	var filename=$('#filename').val();	
	var formData = new FormData();
    formData.append("filename", filename);
    formData.append("file1", $('#file1')[0].files[0]);
    formData.append("file2", $('#file2')[0].files[0]);
    formData.append("file3", $('#file3')[0].files[0]);
    formData.append("file4", $('#file4')[0].files[0]);
    formData.append("file5", $('#file5')[0].files[0]);
    $.ajax({  
         url: baseURL + 'sys/gczl/fileUp' ,  
         type: 'post',  
         data: formData,  
         cache: false,
         processData: false,
         contentType: false,
         async: false
    }).done(function(res) {
    	console.log("done"+res.filepath);
    	
    	$('#'+filename).val(res.filepath);
    	$('#'+filename).text(res.filepath);
    	
    	 alert("操作成功");
    	$('#myModal2').modal('hide');

    }).fail(function(res) {
    	console.log("fail:"+res);
        alert("未知异常，请联系管理员");
    });
}
function Modify(name){
	for(var i=1;i<=5;i++){
		$("#file"+i+"").hide();
	}
	console.log(name);
	$('#filename').val(name);
	$('#myModal2').modal('show');

}
function getNowDate(){
	var date=new Date();

 	var year=date.getFullYear();
 	var month=date.getMonth();
 	var day=date.getDate();

     var hour=date.getHours();
     var minute=date.getMinutes();
     var second=date.getSeconds();

     //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
     if (hour<10) {
     	hour='0'+hour;
     }
     if (minute<10) {
     	minute='0'+minute;
     }
     if (second<10) {
     	second='0'+second;
     }


     var x=date.getDay();//获取星期


     var time=year+'/'+(1+month)+'/'+day+' '+hour+':'+minute+':'+second
     return time;
}
$(function () {
	vm.getXm();
	vm.getUser();

    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/gczl/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'gczlId', index: 'gczl_id', width: 50, key: true },
				
			{ label: '资料名称', name: 'zlmc', index: 'zlmc', width: 80 }, 			
			{ label: '记录时间', name: 'jlsj', index: 'jlsj', width: 80 }, 			
				
			{ label: '操作人', name: 'czr', index: 'czr', width: 80 }, 			
			{ label: '操作时间', name: 'czsj', index: 'czsj', width: 80 }, 			
			{ label: '创建人', name: 'cjr', index: 'cjr', width: 80 }, 			
			{ label: '创建时间', name: 'cjsj', index: 'cjsj', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			zlmc:null
		},
		user:{},
		defaultxm:null,
		showList: true,
		title: null,
		gczl: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		getUser: function(){
			$.getJSON(baseURL +"sys/user/info?_"+$.now(), function(r){
				vm.user = r.user;
				
				if(vm.user.quanxian=="领导"){
					$('#shenpi').show();

				}else{
					$('#shenpi').hide();

				}
			});
		},
		getXm:function(){
			 $.ajax({
           type: "POST",
           url: baseURL + "sys/xm/getdefaultxm",
           contentType: "application/json",
           data: null,
           success: function(r){
          	 vm.defaultxm=r;


           }
       });
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.gczl = {};
			vm.gczl.cjr=vm.user.username;
			vm.gczl.cjsj=getNowDate();
			vm.gczl.ssxm=vm.defaultxm.xmname;		
			var xmm=vm.defaultxm.xmname;			
	    	
          	$('#ssxmmc').val(xmm);
			$('#ssxmmc').text(xmm);	
		},
		update: function (event) {
			var gczlId = getSelectedRow();
			if(gczlId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
         
            vm.getInfo(gczlId)
         
		},
		saveOrUpdate: function (event) {
			vm.gczl.fj=$('#fj').val();
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.gczl.gczlId == null ? "sys/gczl/save" : "sys/gczl/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.gczl),
                    success: function(r){
                        if(r.code === 0){
                             layer.msg("操作成功", {icon: 1});
                             vm.reload();
                             $('#btnSaveOrUpdate').button('reset');
                             $('#btnSaveOrUpdate').dequeue();
                        }else{
                            layer.alert(r.msg);
                            $('#btnSaveOrUpdate').button('reset');
                            $('#btnSaveOrUpdate').dequeue();
                        }
                    }
                });
			});
		},
		del: function (event) {
			var gczlIds = getSelectedRows();
			if(gczlIds == null){
				return ;
			}
			var lock = false;
            layer.confirm('确定要删除选中的记录？', {
                btn: ['确定','取消'] //按钮
            }, function(){
               if(!lock) {
                    lock = true;
		            $.ajax({
                        type: "POST",
                        url: baseURL + "sys/gczl/delete",
                        contentType: "application/json",
                        data: JSON.stringify(gczlIds),
                        success: function(r){
                            if(r.code == 0){
                                layer.msg("操作成功", {icon: 1});
                                $("#jqGrid").trigger("reloadGrid");
                            }else{
                                layer.alert(r.msg);
                            }
                        }
				    });
			    }
             }, function(){
             });
		},
		getInfo: function(gczlId){
			$.get(baseURL + "sys/gczl/info/"+gczlId, function(r){
                vm.gczl = r.gczl;
                vm.gczl.czr=vm.user.username;
    			vm.gczl.czsj=getNowDate();
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'zlmc': vm.q.zlmc},

                page:page
            }).trigger("reloadGrid");
		}
	}
});