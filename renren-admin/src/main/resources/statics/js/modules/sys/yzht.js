$(function () {
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
		showList: true,
		title: null,
		yzht: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.yzht = {};
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
		}
	}
});