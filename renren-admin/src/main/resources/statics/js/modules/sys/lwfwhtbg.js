$(function () {
	vm.getXm();
	vm.getUser();
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
        url: baseURL + 'sys/lwfwhtbg/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'lwfwhtbgId', index: 'lwfwhtbg_id', width: 50, key: true },
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '变更编号', name: 'bgbh', index: 'bgbh', width: 80 }, 			
			{ label: '变更标题', name: 'bgbt', index: 'bgbt', width: 80 }, 			
			{ label: '合同原金额', name: 'htyje', index: 'htyje', width: 80 }, 			
			{ label: '本次变更金额', name: 'bcbgje', index: 'bcbgje', width: 80 }, 			
			{ label: '申请人姓名', name: 'sqrxm', index: 'sqrxm', width: 80 }, 			
			{ label: '申请单位名称', name: 'sqdwmc', index: 'sqdwmc', width: 80 }, 			
			{ label: '变更后金额', name: 'bghje', index: 'bghje', width: 80 } 			
				
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
		ht:{
			htmc:null,
			htbh:null,
			cjrxm:null

		},
		user:{},
		defaultxm:null,
		showList: true,
		title: null,
		lwfwhtbg: {}
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
		query: function () {
			vm.reload();
		},
		query2: function () {
			vm.htload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.lwfwhtbg = {};
			
			vm.getXh();
			vm.lwfwhtbg.ssxmmc=vm.defaultxm.xmname;		
			var xmm=vm.defaultxm.xmname;							 
          	$('#ssxmmc').val(xmm);
			$('#ssxmmc').text(xmm);				 
			var sqr=$("#syssqr").text();
	 	    console.log("sqr:"+sqr);

	 	    vm.lwfwhtbg.sqrxm=sqr;
	 	    $('#sqrxm').val(sqr);
	 	    $('#sqrxm').text(sqr);
		},
		getXh: function(){
//			console.log("getxh");
			 $.ajax({
	                type: "POST",
	                url: baseURL + "sys/lwfwhtbg/getxh",
	                contentType: "application/json",
	                data: null,
	                success: function(r){
//	                	console.log(vm.defaultxm);
	                	console.log(r);
	                	var bh=(vm.defaultxm.gcbh)+""+r.bgbh;
	    				vm.lwfwhtbg.bgbh = bh;
	    				$('#htbh').val(bh);
	    				$('#htbh').text(bh);

	 
	                }
	            });

		},
		update: function (event) {
			var lwfwhtbgId = getSelectedRow();
			if(lwfwhtbgId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(lwfwhtbgId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.lwfwhtbg.lwfwhtbgId == null ? "sys/lwfwhtbg/save" : "sys/lwfwhtbg/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.lwfwhtbg),
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
			var lwfwhtbgIds = getSelectedRows();
			if(lwfwhtbgIds == null){
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
                        url: baseURL + "sys/lwfwhtbg/delete",
                        contentType: "application/json",
                        data: JSON.stringify(lwfwhtbgIds),
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
		getInfo: function(lwfwhtbgId){
			$.get(baseURL + "sys/lwfwhtbg/info/"+lwfwhtbgId, function(r){
                vm.lwfwhtbg = r.lwfwhtbg;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'htbh': vm.q.htbh,'htmc':vm.q.htmc,'bgbt':vm.q.bgbt,'sqrxm':vm.q.sqrxm},

                page:page
            }).trigger("reloadGrid");
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
                	};
            }).get();
            $.each(array, function (i, d) {
//            	  console.log("c"+d.id);
//            	  console.log("xtmc"+d.xtmc);
            	console.log(d.htje);
    	  
            	console.log(d.htmc);
            	  vm.lwfwhtbg.htmc=d.htmc;
            	  vm.lwfwhtbg.htje=d.htje;
            	  $("#htmc").val(d.htmc);
            	  $("#htyje").val(d.htje);
              	  $('#myModal2').modal('hide');

            	
            })
   
		}
	}
});