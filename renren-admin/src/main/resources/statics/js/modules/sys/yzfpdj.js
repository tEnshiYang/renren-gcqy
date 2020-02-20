$(function () {
 
let $table = $('#table');
    let $button = $('#button');
    let $getTableData = $('#getTableData');
    $('#button').show();
    $button.click(function() {    	
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
            	 xmmc: $('#xmmc').val(),
            	 se: '',
            	 fplx: '',            	 
                 kpje: '',
                 bz: ''
            }
        });
        console.log($('#xmmc').val());

    });

    $table.bootstrapTable({
        url: 'data2.json',
        toolbar: '#toolbar',
        clickEdit: true,
        showToggle: true,
        pagination: true,       //显示分页条
        showColumns: false,
        showPaginationSwitch: false,     //显示切换分页按钮
        showRefresh: false,      //显示刷新按钮
        //clickToSelect: true,  //点击row选中radio或CheckBox visible: false
        columns: [{
            checkbox: true
        }, {
            field: 'xmdpmxId',
            visible: false
        }, {
            field: 'xmmc',
            title: '项目名称'
        }, {
            field: 'se',
            title: '税额'
        },
         {
            field: 'fplx',
            title: '发票类型'
        },
         {
            field: 'kpje',
            title: '开票金额'
        },{
            field: 'bz',
            title: '备注'
        }
        
        ],
        /**
         * @param {点击列的 field 名称} field
         * @param {点击列的 value 值} value
         * @param {点击列的整行数据} row
         * @param {td 元素} $element
         */
        onClickCell: function(field, value, row, $element) {
            $element.attr('contenteditable', true);
            $element.blur(function() {
                let index = $element.parent().data('index');
                let tdValue = $element.html();

                saveData(index, field, tdValue);
            })
        }
    });

    $getTableData.click(function() {
    	var json=JSON.stringify($table.bootstrapTable('getData'));
       // alert(json);
         var url =  "sys/xmdpmx/save";

        $.ajax({
            type: "POST",
            url: baseURL + url,
            contentType: "application/json",
            data: json,
            success: function(r){
                if(r.code === 0){
                     layer.msg("操作成功", {icon: 1});
                }
            }
        });
    });

    function saveData(index, field, value) {
        $table.bootstrapTable('updateCell', {
            index: index,       //行索引
            field: field,       //列名
            value: value        //cell值
        })
    }

});


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
        url: baseURL + 'sys/yzfpdj/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'yzfpdjId', index: 'yzfpdj_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 			
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '合同编号', name: 'htbh', index: 'htbh', width: 80 }, 			
			{ label: '申请时间', name: 'sqsj', index: 'sqsj', width: 80 }, 			
			{ label: '申请人', name: 'sqr', index: 'sqr', width: 80 }, 			
					
			{ label: '单位全称', name: 'dwqc', index: 'dwqc', width: 80 }, 			
				
			{ label: '单位纳税识别号', name: 'dwnssbh', index: 'dwnssbh', width: 80 }, 			
			{ label: '金额', name: 'je', index: 'je', width: 80 }			
			
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
		
			fplx:null,
			kpsl:null
		},
		defaultxm:null,
		 user:{},
		ht:{htmc:null},
		fyqd:{},
		showList: true,
		title: null,
		yzfpdj: {}
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
		query: function () {
			vm.reload();
		},
		query2: function () {
			vm.htload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.yzfpdj = {};
			vm.yzfpdj.xmmc=vm.defaultxm.xmname;		
			var xmm=vm.defaultxm.xmname;			
	    	
          	$('#xmmc').val(xmm);
			$('#xmmc').text(xmm);		
			
			var date=getNowDate();
	
			vm.yzfpdj.sqsj=date;
			 var na=$("#syssqr").text();
 	        console.log("na:"+na);
 	    
 	        vm.yzfpdj.sqr=na;
 	        $('#sqr').val(na);
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
			var yzfpdjId = getSelectedRow();
			if(yzfpdjId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(yzfpdjId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.yzfpdj.yzfpdjId == null ? "sys/yzfpdj/save" : "sys/yzfpdj/update";
                var url2 = vm.yzfpdj.tbfkId == null ? "sys/xmdpmx/save":"sys/xmdpmx/update";
                var json=JSON.stringify($('#table').bootstrapTable('getData'));
                // alert(json);
                  console.log(json);

                 $.ajax({
                     type: "POST",
                     url: baseURL + url2,
                     contentType: "application/json",
                     data: json,
                     success: function(r){
                        
                     }
                 });
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.yzfpdj),
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
			var yzfpdjIds = getSelectedRows();
			if(yzfpdjIds == null){
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
                        url: baseURL + "sys/yzfpdj/delete",
                        contentType: "application/json",
                        data: JSON.stringify(yzfpdjIds),
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
		getInfo: function(yzfpdjId){
			$.get(baseURL + "sys/yzfpdj/info/"+yzfpdjId, function(r){
                vm.yzfpdj = r.yzfpdj;
                var xmmc=vm.yzfpdj.xmmc;

            	$.get(baseURL + "sys/xmdpmx/list/"+xmmc, function(r){
                    console.log(r);
                    for(var i=0;i<r.list.length;i++){
                    //	vm.rwddw[i]=r.list[i];
                        $('#table').bootstrapTable('insertRow', {
                            index: 0,
                            row: {
                            	xmdpmxId: r.list[i].xmdpmxId,
                            	xmmc: r.list[i].xmmc,
                            	 se: r.list[i].se,
                                 fplx: r.list[i].fplx,
                                 kpje: r.list[i].kpje,
                                 bz: r.list[i].bz
                            }
                        });
                    }
                   // console.log(vm.rwddw);
                    $('#button').hide();
                    
                });
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'fplx': vm.q.fplx,'kpsl':vm.q.kpsl},

                page:page
            }).trigger("reloadGrid");
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
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(3)").text()),"cell7": $.trim($(this).closest("tr").find("td:eq(4)").text())};
            }).get();
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            	  vm.yzfpdj.htmc=d.cell6;
            	  $("#htmc").val(d.cell6);
              	  $('#myModal2').modal('hide');

            	
            })
   
		}
	}
});