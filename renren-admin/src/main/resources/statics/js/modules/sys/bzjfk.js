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
        url: baseURL + 'sys/bzjfk/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'bzjfkId', index: 'bzjfk_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 			
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '收款单位', name: 'skdw', index: 'skdw', width: 80 }, 			
			{ label: '付款方式', name: 'fkfs', index: 'fkfs', width: 80 }, 			
			{ label: '投标保证金(元)', name: 'tbbzj', index: 'tbbzj', width: 80 }, 			
			{ label: '汇款截止时间', name: 'hkjzrq', index: 'hkjzrq', width: 80 }, 						
			{ label: '创建人', name: 'cjr', index: 'cjr', width: 80 }, 			
			{ label: '创建时间', name: 'cjsj', index: 'cjsj', width: 80 }, 			
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

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			fkfs: null,
			
			skdw:null
        },
        ry:{
        	xmmc: null,
        },
        user:{},
		showList: true,
		title: null,
		bzjfk: {}
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
			vm.bzjfk = {};
			 var na=$("#syssqr").text();
	 	        console.log("na:"+na);
	 	    
	 	        vm.bzjfk.hsdyfzr=na;
	 	        $('#hsdyfzr').val(na);
		},
		update: function (event) {
			var bzjfkId = getSelectedRow();
			if(bzjfkId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(bzjfkId)
		},
		shenpi: function (event) {
			
			//$('#header').hide();

			var bzjfkId = getSelectedRow();
			console.log(bzjfkId);

			if(bzjfkId == null){
				return ;
			}

			//vm.showList2 = false;
            
            
            vm.getInfo(bzjfkId)
            $('#myModal3').modal("show");
            
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
		    	 var sptg = $("#sptg")[0];  
			   	 //获取JQuery对象
			   	 if(sptg!=null){
			   		 
			   	 
				   	 if(sptg.checked){   
			            vm.bzjfk.spzt="审批已通过";
			         }else{
			        	 vm.bzjfk.spzt="审批未通过";
			         }
			   	 }
		    	var url = vm.bzjfk.bzjfkId == null ? "sys/bzjfk/save" : "sys/bzjfk/update";
                var bootstrapValidator = $("#gzform").data('bootstrapValidator');          
                //手动触发验证
                bootstrapValidator.validate();
                if(bootstrapValidator.isValid()){
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.bzjfk),
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
			var bzjfkIds = getSelectedRows();
			if(bzjfkIds == null){
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
                        url: baseURL + "sys/bzjfk/delete",
                        contentType: "application/json",
                        data: JSON.stringify(bzjfkIds),
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
		getInfo: function(bzjfkId){
			$.get(baseURL + "sys/bzjfk/info/"+bzjfkId, function(r){
                vm.bzjfk = r.bzjfk;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{'fkfs': vm.q.fkfs,'skdw':vm.q.skdw},

                page:page
            }).trigger("reloadGrid");
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
            	  vm.bzjfk.xmmc=d.cell6;
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