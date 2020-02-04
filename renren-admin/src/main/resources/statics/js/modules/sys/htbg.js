$(function () {
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
		showList: true,
		title: null,
		htbg: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.htbg = {};
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
		}
	}
});