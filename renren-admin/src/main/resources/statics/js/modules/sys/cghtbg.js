$(function () {
	vm.getXm();

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
 $("#htGrid").jqGrid({
     url: baseURL + 'sys/cghtdj/list',
     datatype: "json",
     colModel: [			
			{ label: '序号', name: 'cghtdjId', index: 'cghtdj_id', width: 50, key: true },							 			
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 
			{ label: '采购合同总额', name: 'cghtze', index: 'cghtze', width: 80 },
			{ label: '合同编号', name: 'htbh', index: 'htbh', width: 80 }, 			
			{ label: '合同类型', name: 'htlx', index: 'htlx', width: 80 }, 			
			{ label: '签订日期', name: 'qdrq', index: 'qdrq', width: 80 }, 			
			{ label: '累计到票金额', name: 'ljdpje', index: 'ljdpje', width: 80 }, 			
			
			{ label: '最终价', name: 'zzj', index: 'zzj', width: 80 }			
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
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/cghtbg/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'cghtbgId', index: 'cghtbg_id', width: 50, key: true },
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '变更编号', name: 'bgbh', index: 'bgbh', width: 80 }, 			
			{ label: '变更标题', name: 'bgbt', index: 'bgbt', width: 80 }, 			
			{ label: '合同原金额', name: 'htyje', index: 'htyje', width: 80 }, 			
			{ label: '本次变更金额', name: 'bcbgje', index: 'bcbgje', width: 80 }, 			
						
			{ label: '变更后金额', name: 'bghje', index: 'bghje', width: 80 }, 
			{ label: '申请人姓名', name: 'sqrxm', index: 'sqrxm', width: 80 }
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
			htbh:null,
			htmc:null,
			bgbt:null,
			sqrxm:null

		},
		defaultxm:null,
		nextbgbh:null,
		 yf:{
	        	dwmc: null,
	        },
	        ht:{
				htmc:null,
				htbh:null,
				htlx:null

			},
		showList: true,
		title: null,
		nextbgid:null,
		cghtbg: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		query3: function () {
			
			vm.yfload();
		},
		query4: function () {
			vm.htload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.cghtbg = {};
			vm.getBh();
			vm.cghtbg.ssxmmc=vm.defaultxm.xmname;
			
			
			var xmm=vm.defaultxm.xmname;	
			
			 
          	 $('#ssxmmc').val(xmm);
			 $('#ssxmmc').text(xmm);		
		},
		getBh:function(){
			 $.ajax({
	               type: "POST",
	               url: baseURL + "sys/cghtbg/getnextbh",
	               contentType: "application/json",
	               data: null,
	               success: function(r){
	            	  var bh="CGBG"+r.bgbh;
	            	  vm.nextbgbh=bh;
	            	  vm.cghtbg.bgbh=vm.nextbgbh;
	     			 $('#bgbh').val(vm.nextbgbh);
	     			 $('#bgbh').text(vm.nextbgbh);
	            	  console.log(bh);


	               }
	           });
		},
		getXm:function(){
		
			 $.ajax({
               type: "POST",
               url: baseURL + "sys/xm/getdefaultxm",
               contentType: "application/json",
               data: null,
               success: function(r){
            	  
              	 vm.defaultxm=r;
              


               }
           });
		},
		
		getXh: function(){
//			console.log("getxh");
			 $.ajax({
	                type: "POST",
	                url: baseURL + "sys/cghtbg/getxh",
	                contentType: "application/json",
	                data: null,
	                success: function(r){
//	                	console.log(vm.defaultxm);
	                	var bh=(vm.defaultxm.gcbh)+""+r.bgbh;
	    				vm.cghtbg.bgbh = bh;
	    				$('#bgbh').val(bh);
	    				$('#bgbh').text(bh);	 
	                }
	            });

		},
		update: function (event) {
			var cghtbgId = getSelectedRow();
			if(cghtbgId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(cghtbgId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.cghtbg.cghtbgId == null ? "sys/cghtbg/save" : "sys/cghtbg/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.cghtbg),
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
			var cghtbgIds = getSelectedRows();
			if(cghtbgIds == null){
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
                        url: baseURL + "sys/cghtbg/delete",
                        contentType: "application/json",
                        data: JSON.stringify(cghtbgIds),
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
		getInfo: function(cghtbgId){
			$.get(baseURL + "sys/cghtbg/info/"+cghtbgId, function(r){
                vm.cghtbg = r.cghtbg;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				 postData:{'htbh': vm.q.htbh,'htmc': vm.q.htmc,'bgbt': vm.q.bgbt,'sqrxm': vm.q.sqrxm},

				page:page
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
		htload: function (event) {
			vm.showList = true;
			var page = $("#htGrid").jqGrid('getGridParam','page');
			$("#htGrid").jqGrid('setGridParam',{ 
				 postData:{'htmc': vm.ht.htmc,'htbh': vm.ht.htbh,'htlx': vm.ht.htlx},

                page:page
            }).trigger("reloadGrid");
		},
		saveyf: function (event) {
			console.log("savvvvvvvvv");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(3)").text())};
            }).get();
            $.each(array, function (i, d) {
          	  vm.cghtbg.yfdw=d.cell6;

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
   
		},
		saveht: function (event) {
			console.log("savvvvvvvvvcccg");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("#htGrid input[type=checkbox]:checked").map(function () {
                return { 
                	"htmc": $.trim($(this).closest("tr").find("td:eq(3)").text()),
                	"cghtze": $.trim($(this).closest("tr").find("td:eq(4)").text()),
                	};
            }).get();
            $.each(array, function (i, d) {
//            	  console.log("c"+d.id);
//            	  console.log("xtmc"+d.xtmc);
//            	  
            	console.log(d.htmc);
            	
            	  vm.cghtbg.htmc=d.htmc;
            	  vm.cghtbg.htyje=d.cghtze;
            	  $("#htmc").val(d.htmc);
            	  $("#htyje").val(d.cghtze);
              	  $('#myModal4').modal('hide');

            	
            })
   
		}
	}
});