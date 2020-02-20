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
	var a=getNowDate();
	console.log(a);
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
        url: baseURL + 'sys/lwfwhtzf/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'lwfwhtzfId', index: 'lwfwhtzf_id', width: 50, key: true },
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
			zfbh:null,
			htmc:null,
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
		lwfwhtzf: {}
	},
	methods: {
		 getUser: function(){
				$.getJSON(baseURL +"sys/user/info?_"+$.now(), function(r){
					vm.user = r.user;
					
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
			vm.lwfwhtzf = {};
			
			vm.getXh();
			
			var date=getNowDate();
			$('#sqrq').val(date);
			$('#sqrq').text(date);
			vm.lwfwhtzf.sqrq=date;
			
			vm.lwfwhtzf.ssxmmc=vm.defaultxm.xmname;		
			var xmm=vm.defaultxm.xmname;			
	    	
          	$('#ssxmmc').val(xmm);
			$('#ssxmmc').text(xmm);				 
			var sqr=$("#syssqr").text();
	 	    console.log("sqr:"+sqr);

	 	    vm.lwfwhtzf.sqrxm=sqr;
	 	    $('#sqrxm').val(sqr);
	 	    $('#sqrxm').text(sqr);
		},
		getXh: function(){
//			console.log("getxh");
			 $.ajax({
	                type: "POST",
	                url: baseURL + "sys/lwfwhtzf/getxh",
	                contentType: "application/json",
	                data: null,
	                success: function(r){
//	                	console.log(vm.defaultxm);
	                	console.log(r);
	                	var bh=(vm.defaultxm.gcbh)+""+r.zfbh;
	    				vm.lwfwhtzf.bgbh = bh;
	    				$('#zfbh').val(bh);
	    				$('#zfbh').text(bh);

	 
	                }
	            });

		},
		update: function (event) {
			var lwfwhtzfId = getSelectedRow();
			if(lwfwhtzfId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(lwfwhtzfId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.lwfwhtzf.lwfwhtzfId == null ? "sys/lwfwhtzf/save" : "sys/lwfwhtzf/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.lwfwhtzf),
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
			var lwfwhtzfIds = getSelectedRows();
			if(lwfwhtzfIds == null){
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
                        url: baseURL + "sys/lwfwhtzf/delete",
                        contentType: "application/json",
                        data: JSON.stringify(lwfwhtzfIds),
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
		getInfo: function(lwfwhtzfId){
			$.get(baseURL + "sys/lwfwhtzf/info/"+lwfwhtzfId, function(r){
                vm.lwfwhtzf = r.lwfwhtzf;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'sqrxm': vm.q.sqrxm,'htmc':vm.q.htmc,'zfbh':vm.q.zfbh},

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
                	};
            }).get();
            $.each(array, function (i, d) {
//            	  console.log("c"+d.id);
//            	  console.log("xtmc"+d.xtmc);
    	  
            	console.log(d.htmc);
            	  vm.lwfwhtzf.htmc=d.htmc;
            	  $("#htmc").val(d.htmc);
              	  $('#myModal2').modal('hide');

            	
            })
   
		}
	}
});