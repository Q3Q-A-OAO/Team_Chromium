
import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../../components/tables/DataTable';
import { students } from '../../../lib/mockData';
import Badge from '../../../components/ui/Badge';
import type { Student } from '../../../types';

const TeacherStudents: React.FC = () => {

    const columns = [
        { 
            header: 'Name', 
            accessor: 'name' as keyof Student
        },
        { 
            header: 'Streak', 
            accessor: 'streak' as keyof Student
        },
        { 
            header: 'Badges', 
            accessor: 'badges' as keyof Student 
        },
        { 
            header: 'Last Activity', 
            accessor: 'lastActivity' as keyof Student
        },
    ];

    const data = students.map(student => ({
        ...student,
        name: (
            <Link to={`/teacher/students/${student.id}`} className="flex items-center gap-3 hover:underline">
                <img src={student.avatarUrl} alt={student.name} className="w-8 h-8 rounded-full" />
                <span className="font-medium">{student.name}</span>
            </Link>
        ),
        badges: (
            <div className="flex items-center gap-1">
                {student.badges.slice(0, 2).map(b => (
                    <Badge key={b.id} variant="blue" icon={b.icon}>{b.name}</Badge>
                ))}
                {student.badges.length > 2 && <Badge>+{student.badges.length - 2}</Badge>}
            </div>
        )
    }));

  return (
    <div>
      <h1 className="h1 mb-6">Students</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TeacherStudents;
