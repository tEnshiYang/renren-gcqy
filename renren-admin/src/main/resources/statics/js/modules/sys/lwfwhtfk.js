$(function () {
	vm.getXm();
	$("#htGrid").jqGrid({
        url: baseURL + 'sys/lwfwhtdj/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'lwfwhtId', index: 'lwfwht_id', width: 50, key: true },
			{ label: '劳务合同总额', name: 'lwhtze', index: 'lwhtze', width: 80 }, 			
			{ label: '合同状态', name: 'htzt', index: 'htzt', width: 80 }, 			
			{ label: '核算单元', name: 'hsdy', index: 'hsdy', width: 80 }, 			
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '合同编号', name: 'htbh', index: 'htbh', width: 80 }, 			
			{ label: '合同金额', name: 'htje', index: 'htje', width: 80 }, 			
			{ label: '签订日期', name: 'qdrq', index: 'qdrq', width: 80 }, 			
			{ label: '已到款金额', name: 'ydkje', index: 'ydkje', width: 80 } 			
			
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
        url: baseURL + 'sys/lwfwhtfk/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'lwfwhtfkId', index: 'lwfwhtfk_id', width: 50, key: true },
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '合同编号', name: 'htbh', index: 'htbh', width: 80 }, 			
			{ label: '付款方式', name: 'fkfs', index: 'fkfs', width: 80 }, 			
			
			{ label: '总金额', name: 'zje', index: 'zje', width: 80 }, 			
			{ label: '本次付款金额', name: 'bcfkje', index: 'bcfkje', width: 80 }, 			
					
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
			htbh:null,
			cjrxm:null

		},
		ht:{
			htmc:null,
			htbh:null,
			cjrxm:null

		},
		defaultxm:null,
		
		showList: true,
		title: null,
		lwfwhtfk: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		query2: function () {
			vm.htload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.lwfwhtfk = {};
			vm.getXh();
			vm.lwfwhtfk.ssxmmc=vm.defaultxm.xmname;		
			var xmm=vm.defaultxm.xmname;							 
          	$('#ssxmmc').val(xmm);
			$('#ssxmmc').text(xmm);				 
		
		},
		update: function (event) {
			var lwfwhtfkId = getSelectedRow();
			if(lwfwhtfkId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(lwfwhtfkId)
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
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.lwfwhtfk.lwfwhtfkId == null ? "sys/lwfwhtfk/save" : "sys/lwfwhtfk/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.lwfwhtfk),
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
			var lwfwhtfkIds = getSelectedRows();
			if(lwfwhtfkIds == null){
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
                        url: baseURL + "sys/lwfwhtfk/delete",
                        contentType: "application/json",
                        data: JSON.stringify(lwfwhtfkIds),
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
		getInfo: function(lwfwhtfkId){
			$.get(baseURL + "sys/lwfwhtfk/info/"+lwfwhtfkId, function(r){
                vm.lwfwhtfk = r.lwfwhtfk;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'htbh': vm.q.htbh,'htmc':vm.q.htmc,'cjrxm':vm.q.cjrxm},

                page:page
            }).trigger("reloadGrid");
		},
		getXh: function(){
//			console.log("getxh");
			 $.ajax({
	                type: "POST",
	                url: baseURL + "sys/lwfwhtfk/getxh",
	                contentType: "application/json",
	                data: null,
	                success: function(r){
//	                	console.log(vm.defaultxm);
	                	console.log(r);
	                	var bh=(vm.defaultxm.gcbh)+""+r.zfbh;
	    				vm.lwfwhtfk.zfbh = bh;
	    				$('#zfbh').val(bh);
	    				$('#zfbh').text(bh);

	 
	                }
	            });

		},
		htload: function (event) {
			vm.showList = true;
			var page = $("#htGrid").jqGrid('getGridParam','page');
			$("#htGrid").jqGrid('setGridParam',{ 
				postData:{'htmc': vm.ht.htmc,'htbh': vm.ht.htbh,'cjrxm': vm.ht.cjrxm},

                page:page
            }).trigger("reloadGrid");
		},
		saveht: function (event) {
			console.log("savvvvvvvvvcccg");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("#htGrid input[type=checkbox]:checked").map(function () {
                return { 
                	"htmc": $.trim($(this).closest("tr").find("td:eq(6)").text()),
                	"htje": $.trim($(this).closest("tr").find("td:eq(8)").text()),
                	"htbh": $.trim($(this).closest("tr").find("td:eq(7)").text())
                	};
            }).get();
            $.each(array, function (i, d) {
//            	  console.log("c"+d.id);
//            	  console.log("xtmc"+d.xtmc);
            	console.log(d.htje);
    	  
            	console.log(d.htmc);
            	  vm.lwfwhtfk.htmc=d.htmc;
            	  vm.lwfwhtfk.htbh=d.htbh;

            	  vm.lwfwhtfk.htje=d.htje;
            	  $("#htmc").val(d.htmc);
            	  $("#htbh").val(d.htbh);

            	  $("#zje").val(d.htje);
              	  $('#myModal2').modal('hide');

            	
            })
   
		}
	}
});