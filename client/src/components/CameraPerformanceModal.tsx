import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  MapPin,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  BarChart3,
  Wifi,
  Battery,
  Eye,
  Shield,
  X
} from "lucide-react";

interface CameraPerformanceModalProps {
  camera: any;
  isOpen: boolean;
  onClose: () => void;
  colorScheme?: 'blue' | 'red';
}

export function CameraPerformanceModal({ camera, isOpen, onClose, colorScheme = 'blue' }: CameraPerformanceModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!camera) return null;

  const primaryColor = colorScheme === 'red' ? '#D32F2F' : '#3b82f6';
  const primaryColorLight = colorScheme === 'red' ? '#F44336' : '#60a5fa';
  
  // Mock camera performance data
  const performanceData = {
    uptime: 98.5,
    detectionAccuracy: 94.2,
    processedEvents: 1247,
    falseAlerts: 12,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15',
    status: 'Online',
    connectionQuality: 'Excellent',
    diskUsage: 67,
    cpuUsage: 23,
    memoryUsage: 41
  };

  const recentDetections = [
    { id: 1, type: colorScheme === 'red' ? 'Fight Detection' : 'No Helmet', time: '14:23', confidence: 96 },
    { id: 2, type: colorScheme === 'red' ? 'Fall Detection' : 'No Safety Vest', time: '14:18', confidence: 89 },
    { id: 3, type: colorScheme === 'red' ? 'Crowd Movement' : 'Restricted Area', time: '14:12', confidence: 92 },
    { id: 4, type: colorScheme === 'red' ? 'Smoking' : 'Equipment Issue', time: '14:08', confidence: 88 },
    { id: 5, type: colorScheme === 'red' ? 'Running' : 'No Hard Hat', time: '14:05', confidence: 95 }
  ];

  const alerts = [
    { id: 1, type: 'Warning', message: 'High CPU usage detected', time: '13:45', severity: 'medium' },
    { id: 2, type: 'Info', message: 'Scheduled maintenance reminder', time: '12:30', severity: 'low' },
    { id: 3, type: 'Alert', message: 'Connection quality degraded', time: '11:15', severity: 'high' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${primaryColor}20` }}>
                <Camera className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {camera.name}
                </DialogTitle>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  {camera.zone}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className="border-green-500 text-green-600 dark:border-green-400 dark:text-green-400"
              >
                {performanceData.status}
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detections">Recent Detections</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Camera Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
                    <span className="font-semibold">{performanceData.uptime}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Connection</span>
                    <span className="font-semibold">{performanceData.connectionQuality}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Detection Accuracy</span>
                    <span className="font-semibold">{performanceData.detectionAccuracy}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Activity Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Events Processed</span>
                    <span className="font-semibold" style={{ color: primaryColor }}>{performanceData.processedEvents}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">False Alerts</span>
                    <span className="font-semibold">{performanceData.falseAlerts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total {colorScheme === 'red' ? 'Behaviors' : 'Violations'}</span>
                    <span className="font-semibold" style={{ color: primaryColor }}>{camera.violations || camera.detections}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Maintenance Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last Maintenance</span>
                  <span className="font-semibold">{performanceData.lastMaintenance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Next Scheduled</span>
                  <span className="font-semibold">{performanceData.nextMaintenance}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detections">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Recent Detections (Last Hour)</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {recentDetections.map((detection) => (
                      <div key={detection.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: `${primaryColor}20` }}>
                            <Eye className="w-4 h-4" style={{ color: primaryColor }} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {detection.type}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {detection.time} • {detection.confidence}% confidence
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" style={{ borderColor: primaryColor, color: primaryColor }}>
                          Processed
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">System Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>{performanceData.cpuUsage}%</span>
                    </div>
                    <Progress value={performanceData.cpuUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>{performanceData.memoryUsage}%</span>
                    </div>
                    <Progress value={performanceData.memoryUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Disk Usage</span>
                      <span>{performanceData.diskUsage}%</span>
                    </div>
                    <Progress value={performanceData.diskUsage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className={`p-1 rounded ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-600' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {alert.severity === 'high' ? <AlertTriangle className="w-4 h-4" /> :
                           alert.severity === 'medium' ? <Settings className="w-4 h-4" /> :
                           <CheckCircle className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {alert.message}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {alert.time} • {alert.type}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}