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
	vm.getUser();
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/wjzgl/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'wjzglId', index: 'wjzgl_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 			
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '编号', name: 'bh', index: 'bh', width: 80 }, 			
			{ label: '需求部门', name: 'xqbm', index: 'xqbm', width: 80 }, 			
			{ label: '申请人', name: 'sqr', index: 'sqr', width: 80 }, 			
			{ label: '申请日期', name: 'sqrq', index: 'sqrq', width: 80 }, 			
			{ label: '项目档案编号', name: 'xmdabh', index: 'xmdabh', width: 80 }, 			
			{ label: '工程名称', name: 'gcmc', index: 'gcmc', width: 80 }, 			
			{ label: '工程合同价', name: 'gchtj', index: 'gchtj', width: 80 } 			
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
			bh:null,
			xqbm:null,
			gcmc:null,
			xmdabh:null
		},
		defaultxm:null,
		user:{},
		showList: true,
		title: null,
		wjzgl: {}
	},
	methods: {
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
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.wjzgl = {};
			
			vm.wjzgl.xmmc=vm.defaultxm.xmname;		
			var xmm=vm.defaultxm.xmname;			
	    	
          	$('#xmmc').val(xmm);
			$('#xmmc').text(xmm);		
			
			var date=getNowDate();
          	$('#sqrq').val(date);
			$('#sqrq').text(date);	
			vm.wjzgl.sqrq=date;
			 var na=$("#syssqr").text();
 	        console.log("na:"+na);
 	    
 	        vm.wjzgl.sqr=na;
 	        $('#sqr').val(na);
		},
		update: function (event) {
			var wjzglId = getSelectedRow();
			if(wjzglId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(wjzglId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.wjzgl.wjzglId == null ? "sys/wjzgl/save" : "sys/wjzgl/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.wjzgl),
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
			var wjzglIds = getSelectedRows();
			if(wjzglIds == null){
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
                        url: baseURL + "sys/wjzgl/delete",
                        contentType: "application/json",
                        data: JSON.stringify(wjzglIds),
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
		getInfo: function(wjzglId){
			$.get(baseURL + "sys/wjzgl/info/"+wjzglId, function(r){
                vm.wjzgl = r.wjzgl;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'bh': vm.q.bh,'xqbm':vm.q.xqbm,'gcmc':vm.q.gcmc,'xmdabh':vm.q.xmdabh},

                page:page
            }).trigger("reloadGrid");
		}
	}
});