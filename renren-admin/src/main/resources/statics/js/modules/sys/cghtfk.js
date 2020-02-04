$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/cghtfk/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'tbCghtfk', index: 'tb_cghtfk', width: 50, key: true },
			{ label: '合同编号', name: 'htzt', index: 'htzt', width: 80 }, 			
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '合同编号', name: 'htbh', index: 'htbh', width: 80 }, 			
			{ label: '支付类别', name: 'zflb', index: 'zflb', width: 80 }, 			
			{ label: '付款方式', name: 'fkfs', index: 'fkfs', width: 80 }, 			
			{ label: '总金额', name: 'zje', index: 'zje', width: 80 }, 			
			{ label: '本次付款金额', name: 'bcfkje', index: 'bcfkje', width: 80 }, 			
			{ label: '已付款金额', name: 'yfkje', index: 'yfkje', width: 80 }, 			
			{ label: '剩余付款金额', name: 'syfkje', index: 'syfkje', width: 80 }, 			
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
			htmc:null,
			htbh:null,
			htlx:null

		},
		showList: true,
		title: null,
		cghtfk: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.cghtfk = {};
		},
		update: function (event) {
			var tbCghtfk = getSelectedRow();
			if(tbCghtfk == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(tbCghtfk)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.cghtfk.tbCghtfk == null ? "sys/cghtfk/save" : "sys/cghtfk/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.cghtfk),
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
			var tbCghtfks = getSelectedRows();
			if(tbCghtfks == null){
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
                        url: baseURL + "sys/cghtfk/delete",
                        contentType: "application/json",
                        data: JSON.stringify(tbCghtfks),
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
		getInfo: function(tbCghtfk){
			$.get(baseURL + "sys/cghtfk/info/"+tbCghtfk, function(r){
                vm.cghtfk = r.cghtfk;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				 postData:{'htmc': vm.q.htmc,'htbh': vm.q.htbh,'htlx': vm.q.htlx},

                page:page
            }).trigger("reloadGrid");
		}
	}
});