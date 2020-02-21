function beforeSelectRow()
	{
    	$("#ryGrid").jqGrid('resetSelection');
	    return(true);
	}
$(function () {
	$("#xmGrid").jqGrid({
        url: baseURL + 'sys/xm/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'xmId', index: 'xm_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmname', index: 'xmname', width: 80 }, 			
			{ label: '工程编号', name: 'gcbh', index: 'gcbh', width: 80 }, 			
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
        pager: "#xmGridPager",
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
        	$("#xmGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
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
        url: baseURL + 'sys/fyjklkddj/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'fyjklkddjId', index: 'fyjklkddj_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 			
			{ label: '状态', name: 'zt', index: 'zt', width: 80 }, 			
			{ label: '项目负责人', name: 'xmfzr', index: 'xmfzr', width: 80 }, 			
			{ label: '来款日期', name: 'lkrq', index: 'lkrq', width: 80 }, 			
			{ label: '来款来源', name: 'lkly', index: 'lkly', width: 80 }, 			
			{ label: '来款金额', name: 'lkje', index: 'lkje', width: 80 }, 			
			{ label: '来款单位', name: 'lkdw', index: 'lkdw', width: 80 }, 			
					
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
			xmmc:null,
			xmfzr:null
		},
		user:{},
        ry:{
        	username: null,
        },
        xm:{
			xmname: null,
			gcbh:null
        },
		showList: true,
		title: null,
		fyjklkddj: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		query1: function () {
			
			vm.ryload();
		},
		query2: function () {
			
			vm.xmload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.fyjklkddj = {};
		},
		update: function (event) {
			var fyjklkddjId = getSelectedRow();
			if(fyjklkddjId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(fyjklkddjId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.fyjklkddj.fyjklkddjId == null ? "sys/fyjklkddj/save" : "sys/fyjklkddj/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.fyjklkddj),
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
			var fyjklkddjIds = getSelectedRows();
			if(fyjklkddjIds == null){
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
                        url: baseURL + "sys/fyjklkddj/delete",
                        contentType: "application/json",
                        data: JSON.stringify(fyjklkddjIds),
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
		getInfo: function(fyjklkddjId){
			$.get(baseURL + "sys/fyjklkddj/info/"+fyjklkddjId, function(r){
                vm.fyjklkddj = r.fyjklkddj;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'xmmc': vm.q.xmmc,'xmfzr':vm.q.xmfzr},

                page:page
            }).trigger("reloadGrid");
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
            	
            		vm.fyjklkddj.xmfzr=d.cell3;
                	$("#xmfzr").val(d.cell3);
                
                	$('#myModal').modal('hide');
            
            	
            })
   
		},
		xmload: function (event) {
			vm.showList = true;
			var page = $("#xmGrid").jqGrid('getGridParam','page');
			$("#xmGrid").jqGrid('setGridParam',{ 
				 postData:{'xmname': vm.xm.xmname,'gcbh':vm.xm.gcbh},
                page:page
            }).trigger("reloadGrid");
			window.location.reload();
		},
		savexm: function (event) {
			console.log("savvvvvvvvv");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(2)").text())};
            }).get();
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            	  vm.fyjklkddj.xmmc=d.cell6;
            	  $("#xmmc").val(d.cell6);
//            	  vm.yzfpdj.htbh=d.cell7;
//            	  $("#htbh").val(d.cell7);
              	  $('#myModal2').modal('hide');

            	
            })
   
		}
	}
});