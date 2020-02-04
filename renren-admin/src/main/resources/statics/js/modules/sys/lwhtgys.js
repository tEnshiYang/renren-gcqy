$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/lwhtgys/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'lwhtgysId', index: 'lwhtgys_id', width: 50, key: true },
			{ label: '状态', name: 'zy', index: 'zy', width: 80 }, 			
			{ label: '供应商名称', name: 'gysmc', index: 'gysmc', width: 80 }, 			
			{ label: '项目编号', name: 'xmbh', index: 'xmbh', width: 80 }, 			
			{ label: '合同类型', name: 'htlx', index: 'htlx', width: 80 }, 			
			{ label: '开户许可证', name: 'khxkz', index: 'khxkz', width: 80 }, 			
			{ label: '营业执照', name: 'yyzz', index: 'yyzz', width: 80 }, 			
			{ label: '资质证明', name: 'zzzm', index: 'zzzm', width: 80 }, 			
			{ label: '确认人', name: 'qrr', index: 'qrr', width: 80 }, 			
			{ label: '确认时间', name: 'qrsj', index: 'qrsj', width: 80 }			
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
			gysmc:null,
			qrr:null
		},
		showList: true,
		title: null,
		lwhtgys: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.lwhtgys = {};
		},
		update: function (event) {
			var lwhtgysId = getSelectedRow();
			if(lwhtgysId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(lwhtgysId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.lwhtgys.lwhtgysId == null ? "sys/lwhtgys/save" : "sys/lwhtgys/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.lwhtgys),
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
			var lwhtgysIds = getSelectedRows();
			if(lwhtgysIds == null){
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
                        url: baseURL + "sys/lwhtgys/delete",
                        contentType: "application/json",
                        data: JSON.stringify(lwhtgysIds),
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
		getInfo: function(lwhtgysId){
			$.get(baseURL + "sys/lwhtgys/info/"+lwhtgysId, function(r){
                vm.lwhtgys = r.lwhtgys;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'gysmc': vm.q.gysmc,'qrr': vm.q.qrr},

                page:page
            }).trigger("reloadGrid");
		}
	}
});