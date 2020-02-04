var qselect=0;
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

//function change(xmid){
//	console.log("change");
//
//	console.log(xmid);
//	$('#myModal2').modal('show');
//
//}


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
		var a=strs[i].split("/");
		
		names[i]=a[a.length-1];
		console.log(names[i]);
		$('#downlist').append("<a href="+strs[i]+" download="+names[i]+">"+names[i]+"</a><br>");
	} 

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
         url: baseURL + 'sys/xm/fileUp' ,  
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
	  $("#ryGrid").jqGrid({
	        url: baseURL + 'sys/user/list',
	        datatype: "json",
	        colModel: [			
				{ label: '用户ID', name: 'userId', index: "user_id", width: 45, key: true },
				{ label: '用户名', name: 'username', width: 75 },
				{ label: '邮箱', name: 'email', width: 90 },
	            { label: '所属部门', name: 'deptName', sortable: false, width: 75 },

				{ label: '手机号', name: 'mobile', width: 100 },
				
				{ label: '创建时间', name: 'createTime', index: "create_time", width: 85}
	        ],
			viewrecords: true,
	        height: 385,
	        rowNum: 10,
			rowList : [10,30,50],
	        rownumbers: true, 
	        rownumWidth: 25, 
	        autowidth:true,
	       
	        multiselect: true,
	       
	        multiboxonly:true,
	        beforeSelectRow: beforeSelectRow,
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
        url: baseURL + 'sys/xm/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'xmId', index: 'xm_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmname', index: 'xmname', width: 80 }, 			
			{ label: '操作',name: 'cz', index: 'cz', formatter: function (value, grid, rows, state) { return "<a class='btn btn-primary ' href=\"#\" onclick=\"Modify(" + rows.xmId + ")\">上传附件</a> <a class='btn btn-primary ' href=\"#\" onclick=\"Download('" + rows.filepath + "')\">下载附件</a>" } },
			{ label: '工程编号', name: 'gcbh', index: 'gcbh', width: 80 }, 			
			{ label: '项目货币', name: 'xmhb', index: 'xmhb', width: 80 }, 			
			{ label: '区域市场', name: 'dd', index: 'dd', width: 80 },		
				

			{ label: '核算单元', name: 'hsdy', index: 'hsdy', width: 80 }, 			
			{ label: '核算单元负责人', name: 'hsdyfzr', index: 'hsdyfzr', width: 80 }, 			
				
		 			
				
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
    $.get(baseURL + "sys/dept/info", function(r){
        var colunms = Dept.initColumn();
        var table = new TreeTable(Dept.id, baseURL + "sys/dept/list", colunms);
        table.setRootCodeValue(r.deptId);
        table.setExpandColumn(2);
        table.setIdField("deptId");
        table.setCodeField("deptId");
        table.setParentCodeField("parentId");
        table.setExpandAll(false);
        table.init();
        Dept.table = table;
    });
});
//树
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
			xmname: null,
			gcbh:null
        },
        ry:{
        	username: null,
        },
        dept:{
            parentName:null,
            parentId:0,
            orderNum:0
        },
		showList: true,
		title: null,
		xm: {}
	},
	methods: {
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
			vm.xm = {};
			vm.dept = {parentName:null,parentId:0,orderNum:0};
	        vm.getDept();
		},
		update: function (event) {
			var xmId = getSelectedRow();
			if(xmId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(xmId)
		},
		saveOrUpdate: function (event) {
			 var zjjl = $("#zjjl")[0];         //获取JQuery对象
	         if(zjjl.checked){   
	            vm.xm.zjjl="是";
	         }else{
	        	 vm.xm.zjjl="否";
	         }
	         var aqpxjl = $("#aqpxjl")[0];         //获取JQuery对象
	         if(aqpxjl.checked){   
	            vm.xm.aqpxjl="是";
	         }else{
	        	 vm.xm.aqpxjl="否";
	         }
	         var khmyd = $("#khmyd")[0];         //获取JQuery对象
	         if(khmyd.checked){   
	            vm.xm.khmyd="是";
	         }else{
	        	 vm.xm.khmyd="否";
	         }
	           
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
		    	
                var url = vm.xm.xmId == null ? "sys/xm/save" : "sys/xm/update";
                var bootstrapValidator = $("#xmform").data('bootstrapValidator');
                console.log(bootstrapValidator);
                //手动触发验证
                var formData=JSON.stringify(vm.xm);
                console.log(formData);
                bootstrapValidator.validate();
                if(bootstrapValidator.isValid()){
                	  $.ajax({
                          type: "POST",
                          url: baseURL + url,
//                          data:file,
//                          contentType:false,
//                          processDate:false,
//                          async:false,
                          contentType: "application/json",
                          data: JSON.stringify(vm.xm),
                        
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
                	}
                
              
			});
		},
		del: function (event) {
			var xmIds = getSelectedRows();
			if(xmIds == null){
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
                        url: baseURL + "sys/xm/delete",
                        contentType: "application/json",
                        data: JSON.stringify(xmIds),
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
		getInfo: function(xmId){
			$.get(baseURL + "sys/xm/info/"+xmId, function(r){
                vm.xm = r.xm;
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
	                    vm.xm.hsdy=node[0].name;
	                    $('#hsdy').val(node[0].name);
	                    layer.close(index);
	                }
	            });
	        },
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				 postData:{'xmname': vm.q.xmname,'gcbh':vm.q.gcbh},
                page:page
            }).trigger("reloadGrid");
		},
		ryload: function (event) {
			/*
			vm.showList = true;*/
			
			var page1 = $("#ryGrid").jqGrid('getGridParam','page');
			$("#ryGrid").jqGrid('setGridParam',{ 
				 postData:{'username': vm.ry.username},
                page:page1
            }).trigger("reloadGrid");
		},
		saveusername: function (event) {
			
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell2": $.trim($(this).closest("tr").find("td:eq(2)").text()), "cell3": $.trim($(this).closest("tr").find("td:eq(3)").text()) };
            }).get();

            $.each(array, function (i, d) {
//                alert(d.cell2 + "|" + d.cell3);
            	if(qselect==1){
            		vm.xm.hsdyfzr=d.cell3;
                	$("#hsdyfzr").val(d.cell3);
                	$('#myModal').modal('hide');
            	}else if(qselect==2){
            		vm.xm.xmjl=d.cell3;
                	$("#xmjl").val(d.cell3);
                	$('#myModal').modal('hide');
            	}
            	
            })
   
		},
	saveusername2: function (event) {
			
		
   
		}
	}
});
//树
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
