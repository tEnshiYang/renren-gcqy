function beforeSelectRow()
	{
    	$("#ryGrid").jqGrid('resetSelection');
	    return(true);
	}
var filecount=1;
var attachname = "file";
function refresh(){
	console.log("refresh");
	 location.reload();
}
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
function Modify(id){
	for(var i=1;i<=5;i++){
		$("#file"+i+"").hide();
	}
	$('#scxmId').val(id);
	$('#myModal2').modal('show');

}
function Download(rows){
	var strs= new Array(); //定义一数组 
	strs=rows.split("&"); //字符分割 
	strs.splice(strs.length-1,1);
	$('#downModal').modal('show');
	var names=new Array();
	
	for (i=0;i<strs.length ;i++ ) 
	{ 
		strs[i]=strs[i].slice(3);

		var a=strs[i].split("/");
		
		names[i]=a[a.length-1];
		strs[i]=baseURL+strs[i];
		 $("#yulan").attr("src",strs[i]);
		$('#downlist').append("<a href="+strs[i]+" download="+names[i]+">"+names[i]+"</a> " +
				"&nbsp;<a class='btn btn-primary ' href=\"#\" onclick=\"yulan('" + strs[i] + "')\">预览</a> <br>");
	} 

}
function yulan(str){
	$('#ylModal').modal('show');
	$('#yulantimg').attr('src',str);

	
	console.log(str);
}
function doUpload(){
	

	var scxmId=$('#scxmId').val();
	
	var formData = new FormData();
    formData.append("xmId", scxmId);
    formData.append("file1", $('#file1')[0].files[0]);
    formData.append("file2", $('#file2')[0].files[0]);
    formData.append("file3", $('#file3')[0].files[0]);
    formData.append("file4", $('#file4')[0].files[0]);
    formData.append("file5", $('#file5')[0].files[0]);
    $.ajax({  
         url: baseURL + 'sys/tbbm/fileUp' ,  
         type: 'post',  
         data: formData,  
         cache: false,
         processData: false,
         contentType: false,
         async: false
    }).done(function(res) {
    	 alert("操作成功");
    	$('#myModal2').modal('hide');

    }).fail(function(res) {
        alert("未知异常，请联系管理员");
    });
}

