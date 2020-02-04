function beforeSelectRow()
	{
    	$("#ryGrid").jqGrid('resetSelection');
	    return(true);
	}
function usbeforeSelectRow()
{
	$("#usGrid").jqGrid('resetSelection');
    return(true);
}
$(function() {
    let $table = $('#table');
    let $button = $('#button');
    let $getTableData = $('#getTableData');

    $button.click(function() {
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
            	xmmc: '',
            	 dwmc: '',
                 bj: '',
                 jsdf: '',
                 swdf: '',
                 xmjl: '',
                 pm: '',
                 sfzb: ''
            }
        });
        console.log($('#xmmc').val());
       
        $('td').parent().find('td').eq(1).val($('#xmmc').val());
        console.log( $('td').parent().find('td').eq(1).val());
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
        //clickToSelect: true,  //点击row选中radio或CheckBox
        columns: [{
            checkbox: true
        },  {
            field: 'xmmc',
            title: '项目名称'
        }, {
            field: 'dwmc',
            title: '单位名称'
        },
         {
            field: 'bj',
            title: '报价'
        },
         {
            field: 'jsdf',
            title: '技术得分'
        },
         {
            field: 'swdf',
            title: '商务得分'
        },
         {
            field: 'xmjl',
            title: '项目经理'
        },
         {
            field: 'pm',
            title: '排名'
        },
        {
            field: 'sfzb',
            title: '是否中标'
        }, ],
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
         var url =  "sys/rwddw/update";

        $.ajax({
            type: "POST",
            url: baseURL + url,
            contentType: "application/json",
            data: JSON.stringify(vm.tbfkgl),
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



$(function () {
	  $("#usGrid").jqGrid({
	        url: baseURL + 'sys/user/list',
	        datatype: "json",
	        colModel: [			
				{ label: '用户ID', name: 'userId', index: "user_id", width: 45, key: true },
				{ label: '用户名', name: 'username', width: 75 },
				{ label: '邮箱', name: 'email', width: 90 },
	            { label: '所属部门', name: 'deptName', sortable: false, width: 75 },

				{ label: '手机号', name: 'mobile', width: 100 },
				
				{ label: '创建时间', name: 'createTime', index: "create_time", width: 85}
	        ],
			viewrecords: true,
	        height: 385,
	        rowNum: 10,
			rowList : [10,30,50],
	        rownumbers: true, 
	        rownumWidth: 25, 
	        autowidth:true,
	       
	        multiselect: true,
	       
	        multiboxonly:true,
	        beforeSelectRow: usbeforeSelectRow,
	        pager: "#usGridPager",
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
	        	$("#usGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	        }
	    });
	 $("#ryGrid").jqGrid({
	        url: baseURL + 'sys/genzong/list',
	        datatype: "json",
	        colModel: [			
				{ label: '序号', name: 'genzongId', index: 'genzong_id', width: 50, key: true },
				 			
				{ label: '项目编号', name: 'xmbh', index: 'xmbh', width: 80 }, 	
				

				{ label: '申请部门', name: 'sqbm', index: 'sqbm', width: 80 }, 	
				{ label: '申请时间', name: 'sqsj', index: 'sqsj', width: 80 }, 
				{ label: '项目名称', name: 'xmname', index: 'xmname', width: 80 },
					
				{ label: '核算单元', name: 'hsdy', index: 'hsdy', width: 80 }, 			
				{ label: '核算单元负责人', name: 'hsdyfzr', index: 'hsdyfzr', width: 80 } 			
						
	        ],
			viewrecords: true,
	        height: 385,
	        rowNum: 10,
			rowList : [10,30,50],
	        rownumbers: true, 
	        rownumWidth: 25, 
	        autowidth:true,
	        multiselect: true,
	        pager: "#ryGridPager",
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
	        	$("#ryGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	        }
	    });
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tbfkgl/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'tbfkId', index: 'tbfk_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 
			{ label: '中标情况', name: 'zbqk', index: 'zbqk', width: 80 }, 			
			{ label: '是否生成反馈表', name: 'sffkb', index: 'sffkb', width: 80 }, 			
			{ label: '是否生成项目', name: 'sfxm', index: 'sfxm', width: 80 },
			{ label: '开标时间', name: 'kbsj', index: 'kbsj', width: 80 }, 			
						
			{ label: '价格', name: 'jg', index: 'jg', width: 80 }, 			
				
			{ label: '创建人', name: 'czr', index: 'czr', width: 80 }, 			
			{ label: '创建时间', name: 'czsj', index: 'czsj', width: 80 }, 			
			{ label: '操作人', name: 'caozr', index: 'caozr', width: 80 }, 			
			{ label: '操作时间', name: 'caozsj', index: 'caozsj', width: 80 }, 			
					
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
			xmmc:null
		},
		ry:{
        	xmmc: null,
        },
        us:{
        	username: null,
        },
		showList: true,
		title: null,
		tbfkgl: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		query1: function () {
			
			vm.ryload();
		},	
		query2: function () {
			
			vm.usload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tbfkgl = {};
		},
		update: function (event) {
			var tbfkId = getSelectedRow();
			if(tbfkId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(tbfkId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.tbfkgl.tbfkId == null ? "sys/tbfkgl/save" : "sys/tbfkgl/update";
                var bootstrapValidator = $("#gzform").data('bootstrapValidator');          
                //手动触发验证
                bootstrapValidator.validate();
                if(bootstrapValidator.isValid()){
             //  var url = vm.tbfkgl.tbfkId == null ? "sys/tbfkgl/save" : "sys/tbfkgl/update";

                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.tbfkgl),
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
               }else{
               	alert("不通过");
            	$('#btnSaveOrUpdate').button('reset');
            	$('#btnSaveOrUpdate').dequeue();
           }
			});
		},
		del: function (event) {
			var tbfkIds = getSelectedRows();
			if(tbfkIds == null){
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
                        url: baseURL + "sys/tbfkgl/delete",
                        contentType: "application/json",
                        data: JSON.stringify(tbfkIds),
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
		getInfo: function(tbfkId){
			$.get(baseURL + "sys/tbfkgl/info/"+tbfkId, function(r){
                vm.tbfkgl = r.tbfkgl;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'xmmc': vm.q.xmmc},

                page:page
            }).trigger("reloadGrid");
		},
		ryload: function (event) {
			/*
			vm.showList = true;*/
			
			var page1 = $("#ryGrid").jqGrid('getGridParam','page');
			$("#ryGrid").jqGrid('setGridParam',{ 
				 postData:{'xmmc': vm.ry.xmmc},
                page:page1
            }).trigger("reloadGrid");
		},
		
		saveusername: function (event) {
			
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(6)").text()) };
            }).get();
          
           
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            	  vm.tbfkgl.xmmc=d.cell6;
            	  $("#xmmc").val(d.cell6);
              	  $('#myModal').modal('hide');
//                alert(d.cell2 + "|" + d.cell3);
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
		usload: function (event) {
			/*
			vm.showList = true;*/
			
			var page1 = $("#usGrid").jqGrid('getGridParam','page');
			$("#ryGrid").jqGrid('setGridParam',{ 
				 postData:{'username': vm.us.username},
                page:page1
            }).trigger("reloadGrid");
		},
		saveusername1: function (event) {
			
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell2": $.trim($(this).closest("tr").find("td:eq(2)").text()), "cell3": $.trim($(this).closest("tr").find("td:eq(3)").text()) };
            }).get();

            $.each(array, function (i, d) {
//                alert(d.cell2 + "|" + d.cell3);
            	
            		vm.tbfkgl.cjry=d.cell3;
                	$("#cjry").val(d.cell3);
                	$('#myModal1').modal('hide');
            	
            	
            })
   
		}
	}
});