type PanchangamItem = {
    label: string;
    value: string;
  };
  
  const data: PanchangamItem[] = [
    { label: 'తిథి', value: 'కృష్ణ ద్వితీయ - మాయ 02, 09:15 AM - మాయ 03, 07:52 AM' },
    { label: 'నక్షత్రం', value: 'మృగశిర: మాయ 02, 01:04 PM - మాయ 03, 12:34 PM' },
    { label: 'యోగం', value: 'శూభ: మాయ 02, 05:37 AM - మాయ 03, 03:18 AM' },
    { label: 'అమృతకాలం', value: '10:37 AM - 12:13 PM' },
    { label: 'శుభ సమయం', value: '11:47 AM - 12:38 PM' },
  ];
  
  export default function PanchangamTable() {
    return (
      <div className="p-4 border rounded shadow-sm bg-white">
        <h2 className="text-xl font-bold mb-4">📅 పంచాంగం</h2>
        <table className="w-full text-sm">
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 font-medium">{item.label}</td>
                <td className="py-2">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }