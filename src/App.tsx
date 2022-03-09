
import './App.css';
import React from 'react';
import { ScheduleComponent, Inject, Day, Week, Month, WorkWeek, Agenda
      ,ViewDirective, ViewsDirective, TimelineViews, TimelineMonth,TimelineYear 
      , Resize, DragAndDrop, DragEventArgs, ResizeEventArgs, CellClickEventArgs, Schedule} from '@syncfusion/ej2-react-schedule';
import {ScrollOptions, NavigateOptions} from '@syncfusion/ej2-react-schedule';
import {DragAndDropEventArgs, TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data';
class App extends React.Component <{},{}>{
    public scheduleObj:ScheduleComponent;
    private localData= [
      {
        Id:1,
        End: new Date(2022, 2, 8, 6, 30),
        Start: new Date(2022, 2, 8, 4, 0),
        Summary:  "John",
        Location:"Yoga center",
      },
      {
        Id:2,
        End: new Date(2022, 2, 17, 6, 30),
        Start: new Date(2022, 2, 17, 6, 30),
        Summary:"Peter",
        Location:"Tower center",
        IsReadonly: true,
      },
      {
        fields:{
          subject : {name :"Summary", default:"No title"},
          startTime:{name: "Start"},
          endTime :{name :"End"},
        }
      }
  ];
  private onDragStart (args: DragEventArgs):void{
    // (args.scroll as ScrollOptions).enable = false;
    // (args.scroll as ScrollOptions).scrollBy = 500;
    // args.interval = 1;
    // (args.navigation as NavigateOptions).enable = true;
    args.excludeSelectors = "e-all-day-cells, e-work-cells"
  }
  private onResizeStart (args: DragEventArgs): void{
    // (args.scroll as ScrollOptions).enable = false;
    // (args.scroll as ScrollOptions).scrollBy = 500;
    args.interval = 1;
  }
  // private remoteData = new DataManager({
  //   url:'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
  //   adaptor: new WebApiAdaptor,
  //   crossDomain: true,
  // })
  private treeViewData:{[key:string]:Object}[] = [
    {Id:1, Name:"Huy"},
    {Id:2,Name :"Nguyen"},
    {Id:3,Name:"Tuan"},
    {Id:4,Name: "John"},
    {Id:5,Name:"Peter"}
  ];
  public field:Object = {dataSource:this.treeViewData,id:'Id',text:'Name'}
  public onTreeDragStop(args:DragAndDropEventArgs):void{
    let cellData:CellClickEventArgs = this.scheduleObj.getCellDetails(args.target);
    let eventData:{[key:string]:Object}={
      Summary:args.draggedNodeData.text,
      Start: cellData.startTime,
      End: cellData.endTime,
      IsAllDay:cellData.isAllDay,
    }
    this.scheduleObj.openEditor(eventData,"Add", true);
    this.scheduleObj.addEvent(eventData);
  }

  private eventTemplate(props:{[key:string]:Object}):JSX.Element{
    return(<div className='template-wrap'>{props.Subject}</div>);
  }

  public render() {
    return (
      <div>
        <div className='scheduler-title-container'>Doctor Appointments</div>
        <div className='scheduler-component'>
          <ScheduleComponent  
          ref={Schedule=>this.scheduleObj = Schedule as ScheduleComponent}
           height="550px" currentView='Week' selectedDate={new Date(2022, 2, 8)}
          // eventSettings={{dataSource:this.remoteData}}
          eventSettings={{dataSource:this.localData, template: this.eventTemplate.bind(this)}} allowDragAndDrop={true} allowResizing = {true}
          dragStart= {this.onDragStart} resizeStart= {this.onResizeStart}
          >
            <ViewsDirective>
                <ViewDirective option='Day' interval={10} startHour='03:00' endHour='15:00'  displayName="Day"></ViewDirective>
                <ViewDirective option='Week' interval={2} isSelected={true} ></ViewDirective>
                <ViewDirective option='Month'  showWeekNumber={true} ></ViewDirective>   
                <ViewDirective option='TimelineDay' ></ViewDirective>
                <ViewDirective option='TimelineMonth'></ViewDirective>
                <ViewDirective option='TimelineYear'></ViewDirective>

            </ViewsDirective>
            <Inject services={[Day, Week, Month, WorkWeek, Agenda, TimelineViews, TimelineMonth, TimelineYear, DragAndDrop, Resize]} />
         </ScheduleComponent>
          </div>
            <div className='treeview-title-container'>Patient List</div>
            <div className='treeview-component'>
                <TreeViewComponent className='treeview-component-item' fields={this.field} allowDragAndDrop={true} 
                nodeDragStop={this.onTreeDragStop.bind(this)}
                />
            </div>
      </div>
    );
  }
}

export default App;
