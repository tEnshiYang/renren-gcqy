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
         url: baseURL + 'sys/lwhtgys/fileUp' ,  
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

$(function () {
	
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/lwhtgys/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'lwhtgysId', index: 'lwhtgys_id', width: 50, key: true },
			{ label: '状态', name: 'zy', index: 'zy', width: 80 }, 			
			{ label: '供应商名称', name: 'gysmc', index: 'gysmc', width: 80 }, 			
			{ label: '项目编号', name: 'xmbh', index: 'xmbh', width: 80 }, 			
			{ label: '合同类型', name: 'htlx', index: 'htlx', width: 80 }, 	
			{ label: '开户许可证',name: 'kh', index: 'kh', formatter: function (value, grid, rows, state) { return "<a class='btn btn-primary ' href=\"#\" onclick=\"Download('" + rows.khxkz + "')\">查看/下载</a>" } },
			{ label: '营业执照',name: 'zz', index: 'zz', formatter: function (value, grid, rows, state) { return "<a class='btn btn-primary ' href=\"#\" onclick=\"Download('" + rows.yyzz + "')\">查看/下载</a>" } },
			{ label: '资质证明',name: 'zm', index: 'zm', formatter: function (value, grid, rows, state) { return "<a class='btn btn-primary ' href=\"#\" onclick=\"Download('" + rows.zzzm + "')\">查看/下载</a>" } },
		
			{ label: '确认人', name: 'qrr', index: 'qrr', width: 80 }, 			
			{ label: '确认时间', name: 'qrsj', index: 'qrsj', width: 80 }			
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
			gysmc:null,
			qrr:null
		},
		showList: true,
		title: null,
		lwhtgys: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.lwhtgys = {};
		},
		update: function (event) {
			var lwhtgysId = getSelectedRow();
			if(lwhtgysId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(lwhtgysId)
		},
		saveOrUpdate: function (event) {
			vm.lwhtgys.khxkz=$("#khxkz").val();
			vm.lwhtgys.yyzz=$("#yyzz").val();
			vm.lwhtgys.zzzm=$("#zzzm").val();

			vm.lwhtgys.qyxycx=$("#qyxycx").val();

		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.lwhtgys.lwhtgysId == null ? "sys/lwhtgys/save" : "sys/lwhtgys/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.lwhtgys),
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
			var lwhtgysIds = getSelectedRows();
			if(lwhtgysIds == null){
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
                        url: baseURL + "sys/lwhtgys/delete",
                        contentType: "application/json",
                        data: JSON.stringify(lwhtgysIds),
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
		getInfo: function(lwhtgysId){
			$.get(baseURL + "sys/lwhtgys/info/"+lwhtgysId, function(r){
                vm.lwhtgys = r.lwhtgys;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'gysmc': vm.q.gysmc,'qrr': vm.q.qrr},

                page:page
            }).trigger("reloadGrid");
		}
	}
});