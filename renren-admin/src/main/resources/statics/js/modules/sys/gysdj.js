function refresh(){
	window.location.reload();

}
$(function() {
    let $table = $('#table');
    let $button = $('#button');
    let $getTableData = $('#getTableData');
    $('#button').show();
    $button.click(function() {
    	if($('#dwmc').val()==null||$('#dwmc').val()==''){
    		alert('请先选择项目!');return;
    		}
    	
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
            	 dwmc:$('#dwmc').val() ,
            	 xm: '',
                 xb: '',
                 bgdh: '',
                 yddh: '',
                 gyslxfs:'',
                 yx: ''
            }
        });
        console.log($('#dwmc').val());
       
//        $('td').parent().find('td').eq(1).val($('#xmmc').val()); 
//        $('td').parent().find('td').eq(1).text($('#xmmc').val());
//        $('td').parent().find('td').eq(1).hide();
//        console.log( $('td').parent().find('td').eq(1).val());
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
            field: 'yfryxxId',
            visible: false
        }, {
            field: 'dwmc',
            title: '公司名称'
        }, {
            field: 'xm',
            title: '姓名'
        },
         {
            field: 'xb',
            title: '性别'
        },
         {
            field: 'bgdh',
            title: '办公电话'
        },
         {
            field: 'yddh',
            title: '移动电话'
        },
        {
            field: 'gyslxfs',
            title: '供应商联系方式'
        },
         {
            field: 'yx',
            title: '邮箱'
        } ],
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
         var url =  "sys/yfryxx/save";

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

$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/gysdj/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'gysId', index: 'gys_id', width: 50, key: true },
			{ label: '单位名称', name: 'dwmc', index: 'dwmc', width: 80 }, 			
			{ label: '状态', name: 'zt', index: 'zt', width: 80 }, 			
			{ label: '注册资金', name: 'zczj', index: 'zczj', width: 80 }, 			
				
			{ label: '电话', name: 'dh', index: 'dh', width: 80 }, 			
				
			{ label: '企业性质', name: 'qyxz', index: 'qyxz', width: 80 }, 			
			{ label: '供应商联系人', name: 'gyslxr', index: 'gyslxr', width: 80 }, 			
			{ label: '联系方式', name: 'lxfs', index: 'lxfs', width: 80 }, 			
			{ label: '品牌', name: 'pp', index: 'pp', width: 80 }, 			
			{ label: '地址', name: 'dz', index: 'dz', width: 80 }, 			
			{ label: '营业执照', name: 'yyzz', index: 'yyzz', width: 80 }, 			
			{ label: '产品代理证', name: 'cpdlz', index: 'cpdlz', width: 80 }, 			
			{ label: '确认人', name: 'qrr', index: 'qrr', width: 80 }	,	
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
			dwmc:null,
			qrr:null,
			cjr:null
		},
		showList: true,
		title: null,
		gysdj: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.gysdj = {};
		},
		update: function (event) {
			var gysId = getSelectedRow();
			if(gysId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(gysId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.gysdj.gysId == null ? "sys/gysdj/save" : "sys/gysdj/update";
                var url2 = vm.gysdj.gysId == null ? "sys/yfryxx/save":"sys/yfryxx/update";

                var json=JSON.stringify($('#table').bootstrapTable('getData'));
                // alert(json);
                  console.log(json+" "+url2);

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
                    data: JSON.stringify(vm.gysdj),
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
			var gysIds = getSelectedRows();
			if(gysIds == null){
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
                        url: baseURL + "sys/gysdj/delete",
                        contentType: "application/json",
                        data: JSON.stringify(gysIds),
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
		getInfo: function(gysId){
			$.get(baseURL + "sys/gysdj/info/"+gysId, function(r){
                vm.gysdj = r.gysdj;
                var dwmc=vm.gysdj.dwmc;
            	$.get(baseURL + "sys/yfryxx/list/"+dwmc, function(r){
                    console.log(r.list[0].yfryxxId+"+"+r.list[0].dwmc);

                    for(var i=0;i<r.list.length;i++){
                    //	vm.rwddw[i]=r.list[i];
                        $('#table').bootstrapTable('insertRow', {
                            index: 0,
                            row: {
                            	yfryxxId: r.list[i].yfryxxId,
                            	dwmc: r.list[i].dwmc,
                            	 xm: r.list[i].xm,
                                 xb: r.list[i].xb,
                                 bgdh: r.list[i].bgdh,
                                 yddh: r.list[i].yddh,
                                 gyslxfs:r.list[i].gyslxfs,
                                 yx: r.list[i].yx
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
				 postData:{'dwmc': vm.q.dwmc,'qrr': vm.q.qrr,'cjr': vm.q.cjr},

                page:page
            }).trigger("reloadGrid");
		}
	}
});