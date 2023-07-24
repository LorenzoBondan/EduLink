INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Alex', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/47.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Maria', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://i.pinimg.com/originals/76/ef/b7/76efb7c94755748d695d3d46cf11d08d.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Bob', 'bob@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/62.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('John Doe', 'john.doe@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/55.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Jane Smith', 'jane.smith@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg');

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

INSERT INTO tb_message (text, moment, read, sender_id, receiver_id) VALUES ('First message', TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:15:00', false, 2, 1);

INSERT INTO tb_subject (name, team, teacher_id) VALUES ('Math', '7ano 1', 2);
INSERT INTO tb_subject (name, team, teacher_id) VALUES ('Physical', '7ano 1', 2);

INSERT INTO tb_subject_student (subject_id, student_id) VALUES (1, 1);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (1, 5);
INSERT INTO tb_subject_student (subject_id, student_id) VALUES (2, 1);

INSERT INTO tb_test (name, score, date, subject_id) VALUES ('Math test 1', 5.0, TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:15:00', 1);
INSERT INTO tb_test (name, score, date, subject_id) VALUES ('Math test 1', 9.0, TIMESTAMP WITHOUT TIME ZONE '2023-07-24T11:15:00', 1);
INSERT INTO tb_test (name, score, date, subject_id) VALUES ('Physical test 1', 8.0, TIMESTAMP WITHOUT TIME ZONE '2023-07-20T09:30:00', 2);

INSERT INTO tb_parent_childen (parent_id, children_id) VALUES (3, 1);

INSERT INTO tb_user_tests (user_id, test_id) VALUES (1,1);
INSERT INTO tb_user_tests (user_id, test_id) VALUES (1,3);
INSERT INTO tb_user_tests (user_id, test_id) VALUES (5,2);


