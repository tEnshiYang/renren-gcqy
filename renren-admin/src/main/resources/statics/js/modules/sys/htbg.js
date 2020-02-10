$(function () {
	$("#bcbgje").blur(function(){
		var a=parseInt($("#htyje").val())+parseInt($("#bcbgje").val());
		$("#bghje").val(a);
		vm.htbg.bghje=a;
	});
	
	vm.getUser();
	$("#ryGrid").jqGrid({
        url: baseURL + 'sys/xm/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'xmId', index: 'xm_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmname', index: 'xmname', width: 80 }, 			
			{ label: '工程编号', name: 'gcbh', index: 'gcbh', width: 80 }, 			
					
				

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
        url: baseURL + 'sys/htbg/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'htbgId', index: 'htbg_id', width: 50, key: true },
			{ label: '所属项目名称', name: 'ssxmmc', index: 'ssxmmc', width: 80 }, 	
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }			,
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '变更标题', name: 'bgbt', index: 'bgbt', width: 80 }, 			
			{ label: '合同原金额', name: 'htyje', index: 'htyje', width: 80 }, 			
			{ label: '本次变更金额', name: 'bcbgje', index: 'bcbgje', width: 80 }, 			
			{ label: '变更后金额', name: 'bghje', index: 'bghje', width: 80 }, 			
			{ label: '申请人姓名', name: 'sqrxm', index: 'sqrxm', width: 80 }, 			
			{ label: '申请单位名称', name: 'sqdwmc', index: 'sqdwmc', width: 80 }, 			
		
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
    $("#htGrid").jqGrid({
        url: baseURL + 'sys/yzht/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'yzhtId', index: 'yzht_id', width: 50, key: true },
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '合同金额', name: 'htje', index: 'htje', width: 80 }, 			

			{ label: '档案编号', name: 'dabh', index: 'dabh', width: 80 }, 			
			
			{ label: '财务编号', name: 'cwbh', index: 'cwbh', width: 80 }			
			
				
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#htGridPager",
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
        	$("#htGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			htbh: null,
			htmc: null,
			bgbt: null,
			sqrxm: null
		},
		ry:{xmmc:null},
		ht:{htmc:null},
		showList: true,
		title: null,
		htbg: {},
		user:{}
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
		query2: function () {
			vm.htload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.htbg = {};
			 var na=$("#syssqr").text();
	 	        console.log("na:"+na);
	 	    
	 	        vm.htbg.sqrxm=na;
	 	        $('#sqrxm').val(na);
		},
		update: function (event) {
			var htbgId = getSelectedRow();
			if(htbgId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(htbgId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.htbg.htbgId == null ? "sys/htbg/save" : "sys/htbg/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.htbg),
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
			var htbgIds = getSelectedRows();
			if(htbgIds == null){
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
                        url: baseURL + "sys/htbg/delete",
                        contentType: "application/json",
                        data: JSON.stringify(htbgIds),
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
		getInfo: function(htbgId){
			$.get(baseURL + "sys/htbg/info/"+htbgId, function(r){
                vm.htbg = r.htbg;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				 postData:{'htbh': vm.q.htbh,'gsmc': vm.q.gsmc,'bgbt': vm.q.bgbt,'sqrxm': vm.q.sqrxm},

                page:page
            }).trigger("reloadGrid");
		},ryload: function (event) {
			/*
			vm.showList = true;*/
			
			var page1 = $("#ryGrid").jqGrid('getGridParam','page');
			$("#ryGrid").jqGrid('setGridParam',{ 
				 postData:{'xmname': vm.ry.xmname},
                page:page1
            }).trigger("reloadGrid");
		},
		htload: function (event) {
			/*
			vm.showList = true;*/
			
			var page2 = $("#htGrid").jqGrid('getGridParam','page');
			$("#htGrid").jqGrid('setGridParam',{ 
				 postData:{'htmc': vm.ht.htmc},
                page:page2
            }).trigger("reloadGrid");
		}
		,
		savery: function (event) {
			console.log("savvvvvvvvv");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(3)").text())};
            }).get();
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            	  vm.htbg.ssxmmc=d.cell6;
            	  $("#ssxmmc").val(d.cell6);
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
   
		},
		saveht: function (event) {
			console.log("savvvvvvvvv");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(3)").text()),"cell7": $.trim($(this).closest("tr").find("td:eq(4)").text())};
            }).get();
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            	  vm.htbg.htmc=d.cell6;
            	  $("#htmc").val(d.cell6);
            	  vm.htbg.htyje=d.cell7;
            	  $("#htyje").val(d.cell7);
              	  $('#myModal2').modal('hide');
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