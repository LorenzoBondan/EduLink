INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Alex', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/47.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Maria', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://i.pinimg.com/originals/76/ef/b7/76efb7c94755748d695d3d46cf11d08d.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Bob', 'bob@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/62.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('John Doe', 'john.doe@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/55.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Jane Smith', 'jane.smith@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Michael Johnson', 'michael.johnson@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/29.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Emily Davis', 'emily.davis@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/18.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Robert Wilson', 'robert.wilson@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/21.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Olivia Martinez', 'olivia.martinez@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/55.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('William Anderson', 'william.anderson@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/38.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Sophia Thomas', 'sophia.thomas@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/44.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('David Jackson', 'david.jackson@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/45.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Emma White', 'emma.white@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/65.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Daniel Harris', 'daniel.harris@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/73.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Mia Clark', 'mia.clark@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/9.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Frank Joe', 'frank.joe@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/53.jpg');

INSERT INTO tb_role (authority) VALUES ('ROLE_STUDENT');
INSERT INTO tb_role (authority) VALUES ('ROLE_PARENT');
INSERT INTO tb_role (authority) VALUES ('ROLE_TEACHER');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 3);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 4);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (4, 3);
INSERT INTO tb_user_role (user_id, role_id) VALUES (5, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (6, 3);
INSERT INTO tb_user_role (user_id, role_id) VALUES (7, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (8, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (9, 3);
INSERT INTO tb_user_role (user_id, role_id) VALUES (10, 3);
INSERT INTO tb_user_role (user_id, role_id) VALUES (11, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (12, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (13, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (14, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (15, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (16, 1);

INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('Hello teacher, I want to talk with you about my son', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:15:00', false, 3, 4);
INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('Sure, no problem', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:45:22', false, 4, 3);
INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('Thank you', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:55:10', false, 3, 4);

INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('Hello teacher, I want to talk with you about my son', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:15:00', true, 11, 4);
INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('Sure, no problem', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:45:22', true, 4, 11);
INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('Ok, see you soon', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:55:10', true, 11, 4);

INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('Hello teacher, I want to talk with you about my son', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:15:00', true, 12, 4);
INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('Sure, no problem', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:45:22', false, 4, 12);
INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('You are the best teacher that my son ever had!', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:55:10', false, 12, 4);

INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('Hello teacher, I want to talk with you about my son', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:15:00', true, 13, 4);
INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('Sure, no problem', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:45:22', true, 4, 13);
INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('Hello teacher, how are you?', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:55:10', false, 13, 4);

INSERT INTO tb_subject (name, team, teacher_id, img_Url) VALUES ('Math', '7th Grade 1', 4, 'https://nationaltoday.com/wp-content/uploads/2022/08/22-National-Math-Day.jpg');
INSERT INTO tb_subject (name, team, teacher_id, img_Url) VALUES ('Physics', '7th Grade 1', 4, 'https://www.zdnet.com/a/img/resize/4bca2f788465d943b8a1298405cf0b2246f447cd/2022/01/12/9ee89c8b-8777-49da-af0b-df23d4302b9a/physics-concept.jpg?auto=webp&fit=crop&height=900&width=1200');
INSERT INTO tb_subject (name, team, teacher_id, img_Url) VALUES ('Biology', '7th Grade 1', 10, 'https://www.siena.edu/files/resources/dna.jpg');
INSERT INTO tb_subject (name, team, teacher_id, img_Url) VALUES ('History', '7th Grade 1', 6, 'https://wallpapers.com/images/hd/history-background-rpcexwtxpjqrwbga.jpg');
INSERT INTO tb_subject (name, team, teacher_id, img_Url) VALUES ('Literature', '7th Grade 1', 9, 'https://t3.ftcdn.net/jpg/03/33/45/40/360_F_333454009_nlCLykXBPzOLMFCTbo3PHUQJnJrDtPQX.jpg');
INSERT INTO tb_subject (name, team, teacher_id, img_Url) VALUES ('Chemical', '7th Grade 1', 10, 'https://www.pcimag.com/ext/resources/PCI/2021/February/pci0221-Deloitte-624034258-900.jpg?1613148635');
INSERT INTO tb_subject (name, team, teacher_id, img_Url) VALUES ('Geography', '7th Grade 1', 6, 'https://nationaltoday.com/wp-content/uploads/2021/10/geography-awareness-week-1200x834.jpg');
INSERT INTO tb_subject (name, team, teacher_id, img_Url) VALUES ('Sociology', '7th Grade 1', 6, 'https://images.saymedia-content.com/.image/t_share/MTk2Mjc3OTI0NTE1NTU0NjA4/areas-of-sociology.png');
INSERT INTO tb_subject (name, team, teacher_id, img_Url) VALUES ('Math', '8th Grade 2', 4, 'https://nationaltoday.com/wp-content/uploads/2022/08/22-National-Math-Day.jpg');
INSERT INTO tb_subject (name, team, teacher_id, img_Url) VALUES ('Physics', '9th Grade 1', 4, 'https://www.zdnet.com/a/img/resize/4bca2f788465d943b8a1298405cf0b2246f447cd/2022/01/12/9ee89c8b-8777-49da-af0b-df23d4302b9a/physics-concept.jpg?auto=webp&fit=crop&height=900&width=1200');
INSERT INTO tb_subject (name, team, teacher_id, img_Url) VALUES ('Math', '9th Grade 1', 4, 'https://nationaltoday.com/wp-content/uploads/2022/08/22-National-Math-Day.jpg');

INSERT INTO tb_subject_student (subject_id, student_id) VALUES (1, 1);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (2, 1);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (3, 1);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (4, 1);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (5, 1);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (6, 1);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (7, 1);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (8, 1);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (1, 5);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (2, 5);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (3, 5);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (4, 5);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (5, 5);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (6, 5);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (7, 5);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (8, 5);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (1, 7);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (2, 7);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (3, 7);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (4, 7);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (5, 7);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (6, 7);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (7, 7);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (8, 7);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (1, 8);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (2, 8);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (3, 8);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (4, 8);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (5, 8);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (6, 8);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (7, 8);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (8, 8);

INSERT INTO tb_subject_student (subject_id, student_id) VALUES (10, 15);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (10, 16);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (10, 14);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (11, 15);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (11, 14);

INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Math test 1', 10.0, 5.0, TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:15:00', 1);
INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Math test 1', 10.0, 9.0, TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:15:00', 1);
INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Math test 1', 10.0, 2.5, TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:15:00', 1);
INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Math test 1', 10.0, 10.0, TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:15:00', 1);
INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Math test 2', 10.0, 7.5, TIMESTAMP WITHOUT TIME ZONE '2023-08-19T08:15:00', 1);
INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Math test 2', 10.0, 7.2, TIMESTAMP WITHOUT TIME ZONE '2023-08-19T08:15:00', 1);
INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Math test 2', 10.0, 5.5, TIMESTAMP WITHOUT TIME ZONE '2023-08-19T08:15:00', 1);
INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Math test 2', 10.0, 4.8, TIMESTAMP WITHOUT TIME ZONE '2023-08-19T08:15:00', 1);
INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Math test 3', 10.0, 9.2, TIMESTAMP WITHOUT TIME ZONE '2023-08-19T08:15:00', 1);
INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Math test 3', 10.0, 7.0, TIMESTAMP WITHOUT TIME ZONE '2023-08-19T08:15:00', 1);
INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Math test 3', 10.0, 6.5, TIMESTAMP WITHOUT TIME ZONE '2023-08-19T08:15:00', 1);
INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Math test 3', 10.0, 4.0, TIMESTAMP WITHOUT TIME ZONE '2023-08-19T08:15:00', 1);
INSERT INTO tb_test (name, points, score, date, subject_id) VALUES ('Physics test 1', 10.0, 8.0, TIMESTAMP WITHOUT TIME ZONE '2023-07-20T09:30:00', 2);

INSERT INTO tb_parent_childen (parent_id, children_id) VALUES (1, 3);
INSERT INTO tb_parent_childen (parent_id, children_id) VALUES (5, 11);
INSERT INTO tb_parent_childen (parent_id, children_id) VALUES (7, 12);
INSERT INTO tb_parent_childen (parent_id, children_id) VALUES (8, 13);

INSERT INTO tb_user_test (user_id, test_id) VALUES (1,1);
INSERT INTO tb_user_test (user_id, test_id) VALUES (5,2);
INSERT INTO tb_user_test (user_id, test_id) VALUES (7,3);
INSERT INTO tb_user_test (user_id, test_id) VALUES (8,4);
INSERT INTO tb_user_test (user_id, test_id) VALUES (1,5);
INSERT INTO tb_user_test (user_id, test_id) VALUES (5,6);
INSERT INTO tb_user_test (user_id, test_id) VALUES (7,7);
INSERT INTO tb_user_test (user_id, test_id) VALUES (8,8);
INSERT INTO tb_user_test (user_id, test_id) VALUES (1,9);
INSERT INTO tb_user_test (user_id, test_id) VALUES (5,10);
INSERT INTO tb_user_test (user_id, test_id) VALUES (7,11);
INSERT INTO tb_user_test (user_id, test_id) VALUES (8,12);
INSERT INTO tb_user_test (user_id, test_id) VALUES (1,13);

INSERT INTO tb_note (title, text, moment, teacher_id, subject_id) VALUES ('Reminder: Exam Date', 'Dear students, this is a reminder that the exam will take place on 2023-08-10. Be well prepared!', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:15:00', 4, 1);
INSERT INTO tb_note (title, text, moment, teacher_id, subject_id) VALUES ('Assignment Submission', 'Hello everyone, don''t forget to submit your assignment by 2023-08-05. Good luck!', TIMESTAMP WITHOUT TIME ZONE '2023-07-26T10:45:00', 4, 1);
INSERT INTO tb_note (title, text, moment, teacher_id, subject_id) VALUES ('Class Cancellation', 'Due to unforeseen circumstances, the class scheduled for 2023-08-01 is canceled. Stay safe!', TIMESTAMP WITHOUT TIME ZONE '2023-07-27T16:00:00', 4, 1);
INSERT INTO tb_note (title, text, moment, teacher_id, subject_id) VALUES ('Field Trip Announcement', 'Dear students, we will have a field trip on 2023-08-15 to the Science Museum. Please be at the school entrance by 8:00 AM.', TIMESTAMP WITHOUT TIME ZONE '2023-07-28T09:00:00', 4, 2);
INSERT INTO tb_note (title, text, moment, teacher_id, subject_id) VALUES ('Guest Speaker Session', 'Hello students, we have a guest speaker session on 2023-08-02. The session will start at 10:30 AM. Don''t miss this opportunity!', TIMESTAMP WITHOUT TIME ZONE '2023-07-29T15:15:00', 4, 2);
INSERT INTO tb_note (title, text, moment, teacher_id, subject_id) VALUES ('Homework Reminder', 'Just a reminder that your homework is due on 2023-08-08. Make sure to submit it on time.', TIMESTAMP WITHOUT TIME ZONE '2023-07-30T12:30:00', 4, 2);

