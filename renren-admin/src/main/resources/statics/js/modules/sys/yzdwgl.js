$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/yzdwgl/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'yzdwId', index: 'yzdw_id', width: 50, key: true },
			{ label: '公司名称', name: 'gsmc', index: 'gsmc', width: 80 }, 			
			{ label: '公司代码', name: 'gsdm', index: 'gsdm', width: 80 }, 			
			{ label: '公名缩写', name: 'gmsx', index: 'gmsx', width: 80 }, 			
			{ label: '公司税号', name: 'gssh', index: 'gssh', width: 80 }, 			
			{ label: '开户银行', name: 'khyh', index: 'khyh', width: 80 }, 			
			{ label: '账户', name: 'zh1', index: 'zh1', width: 80 }, 			
						
			{ label: '注册资金', name: 'zczj', index: 'zczj', width: 80 }, 			
			
			{ label: 'Email', name: 'e', index: 'E', width: 80 }, 			
			{ label: '有效期', name: 'yxq', index: 'yxq', width: 80 }, 			
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
			gsmc: null
			
        },
		showList: true,
		title: null,
		yzdwgl: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.yzdwgl = {};
		},
		update: function (event) {
			var yzdwId = getSelectedRow();
			if(yzdwId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(yzdwId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.yzdwgl.yzdwId == null ? "sys/yzdwgl/save" : "sys/yzdwgl/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.yzdwgl),
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
			var yzdwIds = getSelectedRows();
			if(yzdwIds == null){
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
                        url: baseURL + "sys/yzdwgl/delete",
                        contentType: "application/json",
                        data: JSON.stringify(yzdwIds),
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
		getInfo: function(yzdwId){
			$.get(baseURL + "sys/yzdwgl/info/"+yzdwId, function(r){
                vm.yzdwgl = r.yzdwgl;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				 postData:{'gsmc': vm.q.gsmc},
                page:page
            }).trigger("reloadGrid");
		}
	}
});