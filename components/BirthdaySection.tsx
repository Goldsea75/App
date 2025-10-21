import React from 'react';
import { Employee } from '../types';
import { CakeIcon, EmailIcon, CopyIcon } from './icons';

interface BirthdaySectionProps {
  employees: Employee[];
}

// *** CẤU HÌNH ***: Thay đổi địa chỉ email này thành email chung của công ty bạn.
const TARGET_EMAIL = 'nhom.congty@example.com';

const formatDate = (dateString: string) => {
  const [_, month, day] = dateString.split('-');
  return `${day}/${month}`;
};

const BirthdayCard = ({ employee, highlightColor }: { employee: Employee, highlightColor: string }) => (
  <div className={`p-4 rounded-lg flex items-center space-x-4 ${highlightColor}`}>
    <img
      src={`https://picsum.photos/seed/${employee.id}/100`}
      alt={employee.name}
      className="w-12 h-12 rounded-full object-cover border-2 border-white"
    />
    <div>
      <p className="font-semibold text-gray-800">{employee.name}</p>
      <p className="text-sm text-gray-600">Sinh nhật: {formatDate(employee.birthdate)}</p>
    </div>
  </div>
);

const BirthdaySection: React.FC<BirthdaySectionProps> = ({ employees }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to the beginning of the day

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const isBirthdayOnDate = (birthdate: string, targetDate: Date): boolean => {
    const [_, month, day] = birthdate.split('-').map(Number);
    return month === targetDate.getMonth() + 1 && day === targetDate.getDate();
  };

  const getUpcomingBirthdayDate = (birthdate: string): Date => {
    const [_, month, day] = birthdate.split('-').map(Number);
    let birthdayDate = new Date(today.getFullYear(), month - 1, day);
    if (birthdayDate < today) {
      birthdayDate.setFullYear(today.getFullYear() + 1);
    }
    return birthdayDate;
  };

  const birthdaysToday = employees.filter(e => isBirthdayOnDate(e.birthdate, today));
  const birthdaysTomorrow = employees.filter(e => isBirthdayOnDate(e.birthdate, tomorrow));
  
  const upcomingBirthdays3Days = employees.filter(e => {
    const birthdayDate = getUpcomingBirthdayDate(e.birthdate);
    const diffTime = birthdayDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays <= 3;
  });

  const upcomingBirthdays7Days = employees.filter(e => {
    const birthdayDate = getUpcomingBirthdayDate(e.birthdate);
    const diffTime = birthdayDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays <= 7;
  });

  const handleSendEmail = () => {
    if (birthdaysToday.length === 0) return;

    const names = birthdaysToday.map(e => e.name).join(', ');
    const subject = `Chúc Mừng Sinh Nhật ${names}!`;

    const personalizedWishes = birthdaysToday
      .map(employee => `- Anh/Chị ${employee.name}, ${employee.position}.`)
      .join('\n');

    const emailBody = `Thay mặt anh chị em công ty ABTRIP và công ty An Bình, xin gửi lời chúc mừng sinh nhật tới:\n\n${personalizedWishes}\n\nChúc các anh/chị một ngày sinh nhật thật vui vẻ, ý nghĩa và một tuổi mới gặt hái nhiều thành công!\n\nTrân trọng.`;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailBody).then(() => {
            alert(
              'Nội dung email đã được sao chép!\n\n' +
              'Vui lòng mở ứng dụng email của bạn và dán (paste) nội dung vào.\n\n' +
              `Người nhận (To): ${TARGET_EMAIL}\n` +
              `Chủ đề (Subject): ${subject}`
            );
        }).catch(err => {
            console.error('Không thể sao chép nội dung email: ', err);
            alert('Lỗi: Không thể tự động sao chép.');
        });
    } else {
        prompt(
          'Trình duyệt không hỗ trợ tự động sao chép. Vui lòng sao chép nội dung email dưới đây:',
          emailBody
        );
    }
  };

  const handleCopyViberMessage = () => {
    if (birthdaysToday.length === 0) return;

    const viberPersonalizedWishes = birthdaysToday
        .map(employee => `- Anh/Chị ${employee.name} (${employee.position})`)
        .join('\n');
    
    const viberMessage = `🎉🎂 Thay mặt công ty ABTRIP và An Bình, xin chúc mừng sinh nhật:\n${viberPersonalizedWishes}\nChúc mọi người tuổi mới nhiều niềm vui, sức khỏe và thành công! 🎂🎉`;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(viberMessage).then(() => {
            alert(
              'Lời chúc Viber đã được sao chép!\n\n' +
              'Vui lòng mở Viber và dán (paste) vào nhóm chat của bạn.'
            );
        }).catch(err => {
            console.error('Không thể sao chép tin nhắn Viber: ', err);
             alert('Lỗi: Không thể tự động sao chép.');
        });
    } else {
        prompt(
          'Trình duyệt không hỗ trợ tự động sao chép. Vui lòng sao chép lời chúc dưới đây và dán vào Viber:',
          viberMessage
        );
    }
  };


  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <CakeIcon className="w-6 h-6 mr-2 text-pink-500" />
          Sinh nhật Hôm nay
        </h3>
        {birthdaysToday.length > 0 ? (
          <>
            <div className="space-y-3">
              {birthdaysToday.map(e => <BirthdayCard key={e.id} employee={e} highlightColor="bg-pink-100" />)}
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                    onClick={handleSendEmail}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                >
                    <EmailIcon className="w-5 h-5" />
                    <span>Soạn Email</span>
                </button>
                 <button
                    onClick={handleCopyViberMessage}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
                >
                    <CopyIcon className="w-5 h-5" />
                    <span>Copy Lời chúc Viber</span>
                </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Không có sinh nhật nào hôm nay.</p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <CakeIcon className="w-6 h-6 mr-2 text-blue-500" />
          Sinh nhật Ngày mai
        </h3>
        {birthdaysTomorrow.length > 0 ? (
          <div className="space-y-3">
            {birthdaysTomorrow.map(e => <BirthdayCard key={e.id} employee={e} highlightColor="bg-blue-100" />)}
          </div>
        ) : (
          <p className="text-gray-500">Không có sinh nhật nào vào ngày mai.</p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <CakeIcon className="w-6 h-6 mr-2 text-green-500" />
          Sinh nhật trong 3 ngày tới
        </h3>
        {upcomingBirthdays3Days.length > 0 ? (
           <div className="space-y-3">
            {upcomingBirthdays3Days.map(e => <BirthdayCard key={e.id} employee={e} highlightColor="bg-green-100" />)}
          </div>
        ) : (
          <p className="text-gray-500">Không có sinh nhật nào trong 3 ngày tới.</p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <CakeIcon className="w-6 h-6 mr-2 text-yellow-500" />
          Sinh nhật Sắp tới (7 ngày)
        </h3>
        {upcomingBirthdays7Days.length > 0 ? (
           <div className="space-y-3">
            {upcomingBirthdays7Days.map(e => <BirthdayCard key={e.id} employee={e} highlightColor="bg-yellow-100" />)}
          </div>
        ) : (
          <p className="text-gray-500">Không có sinh nhật nào sắp tới.</p>
        )}
      </div>
    </div>
  );
};

export default BirthdaySection;