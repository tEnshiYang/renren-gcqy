function beforeSelectRow()
	{
    	$("#ryGrid").jqGrid('resetSelection');
	    return(true);
	}
$(function () {
	vm.getUser();
	
    $("#jfGrid").jqGrid({
        url: baseURL + 'sys/yzdwgl/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'yzdwId', index: 'yzdw_id', width: 50, key: true },
			{ label: '公司名称', name: 'gsmc', index: 'gsmc', width: 80 }, 	

			{ label: '公司代码', name: 'gsdm', index: 'gsdm', width: 80 }, 			
			{ label: '公名缩写', name: 'gmsx', index: 'gmsx', width: 80 }, 					
			{ label: '注册资金', name: 'zczj', index: 'zczj', width: 80 }, 			
					
			{ label: '地址', name: 'dz', index: 'dz', width: 80 }			
				
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jfGridPager",
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
        	$("#jfGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
    $("#yfGrid").jqGrid({
        url: baseURL + 'sys/gysdj/list',
        datatype: "json",
        colModel: [			
               	{ label: '序号', name: 'gysId', index: 'gys_id', width: 50, key: true },
    			{ label: '单位名称', name: 'dwmc', index: 'dwmc', width: 80 }, 			
    			{ label: '注册资金', name: 'zczj', index: 'zczj', width: 80 }, 			
    				
    	
    			{ label: '企业性质', name: 'qyxz', index: 'qyxz', width: 80 }, 			
    			{ label: '品牌', name: 'pp', index: 'pp', width: 80 }, 			
    			{ label: '地址', name: 'dz', index: 'dz', width: 80 }		
    				
				
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#yfGridPager",
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
        	$("#yfGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
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
        url: baseURL + 'sys/yzht/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'yzhtId', index: 'yzht_id', width: 50, key: true },
			{ label: '所属项目名称', name: 'ssxmmc', index: 'ssxmmc', width: 80 }, 
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '合同状态', name: 'htzt', index: 'htzt', width: 80 },
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
		
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
			ssxmmc:null,
			htmc:null,
			dabh:null
			
			
		},
		 user:{},
		ry:{
        	xmname: null,
        },
        jf:{
        	gsmc: null,
        },
        yf:{
        	dwmc: null,
        },
		showList: true,
		title: null,
		yzht: {}
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
			
			vm.jfload();
		},
		query3: function () {
			
			vm.yfload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.yzht = {};
			 var na=$("#syssqr").text();
	 	        console.log("na:"+na);
	 	    
	 	        vm.yzht.sqr=na;
	 	        $('#hsdyfzr').val(na);
		},
		update: function (event) {
			var yzhtId = getSelectedRow();
			if(yzhtId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(yzhtId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.yzht.yzhtId == null ? "sys/yzht/save" : "sys/yzht/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.yzht),
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
			var yzhtIds = getSelectedRows();
			if(yzhtIds == null){
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
                        url: baseURL + "sys/yzht/delete",
                        contentType: "application/json",
                        data: JSON.stringify(yzhtIds),
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
		getInfo: function(yzhtId){
			$.get(baseURL + "sys/yzht/info/"+yzhtId, function(r){
                vm.yzht = r.yzht;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				 postData:{'ssxmmc': vm.q.ssxmmc,'htmc': vm.q.htmc,'dabh': vm.q.dabh},

                page:page
            }).trigger("reloadGrid");
			window.location.reload();
		},ryload: function (event) {
			/*
			vm.showList = true;*/
			
			var page1 = $("#ryGrid").jqGrid('getGridParam','page');
			$("#ryGrid").jqGrid('setGridParam',{ 
				 postData:{'xmname': vm.ry.xmname},
                page:page1
            }).trigger("reloadGrid");
		},
		jfload: function (event) {
			/*
			vm.showList = true;*/
			
			var page2 = $("#jfGrid").jqGrid('getGridParam','page');
			$("#jfGrid").jqGrid('setGridParam',{ 
				 postData:{'gsmc': vm.jf.gsmc},
                page:page2
            }).trigger("reloadGrid");
		},
		yfload: function (event) {
			/*
			vm.showList = true;*/
			
			var page3 = $("#yfGrid").jqGrid('getGridParam','page');
			$("#yfGrid").jqGrid('setGridParam',{ 
				 postData:{'dwmc': vm.yf.dwmc},
                page:page3
            }).trigger("reloadGrid");
		},
		saveusername: function (event) {
			console.log("savvvvvvvvv");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(3)").text()) };
            }).get();
          
           
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            	  vm.yzht.xmname=d.cell6;
            	  $("#xmname").val(d.cell6);
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
		savejf: function (event) {
			console.log("savvvvvvvvv");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(3)").text())};
            }).get();
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            	  vm.yzht.jfdw=d.cell6;
            	  $("#jfdw").val(d.cell6);
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
   
		},
		saveyf: function (event) {
			console.log("savvvvvvvvv");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(3)").text())};
            }).get();
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            	  vm.yzht.yfdw=d.cell6;
            	  $("#yfdw").val(d.cell6);
              	  $('#myModal3').modal('hide');
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