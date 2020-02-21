var qselect=0;
function beforeSelectRow()
	{
    	$("#ryGrid").jqGrid('resetSelection');
	    return(true);
	}
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
$(function () {
	vm.getUser();
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
        url: baseURL + 'sys/genzong/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'genzongId', index: 'genzong_id', width: 50, key: true },
			 			
			{ label: '项目编号', name: 'xmbh', index: 'xmbh', width: 80 }, 	
			{ label: '进展状况', name: 'mqzk', index: 'mqzk', width: 80 }, 
			{ label: '申请部门', name: 'sqbm', index: 'sqbm', width: 80 }, 	
			{ label: '申请时间', name: 'sqsj', index: 'sqsj', width: 80 }, 
			{ label: '项目名称', name: 'xmname', index: 'xmname', width: 80 },
			{ label: '项目地址', name: 'xmdz', index: 'xmdz', width: 80 }, 		
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
    
    //选人
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

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			xmname: null,
			xmbh:null,
			jzzk:null
        },
		showList: true,
		title: null,
		genzong: {},
	    dept:{
            parentName:null,
            parentId:0,
            orderNum:0
        },
        user:{},
        ry:{
        	username: null,
        }
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
	        getUser: function(){
				$.getJSON(baseURL +"sys/user/info?_"+$.now(), function(r){
					vm.user = r.user;
					
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
			vm.genzong = {};
			//树
			vm.dept = {parentName:null,parentId:0,orderNum:0};
	        vm.getDept();
	        var na=$("#sysjbr").text();
	     
	        var dh=$("#sysdh").text();

	        vm.genzong.jbr=na;
	        $('#jbr').val(na);
	        vm.genzong.jbrdh=dh;
	        $("#jbrdh").val(dh);
		},
		update: function (event) {
			var genzongId = getSelectedRow();
			if(genzongId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "查看";
            
            vm.getInfo(genzongId)
		},
		saveOrUpdate: function (event) {
		 $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
		
             var url = vm.genzong.genzongId == null ? "sys/genzong/save" : "sys/genzong/update";
     		vm.genzong.yzbsj=$('#datetime').val();

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

           vm.genzong.sqsj=time;
             var bootstrapValidator = $("#gzform").data('bootstrapValidator');          
             //手动触发验证
             bootstrapValidator.validate();
             if(bootstrapValidator.isValid()){
             
//           	  alert("通过");
             		//提交表单
//             		 document.getElementById("gainAddForm").submit();
             		  $.ajax({
                           type: "POST",
                           url: baseURL + url,
                           contentType: "application/json",
                           data: JSON.stringify(vm.genzong),
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
           
			});
		},
		del: function (event) {
			var genzongIds = getSelectedRows();
			if(genzongIds == null){
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
                        url: baseURL + "sys/genzong/delete",
                        contentType: "application/json",
                        data: JSON.stringify(genzongIds),
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
		getInfo: function(genzongId){
			$.get(baseURL + "sys/genzong/info/"+genzongId, function(r){
                vm.genzong = r.genzong;
                console.log(r.genzong.yzbsj);
                $('#datetime').val(r.genzong.yzbsj);
                $('#datetime').text(r.genzong.yzbsj);
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
	                    vm.genzong.hsdy=node[0].name;
	                    $('#hsdy').val(node[0].name);
	                    layer.close(index);
	                }
	            });
	        },
		reload: function (event) {
			vm.showList = true;
			
			var page = $("#jqGrid").jqGrid('getGridParam','page');
/*			alert(vm.q.sqbm);
*/			$("#jqGrid").jqGrid('setGridParam',{ 
			postData:{'xmname': vm.q.xmname,'xmbh':vm.q.xmbh,'jzzk':vm.q.jzzk},

                page:page
            }).trigger("reloadGrid");
			window.location.reload();
		},
		ryload: function (event) {
			/*
			vm.showList = true;*/
			
			var page1 = $("#ryGrid").jqGrid('getGridParam','page');
			$("#ryGrid").jqGrid('setGridParam',{ 
				 postData:{'username': vm.ry.username,'quanxian':"负责人"},
                page:page1
            }).trigger("reloadGrid");
		},
		saveusername: function (event) {
			
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell2": $.trim($(this).closest("tr").find("td:eq(2)").text()), "cell3": $.trim($(this).closest("tr").find("td:eq(3)").text()),"cell4": $.trim($(this).closest("tr").find("td:eq(6)").text()) };
            }).get();

            $.each(array, function (i, d) {
//                alert(d.cell2 + "|" + d.cell3);
            	if(qselect==1){
            		vm.genzong.hsdyfzr=d.cell3;
                	$("#hsdyfzr").val(d.cell3);
                	vm.genzong.hsdyfzrdh=d.cell4;
                	$("#hsdyfzrdh").val(d.cell4);
                	$('#myModal').modal('hide');
            	}else if(qselect==2){
            		vm.genzong.dqfzrxm=d.cell3;
                	$("#dqfzrxm").val(d.cell3);
                	vm.genzong.dqfzrdh=d.cell4;
                	$("#dqfzrdh").val(d.cell4);
                	$('#myModal').modal('hide');
            	}
            	
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
