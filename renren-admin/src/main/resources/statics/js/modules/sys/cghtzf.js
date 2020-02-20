$(function () {
	vm.getXm();
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
        url: baseURL + 'sys/cghtzf/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'cghtzfId', index: 'cghtzf_id', width: 50, key: true },
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '作废编号', name: 'zfbh', index: 'zfbh', width: 80 }, 			
			{ label: '申请人姓名', name: 'sqrxm', index: 'sqrxm', width: 80 }, 			
			{ label: '申请日期', name: 'sqrq', index: 'sqrq', width: 80 }, 			
			{ label: '操作人', name: 'czr', index: 'czr', width: 80 }, 			
			{ label: '操作时间', name: 'czsj', index: 'czsj', width: 80 }, 			
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
			htmc:null,
			zfbh:null,

			sqrxm:null

		},
		defaultxm:null,
		ht:{
			htmc:null,
			htbh:null,
			htlx:null

		},
		nextzfid:null,

		showList: true,
		title: null,
		cghtzf: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		query4: function () {
			vm.htload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.cghtzf = {};
			vm.getBh();
			
			vm.cghtzf.ssxmmc=vm.defaultxm.xmname;
			
			
			var xmm=vm.defaultxm.xmname;	
			
			 
          	 $('#ssxmmc').val(xmm);
			 $('#ssxmmc').text(xmm);	
		},
		getBh:function(){
			 $.ajax({
	               type: "POST",
	               url: baseURL + "sys/cghtzf/getnextbh",
	               contentType: "application/json",
	               data: null,
	               success: function(r){
	            	  var bh="CGZF"+r.zfbh;
	            	  vm.nextzfbh=bh;
	            	  vm.cghtzf.zfbh=vm.nextzfbh;
	     			 $('#zfbh').val(vm.nextzfbh);
	     			 $('#zfbh').text(vm.nextzfbh);
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
		htload: function (event) {
			vm.showList = true;
			var page = $("#htGrid").jqGrid('getGridParam','page');
			$("#htGrid").jqGrid('setGridParam',{ 
				 postData:{'htmc': vm.ht.htmc,'htbh': vm.ht.htbh,'htlx': vm.ht.htlx},

                page:page
            }).trigger("reloadGrid");
		},
		update: function (event) {
			var cghtzfId = getSelectedRow();
			if(cghtzfId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(cghtzfId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.cghtzf.cghtzfId == null ? "sys/cghtzf/save" : "sys/cghtzf/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.cghtzf),
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
			var cghtzfIds = getSelectedRows();
			if(cghtzfIds == null){
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
                        url: baseURL + "sys/cghtzf/delete",
                        contentType: "application/json",
                        data: JSON.stringify(cghtzfIds),
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
		getInfo: function(cghtzfId){
			$.get(baseURL + "sys/cghtzf/info/"+cghtzfId, function(r){
                vm.cghtzf = r.cghtzf;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				 postData:{'htmc': vm.q.htmc,'zfbh': vm.q.zfbh,'sqrxm': vm.q.sqrxm},

                page:page
            }).trigger("reloadGrid");
		},
		saveht: function (event) {
			console.log("savvvvvvvvvcccg");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("#htGrid input[type=checkbox]:checked").map(function () {
                return { 
                	"htmc": $.trim($(this).closest("tr").find("td:eq(3)").text()),
                	"qdrq": $.trim($(this).closest("tr").find("td:eq(7)").text()),
                	};
            }).get();
            $.each(array, function (i, d) {
//            	  console.log("c"+d.id);
//            	  console.log("xtmc"+d.xtmc);
//            	  
            	console.log(d.htmc);
            	
            	  vm.cghtzf.htmc=d.htmc;
            	  vm.cghtzf.htqdrq=d.qdrq;
            	  $("#htmc").val(d.htmc);
            	  $("#htqdrq").val(d.qdrq);
              	  $('#myModal4').modal('hide');

            	
            })
   
		}
	}
});