function beforeSelectRow()
	{
    	$("#ryGrid").jqGrid('resetSelection');
	    return(true);
	}
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
function Modify(id){
	for(var i=1;i<=5;i++){
		$("#file"+i+"").hide();
	}
	$('#scxmId').val(id);
	$('#myModal2').modal('show');

}
function Download(rows){
	console.log(rows);

	var strs= new Array(); //定义一数组 
	strs=rows.split("&"); //字符分割 
	strs.splice(strs.length-1,1);
	$('#downModal').modal('show');
	var names=new Array();
	
	for (i=0;i<strs.length ;i++ ) 
	{ 
		var a=strs[i].split("/");
		if(strs.length!=1){
			names[i]=a[a.length-1];
		}
		
		console.log(names[i]);
		$('#downlist').append("<a href="+strs[i]+" download="+names[i]+">"+names[i]+"</a><br>");
	} 

}
function doUpload(){
	

	var scxmId=$('#scxmId').val();
	
	var formData = new FormData();
    formData.append("zbxqdId", scxmId);
    formData.append("file1", $('#file1')[0].files[0]);
    formData.append("file2", $('#file2')[0].files[0]);
    formData.append("file3", $('#file3')[0].files[0]);
    formData.append("file4", $('#file4')[0].files[0]);
    formData.append("file5", $('#file5')[0].files[0]);
    $.ajax({  
         url: baseURL + 'sys/zbxqd/fileUp' ,  
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
        url: baseURL + 'sys/zbxqd/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'zbxqdId', index: 'zbxqd_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 70 }, 
			{ label: '操作',name: 'cz', index: 'cz', formatter: function (value, grid, rows, state) { return "<a class='btn btn-primary ' href=\"#\" onclick=\"Modify(" + rows.zbxqdId + ")\">上传附件</a> <a class='btn btn-primary ' href=\"#\" onclick=\"Download('" + rows.filepath + "')\">下载附件</a>" } },

			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 60 },
			{ label: '进展状态', name: 'jzzt', index: 'jzzt', width: 60 }, 			

			{ label: '项目概算', name: 'xmgs', index: 'xmgs', width: 80 }, 			
						
			{ label: '投标日期', name: 'tbrq', index: 'tbrq', width: 80 }, 			
			{ label: '投标截止日期', name: 'tbjzrq', index: 'tbjzrq', width: 80 }, 			
			{ label: '操作人', name: 'czr', index: 'czr', width: 80 }, 	
			{ label: '操作时间', name: 'czsj', index: 'czsj', width: 80 }			

					
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
var setting = {
	    data: {
	        simpleData: {
	            enable: true,
	            idKey: "deptId",
	            pIdKey: "parentId",
	            rootPId: -1
	        },
	        key: {
	            url:"nourl"
	        }
	    }
	};
var ztree;
var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			xmmc: null,
			sqbm:null,
			jzzt:null,
			tblx:null
        },
        dept:{
            parentName:null,
            parentId:0,
            orderNum:0
        },
        ry:{
        	xmmc: null,
        },
		showList: true,
		title: null,
		zbxqd: {}
	},
	methods: {
		getUser: function(){
			$.getJSON(baseURL +"sys/user/info?_"+$.now(), function(r){
				
				console.log(r.user);
				if(r.user.quanxian=="领导"){
					$('#shenpi').show();

				}else{
					$('#shenpi').hide();

				}
			});
		},
		 getDept: function(){
	            //加载部门树
	            $.get(baseURL + "sys/dept/select", function(r){
	                ztree = $.fn.zTree.init($("#deptTree"), setting, r.deptList);
	                var node = ztree.getNodeByParam("deptId", vm.dept.parentId);
	                ztree.selectNode(node);

	                vm.dept.parentName = node.name;
	            })
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
			vm.zbxqd = {};
			vm.dept = {parentName:null,parentId:0,orderNum:0};
	        vm.getDept();
		},
		update: function (event) {
			var zbxqdId = getSelectedRow();
			if(zbxqdId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(zbxqdId)
		},
		shenpi: function (event) {
			
			//$('#header').hide();

			var zbxqdId = getSelectedRow();
			console.log(zbxqdId);

			if(zbxqdId == null){
				return ;
			}

			//vm.showList2 = false;
            
            
            vm.getInfo(zbxqdId)
            $('#myModal3').modal("show");
            
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
		   	 var sptg = $("#sptg")[0];  
		   	 //获取JQuery对象
		   	 if(sptg!=null){
		   		 
		   	 
			   	 if(sptg.checked){   
		            vm.zbxqd.spzt="审批已通过";
		         }else{
		        	 vm.zbxqd.spzt="审批未通过";
		         }
		   	 }
		    	var url = vm.zbxqd.zbxqdId == null ? "sys/zbxqd/save" : "sys/zbxqd/update";
                var bootstrapValidator = $("#gzform").data('bootstrapValidator');          

//				
                vm.zbxqd.tbrq=$('#datetime1').val();
                vm.zbxqd.tbjzrq=$('#datetime2').val();
                vm.zbxqd.kbsj=$('#datetime3').val();
            

                //手动触发验证
                bootstrapValidator.validate();
                if(bootstrapValidator.isValid()){
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.zbxqd),
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
			var zbxqdIds = getSelectedRows();
			if(zbxqdIds == null){
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
                        url: baseURL + "sys/zbxqd/delete",
                        contentType: "application/json",
                        data: JSON.stringify(zbxqdIds),
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
		getInfo: function(zbxqdId){
			$.get(baseURL + "sys/zbxqd/info/"+zbxqdId, function(r){
                vm.zbxqd = r.zbxqd;
                $('#datetime1').val(r.zbxqd.tbrq);
                $('#datetime1').text(r.zbxqd.tbrq);
                $('#datetime2').val(r.zbxqd.tbjzrq);
                $('#datetime2').text(r.zbxqd.tbjzrq);
                $('#datetime3').val(r.zbxqd.kbsj);
                $('#datetime3').text(r.zbxqd.kbsj);
            });
		},
		 deptTree: function(){
	            layer.open({
	                type: 1,
	                offset: '50px',
	                skin: 'layui-layer-molv',
	                title: "选择部门",
	                area: ['300px', '450px'],
	                shade: 0,
	                shadeClose: false,
	                content: jQuery("#deptLayer"),
	                btn: ['确定', '取消'],
	                btn1: function (index) {
	                    var node = ztree.getSelectedNodes();
	                    //选择上级部门
	                    vm.dept.parentId = node[0].deptId;
	                    vm.dept.parentName = node[0].name;
	                    vm.zbxqd.sqbm=node[0].name;
	                    $('#sqbm').val(node[0].name);
	                    layer.close(index);
	                }
	            });
	        },
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'xmmc': vm.q.xmmc,'sqbm':vm.q.sqbm,'jzzt':vm.q.jzzt,'tblx':vm.q.tblx},

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
		//选人
		saveusername: function (event) {
			
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(6)").text()) };
            }).get();
          
           
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            	  vm.zbxqd.xmmc=d.cell6;
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

var Dept = {
	    id: "deptTable",
	    table: null,
	    layerIndex: -1
	};

	/**
	 * 初始化表格的列
	 */
	Dept.initColumn = function () {
	    var columns = [
	        {field: 'selectItem', radio: true},
	        {title: '部门ID', field: 'deptId', visible: false, align: 'center', valign: 'middle', width: '80px'},
	        {title: '部门名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '180px'},
	        {title: '上级部门', field: 'parentName', align: 'center', valign: 'middle', sortable: true, width: '100px'},
	        {title: '排序号', field: 'orderNum', align: 'center', valign: 'middle', sortable: true, width: '100px'}]
	    return columns;
	};


	function getDeptId () {
	    var selected = $('#deptTable').bootstrapTreeTable('getSelections');
	    if (selected.length == 0) {
	        alert("请选择一条记录");
	        return null;
	    } else {
	        return selected[0].id;
	    }
	}
