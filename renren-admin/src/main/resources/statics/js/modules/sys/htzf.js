$(function () {
	vm.getXm();
	vm.getUser();
    $("#htGrid").jqGrid({
        url: baseURL + 'sys/yzht/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'yzhtId', index: 'yzht_id', width: 50, key: true },
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '合同金额', name: 'htje', index: 'htje', width: 80 }, 			
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
        url: baseURL + 'sys/htzf/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'htzfId', index: 'htzf_id', width: 50, key: true },
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '所属项目名称', name: 'ssxmmc', index: 'ssxmmc', width: 80 }, 			
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '作废编号', name: 'zfbh', index: 'zfbh', width: 80 }, 			
			{ label: '申请人姓名', name: 'sqrxm', index: 'sqrxm', width: 80 }, 			
			{ label: '申请单位名称', name: 'sqdwmc', index: 'sqdwmc', width: 80 }, 			
			{ label: '申请日期', name: 'sqrq', index: 'sqrq', width: 80 }, 			
			{ label: '作废情况说明', name: 'zfqksm', index: 'zfqksm', width: 80 }, 			
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
			zfbh:null,
			sqrxm:null
		},
		ht:{htmc:null},
		user:{},
		defaultxm:null,
		showList: true,
		title: null,
		htzf: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		query2: function () {
			vm.htload();
		},
		 getUser: function(){
				$.getJSON(baseURL +"sys/user/info?_"+$.now(), function(r){
					vm.user = r.user;
					
				});
			},
			htload: function (event) {
				/*
				vm.showList = true;*/
				
				var page2 = $("#htGrid").jqGrid('getGridParam','page');
				$("#htGrid").jqGrid('setGridParam',{ 
					 postData:{'htmc': vm.ht.htmc},
	                page:page2
	            }).trigger("reloadGrid");
			},
			saveht: function (event) {
				console.log("savvvvvvvvv");
				//var h=$('#ryGrid').bootstrapTable('getSelections');
				 //获取选中的数据组
	            var array = $("table input[type=checkbox]:checked").map(function () {
	                return { "cell6": $.trim($(this).closest("tr").find("td:eq(3)").text())};
	            }).get();
	            $.each(array, function (i, d) {
	            	  console.log("c"+d.cell6);
	            	  vm.htzf.htmc=d.cell6;
	            	  $("#htmc").val(d.cell6);	            
	              	  $('#myModal2').modal('hide');
//	                alert(d.cell2 + "|" + d.cell3);
	            /*	if(qselect==1){
	            		vm.xm.hsdyfzr=d.cell3;
	                	$("#hsdyfzr").val(d.cell3);
	                	$('#myModal').modal('hide');
	            	}else if(qselect==2){
	            		vm.xm.xmjl=d.cell3;
	                	$("#xmjl").val(d.cell3);
	                	$('#myModal').modal('hide');
	            	}*/
	            	
	            })
	   
			},
		getXm:function(){
			 $.ajax({
                 type: "POST",
                 url: baseURL + "sys/xm/getdefaultxm",
                 contentType: "application/json",
                 data: JSON.stringify(vm.htzf),
                 success: function(r){
                	 console.log('getxm');
                	 vm.defaultxm=r;
                	

//                     if(r.code === 0){
//                          layer.msg("操作成功", {icon: 1});
//                          vm.reload();
//                          $('#btnSaveOrUpdate').button('reset');
//                          $('#btnSaveOrUpdate').dequeue();
//                     }else{
//                         layer.alert(r.msg);
//                         $('#btnSaveOrUpdate').button('reset');
//                         $('#btnSaveOrUpdate').dequeue();
//                     }
                 }
             });
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.htzf = {};
			vm.htzf.ssxmmc=vm.defaultxm.xmname;
			var xmm=vm.defaultxm.xmname;		
	        var na=$("#sysjbr").text();
	        vm.sqrxm=na;
	        $('#sqrxm').val(na);
	        $('#sqrxm').text(na);
			$('#ssxmmc').text(xmm);
			$('#ssxmmc').val(xmm);
			console.log($('#ssxmmc').text());
			console.log($('#ssxmmc').val());
		},
		update: function (event) {
			var htzfId = getSelectedRow();
			if(htzfId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(htzfId)
		},
		saveOrUpdate: function (event) {
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
             vm.htzf.sqrq=time;
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.htzf.htzfId == null ? "sys/htzf/save" : "sys/htzf/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.htzf),
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
			var htzfIds = getSelectedRows();
			if(htzfIds == null){
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
                        url: baseURL + "sys/htzf/delete",
                        contentType: "application/json",
                        data: JSON.stringify(htzfIds),
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
		getInfo: function(htzfId){
			$.get(baseURL + "sys/htzf/info/"+htzfId, function(r){
                vm.htzf = r.htzf;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'htmc': vm.q.htmc,'zfbh': vm.q.zfbh,'sqrxm': vm.q.sqrxm},

                page:page
            }).trigger("reloadGrid");
		}
	}
});