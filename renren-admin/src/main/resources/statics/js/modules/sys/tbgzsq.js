function beforeSelectRow()
	{
    	$("#ryGrid").jqGrid('resetSelection');
	    return(true);
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
        url: baseURL + 'sys/tbgzsq/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'gzsqId', index: 'gzsq_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 	
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			

			{ label: '投标时间', name: 'tbsj', index: 'tbsj', width: 80 }, 			
			{ label: '盖章时间', name: 'gzsj', index: 'gzsj', width: 80 }, 			
			{ label: '投标保证金', name: 'tbbzj', index: 'tbbzj', width: 80 }, 			
				
			{ label: '设备材料成本', name: 'sbclcb', index: 'sbclcb', width: 80 }, 			
			{ label: '拟报价', name: 'nbj', index: 'nbj', width: 80 }			
				
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
			xmmc: null,
			
			tbbzj:null
        },
    	user:{},
		ry:{
        	xmmc: null,
        },
		showList: true,
		title: null,
		tbgzsq: {}
	},
	methods: {
		 getUser: function(){
				$.getJSON(baseURL +"sys/user/info?_"+$.now(), function(r){
					vm.user = r.user;
					console.log(vm.user);
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
			vm.tbgzsq = {};
			var na=$("#syssqr").text();
 	        console.log("na:"+na);	    
 	        vm.tbgzsq.hsdyfzr=na;
 	        $('#hsdyfzr').val(na);
		},
		update: function (event) {
			var gzsqId = getSelectedRow();
			if(gzsqId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(gzsqId)
		},
	shenpi: function (event) {
			
			//$('#header').hide();

			var gzsqId = getSelectedRow();
			console.log(gzsqId);

			if(gzsqId == null){
				return ;
			}

			//vm.showList2 = false;
            
            
            vm.getInfo(gzsqId)
            $('#myModal3').modal("show");
            
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.tbgzsq.gzsqId == null ? "sys/tbgzsq/save" : "sys/tbgzsq/update";
                var sptg = $("#sptg")[0];  
   		   	 //获取JQuery对象
   		   	 if(sptg!=null){
   		   		 
   		   	 
   			   	 if(sptg.checked){   
   		            vm.tbgzsq.spzt="审批已通过";
   		         }else{
   		        	 vm.tbgzsq.spzt="审批未通过";
   		         }
   		   	 }
                   var bootstrapValidator = $("#gzform").data('bootstrapValidator');          
                   //手动触发验证
                   bootstrapValidator.validate();
                   if(bootstrapValidator.isValid()){
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.tbgzsq),
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
			var gzsqIds = getSelectedRows();
			if(gzsqIds == null){
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
                        url: baseURL + "sys/tbgzsq/delete",
                        contentType: "application/json",
                        data: JSON.stringify(gzsqIds),
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
		getInfo: function(gzsqId){
			$.get(baseURL + "sys/tbgzsq/info/"+gzsqId, function(r){
                vm.tbgzsq = r.tbgzsq;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'xmmc': vm.q.xmmc,'tbbzj':vm.q.tbbzj},

                page:page
            }).trigger("reloadGrid");
		},ryload: function (event) {
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
            	  vm.tbgzsq.xmmc=d.cell6;
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