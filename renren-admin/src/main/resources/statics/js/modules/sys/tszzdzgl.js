$(function() {
    let $table = $('#table');
    let $button = $('#button');
    $('#button').show();
    $button.click(function() {
    	if($('#xmmc').val()==null||$('#xmmc').val()==''){
    		alert('请先选择项目!');return;
    		}
    	
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
            	xmmc: $('#xmmc').val(),
            	 rq: '',
                 htxz: '',
                 gys: '',
                 htje: '',
                 fpsl: '',
                 yfkje: '',
                 ydpje: '',
                 htnr: '',
                 bz: ''
            }
        });
        console.log($('#xmmc').val());
       
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
            field: 'tszzmxId',
            visible: false
        }, {
            field: 'rq',
            title: '日期'
        }, {
            field: 'htxz',
            title: '合同性质'
        },
         {
            field: 'gys',
            title: '供应商'
        },
         {
            field: 'htje',
            title: '合同金额'
        },
         {
            field: 'fpsl',
            title: '发票税率'
        },
         {
            field: 'yfkje',
            title: '已付款金额'
        },
         {
            field: 'ydpje',
            title: '已到票金额'
        },
        {
            field: 'htnr',
            title: '合同内容'
        },
        {
            field: 'bz',
            title: '备注'
        }],
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


    function saveData(index, field, value) {
        $table.bootstrapTable('updateCell', {
            index: index,       //行索引
            field: field,       //列名
            value: value        //cell值
        })
    }

});
$(function() {
    let $table1 = $('#table1');
    let $button1 = $('#button1');
    $('#button1').show();
    $button1.click(function() {
    	if($('#xmmc').val()==null||$('#xmmc').val()==''){
    		alert('请先选择项目!');return;
    		}
    	
        $table1.bootstrapTable('insertRow', {
            index: 0,
            row: {
            	xmmc: $('#xmmc').val(),
            	 rq: '',
                 dw: '',
                 je: '',
                 bz: ''
            }
        });
       

    });

    $table1.bootstrapTable({
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
            field: 'wlkmxId',
            visible: false
        }, {
            field: 'rq',
            title: '日期'
        }, {
            field: 'dw',
            title: '单位'
        },
         {
            field: 'je',
            title: '金额'
        },
         {
            field: 'bz',
            title: '备注'
        }],
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

                saveData1(index, field, tdValue);
            })
        }
    });


    function saveData1(index, field, value) {
        $table1.bootstrapTable('updateCell', {
            index: index,       //行索引
            field: field,       //列名
            value: value        //cell值
        })
    }

});
$(function() {
    let $table2 = $('#table2');
    let $button2 = $('#button2');
    $('#button2').show();
    $button2.click(function() {
    	if($('#xmmc').val()==null||$('#xmmc').val()==''){
    		alert('请先选择项目!');return;
    		}
    	
        $table2.bootstrapTable('insertRow', {
            index: 0,
            row: {
            	xmmc: $('#xmmc').val(),
            	 rq: '',
                 dw: '',
                 fpsl: '',
                 je: '',
                 bz: ''
            }
        });

    });

    $table2.bootstrapTable({
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
            field: 'yzfpmxId',
            visible: false
        }, {
            field: 'rq',
            title: '日期'
        }, {
            field: 'dw',
            title: '单位'
        },
         {
            field: 'fpsl',
            title: '发票税率'
        },
         {
            field: 'je',
            title: '金额'
        },
         {
            field: 'bz',
            title: '备注'
        }],
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

                saveData2(index, field, tdValue);
            })
        }
    });


    function saveData2(index, field, value) {
        $table2.bootstrapTable('updateCell', {
            index: index,       //行索引
            field: field,       //列名
            value: value        //cell值
        })
    }

});
$(function() {
    let $table3 = $('#table3');
    let $button3 = $('#button3');
    $('#button3').show();
    $button3.click(function() {
    	if($('#xmmc').val()==null||$('#xmmc').val()==''){
    		alert('请先选择项目!');return;
    		}
    	
        $table3.bootstrapTable('insertRow', {
            index: 0,
            row: {
            	xmmc: $('#xmmc').val(),
            	 rq: '',
                 dw: '',
                
                 je: '',
                 bz: ''
            }
        });
        console.log($('#xmmc').val());
       
//        $('td').parent().find('td').eq(1).val($('#xmmc').val());
//        $('td').parent().find('td').eq(1).text($('#xmmc').val());
//        $('td').parent().find('td').eq(1).hide();
//        console.log( $('td').parent().find('td').eq(1).val());
    });

    $table3.bootstrapTable({
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
            field: 'yzdkmxId',
            visible: false
        }, {
            field: 'rq',
            title: '日期'
        }, {
            field: 'dw',
            title: '单位'
        },
        
         {
            field: 'je',
            title: '金额'
        },
         {
            field: 'bz',
            title: '备注'
        }],
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

                saveData3(index, field, tdValue);
            })
        }
    });


    function saveData3(index, field, value) {
        $table3.bootstrapTable('updateCell', {
            index: index,       //行索引
            field: field,       //列名
            value: value        //cell值
        })
    }

});
$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tszzdzgl/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'tszzdzglId', index: 'tszzdzgl_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 			
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '项目编号', name: 'xmbh', index: 'xmbh', width: 80 }, 			
			{ label: '财务编号', name: 'cwbh', index: 'cwbh', width: 80 }, 			
			{ label: '项目联系人', name: 'xmlxr', index: 'xmlxr', width: 80 }, 			
			{ label: '联系方式', name: 'lxfs', index: 'lxfs', width: 80 }, 			
			{ label: '合作方', name: 'hzf', index: 'hzf', width: 80 }, 			
			{ label: '中标金额', name: 'zbje', index: 'zbje', width: 80 }, 			
			{ label: '结算金额', name: 'jsje', index: 'jsje', width: 80 }, 			
			{ label: '企业所得税', name: 'qysds', index: 'qysds', width: 80 }			
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
			xmbh:null,
			cwbh:null
		},
		showList: true,
		title: null,
		tszzdzgl: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tszzdzgl = {};
		},
		update: function (event) {
			var tszzdzglId = getSelectedRow();
			if(tszzdzglId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(tszzdzglId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.tszzdzgl.tszzdzglId == null ? "sys/tszzdzgl/save" : "sys/tszzdzgl/update";
                var url2 = vm.tszzdzgl.tszzdzglId == null ? "sys/tszzmx/save":"sys/tszzmx/update";
                var url3 = vm.tszzdzgl.tszzdzglId == null ? "sys/wlkmx/save":"sys/wlkmx/update";
                var url4 = vm.tszzdzgl.tszzdzglId == null ? "sys/yzfpmx/save":"sys/yzfpmx/update";
                var url5 = vm.tszzdzgl.tszzdzglId == null ? "sys/yzdkmx/save":"sys/yzdkmx/update";

                var json=JSON.stringify($('#table').bootstrapTable('getData'));
                var json1=JSON.stringify($('#table1').bootstrapTable('getData'));
                var json2=JSON.stringify($('#table2').bootstrapTable('getData'));
                var json3=JSON.stringify($('#table3').bootstrapTable('getData'));
                console.log(json);
                console.log(json1);
                console.log(json2);
                console.log(json3);
               

                if(json3!='[]'){
                	  $.ajax({
                          type: "POST",
                          url: baseURL + url5,
                          contentType: "application/json",
                          data: json3,
                          success: function(r){
                             
                          }
                      });
                }
                if(json2!='[]'){

                $.ajax({
                    type: "POST",
                    url: baseURL + url4,
                    contentType: "application/json",
                    data: json2,
                    success: function(r){
                       
                    }
                });
                }
                if(json1!='[]'){

                $.ajax({
                    type: "POST",
                    url: baseURL + url3,
                    contentType: "application/json",
                    data: json1,
                    success: function(r){
                       
                    }
                });
                }
                if(json!='[]'){

                 $.ajax({
                     type: "POST",
                     url: baseURL + url2,
                     contentType: "application/json",
                     data: json,
                     success: function(r){
                        
                     }
                 });
                }
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.tszzdzgl),
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
			var tszzdzglIds = getSelectedRows();
			if(tszzdzglIds == null){
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
                        url: baseURL + "sys/tszzdzgl/delete",
                        contentType: "application/json",
                        data: JSON.stringify(tszzdzglIds),
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
		getInfo: function(tszzdzglId){
			$.get(baseURL + "sys/tszzdzgl/info/"+tszzdzglId, function(r){
                vm.tszzdzgl = r.tszzdzgl;
                
                var xmmc=vm.tszzdzgl.xmmc;             
                //动态增加可编辑入围单位列表
    			$.get(baseURL + "sys/tszzmx/list/"+xmmc, function(r){
                   
                    for(var i=0;i<r.list.length;i++){
                    //	vm.rwddw[i]=r.list[i];
                        $('#table').bootstrapTable('insertRow', {
                            index: 0,
                            row: {
                            	tszzmxId: r.list[i].tszzmxId,
                            	 xmmc: r.list[i].xmmc,
                            	 rq: r.list[i].rq,
                                 htxz: r.list[i].htxz,
                                 gys: r.list[i].gys,
                                 htje: r.list[i].htje,
                                 fpsl: r.list[i].fpsl,
                                 yfkje: r.list[i].yfkje,
                                 ydpje: r.list[i].ydpje,
                                 htnr: r.list[i].htnr,
                                 bz: r.list[i].bz
                            }
                        });
                    }
                   // console.log(vm.rwddw);
                    $('#button').hide();
                    
                });
    			$.get(baseURL + "sys/wlkmx/list/"+xmmc, function(r){
                    
                    for(var i=0;i<r.list.length;i++){
                    //	vm.rwddw[i]=r.list[i];
                        $('#table1').bootstrapTable('insertRow', {
                            index: 0,
                            row: {
                            	wlkmxId: r.list[i].wlkmxId,
                            	 xmmc: r.list[i].xmmc,
                            	 rq: r.list[i].rq,
                                 dw: r.list[i].dw,
                                 je: r.list[i].je,
                                 bz: r.list[i].bz
                            }
                        });
                    }
                   // console.log(vm.rwddw);
                    $('#button1').hide();
                    
                });
    			$.get(baseURL + "sys/yzfpmx/list/"+xmmc, function(r){
                    
                    for(var i=0;i<r.list.length;i++){
                    //	vm.rwddw[i]=r.list[i];
                        $('#table2').bootstrapTable('insertRow', {
                            index: 0,
                            row: {
                            	yzfpmxId: r.list[i].yzfpmxId,
                            	 xmmc: r.list[i].xmmc,
                            	 rq: r.list[i].rq,
                                 dw: r.list[i].dw,
                                 fpsl: r.list[i].fpsl,

                                 je: r.list[i].je,
                                 bz: r.list[i].bz
                            }
                        });
                    }
                   // console.log(vm.rwddw);
                    $('#button2').hide();
                    
                });
    			$.get(baseURL + "sys/yzdkmx/list/"+xmmc, function(r){
                    
                    for(var i=0;i<r.list.length;i++){
                    //	vm.rwddw[i]=r.list[i];
                        $('#table3').bootstrapTable('insertRow', {
                            index: 0,
                            row: {
                            	yzdkmxId: r.list[i].yzdkmxId,
                            	 xmmc: r.list[i].xmmc,
                            	 rq: r.list[i].rq,
                                 dw: r.list[i].dw,

                                 je: r.list[i].je,
                                 bz: r.list[i].bz
                            }
                        });
                    }
                   // console.log(vm.rwddw);
                    $('#button3').hide();
                    
                });
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'xmbh': vm.q.xmbh,'cwbh':vm.q.cwbh},

                page:page
            }).trigger("reloadGrid");
		}
	}
});