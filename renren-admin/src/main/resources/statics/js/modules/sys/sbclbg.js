
function getNowDate(){
	var date=new Date();

 	var year=date.getFullYear();
 	var month=date.getMonth();
 	var day=date.getDate();

     var hour=date.getHours();
     var minute=date.getMinutes();
     var second=date.getSeconds();

     //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
     if (hour<10) {
     	hour='0'+hour;
     }
     if (minute<10) {
     	minute='0'+minute;
     }
     if (second<10) {
     	second='0'+second;
     }


     var x=date.getDay();//获取星期


     var time=year+'/'+(1+month)+'/'+day+' '+hour+':'+minute+':'+second
     return time;
}
$(function () {
	vm.getXm();
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/sbclbg/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'sbclbgId', index: 'sbclbg_id', width: 50, key: true },
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '单号', name: 'dh', index: 'dh', width: 80 }, 			
			{ label: '标题', name: 'bt', index: 'bt', width: 80 }, 			
			{ label: '需求时间', name: 'xqsj', index: 'xqsj', width: 80 }, 			
			{ label: '备注', name: 'bz', index: 'bz', width: 80 }, 			
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
			dh:null,
			bt:null
		},
		defaultxm:null,
		showList: true,
		title: null,
		sbclbg: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.sbclbg = {};
			
			vm.sbclbg.ssxm=vm.defaultxm.xmname;		
			var xmm=vm.defaultxm.xmname;			
	    	
          	$('#ssxmmc').val(xmm);
			$('#ssxmmc').text(xmm);		
			
			var date=getNowDate();
	
			vm.sbclbg.cjsj=date;
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
		update: function (event) {
			var sbclbgId = getSelectedRow();
			if(sbclbgId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(sbclbgId)
            var date=getNowDate();
        	
			vm.sbclbg.czsj=date;
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.sbclbg.sbclbgId == null ? "sys/sbclbg/save" : "sys/sbclbg/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.sbclbg),
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
			var sbclbgIds = getSelectedRows();
			if(sbclbgIds == null){
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
                        url: baseURL + "sys/sbclbg/delete",
                        contentType: "application/json",
                        data: JSON.stringify(sbclbgIds),
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
		getInfo: function(sbclbgId){
			$.get(baseURL + "sys/sbclbg/info/"+sbclbgId, function(r){
                vm.sbclbg = r.sbclbg;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'dh': vm.q.dh,'bt':vm.q.bt},

                page:page
            }).trigger("reloadGrid");
		}
	}
});