$(function () {
	vm.getUser();
	
	  $("#ryGrid").jqGrid({
	        url: baseURL + 'sys/genzong/list',
	        datatype: "json",
	        colModel: [			
				{ label: '序号', name: 'genzongId', index: 'genzong_id', width: 50, key: true },
				 			
				{ label: '项目编号', name: 'xmbh', index: 'xmbh', width: 80 }, 	


				{ label: '申请部门', name: 'sqbm', index: 'sqbm', width: 80 }, 	
				{ label: '申请时间', name: 'sqsj', index: 'sqsj', width: 80 }, 
				{ label: '项目名称', name: 'xmname', index: 'xmname', width: 80 },
					
				{ label: '核算单元', name: 'hsdy', index: 'hsdy', width: 80 }, 			
				{ label: '核算单元负责人', name: 'hsdyfzr', index: 'hsdyfzr', width: 80 } 			
						
	        ],
			viewrecords: true,
	        height: 385,
	        rowNum: 10,
			rowList : [10,30,50],
	        rownumbers: true, 
	        rownumWidth: 25, 
	        autowidth:true,
	        multiselect: true,
	        pager: "#ryGridPager",
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
	        	$("#ryGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	        }
	    });
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tbbm/list',
        datatype: "json",
        colModel: [			
            { label: '序号', name: 'tbbmId', index: 'tbbm_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 70 }, 
			{ label: '操作',name: 'cz', index: 'cz', formatter: function (value, grid, rows, state) { return "<a class='btn btn-primary ' href=\"#\" onclick=\"Modify(" + rows.tbbmId + ")\">上传附件</a> <a class='btn btn-primary ' href=\"#\" onclick=\"Download('" + rows.filepath + "')\">下载附件</a>" } },

			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 70 }, 
			
			{ label: '申请人', name: 'sqr', index: 'sqr', width: 80 }, 			
			{ label: '申请时间', name: 'sqsj', index: 'sqsj', width: 80 }, 			
		 			
			{ label: '投标时间', name: 'tbsj', index: 'tbsj', width: 80 }, 			
				
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
		showList: true,
		showList2: true,

		title: null,
		tbbm: {},
		
		q:{
			xmmc:null,
			sqr:null,
			tbfs:null
		},  
		user:{},
		ry:{
        	xmmc: null,
        }
	},
	methods: {
		 getUser: function(){
				$.getJSON(baseURL +"sys/user/info?_"+$.now(), function(r){
					vm.user = r.user;
					console.log(vm.user);
					
					
					if(vm.user.quanxian=="领导"){
						$('#shenpi').show();

					}else{
						$('#shenpi').hide();

					}
				});
			},
		query: function () {
			vm.reload();
		},
		query1: function () {
			
			vm.ryload();
		},	
		add: function(){
		    vm.showList = false;
			vm.title = "新增";
			vm.tbbm = {};
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

             vm.tbbm.sqsj=time;
             $('#sqsj').val(time);
             console.log("time:"+time);
             var na=$("#syssqr").text();
 	        console.log("na:"+na);
 	        vm.tbbm.sqr=na;
 	        $('#sqr').val(na);
 	      
 	        
         
			
		},
		update: function (event) {
			var tbbmId = getSelectedRow();
			if(tbbmId == null){
				return ;
			}

			vm.showList = false;
			vm.showList2 = false;
			$('#showList2').hide();
			

            vm.title = "修改";

            vm.getInfo(tbbmId)
		},
		shenpi: function (event) {
			
			//$('#header').hide();

			var tbbmId = getSelectedRow();
			console.log(tbbmId);

			if(tbbmId == null){
				return ;
			}

			//vm.showList2 = false;
            
            
            vm.getInfo(tbbmId)
            $('#myModal3').modal("show");
            
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
		   	 var sptg = $("#sptg")[0];  
		   	 //获取JQuery对象
		   	 if(sptg!=null){
		   		 
		   	 
			   	 if(sptg.checked){   
		            vm.tbbm.spzt="审批已通过";
		         }else{
		        	 vm.tbbm.spzt="审批未通过";
		         }
		   	 }
                var url = vm.tbbm.tbbmId == null ? "sys/tbbm/save" : "sys/tbbm/update";
                vm.tbbm.tbsj=$('#datetime').val();
                var bootstrapValidator = $("#gzform").data('bootstrapValidator');          
                //手动触发验证
                bootstrapValidator.validate();
                if(bootstrapValidator.isValid()){
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.tbbm),
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
             }else{
             	alert("不通过");
             	$('#btnSaveOrUpdate').button('reset');
            	$('#btnSaveOrUpdate').dequeue();
             }
   		   	 if(sptg!=null){
                 $('#myModal3').modal("hide");

   		   	 }

			});
		},
		del: function (event) {
			var tbbmIds = getSelectedRows();
			if(tbbmIds == null){
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
                        url: baseURL + "sys/tbbm/delete",
                        contentType: "application/json",
                        data: JSON.stringify(tbbmIds),
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
		getInfo: function(tbbmId){
			$.get(baseURL + "sys/tbbm/info/"+tbbmId, function(r){
                vm.tbbm = r.tbbm;
                $('#datetime').val(r.tbbm.sqsj);
                $('#datetime').text(r.tbbm.sqsj);
            });
		},
		reload: function (event) {
			vm.showList = true;
			vm.showList2 = true;
			console.log("reload");

			$('#header').show();
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'xmmc': vm.q.xmmc,'sqr':vm.q.sqr,'tbfs':vm.q.tbfs},
                page:page
            }).trigger("reloadGrid");
			window.location.reload();
		},
		ryload: function (event) {
			/*
			vm.showList = true;*/
			
			var page1 = $("#ryGrid").jqGrid('getGridParam','page');
			$("#ryGrid").jqGrid('setGridParam',{ 
				 postData:{'xmmc': vm.ry.xmmc},
                page:page1
            }).trigger("reloadGrid");
		},
		
		saveusername: function (event) {
		
	         
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
			
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(6)").text()) };
            }).get();
          
           
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            	  vm.tbbm.xmmc=d.cell6;
            	  $("#xmmc").val(d.cell6);
              	  $('#myModal').modal('hide');
//                alert(d.cell2 + "|" + d.cell3);
            /*	if(qselect==1){
            		vm.xm.hsdyfzr=d.cell3;
                	$("#hsdyfzr").val(d.cell3);
                	$('#myModal').modal('hide');
            	}else if(qselect==2){
            		vm.xm.xmjl=d.cell3;
                	$("#xmjl").val(d.cell3);
                	$('#myModal').modal('hide');
            	}*/
            	
            })
   
		}
	}
});